import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Tramite } from '../../interfaces/tramite.interface';
import { TimestampService } from '../../services/timestamp.service';
import { RegistroTramiteModel } from '../../interfaces/registro-tramite.interface';
import { RegistroTramiteService } from '../../services/registro-tramite.service';

@Component({
  selector: 'app-aed-registro-tramite',
  templateUrl: './aed-registro-tramite.component.html'
})
export class AedRegistroTramiteComponent implements OnInit {

  @Output() refreshData = new EventEmitter<void>();

  submitted !: boolean;
  editando: boolean = false;
  tramiteDialog: boolean = false;

  re_tramite!: RegistroTramiteModel;

  tramite !: Tramite;

  constructor(
    private re_tramiteService: RegistroTramiteService,
    private messageService: MessageService,
    private timestampService: TimestampService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    
  }

  cargarDataEmit() {
    this.refreshData.emit();
  }

  abrirDialog() {
    this.tramiteDialog = true;
  }

  agregarTramiteDialog() {
    this.tramite = { FECHA: this.timestampService.fechaActual };
    this.editando = false;
    this.submitted = false;
    this.tramiteDialog = true;
  }

  editarTramiteDialog(tramite: Tramite) {
    this.tramite = { ...tramite };
    this.editando = true;
    this.tramiteDialog = true;
  }


  agregarTramite() {
    this.re_tramiteService.addRegistro(this.re_tramite).subscribe(res => {
      if (res.OK) {
        this.cargarDataEmit();
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `El registro del trámite se ha agregado correctamente` });
      }
    });
  }
/*
  actualizarTramite() {
    this.tramitesService.updateTramite(this.tramite).subscribe(res => {
      if (res.OK) {
        this.cargarDataEmit()
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `El trámite llamado "${this.tramite.NOMBRE_TRAMITE}" se ha actualizado correctamente` });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Oh oh...', detail: `No se pudo actualizar el trámite llamado "${this.tramite.NOMBRE_TRAMITE}"` });
      }
    });
  }
*/
  confirmarRegistroTramite() {
    this.agregarTramite();
    this.tramiteDialog = false;

  }
/*
  eliminarTramiteDialog(tramite: Tramite) {
    this.confirmationService.confirm({
      message: `¿Está seguro(a) de que desea eliminar el trámite llamado ${tramite.NOMBRE_TRAMITE}?`,
      header: '¡Cuidado!',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.tramitesService.deleteTramite(tramite.ID_TRAMITE!).subscribe(res => {
          if (res.OK) {
            this.cargarDataEmit();
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `El trámite llamado "${tramite.NOMBRE_TRAMITE}" se ha eliminado correctamente` });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Oh oh...', detail: `No se pudo eliminar el trámite llamado "${tramite.NOMBRE_TRAMITE}"` });

          }
        });
      }
    });
  }*/
/*
  actualizarEstadoTramite(tramite: Tramite) {

    this.confirmationService.confirm({
      message: `¿Está seguro(a) de que desea cambiar el estado del trámite llamado ${tramite.NOMBRE_TRAMITE}?`,
      header: '¡Cuidado!',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.tramitesService.updateEstadoTramite(tramite).subscribe(res => {
          if (res.OK == true) {
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `El estado del trámite llamado "${tramite.NOMBRE_TRAMITE}" se ha actualizado correctamente` });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Oh oh', detail: `El estado del trámite llamado "${tramite.NOMBRE_TRAMITE}" no se pudo cambiar` });
          }
        });
      },
      reject: () => {
        tramite.ESTADO = !tramite.ESTADO;
      }
    });

  }*/


  cerrarDialog() {
    this.tramiteDialog = false;
    this.submitted = false;
  }

  cargarReTramiteDialog(reTramite: RegistroTramiteModel){
    //console.log(reTramite);
    this.re_tramite = {...reTramite};
    this.tramiteDialog = true;
  }

}
