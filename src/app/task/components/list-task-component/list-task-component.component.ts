import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { TaskServiceService } from '../../services/task-service.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { filter, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'list-task-component',
  templateUrl: './list-task-component.component.html',
  styleUrls: []
})
export class ListTaskComponent implements OnInit{

  public listTask:Array<Task>=[];
  displayedColumns: string[] = ['id', 'name', 'details', 'status', 'accion'];
  clickedRows = new Set<Task>();

  constructor(
    private taskService: TaskServiceService,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.taskService.getTask()
      .subscribe( task => this.listTask = task );
  }

  statusSelected(element: Task){
    if (element.id) {
      this.taskService.updateTask( element )
        .subscribe( task => {
          this.showSnackbar('Estado actualizado');
        });
      }
  }

  onEditTask(element: Task){
    this.router.navigate(['task/edit', element.id]);
  }

  onDeleteTask(element: Task) {
    const id = element.id;
    if ( !id ) throw Error('Task id is required');
    const dialogRef = this.dialog.open( ConfirmDialogComponent, {
      data :element.name
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result ),
        switchMap( () => this.taskService.deleteTask(id)),
        filter( (wasDeleted: boolean) => wasDeleted ),
      )
      .subscribe(() => {
        this.taskService.getTask().subscribe(updatedList => {
          this.listTask = updatedList;
        });

        this.router.navigate(['task/list']);
      });
    }
    showSnackbar( message: string ):void {
      this.snackbar.open( message, 'done', {
        duration: 2500,
      })
    }
}
