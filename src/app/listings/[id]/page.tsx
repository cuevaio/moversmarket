import Image from 'next/image';
import { notFound } from 'next/navigation';

import { DotIcon, FlagIcon, Grip, InfoIcon, X } from 'lucide-react';

import { db } from '@/db';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { RightMoveLogo } from '@/components/ui/icons';
import { Separator } from '@/components/ui/separator';

import { nanoid } from '@/lib/nanoid';
import { cn } from '@/lib/utils';

import { ListingDescription } from './description';
import { Map } from './map';

function capitalize(s: string) {
  const text = s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .toLowerCase();

  return text[0].toUpperCase() + text.slice(1);
}

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

      <div className="flex space-x-24">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-medium">{listing.address}</h1>
            <p>
              {listing.bedrooms && (
                <>
                  {listing.bedrooms}{' '}
                  {listing.bedrooms > 1 ? 'bedroom' : 'bedrooms'}
                </>
              )}
              {listing.bathrooms && (
                <>
                  {listing.bedrooms && <DotIcon className="inline size-3" />}
                  {listing.bathrooms}{' '}
                  {listing.bathrooms > 1 ? 'bathrooms' : 'bathroom'}{' '}
                </>
              )}
            </p>
            <p className="font-mono">{listing.postcode}</p>
          </div>
          <Separator />
          <div>
            <ListingDescription description={listing.description!} />
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-semibold">Key features</h3>
            <ol className="list grid list-inside list-disc grid-cols-2 gap-x-8 gap-y-2 text-sm">
              {listing.tags!.map((t) => (
                <li key={nanoid()} className="">
                  {capitalize(t)}
                </li>
              ))}
            </ol>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-semibold">Location</h3>
            <Map latitude={listing.latitude!} longitude={listing.longitude!} />
          </div>
        </div>
        <div className="sticky top-16 h-max space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">£{listing.price}</CardTitle>

                <div className="flex items-center text-sm text-muted-foreground">
                  {listing.tenureType}
                  <a
                    href="https://www.rightmove.co.uk/guides/property-details-glossary"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className={cn(
                      buttonVariants({ variant: 'ghost', size: 'icon' }),
                      'size-6',
                    )}
                  >
                    <InfoIcon className="size-4" />
                  </a>
                </div>
              </div>
              <CardDescription>
                <span className="block">Marketed by</span>
                <span className="font-semibold">
                  {listing.estateAgentDisplayName}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <a
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'flex space-x-1 px-20',
                )}
                href={`https://www.rightmove.co.uk/properties/${listing.rightmoveId}`}
                target="_blank"
                referrerPolicy="no-referrer"
              >
                <span className="font-black">View on</span>
                <RightMoveLogo className="size-[5.5rem]" />
              </a>
              <p></p>
            </CardContent>
          </Card>
          <Button variant="link" className="w-full text-muted-foreground">
            <FlagIcon className="mr-4 size-4" fill="currentColor" /> Report this
            listing
          </Button>
        </div>
      </div>
    </div>
  );
}
