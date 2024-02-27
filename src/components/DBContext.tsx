'use client';

import localforage from 'localforage';
import React, {
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
  useContext,
} from 'react';
import initSqlJs, { type Database } from 'sql.js';

export type DBContextType = {
  db: Database | undefined;
  error: Error | undefined;
  status: 'loading' | 'error' | 'success';
};

const DBContext = createContext<DBContextType>({
  db: undefined,
  error: undefined,
  status: 'loading',
});

const store = localforage.createInstance({
  name: 'sql-book',
  description: 'used to store db and sql query results',
  storeName: 'sqlite-store',
  size: 1024 * 1024 * 2,
});

const DBContextProvider = ({ children }: PropsWithChildren) => {
  const [db, setDb] = useState<DBContextType['db']>();
  const [error, setError] = useState<DBContextType['error']>();
  const [status, setStatus] = useState<DBContextType['status']>('loading');
  useEffect(() => {
    setStatus('loading');
    async function exec() {
      const wasm = await initSqlJs({
        locateFile: (file) => `https://sql.js.org/dist/${file}`,
      });
      const db = new wasm.Database();
      setDb(db);
      await store.setItem('sqlite-db', db);
      setStatus('success');
    }
    exec().catch((e: Error) => {
      setError(e);
      setStatus('error');
    });
  }, []);
  return (
    <DBContext.Provider value={{ db, error, status }}>
      {children}
    </DBContext.Provider>
  );
};

export function useDB() {
  const context = useContext(DBContext);
  return context;
}

export default DBContextProvider;
