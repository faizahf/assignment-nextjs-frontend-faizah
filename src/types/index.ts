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
  category: number;
  location: string;
  date: string;
  startTime: string;
  duration: number;
  price: number;
  image: string;
  description: string;
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
  event? : Event;
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
