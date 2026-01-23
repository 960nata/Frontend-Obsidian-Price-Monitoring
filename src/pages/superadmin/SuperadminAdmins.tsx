import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import api from '../../services/api';
import { Modal } from '../../components/common/Modal';

export default function SuperadminAdmins() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: admins, isLoading } = useQuery({
    queryKey: ['superadmin', 'admins'],
    queryFn: async () => {
      const response = await api.get('/superadmin/admins');
      return response.data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      await api.post('/superadmin/admins', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['superadmin', 'admins'] });
      setIsModalOpen(false);
    },
  });

  const { register, handleSubmit } = useForm();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-white/60 text-sm uppercase tracking-widest">Loading...</div>
      </div>
    );
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'SUPERADMIN':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start mb-12">
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter mb-4 neon-glow-text">
            Admins
          </h1>
          <p className="text-lg text-slate-400 font-light leading-relaxed max-w-2xl">
            Manage admin accounts
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="neon-border-glow bg-neon-mint text-obsidian px-8 py-4 rounded-sm text-sm font-black uppercase tracking-[0.2em] hover:scale-105 transition-all"
        >
          Create Admin
        </button>
      </div>

      {/* Admins Table */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {admins?.map((admin: any) => (
                <tr key={admin.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-white font-bold">{admin.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-slate-300 text-sm">{admin.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded border text-xs font-black uppercase tracking-wider ${getRoleColor(admin.role)}`}>
                      {admin.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {admins?.length === 0 && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-16 rounded-sm text-center">
          <div className="mb-6">
            <span className="material-symbols-outlined text-7xl text-slate-600/50">admin_panel_settings</span>
          </div>
          <p className="text-slate-400 font-light text-lg">No admins found</p>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Admin"
      >
        <form onSubmit={handleSubmit((data) => createMutation.mutate(data))} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Name</label>
            <input
              {...register('name')}
              type="text"
              className="w-full bg-obsidian-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-0 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email</label>
            <input
              {...register('email')}
              type="email"
              className="w-full bg-obsidian-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-0 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Password</label>
            <input
              {...register('password')}
              type="password"
              className="w-full bg-obsidian-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-0 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Role</label>
            <select
              {...register('role')}
              className="w-full bg-obsidian-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-0 transition-all"
              required
            >
              <option value="ADMIN">ADMIN</option>
              <option value="SUPERADMIN">SUPERADMIN</option>
            </select>
          </div>
          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-all text-sm font-bold uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="px-6 py-3 bg-primary text-obsidian rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-all text-sm font-bold uppercase tracking-widest glow-hover"
            >
              {createMutation.isPending ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
