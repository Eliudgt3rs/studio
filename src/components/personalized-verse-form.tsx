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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, MessageSquareQuote, Loader2 } from "lucide-react";
import { useState } from "react";
import { getPersonalizedVerse, type PersonalizedVerseOutput } from "@/ai/flows/personalized-verse";
import { runFlow } from '@genkit-ai/next/client';

const formSchema = z.object({
  interests: z.string().min(5, { message: "Please describe your interests (at least 5 characters)." }),
  isKenyanContextRelevant: z.boolean().default(false).optional(),
});

export function PersonalizedVerseForm() {
  const { toast } = useToast();
  const [verseOutput, setVerseOutput] = useState<PersonalizedVerseOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interests: "",
      isKenyanContextRelevant: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setVerseOutput(null);
    try {
      const result = await runFlow(getPersonalizedVerse, values);
      setVerseOutput(result);
      toast({ title: "Verse Generated!", description: "Your personalized verse is ready." });
    } catch (error) {
      console.error("Error generating verse:", error);
      toast({ title: "Error", description: "Failed to generate verse. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="items-center text-center">
          <Sparkles className="h-12 w-12 text-primary mb-2" />
          <CardTitle className="text-2xl">Personalized Bible Verse</CardTitle>
          <CardDescription>
            Tell us your interests, and we'll find a verse just for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Interests</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., finding peace, dealing with anxiety, seeking guidance in career..."
                        className="resize-none"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe what's on your mind or what you're looking for.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isKenyanContextRelevant"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Make it relevant to Kenyan culture?
                      </FormLabel>
                      <FormDescription>
                        Check this if you'd like the explanation to consider Kenyan context.
                      </FormDescription>
                    </div>
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
                  "Get My Verse"
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
            <div className="h-4 bg-muted rounded w-full mt-4"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </CardContent>
        </Card>
      )}

      {verseOutput && !isLoading && (
        <Card className="w-full max-w-2xl mx-auto shadow-xl border-primary">
          <CardHeader>
            <CardTitle className="text-xl flex items-center text-primary">
              <MessageSquareQuote className="mr-2 h-6 w-6" /> Your Personalized Verse
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <blockquote className="text-lg font-semibold italic border-l-4 border-accent pl-4 py-2 bg-accent/10 rounded-r-md">
              "{verseOutput.verse}"
            </blockquote>
            <div>
              <h4 className="font-semibold text-md mb-1">Explanation:</h4>
              <p className="text-foreground/80 whitespace-pre-wrap">{verseOutput.explanation}</p>
            </div>
          </CardContent>
           <CardFooter>
            <Button variant="outline" onClick={() => {form.reset(); setVerseOutput(null);}}>Get Another Verse</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
