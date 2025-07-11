"use client";

import React from "react";
import { CheckCircle, Home } from "lucide-react";
import Link from "next/link";

const CompletedPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full text-center">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Interview Completed
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for attending the AI-powered interview session. <br />
          Your feedback has been successfully recorded.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition duration-200"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default CompletedPage;
