"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const ImageClicked = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Lock scroll when modal is open
  useEffect(() => {
    if (isClicked) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isClicked]);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsClicked(false);
  };

  return (
    <>
      <Image
        src="/imgs/img.svg"
        width={100}
        height={100}
        alt="Click to enlarge"
        className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity w-auto h-auto"
        onClick={() => setIsClicked(true)}
        loading="lazy"
      />

      {isClicked && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsClicked(false)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="w-full h-full flex justify-center">
              <Image
                src="/imgs/img.svg"
                width={600}
                height={600}
                alt="Enlarged view"
                className="rounded-lg object-contain"
                priority
                onLoad={() => setIsLoaded(true)}
              />
            </div>

            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50 rounded-lg">
                <div className="text-white">Loading...</div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageClicked;
