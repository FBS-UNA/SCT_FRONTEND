import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RegistroTramiteModel } from '../../interfaces/registro-tramite.interface';
import { RegistroTramiteService } from '../../services/registro-tramite.service';

@Component({
  selector: 'app-confirmar-registro-tramite',
  templateUrl: './confirmar-registro-tramite.component.html'
})
export class ConfirmarRegistroTramite implements OnInit {

  @Output() resetForm : EventEmitter<void> = new EventEmitter();

  reTramiteDialog: boolean = false;

  re_tramite!: RegistroTramiteModel;

  constructor(
    private re_tramiteService: RegistroTramiteService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
  }
  
  resetFormEmit() {
    this.resetForm.emit();
  }

  abrirDialogConfirmacion() {
    this.reTramiteDialog = true;
  }

  agregarRegistroTramite() {
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

  cargarReTramiteDialog(reTramite: RegistroTramiteModel){
    this.re_tramite = {...reTramite};
    this.abrirDialogConfirmacion();
  }

}
