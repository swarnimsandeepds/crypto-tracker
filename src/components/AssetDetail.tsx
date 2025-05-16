
import { Link } from 'react-router-dom';
import { Asset, AssetHistory } from '../types/crypto-types';
import { formatUSD, formatPercent, formatNumber, getChangeColorClass } from '../utils/formatting';
import PriceChart from './PriceChart';
import { ArrowLeft } from 'lucide-react';

interface AssetDetailProps {
  asset: Asset;
  history: AssetHistory[];
  interval: string;
  onIntervalChange: (interval: string) => void;
}

const intervalOptions = [
  { value: 'm5', label: '5 Minutes' },
  { value: 'm15', label: '15 Minutes' },
  { value: 'm30', label: '30 Minutes' },
  { value: 'h1', label: '1 Hour' },
  { value: 'h2', label: '2 Hours' },
  { value: 'h6', label: '6 Hours' },
  { value: 'h12', label: '12 Hours' },
  { value: 'd1', label: '1 Day' },
  { value: 'w1', label: '1 Week' }
];

const AssetDetail = ({ asset, history, interval, onIntervalChange }: AssetDetailProps) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to="/" className="neo-button inline-flex items-center">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Assets
        </Link>
      </div>
      
      <div className="neo-container p-6 mb-8">
        <div className="flex flex-wrap items-baseline gap-2 mb-4">
          <span className="neo-badge mr-2">{asset.symbol}</span>
          <h1 className="text-4xl font-black">{asset.name}</h1>
          <span className="text-lg">Rank #{asset.rank}</span>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 items-start mb-8">
          <div className="neo-card md:w-1/3">
            <div className="mb-2 text-lg">Current Price</div>
            <div className="text-4xl font-bold font-mono">{formatUSD(asset.priceUsd)}</div>
            <div className={`text-lg font-bold mt-2 ${getChangeColorClass(asset.changePercent24Hr)}`}>
              {formatPercent(asset.changePercent24Hr)} (24h)
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 md:w-2/3">
            <div className="neo-card">
              <div className="text-lg mb-1">Market Cap</div>
              <div className="text-2xl font-bold font-mono">{formatUSD(asset.marketCapUsd)}</div>
            </div>
            
            <div className="neo-card">
              <div className="text-lg mb-1">24h Volume</div>
              <div className="text-2xl font-bold font-mono">{formatUSD(asset.volumeUsd24Hr)}</div>
            </div>
            
            <div className="neo-card">
              <div className="text-lg mb-1">Supply</div>
              <div className="text-2xl font-bold">
                {formatNumber(asset.supply)} {asset.symbol}
              </div>
            </div>
            
            <div className="neo-card">
              <div className="text-lg mb-1">Max Supply</div>
              <div className="text-2xl font-bold">
                {asset.maxSupply ? `${formatNumber(asset.maxSupply)} ${asset.symbol}` : 'Unlimited'}
              </div>
            </div>
          </div>
        </div>
        
        {history.length > 0 && (
          <div className="mt-8">
            <div className="flex flex-wrap justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Price History</h2>
              
              <div className="neo-container p-2 mt-4 sm:mt-0">
                <select 
                  value={interval}
                  onChange={(e) => onIntervalChange(e.target.value)}
                  className="neo-select bg-white px-4 py-2 border-4 border-black font-bold"
                >
                  {intervalOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <PriceChart data={history} />
          </div>
        )}
        
        {asset.explorer && (
          <div className="mt-8 text-center">
            <a 
              href={asset.explorer} 
              target="_blank" 
              rel="noopener noreferrer"
              className="neo-button"
            >
              View on Blockchain Explorer
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetDetail;
