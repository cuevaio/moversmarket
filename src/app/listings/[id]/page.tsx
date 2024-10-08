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
import { Separator } from '@/components/ui/separator';

import { cn } from '@/lib/utils';

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
        <div className="space-y-4">
          <Card className="sticky top-16 h-max">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">£{listing.price}</CardTitle>

                <div className="flex items-center text-muted-foreground">
                  {listing.tenureType}
                  <a
                    href="https://www.rightmove.co.uk/guides/property-details-glossary/#definition-price"
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
                <div>Marketed by</div>
                <div className="font-semibold">
                  {listing.estateAgentDisplayName}
                </div>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="118"
                  height="25"
                  viewBox="0 0 118 25"
                  className="size-[5.5rem]"
                >
                  <g fill="none" fill-rule="evenodd">
                    <path
                      fill="#00DEB6"
                      d="M114.114 13.262h2.022V7.088l-5.56-4.662-5.56 4.662v6.174h2.021l3.554-2.993 3.523 2.993zm2.259 1.764h-2.907l-2.89-2.441-2.907 2.441h-2.906a1.507 1.507 0 0 1-1.517-1.528l.016-6.52c0-.41.158-.788.442-1.071l.063-.063 6.809-5.718 6.887 5.78c.284.284.442.662.442 1.072l.016 6.52c0 .41-.158.788-.442 1.087-.285.3-.695.441-1.106.441z"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M60.185 8.631c-.695 0-1.359.126-2.006.378a4.505 4.505 0 0 0-1.627 1.071 4.517 4.517 0 0 0-.474-.504c-.19-.173-.411-.33-.68-.472a4.138 4.138 0 0 0-.884-.347c-.348-.094-.727-.126-1.153-.126-.711 0-1.327.126-1.849.394-.52.268-.963.599-1.295 1.008l-.11-1.15h-3.191V19.31h3.333v-5.607c0-.661.19-1.213.584-1.638.395-.425.9-.646 1.548-.646.569 0 .995.174 1.28.504.284.347.426.82.426 1.45v5.937h3.223v-5.607c0-.661.19-1.213.584-1.638.38-.425.9-.646 1.548-.646.569 0 .995.174 1.28.504.284.347.426.82.426 1.45v5.937h3.333v-6.442c0-1.307-.363-2.33-1.105-3.087-.743-.772-1.801-1.15-3.191-1.15zm13.664 6.474c-.11.33-.269.63-.506.898a2.488 2.488 0 0 1-.821.63 2.529 2.529 0 0 1-1.106.236 2.6 2.6 0 0 1-1.121-.236 2.336 2.336 0 0 1-.822-.63 3.139 3.139 0 0 1-.505-.898 3.262 3.262 0 0 1-.174-1.04c0-.362.063-.693.174-1.04.11-.33.284-.63.505-.881.221-.252.49-.473.822-.63a2.6 2.6 0 0 1 1.121-.236c.41 0 .79.078 1.106.236.332.157.6.362.821.63.221.252.395.551.506.882.11.33.158.677.158 1.04 0 .362-.048.708-.158 1.039zm1.769-4.962c-.506-.504-1.122-.897-1.832-1.197a6.346 6.346 0 0 0-2.37-.44c-.869 0-1.659.141-2.37.44a5.663 5.663 0 0 0-1.848 1.197 5.729 5.729 0 0 0-1.2 1.765 5.558 5.558 0 0 0-.427 2.173c0 .772.143 1.496.427 2.174.284.677.68 1.26 1.2 1.764.506.504 1.122.898 1.849 1.197.71.3 1.516.44 2.37.44.852 0 1.658-.14 2.369-.44.71-.3 1.326-.693 1.832-1.197.505-.504.9-1.087 1.185-1.764a5.558 5.558 0 0 0 .426-2.174c0-.772-.142-1.496-.426-2.173a5.424 5.424 0 0 0-1.185-1.765zm9.92-1.275l-2.48 6.851-2.575-6.851h-3.712l4.581 10.427h3.16l4.66-10.427h-3.634zm6.414 4.11c0-.22.047-.44.158-.677.094-.236.252-.44.442-.63.19-.189.442-.346.726-.472.3-.126.632-.19 1.027-.19.38 0 .711.064.995.19.285.126.506.283.695.472.19.19.332.41.411.63.095.237.142.457.142.678h-4.596zm7.74 1.513c0-.882-.11-1.686-.348-2.41-.237-.74-.568-1.37-1.026-1.89a4.667 4.667 0 0 0-1.675-1.229c-.663-.3-1.437-.44-2.322-.44s-1.674.157-2.37.456a5.223 5.223 0 0 0-2.86 2.977 5.924 5.924 0 0 0-.378 2.095c0 .834.142 1.59.411 2.283a4.706 4.706 0 0 0 1.185 1.765c.521.488 1.153.866 1.895 1.15.743.267 1.58.409 2.496.409.695 0 1.311-.063 1.848-.19a8.242 8.242 0 0 0 1.406-.44c.395-.158.711-.33.964-.504.253-.173.426-.3.553-.362l-1.375-2.017a7.533 7.533 0 0 1-1.184.63c-.537.237-1.248.363-2.101.363-.885 0-1.564-.205-2.07-.63-.505-.426-.758-.914-.774-1.48h7.74l-.015-.536zM44.246 16.9c-.253.11-.537.173-.885.173-.442 0-.774-.142-.979-.41-.205-.268-.316-.661-.316-1.165v-4.111h2.796v-2.52h-2.796v-3.15h-3.333v3.15h-1.722v2.52h1.722v3.937c0 .646.063 1.245.205 1.78.143.536.364.993.695 1.37.332.379.743.678 1.28.883.521.22 1.169.315 1.943.315 1.106 0 2.148-.331 3.112-.977l-1.058-2.158a3.375 3.375 0 0 1-.664.363zM6.43 8.663c-.774 0-1.406.157-1.895.488-.49.33-.87.662-1.154 1.024l-.11-1.307H.079v10.427h3.333v-5.167c0-.834.237-1.464.727-1.921.49-.457 1.121-.677 1.911-.677.38 0 .71.031.995.11l.537-2.835a1.934 1.934 0 0 0-.41-.095 4.89 4.89 0 0 0-.743-.047zm2.038 10.632H11.8V8.868H8.467v10.427zm12.242-4.647c0 .677-.19 1.181-.553 1.496-.363.315-.9.473-1.58.473-.726 0-1.279-.22-1.658-.662-.379-.44-.569-1.04-.569-1.795 0-.378.064-.756.174-1.103.11-.346.3-.645.537-.913a2.81 2.81 0 0 1 .885-.63c.347-.158.774-.236 1.248-.236.347 0 .647.015.853.063.22.031.426.094.647.173v3.134h.016zm-1.453-6c-.948 0-1.8.125-2.56.393-.757.268-1.42.646-1.974 1.15a5.135 5.135 0 0 0-1.28 1.78c-.3.693-.457 1.449-.457 2.3 0 .724.11 1.385.331 2 .222.614.538 1.134.964 1.575.41.44.932.787 1.548 1.04.616.251 1.295.361 2.07.361 1.153 0 2.085-.283 2.78-.866v.74c0 .772-.222 1.355-.648 1.733-.427.378-1.027.583-1.785.583a5.785 5.785 0 0 1-1.611-.205 5.91 5.91 0 0 1-1.375-.583l-1.342 2.268c.6.378 1.263.662 1.99.85.727.174 1.58.269 2.543.269 1.722 0 3.065-.41 4.06-1.229.995-.819 1.485-2.095 1.485-3.812V9.42a14.38 14.38 0 0 0-2.196-.551c-.79-.142-1.643-.22-2.543-.22zm13-.017c-.6 0-1.2.11-1.785.315-.584.22-1.058.52-1.405.93V4.473h-3.318V19.31h3.333v-5.607c0-.315.048-.598.143-.882.094-.268.237-.52.41-.724.19-.205.411-.378.695-.504.285-.126.6-.19.948-.19.537 0 .98.174 1.295.505.332.346.49.819.49 1.417v5.954h3.317v-6.442c0-1.386-.379-2.442-1.121-3.15-.758-.71-1.754-1.056-3.002-1.056zM11.373 4.804a1.689 1.689 0 0 0-.568-.315 1.955 1.955 0 0 0-.664-.11c-.22 0-.458.031-.663.11a1.9 1.9 0 0 0-.585.315c-.173.142-.3.315-.41.52a1.746 1.746 0 0 0-.158.724c0 .268.047.504.158.71.095.204.237.377.41.519.174.142.364.252.585.315.221.063.442.11.663.11.222 0 .458-.031.664-.11.221-.063.41-.173.568-.315.174-.142.3-.315.395-.52.095-.205.158-.441.158-.709 0-.267-.047-.504-.158-.724a1.305 1.305 0 0 0-.395-.52z"
                    ></path>
                  </g>
                </svg>
              </a>
              <p></p>
            </CardContent>
          </Card>
          <Button variant="link" className="w-full text-muted-foreground">
            <FlagIcon className="mr-4" fill="currentColor" /> Report this
            listing
          </Button>
        </div>
      </div>
    </div>
  );
}
