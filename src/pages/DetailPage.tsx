import { useParams } from 'react-router-dom';

export function DetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold">상세 정보</h1>
      <p>Location ID: {id}</p>
    </div>
  );
}
