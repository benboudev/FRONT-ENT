const API_BASE_URL = 'https://seashell-app-4ht95.ondigitalocean.app/api';

export const materialApi = {
  async getAll(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/material`);
    if (!response.ok) throw new Error('Failed to fetch materials');
    return response.json();
  },

  async getById(id: number): Promise<Material> {
    const response = await fetch(`${API_BASE_URL}/material/${id}`);
    if (!response.ok) throw new Error('Failed to fetch material');
    const data = await response.json();
    return data.data || data;
  },

  async create(material: MaterialCreate): Promise<Material> {
    const response = await fetch(`${API_BASE_URL}/material/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(material),
    });
    if (!response.ok) throw new Error('Failed to create material');
    const data = await response.json();
    return data.data || data;
  },

  async update(id: number, material: MaterialCreate): Promise<Material> {
    const response = await fetch(`${API_BASE_URL}/material/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(material),
    });
    if (!response.ok) throw new Error('Failed to update material');
    const data = await response.json();
    return data.data || data;
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/material/delete/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete material');
  },

  async getWoodTypes(): Promise<WoodType[]> {
    const response = await fetch(`${API_BASE_URL}/wood-type`);
    if (!response.ok) throw new Error('Failed to fetch wood types');
    const data = await response.json();
    return Array.isArray(data) ? data : data.data || [];
  },

  async getDimensions(): Promise<Dimension[]> {
    const response = await fetch(`${API_BASE_URL}/dimensions`);
    if (!response.ok) throw new Error('Failed to fetch dimensions');
    const data = await response.json();
    return Array.isArray(data) ? data : data.data || [];
  }
};
