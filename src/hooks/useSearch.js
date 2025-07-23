import { useMemo } from "react";
import { useUIContext } from "../context/UiContext";

/**
 * Custom hook for searching through products
 * @param {Array} products - Array of products to search through
 * @param {Array} searchFields - Fields to search in (default: ['title', 'brand'])
 * @returns {Object} - { filteredProducts, searchTerm, setSearchTerm, hasResults, resultCount }
 */
export function useSearch(products = [], searchFields = ['title', 'brand']) {
  const context = useUIContext();
  
  if (!context) {
    throw new Error('useSearch must be used within a UIProvider');
  }
  
  const { searchTerm, setSearchTerm } = context;

  const filteredProducts = useMemo(() => {
    const searchString = searchTerm?.toString?.() ?? String(searchTerm ?? "");
    
    if (!searchString.trim()) {
      return products;
    }

    const searchLower = searchString.toLowerCase();
    
    return products.filter(product => 
      searchFields.some(field => 
        product[field]?.toLowerCase().includes(searchLower)
      )
    );
  }, [products, searchTerm, searchFields]);

  return {
    filteredProducts,
    searchTerm: searchTerm || "",
    setSearchTerm,
    hasResults: filteredProducts.length > 0,
    resultCount: filteredProducts.length,
  };
}
