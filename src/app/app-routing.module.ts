import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './errors/error404-page/error404-page.component';

const routes: Routes = [
/*   {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
  }, */
  {
    path: 'task',
    loadChildren: () => import('./task/task.module').then( m => m.TaskModule ),
/*     canActivate: [GuardService],
    canDeactivate: [GuardService] */
  } ,
  {
    path: '404',
    component: Error404PageComponent,
  },
  {
    path: '',
    redirectTo: 'task',
    pathMatch: 'full'
  } ,
  {
    path: '**',
    redirectTo: '404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
