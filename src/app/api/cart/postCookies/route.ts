import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { productName, qnty } = await request.json();
  const res = NextResponse.json({
    message: "cookies created successfully",
  });

  let cart = JSON.parse(request.cookies.get("bakeryCart")?.value as string);

  if (qnty === 0) {
    delete cart[productName];
    cart = JSON.stringify(cart);

    res.cookies.set("bakeryCart", cart);

    console.log(res.cookies.get("bakeryCart"));

    return res;
  }
  cart[productName] = qnty;

  cart = JSON.stringify(cart);

  res.cookies.set("bakeryCart", cart);

  console.log(res.cookies.get("bakeryCart"));

  return res;
}
