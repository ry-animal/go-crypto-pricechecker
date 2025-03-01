
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import PriceCard from '@/components/PriceCard';
import { mockFetchCryptoPrices } from '@/services/api';
import { useIntersectionObserver } from '@/lib/animations';
import { cn } from '@/lib/utils';

const Index = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [prices, setPrices] = useState<any[]>([]);
  const { ref, isVisible } = useIntersectionObserver();

  useEffect(() => {
    const fetchPrices = async () => {
      const data = await mockFetchCryptoPrices();
      setPrices(data);
    };

    fetchPrices();

    // Simulate real-time price updates
    const interval = setInterval(() => {
      setPrices(currentPrices => {
        return currentPrices.map(price => ({
          ...price,
          current_price: price.current_price * (1 + (Math.random() * 0.02 - 0.01)), // ±1% change
          price_change_percentage_24h: price.price_change_percentage_24h + (Math.random() * 0.4 - 0.2), // ±0.2% change
        }));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <HeroSection />
        {/* Price Section */}
        <section id="prices" className="py-24 px-6 bg-white dark:bg-gray-950 relative" ref={ref}>
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 py-1 px-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-medium tracking-wide">
                LIVE CRYPTO PRICES
              </div>

              <h2 className={cn(
                "text-3xl md:text-4xl font-bold mb-6 transition-all duration-700",
                isVisible ? "opacity-100" : "opacity-0 translate-y-6"
              )}>
                Real-Time{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600">
                  Cryptocurrency
                </span>{" "}
                Data
              </h2>

              <p className={cn(
                "text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-all duration-700 delay-100",
                isVisible ? "opacity-100" : "opacity-0 translate-y-6"
              )}>
                Access live market data through our Go Fiber microservice API.
                Prices update in real-time through WebSocket connections.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prices.map((price, index) => (
                <PriceCard
                  key={price.id}
                  id={price.id}
                  name={price.name}
                  symbol={price.symbol}
                  price={price.current_price}
                  changePercentage={price.price_change_percentage_24h}
                  marketCap={price.market_cap}
                  image={price.image}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
