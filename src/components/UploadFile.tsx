'use client';

import React, { type FC } from 'react';
import { useDropzone, type DropzoneOptions } from 'react-dropzone';
import { CloudIcon, FileIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type File } from 'buffer';
import { useToast } from './ui/use-toast';
import { Dialog, DialogTrigger, DialogContent } from './ui/dialog';
import { Button } from './ui/button';

interface Props {
  maxSizeMb: number;
  isUploading?: boolean;
  onUpload: (file: File) => void;
  className?: string;
}

const UploadFile: FC<Props> = ({ maxSizeMb, className, onUpload }) => {
  const { toast } = useToast();
  const dropzoneOptions: DropzoneOptions = {
    maxFiles: 1,
    maxSize: maxSizeMb * 1024 * 1024,
    accept: { 'text/*': ['.sql'] },
    onDropAccepted(files) {
      onUpload(files[0] as unknown as File);
    },
    onDropRejected() {
      toast({
        title: 'Error',
        description: 'Only image files are allowed. Max size 5 Mb per Image',
        variant: 'destructive',
      });
    },
  };
  const { getRootProps, getInputProps, acceptedFiles } =
    useDropzone(dropzoneOptions);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Upload</Button>
      </DialogTrigger>
      <DialogContent className=''>
        <div
          {...getRootProps()}
          className={cn(
            'mx-4 rounded-lg border border-dashed border-gray-300',
            className,
          )}
        >
          <div className='flex h-full w-full items-center justify-center px-10'>
            <label
              htmlFor='dropzone-file'
              className='flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-transparent hover:bg-transparent'
            >
              <div className='flex flex-col items-center justify-center gap-4 pb-6 pt-5'>
                <CloudIcon className='mb-2 h-6 w-6' />
                <p className='mb-2 text-sm'>
                  <span className='font-semibold'>Click to upload</span> or drag
                  and drop
                </p>
                <p className='text-xs tracking-wide'>{`Max size ${maxSizeMb} Mb SQL file`}</p>
                {acceptedFiles?.[0] ? (
                  <div className='flex max-w-xs items-center divide-x divide-zinc-200 overflow-hidden rounded-md bg-transparent outline outline-[1px] outline-zinc-200'>
                    <div className='grid h-full place-items-center px-3 py-2'>
                      <FileIcon className='h-4 w-4 text-blue-500' />
                    </div>
                    <div className='h-full truncate px-3 py-2 text-sm'>
                      {acceptedFiles[0].name}
                    </div>
                  </div>
                ) : null}
              </div>
              <input
                {...getInputProps()}
                type='file'
                id='dropzone-file'
                className='hidden'
              />
            </label>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadFile;
