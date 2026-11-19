import React from 'react';
import { CategoryType, StoreType } from '../types';
import { Flame, Laptop, Smartphone, Home, Shirt, Gamepad2, Ticket, ArrowUpDown } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  selectedStore: StoreType | 'todas';
  onSelectStore: (store: StoreType | 'todas') => void;
  sortBy: 'recentes' | 'desconto' | 'menor_preco';
  onSortChange: (sort: 'recentes' | 'desconto' | 'menor_preco') => void;
  totalOffers: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedStore,
  onSelectStore,
  sortBy,
  onSortChange,
  totalOffers,
}) => {
  const categories: { id: CategoryType; label: string; icon: React.ReactNode }[] = [
    { id: 'todos', label: 'Todas as Ofertas', icon: <Flame className="w-3.5 h-3.5" /> },
    { id: 'informatica', label: 'Informática', icon: <Laptop className="w-3.5 h-3.5" /> },
    { id: 'eletronicos', label: 'Smartphones & Tech', icon: <Smartphone className="w-3.5 h-3.5" /> },
    { id: 'casa', label: 'Casa & Cozinha', icon: <Home className="w-3.5 h-3.5" /> },
    { id: 'games', label: 'Games & Consoles', icon: <Gamepad2 className="w-3.5 h-3.5" /> },
    { id: 'moda', label: 'Moda & Acessórios', icon: <Shirt className="w-3.5 h-3.5" /> },
    { id: 'cupons', label: 'Cupons Exclusivos', icon: <Ticket className="w-3.5 h-3.5" /> },
  ];

  const stores: { id: StoreType | 'todas'; label: string; color: string }[] = [
    { id: 'todas', label: 'Todas as Lojas', color: 'bg-slate-200 dark:bg-slate-700' },
    { id: 'amazon', label: 'Amazon', color: 'bg-amber-500 text-white' },
    { id: 'shopee', label: 'Shopee', color: 'bg-orange-600 text-white' },
    { id: 'mercadolivre', label: 'Mercado Livre', color: 'bg-yellow-400 text-slate-900 font-medium' },
    { id: 'magalu', label: 'Magalu', color: 'bg-blue-600 text-white' },
  ];

  return (
    <div className="space-y-4 py-6 border-b border-slate-200 dark:border-slate-800">
      
      {/* Category Pills (Horizontal scrollable on mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Secondary Bar: Store selection, Count & Sorting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        
        {/* Store Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 mr-1 shrink-0">
            Filtrar Loja:
          </span>
          {stores.map((s) => {
            const isSelected = selectedStore === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onSelectStore(s.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'border-red-600 bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400 dark:border-red-500 font-bold'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Total Count & Sort Dropdown */}
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            <strong className="text-slate-900 dark:text-white font-bold">{totalOffers}</strong> ofertas
          </span>

          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value="recentes">Mais Recentes</option>
              <option value="desconto">Maior Desconto (%)</option>
              <option value="menor_preco">Menor Preço (R$)</option>
            </select>
          </div>
        </div>

      </div>

    </div>
  );
};
