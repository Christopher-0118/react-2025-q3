/// <reference types="vitest/globals" />
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Modal from '@/components/modal/modal';

describe('Modal', () => {
  beforeEach(() => {
    const root = document.createElement('div');
    root.id = 'modal-root';
    document.body.appendChild(root);
  });

  afterEach(() => {
    const root = document.getElementById('modal-root');
    if (root) root.remove();
  });
  test('opens and closes modal', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal open={true} onClose={onClose}>
        <div>Modal content</div>
      </Modal>
    );

    expect(screen.getByText(/Modal content/)).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });

  test('closes on outside click', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal open={true} onClose={onClose}>
        <div>Modal content</div>
      </Modal>
    );

    await user.click(screen.getByTestId('modal-backdrop'));
    expect(onClose).toHaveBeenCalled();
  });
});
