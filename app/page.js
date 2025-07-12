"use client"; // important for using hooks in app router

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { supabase } from "./services/supabaseClient";

export default function Home() {
  const router = useRouter();
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get the current session on mount
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        setSession(data.session);
      }
    };

    getSession();

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    // Cleanup subscription
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleNavigate = () => {
    router.push("/dashboard");
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Ai - Recruiter</h1>

      {!session ? (
        <Button onClick={signInWithGoogle}>Login With Google</Button>
      ) : (
        <Button onClick={handleNavigate}>Go to Dashboard</Button>
      )}
    </div>
  );
}
