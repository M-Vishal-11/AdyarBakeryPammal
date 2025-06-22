"use client";

interface ExpandCollapseBtnProps {
  setExpand: (expand: boolean) => void;
}

const ExpandCollapseBtn = ({ setExpand }: ExpandCollapseBtnProps) => {
  return (
    <div className="flex justify-center gap-4 mb-4">
      <button
        onClick={() => setExpand(false)}
        className="flex items-center gap-1 px-4 py-2 rounded-full bg-[#ff1a1a] text-white hover:bg-[#b30000] 
        transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
      >
        <span>Collapse</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <button
        onClick={() => setExpand(true)}
        className="flex items-center gap-1 px-4 py-2 rounded-full bg-[#ff1a1a] text-white hover:bg-[#b30000] 
        transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
      >
        <span>Expand</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default ExpandCollapseBtn;
