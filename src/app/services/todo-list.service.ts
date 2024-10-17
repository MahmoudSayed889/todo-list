import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor( private _HttpClient:HttpClient ) { }

  baseUrl:string = "https://freeapi.gerasim.in/api/JWT";


  getAllTasks():Observable<any> {

    return this._HttpClient.get(`${this.baseUrl}/GetAllTaskList`);
  }



  addNewTask(data:any):Observable<any> {

    
    return this._HttpClient.post(`${this.baseUrl}/CreateNewTask`, data);
  }


  updateTask(data:any):Observable<any> {

    
    return this._HttpClient.put(`${this.baseUrl}/UpdateTask`, data);
  }



  deleteTask(taskId:number):Observable<any> {

    // console.log(taskId +"ser");
    

    return this._HttpClient.delete(`${this.baseUrl}/DeleteTask?itemId=${taskId}`);
  }
  
}
