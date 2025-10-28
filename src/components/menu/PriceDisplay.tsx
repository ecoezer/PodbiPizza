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
        <div className="text-sm text-gray-500 line-through mb-1">{formatPriceWithCurrency(oldPrice)}</div>
        <div className="px-3 py-2 rounded-full inline-block" style={{ backgroundColor: '#8fa9b3' }}>
          <div className="text-xl text-white font-bold animate-pulse">{formatPriceWithCurrency(item.price)}</div>
        </div>
      </>
    );
  }
  return (
    <div className="px-3 py-2 rounded-full inline-block" style={{ backgroundColor: '#8fa9b3' }}>
      <div className="text-xl font-bold text-white">{formatPriceWithCurrency(item.price)}</div>
    </div>
  );
};

export default React.memo(PriceDisplay);
