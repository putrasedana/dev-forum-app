import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center h-96 justify-center text-center">
      <h2 className="text-6xl font-bold text-gray-100">404</h2>
      <p className="mt-4 text-lg text-gray-500">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link to="/" className="mt-6 px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-500">
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
