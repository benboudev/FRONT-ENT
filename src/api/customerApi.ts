const API_BASE_URL = 'https://seashell-app-4ht95.ondigitalocean.app/api/customer';

export const customerApi = {
  async getAll(): Promise<any> {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch customers');
    return response.json();
  },

  async getById(id: number): Promise<Customer> {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch customer');
    const data = await response.json();
    return data.data || data;
  },

  async create(customer: CustomerCreate): Promise<Customer> {
    const response = await fetch(`${API_BASE_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer),
    });
    if (!response.ok) throw new Error('Failed to create customer');
    const data = await response.json();
    return data.data || data;
  },

  async update(id: number, customer: CustomerCreate): Promise<Customer> {
    const response = await fetch(`${API_BASE_URL}/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer),
    });
    if (!response.ok) throw new Error('Failed to update customer');
    const data = await response.json();
    return data.data || data;
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/delete/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete customer');
  },
};
