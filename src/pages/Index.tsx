
import { useEffect, useState } from 'react';
import { fetchAssets } from '../services/crypto-service';
import AssetList from '../components/AssetList';
import LoadingSpinner from '../components/LoadingSpinner';
import { Asset } from '../types/crypto-types';
import { toast } from '@/components/ui/sonner';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Index = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchAssets();
        setAssets(response.data);
        
        if (retryCount > 0) {
          toast.success("Data loaded successfully!");
        }
      } catch (err) {
        setError("Failed to load cryptocurrency data. Please check your internet connection and try again.");
        console.error(err);
        toast.error("Failed to load data", {
          description: "Check your internet connection and try again"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadAssets();
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-5xl font-black mb-2">CRYPTO TRACKER</h1>
        <div className="neo-badge-accent inline-block">NEO-BRUTALISM</div>
        <p className="mt-4 text-xl">Tracking top cryptocurrencies by market capitalization</p>
      </header>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="neo-container p-6">
          <Alert variant="destructive" className="mb-4 border-4 border-black">
            <AlertCircle className="h-6 w-6" />
            <AlertTitle className="text-xl font-bold">Error Loading Data</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          
          <button 
            onClick={handleRetry} 
            className="neo-button mt-4 flex items-center gap-2"
          >
            <RefreshCw className="h-5 w-5" />
            Try Again
          </button>
        </div>
      ) : (
        <AssetList assets={assets} />
      )}
    </div>
  );
};

export default Index;
