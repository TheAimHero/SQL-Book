'use client';

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

const DBContextProvider = ({ children }: PropsWithChildren) => {
  const [db, setDb] = useState<DBContextType['db']>();
  const [error, setError] = useState<DBContextType['error']>();
  const [status, setStatus] = useState<DBContextType['status']>('loading');
  useEffect(() => {
    setStatus('loading');
    async function exec() {
      const wasm = await initSqlJs({
        locateFile: () => `/sql-wasm.wasm`,
      });
      const db = new wasm.Database();
      setDb(db);
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
