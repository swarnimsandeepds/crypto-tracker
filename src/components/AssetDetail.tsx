
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchAsset, fetchAssetHistory } from '../services/crypto-service';
import { Asset, AssetHistory } from '../types/crypto-types';
import { formatUSD, formatPercent, formatNumber, getChangeColorClass } from '../utils/formatting';
import PriceChart from './PriceChart';
import LoadingSpinner from './LoadingSpinner';
import { ArrowLeft } from 'lucide-react';

const AssetDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [asset, setAsset] = useState<Asset | null>(null);
  const [history, setHistory] = useState<AssetHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAssetData = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        // Load asset details and history in parallel
        const [assetResponse, historyResponse] = await Promise.all([
          fetchAsset(id),
          fetchAssetHistory(id, 'd1') // Daily interval
        ]);
        
        setAsset(assetResponse.data);
        setHistory(historyResponse.data);
      } catch (err) {
        setError("Failed to load asset data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadAssetData();
  }, [id]);
  
  if (loading) return <LoadingSpinner />;
  
  if (error || !asset) {
    return (
      <div className="neo-container p-6 max-w-2xl mx-auto my-8">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p>{error || "Asset not found"}</p>
        <Link to="/" className="neo-button inline-block mt-4">
          <ArrowLeft className="inline-block mr-2" />
          Back to Assets
        </Link>
      </div>
    );
  }
  
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
            <h2 className="text-2xl font-bold mb-4">Price History (30 Days)</h2>
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
