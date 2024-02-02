import { Component, EventEmitter, Output, Input} from '@angular/core';
import { Task } from './task/interfaces/task.interface';
import { TaskServiceService } from './task/services/task-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'plannerApp';
}
