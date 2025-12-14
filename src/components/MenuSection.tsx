import React, { useState, useCallback } from 'react';
import { ShoppingCart, ChefHat } from 'lucide-react';
import { MenuItem, PizzaSize } from '../types';
import ItemModal from './ItemModal';
import OrderConfirmationModal from './modal/OrderConfirmationModal';
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
  const [showSimpleItemConfirmation, setShowSimpleItemConfirmation] = useState(false);
  const [simpleItemForConfirmation, setSimpleItemForConfirmation] = useState<MenuItem | null>(null);
  const today = new Date().getDay();

  const handleItemClick = useCallback((item: MenuItem) => {
    if (needsConfiguration(item)) {
      setSelectedItem(item);
      onModalStateChange?.(true);
    } else {
      setSimpleItemForConfirmation(item);
      setShowSimpleItemConfirmation(true);
    }
  }, [onAddToOrder, onModalStateChange]);

  const closeModal = useCallback(() => {
    setSelectedItem(null);
    onModalStateChange?.(false);
  }, [onModalStateChange]);

  if (!items.length) return null;

  return (
    <section className={`mb-3 ${title === 'Fleischgerichte' ? 'mt-8' : ''}`}>
      <header className="mb-2">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <span className="text-lg text-gray-600">{items.length} Artikel</span>
        </div>
        {description && <p className="text-sm text-gray-600 mt-2 leading-relaxed">{description}</p>}
        {subTitle && <p className="text-xs text-gray-500 mt-1 italic">{subTitle}</p>}
      </header>

      <div className="space-y-1.5">
        {items.map((item, i) => {
          const rippchenSpecial = isRippchenSpecial(item.id, today);
          const schnitzelSpecial = isSchnitzelSpecial(item.id, today);
          const hasSizes = item.sizes?.length > 0;
          const minPrice = hasSizes ? Math.min(...item.sizes!.map(s => s.price)) : item.price;

          return (
            <div
              key={`${item.id}-${i}`}
              className="menu-card-animated hover:bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all p-1.5 flex items-start gap-1.5 border border-gray-100"
            >
              <span className="w-7 h-7 bg-light-blue-50 text-light-blue-600 rounded-full flex justify-center items-center font-bold text-xs flex-shrink-0">
                {item.number}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className={`text-sm font-bold ${rippchenSpecial || schnitzelSpecial ? 'text-red-600' : 'text-gray-900'}`}>
                    {item.name}
                  </h3>
                  <div
                    onClick={() => handleItemClick(item)}
                    className="cursor-pointer flex-shrink-0"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleItemClick(item)}
                    aria-label="Hinzufügen"
                  >
                    {hasSizes ? (
                      <div className="px-1 py-0.5 rounded-lg hover:opacity-90 hover:scale-103 transition-all" style={{ backgroundColor: '#8fa9b3' }}>
                        <div className="text-xs font-bold text-white">{formatPriceWithCurrency(minPrice)}</div>
                      </div>
                    ) : (
                      <PriceDisplay item={item} specialRippchen={rippchenSpecial} specialSchnitzel={schnitzelSpecial} />
                    )}
                  </div>
                  {isAlcoholicItem(item.id) && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-900 text-white flex-shrink-0">
                      18+
                    </span>
                  )}
                </div>

                {item.description && <p className="text-xs text-gray-600 leading-tight">{item.description}</p>}
                {item.allergens && <p className="text-[11px] text-gray-500"><strong>Allergene:</strong> <span className="italic">{item.allergens}</span></p>}
                {item.pfand && item.pfand > 0 && (
                  <p className="text-[11px] text-gray-600 font-medium">
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
                className="flex items-center justify-center bg-light-blue-400 text-white w-8 h-8 rounded-full hover:bg-light-blue-500 transition-all transform hover:scale-103 shadow-sm hover:shadow-md flex-shrink-0"
                aria-label="Hinzufügen"
                title="Hinzufügen"
              >
                <ShoppingCart className="w-4 h-4" />
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

      {simpleItemForConfirmation && (
        <OrderConfirmationModal
          item={simpleItemForConfirmation}
          isOpen={showSimpleItemConfirmation}
          totalPrice={simpleItemForConfirmation.price}
          onConfirm={(quantity) => {
            for (let i = 0; i < quantity; i++) {
              onAddToOrder(simpleItemForConfirmation);
            }
            setShowSimpleItemConfirmation(false);
            setSimpleItemForConfirmation(null);
          }}
          onCancel={() => {
            setShowSimpleItemConfirmation(false);
          }}
        />
      )}
    </section>
  );
};

export default React.memo(MenuSection);
