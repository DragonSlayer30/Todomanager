import { DataService } from "../service/data.service";
import { Component, OnInit, Injectable, Inject} from "@angular/core";
import { Task } from "../models/task";

@Component({
  selector: "thx-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})

export class HomeComponent  {


  constructor(@Inject(DataService) private dataService:DataService) { }

  taskCount: number = 0;
  task_title: string = '';
  task_description: string = '';
  task_due: string;
  update_task = "update tasks";
  tasks = [];
  single_task:Task;
  temp_task:Task;

  ngOnInit() {
    this.getAllTasks();
    this.updateTaskText();
  }

  getAllTasks() {
      var tasksArr = this.dataService.GetAll();
      tasksArr.subscribe((value) => {
        this.tasks = value;
        this.taskCount = this.tasks.length;
        this.tasks.forEach(element => {
            element.showDescription = false;
            element.isChanged = false;
            element.edit = false;
        });
      }, error => alert('Error Loading tasks'));
  }

  getTaskbyId(id:number) { return this.dataService.Get(1).subscribe(data => { return data;}, error => alert('Error Loading task'));} 

  addTask():void {
      if(this.task_title.length > 0) {
        this.single_task = { id : 0, title: this.task_title, description: this.task_description, done: false, due: this.convert_date(this.task_due)};
        this.dataService.Create(this.single_task).subscribe(data => {
          this.single_task.id = data.id;
          alert("Successfully Created  Task");
        }, error => alert('Error Creatting tasks'));
        this.tasks.push(this.single_task);
        this.taskCount = this.tasks.length;
        this.task_description = "";
        this.task_title = "";
        this.task_due = undefined;
        this.updateTaskText();
      }  
  }

    dropTask(i):void {
      this.tasks.splice(i,1);
      this.taskCount = this.tasks.length;
      this.updateTaskText();
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
        if(element.isChanged) {
          tasksToBeUpdated.push(element);
        }
        else {
          temp_task.push(element);
        } 
      });
      tasksToBeUpdated.forEach(element => {
        this.dataService.Update(element.id, { id : element.id, title: element.title, description: element.description, done: element.done, due: this.convert_date(element.dueValue)}).subscribe(data => {          
      }, error => alert('Error updating tasks'));
      });
      alert("Updated Successfully");
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

    showDescription(task) {
      console.log(task);
      if(task.showDescription == undefined) task.showDescription = true;
      if(task.showDescription) task.showDescription  = false;
      else task.showDescription = true;
    }

    changeStatus(task) {
        if(task.isChanged == undefined) task.isChanged = false;
        if(task.isChanged) task.isChanged  = false;
        else task.isChanged = true;
    }

    deleteTask(task, index) {
        this.dataService.Delete(task.id).subscribe(data => {
          alert("Deleted Successfully");
          this.dropTask(index);
      }, error => alert('Error Deleting tasks'));
    }

    editTask(task) {
      task.edit = true;
      task.dueValue = this.reConvertDate(task.due);
      this.temp_task = { id : task.id, title: task.title, description: task.description, done: task.done, due: this.convert_date(task.dueValue)};
    }
    
    updateEditTask(task) {
        var single_task = { id : task.id, title: task.title, description: task.description, done: task.done, due: this.convert_date(task.dueValue)};
        this.dataService.Update(task.id, single_task).subscribe(data => {
          alert("Updated Successfully");
          task.edit = false;
          task.due = single_task.due;
      }, error => alert('Error Updating tasks'));
    }

    reConvertDate(due) {  
      if(Date.parse(due) == NaN || due === undefined || due.length == 0) return "";
      console.log(due);
      var split_date = due.split("/");
      if(split_date[2].length < 2) split_date[2] = "0" + split_date[2];
      if(split_date[1].length < 2) split_date[1] = "0" + split_date[1];
      if(split_date[0].length < 2) split_date[0] = "0" + split_date[0]; 
      return split_date[2] + "-" + split_date[0] + "-" + split_date[1];
    }

    cancelEditTask(task) {
      task.edit = false;
      this.task_description = "";
      this.task_title = "";
      this.task_due = undefined;
      task.title = this.temp_task.title;
      task.description = this.temp_task.description; 
      task.due = this.temp_task.due;
    } 
}
