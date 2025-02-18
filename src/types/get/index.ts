export interface getProfileProps {
  userId: number | null;
}

export interface getProfileRes {
  data: getProfileResDto[];
}

export interface getProfileResDto {
  userId: "number";
  userName: "string";
  isMentor: "boolean"; //멘토, 멘티 여부
  job: "string"; //멘토일 경우 소속 혹은 직장, 멘티라면 null
  major: "string"; //멘토일 경우 전문분야, 멘티라면 null
  school: "string"; //멘티일 경우 소속학교, 멘토라면 null
  interest: "string"; //멘티일 경우 관심사, 멘토라면 null
  level: "number";
}

//<<------------------------------->

export interface getClassMyProps {
  userId: number | null;
}

export interface getClassMyRes {
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
  classId: number | null;
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
  data: getAnswerResDto[];
}

export interface getAnswerResDto {
  userId: "number";
  answerId: "number";
  userName: "string";
  content: "string";
  likes: "number";
  comments: "number";
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
  major: string | null;
}

export interface getMentorRes {
  data: getMentorResDto[];
}

export interface getMentorResDto {
  userId: number;
  userName: string;
  job: string;
  career: string;
}

//<<------------------------------->

export interface getQaCountProps {
  questionId: number | null;
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
  data: getQuestionLikeResDto[];
}

export interface getQuestionLikeResDto {
  userId: number;
  questionId: number;
}
