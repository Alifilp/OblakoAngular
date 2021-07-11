import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { plainToClass } from 'class-transformer';
import { environment } from 'src/environments/environment';

import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {ITodoDtm, Project} from "./todos";

@Injectable()
export class HttpService{

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient){ }

  getData(): Observable<Project[]>{
    return this.http.get(`${this.baseUrl}projects`).pipe(map((data: any) => {
      return plainToClass(Project, data);
    }));
  }
  patchData(project_id: number, todo_id: number):Observable<any>{
    return this.http.patch(`${this.baseUrl}projects/${project_id}/todos/${todo_id}`, {});
  }
  postData(todo: ITodoDtm):Observable<any>{
    return this.http.post(`${this.baseUrl}todos`,  todo);
  }
}
