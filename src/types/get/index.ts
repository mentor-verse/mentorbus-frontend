export interface getProfileProps {
  userId: number | null | undefined;
}

export interface getProfileRes {
  data: getProfileResDto[];
  userName: string;
  job: string; //멘토일 경우 소속 혹은 직장, 멘티라면 null
  isMentor: boolean; //멘토, 멘티 여부
}

export interface getProfileResDto {
  userId: number;
  userName: string;
  isMentor: boolean; //멘토, 멘티 여부
  job: string; //멘토일 경우 소속 혹은 직장, 멘티라면 null
  major: string; //멘토일 경우 전문분야, 멘티라면 null
  school: string; //멘티일 경우 소속학교, 멘토라면 null
  interest: string; //멘티일 경우 관심사, 멘토라면 null
  level: number;
}

//<<------------------------------->

export interface getClassMyProps {
  userId: number | null;
}

export interface getClassMyRes {
  isFinished: boolean;
  filter(arg0: (r: any) => boolean): unknown;
  data: getClassMyResDto[];
}

export interface getClassMyResDto {
  classId: number;
  title: string;
  content: string;
  date: string;
  memberCount: string;
  map: boolean;
  isFinish: boolean;
}

//<<------------------------------->

export interface getClassProps {
  take: number | null;
  major: string | null;
  job: string | null;
  userId: number | null;
  classId: number[] | null;
}

export interface getClassRes {
  data: getClassResDto[];
}

export interface getClassResDto {
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

export interface getQuestionProps {
  q: string | null;
  category: string | null;
}

export interface getQuestionRes {
  answer: string;
  mentor_answer: string | undefined;
  position: string;
  author: string;
  major: string;
  userId: number;
  question: string;
  type: string;
  title: string;
  content: string;
  isClick: boolean;
  id: number;
  data: getQuestionResDto[];
}

export interface getQuestionResDto {
  userId: "number";
  questionId: "number";
  title: "string";
  content: "string";
  likes: "number";
  comments: "number";
}

//<<------------------------------->

export interface getAnswerProps {
  questionId: number | null;
}

export interface getAnswerRes {
  some(arg0: (answer: { userId: number }) => boolean): unknown;
  data: getAnswerResDto[];
}

export interface getAnswerResDto {
  userId: number;
  answerId: number;
  userName: string;
  content: string;
  likes: number;
  comments: number;
}

//<<------------------------------->

export interface getMentorScheduleProps {
  userId: number | null;
}

export interface getMentorScheduleRes {
  data: getMentorScheduleResDto[];
}

export interface getMentorScheduleResDto {
  userId: number;
  answerId: number;
  userName: string;
  content: string;
  likes: number;
  comments: number;
}

//<<------------------------------->

export interface getMentorProps {
  major: string | null | undefined;
}

export interface getMentorRes {
  data: getMentorResDto[];
}

export interface getMentorResDto {
  nickname: string;
  major: string;
  gen: string;
  character1: string;
  userId: number;
  userName: string;
  job: string;
  career: string;
}

//<<------------------------------->

export interface getQaCountProps {
  questionId: number[] | null;
}

export interface getQaCountRes {
  data: getQaCountResDto[];
}

export interface getQaCountResDto {
  question: number;
  likeCount: number;
  commentCount: number;
}

//<<------------------------------->

export interface getQuestionLikeProps {
  userId: number | null;
}

export interface getQuestionLikeRes {
  questionId: any;
  data: getQuestionLikeResDto[];
}

export interface getQuestionLikeResDto {
  userId: number;
  questionId: number;
}
