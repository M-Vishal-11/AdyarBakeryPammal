import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-topcolor w-full py-2">
        <Image
          src="/imgs/Logo.png"
          height={90}
          width={100}
          alt="Logo"
          className="px-2"
        />
      </header>
      <header className="flex justify-center relative items-center my-5">
        <input
          type="text"
          placeholder="Search"
          className="bg-topcolor text-background p-1 rounded-xl w-3/4 md:w-2/5 pr-10 pl-2 focus:ring-0 focus:outline-4 focus: outline-offset-2 focus:outline-[#e60000]"
        />
        <Image
          src="icons/search.svg"
          width={34}
          height={34}
          alt="Search"
          className="absolute right-1/8 pr-2 md:right-6/20"
        />
      </header>
      {children}
      <p className="mt-2"></p>
      <footer className="bg-topcolor w-full text-center mt-auto">
        <h1 className="text-background">We Serve our best</h1>
        <p className="text-background text-xs">
          copyrights {new Date().getFullYear()} &copy;
        </p>
      </footer>
    </div>
  );
}
