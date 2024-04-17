import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { type FC } from 'react';
import { type QueryExecResult } from 'sql.js';

interface TableProps {
  tableInfo: QueryExecResult | undefined;
  className?: string;
}

const TableComponent: FC<TableProps> = ({ tableInfo, className }) => {
  if (!tableInfo)
    return (
      <span className='mx-auto flex items-center justify-between text-3xl'>
        No Data
      </span>
    );
  const { values, columns } = tableInfo;
  return (
    <Table className={cn('h-full w-full', className)}>
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead key={index} className='max-w-[10ch] truncate'>
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

export default TableComponent;
