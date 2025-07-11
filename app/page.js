"use client"; // important for using hooks in app router

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/dashboard"); // adjust the path based on your routing
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Ai - Recruiter</h1>
      <Button onClick={handleNavigate}>Go to Dashboard</Button>
    </div>
  );
}
