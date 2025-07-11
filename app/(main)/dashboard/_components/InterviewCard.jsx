import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Send } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

const InterviewCard = ({ interview, viewDetail = false }) => {
  const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview?.interview_id;
  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast("Copied..");
  };

  const onSend = () => {
    const subject = encodeURIComponent("AI Recruiter Interview Link");
    const body = encodeURIComponent("Interview Link: " + url);
    window.location.href = `mailto:accounts@nirdoshsharma.me?subject=${subject}&body=${body}`;
  };
  return (
    <div className="p-5 bg-white rounded-lg border">
      <div className="flex items-center justify-between">
        <div className="h-[40px] w-[40px] bg-primary rounded-full"></div>
        <h2 className="text-sm">
          {moment(interview.created_at).format("DD MMM YYYY")}
        </h2>
      </div>

      <h2 className="mt-3 font-bold text-lg">{interview?.jobPosition}</h2>
      <h2 className="mt-2 flex justify-between text-gray-500">
        {interview?.duration} Minutes
        <span className="text-green-700">
          {interview["interview-feedback"]?.length} Candidates
        </span>
      </h2>

      {!viewDetail ? (
        <div className="grid grid-cols-2 gap-3 w-full mt-5">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2"
            onClick={copyLink}
          >
            <Copy className="h-4 w-4" />
            Copy Link
          </Button>
          <Button
            className="flex items-center justify-center gap-2"
            onClick={onSend}
          >
            <Send className="h-4 w-4" />
            Send
          </Button>
        </div>
      ) : (
        <Link
          href={"/scheduled-interview/" + interview?.interview_id + "/details"}
        >
          <Button className="mt-5 w-full" variant="outline">
            View Detail <ArrowRight />
          </Button>
        </Link>
      )}
    </div>
  );
};

export default InterviewCard;
