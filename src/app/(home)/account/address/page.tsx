import Prebtn from "./functions/prebtn";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#ffebe6] flex flex-col p-6">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="font-medium text-3xl mb-4 text-[#333]">
          Delivery Address
        </h1>
        <hr className="border-t border-[#ffb8a1] mb-6" />

        <form className="bg-white rounded-xl p-6 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[#555] font-medium">Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full bg-white text-gray-800 border border-[#ffb8a1] rounded-lg px-4 py-2 
                focus:outline-none focus:border-[#ff8a65] focus:ring-2 focus:ring-[#ffccbc] 
                transition duration-200 placeholder-[#aaa]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[#555] font-medium">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="w-full bg-white text-gray-800 border border-[#ffb8a1] rounded-lg px-4 py-2 
                focus:outline-none focus:border-[#ff8a65] focus:ring-2 focus:ring-[#ffccbc] 
                transition duration-200 placeholder-[#aaa]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[#555] font-medium">Area</label>
              <input
                type="text"
                placeholder="Your neighborhood/area"
                className="w-full bg-white text-gray-800 border border-[#ffb8a1] rounded-lg px-4 py-2 
                focus:outline-none focus:border-[#ff8a65] focus:ring-2 focus:ring-[#ffccbc] 
                transition duration-200 placeholder-[#aaa]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[#555] font-medium">Street</label>
              <input
                type="text"
                placeholder="Street name"
                className="w-full bg-white text-gray-800 border border-[#ffb8a1] rounded-lg px-4 py-2 
                focus:outline-none focus:border-[#ff8a65] focus:ring-2 focus:ring-[#ffccbc] 
                transition duration-200 placeholder-[#aaa]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[#555] font-medium">Flat/House No</label>
              <input
                type="text"
                placeholder="Flat name or house number"
                className="w-full bg-white text-gray-800 border border-[#ffb8a1] rounded-lg px-4 py-2 
                focus:outline-none focus:border-[#ff8a65] focus:ring-2 focus:ring-[#ffccbc] 
                transition duration-200 placeholder-[#aaa]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[#555] font-medium">
                Google Map Link (*recomended)
              </label>
              <input
                type="url"
                placeholder="Paste your Google Maps link"
                className="w-full bg-white text-gray-800 border border-[#ffb8a1] rounded-lg px-4 py-2 
                focus:outline-none focus:border-[#ff8a65] focus:ring-2 focus:ring-[#ffccbc] 
                transition duration-200 placeholder-[#aaa]"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-[#555] font-medium">Delivery Notes</label>
              <textarea
                placeholder="Any landmarks or special instructions"
                className="w-full bg-white text-gray-800 border border-[#ffb8a1] rounded-lg px-4 py-2 
                focus:outline-none focus:border-[#ff8a65] focus:ring-2 focus:ring-[#ffccbc] 
                transition duration-200 placeholder-[#aaa] min-h-[120px]"
                rows={4}
              ></textarea>
            </div>
          </div>

          <div className="mt-3 md:mr-2 mb-5">
            <Prebtn />
          </div>
        </form>
      </div>
    </div>
  );
}
