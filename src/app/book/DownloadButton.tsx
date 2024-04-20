import React, { type FC } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { DownloadIcon } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Props {
  fileText: string | undefined;
}

const DownloadButton: FC<Props> = ({ fileText }) => {
  if (fileText === '' || !fileText) {
    return (
      <Button disabled className='flex gap-2'>
        <span className='hidden lg:block'>Downlaod as File</span>
      </Button>
    );
  }
  return (
    <Link
      href={URL.createObjectURL(new Blob([fileText]))}
      className={cn('flex gap-2', buttonVariants({ variant: 'default' }))}
      download='sql-book.sql'
      target='_blank'
    >
      <DownloadIcon className='h-4 w-4' />
      <span className='hidden lg:block'>Download</span>
    </Link>
  );
};

export default DownloadButton;
