import { useFavorites } from '../../entities/location/hooks';

interface AddFavoriteButtonProps {
  address: string;
  lat: number;
  lon: number;
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

export function AddFavoriteButton({
  address,
  lat,
  lon,
  onSuccess,
  onError,
}: AddFavoriteButtonProps) {
  const { add, isFull } = useFavorites();

  const handleClick = () => {
    if (isFull) {
      onError?.('즐겨찾기는 최대 6개까지 추가할 수 있습니다.');
      return;
    }

    const result = add({
      address,
      lat,
      lon,
      nickname: address,
    });

    if (result) {
      onSuccess?.();
    } else {
      onError?.('이미 즐겨찾기에 추가된 장소입니다.');
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isFull}
      className="flex items-center gap-1 px-3 py-1.5 text-sm bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span>⭐</span>
      <span>즐겨찾기 추가</span>
    </button>
  );
}
