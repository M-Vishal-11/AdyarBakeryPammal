"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import XSVG from "../../components/icons/svgs/XSVG";

const ImageClicked = ({ imageURL }: { imageURL: string }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

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
        src={imageURL}
        width={96}
        height={96}
        alt="Click to enlarge"
        className="rounded-lg cursor-pointer hover:opacity-90 transition-opacity w-full h-full object-cover"
        onClick={() => setIsClicked(true)}
        loading="lazy"
      />

      {isClicked && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsClicked(false)}
        >
          <div className="relative w-full max-w-[95vw] max-h-[95vh]">
            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors
                xs:-top-8 xs:right-1"
            >
              <XSVG />
            </button>

            <div className="w-full h-full flex justify-center">
              <Image
                src={imageURL}
                width={800}
                height={800}
                alt="Enlarged view"
                className="rounded-lg object-contain max-w-[90vw] max-h-[80vh]"
                loading="lazy"
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
