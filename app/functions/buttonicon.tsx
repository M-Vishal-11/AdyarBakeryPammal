"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ButtonIconProps {
  url: string;
  alt: string;
  address: string;
}

const ButtonIcon = ({ url, alt, address }: ButtonIconProps) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(address);
      }}
      className="cursor-pointer active:scale-90 transition-transform duration-200"
    >
      <Image
        src={url}
        height={54}
        width={54}
        alt={alt}
        className="w-[7vh] sm:w-[7.5vh]"
      />
    </div>
  );
};

export default ButtonIcon;
