
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface PriceCardProps {
  id: string;
  name: string;
  symbol: string;
  price: number;
  changePercentage: number;
  marketCap: number;
  image: string;
  index: number;
}

const formatPrice = (price: number): string => {
  return price >= 1
    ? price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : price.toFixed(price < 0.0001 ? 8 : price < 0.01 ? 6 : 4);
};

const formatMarketCap = (marketCap: number): string => {
  if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
  if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
  if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
  return `$${marketCap.toLocaleString()}`;
};

const PriceCard: React.FC<PriceCardProps> = ({
  id,
  name,
  symbol,
  price,
  changePercentage,
  marketCap,
  image,
  index
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 1000);
    return () => clearTimeout(timer);
  }, [price]);

  return (
    <div
      className={cn(
        "glass-panel dark:glass-panel-dark transition-all duration-300 p-6 relative overflow-hidden",
        "hover:shadow-lg hover:translate-y-[-2px]",
        "animate-slide-up"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient */}
      <div
        className={cn(
          "absolute inset-0 opacity-10 transition-opacity duration-300",
          isHovered ? "opacity-20" : "opacity-10",
          changePercentage >= 0
            ? "bg-gradient-to-br from-green-300/30 to-emerald-500/30"
            : "bg-gradient-to-br from-red-300/30 to-rose-500/30"
        )}
      />

      {/* Content */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex flex-col">
          <div className="flex items-center space-x-3 mb-3">
            <img
              src={image}
              alt={name}
              className="w-10 h-10 rounded-full"
              loading="lazy"
            />
            <div>
              <h3 className="font-medium text-lg">{name}</h3>
              <span className="text-gray-500 dark:text-gray-400 text-sm uppercase">{symbol}</span>
            </div>
          </div>

          <div className="mt-4">
            <div className={cn(
              "text-2xl font-semibold transition-all",
              animate ? "text-blue-600 dark:text-blue-400 scale-105" : ""
            )}>
              ${formatPrice(price)}
            </div>
            <div className={cn(
              "text-sm font-medium mt-1",
              changePercentage >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            )}>
              {changePercentage >= 0 ? "+" : ""}{changePercentage.toFixed(2)}%
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="text-xs text-gray-500 dark:text-gray-400">Market Cap</div>
          <div className="text-sm mt-1">{formatMarketCap(marketCap)}</div>

          <button className={cn(
            "mt-6 py-2 px-4 rounded-md text-xs font-medium transition-all",
            "opacity-0 translate-y-2",
            isHovered && "opacity-100 translate-y-0",
            changePercentage >= 0
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
          )}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
