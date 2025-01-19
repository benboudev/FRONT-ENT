export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CustomerCreate {
  name: string;
  email: string;
  phone: string;
  address: string;
}
