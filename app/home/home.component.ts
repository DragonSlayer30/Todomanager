import { DataService } from "../service/data.service";
import { Component, OnInit, Injectable, Inject} from "@angular/core";
import { Task } from "../models/task";

@Component({
  selector: "thx-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})

export class HomeComponent  {

    getAllTasks() {
      var tasksArr = this.dataService.GetAll();
      tasksArr.subscribe((value) => {
        this.tasks = value;
        this.taskCount = this.tasks.length;
    }, error => console.log('Error Loading tasks'));
  }

  getTaskbyId(id:number) {
      return this.dataService.Get(1).subscribe(data => {
        console.log(data);
        return data;
      }, error => console.log('Error Loading task'));
  }
  
  taskCount: number = 0;
    task_title: string = '';
    task_description: string = '';
    task_due: string;
    update_task = "update tasks";
    tasks = [];
    single_task:Task;
    
    constructor(@Inject(DataService) private dataService:DataService) {
        // this.tasks = this.dataService.GetAll().subscribe((value) => { return value});

     }

    ngOnInit() {
      this.getAllTasks();
      this.updateTaskText();
      this.getTaskbyId(1);
    }
    

    addTask():void {
      if(this.task_title.length > 0) {
        this.single_task = { id : 0, title: this.task_title, description: this.task_description, done: false, due: this.convert_date(this.task_due)};
        this.dataService.Create(this.single_task).subscribe(data => {
          console.log(data);
        });
        this.tasks.push(this.single_task);
        this.taskCount = this.tasks.length;
        this.task_description = "";
        this.task_title = "";
        this.task_due = undefined;
        this.updateTaskText();
        this.dataService.Delete(6).subscribe(data => {
          console.log(data);
        });
      }  
    }

    dropTask(i):void {
      this.tasks.splice(i,1);
      this.taskCount = this.tasks.length;
      this.updateTaskText();
    }

    markDone(i):void {

    }

    convert_date(due:string) {
      if(Date.parse(due) == NaN || due === undefined) return "";
      var split_date = due.split("-");
      return split_date[1] + "/" + split_date[2] + "/" + split_date[0];
    }

    updateTask():void {
      var temp_task =  [];
      var tasksToBeUpdated = [];
      this.tasks.forEach(element => {
        if(element.done) {
          tasksToBeUpdated.push(element);
        }
        else {
          temp_task.push(element);
        } 
      });
      this.tasks = temp_task;
      this.taskCount = this.tasks.length;
      this.updateTaskText();
    }

    updateTaskText():void {
      if(this.taskCount == 1) {
        this.update_task = "Update Task";
      }
      if(this.taskCount > 1) {
        this.update_task = "Update Tasks";
      }
      this.checkCount();
    }

    checkCount():boolean { 
      if( this.taskCount > 0) { return true;}
      else false;
    }

}
