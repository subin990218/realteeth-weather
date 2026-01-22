import { SearchInput } from '../../features/search-location';
import type { District } from '../../shared/lib/districts';

interface SearchBarProps {
  onSelectLocation: (district: District) => void;
}

export function SearchBar({ onSelectLocation }: SearchBarProps) {
  return (
    <div className="w-full">
      <SearchInput
        onSelect={onSelectLocation}
        placeholder="도시, 구, 동 검색..."
      />
    </div>
  );
}
