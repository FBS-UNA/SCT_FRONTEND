import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
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

    :host ::ng-deep .p-button {
        margin-right: .5rem;
    }

    :host ::ng-deep .p-buttonset {
        .p-button {
            margin-right: 0;
        }
    }

    :host ::ng-deep .sizes {
        .button {
            margin-bottom: .5rem;
            display: block;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }

    @media screen and (max-width: 960px) {
        .p-button {
            margin-bottom: .5rem;

            &:not(.p-button-icon-only) {
                display: flex;
                width: 100%;
            }
        }

        .p-buttonset {
            .p-button {
                margin-bottom: 0;
            }
        }
    }

    `
  ]
})
export class MantenimientoAreasComponent implements OnInit {


  first = 0;
  loading: boolean = true;
  areas: Area[] = [];

  constructor(
    private areasService: AreasService
  ) { }

  ngOnInit(): void {
    this.cargarAreas();
  }

  cargarAreas() {
    this.areasService.getAreas().subscribe(OK => {
      if (OK) {
        this.loading = false;
        this.areas = this.areasService.areas;
      }
    });
  }

  clear(table: Table) {
    table.clear();
  }

}
