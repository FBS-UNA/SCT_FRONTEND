import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/auth/interfaces/auth.interface';
import { MessageService } from 'primeng/api';
import { Rol } from '../../interfaces/roles.interface';
import { RolesService } from '../../services/roles.service';

@Component({
  selector: 'app-e-usuario',
  templateUrl: './e-usuario.component.html',
  styles: [
  ]
})
export class EUsuarioComponent implements OnInit {

  @Output() refreshData = new EventEmitter<void>();

  submitted !: boolean;
  usuarioDialog: boolean = false;
  editando: boolean = false;

  usuario!: Usuario;
  roles: Rol[] = [];
  rolesSeleccionados: Rol[] = [];
  

  constructor(
    private rolesService: RolesService,
    private messageService: MessageService,

  ) { }

  ngOnInit(): void {
    
  }

  cargarRoles() {
    this.rolesService.getRoles().subscribe(OK => {
      if (OK) {
        this.roles = this.rolesService.roles;
      }
    });
  }

  cargarRolesUsuario(cedulaUsuario: string) {
    this.rolesService.getRolesUsuario(cedulaUsuario).subscribe(OK => {
      if (OK) {
        this.rolesSeleccionados = this.rolesService.rolesU;
      }
    });
  }

  updateUsuarioRoles(){
    this.rolesService.updateUsuarioRoles(this.usuario.CEDULA,this.rolesSeleccionados).subscribe(res=>{
      if(res.OK){
        this.cargarDataEmit()
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `Se han actualizado los roles del usuario correctamente` })
        this.rolesSeleccionados = this.rolesService.rolesU
      }
      this.messageService.add({ severity: 'error', summary: 'Falló', detail: `No se han actualizado los roles del usuario correctamente` })
    })
  }

  cargarDataEmit() {
    this.refreshData.emit();
  }

  abrirDialog() {
    this.usuarioDialog = true;
  }

  editarUsuarioDialog(usuario: Usuario) {
    this.usuario = { ...usuario };
    this.cargarRoles();
    this.cargarRolesUsuario(usuario.CEDULA); 
    this.editando = true;
    this.usuarioDialog = true;
  }

  cerrarDialog() {
    this.usuarioDialog = false;
    this.submitted = false;
  }

  guardarCambios() {
    this.submitted = true;
    this.updateUsuarioRoles();
  }

}
