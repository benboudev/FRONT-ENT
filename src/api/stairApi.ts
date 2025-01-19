const API_BASE_URL = 'https://seashell-app-4ht95.ondigitalocean.app';

export const getQuote = async (config: StairConfig) => {
  try {
    const response = await fetch(`${API_BASE_URL}/quote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });
    
    if (!response.ok) {
      throw new Error('Failed to get quote');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching quote:', error);
    throw error;
  }
};
