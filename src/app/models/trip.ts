export type Trip = {
  id: string;
  href: string;
  title: string;
  description: string;
  placesCount: number;
  userId: string;
  userHref: string;
  createdAt: string;
  updatedAt: string;
};

export type TripRequest = {
  title: string;
  description: string;
}