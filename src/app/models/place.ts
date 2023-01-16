import { Point } from "geojson";

export type Place = {
  id: string;
  href: string;
  name: string;
  description: string;
  location: Point;
  tripId: string;
  tripHref: string;
  pictureUrl: string;
  createdAt: string;
  updatedAt: string;
};