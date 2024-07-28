import { Banner } from "@/components/Icons/Banner";
import { Header } from "./containers/Header";
import { TitleSection } from "./containers/TitleSection";
import { College } from "@/components/ui/college";
import SU from "@/assets/SU.svg";
import  SSU  from "@/assets/SSU.svg";
import  Seoul  from "@/assets/Seoul.svg";
import  HU  from "@/assets/HU.svg";
import  CAU  from "@/assets/CAU.svg";
import BottomNav from "@/containers/navbar";
import { MentorBox } from "@/components/ui/mentorbox";
import { useEffect, useState } from "react";


export function MainPage() {
  const [userName, setUserName] = useState('');
  const [userMajor, setUserMajor] = useState('');


  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  useEffect(() => {
    const storedUserMajor = localStorage.getItem('major');
    if (storedUserMajor) {
      setUserMajor(storedUserMajor);
    }
  }, []);


  return (
    <>
      <div className="main">
        <div className="main_content overflow-hidden bg-white">
          <div style={{ background: '#fff' }}>
             <Header major={userMajor} className="mt-[50px]"/>

             <div className="w-auto mt-[30px]">
                 <Banner />
             </div>

             
             <TitleSection title2="대학별" title={""} major={""} title3={""} />
           
             
             <div className="flex ml-[28px] overflow-auto mt-[10px]">
                <College img={SSU} name="숭실대학교" title={""} explain={""} />
                <div className="ml-[13px]"></div>
                <College img={CAU} name="중앙대학교" title={""} explain={""} />
                <div className="ml-[13px]"></div>
                <College img={Seoul} name="서울대학교" title={""} explain={""} />
                <div className="ml-[13px]"></div>
                <College img={HU} name="한양대학교" title={""} explain={""} />
                <div className="ml-[13px]"></div>
                <College img={SU} name="세종대학교" title={""} explain={""} />
             </div>

             <TitleSection title={userName} title2="님에게 맞는" major={userMajor} title3="멘토" />


             <div className="flex mt-[20px] overflow-auto">
                <MentorBox name="편유나" major="숭실대학교 글로벌미디어학부" gen="woman" info="-숭실대학교 재학" date={""} num={""} />
                <div className="ml-[13px]"></div>
                <MentorBox name="편유나" major="숭실대학교 글로벌미디어학부" gen="woman" info="-숭실대학교 재학" date={""} num={""} />
                <div className="ml-[13px]"></div>
                <MentorBox name="편유나" major="숭실대학교 글로벌미디어학부" gen="woman" info="-숭실대학교 재학" date={""} num={""} />
                <div className="ml-[13px]"></div>
                <MentorBox name="편유나" major="숭실대학교 글로벌미디어학부" gen="woman" info="-숭실대학교 재학" date={""} num={""} />
             </div>


             <BottomNav />

          </div>
        </div>
      </div>
    </>
  );
}
