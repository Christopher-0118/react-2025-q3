/// <reference types="vitest/globals" />
import { describe, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import RhfForm from './rhf';
import * as imgMod from '@/forms/img';

import fileToBase64 from '@/forms/img';
import formSlice from '@/store/form-slice';

function makeStore() {
  return configureStore({
    reducer: {
      form: formSlice,
    },
  });
}

describe('RhfForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('submits valid form, converts file to base64', async () => {
    vi.spyOn(imgMod, 'default').mockRejectedValue(new Error('Only PNG/JPEG'));
    const user = userEvent.setup();
    const store = makeStore();
    const b64 = 'data:image/png;base64,AAA';
    (fileToBase64 as ReturnType<typeof vi.fn>).mockResolvedValue(b64);

    const onSuccess = vi.fn();

    render(
      <Provider store={store}>
        <RhfForm onSuccess={onSuccess} />
      </Provider>
    );

    await user.type(screen.getByLabelText(/name/i), 'John');
    await user.clear(screen.getByLabelText(/age/i));
    await user.type(screen.getByLabelText(/age/i), '25');
    await user.type(screen.getByLabelText(/email/i), 'john@test.com');
    await user.type(screen.getByLabelText(/^password$/i), 'Abc1$xyz');
    await user.type(screen.getByLabelText(/confirm password/i), 'Abc1$xyz');
    await user.type(screen.getByLabelText(/country/i), 'Poland');
    await user.click(screen.getByLabelText(/i accept t&c/i));

    const fileInput = screen.getByLabelText(/picture/i);
    const file = new File([new Uint8Array([1, 2, 3])], 'pic.png', {
      type: 'image/png',
    });

    await user.upload(fileInput, file);

    const submit = screen.getByRole('button', { name: /submit/i });
    await user.click(submit);

    expect(onSuccess).toHaveBeenCalled();

    const state = store.getState();
    expect(state.form.forms).toHaveLength(1);
    const added = state.form.forms[0];
    expect(added.source).toBe('RHF');
    expect(added.data.picture).toBe(b64);
    expect(added.data.name).toBe('John');
  });

  test('shows alert when fileToBase64 rejects in onFile (error path)', async () => {
    const user = userEvent.setup();
    const store = makeStore();

    vi.spyOn(imgMod, 'default').mockRejectedValue(new Error('Only PNG/JPEG'));

    const onSuccess = vi.fn();
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <Provider store={store}>
        <RhfForm onSuccess={onSuccess} />
      </Provider>
    );

    const fileInput = screen.getByLabelText(/picture/i);
    const file = new File([new Uint8Array([1, 2, 3])], 'pic.png', {
      type: 'image/png',
    });

    await user.upload(fileInput, file);
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Only PNG/JPEG');
    });

    alertSpy.mockRestore();
  });
});
