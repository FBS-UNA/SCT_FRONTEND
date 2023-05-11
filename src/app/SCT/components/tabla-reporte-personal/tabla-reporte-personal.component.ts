import { Component, OnInit } from '@angular/core';
import { TableCols } from '../../interfaces/table.interface';
import { Reporte } from '../../interfaces/reporte.interface';
import { Table } from 'primeng/table';
import { ReporteService } from '../../services/reporte.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-tabla-reporte-personal',
  templateUrl: './tabla-reporte-personal.component.html',
})
export class TablaReportePersonalComponent implements OnInit {

  loading !: boolean;

  reporte: Reporte[] = []
  filteredReporte: Reporte[] = [];

  cols: TableCols[] = [
    { field: 'ID_REGISTRO_TRAMITE', header: 'Código', style: 'width: 10%', type: 'text' },
    { field: 'NOMBRE_AREA', header: 'Área', style: 'width: 10%', type: 'text' },
    { field: 'NOMBRE_TRAMITE', header: 'Trámite', style: 'width: 10%', type: 'text' },
    { field: 'NOMBRE_CLIENTE', header: 'Cliente', style: 'width: 10%', type: 'text' },
    { field: 'NOMBRE_USUARIO', header: 'Usuario', style: 'width: 10%', type: 'text' },
    { field: 'FECHA_Y_HORA', header: 'Fecha', style: 'width: 10%', type: 'date' },
  ];



  get usuario() {
    return this.authService.usuario;
  }

  constructor(
    private reporteService: ReporteService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.cargarReporte();
  }

  clear(table: Table) {
    table.clear();
  }

  cargarReporte() {
    this.loading = true;
    this.reporteService.getReporte().subscribe(OK => {
      if (OK == true) {
        this.loading = false;
        this.reporte = this.reporteService.reporte.filter(item => this.authService.usuario.CEDULA === item.CEDULA)
        .map(item => {
          const fechaYHoraString = item.FECHA_Y_HORA; // Suponiendo que FECHA_Y_HORA es una cadena de texto
          const fechaYHora = new Date(fechaYHoraString);
          return { ...item, FECHA_Y_HORA: fechaYHora };
        });
      }
    });
  }

  generarReporteXLSX() {
    // Nombre de la hoja
    const nombreHoja = 'ReportePersonal';

    // Nombre del archivo
    const nombreArchivo = 'Reporte_' + this.fecha() + '_' + this.usuario.NOMBRE + this.usuario.APELLIDO_1 + '.xlsx';

    // Crea la hoja de cálculo a partir del array de datos
    const hoja = XLSX.utils.json_to_sheet(this.filteredReporte);

    // Crea un objeto Workbook y agrega la hoja de cálculo
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, hoja, nombreHoja);

    // Descarga el archivo xlsx en el navegador
    XLSX.writeFile(workbook, nombreArchivo);

  }

  onFilter(event: any) {
     // Obtener el nuevo arreglo filtrado    
    this.filteredReporte = event.filteredValue;
  }

  fecha() {
    const fechaActual = new Date();
    const anio = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1;
    const dia = fechaActual.getDate();
    const fechaString = `${dia}/${mes}/${anio}`;
    return fechaString;

  }

}
