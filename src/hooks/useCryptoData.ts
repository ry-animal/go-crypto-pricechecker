import { useState, useEffect } from 'react';
import { API_CONFIG } from '@/config/api';
import { CryptoCurrency } from '@/types/crypto';

export function useCryptoData() {
  const [prices, setPrices] = useState<CryptoCurrency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // Log the URL we're trying to fetch
        const url = `${API_CONFIG.baseUrl}/api/v1/prices`;
        console.log('Fetching from:', url);
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch prices');
        const data = await response.json();
        setPrices(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch prices');
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
    // Add polling every 30 seconds
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  return { prices, loading, error };
} 