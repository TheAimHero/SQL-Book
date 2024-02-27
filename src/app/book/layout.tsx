'use client';

import { ClientOnly } from '@/components/ClientOnly';
import { useDB } from '@/components/DBContext';
import { Loader2Icon } from 'lucide-react';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { status: dbStatus } = useDB();
  if (dbStatus === 'loading') {
    return (
      <div className='mt-24 flex w-full justify-center'>
        <div className='flex flex-col items-center gap-2'>
          <Loader2Icon className='h-8 w-8 animate-spin text-zinc-800 dark:text-white' />
          <h3 className='text-xl font-semibold'>Running Setup...</h3>
          <p>You will be redirected automatically.</p>
        </div>
      </div>
    );
  }
  return <ClientOnly>{children}</ClientOnly>;
};

export default Layout;
