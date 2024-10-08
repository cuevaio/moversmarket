import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  real,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const tenureTypeEnum = pgEnum('tenure_type', [
  'LEASEHOLD',
  'FREEHOLD',
  'SHARE_OF_FREEHOLD',
  'NON_TRADITIONAL',
]);
export const stationTypeEnum = pgEnum('station_type', [
  'NATIONAL_TRAIN',
  'LONDON_UNDERGROUND',
  'LIGHT_RAILWAY',
  'CABLE_CAR',
]);

export type TenureType = keyof typeof tenureTypeEnum.enumValues;

export const listings = pgTable('listings', {
  id: varchar('id', { length: 12 }).primaryKey(),
  rightmoveId: serial('rightmove_id').unique(),
  address: varchar('address', { length: 255 }).notNull(),
  postcode: varchar('postcode', { length: 10 }).notNull(),
  price: integer('price').notNull(),
  bedrooms: integer('bedrooms'),
  bathrooms: integer('bathrooms'),
  isSharedOwnership: boolean('is_shared_ownership').notNull(),
  tenureType: tenureTypeEnum('tenure_type'),
  description: text('description'),
  estateAgentDisplayName: varchar('estate_agent_display_name', { length: 255 }),
  tags: jsonb('tags').$type<string[]>().notNull().default([]),
  images: jsonb('images')
    .$type<{ relativeUrl: string }[]>()
    .notNull()
    .default([]),
  floorPlans: jsonb('floor_plans')
    .$type<{ relativeUrl: string }[]>()
    .notNull()
    .default([]),
  longitude: real('longitude'),
  latitude: real('latitude'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type SelectListing = typeof listings.$inferSelect;

export const stations = pgTable('stations', {
  id: varchar('id', { length: 12 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  type: stationTypeEnum('type').notNull(),
});

export const nearbyStations = pgTable('nearby_stations', {
  id: varchar('id', { length: 12 }).primaryKey(),
  listingId: varchar('listing_id', { length: 12 })
    .notNull()
    .references(() => listings.id),
  stationId: varchar('station_id', { length: 12 })
    .notNull()
    .references(() => stations.id),
  distanceMiles: real('distance_miles').notNull(),
});

export const listingsRelations = relations(listings, ({ many }) => ({
  nearbyStations: many(nearbyStations),
}));

export const stationsRelations = relations(stations, ({ many }) => ({
  nearbyStations: many(nearbyStations),
}));

export const nearbyStationsRelations = relations(nearbyStations, ({ one }) => ({
  listing: one(listings, {
    fields: [nearbyStations.listingId],
    references: [listings.id],
  }),
  station: one(stations, {
    fields: [nearbyStations.stationId],
    references: [stations.id],
  }),
}));
