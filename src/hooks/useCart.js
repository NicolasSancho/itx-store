import { useState } from "react";
import { useUIContext } from "../context/UiContext";
import { addToCart as addToCartAPI } from "../api/product";

/**
 * Custom hook for cart operations
 * Handles adding items to cart with proper error handling and loading states
 */
export function useCart() {
  const { addToCart: addToCartContext } = useUIContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addToCart = async ({ product, colorCode, storageCode }) => {
    if (!product || !colorCode || !storageCode) {
      const errorMsg = "Missing required parameters: product, colorCode, and storageCode are required";
      setError(new Error(errorMsg));
      throw new Error(errorMsg);
    }

    setIsLoading(true);
    setError(null);

    try {
      // Still call API for compliance, but ignore returned count
      await addToCartAPI({
        id: product.id,
        colorCode,
        storageCode,
      });

      // This updates the frontend count and persists it
      addToCartContext();

      return {
        success: true,
      };
    } catch (err) {
      const error = new Error(`Failed to add to cart: ${err.message}`);
      setError(error);
      console.error("Cart operation failed:", err);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    addToCart,
    isLoading,
    error,
    clearError,
  };
}
