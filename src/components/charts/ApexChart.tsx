import { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

interface ApexChartProps {
  options: ApexCharts.ApexOptions;
  series: ApexCharts.ApexOptions['series'];
  type?: 'line' | 'area' | 'bar' | 'pie' | 'donut' | 'radialBar' | 'scatter' | 'bubble' | 'heatmap' | 'treemap' | 'boxPlot' | 'candlestick' | 'radar' | 'polarArea' | 'rangeBar';
  height?: string | number;
  width?: string | number;
}

export const ApexChart = ({ options, series, type = 'line', height = '400', width = '100%' }: ApexChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<ApexCharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const defaultTheme = {
      mode: 'dark' as const,
      palette: 'palette1',
    };

    const chartOptions: ApexCharts.ApexOptions = {
      ...options,
      chart: {
        ...options.chart,
        type,
        height,
        width,
        background: 'transparent',
        toolbar: {
          ...options.chart?.toolbar,
          tools: {
            ...options.chart?.toolbar?.tools,
            download: false,
          },
        },
      },
      theme: options.theme || defaultTheme,
      colors: options.colors || ['#00ffcc'], // neon-mint
      stroke: {
        ...options.stroke,
        colors: options.stroke?.colors || ['#00ffcc'],
      },
      grid: {
        ...options.grid,
        borderColor: options.grid?.borderColor || 'rgba(255, 255, 255, 0.05)',
        strokeDashArray: 4,
      },
      xaxis: {
        ...options.xaxis,
        labels: {
          ...options.xaxis?.labels,
          style: {
            ...options.xaxis?.labels?.style,
            colors: options.xaxis?.labels?.style?.colors || 'rgba(255, 255, 255, 0.6)',
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
      yaxis: Array.isArray(options.yaxis) 
        ? options.yaxis.map((y: any) => ({
            ...y,
            labels: {
              ...y?.labels,
              style: {
                ...y?.labels?.style,
                colors: y?.labels?.style?.colors || 'rgba(255, 255, 255, 0.6)',
                fontSize: '11px',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              },
            },
          }))
        : {
            ...options.yaxis,
            labels: {
              ...(options.yaxis as any)?.labels,
              style: {
                ...(options.yaxis as any)?.labels?.style,
                colors: (options.yaxis as any)?.labels?.style?.colors || 'rgba(255, 255, 255, 0.6)',
                fontSize: '11px',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              },
            },
          },
      tooltip: {
        ...options.tooltip,
        theme: 'dark',
        style: {
          fontSize: '12px',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
        },
      },
      legend: {
        ...options.legend,
        labels: {
          ...options.legend?.labels,
          colors: options.legend?.labels?.colors || 'rgba(255, 255, 255, 0.7)',
        },
      },
      series,
    };

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new ApexCharts(chartRef.current, chartOptions);
    chartInstance.current.render();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [options, series, type, height, width]);

  return <div ref={chartRef} className="w-full" />;
};
