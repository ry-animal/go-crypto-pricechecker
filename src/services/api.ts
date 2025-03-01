
import { toast } from "sonner";

interface CryptoPrice {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  image: string;
}

export async function fetchCryptoPrices(): Promise<CryptoPrice[]> {
  try {
    // In a real app, this would be replaced with your Go microservice endpoint
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1"
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch crypto prices");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching crypto prices:", error);
    toast.error("Failed to fetch crypto prices. Please try again later.");
    return [];
  }
}

export async function mockFetchCryptoPrices(): Promise<CryptoPrice[]> {
  // This mock function simulates the response from your Go microservice
  return [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "btc",
      current_price: 65432.21,
      price_change_percentage_24h: 2.45,
      market_cap: 1234567890123,
      image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "eth",
      current_price: 3456.78,
      price_change_percentage_24h: -1.23,
      market_cap: 415263748912,
      image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png"
    },
    {
      id: "cardano",
      name: "Cardano",
      symbol: "ada",
      current_price: 0.523,
      price_change_percentage_24h: 5.67,
      market_cap: 18273645123,
      image: "https://assets.coingecko.com/coins/images/975/large/cardano.png"
    },
    {
      id: "solana",
      name: "Solana",
      symbol: "sol",
      current_price: 143.21,
      price_change_percentage_24h: 8.92,
      market_cap: 59127346812,
      image: "https://assets.coingecko.com/coins/images/4128/large/solana.png"
    },
    {
      id: "ripple",
      name: "XRP",
      symbol: "xrp",
      current_price: 0.612,
      price_change_percentage_24h: -0.45,
      market_cap: 32145698712,
      image: "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png"
    }
  ];
}
