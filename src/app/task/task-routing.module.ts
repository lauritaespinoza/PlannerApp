import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponentComponent } from './components/main-page-component/main-page-component.component';
import { FormTaskComponent } from './components/form-task-component/form-task-component.component';
import { ListTaskComponent } from './components/list-task-component/list-task-component.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponentComponent,
    children: [
      { path: 'new-task', component: FormTaskComponent },
      { path: 'list', component: ListTaskComponent },
      { path: 'edit/:id', component: FormTaskComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
