import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpService} from './http.service';
import {ITodoDtm, Project} from './todos';
import {BehaviorSubject, Observable} from "rxjs";
import {filter, shareReplay, switchMap} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  dataUpdateTrigger$ = new BehaviorSubject('init');//Триггер обновления задач, сразу изменяем чтобы сработал
  projects$: Observable<Project[]> = this.dataUpdateTrigger$.pipe(//Подписываемся на обновления project и делаем предобработку
    switchMap(() => this.httpService.getData()), //Ловим последнее изменение подписки, отменяем предыдущие, подписываемся на запрос
    shareReplay() //Кэшируем данные что бы не вызывать каждый раз запрос для каждой подписки
  );

  constructor(private httpService: HttpService, public dialog: MatDialog) {}

  updateTodo(project_id: number, todo_id: number) { //Запрос на обновление задачи
    this.httpService.patchData(project_id, todo_id).subscribe(() => {
      this.dataUpdateTrigger$.next('update');// Подписка, чтобы включить триггер обновления списка задач
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
      this.dataUpdateTrigger$.next('create'); // Подписка, чтобы включить триггер обновления списка задач
    });
  }
  createToDo(data: ITodoDtm) { //Запрос на создание задачи
    return this.httpService.postData(data)
  }

  ngOnInit() {
  }
}
