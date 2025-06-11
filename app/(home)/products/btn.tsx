"use client";

interface ExpandCollapseBtnProps {
  setExpand: (expand: boolean) => void;
}

const ExpandCollapseBtn = ({ setExpand }: ExpandCollapseBtnProps) => {
  return (
    <div className="flex justify-end-safe gap-2">
      <button
        onClick={() => setExpand(false)}
        className="bg-[#ff1a1a] hover:bg-[#b30000] active:bg-[#b30000] text-white rounded-lg px-1 shadow-md active:shadow-xl"
      >
        Collapse
      </button>
      <button
        onClick={() => setExpand(true)}
        className="bg-[#ff1a1a] hover:bg-[#b30000] active:bg-[#b30000] text-white rounded-lg px-1 shadow-md active:shadow-xl"
      >
        Expand
      </button>
    </div>
  );
};

export default ExpandCollapseBtn;
