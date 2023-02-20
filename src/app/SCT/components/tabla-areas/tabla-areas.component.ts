import { Component, OnInit } from '@angular/core';
import { Area } from '../../interfaces/area.interface';
import { AreasService } from '../../services/areas.service';
import { TimestampService } from '../../services/timestamp.service';
import { TableCols } from '../../interfaces/table.interface';

import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-tabla-areas',
  templateUrl: './tabla-areas.component.html',
  styles: [
  ]
})
export class TablaAreasComponent implements OnInit {

  loading!: boolean;
  submitted !: boolean;
  areaDialog: boolean = false;
  editando: boolean = false;
  inputFiltro: string = '';

  areas: Area[] = [];
  area !: Area;

  cols: TableCols[] = [
    { field: 'ID_AREA', header: 'Código', style: 'width: 10%' },
    { field: 'NOMBRE_AREA', header: 'Nombre', style: 'width: 15%' },
    { field: 'DESCRIPCION_AREA', header: 'Descripción', style: 'width: 45%' },
    { field: 'FECHA', header: 'Fecha de creacion', style: 'width: 20%' },
    { field: '', header: '', style: 'width: 10%' },
  ]
  

  constructor(
    private areasService: AreasService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private timestampService: TimestampService
  ) { }

  ngOnInit(): void {
    this.cargarAreas();
  }

  cargarAreas() {
    this.loading= true;
    this.areasService.getAreas().subscribe(OK => {
      if (OK) {
        this.loading = false;
        this.areas = this.areasService.areas;
      }
    });
  }

  agregarAreaDialog(){
    this.area = {FECHA: this.timestampService.fechaActual};
    this.editando = false;
    this.submitted = false;
    this.areaDialog = true;
  }

  editarAreaDialog(area: Area) {
    this.area = { ...area };
    this.editando = true;
    this.areaDialog = true;
  }

  eliminarAreaDialog(area: Area) {
    this.confirmationService.confirm({
      message: `¿Está seguro(a) de que desea eliminar el área llamada ${area.NOMBRE_AREA}?`,
      header: '¡Cuidado!',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.areasService.deleteArea(area.ID_AREA!).subscribe(res => {
          if (res.OK) {
            this.cargarAreas()
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `El área llamada "${area.NOMBRE_AREA}" se ha eliminado correctamente` });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Oh oh...', detail: `No se pudo eliminar el área llamada "${area.NOMBRE_AREA}"` });

          }
        });
      }
    });
  }

  cerrarDialog() {
    this.areaDialog = false;
    this.submitted = false;
  }

  agregarArea(){
    this.areasService.addArea(this.area).subscribe(res=>{
      if(res.OK){
        this.cargarAreas();
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `El área llamada "${this.area.NOMBRE_AREA}" se ha agregado correctamente` });
      }
    });
  }

  actualizarArea(){
    this.areasService.updateArea(this.area).subscribe(res => {
      if (res.OK) {
        this.cargarAreas()
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `El área llamada "${this.area.NOMBRE_AREA}" se ha actualizado correctamente` });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Oh oh...', detail: `No se pudo actualizar el área llamada "${this.area.NOMBRE_AREA}"` });
      }
    });
  }

  guardarCambios() {
    this.submitted = true;
    this.editando ? this.actualizarArea() : this.agregarArea();
    this.areaDialog = false;
  }



  clear(table: Table) {
    table.clear();
    this.inputFiltro = '';
  }


}
