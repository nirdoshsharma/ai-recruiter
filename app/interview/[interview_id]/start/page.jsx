"use client";

import { InterviewDataContext } from "@/app/context/InterviewDataContext";
import { Mic, Phone, Timer } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import AlertConfirmation from "./_components/AlertConfirmation";
import { toast } from "sonner";
import axios from "axios";
import { supabase } from "@/app/services/supabaseClient";
import { useParams, useRouter } from "next/navigation";

const Startinterview = () => {
  const { interviewInfo } = useContext(InterviewDataContext);
  const [activeUser, setActiveUser] = useState(false);
  const [conversation, setConversation] = useState();
  const { interview_id } = useParams();

  const router = useRouter();
  const vapiRef = useRef(null);

  useEffect(() => {
    vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
  }, []);

  useEffect(() => {
    if (interviewInfo && vapiRef.current) {
      startCall();
    }
  }, [interviewInfo]);

  const startCall = () => {
    const vapi = vapiRef.current;
    if (!vapi) return;

    let questionList = "";
    interviewInfo?.interviewData?.questionList?.forEach((item) => {
      questionList += item?.question + ", ";
    });

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage:
        "Hi " +
        interviewInfo?.userName +
        ", how are you? Ready for your interview on " +
        interviewInfo?.interviewData?.jobPosition,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.
Begin the conversation with a friendly introduction. Ask questions one by one.
Keep the conversation engaging and supportive.

Questions: ${questionList}`,
          },
        ],
      },
    };

    vapi.start(assistantOptions);
  };

  const stopInterview = () => {
    console.log("Interview disconnected");
    vapiRef.current?.stop();
  };

  useEffect(() => {
    const vapi = vapiRef.current;
    if (!vapi) return;

    const handleCallStart = () => {
      console.log("Call has started");
      toast("Call connected...");
    };

    const handleSpeechStart = () => {
      console.log("Assistant speech started");
      setActiveUser(false);
    };

    const handleSpeechEnd = () => {
      console.log("Assistant speech ended");
      setActiveUser(true);
    };

    const handleCallEnd = () => {
      console.log("Call has stopped");
      toast("Interview Ended");

      let attempts = 0;
      const maxAttempts = 10;
      const interval = 1000;

      const waitForConversationThenGenerate = setInterval(() => {
        if (conversation && conversation.length > 0) {
          console.log("✅ Conversation received, generating feedback...");
          clearInterval(waitForConversationThenGenerate);
          GenerateFeedback();
        } else {
          attempts++;
          console.log("⏳ Conversation not ready, retrying...");
          if (attempts >= maxAttempts) {
            console.warn("❌ Conversation data not available after waiting.");
            clearInterval(waitForConversationThenGenerate);
            toast.error("Failed to retrieve conversation data.");
          }
        }
      }, interval);
    };

    const handleMessage = (message) => {
      console.log("Raw Vapi message received:", message);

      if (message?.conversation) {
        console.log("Vapi Message (conversation):", message.conversation);
        setConversation(message.conversation);
      } else {
        console.warn("Unexpected message format from Vapi:", message);
      }
    };

    vapi.on("call-start", handleCallStart);
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);
    vapi.on("call-end", handleCallEnd);
    vapi.on("message", handleMessage);

    return () => {
      vapi.off("call-start", handleCallStart);
      vapi.off("speech-start", handleSpeechStart);
      vapi.off("speech-end", handleSpeechEnd);
      vapi.off("call-end", handleCallEnd);
      vapi.off("message", handleMessage);
    };
  }, [conversation]);

  const GenerateFeedback = async () => {
    try {
      if (!conversation || conversation.length === 0) {
        console.warn("No conversation data to send.");
        toast.error(
          "Interview conversation is missing. Feedback cannot be generated."
        );
        return;
      }

      console.log(
        "📤 Sending conversation to feedback endpoint:",
        conversation
      );

      const result = await axios.post("/api/ai-feedback", {
        conversation: conversation,
      });

      const content = result?.data?.content;
      console.log("📥 Raw content from AI:", content);

      const match = content.match(/```json([\s\S]*?)```/);
      if (!match || !match[1]) {
        throw new Error(
          "❌ Failed to extract valid JSON block from AI response"
        );
      }

      const jsonString = match[1].trim();

      let feedbackObj;
      try {
        feedbackObj = JSON.parse(jsonString);
      } catch (jsonError) {
        console.error("❌ JSON parsing failed:", jsonError);
        toast.error("AI feedback was not in valid format.");
        return;
      }

      const { data, error } = await supabase
        .from("interview-feedback")
        .insert([
          {
            userName: interviewInfo?.userName,
            userEmail: interviewInfo?.userEmail,
            interview_id: interview_id,
            feedback: feedbackObj,
            recommended: false,
          },
        ])
        .select();

      if (error) {
        throw new Error("❌ Supabase insertion failed: " + error.message);
      }

      console.log("✅ Feedback saved to Supabase:", data);
      toast.success("Interview feedback saved successfully!");
      router.replace("/interview/" + interview_id + "/completed");
    } catch (error) {
      console.error("❌ Error generating feedback:", error);
      toast.error("Failed to generate feedback. Please try again.");
    }
  };

  return (
    <div className="p-20 lg:px-48 xl:px-56">
      <h2 className="font-bold text-xl flex justify-between">
        AI Interview Section
        <span className="flex gap-2 items-center">
          <Timer />
          00:00:00
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <div className="relative">
            {!activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
            )}
            <Image
              src={"/ai.png"}
              alt="ai"
              height={100}
              width={100}
              className="w-[60px] h-[60px] rounded-full object-cover"
            />
          </div>
          <h2>AI Recruiter</h2>
        </div>
        <div className="bg-white h-[400px] rounded-lg border flex items-center flex-col gap-3 justify-center">
          <div className="relative">
            {activeUser && (
              <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping" />
            )}
            <h2 className="text-2xl bg-primary text-white p-4 rounded-full px-6">
              {interviewInfo?.userName[0]}
            </h2>
          </div>
          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>
      <div className="flex items-center gap-5 justify-center mt-7">
        <Mic className="h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer" />
        <AlertConfirmation stopInterview={stopInterview}>
          <Phone className="h-12 w-12 p-3 bg-red-500 text-white rounded-full cursor-pointer" />
        </AlertConfirmation>
      </div>
      <h2 className="text-sm text-gray-400 text-center mt-5">
        Interview in Progress...
      </h2>
    </div>
  );
};

export default Startinterview;
