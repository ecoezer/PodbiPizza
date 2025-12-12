import React, { useState, useCallback } from 'react';
import { ShoppingCart, ChefHat } from 'lucide-react';
import { MenuItem, PizzaSize } from '../types';
import ItemModal from './ItemModal';
import PriceDisplay from './menu/PriceDisplay';
import MenuItemBadges from './menu/MenuItemBadges';
import { needsConfiguration, isRippchenSpecial, isSchnitzelSpecial, isAlcoholicItem } from '../utils/itemChecks';
import { formatPriceWithCurrency } from '../utils/priceCalculations';

interface MenuSectionProps {
  title: string;
  description?: string;
  subTitle?: string;
  items: MenuItem[];
  bgColor?: string;
  onAddToOrder: (
    menuItem: MenuItem,
    selectedSize?: PizzaSize,
    selectedIngredients?: string[],
    selectedExtras?: string[],
    selectedPastaType?: string,
    selectedSauce?: string,
    selectedExclusions?: string[],
    selectedSideDish?: string
  ) => void;
  onModalStateChange?: (isOpen: boolean) => void;
}


const MenuSection: React.FC<MenuSectionProps> = ({ title, description, subTitle, items, bgColor = 'bg-light-blue-400', onAddToOrder, onModalStateChange }) => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const today = new Date().getDay();

  const handleItemClick = useCallback((item: MenuItem) => {
    if (needsConfiguration(item)) {
      setSelectedItem(item);
      onModalStateChange?.(true);
    } else {
      onAddToOrder(item);
    }
  }, [onAddToOrder, onModalStateChange]);

  const closeModal = useCallback(() => {
    setSelectedItem(null);
    onModalStateChange?.(false);
  }, [onModalStateChange]);

  if (!items.length) return null;

  return (
    <section className={`mb-6 ${title === 'Fleischgerichte' ? 'mt-8' : ''}`}>
      <header className="mb-3">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <span className="text-lg text-gray-600">{items.length} Artikel</span>
        </div>
        {description && <p className="text-sm text-gray-600 mt-2 leading-relaxed">{description}</p>}
        {subTitle && <p className="text-xs text-gray-500 mt-1 italic">{subTitle}</p>}
      </header>

      <div className="space-y-3 pb-2">
        {items.map((item, i) => {
          const rippchenSpecial = isRippchenSpecial(item.id, today);
          const schnitzelSpecial = isSchnitzelSpecial(item.id, today);
          const hasSizes = item.sizes?.length > 0;
          const minPrice = hasSizes ? Math.min(...item.sizes!.map(s => s.price)) : item.price;

          return (
            <div
              key={`${item.id}-${i}`}
              className="menu-card-animated hover:bg-gray-100 rounded-3xl shadow-md hover:shadow-lg transition-all p-3 flex items-start gap-3 border border-gray-100"
            >
              <span className="w-9 h-9 bg-light-blue-100 text-light-blue-600 rounded-full flex justify-center items-center font-bold text-sm flex-shrink-0 mt-1">
                {item.number}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className={`text-lg font-bold ${rippchenSpecial || schnitzelSpecial ? 'text-red-600' : 'text-gray-900'}`}>
                    {item.name}
                  </h3>
                  <div
                    onClick={() => handleItemClick(item)}
                    className="cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleItemClick(item)}
                    aria-label="Hinzufügen"
                  >
                    {hasSizes ? (
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-600">ab</span>
                        <div className="sm:px-2 sm:py-1 px-1 py-0.5 rounded-full hover:opacity-90 hover:scale-105 transition-all" style={{ backgroundColor: '#8fa9b3' }}>
                          <div className="sm:text-sm text-[8px] font-bold text-white">{formatPriceWithCurrency(minPrice)}</div>
                        </div>
                      </div>
                    ) : (
                      <PriceDisplay item={item} specialRippchen={rippchenSpecial} specialSchnitzel={schnitzelSpecial} />
                    )}
                  </div>
                  {isAlcoholicItem(item.id) && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-gray-900 text-white flex-shrink-0">
                      18+
                    </span>
                  )}
                </div>

                {item.description && <p className="text-base text-gray-600 mt-1.5 leading-relaxed">{item.description}</p>}
                {item.allergens && <p className="text-xs text-gray-500 mt-1"><strong>Allergene:</strong> <span className="italic">{item.allergens}</span></p>}
                {item.pfand && item.pfand > 0 && (
                  <p className="text-xs text-gray-600 mt-1 font-medium">
                    zzgl. {formatPriceWithCurrency(item.pfand)} Pfand
                  </p>
                )}

                <MenuItemBadges
                  item={item}
                  isRippchenSpecial={rippchenSpecial}
                  isSchnitzelSpecial={schnitzelSpecial}
                  hasSizes={hasSizes}
                />
              </div>

              <button
                onClick={() => handleItemClick(item)}
                className="group relative flex items-center justify-center bg-light-blue-400 text-white w-10 h-10 rounded-full hover:bg-light-blue-500 transition-all transform hover:scale-110 shadow-md hover:shadow-xl flex-shrink-0 mt-1"
                aria-label="Hinzufügen"
                title="Hinzufügen"
              >
                <ShoppingCart className="w-5 h-5 cart-icon-hover" />
                <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs py-1 px-3 rounded whitespace-nowrap pointer-events-none z-10 shadow-lg">
                  Hinzufügen
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {selectedItem && (
        <ItemModal
          item={selectedItem}
          isOpen={!!selectedItem}
          onClose={closeModal}
          onAddToOrder={onAddToOrder}
        />
      )}
    </section>
  );
};

export default React.memo(MenuSection);
