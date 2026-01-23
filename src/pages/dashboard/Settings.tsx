import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import { useAuthStore } from '../../store/auth.store';
import { useTranslation } from '../../hooks/useTranslation';
import { Modal } from '../../components/common/Modal';

export default function Settings() {
  const { user, setAuth } = useAuthStore();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(user?.avatarUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Marketplace connections state
  const [connectedMarketplaces, setConnectedMarketplaces] = useState<Record<string, boolean>>({
    shopee: true,
    tokopedia: true,
  });
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [selectedMarketplace, setSelectedMarketplace] = useState<string>('');
  
  // Security state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [showRotateApiKeyModal, setShowRotateApiKeyModal] = useState(false);
  const [resetPasswordData, setResetPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const { data: userData } = useQuery({
    queryKey: ['user', 'me'],
    queryFn: async () => {
      const response = await api.get('/auth/me');
      return response.data;
    },
  });

  const displayUser = userData || user;

  const getRoleDisplay = () => {
    if (displayUser?.role === 'PREMIUM') return 'PRO TRACKER';
    if (displayUser?.role === 'ADMIN') return 'ADMIN';
    if (displayUser?.role === 'SUPERADMIN') return 'SUPERADMIN';
    return 'FREE';
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Upload to server
      uploadProfileImage(file);
    }
  };

  const uploadProfileImage = async (file: File) => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('avatar', file);
      
      const response = await api.put('/auth/profile/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Update user in store
      if (response.data.user) {
        setAuth(response.data.user, localStorage.getItem('token') || '');
      }
      
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
    } catch (error) {
      console.error('Failed to upload profile image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Marketplace connection handlers
  const handleDisconnectMarketplace = async (marketplace: string) => {
    try {
      // TODO: Call API to disconnect marketplace
      // await api.delete(`/marketplace/${marketplace}/disconnect`);
      setConnectedMarketplaces(prev => ({ ...prev, [marketplace]: false }));
    } catch (error) {
      console.error('Failed to disconnect marketplace:', error);
    }
  };

  const handleConnectMarketplace = () => {
    setShowConnectModal(true);
  };

  const handleConfirmConnect = async () => {
    try {
      // TODO: Call API to connect marketplace
      // await api.post(`/marketplace/${selectedMarketplace}/connect`, { credentials });
      setConnectedMarketplaces(prev => ({ ...prev, [selectedMarketplace]: true }));
      setShowConnectModal(false);
      setSelectedMarketplace('');
    } catch (error) {
      console.error('Failed to connect marketplace:', error);
    }
  };

  // Security handlers
  const handleToggleTwoFactor = async () => {
    try {
      const newValue = !twoFactorEnabled;
      // TODO: Call API to update 2FA setting
      // await api.put('/auth/two-factor', { enabled: newValue });
      setTwoFactorEnabled(newValue);
    } catch (error) {
      console.error('Failed to update 2FA:', error);
    }
  };

  const handleResetPassword = async () => {
    if (resetPasswordData.newPassword !== resetPasswordData.confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }
    if (resetPasswordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    try {
      // TODO: Call API to reset password
      // await api.put('/auth/password', {
      //   currentPassword: resetPasswordData.currentPassword,
      //   newPassword: resetPasswordData.newPassword,
      // });
      alert('Password reset successfully');
      setShowResetPasswordModal(false);
      setResetPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to reset password');
    }
  };

  const handleRotateApiKey = async () => {
    try {
      // TODO: Call API to rotate API key
      // const response = await api.post('/auth/api-key/rotate');
      // alert(`New API Key: ${response.data.apiKey}`);
      alert('API Key rotated successfully. Please save your new API key.');
      setShowRotateApiKeyModal(false);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to rotate API key');
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-10 lg:px-20">
      <div className="max-w-[800px] mx-auto space-y-12">
        {/* Page Heading */}
        <header className="space-y-4 mb-12">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-white neon-glow-text">{t('settings.title')}</h2>
          <p className="text-lg text-slate-400 font-light leading-relaxed max-w-2xl">
            {t('settings.description')}
          </p>
        </header>

        {/* Profile Section */}
        <section className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-sm p-8 space-y-8">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="size-24 rounded-full bg-neon-mint/10 border-2 border-neon-mint/30 flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="material-symbols-outlined text-neon-mint text-4xl">person</span>
                )}
                {isUploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-neon-mint border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              <button
                onClick={triggerFileInput}
                disabled={isUploading}
                className="absolute bottom-0 right-0 size-9 bg-neon-mint rounded-full flex items-center justify-center text-obsidian border-2 border-obsidian group-hover:scale-110 transition-transform disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-sm font-bold">edit</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                {displayUser?.name || t('settings.profile')}
              </h3>
              <p className="text-sm text-slate-400 font-light mt-2">
                {t('settings.authorized')}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <label className="flex flex-col gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                {t('settings.fullName')}
              </span>
              <input
                type="text"
                value={displayUser?.name || ''}
                disabled
                className="bg-white/5 border border-white/5 focus:border-neon-mint/50 focus:ring-0 rounded-sm h-12 px-4 text-white text-sm font-light transition-all disabled:opacity-60"
              />
            </label>
            <label className="flex flex-col gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                {t('settings.email')}
              </span>
              <input
                type="email"
                value={displayUser?.email || ''}
                disabled
                className="bg-white/5 border border-white/5 focus:border-neon-mint/50 focus:ring-0 rounded-sm h-12 px-4 text-white text-sm font-light transition-all disabled:opacity-60"
              />
            </label>
            <label className="flex flex-col gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                {t('settings.role')}
              </span>
              <input
                type="text"
                value={displayUser?.role || ''}
                disabled
                className="bg-white/5 border border-white/5 focus:border-neon-mint/50 focus:ring-0 rounded-sm h-12 px-4 text-white text-sm font-light transition-all disabled:opacity-60"
              />
            </label>
            <label className="flex flex-col gap-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                {t('settings.accountType')}
              </span>
              <input
                type="text"
                value={getRoleDisplay()}
                disabled
                className="bg-white/5 border border-white/5 focus:border-neon-mint/50 focus:ring-0 rounded-sm h-12 px-4 text-white text-sm font-light transition-all disabled:opacity-60"
              />
            </label>
          </div>
        </section>

        {/* Subscription Status Card */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
            {t('settings.subscription')}
          </h3>
          <div className="bg-white/5 backdrop-blur-xl border border-white/5 border-l-4 border-l-neon-mint/50 rounded-sm p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-neon-mint to-transparent"></div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <h4 className="text-3xl font-extrabold text-white tracking-tighter">{getRoleDisplay()}</h4>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-mint animate-pulse"></span>
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-neon-mint/80">
                      {t('settings.active')}
                    </span>
                  </span>
                </div>
                <p className="text-slate-400 text-sm font-light leading-relaxed">
                  {t('settings.accountActive')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Integrations & Security */}
        <div className="grid md:grid-cols-2 gap-6 pb-20">
          <section className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-sm p-6 space-y-6">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">hub</span>
              {t('settings.marketplaceSync')}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-sm bg-white/5 border border-white/5 hover:border-neon-mint/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-sm bg-[#ed4d2d] flex items-center justify-center font-black text-xs text-white">
                    SH
                  </div>
                  <span className="text-sm font-extrabold text-white tracking-tight">Shopee ID</span>
                </div>
                {connectedMarketplaces.shopee ? (
                  <button
                    onClick={() => handleDisconnectMarketplace('shopee')}
                    className="text-neon-mint hover:text-red-400 transition-colors"
                    title="Disconnect"
                  >
                    <span className="material-symbols-outlined text-xl">check_circle</span>
                  </button>
                ) : (
                  <span className="text-slate-500 text-sm">Not connected</span>
                )}
              </div>
              <div className="flex items-center justify-between p-4 rounded-sm bg-white/5 border border-white/5 hover:border-neon-mint/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-sm bg-[#42b549] flex items-center justify-center font-black text-xs text-white">
                    TK
                  </div>
                  <span className="text-sm font-extrabold text-white tracking-tight">Tokopedia</span>
                </div>
                {connectedMarketplaces.tokopedia ? (
                  <button
                    onClick={() => handleDisconnectMarketplace('tokopedia')}
                    className="text-neon-mint hover:text-red-400 transition-colors"
                    title="Disconnect"
                  >
                    <span className="material-symbols-outlined text-xl">check_circle</span>
                  </button>
                ) : (
                  <span className="text-slate-500 text-sm">Not connected</span>
                )}
              </div>
              <button
                onClick={handleConnectMarketplace}
                className="w-full py-3 border border-dashed border-white/5 text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm hover:text-neon-mint hover:border-neon-mint/30 transition-all"
              >
                {t('settings.connectMarketplace')}
              </button>
            </div>
          </section>

          <section className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-sm p-6 space-y-6">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">security</span>
              {t('settings.security')}
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-extrabold text-white tracking-tight">{t('settings.twoFactor')}</p>
                  <p className="text-xs text-slate-400 font-light mt-1">{t('settings.secureWhatsApp')}</p>
                </div>
                <button
                  onClick={handleToggleTwoFactor}
                  className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
                    twoFactorEnabled ? 'bg-neon-mint/40 border border-neon-mint' : 'bg-slate-700 border border-slate-600'
                  }`}
                >
                  <div
                    className={`absolute top-1 size-4 rounded-full shadow-lg transition-transform ${
                      twoFactorEnabled
                        ? 'right-1 bg-neon-mint shadow-[0_0_8px_rgba(0,255,204,0.6)]'
                        : 'right-7 bg-slate-400'
                    }`}
                  ></div>
                </button>
              </div>
              <div className="h-px bg-white/5"></div>
              <button
                onClick={() => setShowResetPasswordModal(true)}
                className="flex items-center gap-3 text-sm font-extrabold text-white hover:text-neon-mint transition-colors tracking-tight"
              >
                <span className="material-symbols-outlined text-lg">lock_reset</span>
                {t('settings.resetPassword')}
              </button>
              <button
                onClick={() => setShowRotateApiKeyModal(true)}
                className="flex items-center gap-3 text-sm font-extrabold text-white hover:text-neon-mint transition-colors tracking-tight"
              >
                <span className="material-symbols-outlined text-lg">api</span>
                {t('settings.rotateApiKeys')}
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Connect Marketplace Modal */}
      <Modal
        isOpen={showConnectModal}
        onClose={() => {
          setShowConnectModal(false);
          setSelectedMarketplace('');
        }}
        title={t('settings.connectMarketplace')}
      >
        <div className="space-y-4">
          <p className="text-slate-400 text-sm">{t('settings.selectMarketplace') || 'Select marketplace to connect:'}</p>
          <div className="space-y-2">
            {['shopee', 'tokopedia', 'lazada', 'bukalapak'].map((marketplace) => (
              <button
                key={marketplace}
                onClick={() => setSelectedMarketplace(marketplace)}
                className={`w-full p-4 rounded-sm border transition-all text-left ${
                  selectedMarketplace === marketplace
                    ? 'border-neon-mint bg-neon-mint/10'
                    : 'border-white/5 bg-white/5 hover:border-neon-mint/30'
                }`}
              >
                <span className="text-white font-bold capitalize">{marketplace}</span>
              </button>
            ))}
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => {
                setShowConnectModal(false);
                setSelectedMarketplace('');
              }}
              className="flex-1 px-4 py-2 border border-white/10 text-white rounded-sm hover:border-white/20 transition-all"
            >
              {t('common.cancel')}
            </button>
            <button
              onClick={handleConfirmConnect}
              disabled={!selectedMarketplace}
              className="flex-1 px-4 py-2 bg-neon-mint text-obsidian rounded-sm hover:bg-neon-mint/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold"
            >
              {t('common.confirm')}
            </button>
          </div>
        </div>
      </Modal>

      {/* Reset Password Modal */}
      <Modal
        isOpen={showResetPasswordModal}
        onClose={() => {
          setShowResetPasswordModal(false);
          setResetPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        }}
        title={t('settings.resetPassword')}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">{t('settings.currentPassword') || 'Current Password'}</label>
            <input
              type="password"
              value={resetPasswordData.currentPassword}
              onChange={(e) => setResetPasswordData({ ...resetPasswordData, currentPassword: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-sm text-white focus:border-neon-mint focus:outline-none"
              placeholder="Enter current password"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">{t('settings.newPassword') || 'New Password'}</label>
            <input
              type="password"
              value={resetPasswordData.newPassword}
              onChange={(e) => setResetPasswordData({ ...resetPasswordData, newPassword: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-sm text-white focus:border-neon-mint focus:outline-none"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">{t('settings.confirmPassword') || 'Confirm Password'}</label>
            <input
              type="password"
              value={resetPasswordData.confirmPassword}
              onChange={(e) => setResetPasswordData({ ...resetPasswordData, confirmPassword: e.target.value })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-sm text-white focus:border-neon-mint focus:outline-none"
              placeholder="Confirm new password"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => {
                setShowResetPasswordModal(false);
                setResetPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
              }}
              className="flex-1 px-4 py-2 border border-white/10 text-white rounded-sm hover:border-white/20 transition-all"
            >
              {t('common.cancel')}
            </button>
            <button
              onClick={handleResetPassword}
              className="flex-1 px-4 py-2 bg-neon-mint text-obsidian rounded-sm hover:bg-neon-mint/90 transition-all font-bold"
            >
              {t('common.save')}
            </button>
          </div>
        </div>
      </Modal>

      {/* Rotate API Key Modal */}
      <Modal
        isOpen={showRotateApiKeyModal}
        onClose={() => setShowRotateApiKeyModal(false)}
        title={t('settings.rotateApiKeys')}
      >
        <div className="space-y-4">
          <p className="text-slate-400 text-sm">
            {t('settings.rotateApiKeyWarning') || 'Are you sure you want to rotate your API key? Your current API key will be invalidated and you will receive a new one.'}
          </p>
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowRotateApiKeyModal(false)}
              className="flex-1 px-4 py-2 border border-white/10 text-white rounded-sm hover:border-white/20 transition-all"
            >
              {t('common.cancel')}
            </button>
            <button
              onClick={handleRotateApiKey}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-sm hover:bg-red-600 transition-all font-bold"
            >
              {t('settings.rotateConfirm') || 'Rotate Key'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
