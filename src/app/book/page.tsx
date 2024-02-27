'use client';

import React, { Fragment, useCallback, useEffect, useState } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import SQLEditor from './SQLEditor';
import PreviewTable from './PreviewTable';
import { type editor } from 'monaco-editor';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { type QueryExecResult } from 'sql.js';
import { useDB } from '@/components/DBContext';
import { ScrollArea } from '@/components/ui/scroll-area';
const OptionsBar = dynamic(() => import('./OptionsBar'));

const Page = () => {
  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor | null>(
    null,
  );
  const [execResults, setExecResults] = useState<
    QueryExecResult[] | undefined
  >();
  const [error, setError] = useState<Error | undefined>();
  const [sqlQuery, setSqlQuery] = useState<string | undefined>();
  const { db } = useDB();
  const [size, setSize] = useState(50);
  useEffect(() => {
    console.log(size);
  }, [size]);
  const exec = useCallback(() => {
    try {
      if (!db || !sqlQuery) return;
      const results = db.exec(sqlQuery);
      console.log(results[0]);
      setExecResults(results);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
      setExecResults(undefined);
      console.error('errror:', err);
    }
  }, [sqlQuery, db]);
  return (
    <Fragment>
      <ResizablePanelGroup
        direction='vertical'
        className='max-h-[calc(100vh-60px)] min-h-[calc(100vh-60px)] w-full overflow-scroll border-[1px] dark:border-white sm:border-black md:max-h-[calc(100vh-120px)] md:min-h-[calc(100vh-120px)]'
      >
        <ResizablePanel
          onResize={(s) => setSize(s)}
          defaultSize={50}
          className='overflow-scroll'
        >
          <SQLEditor
            data={sqlQuery}
            setData={setSqlQuery}
            setEditor={setEditor}
          />
        </ResizablePanel>
        <ResizableHandle withHandle className='bg-white' />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction='horizontal'>
            <ResizablePanel defaultSize={75} className='m-5'>
              <ScrollArea className={`mb-20 h-full w-full`}>
                <PreviewTable data={execResults?.at(0)} />
              </ScrollArea>
            </ResizablePanel>
            <ResizableHandle withHandle className='bg-white' />
            <ResizablePanel defaultSize={25}>
              <h6 className='relative top-2 mx-6 my-3 text-xl italic underline'>
                Error
              </h6>
              <div className='m-10 flex flex-col gap-2 text-xl text-destructive'>
                <span>{error?.name}</span>
                <span>{error?.message}</span>
                <span>{JSON.stringify(error?.cause, null, 2)}</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
      <OptionsBar>
        <Button onClick={() => exec()}>Execute</Button>
      </OptionsBar>
    </Fragment>
  );
};

export default Page;
