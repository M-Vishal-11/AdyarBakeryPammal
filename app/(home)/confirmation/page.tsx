import Backbtn from "./functions/backbtn";
import PlaceOrderbtn from "./functions/placeOrderbtn";

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
        <PlaceOrderbtn />
      </div>
      <Backbtn />
    </div>
  );
}
