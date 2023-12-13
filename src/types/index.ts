export type User = {
    id:         number;
    name:       string;
    email:      string;
    password:   string;
    role:       string;
    membership: number;
    balance:    number;
    image:      string;
}

export type Event = {
    id:          number;
    name:        string;
    date:   string;
    time:   string;
    price:       number;
    image:       string;
    description: string;
    capacity:    Capacity;
}

export type Capacity = {
    total:       number;
    booked: number;
}

export type Merchandise = {
    id:          number;
    stock:       number;
    price:       number;
    image:       string;
    name:        string;
    description: string;
    eventId:     number;
}

export type Purchase = {
    id:            number;
    userId:        number;
    eventId:     number;
    purchaseDate:  string;
    merchandises:  Merchandise[];
    isPaid: boolean;
    paymentTotal:  number;
}

export type Bookmark = {
    id: number;
    userId: number;
    eventId: number;
    event?: Event;
}
