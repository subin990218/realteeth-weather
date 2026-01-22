import koreaDistricts from '../data/korea_districts.json';

export interface District {
  fullAddress: string;
  city: string;
  district?: string;
  neighborhood?: string;
}

function parseDistrict(address: string): District {
  const parts = address.split('-');
  return {
    fullAddress: address.replace(/-/g, ' '),
    city: parts[0] || '',
    district: parts[1],
    neighborhood: parts[2],
  };
}

const parsedDistricts: District[] = (koreaDistricts as string[]).map(parseDistrict);

export function searchDistricts(query: string): District[] {
  if (!query.trim()) return [];

  const normalizedQuery = query.toLowerCase().trim();

  return parsedDistricts
    .filter((district) =>
      district.fullAddress.toLowerCase().includes(normalizedQuery)
    )
    .slice(0, 10);
}

export function getAllDistricts(): District[] {
  return parsedDistricts;
}
