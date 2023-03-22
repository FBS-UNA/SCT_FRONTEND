import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormularioRegistroTramiteComponent } from '../formulario-registro-tramite/formulario-registro-tramite.component';

@Component({
  selector: 'app-cr-regsitro-tramite',
  templateUrl: './cr-registro-tramite.component.html',
  styles: [
  ]
})
export class CRRegistroTramiteComponent implements OnInit {


  cancelarDialog: boolean = false;

  constructor(    
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private formularioRegistroTramite: FormularioRegistroTramiteComponent
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

}

