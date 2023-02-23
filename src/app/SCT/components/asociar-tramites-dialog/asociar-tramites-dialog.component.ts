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

  tramitesNoAsociados: Tramite[] = [];
  tramitesAsociados: Tramite[] = [];
  


  constructor(
    private tramitesService: TramitesService
  ) { }

  ngOnInit(): void {
    this.cargarTramitesAsociados();
  }

  cargarTramitesAsociados() {
    this.tramitesService.getTramitesAsociados(this.area.ID_AREA!).subscribe(res => {
      if (res.OK === true) {
        this.tramitesAsociados = res.TRAMITES;
      }
    });
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
