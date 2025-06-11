export default function page() {
  return (
    <div className="min-h-screen flex flex-col">
      <h1 className="font-medium text-2xl mt-[5vh] ml-3">Address:</h1>
      <hr className="border-t border-[#D9D9D9]" />
      <form className="mt-[3vh] ml-4 flex gap-[4vh] flex-col lg:grid lg:grid-cols-2">
        <div>
          <label>Name: </label>
          <br />
          <input
            type="text"
            placeholder="Enter your Name"
            className="bg-white text-gray-800 border border-gray-300 rounded-lg px-2 py-1 ml-3 shadow-sm 
             focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 
             transition duration-200"
          />
          <br />
        </div>

        <div>
          <label>Phone Number: </label>
          <br />
          <input
            type="text"
            placeholder="Enter your Phone Number"
            className="bg-white text-gray-800 border border-gray-300 rounded-lg px-2 py-1 ml-3 shadow-sm 
             focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 
             transition duration-200"
          />
          <br />
        </div>

        <div>
          <label>Area: </label>
          <br />
          <input
            type="text"
            placeholder="Area"
            className="bg-white text-gray-800 border border-gray-300 rounded-lg px-2 py-1 ml-3 shadow-sm 
             focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 
             transition duration-200"
          />
          <br />
        </div>

        <div>
          <label>Street: </label>
          <br />
          <input
            type="text"
            placeholder="Street"
            className="bg-white text-gray-800 border border-gray-300 rounded-lg px-2 py-1 ml-3 shadow-sm 
             focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 
             transition duration-200"
          />
          <br />
        </div>

        <div>
          <label>Flat Name/House No: </label>
          <br />
          <input
            type="text"
            placeholder="Flat Name/House No"
            className="bg-white text-gray-800 border border-gray-300 rounded-lg px-2 py-1 ml-3 shadow-sm 
             focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 
             transition duration-200"
          />
          <br />
        </div>

        <div>
          <label>Google Map Link: </label>
          <br />
          <input
            type="text"
            placeholder="Please paste your google maps link"
            className="bg-white text-gray-800 border border-gray-300 rounded-lg px-2 py-1 ml-3 shadow-sm 
             focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 
             transition duration-200 w-80"
          />
          <br />
        </div>

        <div>
          <label>Delivery Note: </label>
          <br />
          <textarea
            placeholder="Any landmark/ any Information"
            className="bg-white text-gray-800 border border-gray-300 rounded-lg px-2 py-1 ml-3 shadow-sm 
             focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 
             transition duration-200 md:w-xl min-h-30"
            cols={25}
          ></textarea>
          <br />
        </div>
      </form>
      <div className="flex flex-row justify-between mt-[4vh]">
        <button className="bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-white text-lg rounded-xl mb-5 px-4 py-2 mt-3 md:mr-2">
          <span className="transform rotate-180 inline-block">➤</span> Back
        </button>
        <button className="bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-white text-lg rounded-xl mb-5 px-4 py-2 mt-3 md:mr-2">
          Next ➤
        </button>
      </div>
    </div>
  );
}
