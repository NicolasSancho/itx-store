const API_URL = "https://itx-frontend-test.onrender.com/api";
const CACHE_EXPIRY_TIME = 60 * 60 * 1000; // 1 hour
const CACHE_KEY = "products";

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

// Cache management
function getCachedData(key) {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const isExpired = Date.now() - timestamp > CACHE_EXPIRY_TIME;

    return isExpired ? null : data;
  } catch (error) {
    console.warn("Failed to read from cache:", error);
    return null;
  }
}

function setCachedData(key, data) {
  try {
    const cacheEntry = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(cacheEntry));
  } catch (error) {
    console.warn("Failed to save to cache:", error);
  }
}

// API methods
export async function fetchProducts() {
  const cachedData = getCachedData(CACHE_KEY);
  if (cachedData) {
    return cachedData;
  }

  const data = await apiCall(`${API_URL}/product`);
  //setCachedData(CACHE_KEY, data);
  return data;
}

export async function fetchProduct(id) {
  if (!id) {
    throw new Error("Product ID is required");
  }
  return await apiCall(`${API_URL}/product/${encodeURIComponent(id)}`);
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
