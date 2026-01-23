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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl obsidian-glass rounded-xl overflow-hidden shadow-2xl">
        {/* Neon Accent Border Top */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-primary shadow-[0_0_15px_#0df2a6]"></div>

        {/* Modal Header */}
        <div className="p-8 pb-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight leading-none mb-2">
                {t('modal.monitorProduct')}
              </h1>
              <p className="text-primary/70 text-sm font-light">
                {t('modal.description')}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-white/40 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="px-8 pb-8 space-y-8">
          {/* Marketplace Selection */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">
              {t('modal.marketplace')}
            </label>
            <div className="grid grid-cols-4 gap-3">
              {marketplaces.map((marketplace) => (
                <button
                  key={marketplace.value}
                  type="button"
                  onClick={() => setSelectedMarketplace(marketplace.value)}
                  className={`flex flex-col items-center justify-center gap-2 p-4 rounded-lg border transition-all group ${
                    selectedMarketplace === marketplace.value
                      ? 'bg-primary/10 border-primary text-primary shadow-[inset_0_0_10px_rgba(13,242,166,0.1)] tab-active'
                      : 'bg-white/5 border-white/10 text-white/40 hover:border-primary/40 hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-3xl group-hover:text-primary transition-colors">
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
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <label className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">
                {t('modal.productLink')}
              </label>
              <span className="flex items-center gap-1 text-[10px] text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                {t('modal.scanning')}
              </span>
            </div>
            <div className="relative">
              <input
                {...register('competitorUrl')}
                className="w-full bg-obsidian-black border border-white/10 rounded-lg px-4 py-4 text-white placeholder:text-white/20 focus:ring-0 focus:border-primary focus:shadow-[0_0_15px_rgba(13,242,166,0.2)] transition-all outline-none font-light"
                placeholder="https://www.tokopedia.com/store/product-id..."
                type="text"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40">
                <span className="material-symbols-outlined">link</span>
              </div>
            </div>
            {errors.competitorUrl && (
              <p className="text-red-400 text-xs">{errors.competitorUrl.message as string}</p>
            )}
          </div>

          {/* Product Name */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">
              {t('modal.productName')}
            </label>
            <input
              {...register('name')}
              className="w-full bg-obsidian-black border border-white/10 rounded-lg px-4 py-4 text-white placeholder:text-white/20 focus:ring-0 focus:border-primary transition-all outline-none"
              placeholder="Enter product name..."
              type="text"
            />
            {errors.name && (
              <p className="text-red-400 text-xs">{errors.name.message as string}</p>
            )}
          </div>

          {/* Grid Inputs */}
          <div className="grid grid-cols-2 gap-6">
            {/* Target Price */}
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">
                Target Price (Optional)
              </label>
              <div className="relative">
                <input
                  {...register('targetPrice', { valueAsNumber: true })}
                  className="w-full bg-obsidian-black border border-white/10 rounded-lg px-4 py-4 text-white focus:ring-0 focus:border-primary transition-all outline-none"
                  type="number"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Hidden marketplace field */}
          <input type="hidden" {...register('marketplace')} value={selectedMarketplace} />

          {/* Modal Footer */}
          <div className="pt-4 flex gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-4 px-6 border border-primary/30 text-primary font-bold text-sm tracking-widest rounded-lg hover:bg-primary/5 transition-all uppercase"
            >
              {t('modal.abort')}
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-[2] py-4 px-6 bg-primary text-obsidian-black font-black text-sm tracking-widest rounded-lg hover:shadow-[0_0_25px_rgba(13,242,166,0.6)] active:scale-95 transition-all uppercase disabled:opacity-50"
            >
              {isLoading ? t('common.loading') : t('modal.initialize')}
            </button>
          </div>
        </form>

        {/* Bottom Scanning Texture */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      </div>
    </div>
  );
};
