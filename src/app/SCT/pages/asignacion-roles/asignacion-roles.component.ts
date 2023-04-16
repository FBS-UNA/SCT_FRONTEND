import { Component, OnInit } from '@angular/core';
import { TableCols } from '../../interfaces/table.interface';
import { Table } from 'primeng/table';
import { Usuario } from 'src/app/auth/interfaces/auth.interface';
import { UsuariosService } from '../../services/usuarios.service';


@Component({
  selector: 'app-asignacion-roles',
  templateUrl: './asignacion-roles.component.html',
  styles: [
  ]
})
export class AsignacionRolesComponent implements OnInit {

  loading!: boolean;

  usuarios: Usuario[] = [];

  cols: TableCols[] = [
    { field: '', header: 'Cédula', style: 'width: 10%' },
    { field: '', header: 'Nombre', style: 'width: 10%' },
    { field: '', header: 'Primer Apellido', style: 'width: 11%' },
    { field: '', header: 'Segundo Apellido', style: 'width: 12%' },
    { field: '', header: 'Fecha de Nacimiento', style: 'width: 15%' },
    { field: '', header: 'Roles', style: 'width: 10%' },
  ]

  constructor(
    private usuarioService: UsuariosService
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios()
  }
  
  clear(table: Table) {
    table.clear();
  }

  cargarUsuarios() {
    this.loading= true;
    this.usuarioService.getUsuarios().subscribe(OK => {
      if (OK) {
        this.loading = false;
        this.usuarios = this.usuarioService.usuarios;
        console.log(this.usuarios)
      }
    });
  }

}
