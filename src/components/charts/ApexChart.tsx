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

    const chartOptions: ApexCharts.ApexOptions = {
      ...options,
      chart: {
        ...options.chart,
        type,
        height,
        width,
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

  return <div ref={chartRef} />;
};
