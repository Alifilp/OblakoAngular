export interface ITodoDtm {
  todo: {
    title: string;
  };
  project_id?: number;
  project: {
    title?: string;
  }
}

export class Todo {
  constructor (public id: number, public project_id: number,public title: string, public is_completed: boolean){}
}

export class Project {
  constructor(public id: number, public title: string,public todos: Todo[]){}
}

export interface IProject {
  created_at: string;
  id: number;
  title: string;
  todos: {
    created_at: string;
    id: number;
    is_completed: boolean;
    project_id: number;
    title: string;
    updated_at: string;
  }[];
  updated_at: string;
}
