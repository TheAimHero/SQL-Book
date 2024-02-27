import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { type FC } from 'react';
import { type QueryExecResult } from 'sql.js';

interface Props {
  data: QueryExecResult | undefined;
}

const PreviewTable: FC<Props> = ({ data }) => {
  if (!data) return null;
  const { columns, values } = data;
  return (
    <Table className='h-full w-full overflow-scroll'>
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead key={index} className='w-[100px]'>
              {column}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {values.map((val, index) => (
          <TableRow key={index}>
            {val.map((val, index) => (
              <TableCell key={index}>{val}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PreviewTable;
