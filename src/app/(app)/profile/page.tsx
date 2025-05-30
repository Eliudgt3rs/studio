import { UserProfileForm } from "@/components/user-profile-form";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile - UpendoWaYesu',
  description: 'Manage your UpendoWaYesu profile and preferences.',
};

export default function ProfilePage() {
  return (
    <div className="container py-10">
      <UserProfileForm />
    </div>
  );
}
