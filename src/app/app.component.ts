import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpService} from './http.service';
import {ITodoDtm, Project, Todo} from './todos';
import {Observable} from "rxjs";
import {filter, first, switchMap} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";
import {ProjectsService} from "./projects.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  projects$: Observable<Project[]> = this.projectsService.projects$.asObservable();

  constructor(private httpService: HttpService,
              public dialog: MatDialog,
              private projectsService: ProjectsService) {
  }

  updateTodo(project_id: number, todo: Todo) { //Запрос на обновление задачи
    this.httpService.patchData(project_id, todo.id).subscribe(() => {
      this.projectsService.updateTaskInProject(todo, project_id);
    })
  }

  openDialog(projects: Project[]): void { //вызов окна создания
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {projects}
    });

    dialogRef.afterClosed().pipe( // Встроенный метод диалогового окна, который вызывается на закрытие
      filter(value => !!value), // Фильтр, чтобы дальнейшие действия вызывались, только если данные есть
      switchMap((res: ITodoDtm) => this.createToDo(res)) // Запрос к серверу для создания задачи
    ).subscribe((res) => { //Ловим данные
      this.projectsService.upsertProject(res);
    });
  }

  createToDo(data: ITodoDtm) { //Запрос на создание задачи
    return this.httpService.postData(data)
  }

  trackProject(index: number) {
    return index;
  }

  ngOnInit() {
    this.httpService.getData().pipe(first()).subscribe(res => {
      this.projectsService.updateProjects(res);
    })
  }
}
