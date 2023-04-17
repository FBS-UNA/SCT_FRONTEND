import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/auth/interfaces/auth.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TimestampService } from '../../services/timestamp.service';

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

  usuario!: Usuario

  constructor(
    private usuariosService: UsuariosService,
    private messageService: MessageService,
    private timestampService: TimestampService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
  }

  cargarDataEmit() {
    this.refreshData.emit();
  }

  abrirDialog() {
    this.usuarioDialog = true;
  }

  editarUsuarioDialog(usuario: Usuario){
    this.usuario = {...usuario};
    this.editando = true;
    this.usuarioDialog = true;
  }

  cerrarDialog() {
    this.usuarioDialog = false;
    this.submitted = false;
  }

  // actualizarUsuario(){
  //   this.usuariosService.(this.usuario).subscribe(res => {
  //     if (res.OK) {
  //       this.cargarDataEmit();
  //       this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `El área llamada "${this.area.NOMBRE_AREA}" se ha actualizado correctamente` });
  //     } else {
  //       this.messageService.add({ severity: 'error', summary: 'Oh oh...', detail: `No se pudo actualizar el área llamada "${this.area.NOMBRE_AREA}"` });
  //     }
  //   });
  // }

  guardarCambios() {
    this.submitted = true;
    // this.editando ? this.actualizarArea() : this.agregarArea();
    // this.areaDialog = false;
  }

}
