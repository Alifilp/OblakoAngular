export interface ITodoDtm {
  title: string
}

export class Todo {
  constructor (public id: number, public project_id: number,public title: string, public is_completed: boolean){}
}

export class Project {
  constructor(public id: number, public title: string,public items: Todo[]){}
}
