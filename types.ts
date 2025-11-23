export interface InterviewQuestion {
  question: string;
  focusArea: string;
  evaluationCriteria: string;
}

export interface JobDescription {
  title: string;
  summary: string;
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
}

export interface RecruitmentPackage {
  jobDescription: JobDescription;
  interviewGuide: InterviewQuestion[];
}

export enum AppState {
  IDLE = 'IDLE',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}