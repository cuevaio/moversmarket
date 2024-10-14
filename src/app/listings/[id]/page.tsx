import dynamic from 'next/dynamic';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import {
  CalendarPlusIcon,
  DotIcon,
  FlagIcon,
  Grip,
  InfoIcon,
  WaypointsIcon,
} from 'lucide-react';

import { db, schema } from '@/db';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { RightMoveLogo } from '@/components/ui/icons';
import { Separator } from '@/components/ui/separator';

import { nanoid } from '@/lib/nanoid';
import { cn } from '@/lib/utils';

import { AskAI } from './ask-ai';
import { ListingDescription } from './description';

const DynamicMapWithNoSSR = dynamic(() => import('./map'), { ssr: false });

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
    <div className="space-y-6">
      <div className="sticky top-[4.075rem] z-10 flex flex-col bg-background py-2 sm:hidden">
        <h1 className="text-2xl font-medium">{listing.address}</h1>
        <p>
          {listing.bedrooms && (
            <>
              {listing.bedrooms} {listing.bedrooms > 1 ? 'bedroom' : 'bedrooms'}
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
      <div className="relative">
        <div className="grid h-[15rem] grid-cols-4 grid-rows-2 gap-4 overflow-hidden rounded-xl sm:h-[30rem]">
          <div className="relative col-span-2 row-span-2">
            <Image
              src={
                'https://media.rightmove.co.uk/' + listing.images[0].relativeUrl
              }
              alt="Image"
              fill
              className="h-full w-full object-cover"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
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
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
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
              <div className="grid grid-cols-2 gap-4 p-4">
                {listing.images.map((image, index) => (
                  <div key={index} className="relative aspect-video">
                    <Image
                      src={'https://media.rightmove.co.uk/' + image.relativeUrl}
                      alt="Image"
                      fill
                      className="rounded-lg object-cover"
                    />
                    <a
                      className="absolute inset-0"
                      href={
                        'https://media.rightmove.co.uk/' + image.relativeUrl
                      }
                      target="_blank"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col-reverse gap-8 sm:flex-row sm:gap-24">
        <div className="space-y-6">
          <div className="hidden sm:flex sm:flex-col">
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

          {listing.tags.length > 0 && (
            <>
              <Separator />

              <div className="space-y-4">
                <h3 className="font-semibold">Key features</h3>
                <ol className="list grid list-inside list-disc grid-cols-2 gap-x-8 gap-y-2 text-sm">
                  {listing.tags.map((t) => (
                    <li key={nanoid()} className="">
                      {capitalize(t)}
                    </li>
                  ))}
                </ol>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-semibold">Location</h3>
                <DynamicMapWithNoSSR
                  latitude={listing.latitude!}
                  longitude={listing.longitude!}
                />
              </div>
            </>
          )}

          {listing.floorPlans.length > 0 && (
            <>
              <Separator />

              <div className="space-y-4">
                <h3 className="font-semibold">Floor plans</h3>

                <Carousel>
                  <CarouselContent className="bg-transparent">
                    {listing.floorPlans.map((p) => (
                      <CarouselItem key={p.relativeUrl}>
                        <div className="relative overflow-hidden rounded-xl border">
                          <AspectRatio ratio={16 / 9}>
                            <Image
                              src={
                                'https://media.rightmove.co.uk/' + p.relativeUrl
                              }
                              alt="plans"
                              fill
                              className="object-cover"
                            />
                          </AspectRatio>
                          <a
                            className="absolute inset-0"
                            href={
                              'https://media.rightmove.co.uk/' + p.relativeUrl
                            }
                            target="_blank"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </>
          )}

          <Button
            variant="link"
            className="flex w-full items-center text-muted-foreground sm:hidden"
          >
            <FlagIcon className="mr-2 size-4" fill="currentColor" /> Report this
            listing
          </Button>
        </div>
        <div className="h-max space-y-4 sm:sticky sm:top-20">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">
                  £{listing.price.toLocaleString()}
                </CardTitle>

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
              <div className="space-y-2">
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
                <Button className="w-full font-bold" variant="outline">
                  Promote
                  <WaypointsIcon className="ml-2 size-4" />
                </Button>
                <Button className="w-full font-bold" variant="outline">
                  Book
                  <CalendarPlusIcon className="ml-2 size-4" />
                </Button>

                <AskAI />
              </div>
            </CardContent>
          </Card>
          <Button
            variant="link"
            className="hidden w-full items-center text-muted-foreground sm:flex"
          >
            <FlagIcon className="mr-2 size-4" fill="currentColor" /> Report this
            listing
          </Button>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const listings = await db
    .select({ id: schema.listings.id })
    .from(schema.listings);

  return listings;
}
