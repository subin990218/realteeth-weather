import { useFavorites } from '../../entities/location/hooks';

interface RemoveFavoriteButtonProps {
  id: string;
  onSuccess?: () => void;
}

export function RemoveFavoriteButton({ id, onSuccess }: RemoveFavoriteButtonProps) {
  const { remove } = useFavorites();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const confirmed = window.confirm('즐겨찾기에서 삭제하시겠습니까?');
    if (confirmed) {
      remove(id);
      onSuccess?.();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-2 py-1 text-xs md:text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
    >
      삭제
    </button>
  );
}
