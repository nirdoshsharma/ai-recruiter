"use client";
import React from "react";
import { useUser } from "@/app/provider";
import Image from "next/image";
const WelcomeContainer = () => {
  const { user } = useUser();
  return (
    <div className="bg-white p-5 rounded-xl flex justify-between items-center">
      <div>
        <h2 className="text-lg font-bold">Welcome back, {user?.name}</h2>
        <h2 className=" text-gray-500">
          AI -Driven Interviews, Hassle-Free Hiring
        </h2>
      </div>
      {user && (
        <Image
          src={user?.picture}
          alt="user- avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
      )}
    </div>
  );
};

export default WelcomeContainer;
