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
      <div className="flex items-center gap-0.5">
        <div className="text-[9px] text-gray-500 line-through">{formatPriceWithCurrency(oldPrice)}</div>
        <div className="px-1 py-0.5 rounded-lg hover:opacity-90 hover:scale-103 transition-all cursor-pointer" style={{ backgroundColor: '#8fa9b3' }}>
          <div className="text-xs text-white font-bold animate-pulse">{formatPriceWithCurrency(item.price)}</div>
        </div>
      </div>
    );
  }
  return (
    <div className="px-1 py-0.5 rounded-lg hover:opacity-90 hover:scale-103 transition-all cursor-pointer" style={{ backgroundColor: '#8fa9b3' }}>
      <div className="text-xs font-bold text-white">{formatPriceWithCurrency(item.price)}</div>
    </div>
  );
};

export default React.memo(PriceDisplay);
