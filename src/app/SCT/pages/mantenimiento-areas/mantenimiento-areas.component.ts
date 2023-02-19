import { Component, OnInit } from '@angular/core';

import { Area } from '../../interfaces/area.interface';
import { AreasService } from '../../services/areas.service';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { TimestampService } from '../../services/timestamp.service';

interface TableCols {
  field: string;
  header: string;
  style: string;
}

@Component({
  selector: 'app-mantenimiento-areas',
  templateUrl: './mantenimiento-areas.component.html',
  styles: []
})
export class MantenimientoAreasComponent implements OnInit {

  loading!: boolean;
  areas: Area[] = [];
  areaDialog: boolean = false;
  area !: Area;
  submitted !: boolean;
  editando: boolean = false;

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
    private confirmationService: ConfirmationService,
    private timestampService: TimestampService
  ) { }

  ngOnInit(): void {
    this.cargarData();
  }

  cargarData() {
    this.loading= true;
    this.areasService.getAreas().subscribe(OK => {
      if (OK) {
        this.loading = false;
        this.areas = this.areasService.areas;
      }
    });
  }

  areaNueva(){
    this.area = {FECHA: this.timestampService.fechaActual}
    this.editando = false;
    this.submitted = false;
    this.areaDialog = true;
  }

  eliminarArea(area: Area) {
    this.confirmationService.confirm({
      message: '¿Está seguro(a) de que desea eliminar el área de ' + area.NOMBRE_AREA + '?',
      header: '¡Cuidado!',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.areasService.deleteArea(area.ID_AREA!).subscribe(res => {
          if (res.OK) {
            this.cargarData()
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

    this.editando ? this.actualizarArea() : this.agregarArea();

    this.areaDialog = false;
  }

  actualizarArea(){
    this.areasService.updateArea(this.area).subscribe(res => {
      if (res.OK) {
        this.cargarData()
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `El área de ${this.area.NOMBRE_AREA} se ha actualizado correctamente` });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Oh oh...', detail: `No se pudo actualizar el área de ${this.area.NOMBRE_AREA}` });
      }
    });
  }

  agregarArea(){
    this.areasService.addArea(this.area).subscribe(res=>{
      if(res.OK){
        this.cargarData();
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `El área de ${this.area.NOMBRE_AREA} se ha agregado correctamente` });
      }
    });

  }

  clear(table: Table) {
    table.clear();
  }

  editarArea(area: Area) {
    this.area = { ...area };
    this.editando = true;
    this.areaDialog = true;
  }


  cerrarDialog() {
    this.areaDialog = false;
    this.submitted = false;
  }

}
