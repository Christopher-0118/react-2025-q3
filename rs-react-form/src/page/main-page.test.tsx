import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import MainPage from './main-page';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import formSlice from '@/store/form-slice';

function makeStore() {
  return configureStore({
    reducer: { form: formSlice },
  });
}

describe('MainPage', () => {
  beforeEach(() => {
    const root = document.createElement('div');
    root.id = 'modal-root';
    document.body.appendChild(root);
  });
  afterEach(() => {
    document.getElementById('modal-root')?.remove();
  });

  test('opens Uncontrolled Form and closes on ESC', async () => {
    const user = userEvent.setup();
    const store = makeStore();

    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );

    await user.click(screen.getByTestId('uncontrolled-form'));

    const dialog = await screen.findByRole('dialog', { name: /form modal/i });
    expect(
      within(dialog).getByRole('heading', { name: /^Uncontrolled Form$/i })
    ).toBeInTheDocument();

    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: /form modal/i })).toBeNull();
    });
  });

  test('closes on outside click (backdrop)', async () => {
    const user = userEvent.setup();
    const store = makeStore();

    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );

    await user.click(screen.getByTestId('rhf'));
    await screen.findByRole('dialog', { name: /form modal/i });
    await user.click(screen.getByTestId('modal-backdrop'));
    await waitFor(() => {
      expect(screen.queryByRole('dialog', { name: /form modal/i })).toBeNull();
    });
  });
});
