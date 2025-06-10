import Image from "next/image";
export default function page() {
  return (
    <div>
      <hr className="border-t border-[#D9D9D9] my-[2vh]" />
      <div className="lg:grid lg:grid-cols-2 lg:gap-[6vh]">
        <div>
          {/* Left */}
          <div className="flex flex-col gap-[3vh] lg:mr-4">
            {/* Products */}
            <article className="flex flex-row gap-[2vh] relative">
              <Image
                src="imgs/img.svg"
                width={120}
                height={60}
                alt="img"
                className=""
              />
              <div className="leading-normal">
                <h1 className="w-full line-clamp-1 font-semibold text-xl">
                  paneer cake word dokf dklfj
                </h1>
                <div className="text-sm leading-4">
                  <p className="text-green-900 font-bold">
                    Paneer cake for free
                  </p>
                  <p className="text-green-900 font-bold">pan cake for free</p>
                  <p className="text-green-900 font-bold">pan cake for free</p>
                  <p className="text-green-900 font-bold">pan cake for free</p>
                </div>
                <h1>₹100</h1>
              </div>
              <button className="bg-[#ff1a1a] text-white p-1 rounded-lg absolute right-0 bottom-1 md:right-2">
                Add To Cart
              </button>
            </article>
            <article className="flex flex-row gap-[2vh] relative">
              <Image
                src="imgs/img.svg"
                width={120}
                height={60}
                alt="img"
                className=""
              />
              <div className="leading-normal">
                <h1 className="w-full line-clamp-1 font-semibold text-xl">
                  paneer cake word dokf dklfj
                </h1>
                <div className="text-sm leading-4">
                  {/* <p className="text-green-900 font-bold">Paneer cake for free</p>
              <p className="text-green-900 font-bold">pan cake for free</p>
              <p className="text-green-900 font-bold">pan cake for free</p>
              <p className="text-green-900 font-bold">pan cake for free</p> */}
                </div>
                <h1>₹100</h1>
              </div>
              <button className="bg-[#ff1a1a] text-white p-1 rounded-lg absolute right-0 bottom-1 md:right-2">
                Add To Cart
              </button>
            </article>
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
          <div className="mb-3">
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
          <button className="inline-block lg:hidden bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-white text-lg w-30 rounded-xl mb-5 p-2 ml-auto mt-3 md:mr-2">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
