import { StudyResourceCard, type StudyResource } from "@/components/study-resource-card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Study Resources - UpendoWaYesu',
  description: 'Explore devotional content, articles, and media to deepen your faith.',
};

// Placeholder data - in a real app, this would come from a CMS or database
const resources: StudyResource[] = [
  { 
    id: '1', 
    title: 'Understanding the Beatitudes', 
    category: 'Teachings', 
    type: 'Article', 
    summary: 'A deep dive into the Sermon on the Mount and its relevance today.', 
    image: 'https://placehold.co/600x400.png',
    imageHint: "mountain sermon",
    link: '#',
  },
  { 
    id: '2', 
    title: 'The Power of Persistent Prayer', 
    category: 'Practices', 
    type: 'Audio', 
    summary: 'Listen to an inspiring sermon on how to cultivate a powerful prayer life.', 
    image: 'https://placehold.co/600x400.png',
    imageHint: "hands praying",
    link: '#',
  },
  { 
    id: '3', 
    title: 'Parables of Jesus: The Prodigal Son', 
    category: 'Stories', 
    type: 'Video', 
    summary: 'A visual and insightful explanation of the parable of the Prodigal Son.', 
    image: 'https://placehold.co/600x400.png',
    imageHint: "father son embrace",
    link: '#',
  },
  { 
    id: '4', 
    title: 'Living a Life of Gratitude', 
    category: 'Lifestyle', 
    type: 'Article', 
    summary: 'Discover practical ways to cultivate gratitude in your daily life.', 
    image: 'https://placehold.co/600x400.png',
    imageHint: "journal gratitude",
  },
  { 
    id: '5', 
    title: 'Finding Strength in Adversity', 
    category: 'Encouragement', 
    type: 'Audio', 
    summary: 'A message of hope and resilience for times of trial.', 
    image: 'https://placehold.co/600x400.png',
    imageHint: "stormy sea sunrise",
  },
  { 
    id: '6', 
    title: 'The Book of Psalms: A Guided Study', 
    category: 'Bible Study', 
    type: 'Video', 
    summary: 'Explore the depth and beauty of the Psalms in this guided video series.', 
    image: 'https://placehold.co/600x400.png',
    imageHint: "open bible psalms",
    link: '#',
  },
];


// This would be a server component that could fetch/filter data.
// For now, it just renders the static list.
// A client component could be used for client-side filtering if needed.
export default function StudyResourcesPage() {
  return (
    <div className="container py-10 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-primary">Study Resources</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Deepen your understanding of God's Word with our collection of articles, audio, and videos.
        </p>
      </div>
      
      {/* Placeholder for search/filter controls */}
      {/* 
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search resources..." className="pl-10 w-full md:w-1/2 lg:w-1/3" />
      </div>
      */}

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((resource) => (
          <StudyResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
}
