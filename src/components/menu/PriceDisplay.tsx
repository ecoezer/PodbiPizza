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
        <div className="bg-red-100 px-3 py-2 rounded-full inline-block">
          <div className="text-xl text-red-600 font-bold animate-pulse" style={{
            textShadow: '2px 2px 4px rgba(220, 38, 38, 0.3), 0px 1px 0px rgba(220, 38, 38, 0.5)'
          }}>{formatPriceWithCurrency(item.price)}</div>
        </div>
      </>
    );
  }
  return (
    <div className="bg-gray-100 px-3 py-2 rounded-full inline-block">
      <div className="text-xl font-bold text-gray-900" style={{
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.15), 0px 1px 0px rgba(0, 0, 0, 0.2)'
      }}>{formatPriceWithCurrency(item.price)}</div>
    </div>
  );
};

export default React.memo(PriceDisplay);
