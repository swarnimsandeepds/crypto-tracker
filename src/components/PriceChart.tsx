
import { useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { AssetHistory } from '../types/crypto-types';

interface PriceChartProps {
  data: AssetHistory[];
  color?: string;
}

const PriceChart = ({ data, color = '#FF3300' }: PriceChartProps) => {
  // Format data for the chart
  const chartData = useMemo(() => {
    return data.map(point => ({
      date: new Date(point.time).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric'
      }),
      price: parseFloat(point.priceUsd)
    }));
  }, [data]);

  // Get min and max for chart domain
  const minPrice = useMemo(() => Math.min(...chartData.map(d => d.price)) * 0.95, [chartData]);
  const maxPrice = useMemo(() => Math.max(...chartData.map(d => d.price)) * 1.05, [chartData]);

  return (
    <div className="neo-container p-4 h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }} 
            tickCount={6}
          />
          <YAxis 
            domain={[minPrice, maxPrice]} 
            tick={{ fontSize: 12 }} 
            tickFormatter={(value) => `$${value.toFixed(2)}`}
          />
          <Tooltip
            contentStyle={{ 
              backgroundColor: '#fff',
              border: '4px solid black',
            }}
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
          />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke={color} 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorPrice)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
