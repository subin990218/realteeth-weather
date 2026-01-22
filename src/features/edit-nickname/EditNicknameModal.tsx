import { useState } from 'react';
import { useFavorites } from '../../entities/location/hooks';

interface EditNicknameModalProps {
  id: string;
  currentNickname: string;
  isOpen: boolean;
  onClose: () => void;
}

export function EditNicknameModal({
  id,
  currentNickname,
  isOpen,
  onClose,
}: EditNicknameModalProps) {
  const [nickname, setNickname] = useState(currentNickname);
  const { updateNickname } = useFavorites();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim()) {
      updateNickname(id, nickname.trim());
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div className="bg-white rounded-xl p-6 w-full max-w-sm mx-4">
        <h2 className="text-lg font-bold mb-4">별칭 수정</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="별칭을 입력하세요"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            autoFocus
          />
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
