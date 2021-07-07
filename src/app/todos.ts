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
