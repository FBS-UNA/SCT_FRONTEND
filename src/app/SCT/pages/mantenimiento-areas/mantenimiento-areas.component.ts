import { Component, OnInit } from '@angular/core';

import { Area } from '../../interfaces/area.interface';
import { AreasService } from '../../services/areas.service';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

interface TableCols {
  field: string;
  header: string;
  style: string;
}

@Component({
  selector: 'app-mantenimiento-areas',
  templateUrl: './mantenimiento-areas.component.html',
  styles: [
    `
    `
  ]
})
export class MantenimientoAreasComponent implements OnInit {

  loading: boolean = true;
  areas: Area[] = [];
  areaDialog: boolean = false;
  areaEditada !: Area;
  submitted !: boolean;

  cols: TableCols[] = [
    { field: 'ID_AREA', header: 'Código', style: 'width: 10%' },
    { field: 'NOMBRE_AREA', header: 'Nombre', style: 'width: 15%' },
    { field: 'DESCRIPCION_AREA', header: 'Descripción', style: 'width: 45%' },
    { field: 'FECHA', header: 'Fecha de creacion', style: 'width: 20%' },
    { field: '', header: '', style: 'width: 20%' },
  ]

  constructor(
    private areasService: AreasService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
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

  eliminarArea(area: Area) {
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de que desea eliminar el área de ' + area.NOMBRE_AREA + '?',
      header: '¡Cuidado!',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.areasService.deleteArea(area.ID_AREA).subscribe(res => {
          if (res.OK) {
            const indexAreaEliminada = this.areas.findIndex(val => val.ID_AREA == area.ID_AREA);
            this.areas.splice(indexAreaEliminada, 1);
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `El área de ${area.NOMBRE_AREA} se ha eliminado correctamente` });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Oh oh...', detail: `No se pudo eliminar el área de ${area.NOMBRE_AREA}` });

          }
        });
      }
    });
  }

  guardarCambios() {
    this.submitted = true;

    this.areasService.updateArea(this.areaEditada).subscribe(res => {
      if (res.OK) {
        const indexAreaActualizada = this.areas.findIndex(val => val.ID_AREA == this.areaEditada.ID_AREA);
        this.areas[indexAreaActualizada] = this.areaEditada;
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `El área de ${this.areaEditada.NOMBRE_AREA} se ha actualizado correctamente` });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Oh oh...', detail: `No se pudo actualizar el área de ${this.areaEditada.NOMBRE_AREA}` });
      }
    });

    this.areaDialog = false;

  }

  clear(table: Table) {
    table.clear();
  }

  editarArea(area: Area) {
    this.areaEditada = { ...area };
    this.areaDialog = true;
  }


  cerrarDialog() {
    this.areaDialog = false;
    this.submitted = false;
  }

}
