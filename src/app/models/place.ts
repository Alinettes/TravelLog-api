import { Point } from "geojson";
import { QimgImage } from "./qimgimage";

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

export type PlaceRequest = {
  name: string;
  description: string;
  location: any;
  pictureUrl: string;
  tripId: string;
}

export type PlaceModify = {
  id: string,
  name: string;
  description: string;
  location: any;
  pictureUrl: string;
  tripId: string;
}