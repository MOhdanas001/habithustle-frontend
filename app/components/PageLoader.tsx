'use client';

import { useUser } from '../context/UserContext';

export default function PageLoader() {
  const { loading } = useUser();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
    </div>
  );
}
