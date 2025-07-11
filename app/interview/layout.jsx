"use client";

import React, { useState } from "react";
import InterviewHeader from "./_components/InterviewHeader";
import { InterviewDataContext } from "../context/InterviewDataContext";
// import InterviewHeader from "./_components/InterviewHeader"; // Adjust path if needed

const InterviewLayout = ({ children }) => {
  const [interviewInfo, setinterviewInfo] = useState();
  return (
    <div className="bg-secondary min-h-screen">
      <InterviewDataContext value={{ interviewInfo, setinterviewInfo }}>
        <InterviewHeader />
        {children}
      </InterviewDataContext>
    </div>
  );
};

export default InterviewLayout;
