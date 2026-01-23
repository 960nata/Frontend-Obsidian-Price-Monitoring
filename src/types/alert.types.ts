export enum AlertType {
  PRICE_DROP = 'PRICE_DROP',
  PRICE_INCREASE = 'PRICE_INCREASE',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  BACK_IN_STOCK = 'BACK_IN_STOCK',
}

export interface Alert {
  id: string;
  userId: string;
  productId: string;
  type: AlertType;
  message: string;
  isRead: boolean;
  createdAt: string;
  product?: {
    id: string;
    name: string;
    imageUrl?: string;
    marketplace: string;
  };
}
