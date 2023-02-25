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
  idArea!: number;

  tramitesAsociados: Tramite[] = [];
  tramitesNoAsociados: Tramite[] = [];

  tramitesTemp !: Tramite[];
  


  constructor(
    private tramitesService: TramitesService
  ) { }

  ngOnInit(): void {
  }

  cargarTramitesAsociados() {
    this.tramitesService.getTramitesAsociados(this.idArea).subscribe(res => {
      if (res.OK === true) {
        this.tramitesAsociados = [...res.LISTA_TRAMITES_ASOCIADOS];
        this.tramitesTemp = [...res.LISTA_TRAMITES_ASOCIADOS];
      }
    });
  }

  cargarTramitesNoAsociado(){
    this.tramitesService.getTramitesNoAsociados(this.idArea).subscribe(res => {
      if (res.OK === true) {
        this.tramitesNoAsociados = [...res.LISTA_TRAMITES_NO_ASOCIADOS];
      }
    });
  }

  abrirDialog() {
    this.asociarDialog = true;
    this.cargarTramitesAsociados();
    this.cargarTramitesNoAsociado();
  }

  cerrarDialog() {
    this.asociarDialog = false;
    this.tramitesAsociados = [];
    this.tramitesNoAsociados = [];
    this.tramitesTemp = [];
  }

  guardarCambios() {
    let listaEliminar: Tramite[] = this.tramitesTemp.filter((elem) => !this.tramitesAsociados.some((t) => t.ID_TRAMITE === elem.ID_TRAMITE));

    let listAgregar: Tramite[] = this.tramitesAsociados.filter((elem) => !this.tramitesTemp.some((t) => t.ID_TRAMITE === elem.ID_TRAMITE));


    this.realizarActualizacion(listAgregar, listaEliminar);
    
    this.cerrarDialog();
  }

  realizarActualizacion(listaAgregar: Tramite[], listaEliminar: Tramite[]): void{

    listaAgregar.forEach(tramite=>{
      this.tramitesService.asociarTramite(this.idArea, tramite.ID_TRAMITE!).subscribe();
    })

    listaEliminar.forEach(tramite=>{
      this.tramitesService.desasociarTramite(this.idArea, tramite.ID_TRAMITE!).subscribe();
    })
    

    
  }

}
