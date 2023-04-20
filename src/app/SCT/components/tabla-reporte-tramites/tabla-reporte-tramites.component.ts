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
    { field: '', header: 'Código', style: 'width: 10%' },
    { field: '', header: 'Área', style: 'width: 10%' },
    { field: '', header: 'Trámite', style: 'width: 10%' },
    { field: '', header: 'Cliente', style: 'width: 10%' },
    { field: '', header: 'Usuario', style: 'width: 10%' },
    { field: '', header: 'Fecha', style: 'width: 10%' },

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
