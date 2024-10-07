import { Pool } from '@neondatabase/serverless';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/neon-serverless';

import { nanoid } from '@/lib/nanoid';

import { listings, nearbyStations, stations } from './schema';

(async () => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool);

  const DATA = [
    {
      id: '102276926',
      address: 'Royal Close, Christchurch, Dorset, BH23',
      postcode: 'BH23 2FS',
      price: 250000,
      bedrooms: 2,
      bathrooms: 1,
      isSharedOwnership: false,
      tenureType: 'LEASEHOLD',
      description:
        "Gordon Barker have the pleasure in offering this very well presented and spacious 2 double bedroom first floor apartment in the prestigious Monterey development. Located in Royal Close this development is very central to Christchurch allowing easy access into Christchurch Centre and offers beautiful communal gardens. It also has great links into the local doctors, care homes and other lifestyle services too.\r\n\r\nThe apartment is located on the first floor and is one of the Luxury Apartments and offers modern living at every step. The entrance hallway is a large space giving access to all areas of the flat. Off the hallway are 2 large cupboards, one that is perfect for storage and the other houses the washing machine and tumble dryer so they are not needed in the kitchen area. \r\n\r\nThe living space in this apartment offers ample space and dual aspect windows giving views of both the communal gardens of this development and those of the surrounding area too. The modern fitted kitchen provides ample storage space from both floor and wall cabinets as well as integrated fridge freezer and dishwasher, oven and microwave too. There is also a breakfast bar at the end of the kitchen space and a Juliet balcony from the living area.\r\n\r\nBoth bedrooms are of a good double size with the master bedroom having built in wardrobes too.\r\n\r\nThe modern shower room is a large size with large walk-in shower and white bathroom suite.\r\n\r\nAllocated parking is available in the underground parking garage as well as an allocated scooter parking spot in a separate secure area. \r\n\r\nThis apartment also has full use of the private residents' gardens and other facilities that include communal lounge and coffee area. A Lifestyle Manager is also on duty during the week, Monday to Friday.\r\n\r\nPlease note this apartment is for over 55 year-old owners / residents only. \r\n\r\nCall Gordon Barker now to register your interest and book your appointment to view...\r\n\r\nPlease note that, although every attempt has been made to ensure the accuracy of details any areas, measurements or distances are approximate. The text, photographs and plans are for guidance only and are not necessarily comprehensive. The heating system, mains and appliances have not been tested by Gordon Barker.  Whilst reasonable endeavours have been made to ensure that the information in our sales particulars are as accurate as possible, this information has been provided for us by the seller who has confirmed the accuracy to the best of their knowledge but is not guaranteed. Any potential buyer should not rely on the information we have supplied and should satisfy themselves by inspection, searches, enquiries and survey as to the correctness of each statement before making a financial or legal commitment. We at Gordon Barker have not checked the legal documentation to verify the legal status, including the leased term and ground rent and escalation of ground rent of the property (where applicable). A buyer must not rely upon the information provided until it has been verified by their own solicitors.",
      estateAgentDisplayName: 'Gordon Barker Ltd, Bournemouth',
      tags: [
        'ALLOCATED GARAGED PARKING &amp; SCOOTER PARK',
        'AMPLE STORAGE &amp; SEPARATE UTILITY CUPBOARD',
        'CENTRAL CHRISTCHURCH LOCATION IN PRESTIGIOUS 55+ ONLY DEVELOPMENT',
        'CLOSE TO SHOPS, DOCTORS, BUS ROUTES &amp; NATURE RESERVE',
        'COMMUNAL GARDENS &amp; COMMUNAL RESIDENTS LOUNGE',
        'DUAL ASPECT OUTLOOK OVER COMMUNAL GARDENS &amp; JULIET BALCONY FROM LIVING AREA',
        'LARGE 2 BEDROOM APARTMENT WITH ON-SITE LIFESTYLE MANAGER',
        'LARGE MODERN SHOWER ROOM WITH WALK-IN SHOWER',
        'LEASEHOLD SALE WITH LONG LEASE &amp; VACANT POSSESSION',
        'MODERN LIVING SPACE WITH FITTED KITCHEN, INTEGRATED WHITE GOODS &amp; BREAKFAST BAR',
      ],
      images: [
        {
          relativeUrl: '55k/54894/102276926/54894_MOTEREY15_IMG_12_0000.jpeg',
        },
        {
          relativeUrl: '55k/54894/102276926/54894_MOTEREY15_IMG_14_0000.jpeg',
        },
        {
          relativeUrl: '55k/54894/102276926/54894_MOTEREY15_IMG_15_0000.jpeg',
        },
        {
          relativeUrl: '55k/54894/102276926/54894_MOTEREY15_IMG_16_0000.jpeg',
        },
        {
          relativeUrl: '55k/54894/102276926/54894_MOTEREY15_IMG_18_0000.jpeg',
        },
        {
          relativeUrl: '55k/54894/102276926/54894_MOTEREY15_IMG_19_0000.jpeg',
        },
        {
          relativeUrl: '55k/54894/102276926/54894_MOTEREY15_IMG_20_0001.jpeg',
        },
        {
          relativeUrl: '55k/54894/102276926/54894_MOTEREY15_IMG_21_0001.jpeg',
        },
        {
          relativeUrl: '55k/54894/102276926/54894_MOTEREY15_IMG_22_0000.jpeg',
        },
        {
          relativeUrl: '55k/54894/102276926/54894_MOTEREY15_IMG_23_0000.jpeg',
        },
        {
          relativeUrl: '55k/54894/102276926/54894_MOTEREY15_IMG_24_0000.jpeg',
        },
        {
          relativeUrl: '55k/54894/102276926/54894_MOTEREY15_IMG_25_0000.jpeg',
        },
        {
          relativeUrl: '55k/54894/102276926/54894_MOTEREY15_IMG_26_0000.jpeg',
        },
        {
          relativeUrl: '55k/54894/102276926/54894_MOTEREY15_IMG_27_0000.jpeg',
        },
      ],
      floorPlans: [
        {
          relativeUrl: '55k/54894/102276926/54894_MOTEREY15_FLP_00_0000.jpeg',
        },
      ],
      nearbyStations: [
        {
          name: 'Christchurch Station',
          type: 'NATIONAL_TRAIN',
          distance: 0.514,
          distanceUnit: 'miles',
        },
        {
          name: 'Hinton Admiral Station',
          type: 'NATIONAL_TRAIN',
          distance: 3.331,
          distanceUnit: 'miles',
        },
        {
          name: 'Pokesdown Station',
          type: 'NATIONAL_TRAIN',
          distance: 1.864,
          distanceUnit: 'miles',
        },
      ],
      longitude: -1.78891,
      latitude: 50.74497,
    },
    {
      id: '108431510',
      address: ' Marsh Wall, Landmark Pinnacle,  E14',
      postcode: 'E14 9GU',
      price: 615000,
      bedrooms: null,
      bathrooms: 1,
      isSharedOwnership: false,
      tenureType: null,
      description:
        "Regent is proud to present this luxurious executive apartment in Marsh Wall, located in one of London's tallest iconic residential towers, part of the Landmark Pinnacle development in Canary Wharf.\nThe exquisitely designed property comprises an open concept apartment with incorporated LED illumination a modern bathroom, a light and airy open plan kitchen combined with a living area create a flawless convivial, combined dining, and social space. \n\nThe stylish apartment is a fusion of modern architecture with innovative landscaping, classic gymnasium, bike storage facilities, and communal grounds for activities which offers a new standard to the high-rise living experience in the heart of London's new financial center. \n\nThe residents at Marsh Wall enjoy a private cinema hall, sky gardens, and green open spaces with health-friendly amenities. The whole development has a centralized security office/dedicated 24-hour concierge, CCTV security, and video entry panel.\nIt is no coincidence that so many global businesses are based in Canary Wharf. The location offers a perfect combination of dynamism and infrastructure. Reliable and frequent London-wide transport links are complemented by quick flights across the continent. \n\nStunning river views go hand in hand with a top-tier retail and restaurant offering. The open spaces existing with distinctive architecture make for an incredibly appealing and serene. home.\n\n\n \nRegent Property comply with the Tenant Fees Act 2019 and are members of The Property Ombudsman scheme. Our Client Money Protection is provided by the UKALA Total Loss CMP scheme. For more information please visit our website or call our office on the number above.",
      estateAgentDisplayName: 'Regent Letting and Property Management, London',
      tags: [
        'Garden Lounge',
        'Gymnasium',
        'Library',
        'Private Cinema',
        'Private Park &amp; Garden',
        'Roof Terrace',
      ],
      images: [
        {
          relativeUrl: '88k/87187/108431510/87187_42496_IMG_04_0000.jpeg',
        },
        {
          relativeUrl: '88k/87187/108431510/87187_42496_IMG_10_0001.jpeg',
        },
        {
          relativeUrl: '88k/87187/108431510/87187_42496_IMG_11_0003.jpeg',
        },
        {
          relativeUrl: '88k/87187/108431510/87187_42496_IMG_12_0001.jpeg',
        },
        {
          relativeUrl: '88k/87187/108431510/87187_42496_IMG_13_0000.jpeg',
        },
        {
          relativeUrl: '88k/87187/108431510/87187_42496_IMG_14_0000.jpeg',
        },
        {
          relativeUrl: '88k/87187/108431510/87187_42496_IMG_15_0000.jpeg',
        },
        {
          relativeUrl: '88k/87187/108431510/87187_42496_IMG_16_0000.jpeg',
        },
        {
          relativeUrl: '88k/87187/108431510/87187_42496_IMG_17_0000.jpeg',
        },
        {
          relativeUrl: '88k/87187/108431510/87187_42496_IMG_18_0000.jpeg',
        },
        {
          relativeUrl: '88k/87187/108431510/87187_42496_IMG_19_0000.jpeg',
        },
        {
          relativeUrl: '88k/87187/108431510/87187_42496_IMG_20_0000.jpeg',
        },
        {
          relativeUrl: '88k/87187/108431510/87187_42496_IMG_21_0000.jpeg',
        },
        {
          relativeUrl: '88k/87187/108431510/87187_42496_IMG_22_0000.jpeg',
        },
        {
          relativeUrl: '88k/87187/108431510/87187_42496_IMG_23_0000.jpeg',
        },
      ],
      floorPlans: [
        {
          relativeUrl: '88k/87187/108431510/87187_42496_FLP_00_0001.jpeg',
        },
      ],
      nearbyStations: [
        {
          name: 'Canary Wharf Station',
          type: 'LONDON_UNDERGROUND',
          distance: 0.249,
          distanceUnit: 'miles',
        },
        {
          name: 'Heron Quays Station',
          type: 'LIGHT_RAILWAY',
          distance: 0.15,
          distanceUnit: 'miles',
        },
        {
          name: 'South Quay Station',
          type: 'LIGHT_RAILWAY',
          distance: 0.301,
          distanceUnit: 'miles',
        },
      ],
      longitude: -0.025103,
      latitude: 51.502845,
    },
  ];

  for (const listingData of DATA) {
    // Insert or update listing
    const id = nanoid();
    await db.insert(listings).values({
      id,
      rightmoveId: Number(listingData.id),
      address: listingData.address,
      postcode: listingData.postcode,
      price: listingData.price,
      bedrooms: listingData.bedrooms,
      bathrooms: listingData.bathrooms,
      isSharedOwnership: listingData.isSharedOwnership,
      tenureType: listingData.tenureType as
        | 'LEASEHOLD'
        | 'FREEHOLD'
        | 'SHARE_OF_FREEHOLD'
        | 'NON_TRADITIONAL'
        | null,
      description: listingData.description,
      estateAgentDisplayName: listingData.estateAgentDisplayName,
      tags: listingData.tags,
      images: listingData.images,
      floorPlans: listingData.floorPlans,
      longitude: listingData.longitude,
      latitude: listingData.latitude,
    });

    // Insert or update stations and nearby stations
    for (const stationData of listingData.nearbyStations) {
      // Check if station exists
      const existingStation = await db
        .select()
        .from(stations)
        .where(eq(stations.name, stationData.name))
        .limit(1);

      let stationId: string;

      if (existingStation.length === 0) {
        // Insert new station
        stationId = nanoid();
        await db.insert(stations).values({
          id: stationId,
          name: stationData.name,
          type: stationData.type as
            | 'NATIONAL_TRAIN'
            | 'LONDON_UNDERGROUND'
            | 'LIGHT_RAILWAY'
            | 'CABLE_CAR',
        });
      } else {
        stationId = existingStation[0].id;
      }

      // Insert or update nearby station
      await db.insert(nearbyStations).values({
        id: nanoid(),
        listingId: id,
        stationId: stationId,
        distanceMiles: stationData.distance,
      });
    }
  }
})();
