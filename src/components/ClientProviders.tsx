'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import DBContextProvider from './DBContext';

const ClientProviders = ({ children }: ThemeProviderProps) => {
  return (
    <NextThemesProvider
      attribute='class'
      enableSystem={false}
      storageKey='sql-book-theme'
      defaultTheme='dark'
    >
      <DBContextProvider>{children}</DBContextProvider>
    </NextThemesProvider>
  );
};

export default ClientProviders;
