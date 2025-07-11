import Image from "next/image";
import React from "react";

const InterviewHeader = () => {
  return (
    <div className="p-2 shadow-sm">
      <Image
        src={"/logo.png"}
        alt="logo"
        width={200}
        height={100}
        className="w-[270px] h-[50px]"
      />
    </div>
  );
};

export default InterviewHeader;
