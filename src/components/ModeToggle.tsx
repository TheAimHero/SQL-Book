'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant='default'
      size='default'
      className='flex items-center gap-3'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Sun className={cn('hidden h-4 w-4 dark:block')} />
      <Moon className={cn('block h-4 w-4 dark:hidden')} />
      <span className='truncate'>Theme Toggle</span>
    </Button>
  );
}
