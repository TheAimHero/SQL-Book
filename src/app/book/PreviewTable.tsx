import { type FC } from 'react';
import { type QueryExecResult } from 'sql.js';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import TableComponent from '@/components/TableComponent';

interface Props {
  tableInfo: QueryExecResult[] | undefined;
  className?: string;
  triggerClassName?: string;
}

const PreviewTable: FC<Props> = ({
  tableInfo,
  className,
  triggerClassName,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild className={cn('', triggerClassName)}>
        <Button variant='outline' className='flex gap-2'>
          <span>Show All Tables</span>
        </Button>
      </DialogTrigger>
      <DialogContent
        className={cn(
          'grid h-[98%] min-w-[80%] grid-cols-2 gap-2 overflow-y-scroll border-4 p-10',
          className,
        )}
      >
        {tableInfo ? (
          tableInfo.map((info, i) => {
            return (
              <div
                key={i}
                className='rounded-lg border-2 border-black dark:border-white'
              >
                <TableComponent
                  tableInfo={info}
                  className={'max-h-[500px] overflow-scroll'}
                />
              </div>
            );
          })
        ) : (
          <span>No Table Data</span>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PreviewTable;
