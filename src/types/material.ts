export interface Material {
  id: number;
  name: string;
  price: number;
  inventory: number;
  material_category_id: number;
  wood_type_id: number;
  dimension_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface MaterialCreate {
  name: string;
  price: number;
  inventory: number;
  material_category_id: number;
  wood_type_id: number;
  dimension_id: number;
}

export interface WoodType {
  id: number;
  name: string;
}

export interface Dimension {
  id: number;
  amount_of_inches: number;
}
