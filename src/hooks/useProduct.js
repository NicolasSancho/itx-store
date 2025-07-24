import { useEffect, useState } from "react";
import { fetchProduct } from "../api/product";
import { formatProduct } from "../utils/productFormatters";

export function useProduct(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError(new Error("Product ID is required"));
      setLoading(false);
      return;
    }

    let isMounted = true;

    fetchProduct(id)
      .then((rawData) => {
        if (!isMounted) return;
        const formatted = formatProduct(rawData);
        setData(formatted);
      })
      .catch((err) => isMounted && setError(err))
      .finally(() => isMounted && setLoading(false));

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { data, loading, error };
}
