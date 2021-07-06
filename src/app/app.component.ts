import {Component, OnInit} from '@angular/core';
import { HttpService} from './http.service';
import {Project} from './todos';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {shareReplay, startWith, switchMap} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService]
})
export class AppComponent implements OnInit{
  dataUpdateTrigger$ = new BehaviorSubject('init');
  projects$: Observable<Project[]> = this.dataUpdateTrigger$.pipe(
    switchMap(() => this.httpService.getData()),
    shareReplay()
  );

  constructor(private httpService: HttpService, public dialog: MatDialog){}

  updateTodo (project_id: number, todo_id: number){
    this.httpService.patchData(project_id, todo_id).subscribe(()=>{
      this.dataUpdateTrigger$.next('update');
    })
  }
  openDialog(projects: Project[]): void {
    console.log(projects);
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {prjs: projects}
    });

    dialogRef.afterClosed().subscribe();}
  ngOnInit(){
  }
}
