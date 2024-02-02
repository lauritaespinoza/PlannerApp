import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskServiceService } from '../../services/task-service.service';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs';

@Component({
  selector: 'form-task-component',
  templateUrl: './form-task-component.component.html',
  styleUrls: []
})
export class FormTaskComponent implements OnInit {

  constructor(
    private router: Router,
     private snackbar: MatSnackBar,
     private taskService: TaskServiceService,
     private activatedRoute: ActivatedRoute,
     private dialog: MatDialog,
   ) {}

   public task:Task = {
    id:'',
    name:'',
    details:'',
    status:''
  };

  ngOnInit(): void {
    if ( !this.router.url.includes('edit') ) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.taskService.getTaskById( id ) ),

      ).subscribe( task => {

        if ( !task ) {
          return this.router.navigateByUrl('/');
        }
        this.task.id = task.id;
        this.task.name = task.name;
        this.task.details = task.details
        this.task.status = task.status;

        task.name= '';
        task.details='';
        return;
      });
  }

  showSnackbar( message: string ):void {
    this.snackbar.open( message, 'done', {
      duration: 2500,
    })
  }

  onSubmit():void {
    if (!this.task.name || !this.task.details) {
      this.showSnackbar('Campo requerido');
      throw Error('Campo requerido');
    }

    if ( this.task.id ) {
      this.taskService.updateTask( this.task )
        .subscribe( response => {
          this.showSnackbar(`${this.task.name } actualizado!`);
          this.router.navigate(['/task/list']);
        }
      )
      return;
    }

    const randomNumber = Math.floor(Math.random() * 900) + 100;

    this.taskService.addNewtask({
      id: randomNumber.toString() ,
      name: this.task.name,
      details:  this.task.details,
      status: 'to do'
    }).subscribe(
      response => {
        this.showSnackbar(`${ this.task.name } creada!`);
        this.router.navigate(['/task/list']);
      },
      error => {
        this.showSnackbar('Error al guardar la tarea');
      }
    );
  }
}
