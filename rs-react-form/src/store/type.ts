export type FormInputs = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female' | 'other';
  acceptTnC: boolean;
  picture: string | undefined;
  country: string;
};

export type Form = {
  id: string;
  // createdAt: number;
  // highlightUntil: number;
  source: 'UCF' | 'RHF';
  data: FormInputs;
};

export type FormState = {
  forms: Form[];
};

export type FormPayload = {
  source: 'UCF' | 'RHF';
  data: FormInputs;
};

export type CountriesState = {
  list: string[];
};
