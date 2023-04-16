import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/auth/interfaces/auth.interface';

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

}
