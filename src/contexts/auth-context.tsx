"use client";

import type { User as FirebaseUser } from "firebase/auth";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth, db } from "@/config/firebase";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  preferences?: {
    topics?: string[];
  };
  subscriptionStatus?: "free" | "subscribed";
  subscriptionEndDate?: string | null;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  signIn: (user: FirebaseUser) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (profileData: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUser(userSnap.data() as UserProfile);
        } else {
          // Create new user profile if it doesn't exist
          const newUserProfile: UserProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            preferences: { topics: [] },
            subscriptionStatus: "free",
          };
          await setDoc(userRef, newUserProfile);
          setUser(newUserProfile);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (firebaseUser: FirebaseUser) => {
    setLoading(true);
    const userRef = doc(db, "users", firebaseUser.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      setUser(userSnap.data() as UserProfile);
    } else {
      const newUserProfile: UserProfile = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
        preferences: { topics: [] },
        subscriptionStatus: "free",
      };
      await setDoc(userRef, newUserProfile);
      setUser(newUserProfile);
    }
    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    await firebaseSignOut(auth);
    setUser(null);
    setLoading(false);
    router.push("/login");
  };
  
  const updateUserProfile = async (profileData: Partial<UserProfile>) => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const updatedProfile = { ...user, ...profileData };
      if (profileData.preferences) { // Deep merge preferences
        updatedProfile.preferences = { ...user.preferences, ...profileData.preferences };
      }
      await setDoc(userRef, updatedProfile, { merge: true });
      setUser(updatedProfile);
    }
  };

  if (loading) {
     return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <div className="space-y-4 p-8 rounded-lg shadow-xl bg-card w-full max-w-md">
          <Skeleton className="h-8 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
          <div className="space-y-2 pt-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
           <Skeleton className="h-8 w-1/4 mx-auto mt-4" />
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
