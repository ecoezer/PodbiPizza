export interface DeliveryZone {
  label: string;
  minOrder: number;
  fee: number;
}

export const DELIVERY_ZONES: Record<string, DeliveryZone> = {
  '31171-nordstemmen': { label: '31171, Nordstemmen', minOrder: 12, fee: 1 }
} as const;
