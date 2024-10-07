import Link from 'next/link';

import { db } from '@/db';

import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

import { cn } from '@/lib/utils';

import { ImageCarousel } from './image-carousel';

export default async function Page() {
  const listings = await db.query.listings.findMany({
    limit: 20,
  });

  return (
    <div className="container mx-auto">
      <h1>listings</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <Card
            className="flex w-full flex-col overflow-hidden"
            key={listing.id}
          >
            <ImageCarousel images={listing.images!} />
            <CardContent className="grow p-4">
              <h2 className="mb-2 text-lg font-semibold">{listing.address}</h2>
              <p className="mb-2 text-sm text-gray-500">{listing.postcode}</p>
              <p className="mb-2 text-xl font-bold">
                £{listing.price.toLocaleString()}
              </p>
              <div className="mb-2 flex space-x-2">
                {listing.bedrooms && (
                  <Badge variant="secondary">{listing.bedrooms} bed</Badge>
                )}
                {listing.bathrooms && (
                  <Badge variant="secondary">{listing.bathrooms} bath</Badge>
                )}
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 px-4 py-2">
              <div
                className={cn('flex w-full items-center justify-end', {
                  'justify-between': listing.tenureType !== null,
                })}
              >
                {listing.tenureType && (
                  <Badge variant="outline">{listing.tenureType}</Badge>
                )}
                <Link
                  href={`/listings/${listing.id}`}
                  className={cn(buttonVariants({ variant: 'outline' }))}
                >
                  View detail
                </Link>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
