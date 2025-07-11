"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { supabase } from "../services/supabaseClient";

const login = () => {
  /**use to sign in with Google */
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Error:", error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center border rounded-2xl p-8">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={400}
          height={100}
          className="w-[250px]"
        />
        <div className="flex items-center flex-col rounded-2xl">
          <Image
            src={"/login.png"}
            alt="loging"
            width={600}
            height={400}
            className="w-[400px] h-[300px]"
          />
          <h2 className="text-2xl font-bold text-center mt-5">
            Welcome to AiCruiter
          </h2>
          <p className="text-gray-500 text-center">
            Sign In With Google Authentication
          </p>
          <Button
            className="mt-10 cursor-pointer w-full"
            onClick={signInWithGoogle}
          >
            Login With Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default login;
