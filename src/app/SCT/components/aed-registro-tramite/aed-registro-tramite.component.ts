import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Tramite } from '../../interfaces/tramite.interface';
import { RegistroTramiteModel } from '../../interfaces/registro-tramite.interface';
import { RegistroTramiteService } from '../../services/registro-tramite.service';

@Component({
  selector: 'app-aed-registro-tramite',
  templateUrl: './aed-registro-tramite.component.html'
})
export class AedRegistroTramiteComponent implements OnInit {

  @Output() resetForm : EventEmitter<void> = new EventEmitter();

  submitted !: boolean;
  tramiteDialog: boolean = false;

  re_tramite!: RegistroTramiteModel;

  tramite !: Tramite;

  constructor(
    private re_tramiteService: RegistroTramiteService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    
  }
  
  cargarDataEmit() {
    this.resetForm.emit();
  }

  abrirDialog() {
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

  confirmarRegistroTramite() {
    this.agregarTramite();
    this.cerrarDialog();

  }

  cerrarDialog() {
    this.tramiteDialog = false;
    this.submitted = false;
  }

  cargarReTramiteDialog(reTramite: RegistroTramiteModel){
    this.re_tramite = {...reTramite};
    this.abrirDialog();
  }

}
