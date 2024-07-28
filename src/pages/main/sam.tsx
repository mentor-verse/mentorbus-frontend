import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { SearchBox } from "@/components/ui/searchbox";
import { QuestionBox } from "@/components/ui/questionbox";
import { SmallMentorProfile } from "@/components/ui/smallmentorprofile";
import { OnboardingButton } from "@/components/ui/onboardingbutton";
import { College } from "@/components/ui/college";
import SU from "@/assets/SU.svg";
import { MentorBox } from "@/components/ui/mentorbox";
import BottomNav from "@/containers/navbar";
import OpenGatherTown from "@/containers/opengathertown";


export function SamPage() {
  return (
    <>
        <div className="main">
            <div className="main_content">
                <div style={{background:'#fff'}}>
                    <Input className="w-[318px]" type="text" placeholder="안녕"></Input>
                    <Button variant={"default"} size={"default"} className="w-full," >안녕</Button>
                    <Button variant={"kakao"} size={"ka"} >카카오 로그인</Button>
                    <SearchBox gen="man" major="[진로체험의 날] 글로벌미디어학부" name="윤영재 멘토" info="숭실대학교 글로벌미디어학부 18학번" date="2024.08.20(화) 18:00" variant="null" size="state">4/5</SearchBox>
                    <QuestionBox question="Q2. 고2 1학기를 망했는데.." 
                    
                    answer="고1 1학기 때 3등급을 찍고, 2학기 때 2.4까지 올렸습니다. 근데
                            고2 1학기 때 너무 망해버려서 3.6까지 떨어져버렸어요...이거 남은 기간 동안
                            올리면 종합전형 쓸 수 있을까요? 아니면 정시로 갈아타야할까요?" 
                            
                    star_num={1} comment_num={2}/>

                    <SmallMentorProfile gen="Man" name="편유나 멘토" belong="숭실대학교 글로벌미디어학부"/>
                    <OnboardingButton title="멘토로 가입하기" explain="입시정보를 제공하고 싶어요"/>
                    <College img={SU} name="세종대학교" />
                    <MentorBox name="편유나" major="숭실대학교 글로벌미디어학부" gen="woman" info="-숭실대학교 재학" />
                    <BottomNav />
                    <OpenGatherTown />
                </div>
                   
            </div>
        </div>
    </>
  );
}
