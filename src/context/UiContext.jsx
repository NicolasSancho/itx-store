// UiContext.jsx
import React, { createContext, useContext, useState } from "react";
import { setCachedData, getCachedData } from "../utils/cache";

const UIContext = createContext();
export const useUIContext = () => useContext(UIContext);
const CART_EXPIRY = 60 * 60 * 1000;
const CART_COUNT_KEY = 'cartCount';

export const UIProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [cartCount, setCartCount] = useState(() => {
    const cached = getCachedData(CART_COUNT_KEY, CART_EXPIRY);
    return typeof cached === "number" ? cached : 0;
  });

  const addToCart = () => {
    const updatedCount = cartCount + 1;
    setCartCount(updatedCount);
    setCachedData(CART_COUNT_KEY, updatedCount);
  };

  const clearCart = () => {
    setCartCount(0);
    setCachedData(CART_COUNT_KEY, 0);
  };

  const removeFromCart = (productId) => {
    const updatedItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedItems);
    setCartCount(updatedItems.length);
    localStorage.setItem(CART_COUNT_KEY, updatedItems.length.toString());
  };

  return (
    <UIContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        clearCart,
        currentProduct,
        setCurrentProduct,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
