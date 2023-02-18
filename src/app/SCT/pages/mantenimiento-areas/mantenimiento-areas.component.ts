import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mantenimiento-areas',
  templateUrl: './mantenimiento-areas.component.html',
  styles: [
    `
    :host ::ng-deep .p-toolbar {
      background-color: white;
      border: none;
    }
    `
  ]
})
export class MantenimientoAreasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
