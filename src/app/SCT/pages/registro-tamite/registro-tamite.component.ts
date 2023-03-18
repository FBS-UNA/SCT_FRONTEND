import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Cliente } from '../../interfaces/cliente.interface';
import { Tramite } from '../../interfaces/tramite.interface';
import { ClientesService } from '../../services/clientes.service';
import { RegistroTamiteService } from '../../services/registro-tamite.service';
import { TimestampService } from '../../services/timestamp.service';
import { TramitesService } from '../../services/tramites.service';
import { RegistroHoraInicio, RegistroTramiteModel } from '../../interfaces/registro-tramite.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-registro-tamite',
  templateUrl: './registro-tamite.component.html',
  styles: [
  ]
})
export class RegistroTamiteComponent implements OnInit {

  constructor( ) { }

  ngOnInit(){

  }


}