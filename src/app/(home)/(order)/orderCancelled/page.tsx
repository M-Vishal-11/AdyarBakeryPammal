import Link from "next/link";
import Head from "next/head";
import Bigwrong from "@/components/icons/svgs/Bigwrong";
import SadfaceSVG from "@/components/icons/svgs/SadfaceSVG";
import ContinueShoppingSVG from "@/components/icons/svgs/ContinueShoppingSVG";
import ViewOrderHistorySVG from "@/components/icons/svgs/ViewOrderHistorySVG";

const OrderCancelledPage = () => {
  return (
    <>
      <Head>
        <title>Order Cancelled | Continue Shopping</title>
        <meta
          name="description"
          content="Your order has been cancelled successfully"
        />
      </Head>

      <div className="min-h-screen bg-[#ffebe6] flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden text-center">
          {/* Header */}
          <div className="bg-gradient-to-r from-rose-400 to-pink-500 p-6">
            <Bigwrong />
            <h1 className="text-2xl font-bold text-white mt-4">
              Order Cancelled
            </h1>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="mb-6">
              <SadfaceSVG />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                We&apos;re Sorry
              </h2>
              <p className="text-gray-600">
                Your order has been successfully cancelled. We apologize for any
                inconvenience.
              </p>
            </div>

            <div className="space-y-4">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <ContinueShoppingSVG />
                Continue Shopping
              </Link>

              <Link
                href="/account/orders"
                className="inline-flex items-center justify-center w-full px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ViewOrderHistorySVG />
                View Order History
              </Link>
            </div>

            <div className="mt-8 pt-5 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-2">
                Need help with your cancellation?
              </p>
              <Link
                href="/account/contactus"
                className="text-sm text-rose-500 hover:text-rose-700 font-medium"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderCancelledPage;
