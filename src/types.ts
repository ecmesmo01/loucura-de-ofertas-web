export type StoreType = 'amazon' | 'shopee' | 'mercadolivre' | 'magalu' | 'aliexpress' | 'outros';

export type CategoryType = 
  | 'todos'
  | 'eletronicos'
  | 'informatica'
  | 'casa'
  | 'moda'
  | 'games'
  | 'cupons';

export interface Deal {
  id: string;
  title: string;
  description?: string;
  originalPrice?: number;
  currentPrice: number;
  discountPercentage?: number;
  couponCode?: string;
  affiliateUrl: string;
  imageUrl: string;
  store: StoreType;
  category: CategoryType;
  isHot?: boolean;
  isVerified?: boolean;
  freeShipping?: boolean;
  installment?: string;
  createdAt: string;
  likesCount?: number;
}
