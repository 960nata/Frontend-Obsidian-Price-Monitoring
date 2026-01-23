import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import { Product } from '../../types/product.types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { ApexChart } from '../../components/charts/ApexChart';
import { useTranslation } from '../../hooks/useTranslation';
import { format } from 'date-fns';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await api.get(`/products/${id}`);
      return response.data;
    },
  });

  const scrapeMutation = useMutation({
    mutationFn: async () => {
      await api.post(`/products/${id}/scrape`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product', id] });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-white">{t('common.loading')}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-white">{t('products.productNotFound')}</div>
      </div>
    );
  }

  const chartData =
    product.priceHistory?.map((history) => ({
      x: format(new Date(history.scrapedAt), 'dd MMM yyyy'),
      y: history.price,
    })) || [];

  const chartOptions = {
    chart: {
      type: 'line' as const,
      height: 400,
      toolbar: {
        show: true,
        tools: {
          download: false,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
      zoom: {
        enabled: true,
        type: 'x' as const,
      },
      background: 'transparent',
    },
    theme: {
      mode: 'dark' as const,
    },
    colors: ['#00ffcc'], // neon-mint
    stroke: {
      curve: 'smooth' as const,
      width: 3,
      colors: ['#00ffcc'],
    },
    grid: {
      borderColor: 'rgba(255, 255, 255, 0.05)',
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      type: 'category' as const,
      labels: {
        style: {
          colors: 'rgba(255, 255, 255, 0.6)',
          fontSize: '11px',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
        },
      },
      axisBorder: {
        color: 'rgba(255, 255, 255, 0.05)',
      },
      axisTicks: {
        color: 'rgba(255, 255, 255, 0.05)',
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: 'rgba(255, 255, 255, 0.6)',
          fontSize: '11px',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
        },
        formatter: (value: number) => formatCurrency(value),
      },
    },
    tooltip: {
      theme: 'dark' as const,
      style: {
        fontSize: '12px',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
      },
      y: {
        formatter: (value: number) => formatCurrency(value),
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <div className="px-8 py-8 space-y-8">
      <div className="mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tighter neon-glow-text">{product.name}</h1>
        <div className="flex gap-4 items-center">
          <span className="px-3 py-1 bg-primary/20 text-primary rounded border border-primary/30">
            {product.marketplace}
          </span>
          <button
            onClick={() => scrapeMutation.mutate()}
            disabled={scrapeMutation.isPending}
            className="px-4 py-2 bg-primary text-background-dark rounded-lg hover:bg-primary/90 disabled:opacity-50 font-bold"
          >
            {scrapeMutation.isPending ? t('common.loading') : t('products.refreshPrice')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-6 rounded-sm">
          <h2 className="text-xl font-extrabold mb-4 text-white tracking-tight">{t('products.currentPrice')}</h2>
          <div className="text-4xl font-black text-primary">
            {formatCurrency(product.currentPrice)}
          </div>
          {product.targetPrice && (
            <div className="mt-4">
              <p className="text-sm text-slate-400">{t('products.targetPrice')}</p>
              <p className="text-2xl font-bold text-white">{formatCurrency(product.targetPrice)}</p>
            </div>
          )}
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-6 rounded-sm">
          <h2 className="text-xl font-extrabold mb-4 text-white tracking-tight">{t('products.productInfo')}</h2>
          <div className="space-y-2 text-white">
            <p>
              <span className="text-slate-400">{t('products.marketplace')}:</span> {product.marketplace}
            </p>
            <p>
              <span className="text-slate-400">{t('products.added')}:</span> {formatDate(product.createdAt)}
            </p>
            <p>
              <span className="text-slate-400">{t('products.lastUpdated')}:</span> {formatDate(product.updatedAt)}
            </p>
            <a
              href={product.competitorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 inline-flex items-center gap-1"
            >
              {t('products.viewProduct')} <span className="material-symbols-outlined text-sm">open_in_new</span>
            </a>
          </div>
        </div>
      </div>

      {product.imageUrl && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-6 rounded-sm mb-8">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full max-w-md mx-auto rounded-sm"
          />
        </div>
      )}

      <div className="bg-white/5 backdrop-blur-xl border border-white/5 p-6 rounded-sm">
        <h2 className="text-xl font-extrabold mb-4 text-white tracking-tight">{t('products.priceHistory')}</h2>
        {chartData.length > 0 ? (
          <ApexChart
            options={chartOptions}
            series={[{ name: t('products.currentPrice'), data: chartData }]}
            type="line"
            height={400}
          />
        ) : (
          <p className="text-slate-400">{t('products.noPriceHistory')}</p>
        )}

        <div className="mt-6">
          <h3 className="font-bold mb-2 text-white">{t('products.latestPrices')}</h3>
          <div className="space-y-2">
            {product.priceHistory?.slice(0, 10).map((history) => (
              <div
                key={history.id}
                className="flex justify-between items-center p-3 border border-white/10 rounded-lg bg-white/5"
              >
                <span className="text-sm text-slate-400">{formatDate(history.scrapedAt)}</span>
                <span className="font-bold text-primary">{formatCurrency(history.price)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
