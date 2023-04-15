import { Component, OnInit } from '@angular/core';
import { TableCols } from '../../interfaces/table.interface';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-asignacion-roles',
  templateUrl: './asignacion-roles.component.html',
  styles: [
  ]
})
export class AsignacionRolesComponent implements OnInit {

  loading!: boolean;

  cols: TableCols[] = [
    { field: '', header: 'Cédula', style: 'width: 10%' },
    { field: '', header: 'Nombre', style: 'width: 10%' },
    { field: '', header: 'Primer Apellido', style: 'width: 11%' },
    { field: '', header: 'Segundo Apellido', style: 'width: 12%' },
    { field: '', header: 'Fecha de Nacimiento', style: 'width: 15%' },
    { field: '', header: 'Roles', style: 'width: 10%' },
  ]

  constructor() { }

  ngOnInit(): void {
  }
  
  clear(table: Table) {
    table.clear();
  }

}
