import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Area } from '../../interfaces/area.interface';
import { Tramite } from '../../interfaces/tramite.interface';
import { TramitesService } from '../../services/tramites.service';

@Component({
  selector: 'app-asociar-tramites-dialog',
  templateUrl: './asociar-tramites-dialog.component.html',
  styles: [
  ]
})
export class AsociarTramitesDialogComponent implements OnInit {
  asociarDialog: boolean = false;
  area: Area = {};

  tramitesHabilitados: Tramite[] = [];

  list2: Tramite[] = [];


  constructor(
    private tramitesService: TramitesService
  ) { }

  ngOnInit(): void {
    this.cargarTramitesHabilitados();
    this.cargarTramitesAsociados();
  }
  cargarTramitesHabilitados() {
    this.tramitesService.getTramitesHabilitados().subscribe(res => {
      if (res.OK === true) {
        this.tramitesHabilitados = res.TRAMITES;
      }
    });
  }
  cargarTramitesAsociados() {

  }

  abrirDialog() {
    this.asociarDialog = true;
    console.log(this.area);
  }

  cerrarDialog() {
    this.asociarDialog = false;
  }

  guardarCambios() {

  }

}
