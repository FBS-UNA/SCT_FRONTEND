import { Component, OnInit, ViewChild } from '@angular/core';

import { Area } from '../../interfaces/area.interface';
import { AreasService } from '../../services/areas.service';
import { AsociarTramitesDialogComponent } from '../asociar-tramites-dialog/asociar-tramites-dialog.component';
import { TableCols } from '../../interfaces/table.interface';


import { Table } from 'primeng/table';
import { AEDAreaComponent } from '../aed-area/aed-area.component';
@Component({
  selector: 'app-tabla-areas',
  templateUrl: './tabla-areas.component.html',
  styles: [
  ]
})
export class TablaAreasComponent implements OnInit {


  @ViewChild(AsociarTramitesDialogComponent) asociarTramitesDialog !: AsociarTramitesDialogComponent;

  @ViewChild(AEDAreaComponent) AEDAreaDialog !: AEDAreaComponent;

  loading!: boolean;

  inputFiltro: string = '';

  areas: Area[] = [];

  cols: TableCols[] = [
    { field: 'ID_AREA', header: 'Código', style: 'width: 10%' },
    { field: 'NOMBRE_AREA', header: 'Nombre', style: 'width: 15%' },
    { field: 'DESCRIPCION_AREA', header: 'Descripción', style: 'width: 40%' },
    { field: 'FECHA', header: 'Fecha de creacion', style: 'width: 20%' },
    { field: '', header: '', style: 'width: 15%' },
  ]
  

  constructor(
    private areasService: AreasService,
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


  asociarTramites(area: Area){
    this.asociarTramitesDialog.idArea = area.ID_AREA!;
    this.asociarTramitesDialog.abrirDialog();
  }


  agregarAreaDialog(){
    this.AEDAreaDialog.agregarAreaDialog();
  }

  editarAreaDialog(area: Area) {
    this.AEDAreaDialog.editarAreaDialog(area);
  }

  eliminarAreaDialog(area: Area) {
    this.AEDAreaDialog.eliminarAreaDialog(area);
  }


  clear(table: Table) {
    table.clear();
    this.inputFiltro = '';
  }


}
