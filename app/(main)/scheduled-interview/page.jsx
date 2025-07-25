"use client";
import { useUser } from "@/app/provider";
import { supabase } from "@/app/services/supabaseClient";
import React, { useEffect, useState } from "react";
import InterviewCard from "../dashboard/_components/InterviewCard";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";

const ScheduledInterview = () => {
  const [interviewList, setInterviewList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);
  const GetInterviewList = async () => {
    const result = await supabase
      .from("Interviews")
      .select(
        "jobPosition,duration, interview_id, interview-feedback(userEmail)"
      )
      .eq("userEmail", user?.email)
      .order("id", { ascending: false });
    console.log(result);
    setInterviewList(result.data || []);
  };
  return (
    <div className="mt-5">
      <h2 className="font-bold text-2xl">
        Interview List with Candidate Feedback
      </h2>
      {interviewList?.length === 0 && (
        <div className="p-5 flex flex-col justify-center items-center gap-5 mt-5">
          <Video className="h-10 w-10 text-primary" />
          <h2>You Don't have any interview created yet !</h2>
          <Button className="cursor-pointer">+ Create New Interview</Button>
        </div>
      )}
      {interviewList && (
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
          {interviewList.map((interview, index) => (
            <InterviewCard
              interview={interview}
              key={index}
              viewDetail={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ScheduledInterview;
