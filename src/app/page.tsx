import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className=''>
      <div className='mt-[10%] flex flex-col items-center justify-between gap-10 bg-background'>
        <Link
          href='/book'
          className={cn(
            buttonVariants({ variant: 'default', size: 'lg' }),
            'mx-auto',
          )}
        >
          Book
        </Link>
        <span className='mx-auto'>This Works!!!</span>
      </div>
    </main>
  );
}
