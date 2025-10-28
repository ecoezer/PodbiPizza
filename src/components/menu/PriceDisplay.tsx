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
        <div className="text-sm text-gray-500 line-through">{formatPriceWithCurrency(oldPrice)}</div>
        <div className="text-xl text-red-600 font-bold animate-pulse">{formatPriceWithCurrency(item.price)}</div>
      </>
    );
  }
  return <div className="text-xl font-bold text-gray-900">{formatPriceWithCurrency(item.price)}</div>;
};

export default React.memo(PriceDisplay);
