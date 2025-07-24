import { useEffect, useState } from "react";
import { fetchProducts } from "../api/product";
import { formatProductList } from "../utils/productFormatters";

export function useProducts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetchProducts()
      .then((rawData) => {
        if (!isMounted) return;
        const formatted = formatProductList(rawData);
        setData(formatted);
      })
      .catch((err) => isMounted && setError(err))
      .finally(() => isMounted && setLoading(false));

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
}
