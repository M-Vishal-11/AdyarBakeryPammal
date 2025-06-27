import { FiMoon, FiShoppingBag, FiSun } from "react-icons/fi";

const ShopStatus = ({
  isShopOpen,
  setIsShopOpen,
}: {
  isShopOpen: boolean;
  setIsShopOpen: any;
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col items-center">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
            isShopOpen ? "bg-green-100" : "bg-red-100"
          }`}
        >
          {isShopOpen ? (
            <FiShoppingBag className="text-green-600 text-2xl" />
          ) : (
            <FiShoppingBag className="text-red-600 text-2xl" />
          )}
        </div>
        <h2 className="text-xl font-semibold mb-2">
          {isShopOpen ? "Shop is currently OPEN" : "Shop is currently CLOSED"}
        </h2>
        <p className="text-gray-600 mb-4 text-center">
          {isShopOpen
            ? "Customers can browse and order Food"
            : "Customers cannot place orders right now"}
        </p>
        <button
          onClick={() => setIsShopOpen(!isShopOpen)}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
            isShopOpen
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-red-500 hover:bg-red-600 text-white"
          }`}
        >
          {isShopOpen ? (
            <>
              <FiSun /> Open
            </>
          ) : (
            <>
              <FiMoon /> Closed
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ShopStatus;
