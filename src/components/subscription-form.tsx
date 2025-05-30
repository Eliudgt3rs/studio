"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth, UserProfile } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, CheckCircle } from "lucide-react";
import { useState } from "react";

export function SubscriptionForm() {
  const { user, updateUserProfile } = useAuth();
  const { toast } = useToast();
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscription = async () => {
    if (!user) return;
    setIsSubscribing(true);

    // Simulate Mpesa payment
    await new Promise(resolve => setTimeout(resolve, 2000));

    const subscriptionEndDate = new Date();
    subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);

    const profileUpdate: Partial<UserProfile> = {
      subscriptionStatus: "subscribed",
      subscriptionEndDate: subscriptionEndDate.toISOString(),
    };

    try {
      await updateUserProfile(profileUpdate);
      toast({
        title: "Subscription Successful!",
        description: "Thank you for subscribing to UpendoWaYesu.",
      });
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "Could not update your subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  if (!user) {
    return <p>Loading user information...</p>;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="items-center text-center">
        <CreditCard className="h-12 w-12 text-primary mb-2" />
        <CardTitle className="text-2xl">UpendoWaYesu Subscription</CardTitle>
        <CardDescription>
          Support our ministry and unlock premium features with a monthly subscription.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        {user.subscriptionStatus === "subscribed" ? (
          <div className="flex flex-col items-center text-green-600">
            <CheckCircle className="h-16 w-16 mb-2" />
            <p className="text-xl font-semibold">You are currently subscribed!</p>
            {user.subscriptionEndDate && (
              <p className="text-sm text-muted-foreground">
                Your subscription renews on {new Date(user.subscriptionEndDate).toLocaleDateString()}.
              </p>
            )}
          </div>
        ) : (
          <>
            <p className="text-3xl font-bold text-primary">100 KES / month</p>
            <p className="text-muted-foreground">
              Gain access to all study materials, unlimited personalized verses, and more.
            </p>
          </>
        )}
      </CardContent>
      <CardFooter>
        {user.subscriptionStatus !== "subscribed" && (
          <Button 
            className="w-full" 
            onClick={handleSubscription} 
            disabled={isSubscribing}
          >
            {isSubscribing ? "Processing..." : "Subscribe with Mpesa"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
