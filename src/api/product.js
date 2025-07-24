import { setCachedData, getCachedData } from "../utils/cache";

const API_URL = "https://itx-frontend-test.onrender.com/api";
const CACHE_EXPIRY_TIME = 5 * 1000; // 5 seconds

// Generic API call handler
async function apiCall(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API call failed for ${url}:`, error);
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
}

// API methods
export async function fetchProducts() {
  const cacheKey = "products";
  const cached = getCachedData(cacheKey, CACHE_EXPIRY_TIME);
  if (cached) return cached;

  const data = await apiCall(`${API_URL}/product`);
  setCachedData(cacheKey, data);
  return data;
}

export async function fetchProduct(id) {
  if (!id) throw new Error("Product ID is required");

  const cacheKey = `product_${id}`;
  const cached = getCachedData(cacheKey, CACHE_EXPIRY_TIME);
  if (cached) return cached;

  const data = await apiCall(`${API_URL}/product/${encodeURIComponent(id)}`);
  setCachedData(cacheKey, data);
  return data;
}

export async function addToCart({ id, colorCode, storageCode }) {
  if (!id || colorCode === undefined || storageCode === undefined) {
    throw new Error(
      "Missing required parameters: id, colorCode, and storageCode are required"
    );
  }

  return await apiCall(`${API_URL}/cart`, {
    method: "POST",
    body: JSON.stringify({ id, colorCode, storageCode }),
  });
}
