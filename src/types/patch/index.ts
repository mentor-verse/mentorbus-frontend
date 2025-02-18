export interface patchClassStatusProps {
  userId: number | null;
  classId: number | null;
  isFinished: boolean;
}

export interface patchClassStatusRes {
  data: patchClassStatusResDto[];
}

export interface patchClassStatusResDto {
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
