export type Order = {
  id: string;
  table: number;
  name: string;
  draft: boolean;
  status: boolean;
  created_at: string;
};

export type OrderDetail = {
  id: string;
  table: number;
  name: string;
  draft: boolean;
  status: boolean;
  created_at: string;
  items: OrderItem[];
};

export type OrderItem = {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
  };
};
