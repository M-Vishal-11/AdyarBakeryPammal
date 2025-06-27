import { memo } from "react";

const DropdownSVG = () => {
  return (
    <svg
      className="w-5 h-5 text-gray-600 transition-transform duration-300 group-open:rotate-180"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
};

export default memo(DropdownSVG);
