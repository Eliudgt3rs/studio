"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { UserNav } from "./user-nav";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Personalized Verses", href: "/personalized-verses", protected: true },
  { name: "Daily Guidance", href: "/daily-guidance", protected: true },
  { name: "Study Resources", href: "/study-resources", protected: true },
  { name: "Profile", href: "/profile", protected: true },
];

export function Header() {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Heart className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block">
            UpendoWaYesu
          </span>
        </Link>
        <nav className="flex flex-1 items-center space-x-4 lg:space-x-6">
          {navItems.map((item) => {
            if (item.protected && !user && !loading) return null;
            // Hide home if user is logged in and on an app page
            if (item.href === "/" && user && pathname !== "/") return null;


            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {loading ? null : user ? (
            <UserNav />
          ) : (
            <div className="space-x-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
