import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

export default function OrderDetails() {
  // Sample order data
  const order = {
    id: "#123456",
    date: "May 15, 2023",
    status: "Delivered",
    items: [
      { name: "Chocolate Croissant", price: 50, quantity: 2 },
      { name: "Red Velvet Cake", price: 50, quantity: 1 },
      { name: "Butter Cookies", price: 50, quantity: 3 },
      { name: "Fruit Tart", price: 50, quantity: 1 },
    ],
    total: 300,
  };

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Back button and page title */}
        <div className="mb-6 flex items-center">
          <Link
            href="/account"
            className="flex items-center text-[#FF6B4A] hover:text-[#e55a3a] mr-4"
            prefetch={false} // Disable prefetching if not needed
          >
            <FiArrowLeft className="mr-1" />
            Back
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
        </div>

        {/* Order card */}
        <article className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#FFD1C2]">
          <div className="p-5 sm:p-6">
            {/* Order header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Order {order.id}
                </h2>
                <p className="text-sm text-gray-500 mt-1">{order.date}</p>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {order.status}
              </span>
            </div>

            {/* Order items */}
            <div className="space-y-3 mb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">ITEMS</h3>
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-[#FF6B4A] mr-3"></span>
                    <p className="text-gray-700">
                      {item.name} × {item.quantity}
                    </p>
                  </div>
                  <p className="text-gray-800 font-medium">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* Order footer */}
            <div className="flex justify-between items-center pt-4 border-t border-[#FFE5DC]">
              <p className="text-gray-600 font-medium">Total Amount</p>
              <p className="text-lg font-bold text-[#FF6B4A]">₹{order.total}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
