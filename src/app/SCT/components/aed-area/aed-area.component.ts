import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Area } from '../../interfaces/area.interface';
import { AreasService } from '../../services/areas.service';
import { TimestampService } from '../../services/timestamp.service';

@Component({
  selector: 'app-aed-area',
  templateUrl: './aed-area.component.html',
  styles: [
  ]
})
// A -> Add
// E -> Edit
// D -> Delete
export class AEDAreaComponent implements OnInit {

  @Output() refreshData = new EventEmitter<void>();

  submitted !: boolean;
  areaDialog: boolean = false;
  editando: boolean = false;

  area !: Area;

  constructor(
    private areasService: AreasService,
    private messageService: MessageService,
    private timestampService: TimestampService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
  }

  cargarDataEmit(){
    this.refreshData.emit();
  }

  abrirDialog(){
    this.areaDialog = true;
  }

  agregarAreaDialog(){
    this.area = {FECHA: this.timestampService.fechaActual};
    this.editando = false;
    this.submitted = false;
    this.areaDialog = true;
  }

  editarAreaDialog(area: Area){
    this.area = {...area};
    this.editando = true;
    this.areaDialog = true;
  }


  agregarArea(){
    this.areasService.addArea(this.area).subscribe(res=>{
      if(res.OK){
        this.cargarDataEmit();
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `El área llamada "${this.area.NOMBRE_AREA}" se ha agregado correctamente` });
      }
    });
  }

  actualizarArea(){
    this.areasService.updateArea(this.area).subscribe(res => {
      if (res.OK) {
        this.cargarDataEmit();
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `El área llamada "${this.area.NOMBRE_AREA}" se ha actualizado correctamente` });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Oh oh...', detail: `No se pudo actualizar el área llamada "${this.area.NOMBRE_AREA}"` });
      }
    });
  }

  guardarCambios() {
    this.submitted = true;
    this.editando ? this.actualizarArea() : this.agregarArea();
    this.areaDialog = false;
  }

  eliminarAreaDialog(area: Area) {
    this.confirmationService.confirm({
      message: `¿Está seguro(a) de que desea eliminar el área llamada ${area.NOMBRE_AREA}?`,
      header: '¡Cuidado!',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.areasService.deleteArea(area.ID_AREA!).subscribe(res => {
          if (res.OK) {
            this.cargarDataEmit()
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `El área llamada "${area.NOMBRE_AREA}" se ha eliminado correctamente` });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Oh oh...', detail: `No se pudo eliminar el área llamada "${area.NOMBRE_AREA}"` });

          }
        });
      }
    });
  }


  cerrarDialog() {
    this.areaDialog = false;
    this.submitted = false;
  }

}
