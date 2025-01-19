const API_BASE_URL = 'https://seashell-app-4ht95.ondigitalocean.app/api';

export const orderApi = {
  async createOrder(order: OrderCreate): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/order/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    if (!response.ok) throw new Error('Failed to create order');
    return response.json();
  },

  async addItem(item: Omit<OrderItem, 'id'>): Promise<OrderItem> {
    const response = await fetch(`${API_BASE_URL}/item/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (!response.ok) throw new Error('Failed to add item');
    return response.json();
  },

  async getOrders(): Promise<Order[]> {
    const response = await fetch(`${API_BASE_URL}/order`);
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  },

  async getOrderById(id: number): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/order/${id}`);
    if (!response.ok) throw new Error('Failed to fetch order');
    return response.json();
  },

  async updateOrder(id: number, order: OrderCreate): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/order/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    if (!response.ok) throw new Error('Failed to update order');
    return response.json();
  },

  async deleteOrder(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/order/delete/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete order');
  }
};
