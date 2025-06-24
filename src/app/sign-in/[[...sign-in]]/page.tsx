import { SignIn } from "@clerk/nextjs";

export default function signin() {
  return (
    <div className="flex items-center jsutify-center min-h-screen mx-auto">
      <SignIn />
    </div>
  );
}
