import { FiMoon, FiShoppingBag } from "react-icons/fi";

export default function UserShopStatus() {
  return (
    <div
      className="rounded-xl shadow-lg p-6 mb-8 transition-all duration-300 hover:shadow-xl"
      style={{ backgroundColor: "#ffebe6" }} // Added the custom background color
    >
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-red-100">
          <FiShoppingBag className="text-red-600 text-2xl" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Shop is currently CLOSED</h2>
        <p className="text-gray-600 mb-4 text-center">
          Customers cannot place orders right now
        </p>
        <button className="px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white ">
          <FiMoon /> Closed
        </button>
      </div>
    </div>
  );
}
