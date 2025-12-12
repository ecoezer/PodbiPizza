import React from 'react';
import { MenuItem } from '../../types';
import { formatPriceWithCurrency } from '../../utils/priceCalculations';
import { PRICING } from '../../constants/pricing';

interface PriceDisplayProps {
  item: MenuItem;
  specialRippchen: boolean;
  specialSchnitzel: boolean;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ item, specialRippchen, specialSchnitzel }) => {
  if (specialRippchen || specialSchnitzel) {
    const oldPrice = specialRippchen ? PRICING.RIPPCHEN_SPECIAL_OLD_PRICE : PRICING.SCHNITZEL_SPECIAL_OLD_PRICE;
    return (
      <>
        <div className="text-xs text-gray-500 line-through mb-1">{formatPriceWithCurrency(oldPrice)}</div>
        <div className="sm:px-2 sm:py-1 px-1 py-0.5 rounded-full block hover:opacity-90 hover:scale-105 transition-all cursor-pointer" style={{ backgroundColor: '#8fa9b3' }}>
          <div className="sm:text-sm text-[8px] text-white font-bold animate-pulse">{formatPriceWithCurrency(item.price)}</div>
        </div>
      </>
    );
  }
  return (
    <div className="sm:px-2 sm:py-1 px-1 py-0.5 rounded-full block hover:opacity-90 hover:scale-105 transition-all cursor-pointer" style={{ backgroundColor: '#8fa9b3' }}>
      <div className="sm:text-sm text-[8px] font-bold text-white">{formatPriceWithCurrency(item.price)}</div>
    </div>
  );
};

export default React.memo(PriceDisplay);
