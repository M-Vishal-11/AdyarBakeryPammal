"use client";

interface ExpandCollapseBtnProps {
  setExpand: (expand: boolean) => void;
}

const ExpandCollapseBtn = ({ setExpand }: ExpandCollapseBtnProps) => {
  return (
    <div className="flex justify-end-safe gap-2 mb-3">
      <button
        onClick={() => setExpand(false)}
        className="bg-[#ff1a1a] hover:bg-[#b30000] active:bg-[#b30000] text-white rounded-lg px-1 shadow-md active:shadow-xl cursor-pointer active:scale-90 transition-transform duration-200"
      >
        Collapse
      </button>
      <button
        onClick={() => setExpand(true)}
        className="bg-[#ff1a1a] hover:bg-[#b30000] active:bg-[#b30000] text-white rounded-lg px-1 shadow-md active:shadow-xl cursor-pointer active:scale-110 transition-transform duration-200"
      >
        Expand
      </button>
    </div>
  );
};

export default ExpandCollapseBtn;
