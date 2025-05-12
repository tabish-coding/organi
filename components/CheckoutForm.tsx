"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { createOrder } from "@/app/(store)/actions/orderActions";
import { useCart } from "@/hooks/useCart";
import createCheckoutSession from "@/app/(store)/actions/paymentActions";
import { loadStripe } from "@stripe/stripe-js";

const CheckoutForm = () => {
  const { user } = useUser();

  const { cart: cartItems, total, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
    phone: "",
    email: user?.emailAddresses?.[0]?.emailAddress || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (e: { preventDefault: () => void }) => {
  //   e.preventDefault();

  //   setIsSubmitting(true);
  //   setError(null);

  //   try {
  //     const products = cartItems.map((item) => ({
  //       _key: item.slug, // Using the product slug as the key
  //       name: item.slug.split("-").join(" "),
  //       price: item.price,
  //       quantity: item.quantity,
  //       slug: item.slug,
  //     }));
  //     const orderData = {
  //       userId: user?.id,
  //       ...formData,
  //       products,
  //       subtotal: total,
  //       total,
  //       status: "pending",
  //       createdAt: new Date().toISOString(),
  //     };

  //     const result = await createOrder(orderData);

  //     if (result.success) {
  //       clearCart();
  //       const stripePromise = loadStripe(
  //         process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  //       );
  //       const response = await createCheckoutSession(cartItems);
  //       const stripe = await stripePromise;
  //       if (stripe) {
  //         stripe.redirectToCheckout({ sessionId: response.id });
  //       }
  //     } else {
  //       setError(result.error || "Failed to create order");
  //     }
  //   } catch (err) {
  //     setError(err.message || "An unexpected error occurred");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (!user?.id) {
      setError("Please sign in to complete the order.");
      setIsSubmitting(false);
      return;
    }

    try {
      const stripePromise = loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      );
      const response = await createCheckoutSession(
        cartItems,
        formData,
        user?.id,
        total
      );

      const stripe = await stripePromise;
      if (stripe) {
        stripe.redirectToCheckout({ sessionId: response.id });
      }
    } catch (err) {
      setError("Something went wrong during payment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="checkout spad">
      <div className="container">
        <div className="checkout__htmlForm">
          <h4>Billing Details</h4>
          {error && (
            <div
              className="error-message"
              style={{ color: "red", marginBottom: "1rem" }}
            >
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-8 col-md-6">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="checkout__input">
                      <p>
                        First Name<span>*</span>
                      </p>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="checkout__input">
                      <p>
                        Last Name<span>*</span>
                      </p>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="checkout__input">
                  <p>
                    Country<span>*</span>
                  </p>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="checkout__input">
                  <p>
                    Address<span>*</span>
                  </p>
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    className="checkout__input__add"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="checkout__input">
                  <p>
                    Town/City<span>*</span>
                  </p>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="checkout__input">
                  <p>
                    Country/State<span>*</span>
                  </p>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="checkout__input">
                  <p>
                    Postcode / ZIP<span>*</span>
                  </p>
                  <input
                    type="text"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="checkout__input">
                      <p>
                        Phone<span>*</span>
                      </p>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="checkout__input">
                      <p>
                        Email<span>*</span>
                      </p>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="checkout__order">
                  <h4>Your Order</h4>
                  <div className="checkout__order__products">
                    Products <span>Total</span>
                  </div>
                  <ul style={{ padding: "0px" }}>
                    {cartItems.map((item, index) => (
                      <li key={index} style={{ textTransform: "capitalize" }}>
                        {item.slug.split("-").join(" ")}{" "}
                        <span>${item.price.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="checkout__order__subtotal">
                    Subtotal <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="checkout__order__total">
                    Total <span>${total.toFixed(2)}</span>
                  </div>
                  <button
                    type="submit"
                    className="site-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "PLACE ORDER"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CheckoutForm;
