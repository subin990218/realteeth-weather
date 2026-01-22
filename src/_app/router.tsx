import { Routes, Route } from 'react-router-dom';
import { MainPage } from '../pages/MainPage';
import { DetailPage } from '../pages/DetailPage';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
    </Routes>
  );
}
