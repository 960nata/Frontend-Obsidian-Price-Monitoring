import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';
import { formatCurrency } from '../../utils/formatters';
import { Link } from 'react-router-dom';
import { GoogleAnalyticsWidget, GeolocationMap } from '../../components/analytics';
import { useGoogleAnalytics } from '../../hooks/useGoogleAnalytics';
import { ApexChart } from '../../components/charts/ApexChart';
import { format } from 'date-fns';
import { useTranslation } from '../../hooks/useTranslation';
import { SkeletonDashboard, SkeletonChart } from '../../components/common/Skeleton';

interface DashboardStats {
  totalProducts: number;
  unreadAlerts: number;
  totalPriceHistory: number;
  recentProducts: any[];
}

interface ChartData {
  priceTrends: Array<{ x: string; y: number }>;
  priceChecks: Array<{ x: string; y: number }>;
  marketplaceDistribution: Array<{ x: string; y: number }>;
  alertsOverTime: Array<{ x: string; y: number }>;
}

export default function Dashboard() {
  const { t } = useTranslation();
  // Google Analytics - conditional based on env variable
  const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  const gaEnabled = import.meta.env.VITE_GA_ENABLED === 'true' && !!gaMeasurementId;
  
  useGoogleAnalytics(gaEnabled ? gaMeasurementId : undefined);

  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ['dashboard', 'stats'],
    queryFn: async () => {
      const response = await api.get('/dashboard/stats');
      return response.data;
    },
  });

  const { data: chartData, isLoading: chartsLoading } = useQuery<ChartData>({
    queryKey: ['dashboard', 'charts'],
    queryFn: async () => {
      const response = await api.get('/dashboard/charts?days=30');
      return response.data;
    },
  });

  if (isLoading) {
    return <SkeletonDashboard />;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tighter mb-4 neon-glow-text">
          {t('dashboard.title')}
        </h1>
        <p className="text-lg text-slate-400 font-light leading-relaxed max-w-2xl">
          {t('dashboard.description')}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-6 rounded-sm hover:border-neon-mint/30 transition-all">
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 mb-3">{t('dashboard.totalProducts')}</div>
          <div className="text-4xl font-extrabold text-neon-mint neon-glow-text tracking-tighter">
            {stats?.totalProducts || 0}
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-6 rounded-sm hover:border-red-500/30 transition-all">
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 mb-3">{t('dashboard.unreadAlerts')}</div>
          <div className="text-4xl font-extrabold text-red-400 tracking-tighter">
            {stats?.unreadAlerts || 0}
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-6 rounded-sm hover:border-green-500/30 transition-all">
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400 mb-3">{t('dashboard.priceChecks')}</div>
          <div className="text-4xl font-extrabold text-green-400 tracking-tighter">
            {stats?.totalPriceHistory || 0}
          </div>
        </div>
      </div>

      {/* Google Analytics Widget - Conditional */}
      {gaEnabled && (
        <div className="mb-8 space-y-6">
          <GoogleAnalyticsWidget enabled={gaEnabled} measurementId={gaMeasurementId} />
          <GeolocationMap />
        </div>
      )}

      {/* Charts Section */}
      {chartsLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonChart key={i} />
          ))}
        </div>
      ) : chartData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Price Trends Chart */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-sm p-6">
            <div className="mb-4">
              <h3 className="text-xl font-extrabold text-white tracking-tight mb-2">{t('dashboard.priceTrends')}</h3>
              <p className="text-xs text-slate-400 font-light">{t('dashboard.priceTrendsDesc')}</p>
            </div>
            <ApexChart
              type="area"
              height={300}
              series={[
                {
                  name: 'Total Price',
                  data: chartData.priceTrends.length > 0
                    ? chartData.priceTrends.map((item) => ({
                        x: format(new Date(item.x), 'MMM dd'),
                        y: item.y,
                      }))
                    : [{ x: 'No data', y: 0 }],
                },
              ]}
              options={{
                chart: {
                  toolbar: {
                    show: true,
                    tools: {
                      download: false,
                      zoom: true,
                      pan: true,
                      reset: true,
                    },
                  },
                  zoom: {
                    enabled: true,
                    type: 'x',
                  },
                },
                stroke: {
                  curve: 'smooth',
                  width: 2,
                },
                fill: {
                  type: 'gradient',
                  gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.3,
                    stops: [0, 90, 100],
                  },
                },
                xaxis: {
                  type: 'category',
                },
                yaxis: {
                  labels: {
                    formatter: (value: number) => formatCurrency(value),
                  },
                },
                tooltip: {
                  y: {
                    formatter: (value: number) => formatCurrency(value),
                  },
                },
              }}
            />
          </div>

          {/* Price Checks Chart */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-sm p-6">
            <div className="mb-4">
              <h3 className="text-xl font-extrabold text-white tracking-tight mb-2">{t('dashboard.priceChecks')}</h3>
              <p className="text-xs text-slate-400 font-light">{t('dashboard.priceChecksDesc')}</p>
            </div>
            <ApexChart
              type="bar"
              height={300}
              series={[
                {
                  name: 'Price Checks',
                  data: chartData.priceChecks.length > 0
                    ? chartData.priceChecks.map((item) => ({
                        x: format(new Date(item.x), 'MMM dd'),
                        y: item.y,
                      }))
                    : [{ x: 'No data', y: 0 }],
                },
              ]}
              options={{
                chart: {
                  toolbar: {
                    show: true,
                    tools: {
                      download: false,
                      zoom: true,
                      pan: true,
                      reset: true,
                    },
                  },
                },
                xaxis: {
                  type: 'category',
                },
                yaxis: {
                  labels: {
                    formatter: (value: number) => Math.round(value).toString(),
                  },
                },
                plotOptions: {
                  bar: {
                    borderRadius: 4,
                    columnWidth: '60%',
                  },
                },
              }}
            />
          </div>

          {/* Marketplace Distribution */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-sm p-6">
            <div className="mb-4">
              <h3 className="text-xl font-extrabold text-white tracking-tight mb-2">{t('dashboard.productsByMarketplace')}</h3>
              <p className="text-xs text-slate-400 font-light">{t('dashboard.marketplaceDistribution')}</p>
            </div>
            <ApexChart
              type="donut"
              height={300}
              series={
                chartData.marketplaceDistribution.length > 0
                  ? chartData.marketplaceDistribution.map((item) => item.y)
                  : [1]
              }
              options={{
                labels:
                  chartData.marketplaceDistribution.length > 0
                    ? chartData.marketplaceDistribution.map((item) => item.x)
                    : ['No data'],
                legend: {
                  position: 'bottom',
                },
                plotOptions: {
                  pie: {
                    donut: {
                      size: '65%',
                    },
                  },
                },
                dataLabels: {
                  enabled: true,
                  formatter: (val: number) => `${Math.round(val)}%`,
                },
              }}
            />
          </div>

          {/* Alerts Over Time */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-sm p-6">
            <div className="mb-4">
              <h3 className="text-xl font-extrabold text-white tracking-tight mb-2">{t('dashboard.alertsOverTime')}</h3>
              <p className="text-xs text-slate-400 font-light">{t('dashboard.alertsOverTimeDesc')}</p>
            </div>
            <ApexChart
              type="line"
              height={300}
              series={[
                {
                  name: 'Alerts',
                  data: chartData.alertsOverTime.length > 0
                    ? chartData.alertsOverTime.map((item) => ({
                        x: format(new Date(item.x), 'MMM dd'),
                        y: item.y,
                      }))
                    : [{ x: 'No data', y: 0 }],
                },
              ]}
              options={{
                chart: {
                  toolbar: {
                    show: true,
                    tools: {
                      download: false,
                      zoom: true,
                      pan: true,
                      reset: true,
                    },
                  },
                },
                stroke: {
                  curve: 'smooth',
                  width: 3,
                  colors: ['#ef4444'], // red-500
                },
                colors: ['#ef4444'],
                xaxis: {
                  type: 'category',
                },
                yaxis: {
                  labels: {
                    formatter: (value: number) => Math.round(value).toString(),
                  },
                },
                markers: {
                  size: 4,
                  hover: {
                    size: 6,
                  },
                },
              }}
            />
          </div>
        </div>
      )}

      {/* Recent Products */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/5 rounded-sm overflow-hidden">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">{t('dashboard.recentProducts')}</h2>
        </div>
        <div className="p-6">
          {stats?.recentProducts && stats.recentProducts.length > 0 ? (
            <div className="space-y-3">
              {stats.recentProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-sm hover:border-neon-mint/30 hover:bg-white/10 transition-all group"
                >
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-sm border border-white/5"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-extrabold text-white group-hover:text-neon-mint transition-colors tracking-tight">
                      {product.name}
                    </h3>
                    <p className="text-sm text-slate-400 font-light">
                      {product.marketplace}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-extrabold text-xl text-neon-mint tracking-tighter">
                      {formatCurrency(product.currentPrice)}
                    </div>
                    {product._count?.alerts > 0 && (
                      <div className="text-[10px] text-red-400 font-bold tracking-[0.2em] uppercase mt-1">
                        {product._count.alerts} alerts
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="mb-6">
                <span className="material-symbols-outlined text-7xl text-slate-600/50">inventory_2</span>
              </div>
              <p className="text-slate-400 mb-6 font-light text-lg">
                {t('dashboard.noProducts')}
              </p>
              <Link
                to="/products"
                className="inline-block neon-border-glow bg-neon-mint text-obsidian px-8 py-4 rounded-sm text-sm font-black uppercase tracking-[0.2em] hover:scale-105 transition-all"
              >
                {t('products.add')}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
