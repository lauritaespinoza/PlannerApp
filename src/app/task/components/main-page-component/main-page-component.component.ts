import { Component } from '@angular/core';

@Component({
  selector: 'main-page-component',
  templateUrl: './main-page-component.component.html',
  styleUrls: []
})
export class MainPageComponentComponent {

  constructor() {}

  public sidebarItems = [
    { label: 'Lista de Tareas', icon: 'label', url: './list' },
    { label: 'Agregar Tareas', icon: 'add', url: './new-task' },
  ]
}
