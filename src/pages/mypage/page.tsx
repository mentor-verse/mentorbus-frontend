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
      <div className="main ">
        <div className="main_content ">
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex flex-col items-center justify-center flex-grow space-y-7">
              <LevelThird />
              <Profile
                name={userName}
                school={userBelong}
                level="3"
                gen="man"
              />
            </div>
            <div className="w-full">
              <BottomNav />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
