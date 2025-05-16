
import { useEffect, useState } from 'react';
import { fetchAssets } from '../services/crypto-service';
import AssetList from '../components/AssetList';
import LoadingSpinner from '../components/LoadingSpinner';
import { Asset } from '../types/crypto-types';

const Index = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        setLoading(true);
        const response = await fetchAssets();
        setAssets(response.data);
      } catch (err) {
        setError("Failed to load cryptocurrency data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadAssets();
  }, []);

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
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="neo-button mt-4">
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
