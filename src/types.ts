export interface MenuItem {
  id: number;
  number: number;
  name: string;
  description?: string;
  price: number;
  allergens?: string;
  sizes?: PizzaSize[];
  isWunschPizza?: boolean;
  isPizza?: boolean;
  isPasta?: boolean;
  isSpezialitaet?: boolean;
  isBeerSelection?: boolean;
  isMeatSelection?: boolean;
}

export interface PizzaSize {
  name: string;
  price: number;
  description?: string;
}

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
  selectedSize?: PizzaSize;
  selectedIngredients?: string[];
  selectedExtras?: string[];
  selectedPastaType?: string;
  selectedSauce?: string;
  selectedSideDish?: string;
}

export interface CustomerInfo {
  name: string;
  address: string;
  phone: string;
  note?: string;
}