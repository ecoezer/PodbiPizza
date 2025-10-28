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
      <header className={`${bgColor} text-white px-3 py-2 rounded-xl mb-4 shadow-lg`}>
        <div className="flex items-center gap-2">
          <ChefHat className="w-5 h-5" />
          <h2 className="text-base font-bold">{title}</h2>
        </div>
        {description && <p className="text-xs opacity-90 leading-relaxed mt-1">{description}</p>}
        {subTitle && <p className="text-xs opacity-80 mt-0.5 italic">{subTitle}</p>}
      </header>

      <div className="space-y-4 pb-2">
        {items.map((item, i) => {
          const rippchenSpecial = isRippchenSpecial(item.id, today);
          const schnitzelSpecial = isSchnitzelSpecial(item.id, today);
          const hasSizes = item.sizes?.length > 0;
          const minPrice = hasSizes ? Math.min(...item.sizes!.map(s => s.price)) : item.price;

          return (
            <div
              key={`${item.id}-${i}`}
              className="bg-white hover:bg-gray-100 rounded-xl shadow-md hover:shadow-lg transition-all p-4 flex justify-between items-center border border-gray-100"
            >
              <div className="flex items-center gap-3 flex-1">
                <span className="w-9 h-9 bg-light-blue-100 text-light-blue-600 rounded-full flex justify-center items-center font-bold text-sm flex-shrink-0">
                  {item.number}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-base font-bold ${rippchenSpecial || schnitzelSpecial ? 'text-red-600' : 'text-gray-900'} flex items-center gap-2`}>
                    {item.name}
                    {isAlcoholicItem(item.id) && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-gray-900 text-white">
                        18+
                      </span>
                    )}
                  </h3>
                  {item.description && <p className="text-sm text-gray-600 mt-0.5 leading-snug">{item.description}</p>}
                  {item.allergens && <p className="text-xs text-gray-500 mt-1.5"><strong>Allergene:</strong> <span className="italic">{item.allergens}</span></p>}

                  <MenuItemBadges
                    item={item}
                    isRippchenSpecial={rippchenSpecial}
                    isSchnitzelSpecial={schnitzelSpecial}
                    hasSizes={hasSizes}
                  />
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 flex-shrink-0 ml-3">
                <div className="text-center">
                  {hasSizes ? (
                    <>
                      <div className="text-xs text-gray-600">ab</div>
                      <div className="text-lg font-bold text-light-blue-600">{formatPriceWithCurrency(minPrice)}</div>
                    </>
                  ) : (
                    <PriceDisplay item={item} specialRippchen={rippchenSpecial} specialSchnitzel={schnitzelSpecial} />
                  )}
                </div>

                <button
                  onClick={() => handleItemClick(item)}
                  className="group relative flex items-center justify-center bg-light-blue-400 text-white w-10 h-10 rounded-full hover:bg-light-blue-500 transition-all transform hover:scale-110 shadow-md hover:shadow-xl"
                  aria-label="Hinzufügen"
                  title="Hinzufügen"
                >
                  <ShoppingCart className="w-5 h-5 group-hover:animate-pulse" />
                  <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs py-1 px-3 rounded whitespace-nowrap pointer-events-none z-10 shadow-lg">
                    Hinzufügen
                  </span>
                </button>
              </div>
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
