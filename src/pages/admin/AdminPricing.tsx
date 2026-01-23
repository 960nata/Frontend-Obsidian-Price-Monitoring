import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import api from '../../services/api';
import { Modal } from '../../components/common/Modal';
import { formatCurrency } from '../../utils/formatters';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  description?: string;
  features: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminPricing() {
  const queryClient = useQueryClient();
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: plans, isLoading, error } = useQuery<PricingPlan[]>({
    queryKey: ['admin', 'pricing'],
    queryFn: async () => {
      try {
        const response = await api.get('/admin/pricing');
        console.log('Pricing plans response:', response.data);
        return response.data;
      } catch (err: any) {
        console.error('Error fetching pricing plans:', err);
        throw err;
      }
    },
    retry: 2,
  });

  console.log('Plans data:', plans, 'Loading:', isLoading, 'Error:', error);

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      await api.put(`/admin/pricing/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'pricing'] });
      setIsModalOpen(false);
      setEditingPlan(null);
    },
  });

  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      price: 0,
      description: '',
      features: [] as string[],
      isActive: true,
    },
  });

  const features = watch('features') || [];

  const handleEdit = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setValue('price', plan.price);
    setValue('description', plan.description || '');
    setValue('features', plan.features || []);
    setValue('isActive', plan.isActive);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingPlan(null);
    reset();
  };

  const addFeature = () => {
    const newFeatures = [...features, ''];
    setValue('features', newFeatures);
  };

  const removeFeature = (index: number) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setValue('features', newFeatures);
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setValue('features', newFeatures);
  };

  const onSubmit = (data: any) => {
    if (editingPlan) {
      updateMutation.mutate({
        id: editingPlan.id,
        data: {
          price: parseFloat(data.price),
          description: data.description,
          features: data.features.filter((f: string) => f.trim() !== ''),
          isActive: data.isActive,
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="mb-12">
          <div className="h-16 bg-white/5 rounded-sm mb-4 animate-pulse"></div>
          <div className="h-6 bg-white/5 rounded-sm w-2/3 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-sm p-6 animate-pulse">
              <div className="h-8 bg-white/5 rounded-sm mb-4"></div>
              <div className="h-12 bg-white/5 rounded-sm mb-4"></div>
              <div className="h-4 bg-white/5 rounded-sm mb-2"></div>
              <div className="h-4 bg-white/5 rounded-sm mb-2"></div>
              <div className="h-4 bg-white/5 rounded-sm mb-6"></div>
              <div className="h-10 bg-white/5 rounded-sm"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter mb-4 neon-glow-text">
            Pricing Plans
          </h1>
          <p className="text-lg text-slate-400 font-light leading-relaxed max-w-2xl">
            Manage pricing plans and subscription prices
          </p>
        </div>
        <div className="bg-red-500/10 border border-red-500/30 rounded-sm p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-red-400">error</span>
            <h3 className="text-lg font-extrabold text-red-400">Error Loading Pricing Plans</h3>
          </div>
          <p className="text-slate-300 text-sm">
            {error instanceof Error ? error.message : 'Failed to load pricing plans. Please try again.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter mb-4 neon-glow-text">
          Pricing Plans
        </h1>
        <p className="text-lg text-slate-400 font-light leading-relaxed max-w-2xl">
          Manage pricing plans and subscription prices
        </p>
      </div>

      {/* Pricing Plans Grid */}
      {plans && plans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => {
            console.log('Rendering plan:', plan);
            return (
          <div
            key={plan.id}
            className={`bg-white/5 backdrop-blur-xl border rounded-sm p-6 transition-all ${
              plan.isActive
                ? 'border-white/5 hover:border-neon-mint/30'
                : 'border-white/5 opacity-60'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-extrabold text-white tracking-tight mb-2">{plan.name}</h3>
                <div className="text-4xl font-extrabold text-neon-mint neon-glow-text tracking-tighter">
                  {formatCurrency(plan.price)}
                  <span className="text-lg text-slate-400 font-light">/month</span>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-sm border text-xs font-black uppercase tracking-wider ${
                  plan.isActive
                    ? 'bg-neon-mint/20 text-neon-mint border-neon-mint/30'
                    : 'bg-slate-500/20 text-slate-400 border-slate-500/30'
                }`}
              >
                {plan.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            {plan.description && (
              <p className="text-slate-400 text-sm font-light mb-4">{plan.description}</p>
            )}

            {plan.features && plan.features.length > 0 && (
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="material-symbols-outlined text-neon-mint text-lg">check_circle</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={() => handleEdit(plan)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white rounded-sm hover:border-neon-mint/30 hover:bg-white/10 transition-all text-sm font-black uppercase tracking-[0.2em]"
            >
              Edit Price
            </button>
          </div>
            );
          })}
        </div>
      ) : (

        <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-16 rounded-sm text-center">
          <div className="mb-6">
            <span className="material-symbols-outlined text-7xl text-slate-600/50">payments</span>
          </div>
          <h3 className="text-xl font-extrabold text-white mb-2">No Pricing Plans Found</h3>
          <p className="text-slate-400 font-light text-lg mb-6">
            {plans === undefined 
              ? 'Loading pricing plans...' 
              : 'Pricing plans haven\'t been set up yet. Please seed the database.'}
          </p>
          {plans !== undefined && (
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-neon-mint text-obsidian rounded-sm hover:bg-neon-mint/90 transition-all text-sm font-black uppercase tracking-widest"
            >
              Refresh Page
            </button>
          )}
        </div>
      )}

      {/* Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={handleClose} title={`Edit ${editingPlan?.name} Plan`}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Price */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              Monthly Price (IDR)
            </label>
            <input
              {...register('price', { required: true, valueAsNumber: true })}
              type="number"
              step="1000"
              min="0"
              className="w-full bg-white/5 border border-white/5 rounded-sm px-4 py-3 text-white focus:border-neon-mint/50 focus:ring-0 transition-all outline-none"
              placeholder="0"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              Description
            </label>
            <textarea
              {...register('description')}
              rows={3}
              className="w-full bg-white/5 border border-white/5 rounded-sm px-4 py-3 text-white focus:border-neon-mint/50 focus:ring-0 transition-all outline-none resize-none"
              placeholder="Plan description..."
            />
          </div>

          {/* Features */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                Features
              </label>
              <button
                type="button"
                onClick={addFeature}
                className="text-xs font-bold text-neon-mint hover:text-neon-mint/80 transition-colors"
              >
                + Add Feature
              </button>
            </div>
            <div className="space-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    className="flex-1 bg-white/5 border border-white/5 rounded-sm px-4 py-2 text-white text-sm focus:border-neon-mint/50 focus:ring-0 transition-all outline-none"
                    placeholder="Feature description..."
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              ))}
              {features.length === 0 && (
                <p className="text-slate-500 text-xs font-light italic">No features added yet</p>
              )}
            </div>
          </div>

          {/* Active Status */}
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
              Active Status
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                {...register('isActive')}
                type="checkbox"
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/10 border border-white/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:bg-neon-mint/20 peer-checked:border-neon-mint/40 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>

          {/* Modal Footer */}
          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-sm hover:bg-white/10 transition-all text-sm font-bold uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="px-6 py-3 bg-neon-mint text-obsidian rounded-sm hover:bg-neon-mint/90 disabled:opacity-50 transition-all text-sm font-black uppercase tracking-widest"
            >
              {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
