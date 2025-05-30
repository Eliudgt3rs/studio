import { DailyGuidanceForm } from "@/components/daily-guidance-form";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daily Guidance - UpendoWaYesu',
  description: 'Get daily Biblical guidance and reflections.',
};

export default function DailyGuidancePage() {
  return (
    <div className="container py-10">
      <DailyGuidanceForm />
    </div>
  );
}
