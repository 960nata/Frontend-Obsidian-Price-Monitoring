import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Product, Marketplace } from '../../types/product.types';
import { formatCurrency } from '../../utils/formatters';
import { AddProductModal } from '../../components/products/AddProductModal';
import { useTranslation } from '../../hooks/useTranslation';

const marketplaceColors: Record<Marketplace, string> = {
  [Marketplace.TOKOPEDIA]: 'bg-[#ed4d2d]',
  [Marketplace.SHOPEE]: 'bg-[#42b549]',
  [Marketplace.LAZADA]: 'bg-[#0f146d]',
  [Marketplace.BUKALAPAK]: 'bg-[#e31e52]',
};

const marketplaceLabels: Record<Marketplace, string> = {
  [Marketplace.TOKOPEDIA]: 'Tokopedia',
  [Marketplace.SHOPEE]: 'Shopee',
  [Marketplace.LAZADA]: 'Lazada',
  [Marketplace.BUKALAPAK]: 'Bukalapak',
};

export default function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMarketplace, setSelectedMarketplace] = useState<Marketplace | 'ALL'>('ALL');
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await api.get('/products');
      return response.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post('/products', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setIsModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteMutation.mutate(id);
    }
  };

  const filteredProducts = products?.filter(
    (product) => selectedMarketplace === 'ALL' || product.marketplace === selectedMarketplace
  );

  const getPriceChange = (product: Product) => {
    if (!product.priceHistory || product.priceHistory.length < 2) return null;
    const current = product.currentPrice;
    const previous = product.priceHistory[product.priceHistory.length - 2]?.price;
    if (!previous) return null;
    const change = ((current - previous) / previous) * 100;
    return change;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-4 bg-background-dark/80 backdrop-blur-xl border-b border-[#23483f]">
        <div className="flex items-center gap-4 flex-1 max-w-xl">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
              search
            </span>
            <input
              className="w-full bg-obsidian border-white/5 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-primary focus:border-primary text-white placeholder:text-slate-600"
              placeholder={t('common.search') + ' produk, ID atau marketplace..."'}
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-primary text-background-dark px-5 py-2 rounded-lg font-bold text-sm mint-glow transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            {t('products.add')}
          </button>
          <button className="size-10 flex items-center justify-center rounded-lg bg-obsidian border border-white/5 text-slate-400 hover:text-white">
            <span className="material-symbols-outlined">tune</span>
          </button>
        </div>
      </header>

      {/* Page Heading */}
      <div className="px-8 pt-8 pb-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-black text-white tracking-tight">{t('products.title')}</h2>
          <p className="text-slate-500 text-sm">
            {t('products.monitoring')} <span className="text-primary font-mono">{products?.length || 0}</span> {t('products.active')}.
          </p>
        </div>

        {/* Chips/Filters */}
        <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedMarketplace('ALL')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedMarketplace === 'ALL'
                ? 'bg-primary text-background-dark'
                : 'bg-obsidian border border-white/5 text-slate-400 hover:border-primary/50'
            }`}
          >
            {t('products.allPlatforms')}
          </button>
          {Object.values(Marketplace).map((marketplace) => (
            <button
              key={marketplace}
              onClick={() => setSelectedMarketplace(marketplace)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedMarketplace === marketplace
                  ? 'bg-primary text-background-dark'
                  : 'bg-obsidian border border-white/5 text-slate-400 hover:border-primary/50'
              }`}
            >
              {marketplaceLabels[marketplace]}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-8 pb-12 flex-1 overflow-y-auto">
        {filteredProducts && filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {filteredProducts.map((product) => {
              const priceChange = getPriceChange(product);
              const isPriceUp = priceChange && priceChange > 0;
              const isPriceDown = priceChange && priceChange < 0;

              return (
                <div
                  key={product.id}
                  className="glass-panel group rounded-xl overflow-hidden border border-white/10 hover:border-primary transition-all flex flex-col"
                >
                  <div className="relative aspect-square overflow-hidden bg-slate-900/50">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white/20 text-6xl">image</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-background-dark/80 backdrop-blur-md border border-primary/20 text-primary px-2 py-0.5 rounded text-[10px] font-black uppercase">
                      {marketplaceLabels[product.marketplace]}
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <Link
                        to={`/products/${product.id}`}
                        className="size-8 bg-background-dark/90 text-white rounded-lg flex items-center justify-center hover:text-primary border border-white/5"
                      >
                        <span className="material-symbols-outlined text-sm">visibility</span>
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="size-8 bg-background-dark/90 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-500/20 border border-white/5"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-white font-bold text-sm leading-tight mb-1 truncate">
                      {product.name}
                    </h3>
                    <p className="text-slate-500 text-[10px] mb-3">
                      Updated {new Date(product.updatedAt).toLocaleDateString()}
                    </p>
                    <div className="mt-auto flex items-end justify-between">
                      <div>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-tighter">
                          {t('products.currentPrice')}
                        </p>
                        <p className="text-primary text-xl font-black">{formatCurrency(product.currentPrice)}</p>
                      </div>
                      {priceChange !== null && (
                        <div
                          className={`flex items-center text-[10px] font-bold ${
                            isPriceUp ? 'text-red-400' : isPriceDown ? 'text-green-400' : 'text-slate-500'
                          }`}
                        >
                          <span className="material-symbols-outlined text-xs">
                            {isPriceUp ? 'trending_up' : isPriceDown ? 'trending_down' : 'remove'}
                          </span>
                          {Math.abs(priceChange).toFixed(1)}%
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Add New Placeholder */}
            <div
              onClick={() => setIsModalOpen(true)}
              className="border-2 border-dashed border-[#23483f] rounded-xl flex flex-col items-center justify-center gap-4 p-8 group cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <div className="size-12 rounded-full border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">add</span>
              </div>
              <p className="text-slate-500 font-bold text-sm text-center">{t('products.add')}</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-20">
            <div className="text-center space-y-4">
              <span className="material-symbols-outlined text-6xl text-slate-500">inventory_2</span>
              <p className="text-slate-400 text-lg">{t('products.noProducts')}</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary text-background-dark px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-all"
              >
                {t('products.add')}
              </button>
            </div>
          </div>
        )}
      </div>

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) => createMutation.mutate(data)}
        isLoading={createMutation.isPending}
      />
    </div>
  );
}
