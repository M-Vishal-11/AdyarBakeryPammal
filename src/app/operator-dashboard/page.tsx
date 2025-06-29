"use client";
import { useEffect, useState, useCallback } from "react";
import Pusher from "pusher-js";
import axios from "axios";

type OrderItem = {
  _id: string;
  productName: string;
  price: number;
  discountedPrice: number | null;
  qnty: number;
};

type Order = {
  _id: string;
  userId: string;
  date: string;
  orderId: string;
  orders: string;
  status: "waiting" | "preparing" | "on_the_way" | "delivered" | "cancelled";
  totalAmount: number;
  payment: string;
  elapsedSeconds?: number;
};

export default function OperatorDashboard() {
  const [activeTab, setActiveTab] = useState<
    "Waiting" | "Preparing" | "On the Way" | "Delivered" | "Cancelled"
  >("Waiting");
  const [orders, setOrders] = useState<Order[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [audioAllowed, setAudioAllowed] = useState(false);

  // Format the elapsed time for display
  const formatDuration = useCallback((order: Order) => {
    const seconds = order.elapsedSeconds || 0;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) return `${hours}h ${minutes}m ${secs}s`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  }, []);

  // Fetch initial orders
  useEffect(() => {
    const getdata = async () => {
      const res = await axios.get("/api/getOrders");
      setOrders(res.data.orders);
    };
    getdata();
  }, []);

  // Setup Pusher for real-time updates
  useEffect(() => {
    setIsClient(true);
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("orders");
    channel.bind("new-order", (data: Order) => {
      const newOrder = {
        ...data,
        status: "waiting",
        elapsedSeconds: 0,
      };
      setOrders((prev: any) => [newOrder, ...prev]);

      if (audioAllowed) {
        try {
          new Audio("/sounds/notification.mp3")
            .play()
            .catch((e) => console.log("Audio play failed:", e));
        } catch (e) {
          console.log("Audio error:", e);
        }
      }

      if (Notification.permission === "granted") {
        const items = JSON.parse(data.orders) as OrderItem[];
        const itemCount = items.reduce((sum, item) => sum + item.qnty, 0);
        new Notification("New Order", {
          body: `New order with ${itemCount} items - ₹${data.totalAmount}`,
        });
      }
    });

    return () => pusher.unsubscribe("orders");
  }, [audioAllowed]);

  // Request notification permission
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      Notification.permission !== "granted"
    ) {
      Notification.requestPermission();
    }
  }, []);

  // Timer effect - only runs for waiting orders
  useEffect(() => {
    if (!orders.some((order) => order.status === "waiting")) return;

    const interval = setInterval(() => {
      setOrders((prev) =>
        prev.map((order) => {
          if (order.status === "waiting") {
            const elapsed = Math.floor(
              (new Date().getTime() - new Date(order.date).getTime()) / 1000
            );
            return { ...order, elapsedSeconds: elapsed };
          }
          return order;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [orders]);

  // Update order status and freeze timer when leaving waiting state
  const updateOrderStatus = async (
    orderId: string,
    newStatus: Order["status"]
  ) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.orderId === orderId) {
          // Freeze timer when status changes from waiting
          if (order.status === "waiting" && newStatus !== "waiting") {
            const elapsed = Math.floor(
              (new Date().getTime() - new Date(order.date).getTime()) / 1000
            );
            return { ...order, status: newStatus, elapsedSeconds: elapsed };
          }
          return { ...order, status: newStatus };
        }
        return order;
      })
    );

    await axios.post("/api/changeOrderStatus", {
      orderId,
      status: newStatus,
    });
  };

  // Action handlers
  const handleAccept = (orderId: string) =>
    updateOrderStatus(orderId, "preparing");
  const handleReject = (orderId: string) =>
    updateOrderStatus(orderId, "cancelled");
  const handlePrepareComplete = (orderId: string) =>
    updateOrderStatus(orderId, "on_the_way");
  const handleDeliveryComplete = (orderId: string) =>
    updateOrderStatus(orderId, "delivered");

  // Parse order items from string
  const parseOrderItems = (orderString: string): OrderItem[] => {
    try {
      return JSON.parse(orderString);
    } catch {
      return [];
    }
  };

  // Get display price (uses discounted price if available)
  const getDisplayPrice = (item: OrderItem) =>
    item.discountedPrice ?? item.price;

  const enableAudio = () => setAudioAllowed(true);

  const categories = [
    "Waiting",
    "Preparing",
    "On the Way",
    "Delivered",
    "Cancelled",
  ] as const;

  const statusMap = {
    Waiting: "waiting",
    Preparing: "preparing",
    "On the Way": "on_the_way",
    Delivered: "delivered",
    Cancelled: "cancelled",
  };

  const filteredOrders = orders.filter(
    (order) => order.status === statusMap[activeTab]
  );

  const orderCounts = {
    Waiting: orders.filter((order) => order.status === "waiting").length,
    Preparing: orders.filter((order) => order.status === "preparing").length,
    "On the Way": orders.filter((order) => order.status === "on_the_way")
      .length,
    Delivered: orders.filter((order) => order.status === "delivered").length,
    Cancelled: orders.filter((order) => order.status === "cancelled").length,
  };

  // Format date and time
  const formatDate = (dateString: string) => {
    if (!isClient) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatTime = (dateString: string) => {
    if (!isClient) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="min-h-screen bg-[#ffebe6] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#FF6B4A] mb-2">
            Operator Dashboard
          </h1>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Manage incoming orders in real-time</p>
            <div className="flex gap-2">
              {!audioAllowed && (
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors shadow-md"
                  onClick={enableAudio}
                >
                  Enable Sound Notifications
                </button>
              )}
              <button
                className="bg-[#FF6B4A] hover:bg-[#e55a3a] text-white px-4 py-2 rounded-lg transition-colors shadow-md"
                onClick={async () => {
                  setOrders((prev) =>
                    prev.filter((order) => order.status !== "delivered")
                  );
                  await axios.delete("/api/deleteDeliveredData");
                }}
              >
                Delete all delivered data
              </button>
            </div>
          </div>
        </header>

        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {categories.map((category) => (
              <button
                key={`tab-${category}`}
                onClick={() => setActiveTab(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === category
                    ? "bg-[#FF6B4A] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category} ({orderCounts[category]})
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {categories.map((category) => (
            <div
              key={`summary-${category}`}
              className="bg-white p-4 rounded-xl shadow-sm border border-[#FFD1C2]"
            >
              <p className="text-gray-500 text-sm">{category}</p>
              <p className="text-2xl font-bold text-[#FF6B4A]">
                {orderCounts[category]}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => {
              const orderItems = parseOrderItems(order.orders);
              const itemCount = orderItems.reduce(
                (sum, item) => sum + item.qnty,
                0
              );

              return (
                <div
                  key={`order-${order.orderId}`}
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#FFD1C2] transition-transform hover:scale-[1.01]"
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-3">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800 truncate w-2/3">
                          Order #{order.orderId}
                        </h2>
                        {isClient && (
                          <>
                            <p className="text-sm text-gray-500 mt-1">
                              {formatDate(order.date)} {formatTime(order.date)}
                            </p>
                            <div className="flex items-center mt-1">
                              <span className="text-sm text-gray-500">
                                Timer:
                              </span>
                              <span className="ml-2 text-sm font-medium text-[#FF6B4A]">
                                {formatDuration(order)}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === "waiting"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "preparing"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "on_the_way"
                            ? "bg-purple-100 text-purple-800"
                            : order.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {activeTab}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">
                        ITEMS ({itemCount})
                      </h3>
                      {orderItems.map((item, index) => (
                        <div
                          key={`${order.orderId}-${item._id}-${index}`}
                          className="flex justify-between items-center"
                        >
                          <div className="flex items-center">
                            <span className="w-2 h-2 rounded-full bg-[#FF6B4A] mr-3"></span>
                            <p className="text-gray-700">
                              {item.productName} × {item.qnty}
                            </p>
                          </div>
                          <p className="text-gray-800 font-medium">
                            ₹{getDisplayPrice(item)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-[#FFE5DC]">
                      <p className="text-gray-600 font-medium">Total Amount</p>
                      <p className="text-lg font-bold text-[#FF6B4A]">
                        ₹{order.totalAmount}
                      </p>
                    </div>

                    <div className="mt-4 flex space-x-3">
                      {order.status === "waiting" && (
                        <>
                          <button
                            className="flex-1 bg-[#FF6B4A] hover:bg-[#e55a3a] text-white px-4 py-2 rounded-lg transition-colors"
                            onClick={() => handleAccept(order.orderId)}
                          >
                            Accept
                          </button>
                          <button
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
                            onClick={() => handleReject(order.orderId)}
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {order.status === "preparing" && (
                        <button
                          className="flex-1 bg-[#FF6B4A] hover:bg-[#e55a3a] text-white px-4 py-2 rounded-lg transition-colors"
                          onClick={() => handlePrepareComplete(order.orderId)}
                        >
                          Mark as On the Way
                        </button>
                      )}
                      {order.status === "on_the_way" && (
                        <button
                          className="flex-1 bg-[#FF6B4A] hover:bg-[#e55a3a] text-white px-4 py-2 rounded-lg transition-colors"
                          onClick={() => handleDeliveryComplete(order.orderId)}
                        >
                          Mark as Delivered
                        </button>
                      )}
                      {(order.status === "delivered" ||
                        order.status === "cancelled") && (
                        <button
                          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
                          onClick={() =>
                            setOrders((prev) =>
                              prev.filter((o) => o.orderId !== order.orderId)
                            )
                          }
                        >
                          Remove Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-xl p-8 text-center border border-[#FFD1C2]">
              <p className="text-gray-500">
                No {activeTab.toLowerCase()} orders found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
