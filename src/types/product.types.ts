export enum Marketplace {
  TOKOPEDIA = 'TOKOPEDIA',
  SHOPEE = 'SHOPEE',
  BUKALAPAK = 'BUKALAPAK',
  LAZADA = 'LAZADA',
}

export interface PriceHistory {
  id: string;
  productId: string;
  price: number;
  stockStatus?: string;
  scrapedAt: string;
}

export interface Product {
  id: string;
  userId: string;
  name: string;
  marketplace: Marketplace;
  productUrl: string;
  competitorUrl: string;
  currentPrice: number;
  targetPrice?: number;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  priceHistory?: PriceHistory[];
  _count?: {
    alerts: number;
  };
}
