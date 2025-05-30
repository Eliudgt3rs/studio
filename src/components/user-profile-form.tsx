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
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth, UserProfile } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

const availableTopics = [
  { id: "faith", label: "Faith" },
  { id: "love", label: "Love" },
  { id: "strength", label: "Strength" },
  { id: "guidance", label: "Guidance" },
  { id: "peace", label: "Peace" },
  { id: "hope", label: "Hope" },
  { id: "forgiveness", label: "Forgiveness" },
];

const profileFormSchema = z.object({
  displayName: z.string().min(2, "Display name must be at least 2 characters.").optional().or(z.literal('')),
  email: z.string().email(),
  preferences: z.object({
    topics: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one topic.",
    }).optional(), // Make topics optional as a whole array
  }).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function UserProfileForm() {
  const { user, updateUserProfile, loading } = useAuth();
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      displayName: user?.displayName || "",
      email: user?.email || "",
      preferences: {
        topics: user?.preferences?.topics || [],
      },
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      form.reset({
        displayName: user.displayName || "",
        email: user.email || "",
        preferences: {
          topics: user.preferences?.topics || [],
        },
      });
    }
  }, [user, form]);

  async function onSubmit(data: ProfileFormValues) {
    if (!user) return;

    const profileUpdate: Partial<UserProfile> = {
      displayName: data.displayName || user.displayName, // Keep existing if empty
      preferences: {
        topics: data.preferences?.topics || user.preferences?.topics || [],
      },
    };

    try {
      await updateUserProfile(profileUpdate);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Could not update your profile. Please try again.",
        variant: "destructive",
      });
    }
  }
  
  if (loading || !user) {
    return <p>Loading profile...</p>;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>Manage your account settings and content preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your display name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferences.topics"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Content Preferences</FormLabel>
                    <FormDescription>
                      Select topics you are interested in for personalized content.
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {availableTopics.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="preferences.topics"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), item.id])
                                    : field.onChange(
                                        (field.value || []).filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
             <div className="pt-4">
              <h3 className="text-lg font-medium">Subscription Status</h3>
              <p className="text-sm text-muted-foreground">
                Current status: <span className="font-semibold text-primary">{user.subscriptionStatus === "subscribed" ? "Subscribed" : "Free Tier"}</span>
              </p>
              {user.subscriptionStatus === "subscribed" && user.subscriptionEndDate && (
                <p className="text-sm text-muted-foreground">
                  Renews on: {new Date(user.subscriptionEndDate).toLocaleDateString()}
                </p>
              )}
            </div>
            <Button type="submit" disabled={form.formState.isSubmitting || !form.formState.isDirty}>
              {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
