export default function page() {
  return (
    <div>
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
      <hr className="border-t border-[#D9D9D9] w-3xl" />
      <div className="my-4">
        <label>Method Of payment: </label>
        <select className="w-30 bg-white text-black rounded-md px-2 py-1 ml-4">
          <option>Cash</option>
        </select>
      </div>
      <hr className="border-t border-[#D9D9D9] w-3xl" />
      <div>
        <button className="bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-white w-40 h-14 text-2xl rounded-xl mb-5 p-2 mt-4 ">
          Place Order
        </button>
      </div>
      <button className="bg-gray-500 opacity-35 hover:opacity-100 hover:bg-gray-700 active:opacity-100 active:bg-gray-700 text-white text-lg rounded-xl mb-5 px-4 py-2 mt-3">
        <span className="transform rotate-180 inline-block">➤</span> Back
      </button>
    </div>
  );
}
