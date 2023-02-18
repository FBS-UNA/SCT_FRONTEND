import { Component, OnInit } from '@angular/core';
import { Area } from '../../interfaces/area.interface';
import { AreasService } from '../../services/areas.service';

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


  constructor(
    private areasService: AreasService
  ) { }

  ngOnInit(): void {
    this.areasService.getAreas();
  }

  get areas(){
    return this.areasService.areas;
  }

}
