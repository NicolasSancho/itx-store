export const setCachedData = (key, data) => {
  try {
    const entry = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(key, JSON.stringify(entry));
  } catch (err) {
    console.warn("Failed to cache data:", err);
  }
};

export const getCachedData = (key, expiry = 60 * 60 * 1000) => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return data;
  } catch (err) {
    console.warn("Failed to read cache:", err);
    return null;
  }
};

export const clearCache = (key) => {
  localStorage.removeItem(key);
};
