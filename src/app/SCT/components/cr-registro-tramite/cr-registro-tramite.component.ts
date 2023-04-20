import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RegistroTramiteModel } from '../../interfaces/registro-tramite.interface';
import { FormularioRegistroTramiteComponent } from '../formulario-registro-tramite/formulario-registro-tramite.component';
import { RegistroTramiteService } from '../../services/registro-tramite.service';

@Component({
  selector: 'app-cr-regsitro-tramite',
  templateUrl: './cr-registro-tramite.component.html',
  styles: [
  ]
})
export class CRRegistroTramiteComponent implements OnInit {

  @Output() resetForm: EventEmitter<void> = new EventEmitter();

  reTramiteDialog: boolean = false;

  re_tramite!: RegistroTramiteModel;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private formularioRegistroTramite: FormularioRegistroTramiteComponent,
    private re_tramiteService: RegistroTramiteService,
  ) { }

  ngOnInit(): void {
  }

  limpiarDialog() {
    this.confirmationService.confirm({
      message: `¿Está seguro(a) de que desea limpiar el formulario?`,
      header: '¡Cuidado!',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.formularioRegistroTramite.resetearFormulario();
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `El formulario se ha limpiado correctamente` });
      }
    });
  }

  resetFormEmit() {
    this.resetForm.emit();
  }

  abrirDialogConfirmacion() {
    this.reTramiteDialog = true;
  }

  agregarRegistroTramite() {
    console.log(this.re_tramite)
    this.re_tramiteService.addRegistro(this.re_tramite).subscribe(res => {
      if (res.OK) {
        this.resetFormEmit();
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `El registro del trámite se ha agregado correctamente` });
      }
    });
  }

  confirmarRegistroTramite() {
    this.agregarRegistroTramite();
    this.cerrarDialogConfirmacion();

  }

  cerrarDialogConfirmacion() {
    this.reTramiteDialog = false;
  }

  cargarReTramiteDialog(reTramite: RegistroTramiteModel) {
    this.re_tramite = { ...reTramite };
    this.abrirDialogConfirmacion();
  }

}

