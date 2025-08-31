import type { DataMap, RawCountry, YearRow } from './type';

const normalize = (rawData: Record<string, RawCountry>): DataMap => {
  const out: DataMap = {};
  for (const [name, value] of Object.entries(rawData)) {
    const iso =
      typeof value?.iso_code === 'string' ? value.iso_code : undefined;
    const data: YearRow[] = Array.isArray(value?.data) ? value.data : [];
    out[name] = { name, iso_code: iso, data };
  }
  return out;
};
export default normalize;
