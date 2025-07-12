export interface IAppState {
  searchQuery: string;
  results: IResult[];
  error: string | null;
}

export interface IResult {
  name: string;
  description: string;
}

export interface IFormState {
  query: string;
}

export interface IFormProps {
  onSubmit: (query: string) => void;
  defaultValue: string;
}
