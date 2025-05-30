import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export interface StudyResource {
  id: string;
  title: string;
  category: string;
  type: "Article" | "Audio" | "Video";
  summary: string;
  image: string;
  imageHint: string;
  link?: string; // Optional link to full resource
}

interface StudyResourceCardProps {
  resource: StudyResource;
}

export function StudyResourceCard({ resource }: StudyResourceCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={resource.image}
            alt={resource.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={resource.imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6 space-y-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{resource.title}</CardTitle>
          <Badge variant={resource.type === 'Article' ? 'secondary' : resource.type === 'Audio' ? 'outline' : 'default'}>
            {resource.type}
          </Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground">{resource.summary}</CardDescription>
        <p className="text-xs text-primary font-medium">Category: {resource.category}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        {resource.link ? (
          <Button asChild variant="outline" className="w-full">
            <a href={resource.link} target="_blank" rel="noopener noreferrer">
              Read More <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        ) : (
           <Button variant="outline" className="w-full" disabled>
              Coming Soon
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}
