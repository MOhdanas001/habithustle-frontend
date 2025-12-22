import Link from 'next/link';

export default function Forbidden() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">403</h1>
        <p className="text-xl text-gray-400 mb-2">Access Denied</p>
        <p className="text-gray-500 mb-8">You don't have permission to access this page</p>
        <Link href="/" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
          Go back home
        </Link>
      </div>
    </div>
  );
}
