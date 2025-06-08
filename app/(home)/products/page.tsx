import Image from "next/image";

export default function page() {
  return (
    <div>
      <div className="flex justify-end-safe gap-2">
        <button className="bg-[#ff1a1a] hover:bg-[#b30000] active:bg-[#b30000] text-white rounded-lg px-1 shadow-md active:shadow-xl">
          Collapse
        </button>
        <button className="bg-[#ff1a1a] hover:bg-[#b30000] active:bg-[#b30000] text-white rounded-lg px-1 shadow-md active:shadow-xl">
          Expand
        </button>
      </div>
      <div>
        {/* Categories */}
        <details className="mb-2">
          <summary className="font-semibold text-topcolor text-xl ml-2 mt-3">
            Category
          </summary>
          <hr className="mb-2" />

          {/* Products */}
          <div className="flex flex-col gap-[3vh] lg:grid lg:grid-cols-2 lg:gap-[6vh] lg:mr-2">
            <article className="flex flex-row gap-[2vh] relative">
              <Image
                src="imgs/img.svg"
                width={120}
                height={60}
                alt="img"
                className=""
              />
              <div className="">
                <h1 className="w-full line-clamp-1 font-semibold text-xl">
                  paneer cake word dokf dklfj
                </h1>
                <h1>₹100</h1>
              </div>
              <button className="bg-[#ff1a1a] text-white p-1 rounded-lg absolute right-0 bottom-1">
                Add To Cart
              </button>
            </article>
            <article className="flex flex-row gap-[2vh] relative">
              <Image src="imgs/img.svg" width={120} height={60} alt="img" />
              <div className="">
                <h1 className="w-full line-clamp-1 font-semibold text-xl">
                  paneer cake2
                </h1>
                <h1>₹100</h1>
              </div>
              <button className="bg-[#ff1a1a] text-white p-1 rounded-lg absolute right-0 bottom-1">
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
              <div className="">
                <h1 className="w-full line-clamp-1 font-semibold text-xl">
                  paneer cake word dokf dklfj
                </h1>
                <h1>₹100</h1>
              </div>
              <button className="bg-[#ff1a1a] text-white p-1 rounded-lg absolute right-0 bottom-1">
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
              <div className="">
                <h1 className="w-full line-clamp-1 font-semibold text-xl">
                  paneer cake word dokf dklfj
                </h1>
                <h1>₹100</h1>
              </div>
              <button className="bg-[#ff1a1a] text-white p-1 rounded-lg absolute right-0 bottom-1">
                Add To Cart
              </button>
            </article>
            <article className="flex flex-row gap-[2vh] relative">
              <Image src="imgs/img.svg" width={120} height={60} alt="img" />
              <div className="">
                <h1 className="w-full line-clamp-1 font-semibold text-xl">
                  paneer cake2
                </h1>
                <h1>₹100</h1>
              </div>
              <button className="bg-[#ff1a1a] text-white p-1 rounded-lg absolute right-0 bottom-1">
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
              <div className="">
                <h1 className="w-full line-clamp-1 font-semibold text-xl">
                  paneer cake word dokf dklfj
                </h1>
                <h1>₹100</h1>
              </div>
              <button className="bg-[#ff1a1a] text-white p-1 rounded-lg absolute right-0 bottom-1">
                Add To Cart
              </button>
            </article>
          </div>
        </details>
        <details className="mb-2">
          <summary className="font-semibold text-topcolor text-xl ml-2 mt-3">
            Category
          </summary>
          <hr className="mb-2" />

          {/* Products */}
          <div className="flex flex-col gap-[3vh] lg:grid lg:grid-cols-2 lg:gap-[6vh] lg:mr-2">
            <article className="flex flex-row gap-[2vh] relative">
              <Image
                src="imgs/img.svg"
                width={120}
                height={60}
                alt="img"
                className=""
              />
              <div className="">
                <h1 className="w-full line-clamp-1 font-semibold text-xl">
                  paneer cake word dokf dklfj
                </h1>
                <h1>₹100</h1>
              </div>
              <button className="bg-[#ff1a1a] text-white p-1 rounded-lg absolute right-0 bottom-1">
                Add To Cart
              </button>
            </article>
            <article className="flex flex-row gap-[2vh] relative">
              <Image src="imgs/img.svg" width={120} height={60} alt="img" />
              <div className="">
                <h1 className="w-full line-clamp-1 font-semibold text-xl">
                  paneer cake2
                </h1>
                <h1>₹100</h1>
              </div>
              <button className="bg-[#ff1a1a] text-white p-1 rounded-lg absolute right-0 bottom-1">
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
              <div className="">
                <h1 className="w-full line-clamp-1 font-semibold text-xl">
                  paneer cake word dokf dklfj
                </h1>
                <h1>₹100</h1>
              </div>
              <button className="bg-[#ff1a1a] text-white p-1 rounded-lg absolute right-0 bottom-1">
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
              <div className="">
                <h1 className="w-full line-clamp-1 font-semibold text-xl">
                  paneer cake word dokf dklfj
                </h1>
                <h1>₹100</h1>
              </div>
              <button className="bg-[#ff1a1a] text-white p-1 rounded-lg absolute right-0 bottom-1">
                Add To Cart
              </button>
            </article>
            <article className="flex flex-row gap-[2vh] relative">
              <Image src="imgs/img.svg" width={120} height={60} alt="img" />
              <div className="">
                <h1 className="w-full line-clamp-1 font-semibold text-xl">
                  paneer cake2
                </h1>
                <h1>₹100</h1>
              </div>
              <button className="bg-[#ff1a1a] text-white p-1 rounded-lg absolute right-0 bottom-1">
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
              <div className="">
                <h1 className="w-full line-clamp-1 font-semibold text-xl">
                  paneer cake word dokf dklfj
                </h1>
                <h1>₹100</h1>
              </div>
              <button className="bg-[#ff1a1a] text-white p-1 rounded-lg absolute right-0 bottom-1">
                Add To Cart
              </button>
            </article>
          </div>
        </details>
      </div>
    </div>
  );
}
