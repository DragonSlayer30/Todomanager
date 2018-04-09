import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Task } from '../models/task';
import { ITaskService } from './Itask.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from "rxjs/Rx";

@Injectable()
export class DataService implements ITaskService {


  BASE_URL:string  = "http://localhost:3000/";
  getAllTasks = this.BASE_URL + "tasks";
  getSingle = this.getAllTasks + "/";
  createTask = this.getAllTasks;
  deleteTask = this.getSingle;
  constructor(@Inject(HttpClient)private http:HttpClient ) {
    
   }

 

  GetAllOld() {
    var data_obj = { tasks_arr: [] };
    var behaviour_tasks = <BehaviorSubject<Task[]>>new BehaviorSubject([]);
    var task_obser = behaviour_tasks.asObservable();   
    this.http.get<Task[]>(this.getAllTasks).subscribe(data => {
      data_obj.tasks_arr = data;
      behaviour_tasks.next(Object.assign({}, data_obj).tasks_arr);
    }, error => console.log('Error Loading tasks'));
      return behaviour_tasks;
    }

    GetAll() {
      var all_tasks = new Observable<Task[]>();
      return this.http.get<Task[]>(this.getAllTasks);
    }

   Get(id: number) {
    var data_obj = new Observable<Task>();
    return this.http.get<Task>(this.getSingle + id);
   } 

   Create(task: Task) {
     return this.http.post<Task>(this.createTask, task);
   }

   Delete(id: number){
    //this.http.delete(this.deleteTask + id).subscribe();
      return this.http.delete<boolean>(this.deleteTask + id);
    }

   Update(id: number, task: Task) {
     return this.http.put<Task>(this.getSingle + id, task);
   }

}