import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '../../utils/validators';
import { Marketplace } from '../../types/product.types';
import { useTranslation } from '../../hooks/useTranslation';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

export const AddProductModal = ({ isOpen, onClose, onSubmit, isLoading }: AddProductModalProps) => {
  const [selectedMarketplace, setSelectedMarketplace] = useState<Marketplace>(Marketplace.TOKOPEDIA);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      marketplace: Marketplace.TOKOPEDIA,
    },
  });

  const handleFormSubmit = (data: any) => {
    onSubmit({ ...data, marketplace: selectedMarketplace });
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  const marketplaces = [
    { value: Marketplace.TOKOPEDIA, label: 'Tokopedia', icon: 'shopping_bag' },
    { value: Marketplace.SHOPEE, label: 'Shopee', icon: 'shopping_cart' },
    { value: Marketplace.LAZADA, label: 'Lazada', icon: 'storefront' },
    { value: Marketplace.BUKALAPAK, label: 'Bukalapak', icon: 'package' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/5 rounded-sm overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="p-8 pb-6 border-b border-white/5">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-extrabold text-white tracking-tighter mb-3 neon-glow-text">
                {t('modal.monitorProduct')}
              </h1>
              <p className="text-lg text-slate-400 font-light leading-relaxed">
                {t('modal.description')}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="px-8 pb-8 space-y-8">
          {/* Marketplace Selection */}
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
              {t('modal.marketplace')}
            </label>
            <div className="grid grid-cols-4 gap-3">
              {marketplaces.map((marketplace) => (
                <button
                  key={marketplace.value}
                  type="button"
                  onClick={() => setSelectedMarketplace(marketplace.value)}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-sm border transition-all group ${
                    selectedMarketplace === marketplace.value
                      ? 'bg-neon-mint/10 border-neon-mint/50 text-neon-mint shadow-[0_0_15px_rgba(0,255,204,0.2)]'
                      : 'bg-white/5 border-white/5 text-slate-400 hover:border-neon-mint/30 hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-3xl group-hover:text-neon-mint transition-colors">
                    {marketplace.icon}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {marketplace.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* URL Input */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                {t('modal.productLink')}
              </label>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-mint animate-pulse"></span>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-neon-mint/80">
                  {t('modal.scanning')}
                </span>
              </span>
            </div>
            <div className="relative">
              <input
                {...register('competitorUrl')}
                className="w-full bg-white/5 border border-white/5 rounded-sm px-4 py-4 text-white placeholder:text-white/20 focus:ring-0 focus:border-neon-mint/50 focus:shadow-[0_0_15px_rgba(0,255,204,0.2)] transition-all outline-none font-light"
                placeholder="https://www.tokopedia.com/store/product-id..."
                type="text"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neon-mint/40">
                <span className="material-symbols-outlined">link</span>
              </div>
            </div>
            {errors.competitorUrl && (
              <p className="text-red-400 text-xs font-light">{errors.competitorUrl.message as string}</p>
            )}
          </div>

          {/* Product Name */}
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
              {t('modal.productName')}
            </label>
            <input
              {...register('name')}
              className="w-full bg-white/5 border border-white/5 rounded-sm px-4 py-4 text-white placeholder:text-white/20 focus:ring-0 focus:border-neon-mint/50 transition-all outline-none"
              placeholder="Enter product name..."
              type="text"
            />
            {errors.name && (
              <p className="text-red-400 text-xs font-light">{errors.name.message as string}</p>
            )}
          </div>

          {/* Grid Inputs */}
          <div className="grid grid-cols-2 gap-6">
            {/* Target Price */}
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                Target Price (Optional)
              </label>
              <div className="relative">
                <input
                  {...register('targetPrice', { valueAsNumber: true })}
                  className="w-full bg-white/5 border border-white/5 rounded-sm px-4 py-4 text-white focus:ring-0 focus:border-neon-mint/50 transition-all outline-none"
                  type="number"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Hidden marketplace field */}
          <input type="hidden" {...register('marketplace')} value={selectedMarketplace} />

          {/* Modal Footer */}
          <div className="pt-6 flex gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-4 px-6 bg-white/5 border border-white/10 text-white font-black text-sm tracking-[0.2em] rounded-sm hover:border-neon-mint/30 hover:bg-white/10 transition-all uppercase"
            >
              {t('modal.abort')}
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-[2] py-4 px-6 neon-border-glow bg-neon-mint text-obsidian font-black text-sm tracking-[0.2em] rounded-sm hover:scale-105 active:scale-95 transition-all uppercase disabled:opacity-50"
            >
              {isLoading ? t('common.loading') : t('modal.initialize')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
