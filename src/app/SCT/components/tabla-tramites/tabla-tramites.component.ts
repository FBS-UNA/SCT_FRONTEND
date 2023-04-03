import { Component, OnInit, ViewChild } from '@angular/core';

import { TableCols } from '../../interfaces/table.interface';
import { Tramite } from '../../interfaces/tramite.interface';
import { TramitesService } from '../../services/tramites.service';

import { Table } from 'primeng/table';
import { AEDTramiteComponent } from '../aed-tramite/aed-tramite.component';

@Component({
  selector: 'app-tabla-tramites',
  templateUrl: './tabla-tramites.component.html',
  styles: [
  ]
})
export class TablaTramitesComponent implements OnInit {

  @ViewChild(AEDTramiteComponent) AEDTramiteDialog !: AEDTramiteComponent;

  loading !: boolean;
  
  inputFiltro: string = '';
  
  tramites: Tramite[] = [];


  cols: TableCols[] = [
    { field: 'ID_TRAMITE', header: 'Código', style: 'width: 10%' },
    { field: 'NOMBRE_TRAMITE', header: 'Nombre', style: 'width: 15%' },
    { field: 'DESCRIPCION_TRAMITE', header: 'Descripción', style: 'width: 30%' },
    { field: 'FECHA', header: 'Fecha de creación', style: 'width: 20%' },
    { field: 'ESTADO', header: 'Estado', style: 'width: 10%' },
    { field: '', header: '', style: 'width: 15%' },
  ]

  constructor(
    private tramitesService: TramitesService
  ) { }

  ngOnInit(): void {
    this.cargarTramites();
  }

  cargarTramites() {
    this.loading = true;
    this.tramitesService.getTramites().subscribe(OK => {
      if (OK) {
        this.loading = false;
        this.tramites = this.tramitesService.tramites;
      }
    });
  }

  agregarTramiteDialog(){
    this.AEDTramiteDialog.agregarTramiteDialog();
  }

  editarTramiteDialog(tramite: Tramite){
    this.AEDTramiteDialog.editarTramiteDialog(tramite);
  }

  eliminarTramiteDialog(tramite: Tramite){
    this.AEDTramiteDialog.eliminarTramiteDialog(tramite);
  }

  actualizarEstadoTramite(tramite: Tramite){
    this.AEDTramiteDialog.actualizarEstadoTramite(tramite);
  }

  clear(table: Table) {
    table.clear();
    this.inputFiltro = '';
  }
}
