"use client";
import { useUser } from "@/app/provider";
import { supabase } from "@/app/services/supabaseClient";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import InterviewDetailContainer from "./_components/InterviewDetailContainer";
import CandidateList from "./_components/CandidateList";

const InterviewDetail = () => {
  const { interview_id } = useParams();
  const [interviewDetail, setinterviewDetail] = useState();
  const { user } = useUser();

  useEffect(() => {
    user && GetInterviewDetail();
  }, [user]);

  const GetInterviewDetail = async () => {
    const result = await supabase
      .from("Interviews")
      .select(
        `jobPosition,duration,jobDescription,type,questionList, interview_id,created_at, interview-feedback(userEmail,userName,feedback,created_at)`
      )
      .eq("userEmail", user?.email)
      .eq("interview_id", interview_id);
    setinterviewDetail(result?.data[0]);
  };
  console.log("dsfgsrdth", interviewDetail);
  return (
    <div className="mt-5">
      <h2 className="font-bold text-2xl">Interview Detail</h2>
      <InterviewDetailContainer interviewDetail={interviewDetail} />
      <CandidateList candidateList={interviewDetail?.["interview-feedback"]} />
    </div>
  );
};

export default InterviewDetail;
