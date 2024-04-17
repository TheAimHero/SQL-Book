import Link from 'next/link';
import React from 'react';
import { ModeToggle } from './ModeToggle';

const Navbar = async () => {
  return (
    <nav className='flex h-[60px] items-center justify-between bg-[hsl(var(--accent))] px-4 sm:px-8'>
      <Link href='/'>
        <span className='text-md mx-4 select-none font-semibold italic underline sm:mx-10'>
          SQL Book.
        </span>
      </Link>
      <div>
        <div className='flex gap-5'>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
