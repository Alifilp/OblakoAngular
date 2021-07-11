import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Project, Todo} from "./todos";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor() {
  }

  private _projects$: BehaviorSubject<Project[]> = new BehaviorSubject([] as Project[]);

  get projects$(): BehaviorSubject<Project[]> {
    return this._projects$;
  }

  private static updateProjectByTodo(project: Project, todo: Todo): Project {
    return {
      ...project,
      todos: project.todos.map(value => value.id === todo.id ? {
        ...value,
        is_completed: todo.is_completed
      } : value)
    };
  }

  updateProjects(projects: Project[]) {
    this.projects$.next(projects);
  }

  upsertProject(project: Project) {
    if (this.projects$.getValue().findIndex(value => value.id === project.id) >= 0) {
      this.updateProject(project);
    } else {
      this.updateProjects(this.projects$.getValue().concat(project));
    }
  }

  updateProject(project: Project) {
    this.updateProjects(this.projects$.getValue().map(value =>
        value.id === project.id ? project : value
      )
    )
  }

  updateTaskInProject(todo: Todo, projectId: number) {
    this.updateProjects(this.projects$.getValue().map(value =>
        value.id === projectId ? ProjectsService.updateProjectByTodo(value, todo) : value
      )
    )
  }
}
