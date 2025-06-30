import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { productName, qnty } = await request.json();
  const res = NextResponse.json({
    message: "cookies created successfully",
  });

  const cartCookie = request.cookies.get("bakeryCart")?.value;
  let cart = cartCookie ? JSON.parse(cartCookie) : {};

  if (qnty === 0) {
    delete cart[productName];
    cart = JSON.stringify(cart);

    res.cookies.set("bakeryCart", cart);

    return res;
  }
  cart[productName] = qnty;

  cart = JSON.stringify(cart);

  res.cookies.set("bakeryCart", cart);

  return res;
}
