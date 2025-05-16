
import { useParams } from 'react-router-dom';
import AssetDetail from '../components/AssetDetail';
import LoadingSpinner from '../components/LoadingSpinner';
import { useEffect, useState } from 'react';
import { fetchAsset, fetchAssetHistory } from '../services/crypto-service';
import { Asset, AssetHistory } from '../types/crypto-types';
import { toast } from '@/components/ui/sonner';

const AssetDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [asset, setAsset] = useState<Asset | null>(null);
  const [history, setHistory] = useState<AssetHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [interval, setInterval] = useState<string>('d1'); // Default interval: daily

  useEffect(() => {
    const loadAssetData = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);

      try {
        // Load asset details and history in parallel
        const [assetResponse, historyResponse] = await Promise.all([
          fetchAsset(id),
          fetchAssetHistory(id, interval)
        ]);
        
        setAsset(assetResponse.data);
        setHistory(historyResponse.data);
        
        toast.success(`Loaded ${assetResponse.data.name} data successfully`);
      } catch (err) {
        console.error("Error loading asset data:", err);
        setError("Failed to load asset data. Please try again later.");
        toast.error("Failed to load asset data");
      } finally {
        setLoading(false);
      }
    };
    
    loadAssetData();
  }, [id, interval]);
  
  if (loading) return <LoadingSpinner />;
  
  if (error || !asset) {
    return (
      <div className="neo-container p-6 max-w-2xl mx-auto my-8">
        <h2 className="text-2xl font-bold mb-4">Error</h2>
        <p>{error || "Asset not found"}</p>
        <button 
          className="neo-button mt-4"
          onClick={() => window.location.href = '/'}
        >
          Back to Assets
        </button>
      </div>
    );
  }
  
  return (
    <AssetDetail 
      asset={asset} 
      history={history}
      interval={interval}
      onIntervalChange={setInterval}
    />
  );
};

export default AssetDetailPage;
