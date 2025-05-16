
import { AssetsResponse, AssetResponse, AssetHistoryResponse } from "../types/crypto-types";

const BASE_URL = "https://api.coincap.io/v2";

export async function fetchAssets(): Promise<AssetsResponse> {
  try {
    const response = await fetch(`${BASE_URL}/assets?limit=20`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching assets:", error);
    throw error;
  }
}

export async function fetchAsset(id: string): Promise<AssetResponse> {
  try {
    const response = await fetch(`${BASE_URL}/assets/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching asset ${id}:`, error);
    throw error;
  }
}

export async function fetchAssetHistory(id: string, interval: string = "d1"): Promise<AssetHistoryResponse> {
  try {
    const response = await fetch(`${BASE_URL}/assets/${id}/history?interval=${interval}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching history for asset ${id}:`, error);
    throw error;
  }
}
