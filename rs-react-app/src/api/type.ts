export type YearRow = {
  year: number;
  population?: number | null;
  co2?: number | null;
  co2_per_capita?: number | null;
  [key: string]: number | string | null | undefined;
};

export type Country = {
  iso_code?: string;
  name: string;
  data: YearRow[];
};

export type DataMap = Record<string, Country>;

export type RawCountry = {
  iso_code?: string;
  country?: string;
  data?: YearRow[];
};
