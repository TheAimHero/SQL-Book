import React, { type FC } from 'react';
import { type QueryExecResult } from 'sql.js';

interface PreviewerProps {
  source: QueryExecResult[] | undefined;
}

const Previewer: FC<PreviewerProps> = ({ source }) => {
  return <pre>{JSON.stringify(source, null, 2)}</pre>;
};

export default Previewer;
