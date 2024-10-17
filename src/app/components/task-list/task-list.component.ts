import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TodoListService } from '../../services/todo-list.service';
import { Itask } from '../../interfaces/itask';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchPipe } from "../../pipes/search.pipe";
import { LoadingScreenComponent } from '../loading-screen/loading-screen.component';



@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, SearchPipe, LoadingScreenComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {

  @ViewChild('btnClose') btnClose : ElementRef | undefined

  constructor( private _TodoListService:TodoListService ) {}

  allTasks!:Itask[];

  searchTerm:string = '';

  isLoading:boolean = false;



  ngOnInit(): void {

    this.isLoading = true;
    
    this.getTasks()
  }




  


  addForm:FormGroup = new FormGroup ({

    itemId:new FormControl(0),
    taskName:new FormControl(null, [Validators.required]),
    taskDescription:new FormControl(null),
    dueDate:new FormControl("2024-10-17T07:12:57.070Z"),
    createdOn:new FormControl("2024-10-17T07:12:57.070Z"),
    isCompleted:new FormControl(false),
    tags:new FormControl("null"),
    completedOn:new FormControl("2024-10-17T07:12:57.070Z")

  })




  getTasks() {

    this._TodoListService.getAllTasks().subscribe({

      next: (res) => {
        
        this.allTasks = res.data;
        this.isLoading = false;
      }
    })
  }


  add(form:FormGroup) {

    this.isLoading = true;


    this._TodoListService.addNewTask(form.value).subscribe({
      next:()=>{
        
        this.getTasks();
        this.btnClose?.nativeElement.click();
      }
    });
    
  }


  completed(e:any, task:Itask) {

    this.isLoading = true;

    let updateTask = {

      itemId: task.itemId,
      taskName: task.taskName,
      taskDescription: task.taskDescription,
      dueDate: task.dueDate,
      createdOn: task.createdOn,
      isCompleted: task.isCompleted,
      tags: task.tags,
      completedOn: task.completedOn
    } 



    if(e.target.checked) {


      updateTask.isCompleted = e.target.checked;

      this._TodoListService.updateTask(updateTask).subscribe({
        next: ()=>{
          
          this.getTasks();
        }
      })

    } else {



      updateTask.isCompleted = false;

      this._TodoListService.updateTask(updateTask).subscribe({
        next: ()=>{
          
          this.getTasks();
        }
      })

    }

    
  }




  delete(taskId:number){

    this.isLoading = true;
    
    this._TodoListService.deleteTask(taskId).subscribe({
      next: (res)=>{
        
        this.getTasks();
      }
    });
  }
  
}
