import React from "react";
import { ProductGrid, SearchInput } from "@NicolasSancho/storybook-core";
import { useProducts } from "../hooks/useProducts";
import { useSearch } from "../hooks/useSearch";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

export default function ProductList() {
  const { data: products, loading, error } = useProducts();
  const { 
    filteredProducts, 
    searchTerm, 
    setSearchTerm, 
    hasResults, 
    resultCount 
  } = useSearch(products, ['title', 'brand']);

  const handleSearchChange = (value) => {
    const searchValue = value?.target?.value ?? value ?? '';
    setSearchTerm(searchValue);
  };
  const navigate = useNavigate();

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 p-4">
          <p className="text-red-500">
            Error loading products: {error.message}
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col p-4">      
      <main className="flex-1 p-4">
        {loading ? (
          <Loading message="Loading products..." />
        ) : (
          <>
          <div className="flex justify-end mb-4">
            <SearchInput 
              onChange={handleSearchChange} 
              value={searchTerm} 
              className="!w-1/4 min-w-[180px]"
              placeholder="Search products or brands..."
            />
          </div>
            {searchTerm && (
              <div className="mb-6">
                <p className="text-gray-600">
                  {resultCount} result{resultCount !== 1 ? 's' : ''} for "{searchTerm}"
                </p>
              </div>
            )}

            <ProductGrid
              products={filteredProducts}
              columns={4}
              gap="medium"
              getOnProductClick={(product) => () => {
                navigate(`/product/${product.id}`);
              }}
            />
            
            {!hasResults && searchTerm && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No products found matching "{searchTerm}"
                </p>
                <p className="text-gray-400 mt-2">
                  Try searching with different keywords
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
