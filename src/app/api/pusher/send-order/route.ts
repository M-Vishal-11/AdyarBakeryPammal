import Pusher from "pusher";
import { NextRequest, NextResponse } from "next/server";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

export async function POST(request: NextRequest) {
  const data = await request.json();

  await pusher.trigger("orders", "new-order", {
    orderId: data.orderId, // Unique order ID
    name: data.name, // User's name
    totalAmount: data.totalAmount, // Total ₹ of the order
    phone: data.phone, // Phone number (if needed)
  });

  return NextResponse.json({ success: true });
}
