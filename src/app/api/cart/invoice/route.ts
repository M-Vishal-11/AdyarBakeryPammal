import isOpen from "@/lib/isOpen";
import { connect } from "@/lib/mongoConnections";
import Products from "@/lib/products";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { cart } = await request.json();
  console.log("Cart:", cart);

  const productNames = Object.keys(cart); // Step 1: Extract product names
  let CartTotal = 0,
    discountedPrice = 0,
    delivery = 0;

  try {
    await connect();

    const getDelivery = await isOpen.find({}, { delivery: 1 });
    delivery = getDelivery[0].delivery;

    // Step 2: Fetch prices of all products in the cart
    const products = await Products.find(
      { productName: { $in: productNames } },
      { productName: 1, price: 1, discountedPrice: 1 }
    );

    // Step 3: Calculate total
    for (const product of products) {
      const quantity = cart[product.productName] || 0;
      const price = product.discountedPrice || product.price; // use discounted price if available
      CartTotal += price * quantity;
      if (product.discountedPrice) {
        discountedPrice += product.discountedPrice;
      }
    }

    const invoice = {
      CartTotal,
      delivery,
      discountedPrice,
    };

    // Step 4: Return total
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
