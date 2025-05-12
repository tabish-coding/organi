"use server";

import { CartItem } from "@/types/cart.types";

export default async function createCheckoutSession(
  cart: CartItem[],
  formData: Record<string, any>,
  userId: string,
  total: number
) {
  const Stripe = require("stripe");
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const line_items = cart.map(({ slug, quantity, price }) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: slug.split("-").join(" "),
      },
      unit_amount: price * 100,
    },
    quantity,
  }));

  const siteUrl = process.env.SITE_URL;
  if(!siteUrl) {
    throw new Error("Site URL is not defined.");
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items,
    success_url: `${siteUrl}/payment/success`,
    cancel_url: `${siteUrl}/payment/cancel`,
    metadata: {
      userId,
      subtotal: total,
      total,
      products: JSON.stringify(cart), // Send the cart as a string
      ...formData, // address, phone, etc.
    },
  });

  return { id: session.id };
}
