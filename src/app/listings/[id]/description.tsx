'use client';

import React from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const ListingDescription = ({
  description,
}: {
  description: string;
}) => {
  const [showAll, setShowAll] = React.useState(false);

  const truncatedDescription = React.useMemo(() => {
    if (description.length < 510) {
      return description;
    } else {
      let text = description.slice(0, 510);
      text = text.slice(0, text.lastIndexOf(' '));
      return text;
    }
  }, [description]);

  return (
    <div>
      <p className="whitespace-pre-line text-sm">
        {showAll ? description : truncatedDescription}
      </p>
      <Button
        variant="link"
        onClick={() => setShowAll((x) => !x)}
        className="px-0 font-semibold"
      >
        Show {showAll ? 'less' : 'more'}{' '}
        {showAll ? (
          <ChevronLeftIcon className="size-4" />
        ) : (
          <ChevronRightIcon className="size-4" />
        )}
      </Button>
    </div>
  );
};
