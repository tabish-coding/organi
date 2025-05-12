import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { client } from "@/sanity/lib/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});
export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text(); // Get raw body

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;

    if (!metadata) {
      return new NextResponse("No metadata found in session", { status: 400 });
    }

    try {
      const products = JSON.parse(metadata.products || "[]");

      const order = await client.create({
        _type: "order",
        userId: metadata.userId,
        ...metadata, // firstName, address, etc.
        products: products.map((p: any) => ({
          _key: p.slug,
          name: p.slug.replace(/-/g, " "),
          price: p.price,
          quantity: p.quantity,
          slug: p.slug,
        })),
        subtotal: parseFloat(metadata.subtotal),
        total: parseFloat(metadata.total),
        createdAt: new Date().toISOString(),
        status: "confirmed",
      });

      console.log("Order saved to Sanity:", order._id);
    } catch (error) {
      console.error("Error saving order to Sanity:", error);
      return new NextResponse("Error creating order", { status: 500 });
    }
  }

  return new NextResponse("Webhook received", { status: 200 });
}