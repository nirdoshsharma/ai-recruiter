"use client";
import { useUser } from "@/app/provider";
import { supabase } from "@/app/services/supabaseClient";
import { Button } from "@/components/ui/button";
import { Camera, Video } from "lucide-react";
import React, { useEffect, useState } from "react";
import InterviewCard from "./InterviewCard";

const LatestInterviewsList = () => {
  const [interviewList, setinterviewList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);
  const GetInterviewList = async () => {
    let { data: Interviews, error } = await supabase
      .from("Interviews")
      .select("*")
      .eq("userEmail", user?.email)
      .order("id", { ascending: false })
      .limit(6);
    console.log(Interviews);
    setinterviewList(Interviews);
  };
  return (
    <div className="my-5 ">
      <h2 className="font-bold text-2xl">Previously Created Interviews</h2>

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
            <InterviewCard interview={interview} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestInterviewsList;
