import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormularioRegistroTramiteComponent } from '../formulario-registro-tramite/formulario-registro-tramite.component';

@Component({
  selector: 'app-cancelar-dialog-rt',
  templateUrl: './cancelar-dialog-rt.component.html',
  styles: [
  ]
})
export class CancelarDialogRTComponent implements OnInit {


  display: boolean = false;

  constructor(    
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private formularioRegistroTramite: FormularioRegistroTramiteComponent
  ) { }

  ngOnInit(): void {
  }

  mostrarDialog() {
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

}

