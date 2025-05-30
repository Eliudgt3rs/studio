import { PersonalizedVerseForm } from "@/components/personalized-verse-form";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personalized Verses - UpendoWaYesu',
  description: 'Get AI-powered daily Bible verse suggestions tailored to your interests.',
};

export default function PersonalizedVersesPage() {
  return (
    <div className="container py-10">
      <PersonalizedVerseForm />
    </div>
  );
}
