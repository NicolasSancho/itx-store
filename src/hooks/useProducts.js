import { useEffect, useState } from "react";
import { fetchProducts } from "../api/product";

// Transform raw API data to component-friendly format
function transformProductData(products) {
  return products.map((product) => ({
    id: product.id,
    title: product.model,
    price: product.price !== "" ? product.price : "Free",
    imageUrl: product.imgUrl,
    brand: product.brand,
  }));
}

export function useProducts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then(rawData => {
        const transformedData = transformProductData(rawData);
        setData(transformedData);
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
