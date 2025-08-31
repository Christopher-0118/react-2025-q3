import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Tile from './tile';
import type { Form } from '@/store/type';

describe('Tile', () => {
  const baseForm: Form = {
    id: '1',
    source: 'RHF',
    data: {
      name: 'John',
      age: 30,
      email: 'john@test.com',
      password: 'Abc1$xyz',
      confirmPassword: 'Abc1$xyz',
      gender: 'male',
      acceptTnC: true,
      country: 'Poland',
      picture: '',
    },
  };

  test('renders form data without picture', () => {
    render(<Tile form={baseForm} />);

    expect(screen.getByText(/John · 30 · male \[RHF]/i)).toBeInTheDocument();
    expect(screen.getByText('john@test.com')).toBeInTheDocument();
    expect(screen.getByText('Poland')).toBeInTheDocument();
    expect(screen.queryByRole('img')).toBeNull();
  });

  test('renders avatar when picture is provided', () => {
    const formWithPic: Form = {
      ...baseForm,
      data: { ...baseForm.data, picture: 'data:image/png;base64,abc' },
    };

    render(<Tile form={formWithPic} />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'data:image/png;base64,abc');
    expect(img).toHaveAttribute('alt', "John's avatar");
  });
});
