import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environments } from 'src/envitonments/environments';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getTask():Observable<Task[]> {
    return this.http.get<Task[]>(`${ this.baseUrl }/task`);
  }

  getTaskById( id: string ): Observable<Task|undefined> {
    return this.http.get<Task>(`${ this.baseUrl }/task/${ id }`)
      .pipe(
        catchError( error => of(undefined) )
      );
  }

  addNewtask(task:Task): Observable<Task> {
    return this.http.post<Task>(`${ this.baseUrl }/task`, task );
  }

  updateTask(newItem:Task): Observable<Task> {
      if ( !newItem.id ) throw Error('Task id is required');

      return this.http.patch<Task>(`${ this.baseUrl }/task/${ newItem.id }`, newItem );
  }

  deleteTask(id:string): Observable<boolean> {

    return this.http.delete(`${ this.baseUrl }/task/${ id }`)
      .pipe(
        map( resp => true ),
        catchError( err => of(false) ),
      );
  }
}
