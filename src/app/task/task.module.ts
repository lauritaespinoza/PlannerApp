import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListTaskComponent } from './components/list-task-component/list-task-component.component';
import { FormTaskComponent } from './components/form-task-component/form-task-component.component';
import { MainPageComponentComponent } from './components/main-page-component/main-page-component.component';
import { MaterialModule } from '../material/material.module';
import { TaskRoutingModule } from './task-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    TaskRoutingModule
  ],
  declarations: [
    ListTaskComponent,
    FormTaskComponent,
    MainPageComponentComponent],
  providers: [],
})
export class TaskModule { }
