import { createContext } from "react";

// This creates a context for interview data
export const InterviewDataContext = createContext({
  interviewInfo: null,
  setinterviewInfo: () => {},
});
