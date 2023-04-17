import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Table } from 'primeng/table';
import { TableCols } from '../../interfaces/table.interface';
import { Usuario } from 'src/app/auth/interfaces/auth.interface';
import { EUsuarioComponent } from '../e-usuario/e-usuario.component';

@Component({
  selector: 'app-tabla-asignacion-roles',
  templateUrl: './tabla-asignacion-roles.component.html',
  styles: [
  ]
})
export class TablaAsignacionRolesComponent implements OnInit {

  @ViewChild(EUsuarioComponent) EUsuarioDialog !: EUsuarioComponent;

  loading!: boolean;

  usuarios: Usuario[] = [];

  cols: TableCols[] = [
    { field: 'CEDULA', header: 'Cédula', style: 'width: 10%' },
    { field: 'NOMBRE', header: 'Nombre', style: 'width: 10%' },
    { field: 'APELLIDO_1', header: 'Primer Apellido', style: 'width: 11%' },
    { field: 'APELLIDO_2', header: 'Segundo Apellido', style: 'width: 12%' },
    { field: 'FECHA_NAC', header: 'Fecha de Nacimiento', style: 'width: 15%' },
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

  editarRolDialog(usuario: Usuario) {
    this.EUsuarioDialog.editarUsuarioDialog(usuario);
  }

}
