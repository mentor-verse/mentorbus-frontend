import { LevelThird } from "@/components/Icons/MyPageIcon";
import { Profile } from "./containers/ProfileSection";
import BottomNav from "@/containers/navbar";
import { useEffect, useState } from 'react';

export function MyPage() {
  const [userName, setUserName] = useState('');
  const [userBelong, setUserBelong] = useState('');


  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  useEffect(() => {
    const storedUserBelong = localStorage.getItem('userBelong');
    if (storedUserBelong) {
      setUserBelong(storedUserBelong);
    }
  }, []);

  return (
    <>
      <div className="main">
        <div className="main_content">
            <div className="relative w-full h-screen">

                <div className="absolute top-2/4 right-1/2 transform translate-x-[50%] -translate-y-3/4 ">
                    <LevelThird />
                </div>
                
                <div className="absolute top-3/4 right-1/2 transform translate-x-[50%] -translate-y-3/4 ">
                  <Profile name={userName} school={userBelong} level="3" gen="man"/>
                </div>

                <BottomNav />
            </div>
        </div>
      </div>
    </>
  );
}
