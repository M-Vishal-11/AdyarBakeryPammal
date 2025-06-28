import InvoiceSVG from "../icons/svgs/InvoiceSVG";

interface InvoiceSummaryProps {
  cartTotal: number;
  discount: number;
  delivery: number;
  total: number;
}

const InvoiceSummary = ({
  cartTotal,
  discount,
  delivery,
  total,
}: InvoiceSummaryProps) => {
  return (
    <div>
      <div className="bg-white rounded-xl border border-[#F0F0F0] shadow-sm px-6 py-5 hover:shadow-md transition-shadow">
        <h1 className="text-xl font-bold text-[#333] mb-4 flex items-center gap-2">
          <InvoiceSVG />
          Order Summary
        </h1>
        <ol className="space-y-3 text-base font-medium">
          <li className="flex justify-between">
            <span className="text-gray-600">Cart Total:</span>
            <span>₹{cartTotal}</span>
          </li>
          <li className="flex justify-between">
            {delivery == 0 ? (
              <>
                <span className="text-gray-600">Delivery:</span>
                <span className="text-green-600">FREE</span>
              </>
            ) : (
              <>
                <span className="text-gray-600">Delivery:</span>
                <span className="text-gray-600">₹{delivery}</span>
              </>
            )}
          </li>

          {discount > 0 && (
            <>
              <li className="flex justify-between">
                <span className="text-gray-600">Discount:</span>
                <span className="text-green-600">-₹{discount}</span>
              </li>
              <li className="flex justify-between text-green-600 pt-2">
                <span className="font-semibold">Today&apos;s Savings:</span>
                <span className="font-semibold">₹{discount}</span>
              </li>
            </>
          )}

          <li className="flex justify-between font-bold border-t pt-3 mt-3 text-lg">
            <span>Total Amount:</span>
            <span className="text-[#FF6B4A]">₹{total}</span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default InvoiceSummary;
