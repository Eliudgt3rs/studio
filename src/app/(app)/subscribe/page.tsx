import { SubscriptionForm } from "@/components/subscription-form";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Subscription - UpendoWaYesu',
  description: 'Subscribe to UpendoWaYesu for premium features.',
};

export default function SubscriptionPage() {
  return (
    <div className="container py-10">
      <SubscriptionForm />
    </div>
  );
}
