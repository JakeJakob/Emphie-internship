import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl mb-8">Strona nie znaleziona</h2>
        <Link to="/" className="text-blue-500 hover:underline">
          Powrót
        </Link>
      </div>
    );
  };

export default NotFound;