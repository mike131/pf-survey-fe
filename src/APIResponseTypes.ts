export interface APIResponse<T> {
  error: string;
  data: T;
}

export interface IQuestion {
  id: string;
  body: string;
  disallowedStrings: string[];
}

export interface IAnswer {
  id: string;
  body: string;
  questionId: string;
}
