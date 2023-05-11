import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/auth/interfaces/auth.interface';
import { MessageService } from 'primeng/api';
import { Rol } from '../../interfaces/roles.interface';
import { RolesService } from '../../services/roles.service';
import { forkJoin } from 'rxjs';

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

  deleteUsuarioRoles(){
    this.rolesService.deleteUsuarioRoles(this.usuario.CEDULA).subscribe(res=>{
      if(res.OK){
        this.cargarDataEmit()
        this.rolesSeleccionados = this.rolesService.rolesU
      }
    })
  }

  insertNuevosRoles() {
    const updateObservables = this.rolesSeleccionados.map(rol => {
      return this.rolesService.updateUsuarioRoles(this.usuario.CEDULA, rol.NOMBRE_ROL);
    });
  
    forkJoin(updateObservables)
      .subscribe(responses => {
        const success = responses.every(res => !!res);
        if (success) {
          this.cargarDataEmit();
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Se han actualizado los roles del usuario correctamente' });
          this.rolesSeleccionados = this.rolesService.rolesU;
        } else {
          this.messageService.add({ severity: 'error', summary: 'Falló', detail: 'No se han actualizado los roles del usuario correctamente' });
        }
      });
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
    if (this.rolesSeleccionados.length === 0) { 
      this.messageService.add({ severity: 'error', summary: 'Falló', detail: `El usuario debe tener al menos un rol` });
    }else{
      this.submitted = true;
      this.deleteUsuarioRoles();
      this.insertNuevosRoles();
      this.cargarRolesUsuario(this.usuario.CEDULA)
      this.cerrarDialog();
    }
  }

}
