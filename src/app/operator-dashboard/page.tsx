"use client";
import Pusher from "pusher-js";
import { useEffect } from "react";

export default function OperatorDashboard() {
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("orders");
    channel.bind("new-order", function (data: any) {
      alert(`🚨 New Order from ${data.name} - ₹${data.totalAmount}`);
    });

    return () => {
      pusher.unsubscribe("orders");
    };
  }, []);

  return (
    <div>
      <h1>Operator Page</h1>
      <button>Delete all delivered data</button>
      <div>
        <details>
          <summary>orders</summary>
          <div>
            <h1>ho</h1>
          </div>
        </details>
      </div>
      <div>
        <details>
          <summary>Preparing</summary>
          <div>
            <h1>ho</h1>
          </div>
        </details>
      </div>
      <div>
        <details>
          <summary>On the Way</summary>
          <div>
            <h1>ho</h1>
          </div>
        </details>
      </div>
      <div>
        <details>
          <summary>Delivered</summary>
          <div>
            <h1>ho</h1>
          </div>
        </details>
      </div>
    </div>
  );
}
