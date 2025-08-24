export type FormData = {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: 'Male' | 'Female' | 'Other';
  term: boolean;
  picture: string;
  country: string;
};

export type Form = {
  id: string;
  // createdAt: number;
  // highlightUntil: number;
  source: 'UCF' | 'RHF';
  data: FormData;
};

export type FormState = {
  forms: Form[];
};

export type FormPayload = {
  source: 'UCF' | 'RHF';
  data: FormData;
};

export type CountriesState = {
  list: string[];
};
