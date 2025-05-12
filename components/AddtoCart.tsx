"use client";

import { useCart } from "@/hooks/useCart";
export default function AddtoCart({
  children,
  itemsCount,
  price,
  slug,
}: {
  children: React.ReactNode;
  itemsCount: number;
  price: number;
  slug: string;
}) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ slug, price }, itemsCount);
  };

  return (
    <button name="Add To Cart" onClick={handleAddToCart} className="primary-btn">
      {children}
    </button>
  );
}
