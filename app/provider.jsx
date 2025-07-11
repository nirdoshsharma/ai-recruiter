"use client";

import React, { useEffect, useState, createContext, useContext } from "react";
import { supabase } from "./services/supabaseClient";

// ✅ Create UserContext and hook
const UserContext = createContext();
export const useUser = () => useContext(UserContext);

const Provider = ({ children }) => {
  const [user, setUser] = useState(null); // ✅ Add state to hold user

  useEffect(() => {
    CreateNewUser();
  }, []);

  const CreateNewUser = () => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;

      // ✅ Check if user exists in "Users" table
      let { data: Users, error } = await supabase
        .from("Users")
        .select("*")
        .eq("email", user?.email);

      // ✅ If not, insert new
      if (Users?.length === 0) {
        await supabase.from("Users").insert([
          {
            name: user?.user_metadata?.name,
            email: user?.user_metadata?.email,
            picture: user?.user_metadata?.picture,
          },
        ]);
      }

      // ✅ Set user in state for context
      setUser({
        name: user?.user_metadata?.name,
        email: user?.user_metadata?.email,
        picture: user?.user_metadata?.picture,
      });
    });
  };

  return (
    // ✅ Wrap children with context provider
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export default Provider;
