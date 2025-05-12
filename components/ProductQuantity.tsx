"use client";

import { useState } from "react";
import AddtoCart from "./AddtoCart";

export default function ProductQuantity({price, slug}: {price: number, slug: string}) {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <>
      <div className="product__details__quantity">
        <div className="quantity">
          <div className="pro-qty">
            <i onClick={handleDecrement} className="fa-solid fa-minus left"></i>
            <input type="text" value={quantity} disabled />
            <i onClick={handleIncrement} className="fa-solid fa-plus right"></i>
          </div>
        </div>
      </div>

      <AddtoCart price={price} slug={slug} itemsCount={quantity}>ADD TO CARD</AddtoCart>
    </>
  );
}
