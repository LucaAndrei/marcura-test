
export enum CommentType {
  Internal = 'Internal',
  External = 'External'
}

export interface IComment {
  id: number;
  daStage: string;
  persona: string;
  author: string;
  comment: string;
  type?: CommentType;
  date: Date;
}
