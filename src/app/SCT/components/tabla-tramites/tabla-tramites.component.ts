import { Component, OnInit } from '@angular/core';

import { TableCols } from '../../interfaces/table.interface';
import { Tramite } from '../../interfaces/tramite.interface';
import { TimestampService } from '../../services/timestamp.service';
import { TramitesService } from '../../services/tramites.service';

import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-tabla-tramites',
  templateUrl: './tabla-tramites.component.html',
  styles: [
  ]
})
export class TablaTramitesComponent implements OnInit {

  loading !: boolean;
  submitted !: boolean;
  editando: boolean = false;
  tramiteDialog: boolean = false;
  inputFiltro: string = '';
  
  tramites: Tramite[] = [];
  tramite !: Tramite;

  cols: TableCols[] = [
    { field: 'ID_TRAMITE', header: 'Código', style: 'width: 10%' },
    { field: 'NOMBRE_TRAMITE', header: 'Nombre', style: 'width: 15%' },
    { field: 'DESCRIPCION_TRAMITE', header: 'Descripción', style: 'width: 35%' },
    { field: 'FECHA', header: 'Fecha de creacion', style: 'width: 20%' },
    { field: 'ESTADO', header: 'Estado', style: 'width: 10%' },
    { field: '', header: '', style: 'width: 10%' },
  ]

  constructor(
    private tramitesService: TramitesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private timestampService: TimestampService
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
    this.tramite = {FECHA: this.timestampService.fechaActual};
    this.editando = false;
    this.submitted = false;
    this.tramiteDialog = true;
  }

  editarTramiteDialog(tramite: Tramite){
    this.tramite = { ...tramite };
    this.editando = true;
    this.tramiteDialog = true;
  }

  eliminarTramiteDialog(tramite: Tramite){
    this.confirmationService.confirm({
      message: `¿Está seguro(a) de que desea eliminar el trámite llamado ${tramite.NOMBRE_TRAMITE}?`,
      header: '¡Cuidado!',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.tramitesService.deleteTramite(tramite.ID_TRAMITE!).subscribe(res => {
          if (res.OK) {
            this.cargarTramites()
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `El trámite llamado "${tramite.NOMBRE_TRAMITE}" se ha eliminado correctamente` });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Oh oh...', detail: `No se pudo eliminar el trámite llamado "${tramite.NOMBRE_TRAMITE}"` });

          }
        });
      }
    });
  }

  cerrarDialog(){
    this.tramiteDialog = false;
    this.submitted = false;
  }

  agregarTramite(){
    this.tramitesService.addTramite(this.tramite).subscribe(res=>{
      if(res.OK){
        this.cargarTramites();
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `El trámite llamado "${this.tramite.NOMBRE_TRAMITE}" se ha agregado correctamente` });
      }
    });
  }

  actualizarTramite(){
    this.tramitesService.updateTramite(this.tramite).subscribe(res => {
      if (res.OK) {
        this.cargarTramites()
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `El trámite llamado "${this.tramite.NOMBRE_TRAMITE}" se ha actualizado correctamente` });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Oh oh...', detail: `No se pudo actualizar el trámite llamado "${this.tramite.NOMBRE_TRAMITE}"` });
      }
    });
  }

  actualizarEstadoTramite(tramite: Tramite){

    this.confirmationService.confirm({
      message: `¿Está seguro(a) de que desea cambiar el estado del trámite llamado ${tramite.NOMBRE_TRAMITE}?`,
      header: '¡Cuidado!',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.tramitesService.updateEstadoTramite(tramite).subscribe(res=>{
          if(res.OK == true){
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `El estado del trámite llamado "${this.tramite.NOMBRE_TRAMITE}" se ha actualizado correctamente` });
          }else{
            this.messageService.add({ severity: 'error', summary: 'Oh oh', detail: `El estado del trámite llamado "${this.tramite.NOMBRE_TRAMITE}" no se pudo cambiar` });
          }
        });
      },
      reject: ()=>{
        tramite.ESTADO = !tramite.ESTADO;
      }
    });

  }

  guardarCambios(){
    this.submitted = true;
    this.editando ? this.actualizarTramite() : this.agregarTramite();
    this.tramiteDialog = false;
    
  }

  clear(table: Table) {
    table.clear();
    this.inputFiltro = '';
  }
}
