import Image from 'next/image';
import { notFound } from 'next/navigation';

import { DotIcon, Grip, X } from 'lucide-react';

import { db } from '@/db';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

export default async function Page({ params }: { params: { id: string } }) {
  const listing = await db.query.listings.findFirst({
    where: ({ id }, { eq }) => eq(id, params.id),
  });

  if (!listing) return notFound();

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
      <div className="relative">
        <div className="grid grid-cols-4 gap-2 overflow-hidden rounded-xl">
          <div className="col-span-2 row-span-2 aspect-square lg:aspect-auto">
            <Image
              src={
                'https://media.rightmove.co.uk/' + listing.images[0].relativeUrl
              }
              alt="Image"
              width={800}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
          {listing.images.slice(1, 5).map((image, index) => (
            <div key={index} className="relative">
              <Image
                src={'https://media.rightmove.co.uk/' + image.relativeUrl}
                alt={image.relativeUrl}
                width={400}
                height={300}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              className="absolute bottom-4 right-4 flex items-center gap-2"
            >
              <Grip className="h-4 w-4" />
              Show all photos
            </Button>
          </DialogTrigger>
          <DialogContent className="h-[90vh] w-full max-w-7xl p-0">
            <div className="relative h-full overflow-y-auto">
              <Button variant="ghost" className="absolute right-4 top-4 z-10">
                <X className="h-6 w-6" />
              </Button>
              <div className="grid grid-cols-2 gap-4 p-4">
                {listing.images.map((image, index) => (
                  <div key={index} className="relative aspect-video">
                    <Image
                      src={'https://media.rightmove.co.uk/' + image.relativeUrl}
                      alt="Image"
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <h1 className="text-2xl font-medium">{listing.address}</h1>
        <p>
          {listing.bedrooms} bedrooms
          {listing.bathrooms && (
            <>
              <DotIcon className="inline size-3" />
              {listing.bathrooms}{' '}
              {listing.bathrooms > 1 ? 'bathrooms' : 'bathroom'}{' '}
            </>
          )}
        </p>
        <p className="font-mono">{listing.postcode}</p>
      </div>
      <Separator />
      <div>
        <p className="whitespace-pre-line">{listing.description}</p>
      </div>
    </div>
  );
}
