'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useAuthStore } from '@/hooks/use-auth';
import { UserCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export function Header() {
  const { user, logout } = useAuthStore();

  return (
    <header className='shadow py-2 px-4'>
      <div className='max-w-6xl mx-auto flex justify-end items-center'>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className='flex items-center gap-2 hover:bg-gray-100 py-2 px-4 rounded'>
              <UserCircle />
              <span className='font-semibold'>{user.name}</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='p-0'>
                <Button
                  variant='destructive'
                  onClick={logout}
                  className='w-full'
                >
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href='/'>
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
