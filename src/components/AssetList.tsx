
import { Link } from 'react-router-dom';
import { Asset } from '../types/crypto-types';
import { formatUSD, formatPercent, getChangeColorClass } from '../utils/formatting';

interface AssetListProps {
  assets: Asset[];
}

const AssetList = ({ assets }: AssetListProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="neo-table">
        <thead>
          <tr>
            <th className="w-12">#</th>
            <th>Name</th>
            <th>Price</th>
            <th className="hidden md:table-cell">Market Cap</th>
            <th className="hidden sm:table-cell">24h Change</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr 
              key={asset.id} 
              className="hover:bg-gray-50 transition-colors"
            >
              <td>{asset.rank}</td>
              <td>
                <Link to={`/asset/${asset.id}`} className="flex items-center gap-2 font-bold">
                  <span className="inline-block border-2 border-black bg-neobrutalism-yellow text-black font-bold px-2">
                    {asset.symbol}
                  </span>
                  <span>{asset.name}</span>
                </Link>
              </td>
              <td className="font-mono font-bold">{formatUSD(asset.priceUsd)}</td>
              <td className="hidden md:table-cell font-mono">{formatUSD(asset.marketCapUsd)}</td>
              <td className={`hidden sm:table-cell font-bold ${getChangeColorClass(asset.changePercent24Hr)}`}>
                {formatPercent(asset.changePercent24Hr)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetList;
