"use server";

import { client } from "@/sanity/lib/client";

export async function createOrder(orderData: Record<string, any>) {
  try {
    const createdOrder = await client.create({
      _type: "order",
      ...orderData,
    });
    return { success: true, order: createdOrder };
  } catch (error) {
    console.error("Error creating order:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return { success: false, error: errorMessage };
  }
}