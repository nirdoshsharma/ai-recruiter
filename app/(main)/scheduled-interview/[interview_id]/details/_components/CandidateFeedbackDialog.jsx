import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const CandidateFeedbackDialog = ({ candidate }) => {
  const feedback = candidate?.feedback?.feedback;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-primary">
          View Report
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Candidate Feedback</DialogTitle>
          <DialogDescription asChild>
            <div className="mt-5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                  <h2 className="bg-primary p-3 px-4.5 rounded-full text-white font-bold">
                    {candidate.userName?.[0]?.toUpperCase()}
                  </h2>
                  <div>
                    <p className="font-bold">{candidate.userName}</p>
                    <h2 className="text-sm text-gray-500">
                      {candidate?.userEmail}
                    </h2>
                  </div>
                </div>
                <div className="flex gap-3 items-center ">
                  <h2 className="text-primary text-2xl font-bold">6/10</h2>
                </div>
              </div>
              <div className="mt-5">
                <h2 className="font-bold">Skills Assesment</h2>
                <div className="mt-3 grid grid-cols-2 gap-10 ">
                  <div>
                    <h2 className="flex justify-between items-center">
                      Technical Skills{" "}
                      <span>{feedback?.rating?.techicalSkills}/10</span>
                    </h2>
                    <Progress
                      value={feedback?.rating?.techicalSkills * 10}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <h2 className="flex justify-between items-center">
                      Communication{" "}
                      <span>{feedback?.rating?.communication}/10</span>
                    </h2>
                    <Progress
                      value={feedback?.rating?.communication * 10}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <h2 className="flex justify-between items-center">
                      Problem Solving{" "}
                      <span>{feedback?.rating?.problemSolving}/10</span>
                    </h2>
                    <Progress
                      value={feedback?.rating?.problemSolving * 10}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <h2 className="flex justify-between items-center">
                      Experience <span>{feedback?.rating?.experince}/10</span>
                    </h2>
                    <Progress
                      value={feedback?.rating?.experince * 10}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <h2 className="font-bold">Performance Summery</h2>
                <p className="mt-2 p-5 bg-secondary rounded-md">
                  {feedback?.summery}
                </p>
              </div>
              <div
                className={`p-5 mt-5 flex items-center justify-between rounded-md ${
                  feedback?.Recommendation == "Not Recommended"
                    ? "bg-red-100"
                    : "bg-green-100"
                }`}
              >
                <div>
                  <h2
                    className={`font-bold ${
                      feedback?.Recommendation == "Not Recommended"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    Recommendation Msg :{" "}
                  </h2>
                  <p
                    className={`${
                      feedback?.Recommendation == "Not Recommended"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {feedback?.RecommendationMsg}
                  </p>
                </div>
                <Button
                  className={`${
                    feedback?.Recommendation == "Not Recommended"
                      ? "bg-red-700"
                      : "bg-green-700"
                  }`}
                >
                  Send Msg
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CandidateFeedbackDialog;
