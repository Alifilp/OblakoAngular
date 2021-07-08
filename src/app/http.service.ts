import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { plainToClass } from 'class-transformer';

import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {ITodoDtm, Project} from "./todos";

@Injectable()
export class HttpService{

  base_url = 'https://aqueous-reaches-03865.herokuapp.com/';
  constructor(private http: HttpClient){ }

  getData(): Observable<Project[]>{
    return this.http.get(`${this.base_url}projects`).pipe(map((data: any) => {
      return plainToClass(Project, data);
    }));
  }
  patchData(project_id: number, todo_id: number):Observable<any>{
    return this.http.patch(`${this.base_url}projects/${project_id}/todos/${todo_id}`, {});
  }
  postData(todo: ITodoDtm):Observable<any>{
    return this.http.post(`${this.base_url}todos`,  todo);
  }
}
