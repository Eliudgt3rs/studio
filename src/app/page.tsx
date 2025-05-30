import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">
              UpendoWaYesu
            </span>
          </Link>
          <div className="space-x-2">
            <Button asChild variant="ghost">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container grid lg:grid-cols-2 gap-12 items-center py-16 md:py-24 lg:py-32">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-primary">
              Discover Daily Spiritual Nourishment
            </h1>
            <p className="text-lg text-foreground/80 sm:text-xl">
              UpendoWaYesu offers personalized Bible verses, daily guidance, and study resources to deepen your faith and connection with God.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/signup">Get Started Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
            <Image 
              src="https://placehold.co/800x600.png" 
              alt="Spiritual guidance app interface" 
              layout="fill" 
              objectFit="cover"
              data-ai-hint="faith community" 
            />
          </div>
        </section>

        <section id="features" className="py-16 md:py-24 bg-secondary/50">
          <div className="container space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Features to Enhance Your Spiritual Journey</h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Explore tools designed to bring you closer to God's word and wisdom.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Personalized Verses", description: "Receive daily Bible verses tailored to your interests and needs.", icon: "Sparkles", imageHint: "bible open" },
                { title: "Daily Guidance", description: "Get AI-crafted reflections and guidance based on scripture and your input.", icon: "BookOpenText", imageHint: "devotional journal" },
                { title: "Study Resources", description: "Access a library of devotional content, articles, and media to support your study.", icon: "Library", imageHint: "books study" },
                { title: "User Profiles", description: "Manage your preferences and track your spiritual journey.", icon: "User", imageHint: "profile settings" },
                { title: "Secure Subscription", description: "Support the ministry with a simple and secure Mpesa subscription.", icon: "CreditCard", imageHint: "secure payment" },
                { title: "Responsive Design", description: "Access UpendoWaYesu seamlessly on any device, anytime, anywhere.", icon: "Smartphone", imageHint: "mobile tablet" },
              ].map(feature => (
                <div key={feature.title} className="bg-card p-6 rounded-xl shadow-lg flex flex-col items-center text-center">
                  <div className="relative w-full h-40 mb-4 rounded-md overflow-hidden">
                     <Image 
                        src={`https://placehold.co/400x250.png`} 
                        alt={feature.title} 
                        layout="fill" 
                        objectFit="cover" 
                        data-ai-hint={feature.imageHint}
                      />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-primary">{feature.title}</h3>
                  <p className="text-sm text-foreground/70">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 border-t bg-background">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} UpendoWaYesu. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
