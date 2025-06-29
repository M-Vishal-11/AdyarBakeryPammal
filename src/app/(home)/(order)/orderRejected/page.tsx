import Link from "next/link";
import Head from "next/head";
import ContactUsFromRejectedOrderSVG from "@/components/icons/svgs/ContactUsFromRejectedOrderSVG";
import DangerSVG from "@/components/icons/svgs/DangerSVG";
import Bigwrong from "@/components/icons/svgs/Bigwrong";

const OrderRejectedPage = () => {
  return (
    <>
      <Head>
        <title>Order Rejected | Support</title>
        <meta
          name="description"
          content="We're sorry your order was rejected. Contact us for assistance."
        />
      </Head>

      <div className="min-h-screen bg-[#ffebe6] flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden text-center">
          {/* Header */}
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6">
            <Bigwrong />
            <h1 className="text-2xl font-bold text-white mt-4">
              Order Rejected
            </h1>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-6">
              <DangerSVG />
              <p className="text-gray-600 mb-2">
                We&apos;re sorry, your order couldn&apos;t be processed.
              </p>
              <p className="text-gray-600">
                This might be due to product availability.
              </p>
            </div>

            <div className="mb-6 bg-rose-50 border border-rose-100 rounded-lg p-4">
              <h3 className="font-medium text-rose-700 mb-2">Need help?</h3>

              <Link
                href="/account/contactus"
                className="inline-flex items-center justify-center px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors duration-300"
              >
                <ContactUsFromRejectedOrderSVG />
                Contact Us
              </Link>
            </div>

            <Link
              href="/"
              className="inline-block text-sm text-gray-500 hover:text-gray-700 underline mt-4"
            >
              Return to homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderRejectedPage;
