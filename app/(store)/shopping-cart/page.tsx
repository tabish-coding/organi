"use client";

import Breadcrumb from "@/components/Breadcrumb";
import Loader from "@/components/Loader";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const query = `*[_type == "product" && slug.current in $productSlugs] {
  _id,
  title,
  price,
  "slug": slug.current,
  mainImage
}`;

export default function ShoppingCartPage() {
  const { cart, total, updateItemQuantity, removeFromCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const productSlugs = useMemo(() => cart.map((item) => item.slug), [cart]);

  useEffect(() => {
    if (productSlugs.length > 0) {
      client.fetch(query, { productSlugs }).then((data) => {
        setProducts(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [productSlugs]);

  if (loading) {
    return <Loader />;
  }

  if (cart.length === 0) {
    return (
      <div className="container m-auto">
        <div className="row">
          <div
            className="col-lg-12"
            style={{ width: "27rem", margin: "5rem auto" }}
          >
            <h1>Your cart is empty</h1>
            <p>
              You have no items in your shopping cart.&nbsp;
              <Link href="/shop" style={{ color: "green" }}>
                Continue Shopping
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb
        title="Shopping Cart"
        items={[{ name: "Home", href: "/" }, { name: "Shopping Cart" }]}
      />
      <section className="shoping-cart spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="shoping__cart__table">
                <table>
                  <thead>
                    <tr>
                      <th className="shoping__product">Products</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 &&
                      products.map((product: Product) => {
                        let totalPrice =
                          (product.price ?? 0) *
                          (cart.find((item) => item.slug === `${product.slug}`)
                            ?.quantity || 0);

                        let productQuantity = cart.find(
                          (item) => item.slug === `${product.slug}`
                        )?.quantity;

                        return (
                          <tr key={product._id}>
                            <td className="shoping__cart__item">
                              <img
                                src={
                                  product.mainImage
                                    ? urlFor(product.mainImage).url()
                                    : ""
                                }
                                alt=""
                              />
                              <h5>{product.title}</h5>
                            </td>
                            <td className="shoping__cart__price">
                              ${product.price ?? 0}.00
                            </td>
                            {/* Shopping Cart Quantity */}
                            <td className="shoping__cart__quantity">
                              <div className="quantity">
                                <div className="pro-qty">
                                  {productQuantity && productQuantity > 1 ? (
                                    <i
                                      onClick={() =>
                                        updateItemQuantity(
                                          String(product.slug),
                                          productQuantity - 1
                                        )
                                      }
                                      className="fa-solid fa-minus left"
                                    ></i>
                                  ) : (
                                    <i
                                      className="fa-solid fa-minus left"
                                      style={{ opacity: "0.5" }}
                                    ></i>
                                  )}

                                  <input
                                    type="number"
                                    value={productQuantity}
                                    readOnly
                                    disabled
                                    style={{ userSelect: "none" }}
                                  />
                                  <i
                                    onClick={() =>
                                      updateItemQuantity(
                                        String(product.slug),
                                        (productQuantity || 0) + 1
                                      )
                                    }
                                    className="fa-solid fa-plus right"
                                  ></i>
                                </div>
                              </div>
                            </td>
                            <td className="shoping__cart__total">
                              ${totalPrice}.00
                            </td>
                            <td className="shoping__cart__item__close">
                              <span onClick={() => removeFromCart(String(product.slug))} className="icon_close"><i className="fa-solid fa-x"></i></span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="shoping__cart__btns">
                <Link href="/shop" className="primary-btn cart-btn">
                  CONTINUE SHOPPING
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="shoping__continue">
                <div className="shoping__discount">
                  <h5>Discount Codes</h5>
                  <form action="#">
                    <input type="text" placeholder="Enter your coupon code" />
                    <button type="submit" className="site-btn">
                      APPLY COUPON
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="shoping__checkout">
                <h5>Cart Total</h5>
                <ul>
                  <li>
                    Subtotal <span>${total}.00</span>
                  </li>
                  <li>
                    Total <span>${total}.00</span>
                  </li>
                </ul>
                <Link href="/checkout" className="primary-btn">
                  PROCEED TO CHECKOUT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
