import { addForm } from '@/store/form-slice';
import reducer from '@/store/form-slice';

test('adds form to state', () => {
  const payload = {
    source: 'RHF' as const,
    data: {
      name: 'John',
      age: 25,
      email: 'john@test.com',
      password: 'Abc1$xyz',
      confirmPassword: 'Abc1$xyz',
      gender: 'male' as const,
      acceptTnC: true,
      country: 'Poland',
      picture: 'undefined',
    },
  };

  const state = reducer(undefined, addForm(payload));
  expect(state.forms).toHaveLength(1);
  expect(state.forms[0].data.name).toBe('John');
});
