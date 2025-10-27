export interface DeliveryZone {
  label: string;
  minOrder: number;
  fee: number;
}

export const DELIVERY_ZONES: Record<string, DeliveryZone> = {
  '21435-ashausen': { label: '21435, Ashausen', minOrder: 12, fee: 1 },
  '21423-bahlburg': { label: '21423, Bahlburg', minOrder: 30, fee: 3 },
  '24616-borstel': { label: '24616, Borstel', minOrder: 30, fee: 3 },
  '21438-brackel-1': { label: '21438, Brackel', minOrder: 30, fee: 3 },
  '21438-brackel-2': { label: '21438, Brackel', minOrder: 30, fee: 3 },
  '21435-buellhorn': { label: '21435, Büllhorn', minOrder: 30, fee: 3 },
  '21441-garstedt-1': { label: '21441, Garstedt', minOrder: 30, fee: 3 },
  '21441-garstedt-2': { label: '21441, Garstedt', minOrder: 30, fee: 3 },
  '21423-gehrden': { label: '21423, Gehrden', minOrder: 30, fee: 3 },
  '21423-grevelau': { label: '21423, Grevelau', minOrder: 30, fee: 3 },
  '21220-holtorfsloh': { label: '21220, Holtorfsloh', minOrder: 30, fee: 3 },
  '21423-hoopte': { label: '21423, Hoopte', minOrder: 30, fee: 3 },
  '21423-luhdorf': { label: '21423, Luhdorf', minOrder: 30, fee: 3 },
  '21423-pattensen': { label: '21423, Pattensen', minOrder: 20, fee: 2.5 },
  '21423-roydorf': { label: '21423, Roydorf', minOrder: 30, fee: 3 },
  '21423-scharmbeck': { label: '21423, Scharmbeck', minOrder: 17, fee: 2 },
  '21435-stelle-1': { label: '21435, Stelle', minOrder: 30, fee: 3 },
  '21435-stelle-2': { label: '21435, Stelle', minOrder: 30, fee: 3 },
  '21423-stoeckte': { label: '21423, Stöckte', minOrder: 30, fee: 3 },
  '21442-tangendorf': { label: '21442, Tangendorf', minOrder: 30, fee: 3 },
  '21438-thieshope-1': { label: '21438, Thieshope', minOrder: 30, fee: 3 },
  '21438-thieshope-2': { label: '21438, Thieshope', minOrder: 30, fee: 3 },
  '21442-toppenstedt': { label: '21442, Toppenstedt', minOrder: 30, fee: 3 },
  '21444-vierhoefen': { label: '21444, Vierhöfen', minOrder: 30, fee: 3 },
  '21423-winsen': { label: '21423, Winsen', minOrder: 30, fee: 3 },
  '21445-wulfsen': { label: '21445, Wulfsen', minOrder: 30, fee: 3 }
} as const;
