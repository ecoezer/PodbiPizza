import { MenuItem, PizzaSize } from '../types';
import { pizzaExtrasPricing } from '../data/menuItems';

interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
  selectedSize?: PizzaSize;
  selectedExtras?: string[];
}

export class PriceService {
  private static readonly EXTRA_PRICE = 1.00;

  static calculateItemBasePrice(item: OrderItem): number {
    return item.selectedSize ? item.selectedSize.price : item.menuItem.price;
  }

  static calculateExtrasPrice(item: OrderItem): number {
    if (!item.selectedExtras || item.selectedExtras.length === 0) {
      return 0;
    }

    if (!item.selectedSize) {
      return (item.selectedExtras.length) * this.EXTRA_PRICE;
    }

    const sizeName = item.selectedSize.name;
    let totalExtrasPrice = 0;

    item.selectedExtras.forEach(extra => {
      const extraPricing = pizzaExtrasPricing[extra as keyof typeof pizzaExtrasPricing];
      if (extraPricing) {
        totalExtrasPrice += extraPricing[sizeName as '24cm' | '28cm' | '40cm'] || this.EXTRA_PRICE;
      } else {
        totalExtrasPrice += this.EXTRA_PRICE;
      }
    });

    return totalExtrasPrice;
  }

  static calculateItemPrice(item: OrderItem): number {
    return this.calculateItemBasePrice(item) + this.calculateExtrasPrice(item);
  }

  static calculateItemTotal(item: OrderItem): number {
    return this.calculateItemPrice(item) * item.quantity;
  }

  static calculateCartSubtotal(items: OrderItem[]): number {
    return items.reduce((sum, item) => sum + this.calculateItemTotal(item), 0);
  }

  static formatPrice(price: number): string {
    return price.toFixed(2).replace('.', ',') + ' €';
  }

  static formatPriceWithoutSymbol(price: number): string {
    return price.toFixed(2).replace('.', ',');
  }
}
