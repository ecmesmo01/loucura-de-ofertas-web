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
  description?: string | null;
  originalPrice?: number | null;
  currentPrice: number;
  discountPercentage?: number | null;
  couponCode?: string | null;
  affiliateUrl: string;
  imageUrl: string;
  store: StoreType;
  category: CategoryType;
  isHot?: boolean;
  isVerified?: boolean;
  freeShipping?: boolean;
  installment?: string | null;
  createdAt: string;
  likesCount?: number;
}
