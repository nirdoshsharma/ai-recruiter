"use client";

import { InterviewDataContext } from "@/app/context/InterviewDataContext";
import { supabase } from "@/app/services/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Info, Loader2Icon, Video } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const Interview = () => {
  const { interview_id } = useParams();
  const [interviewData, setinterviewData] = useState();
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [loading, setLoading] = useState(false);
  const { interviewInfo, setinterviewInfo } = useContext(InterviewDataContext);
  const router = useRouter();
  useEffect(() => {
    interview_id && GetInterviewDetails();
  }, [interview_id]);

  const GetInterviewDetails = async () => {
    setLoading(true);
    try {
      let { data: Interviews, error } = await supabase
        .from("Interviews")
        .select("jobPosition , jobDescription, duration, type")
        .eq("interview_id", interview_id);
      console.log(Interviews[0]);
      if (Interviews.length == 0) {
        toast("Incorrect Interview Link");
        return;
      }

      setinterviewData(Interviews[0]);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast("Incorrect Interview Link");
    }
  };
  const onJoinInterview = async () => {
    setLoading(true);
    let { data: Interviews, error } = await supabase
      .from("Interviews")
      .select("*")
      .eq("interview_id", interview_id);

    console.log("Supabase data: ", Interviews[0]);

    setinterviewInfo({
      userName: userName,
      userEmail: userEmail,
      interviewData: Interviews[0],
    });

    router.push("/interview/" + interview_id + "/start");

    setLoading(false);
  };
  return (
    <div className="px-10 md:px-28 lg:px-48 xl:px-64 mt-16 ">
      <div className="flex flex-col items-center justify-center border rounded-lg bg-white p-7 lg:px-32 md:px-52 mb-20">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={200}
          height={100}
          className="w-[170px] h-[50px]"
        />
        <h2 className="mt-3">AI-Powered Interview Platform</h2>
        <Image
          src={"/interview.png"}
          alt="interview"
          height={100}
          width={100}
          className="h-[200px] w-[280px] my-6"
        />
        <h2 className="font-bold text-xl ">{interviewData?.jobPosition}</h2>
        <h2 className="flex gap-2 items-center text-gray-400 mt-3">
          <Clock className="h-4 w-4" /> {interviewData?.duration} Min
        </h2>
        <div className="w-full">
          <h2>Enter your Full Name</h2>
          <Input
            placeholder="e.g. Nirdosh Sharma"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="w-full mt-5">
          <h2>Enter your Email</h2>
          <Input
            placeholder="e.g. me.nirdosh@gmail.com"
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div className="p-3 bg-blue-100 flex gap-4 rounded-lg mt-4">
          <Info className="text-primary" />
          <div>
            <h2 className="font-bold">Before you begin</h2>
            <ul>
              <li className="text-sm text-primary">
                Ensure you hava a stable internet connection
              </li>
              <li className="text-sm text-primary">
                Test your camera and microphone
              </li>
              <li className="text-sm text-primary">
                Find a quite place for interview
              </li>
            </ul>
          </div>
        </div>
        <Button
          className="mt-5 w-full text-bold text-white"
          disabled={loading || !userName}
          onClick={() => onJoinInterview()}
        >
          <Video />
          {loading && <Loader2Icon />}
          Join interview
        </Button>
      </div>
    </div>
  );
};

export default Interview;
