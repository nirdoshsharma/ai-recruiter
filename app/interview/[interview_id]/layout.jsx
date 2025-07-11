"use client";

import React, { useState } from "react";
import { InterviewDataContext } from "@/app/context/InterviewDataContext";
import InterviewHeader from "../_components/InterviewHeader"; // optional header

const InterviewInnerLayout = ({ children }) => {
  const [interviewInfo, setinterviewInfo] = useState();

  return (
    <InterviewDataContext.Provider value={{ interviewInfo, setinterviewInfo }}>
      {children}
    </InterviewDataContext.Provider>
  );
};

export default InterviewInnerLayout;
