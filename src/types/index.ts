export type User = {
    id:         number;
    name:       string;
    email:      string;
    password:   string;
    role:       string;
    membership: string;
    balance:    number;
    image:      string;
    bookmarks:  Event[];
    events:     Event[];
}

export type Event = {
    id:          number;
    name:        string;
    startTime:   string;
    duration:    string;
    category:    string;
    price:       number;
    image:       string;
    description: string;
    capacity:    Capacity;
    merchandises?: Merchandise[];
}

export type Capacity = {
    max:       number;
    remaining: number;
}

export type Merchandise = {
    id:          number;
    stock:       number;
    price:       number;
    image:       string;
    name:        string;
    description: string;
    event:       Event[];
}

export type Purchase = {
    id:            number;
    userID:        number;
    eventDate:     string;
    purchaseDate:  string;
    merchandises:  Merchandise[];
    paymentStatus: boolean;
    paymentTotal:  number;
}
