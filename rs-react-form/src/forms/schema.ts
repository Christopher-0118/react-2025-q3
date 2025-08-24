import * as yup from 'yup';

export const passwordStrength = (s: string) => ({
  hasDigit: /\d/.test(s),
  hasUpper: /[A-Z]/.test(s),
  hasLower: /[a-z]/.test(s),
  hasSpecial: /[^A-Za-z0-9]/.test(s),
});

export const formSchema = yup.object({
  name: yup
    .string()
    .required('Required')
    .test(
      'first-upper',
      'The first letter should be uppercase',
      (v) => !!v && /^[A-ZА-Я]/.test(v)
    ),
  age: yup
    .number()
    .typeError('Must be a number')
    .integer('Integer only')
    .min(0, 'Age must be greater than or equal to 0')
    .required('Required'),
  email: yup.string().email('Email is not valid').required('Required'),
  password: yup
    .string()
    .required('Required')
    .min(8, 'At least 8 characters')
    .test('strength', 'Weak password', (v) => {
      if (!v) return false;
      const s = passwordStrength(v);
      return s.hasDigit && s.hasUpper && s.hasLower && s.hasSpecial;
    }),
  confirmPassword: yup
    .string()
    .required('Required')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
  gender: yup
    .mixed<'male' | 'female' | 'other'>()
    .oneOf(['male', 'female', 'other'], 'Choose gender')
    .required(),
  acceptTnC: yup
    .boolean()
    .oneOf([true], 'You must accept Terms & Conditions')
    .required(),
  country: yup.string().required('Select a country'),
  picture: yup.string().optional(), // base64 dataURL
});

export type FormValues = Omit<yup.InferType<typeof formSchema>, 'picture'> & {
  picture: string | undefined;
};
