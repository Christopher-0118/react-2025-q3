import type { ReactNode } from 'react';

export interface IAppState {
  searchQuery: string;
  results: IResult[];
  error: string | null;
  loading: boolean;
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

export interface IResultProps {
  results: IResult[];
}

export interface IErrorBoundaryState {
  hasError: boolean;
}

export interface IErrorBoundaryProps {
  children: ReactNode;
}
