import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import api from '../../services/api';
import { User } from '../../types/user.types';
import { Modal } from '../../components/common/Modal';

export default function AdminUsers() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ['admin', 'users'],
    queryFn: async () => {
      const response = await api.get('/admin/users');
      return response.data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      await api.put(`/admin/users/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      await api.post('/admin/users', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
      setIsModalOpen(false);
    },
  });

  const { register: registerForm, handleSubmit, reset } = useForm();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-white/60 text-sm uppercase tracking-widest">Loading...</div>
      </div>
    );
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'PREMIUM':
        return 'bg-neon-mint/20 text-neon-mint border-neon-mint/30';
      case 'ADMIN':
        return 'bg-blue-400/20 text-blue-400 border-blue-400/30';
      case 'SUPERADMIN':
        return 'bg-purple-400/20 text-purple-400 border-purple-400/30';
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
            Users
          </h1>
          <p className="text-lg text-slate-400 font-light leading-relaxed max-w-2xl">
            Manage user accounts & roles
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="neon-border-glow bg-neon-mint text-obsidian px-8 py-4 rounded-sm text-sm font-black uppercase tracking-[0.2em] hover:scale-105 transition-all"
        >
          Create User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/5 border-b border-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                  Products
                </th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users?.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-white font-extrabold tracking-tight">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-slate-300 text-sm font-light">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-sm border text-xs font-black uppercase tracking-wider ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-neon-mint font-extrabold tracking-tight">{(user as any)._count?.products || 0}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        updateMutation.mutate({
                          id: user.id,
                          data: { role: e.target.value },
                        })
                      }
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm px-3 py-2 text-sm text-white font-medium focus:border-neon-mint/50 focus:ring-0 focus:outline-none transition-all hover:border-neon-mint/30"
                    >
                      <option value="FREE" className="bg-obsidian">FREE</option>
                      <option value="PREMIUM" className="bg-obsidian">PREMIUM</option>
                      <option value="ADMIN" className="bg-obsidian">ADMIN</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {users?.length === 0 && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-16 rounded-sm text-center">
          <div className="mb-6">
            <span className="material-symbols-outlined text-7xl text-slate-600/50">people</span>
          </div>
          <p className="text-slate-400 font-light text-lg">No users found</p>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          reset();
        }}
        title="Create User"
      >
        <form
          onSubmit={handleSubmit((data) => {
            createMutation.mutate(data);
          })}
          className="space-y-6"
        >
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              Name
            </label>
            <input
              {...registerForm('name')}
              type="text"
              className="w-full bg-obsidian-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon-mint focus:ring-0 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              Email
            </label>
            <input
              {...registerForm('email')}
              type="email"
              className="w-full bg-obsidian-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon-mint focus:ring-0 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              Password
            </label>
            <input
              {...registerForm('password')}
              type="password"
              className="w-full bg-obsidian-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon-mint focus:ring-0 transition-all"
              required
              minLength={6}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              Role
            </label>
            <select
              {...registerForm('role')}
              className="w-full bg-obsidian-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:border-neon-mint focus:ring-0 transition-all"
              required
            >
              <option value="FREE" className="bg-obsidian">FREE</option>
              <option value="PREMIUM" className="bg-obsidian">PREMIUM</option>
            </select>
          </div>
          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                reset();
              }}
              className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-sm hover:bg-white/10 transition-all text-sm font-bold uppercase tracking-widest"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="px-6 py-3 bg-neon-mint text-obsidian rounded-sm hover:bg-neon-mint/90 disabled:opacity-50 transition-all text-sm font-black uppercase tracking-widest"
            >
              {createMutation.isPending ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
