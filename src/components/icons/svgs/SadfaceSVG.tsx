import { memo } from "react";

const SadfaceSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-14 w-14 mx-auto text-rose-500 mb-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

export default memo(SadfaceSVG);
