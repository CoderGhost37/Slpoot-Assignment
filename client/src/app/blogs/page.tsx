'use client';

import { useAuthStore } from '@/hooks/use-auth';

export default function BlogsPage() {
  const { user, logout } = useAuthStore();
  return (
    <div className='p-4'>
      <button onClick={logout}>Log Out</button>
      <p>{JSON.stringify(user)}</p>
    </div>
  );
}
