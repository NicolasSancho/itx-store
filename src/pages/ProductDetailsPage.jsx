import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ProductDetails as ProductDetailsComponent,
  Button,
  Spinner,
  Image,
  Text,
  RadioGroup
} from "@NicolasSancho/storybook-core";
import { useProduct } from "../hooks/useProduct";
import { useCart } from "../hooks/useCart";
import { formatProductDetails } from "../utils/productFormatters";
import { useUIContext } from '../context/UiContext';
import Loading from "../components/Loading";

// Product specification keys to display
const PRODUCT_SPECS = [
  "networkTechnology",
  "networkSpeed", 
  "sim",
  "displayType",
  "displayResolution",
  "displaySize",
  "cpu",
  "os",
  "battery",
];

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const { data: product, loading, error } = useProduct(productId);
  const { addToCart, isLoading: isAddingToCart, error: cartError, clearError } = useCart();
  
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const { setCurrentProduct } = useUIContext();

  // Set initial selections when product data loads
  useEffect(() => {
    if (!product?.options) return;

    const { colors, storages } = product.options;
    
    if (colors?.length > 0 && !selectedColor) {
      setSelectedColor(colors[0].code);
    }
    
    if (storages?.length > 0 && !selectedStorage) {
      setSelectedStorage(storages[0].code);
    }
  }, [product, selectedColor, selectedStorage]);

  useEffect(() => {
    if (product) {
      setCurrentProduct(product);
    }
  }, [product, setCurrentProduct]);

  useEffect(() => {
    return () => {
      setCurrentProduct(null);
    };
  }, []);

  const handleAddToCart = async () => {
    if (!product || !selectedColor || !selectedStorage) return;

    try {
      await addToCart({
        product,
        colorCode: selectedColor,
        storageCode: selectedStorage,
      });
      
      // Success feedback - you can replace with a proper notification system
      alert("Product added to cart successfully!");
    } catch (err) {
      // Error is already handled by useCart hook
      alert(`Failed to add product to cart: ${err.message}`);
    }
  };

  const isAddToCartDisabled = !selectedColor || !selectedStorage || isAddingToCart;

  if (loading) {
    return <Loading message="Loading product..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">Error loading product</p>
          <p className="text-gray-600 mt-2">{error.message}</p>
          <Link 
            to="/" 
            className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Product not found</p>
          <Link 
            to="/" 
            className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Product Content */}
        <div className="mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">
            {product.brand} {product.model}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="lg:sticky lg:top-8 lg:self-start h-full">
              <Image
                src={product.imgUrl}
                alt={`${product.brand} ${product.model}`}
                className="aspect-square object-cover rounded-lg"
              />
            </div>
            {/* Product Details */}
            <div className="space-y-6">
              {/* Description */}
              <Text as="h1">Product Details</Text>
              <ProductDetailsComponent details={formatProductDetails(product, PRODUCT_SPECS)} />
              <div className="mt-6 pt-4 border-t">
                <Text as={"span"} className="text-gray-600">
                  {product.price || 'Free'} €
                </Text>
              </div>
              {/* Options */}
              
            {product.options && (
              <div className="mt-6 space-y-6">
                {/* Color selector */}
                {product.options.colors?.length > 0 && (
                  <div>
                    <Text as="label" className="mb-2 block font-semibold text-sm">
                      Color
                    </Text>
                    <RadioGroup
                      name="color"
                      options={product.options.colors.map((c) => ({
                        label: c.name,
                        value: c.code,
                      }))}
                      value={selectedColor}
                      onChange={setSelectedColor}
                      columns={3}
                    />
                  </div>
                )}

                {/* Storage selector */}
                {product.options.storages?.length > 0 && (
                  <div>
                    <Text as="label" className="mb-2 block font-semibold text-sm">
                      Storage
                    </Text>
                    <RadioGroup
                      name="storage"
                      options={product.options.storages.map((s) => ({
                        label: s.name,
                        value: s.code,
                      }))}
                      value={selectedStorage}
                      onChange={setSelectedStorage}
                      columns={3}
                    />
                  </div>
                )}
              </div>
            )}

              {/* Add to Cart */}
                  {cartError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-sm text-red-600">{cartError.message}</p>
                      <button 
                        onClick={clearError}
                        className="text-xs text-red-500 underline mt-1"
                      >
                        Dismiss
                      </button>
                    </div>
                  )}
                  
                  <Button 
                    onClick={handleAddToCart}
                    disabled={isAddToCartDisabled}
                    className="w-full h-12 text-lg font-semibold"
                    size="lg"
                  >
                    {isAddingToCart ? (
                      <>
                        <Spinner className="mr-2 h-4 w-4" />
                        Adding to Cart...
                      </>
                    ) : (
                      'Add to Cart'
                    )}
                  </Button>
                  
                  {isAddToCartDisabled && !isAddingToCart && (
                    <p className="text-sm text-gray-500 text-center mt-2">
                      Please select all options to add to cart
                    </p>
                  )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
