import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
  <div className="flex items-center justify-center mx-auto min-h-screen mb-5">
    <UserProfile />
  </div>
);

export default UserProfilePage;
