export interface MaterialCategory {
  id: number;
  name: string;
  description: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface MaterialCategoryCreate {
  name: string;
  description: string;
}
