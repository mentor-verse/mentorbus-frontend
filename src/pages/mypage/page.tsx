import { LevelThird } from "@/components/Icons/MyPageIcon";
import { Profile } from "./containers/ProfileSection";
import BottomNav from "@/containers/navbar";
import { useEffect, useState } from "react";

export function MyPage() {
  const [userName, setUserName] = useState("");
  const [userBelong, setUserBelong] = useState("");

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  useEffect(() => {
    const storedUserBelong = localStorage.getItem("userBelong");
    if (storedUserBelong) {
      setUserBelong(storedUserBelong);
    }
  }, []);

  return (
    <>
      <div className="main flex flex-col min-h-screen">
        <div className="main_content ">
          <LevelThird />
          <Profile name={userName} school={userBelong} level="3" gen="man" />
        </div>
        <div className="w-full">
          <BottomNav />
        </div>
      </div>
    </>
  );
}
