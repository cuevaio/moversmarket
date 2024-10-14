'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { cn } from '@/lib/utils';

export const Pagination = () => {
  const { pageIndex } = useParams<{ pageIndex: string }>();

  const router = useRouter();

  const currentPage = React.useMemo(
    () => parseInt(pageIndex) || 0,
    [pageIndex],
  );

  return (
    <div className="my-4 flex w-full items-center gap-2">
      <p className="text-sm text-muted-foreground">Page {currentPage} of 149</p>

      {currentPage < 0 ? null : (
        <Link
          href={`/listings/p/${currentPage - 1}`}
          className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}
        >
          <ChevronLeftIcon className="size-4" />
        </Link>
      )}
      {currentPage > 149 ? null : (
        <Link
          href={`/listings/p/${currentPage + 1}`}
          className={cn(buttonVariants({ variant: 'outline', size: 'icon' }))}
        >
          <ChevronRightIcon className="size-4" />
        </Link>
      )}

      <p className="text-sm text-muted-foreground">or go directly to</p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const goTo = parseInt(formData.get('go-to')?.toString() || '');
          if (!isNaN(goTo) && goTo >= 0 && goTo <= 149) {
            router.push(`/listings/p/${goTo}`);
          }
        }}
      >
        <Input
          type="number"
          name="go-to"
          required
          placeholder={currentPage.toString()}
          min={0}
          max={149}
        />
      </form>
    </div>
  );
};
