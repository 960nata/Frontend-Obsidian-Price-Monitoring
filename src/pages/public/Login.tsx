import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../utils/validators';
import { authService } from '../../services/auth.service';
import { useAuthStore } from '../../store/auth.store';
import { ObsidianHeader } from '../../components/landing/ObsidianHeader';
import { Footer } from '../../components/landing/Footer';
import { useTranslation } from '../../hooks/useTranslation';

export default function Login() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      setError('');
      const response = await authService.login(data.email, data.password);
      setAuth(response.user, response.token);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      
      // Handle different error types
      if (err.code === 'ECONNREFUSED' || err.message?.includes('Network Error') || !err.response) {
        setError('Cannot connect to server. Please make sure the backend is running on port 3000.');
      } else if (err.response?.status === 401) {
        setError(err.response?.data?.error || 'Invalid email or password');
      } else if (err.response?.status === 404) {
        setError('API endpoint not found. Please check backend configuration.');
      } else if (err.response?.status >= 500) {
        setError('Server error. Please try again later.');
      } else {
        setError(err.response?.data?.error || err.message || 'Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-obsidian">
      <ObsidianHeader />
      
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-neon-mint/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-mint/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center w-full px-6 z-10 py-12 pt-32">
        <div className="glass-panel-auth w-full max-w-[480px] p-8 md:p-12 rounded-xl shadow-2xl flex flex-col gap-8">
          {/* Header Section */}
          <div className="text-center space-y-2">
            <h1 className="text-white tracking-[0.2em] text-2xl md:text-3xl font-bold leading-tight uppercase">
              {t('login.title')}
            </h1>
            <p className="text-white/60 text-xs font-normal uppercase tracking-widest">
              {t('login.subtitle')}
            </p>
            <p className="text-white/40 text-[11px] tracking-wider uppercase">
              {t('login.protocol')}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label className="text-white/70 text-sm font-medium uppercase tracking-widest pl-1">
                {t('login.gridIdentifier')}
              </label>
              <div className="flex items-stretch rounded-lg neon-border border border-white/10 transition-all duration-300 bg-obsidian-dark/50 group">
                <input
                  {...register('email')}
                  className="form-input flex-1 bg-transparent border-none text-white focus:ring-0 h-14 placeholder:text-white/20 px-4 text-base font-normal"
                  placeholder={t('login.emailPlaceholder')}
                  type="email"
                />
                <div className="text-white/30 flex items-center justify-center pr-4 group-focus-within:text-primary transition-colors">
                  <span className="material-symbols-outlined">alternate_email</span>
                </div>
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1 pl-1">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <label className="text-white/70 text-sm font-medium uppercase tracking-widest pl-1">
                {t('login.accessKey')}
              </label>
              <div className="flex items-stretch rounded-lg neon-border border border-white/10 transition-all duration-300 bg-obsidian-dark/50 group">
                <input
                  {...register('password')}
                  className="form-input flex-1 bg-transparent border-none text-white focus:ring-0 h-14 placeholder:text-white/20 px-4 text-base font-normal"
                  placeholder="••••••••"
                  type="password"
                />
                <div className="text-white/30 flex items-center justify-center pr-4 group-focus-within:text-primary transition-colors">
                  <span className="material-symbols-outlined">lock</span>
                </div>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1 pl-1">
                  {errors.password.message as string}
                </p>
              )}
              <div className="flex justify-end">
                <a
                  href="#"
                  className="text-primary/60 hover:text-primary text-xs font-normal uppercase tracking-tighter underline transition-colors"
                >
                  {t('login.forgotKey')}
                </a>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-background-dark font-bold py-4 rounded-lg tracking-[0.15em] uppercase transition-all glow-hover disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? t('login.initializing') : t('login.initializeSession')}
              </button>
            </div>
          </form>

          {/* Footer Section */}
          <div className="text-center space-y-4 pt-4">
            <p className="text-white/40 text-sm">
              {t('login.newToGrid')}{' '}
              <Link
                to="/register"
                className="text-primary hover:text-primary/80 font-medium ml-1 transition-colors"
              >
                {t('login.registerIdentity')}
              </Link>
            </p>
          </div>
        </div>

        {/* System Status Decorative Footer */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 opacity-20 text-[10px] tracking-[0.3em] uppercase text-white font-medium">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-primary animate-pulse"></span>
            <span>{t('login.systemOnline')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{t('login.encryption')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{t('login.node')}</span>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
