import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';

export const routes: Routes = [

    {path:"", redirectTo:"task-list", pathMatch:"full"},
    {path:"task-list", component:TaskListComponent},


    {path:"**", redirectTo:"task-list", pathMatch:"full"}
];
