import { MenuItem, PizzaSize } from '../types';

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
    return (item.selectedExtras?.length || 0) * this.EXTRA_PRICE;
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
