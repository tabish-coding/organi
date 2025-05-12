// import { Cart, CartItem } from "@/types/cart.types";

// // Helper function to check if window is available (for SSR)
// const isClient = (): boolean => typeof window !== "undefined";

// // Get current cart from localStorage
// export const getCart = (): Cart => {
//   if (isClient()) {
//     const cart = localStorage.getItem("cart");
//     return cart ? JSON.parse(cart) : [];
//   }
//   return [];
// };

// // Add item to cart or update quantity if exists
// export const addToCart = (
//   productSlug: string,
//   price: number,
//   quantity: number = 1
// ): Cart => {
//   if (isClient()) {
//     const cart = getCart();
//     const existingItem = cart.find((item) => item.slug === productSlug);

//     let updatedCart: Cart;

//     if (existingItem) {
//       updatedCart = cart.map((item) =>
//         item.slug === productSlug
//           ? { ...item, quantity: item.quantity + quantity }
//           : item
//       );
//     } else {
//       updatedCart = [...cart, { slug: productSlug, price, quantity }];
//     }

//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     triggerCartUpdate();
//     return updatedCart;
//   }
//   return [];
// };

// // Remove item from cart
// export const removeFromCart = (productSlug: string): Cart => {
//   if (isClient()) {
//     const cart = getCart();
//     const updatedCart = cart.filter((item) => item.slug !== productSlug);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     triggerCartUpdate();
//     return updatedCart;
//   }
//   return [];
// };

// // Update item quantity in cart
// export const updateCartItemQuantity = (
//   productSlug: string,
//   newQuantity: number
// ): Cart => {
//   if (isClient()) {
//     const cart = getCart();
//     const updatedCart = cart.map((item) =>
//       item.slug === productSlug
//         ? { ...item, quantity: Math.max(1, newQuantity) }
//         : item
//     );
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     triggerCartUpdate();
//     return updatedCart;
//   }
//   return [];
// };

// // Calculate cart total
// export const getCartTotal = (): number => {
//   const cart = getCart();
//   return cart.reduce((total, item) => total + item.price * item.quantity, 0);
// };

// // Get total number of items in cart
// export const getCartItemCount = (): number => {
//   const cart = getCart();
//   return cart.reduce((count, item) => count + item.quantity, 0);
// };

// // Clear entire cart
// export const clearCart = (): void => {
//   if (isClient()) {
//     localStorage.removeItem("cart");
//     triggerCartUpdate();
//   }
// };

// // Helper function to notify other components of cart changes
// const triggerCartUpdate = (): void => {
//   if (isClient()) {
//     window.dispatchEvent(new Event("storage"));
//   }
// };

// // Optional: Get a specific cart item
// export const getCartItem = (productSlug: string): CartItem | undefined => {
//   const cart = getCart();
//   return cart.find((item) => item.slug === productSlug);
// };

import { Cart, CartItem } from "@/types/cart.types";
import Cookies from "js-cookie";

const CART_COOKIE_NAME = "app_cart";

export const getCart = (): Cart => {
  if (typeof window === "undefined") return [];

  const cartCookie = Cookies.get(CART_COOKIE_NAME);
  try {
    return cartCookie ? JSON.parse(cartCookie) : [];
  } catch (e) {
    console.error("Failed to parse cart cookie", e);
    return [];
  }
};

export const saveCart = (cart: Cart): void => {
  Cookies.set(CART_COOKIE_NAME, JSON.stringify(cart), {
    expires: 7, // 7 days expiration
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
  });
};

export const addToCart = (
  item: Omit<CartItem, "quantity">,
  quantity: number = 1
): Cart => {
  const cart = getCart();
  const existingIndex = cart.findIndex((i) => i.slug === item.slug);

  let updatedCart: Cart;

  if (existingIndex >= 0) {
    updatedCart = [...cart];
    updatedCart[existingIndex] = {
      ...updatedCart[existingIndex],
      quantity: updatedCart[existingIndex].quantity + quantity,
    };
  } else {
    updatedCart = [...cart, { ...item, quantity }];
  }

  saveCart(updatedCart);
  return updatedCart;
};

export const removeFromCart = (slug: string): Cart => {
  const cart = getCart();
  const updatedCart = cart.filter((i) => i.slug !== slug);
  saveCart(updatedCart);
  return updatedCart;
};

export const updateItemQuantity = (slug: string, quantity: number): Cart => {
  if (quantity < 1) return removeFromCart(slug);

  const cart = getCart();
  const updatedCart = cart.map((i) =>
    i.slug === slug ? { ...i, quantity } : i
  );
  saveCart(updatedCart);
  return updatedCart;
};

export const clearCart = (): void => {
  Cookies.remove(CART_COOKIE_NAME);
};

export const getCartTotal = (): number => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const getCartItemCount = (): number => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};
