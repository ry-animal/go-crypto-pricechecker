import React from 'react';
import { useCryptoData } from '@/hooks/useCryptoData';
import { TrendingUp, TrendingDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const { prices, loading, error } = useCryptoData();

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
    return `$${marketCap.toLocaleString()}`;
  };

  const formatPriceChange = (change: number) => {
    const isPositive = change >= 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;
    return (
      <div className="flex items-center space-x-1">
        <Icon className={`w-4 h-4 ${isPositive ? 'text-green-500' : 'text-red-500'}`} />
        <span className={`font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {Math.abs(change).toFixed(2)}%
        </span>
      </div>
    );
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start px-6 pt-32 pb-24 sm:px-8 md:px-12">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-gray-950 dark:to-indigo-950 z-0" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && (
            <div className="col-span-full text-center">
              <div className="text-blue-400 text-lg">Loading prices...</div>
            </div>
          )}

          {error && (
            <div className="col-span-full text-center">
              <div className="text-red-400 text-lg">Error: {error}</div>
            </div>
          )}

          {!loading && !error && prices.map((crypto) => (
            <div
              key={crypto.id}
              className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center space-x-4">
                <img src={crypto.image} alt={crypto.name} className="w-12 h-12" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {crypto.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {crypto.symbol.toUpperCase()}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Price</span>
                  <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    ${crypto.current_price.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">24h Change</span>
                  {formatPriceChange(crypto.price_change_percentage_24h)}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Market Cap</span>
                  <span className="text-gray-900 dark:text-gray-100">
                    {formatMarketCap(crypto.market_cap)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
