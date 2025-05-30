"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpenText, MessageCircleHeart, Loader2 } from "lucide-react";
import { useState } from "react";
import { generateDailyGuidance, type DailyGuidanceOutput } from "@/ai/flows/daily-guidance";
import { runFlow } from '@genkit-ai/next/client';


const formSchema = z.object({
  dailyVerse: z.string().min(5, { message: "Please enter a Bible verse (e.g., John 3:16)." }),
  userInput: z.string().min(5, { message: "Please share your thoughts or questions (at least 5 characters)." }),
});

export function DailyGuidanceForm() {
  const { toast } = useToast();
  const [guidanceOutput, setGuidanceOutput] = useState<DailyGuidanceOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dailyVerse: "",
      userInput: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGuidanceOutput(null);
    try {
      const result = await runFlow(generateDailyGuidance, values);
      setGuidanceOutput(result);
      toast({ title: "Guidance Generated!", description: "Your daily guidance is ready." });
    } catch (error) {
      console.error("Error generating guidance:", error);
      toast({ title: "Error", description: "Failed to generate guidance. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="items-center text-center">
          <BookOpenText className="h-12 w-12 text-primary mb-2" />
          <CardTitle className="text-2xl">Daily Biblical Guidance</CardTitle>
          <CardDescription>
            Receive reflections based on a verse and your thoughts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="dailyVerse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Today's Verse</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Philippians 4:13" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the Bible verse you'd like to reflect on.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userInput"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Thoughts or Questions</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., How can I apply this to my current challenges? What does this mean for my family?"
                        className="resize-none"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Share what's on your heart regarding this verse.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Get My Guidance"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
         <Card className="w-full max-w-2xl mx-auto animate-pulse">
          <CardHeader>
            <div className="h-6 bg-muted rounded w-3/4 mx-auto"></div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
            <div className="h-20 bg-muted rounded w-full mt-4"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </CardContent>
        </Card>
      )}

      {guidanceOutput && !isLoading && (
        <Card className="w-full max-w-2xl mx-auto shadow-xl border-primary">
          <CardHeader>
            <CardTitle className="text-xl flex items-center text-primary">
              <MessageCircleHeart className="mr-2 h-6 w-6" /> Your Daily Guidance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/80 whitespace-pre-wrap">{guidanceOutput.guidance}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => {form.reset(); setGuidanceOutput(null);}}>Reflect on Another Verse</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
