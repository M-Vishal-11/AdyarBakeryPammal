import Link from "next/link";
import { ReactNode } from "react";

type GeneralIconProps = {
  children: ReactNode;
  address: string;
  IconName: string;
  IconDescription: string;
};

const GeneralIcon = ({
  children,
  address,
  IconName,
  IconDescription,
}: GeneralIconProps) => {
  return (
    <>
      <Link href={address}>
        <div className="bg-white hover:bg-[#FFF4F0] rounded-xl p-6 border border-[#FFD1C2] transition-all hover:shadow-md cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-[#FFEBE6]">{children}</div>
            <div>
              <h3 className="font-medium text-[#5F2D2D]">{IconName}</h3>
              <p className="text-sm text-gray-500 mt-1">{IconDescription}</p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default GeneralIcon;
