import { Component, OnInit } from '@angular/core';
import { TableCols } from '../../interfaces/table.interface';
import { Reporte } from '../../interfaces/reporte.interface';
import { Table } from 'primeng/table';
import { ReporteService } from '../../services/reporte.service';

@Component({
  selector: 'app-tabla-reporte-tramites',
  templateUrl: './tabla-reporte-tramites.component.html',
  styles: [
  ]
})
export class TablaReporteTramitesComponent implements OnInit {

  loading !: boolean;

  reporte : Reporte[] = []

  cols: TableCols[] = [
    { field: 'ID_REGISTRO_TRAMITE', header: 'Código', style: 'width: 10%', type: 'text' },
    { field: 'NOMBRE_AREA', header: 'Área', style: 'width: 10%', type: 'text' },
    { field: 'NOMBRE_TRAMITE', header: 'Trámite', style: 'width: 10%', type: 'text' },
    { field: 'NOMBRE_CLIENTE', header: 'Cliente', style: 'width: 10%', type: 'text' },
    { field: 'NOMBRE_USUARIO', header: 'Usuario', style: 'width: 10%', type: 'text' },
    { field: 'FECHA_Y_HORA', header: 'Fecha', style: 'width: 10%', type: 'date' },

  ];


  constructor(
    private reporteService: ReporteService
  ) { }

  ngOnInit(): void {
    this.cargarReporte();
  }

  clear(table: Table){
    table.clear();
  }

  cargarReporte(){
    this.loading = true;
    this.reporteService.getReporte().subscribe(OK=>{
      if(OK == true){
        this.loading = false;
        this.reporte = this.reporteService.reporte;
      }
    });
  }

}
