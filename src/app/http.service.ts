import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { plainToClass } from 'class-transformer';

import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {ITodoDtm, Project} from "./todos";

@Injectable()
export class HttpService{

  constructor(private http: HttpClient){ }
  base_url = 'https://aqueous-reaches-03865.herokuapp.com/';
  getData(): Observable<Project[]>{
    return this.http.get(`${this.base_url}projects`).pipe(map((data:any)=>{
        return data.map(function(prj: any): Project {
        return new Project(prj.id, prj.title, prj.todos);
      });
    }));
  }
  patchData(project_id: number, todo_id: number):Observable<any>{
    return this.http.patch(`${this.base_url}projects/${project_id}/todos/${todo_id}`, {});
  }
  postData(project_id: number, todo: ITodoDtm):Observable<any>{
    return this.http.post(`${this.base_url}todos`, {project_id, todo});
  }
}
