"use client";

import { FiMinus, FiPlus } from "react-icons/fi";

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
        <FiMinus className="h-4 w-4 text-current" />
      </button>
      <button
        onClick={() => setExpand(true)}
        className="flex items-center gap-1 px-4 py-2 rounded-full bg-[#ff1a1a] text-white hover:bg-[#b30000] 
        transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
      >
        <span>Expand</span>
        <FiPlus className="h-4 w-4 text-current" />
      </button>
    </div>
  );
};

export default ExpandCollapseBtn;
