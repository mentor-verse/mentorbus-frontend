export interface postAnswerProps {
  userId: number | null;
  content: string | null;
  questionId: string | null;
}

export interface postAnswerRes {
  data: postAnswerResDto[];
}

export interface postAnswerResDto {
  answerId: number;
  userId: number;
  questionId: number;
  userName: number;
  content: string;
}

//<<------------------------------->

export interface postQuestionProps {
  userId: number | null;
  title: string | null;
  content: string | null;
}

export interface postQuestionRes {
  data: postQuestionResDto[];
}

export interface postQuestionResDto {
  userId: "number";
  questionId: "number";
  title: "string";
  content: "string";
  likes: "number";
  comments: "number";
}

//<<------------------------------->

export interface postQuestionLikesProps {
  userId: number | null;
  questionId: number | null;
}

export interface postQuestionLikesRes {
  data: postQuestionLikesResDto[];
}

export interface postQuestionLikesResDto {
  questionId: number;
  title: string;
  content: string;
  likes: number;
  comments: number;
}

//<<------------------------------->

export interface postClassApplyProps {
  userId: number | null;
  classId: number | null;
}

export interface postClassApplyRes {
  data: postClassApplyResDto[];
}

export interface postClassApplyResDto {
  classId: number;
  userName: string;
  job: string;
  title: string;
  content: string;
  date: string;
  memberCount: string;
  memberApplied: string;
  map: boolean;
}

//<<------------------------------->

export interface postClassOpenProps {
  userId: number; // Mentoring title as a string
  userName: string; // Mentoring title as a string
  title: string; // Mentoring title as a string
  content: string; // Mentoring content as a string
  date: string; // Mentoring date as a string
  memberCount: number; // Number of mentees as a number
  map: string; // Mentoring place as a string
  job: string; // Mentoring title as a string
  major: string; // Mentoring title as a string
}

export interface postClassOpenRes {
  data: postClassOpenResDto[];
}

export interface postClassOpenResDto {
  classId: number;
  title: string;
  content: string;
  date: string;
  memberCount: string;
  map: boolean;
}

//<<------------------------------->

export interface postOnboardingProps {
  userId: number; // 사용자 아이디 (문자열이 아니라 숫자)
  userName: string; // 사용자 닉네임
  isMentor: boolean; // 멘토, 멘티 여부
  job: string | null; // 멘토일 경우 소속 혹은 직장, 멘티라면 null
  school: string | null; // 멘티일 경우 소속학교, 멘토라면 null
  major?: string | null; // 멘티일 경우 소속학교, 멘토라면 null
  interest?: string | null; // 멘티일 경우 소속학교, 멘토라면 null
}

export interface postOnboardingRes {
  data: postOnboardingResDto[];
}

export interface postOnboardingResDto {
  userId: 1;
  userName: string;
  job: string;
  major: string;
  school: string;
  interest: string;
  isMentor: boolean;
}
