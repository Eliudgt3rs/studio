"use client";

import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Skeleton } from "@/components/ui/skeleton";

export default function AppLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/login?redirect=${pathname}`);
    }
  }, [user, loading, router, pathname]);

  if (loading || !user) {
    return (
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 max-w-screen-2xl items-center">
            <Skeleton className="h-6 w-6 mr-2" />
            <Skeleton className="h-6 w-32" />
            <div className="flex flex-1 items-center space-x-4 lg:space-x-6 ml-6">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-24" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full ml-auto" />
          </div>
        </header>
        <main className="flex-1 container py-8">
          <div className="space-y-6">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}
