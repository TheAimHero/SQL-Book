'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import DBContextProvider from './DBContext';
import DBDataContextProvider from './DBNameContext';

const ClientProviders = ({ children }: ThemeProviderProps) => {
  return (
    <NextThemesProvider
      attribute='class'
      enableSystem={false}
      storageKey='sql-book-theme'
      defaultTheme='dark'
    >
      <DBDataContextProvider>
        <DBContextProvider>{children}</DBContextProvider>
      </DBDataContextProvider>
    </NextThemesProvider>
  );
};

export default ClientProviders;
