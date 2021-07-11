import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { plainToClass } from 'class-transformer';
import { environment } from 'src/environments/environment';

import {Observable} from 'rxjs';
import {map, mapTo} from 'rxjs/operators';
import {ITodoDtm, Project, IProject} from "./todos";

@Injectable()
export class HttpService{

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient){ }

  getData(): Observable<Project[]>{
    return this.http.get(`${this.baseUrl}projects`).pipe(map((data) => {
      return plainToClass(Project, data  as IProject[]);
    }));
  }
  patchData(project_id: number, todo_id: number):Observable<Boolean>{
    return this.http.patch(`${this.baseUrl}projects/${project_id}/todos/${todo_id}`, {}).pipe(mapTo(true));
  }
  postData(todo: ITodoDtm):Observable<Project>{
    return this.http.post(`${this.baseUrl}todos`,  todo).pipe(map((value) => plainToClass(Project, value as IProject)));
  }
}
