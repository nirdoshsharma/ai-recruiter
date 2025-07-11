import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./_components/AppSideBar";
import WelcomeContainer from "./dashboard/_components/WelcomeContainer";

const DashboardProvider = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      {/* <SidebarTrigger /> */}

      <div className="w-full p-10">
        <WelcomeContainer />
        {children}
      </div>
    </SidebarProvider>
  );
};

export default DashboardProvider;
