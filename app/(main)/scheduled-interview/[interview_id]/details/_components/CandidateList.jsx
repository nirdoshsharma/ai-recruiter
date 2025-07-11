"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/app/services/supabaseClient";
import moment from "moment";
import { Button } from "@/components/ui/button";
import CandidateFeedbackDialog from "./CandidateFeedbackDialog";

const CandidateList = () => {
  const { interview_id } = useParams();
  const [candidateList, setCandidateList] = useState([]); // ✅ Initialized as empty array

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    const { data, error } = await supabase
      .from("interview-feedback")
      .select("*")
      .eq("interview_id", interview_id);

    if (error) {
      console.error("Error fetching candidates:", error);
    } else {
      setCandidateList(data || []);
    }
  };

  return (
    <div className="">
      <h2 className="font-bold my-5">
        Candidates ({candidateList?.length || 0})
      </h2>

      {candidateList.length === 0 ? (
        <p className="text-sm text-gray-500">No candidates yet.</p>
      ) : (
        candidateList.map((candidate, index) => (
          <div
            key={index}
            className="p-5 flex gap-3 items-center bg-white rounded-lg justify-between"
          >
            <div className="flex items-center gap-5">
              <h2 className="bg-primary p-3 px-4.5 rounded-full text-white font-bold">
                {candidate.userName?.[0]?.toUpperCase()}
              </h2>
              <div>
                <p className="font-bold">{candidate.userName}</p>
                <h2 className="text-sm text-gray-500">
                  Completed On:{" "}
                  {moment(candidate?.created_at).format("MMM DD YYYY")}
                </h2>
                <p className="text-sm text-gray-600">{candidate.userEmail}</p>
              </div>
            </div>
            <div className="flex gap-3 items-center ">
              <h2 className="text-green-600 mx-4">6/10</h2>
              <CandidateFeedbackDialog candidate={candidate} />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CandidateList;
