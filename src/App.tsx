import { Providers, AppRouter } from './_app';

function App() {
  return (
    <Providers>
      <div className="min-h-screen bg-gray-100">
        <AppRouter />
      </div>
    </Providers>
  );
}

export default App;
