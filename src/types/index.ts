import { MerchandiseItem, MerchandiseState } from "@/stores/slices/merchandise/merchandiseSlice";

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  membership: number;
  balance: number;
  image: string;
};

export type Event = {
  id: number;
  name: string;
  date: string;
  time: string;
  price: number;
  image: string;
  description: string;
  location: string;
  capacity: Capacity;
  merchandises?: Merchandise[];
};

export type Capacity = {
  total: number;
  booked: number;
};

export type Merchandise = {
  id: number;
  stock: number;
  price: number;
  image: string;
  name: string;
  description: string;
  eventId: number;
};

export interface MerchandiseItem {
  merch: {
    id: number;
    stock: number;
    price: number;
    image: string;
    name: string;
    description: string;
    eventId: number;
    qty: number;
  };
}

export type Purchase = {
  id: number;
  userId: number;
  eventId: number;
  purchaseDate: string;
  merchandises: MerchandiseItem[];
  isPaid: boolean;
  paymentTotal: number;
  event?: Event;
};

export type Bookmark = {
  id: number;
  userId: number;
  eventId: number;
  event?: Event;
};
