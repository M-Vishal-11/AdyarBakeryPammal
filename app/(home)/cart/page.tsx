import ProductCard from "@/app/functions/productcard";

export default function page() {
  return (
    <div>
      <hr className="border-t border-[#D9D9D9] my-[2vh]" />
      <div className="lg:grid lg:grid-cols-2 lg:gap-[6vh]">
        <div>
          {/* Left */}

          <div className="flex flex-col gap-[3vh] lg:mr-4">
            {/* Products */}

            <ProductCard
              productName="paneer cake word dokf dklfj"
              price={100}
              line1="pan cake for free"
              line2="pan cake for free"
              line3="pan cake for free"
            />
            <ProductCard
              productName="paneer cake word dokf dklfj"
              price={100}
            />
            <ProductCard
              productName="paneer cake word dokf dklfj"
              price={100}
            />
            <ProductCard
              productName="paneer cake word dokf dklfj"
              price={100}
            />
          </div>
          <hr className="mt-5 border-t border-[#D9D9D9]" />
          <div className="flex flex-row justify-around font-bold bg-[#FFDAD1] py-[2vh] mt-3">
            Cart Total: <span>₹150</span>
          </div>
          <hr className="mt-5 border-t border-[#D9D9D9]" />
        </div>
        <div className="lg:border-l-2 border-[#D9D9D9] lg:pl-5 flex flex-col">
          <button className="hidden lg:block bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-white p-4 text-2xl w-52 rounded-xl mb-5">
            Buy Now
          </button>
          <div className="mb-3 ml-2 lg:ml-0">
            <h1 className="underline font-bold underline-offset-3 mt-5">
              Invoice:
            </h1>
            <ol className="p-2 font-medium">
              <li>
                Cart Total: <span>₹150</span>
              </li>
              <li>
                Delivery: <span>₹0</span>
              </li>
              <li>
                Discount: <span>₹50</span>
              </li>
              <li>
                Today&apos;s saved: <span>₹50</span>
              </li>
              <li className="underline underline-offset-3 font-bold">
                Total Amount: <span>₹100</span>
              </li>
            </ol>
          </div>
          <hr className="border-t border-[#D9D9D9]" />
          <button className="inline-block lg:hidden bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-white text-lg w-30 rounded-xl mb-5 p-2 ml-auto mt-3 mr-2">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
