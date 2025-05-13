//

// hooks/useCart.ts
import { useState, useEffect, useCallback } from "react";
import {
  getCart,
  addToCart as addToCartCookie,
  removeFromCart as removeFromCartCookie,
  updateItemQuantity as updateItemQuantityCookie,
  clearCart as clearCartCookie,
  getCartTotal,
  getCartItemCount,
} from "../utils/cart";
import { Cart, CartItem } from "@/types/cart.types";

interface UseCartReturn {
  cart: Cart;
  total: number;
  itemCount: number;
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (slug: string) => void;
  updateItemQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  isLoading: boolean;
}

export const useCart = (): UseCartReturn => {
  const [cart, setCart] = useState<Cart>([]);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Centralized state updater
  const updateCartState = useCallback(() => {
    const currentCart = getCart();
    setCart(currentCart);
    setTotal(getCartTotal());
    setItemCount(getCartItemCount());
    setIsLoading(false);
  }, []);

  // Initialize cart and set up event listeners
  useEffect(() => {
    updateCartState();

    const handleCartUpdate = () => {
      updateCartState();
    };

    // Listen to custom events and storage events
    window.addEventListener("cartUpdated", handleCartUpdate);
    window.addEventListener("storage", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
      window.removeEventListener("storage", handleCartUpdate);
    };
  }, [updateCartState]);

  const addToCart = useCallback(
    (item: Omit<CartItem, "quantity">, quantity: number = 1) => {
      setIsLoading(true);
      addToCartCookie(item, quantity);
      // Dispatch both custom event and storage event for maximum compatibility
      window.dispatchEvent(new Event("cartUpdated"));
      window.localStorage.setItem("cartTrigger", Date.now().toString());
    },
    []
  );

  const removeFromCart = useCallback((slug: string) => {
    setIsLoading(true);
    removeFromCartCookie(slug);
    window.dispatchEvent(new Event("cartUpdated"));
    window.localStorage.setItem("cartTrigger", Date.now().toString());
  }, []);

  const updateItemQuantity = useCallback((slug: string, quantity: number) => {
    setIsLoading(true);
    updateItemQuantityCookie(slug, quantity);
    window.dispatchEvent(new Event("cartUpdated"));
    window.localStorage.setItem("cartTrigger", Date.now().toString());
  }, []);

  const clearCart = useCallback(() => {
    setIsLoading(true);
    clearCartCookie();
    window.dispatchEvent(new Event("cartUpdated"));
    window.localStorage.setItem("cartTrigger", Date.now().toString());
  }, []);

  return {
    cart,
    total,
    itemCount,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCart,
    isLoading,
  };
};
