/// <reference types="vitest/globals" />
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import UncontrolledForm from '@/components/uncontrolled-from/ucf';
import userEvent from '@testing-library/user-event';
import { passwordStrength } from '@/forms/schema';

describe('Uncontrolled Form', () => {
  test('renders RHF form', () => {
    render(
      <Provider store={store}>
        <UncontrolledForm onSuccess={() => {}} />
      </Provider>
    );

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Confirm password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Picture/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/I accept Terms & Conditions/i)
    ).toBeInTheDocument();
  });

  test('shows error if name does not start with uppercase', async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <UncontrolledForm onSuccess={() => {}} />
      </Provider>
    );
    await user.type(screen.getByLabelText(/Name/i), 'john');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(
      await screen.findByText(/first letter should be uppercase/i)
    ).toBeInTheDocument();
  });

  test('passwordStrength detects all rules', () => {
    const strong = passwordStrength('Abc1$xyz');
    expect(strong).toEqual({
      hasDigit: true,
      hasUpper: true,
      hasLower: true,
      hasSpecial: true,
    });
  });

  it('shows validation errors on submit (uncontrolled)', async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();

    render(
      <Provider store={store}>
        <UncontrolledForm onSuccess={() => {}} />
      </Provider>
    );

    await user.type(screen.getByLabelText('Name'), 'john');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(
      await screen.findByText(/The first letter should be uppercase/i)
    ).toBeInTheDocument();
    expect(onSuccess).not.toHaveBeenCalled();
  });
});
