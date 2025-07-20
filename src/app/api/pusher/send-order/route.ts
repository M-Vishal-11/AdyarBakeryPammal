import Pusher from "pusher";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connect } from "@/lib/mongoConnections";
import isOpen from "@/lib/isOpen";
import Products from "@/lib/products";
import UserOrders from "@/lib/userOrders";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

export async function POST(request: NextRequest) {
  try {
    const { userID } = await request.json(); //get userID

    if (!userID) {
      return NextResponse.json({ message: "Missing userID", success: false });
    }

    const cookieStore = await cookies();
    const cartCookie = cookieStore.get("bakeryCart")?.value;
    if (!cartCookie) {
      return NextResponse.json({ message: "Cart is empty", success: false });
    }

    const cartData = JSON.parse(cartCookie); //got cookies
    if (Object.keys(cartData).length === 0) {
      return NextResponse.json({ message: "Cart is empty", success: false });
    }

    const productNames = Object.keys(cartData); //extracted product names
    let cartTotal = 0,
      totalAmount = 0,
      delivery = 0;

    await connect();

    const getDelivery = await isOpen.find({}, { delivery: 1 }); //get delivery amount
    delivery = getDelivery[0]?.delivery || 0;

    const products = await Products.find(
      { productName: { $in: productNames } },
      { productName: 1, price: 1, discountedPrice: 1 }
    ); //extracted products data

    const plainProducts = products.map((p) => p.toObject()); // actual products data + order

    for (const product of plainProducts) {
      const quantity = cartData[product.productName] || 0;
      product.qnty = quantity;
      const price = product.discountedPrice || product.price;
      cartTotal += price * quantity;
    }
    // console.log(cartTotal);

    totalAmount = cartTotal + delivery;

    const strProducts = JSON.stringify(plainProducts);

    const date = new Date();

    // send order to db
    await UserOrders.findOneAndUpdate(
      { userId: userID },
      {
        userId: userID,
        orders: strProducts,
        totalAmount: totalAmount,
        status: "waiting",
        date: date,
        payment: "pending",
        isPaid: false,
        razorpayOrderId: "none",
        razorpayPaymentId: "none",
        razorpaySignature: "none",
      },
      { new: true, upsert: true } // creates if not found
    );

    // cookieStore.delete("bakeryCart"); //deletes cookies

    // Optional: trigger real-time notification

    await pusher.trigger("orders", "new-order", {
      userID,
      products: plainProducts,
      totalAmount: totalAmount,
      productCount: productNames.length,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error("Unexpected error:", error);
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
