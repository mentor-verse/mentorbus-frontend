import { SmallMentorProfile } from "@/components/ui/smallmentorprofile";
import { CommentSection } from "../qa/containers/CommentSection";
import { CommentQuestionSection } from "../qa/containers/CommentQuestionSection";
import { ApplyAnswer, ApplyAnswerBox } from "../qa/containers/ApplyAnswerBox";

export function Sam() {
  return (
    <div className="main flex flex-col min-h-screen overflow-hidden bg-white">
      <SmallMentorProfile
        name={"편유나 멘토"}
        belong={"숭실대학교"}
        gen={"woman"}
      />
      <CommentSection
        answer="안녕하세요, 고2 때 SW특기자 전형 준비해, 특기자 전형으로
대학교 진학에 성공한 사람입니다.

특기자 전형은 언급하신 것처럼 많은 학생들이 특기자 입시 전문 학원을
통해 중학생 시절부터 준비하는 전형입니다. 특기자 전형은 주로 ‘수상실적’ 위주와 ‘프로젝트’ 위주로 나뉩니다. 

주로 학원에서는 정보올림피아드나 코드페어 대회 준비를 통한 수상실적 위주의 전형을 준비시킵니다. 해당 전형으로 모집하는 대학교로는 고려대, 경희대, 중앙대, 한양대, 국민대가 있습니다.

따라서, 질문자님이 학원에 다니지 않고, 특기자 전형으로 대학교 입시에 성공하기 위해서는 수상실적 위주의 특기자 입시가 아닌, ‘프로젝트’ 위주의 특기자 입시를 도전하셔야 합니다. 해당 전형 모집 대학교로는 숭실대, 광운대, 한양대ERICA, 가천대 등이 있습니다.

프로젝트 위주의 학종형 특기자 준비를 위해서는 지금부터 이수하실 모든 과목의 세특에 SW개발 프로젝트를 연관지어 삽입하셔야 합니다. 프로젝트의 주제로는 AI 기술을 이용하며, 사회 문제를 해결할 수 있는 주제가 적합합니다.

도움이 되셨기를 바랍니다."
        star_num={0}
        comment_num={0}
      />
      <CommentQuestionSection
        answer={
          "일반고 2학년 학생입니다. 내신이 4.0 정도 나오는데, 특기자 전형을 잘 준비하면 인서울 대학교 갈 수 있을까요? 어떤 준비들을 해야할까요? 학원을 다녀야할까요??ㅜㅠ "
        }
        question={"SW 특기자 전형"}
        star_num={0}
        comment_num={0}
      />
      ㅊ{" "}
    </div>
  );
}
