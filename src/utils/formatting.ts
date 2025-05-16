
// Format a number as USD
export function formatUSD(value: string | number): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  
  // Check for NaN or invalid values
  if (isNaN(num)) return '$0.00';
  
  // Format based on size
  if (Math.abs(num) >= 1_000_000_000) {
    return `$${(num / 1_000_000_000).toFixed(2)}B`;
  } else if (Math.abs(num) >= 1_000_000) {
    return `$${(num / 1_000_000).toFixed(2)}M`;
  } else if (Math.abs(num) >= 1_000) {
    return `$${(num / 1_000).toFixed(2)}K`;
  } else {
    return `$${num.toFixed(2)}`;
  }
}

// Format a percentage
export function formatPercent(value: string | number): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return isNaN(num) ? '0.00%' : `${num >= 0 ? '+' : ''}${num.toFixed(2)}%`;
}

// Format large numbers
export function formatNumber(value: string | number): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  
  // Check for NaN or invalid values
  if (isNaN(num)) return '0';
  
  // Format based on size
  if (Math.abs(num) >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(2)}B`;
  } else if (Math.abs(num) >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(2)}M`;
  } else if (Math.abs(num) >= 1_000) {
    return `${(num / 1_000).toFixed(2)}K`;
  } else {
    return num.toFixed(2);
  }
}

// Get color class based on percentage change
export function getChangeColorClass(change: string | number): string {
  const num = typeof change === 'string' ? parseFloat(change) : change;
  return num > 0 ? 'text-green-600' : num < 0 ? 'text-red-600' : 'text-gray-500';
}
