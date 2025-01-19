export interface Order {
  id: number;
  customer_id: number;
  shop_date: string;
  job_address: string;
  delivery_date: string;
  order_status: string;
  created_at: string;
  updated_at: string;
}

export interface OrderCreate {
  customer_id: number;
  shop_date: string;
  job_address: string;
  delivery_date: string;
  order_status: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  name: string;
  materials: {
    riser: {
      material_id: number;
      quantity: number;
      cut_size: number;
    };
    tread: {
      material_id: number;
      quantity: number;
      cut_size: number;
    };
    stringer: {
      material_id: number;
      quantity: number;
      cut_size: number;
    };
  };
}

export interface StairCalculations {
  riserQuantity: number;
  stepWidth: number;
  riserCutSize: number;
  stringerLength: number;
}
