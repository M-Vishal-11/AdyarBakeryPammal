import isOpen from "@/lib/isOpen";
import { connect } from "@/lib/mongoConnections";
import Products from "@/lib/products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  NextResponse.json({ message: "cookies sent successfully" });

  let cart: { [key: string]: number } = {};

  try {
    const cartCookie = request.cookies.get("bakeryCart")?.value;
    cart = cartCookie ? JSON.parse(cartCookie) : {};
  } catch (err) {
    console.error("Invalid bakeryCart cookie:", err);
    return NextResponse.json({ message: "Invalid cart data", success: false });
  }

  if (!cart || Object.keys(cart).length === 0) {
    return NextResponse.json({
      message: "Cart is empty",
      success: false,
    });
  }

  const productNames = Object.keys(cart);
  let CartTotal = 0,
    discountedPrice = 0,
    delivery = 0;

  try {
    await connect();

    const getDelivery = await isOpen.find({}, { delivery: 1 });
    delivery = getDelivery[0]?.delivery || 0;

    const products = await Products.find(
      { productName: { $in: productNames } },
      { productName: 1, price: 1, discountedPrice: 1 }
    );

    for (const product of products) {
      const quantity = cart[product.productName] || 0;
      const price = product.price;
      CartTotal += price * quantity;

      if (product.discountedPrice) {
        discountedPrice += (product.price - product.discountedPrice) * quantity;
      }
    }

    const invoice = {
      CartTotal,
      delivery,
      discountedPrice,
    };

    return NextResponse.json({
      message: "Total calculated successfully",
      success: true,
      invoice,
    });
  } catch (error) {
    console.error("Invoice calculation error:", error);
    return NextResponse.json(
      { message: "Database error", success: false, error },
      { status: 500 }
    );
  }
}
