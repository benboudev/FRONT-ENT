const API_BASE_URL = 'https://seashell-app-4ht95.ondigitalocean.app/api/material-category';

export const materialCategoryApi = {
  async getAll(): Promise<any> {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  },

  async getById(id: number): Promise<MaterialCategory> {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch category');
    const data = await response.json();
    return data.data || data;
  },

  async create(category: MaterialCategoryCreate): Promise<MaterialCategory> {
    const response = await fetch(`${API_BASE_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });
    if (!response.ok) throw new Error('Failed to create category');
    const data = await response.json();
    return data.data || data;
  },

  async update(id: number, category: MaterialCategoryCreate): Promise<MaterialCategory> {
    const response = await fetch(`${API_BASE_URL}/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });
    if (!response.ok) throw new Error('Failed to update category');
    const data = await response.json();
    return data.data || data;
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete category');
  },
};
