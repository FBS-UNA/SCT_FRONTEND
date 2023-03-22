import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Cliente } from '../../interfaces/cliente.interface';
import { RegistroHoraInicio, RegistroTramiteModel } from '../../interfaces/registro-tramite.interface';
import { Tramite } from '../../interfaces/tramite.interface';
import { ClientesService } from '../../services/clientes.service';
import { TimestampService } from '../../services/timestamp.service';
import { TramitesService } from '../../services/tramites.service';
import { CRRegistroTramiteComponent } from '../cancelar-dialog-rt/cr-registro-tramite.component';


@Component({
  selector: 'app-formulario-registro-tramite',
  templateUrl: './formulario-registro-tramite.component.html',
  styles: [
  ]
})
export class FormularioRegistroTramiteComponent implements OnInit {

  @ViewChild(CRRegistroTramiteComponent) cancelarDialogRT !: CRRegistroTramiteComponent;

  registroTramiteForm !: FormGroup;

  cliente!: Cliente;
  tramites: Tramite[] = [];
  nombreTramites: Tramite[] = [];
  registro!: RegistroTramiteModel;
  registro_Inicio!: RegistroHoraInicio
  

  constructor(
    private fb: FormBuilder,
    private clienteService: ClientesService,
    private messageService: MessageService,
    private timestampService: TimestampService,
    private tramitesService: TramitesService,
    public authService: AuthService,
  ) { }

  ngOnInit(){
    this.resetearFormulario();
    this.cargarTramites();
  }

  get controls(): any {
    return this.registroTramiteForm.controls;
  }

  get usuario(){
    return this.authService.usuario;
  }


  resetearFormulario(){
    this.registroTramiteForm = this.fb.group({
      CEDULA: ['', [Validators.required, Validators.minLength(9)]],
      TIPO_CLIENTE: [{ value: '', disabled: true }],
      NOMBRE: [{ value: '', disabled: true }],
      APELLIDO_1: [{ value: '', disabled: true }],
      APELLIDO_2: [{ value: '', disabled: true }],
      TRAMITE: ['', Validators.required],
      DESCRIPCION: [''],
    })
  }


  cargarTramites() {
    this.tramitesService.getTramites().subscribe(OK => {
      if (OK) {
        this.tramites = this.tramitesService.tramites;
        this.nombreTramites = this.tramites.map(({NOMBRE_TRAMITE, ID_TRAMITE})=>{
          return {NOMBRE_TRAMITE, ID_TRAMITE}
        })
      }
    });
  }

  buscar(){
    this.clienteService.getCliente(this.controls['CEDULA'].value).subscribe(OK => {
      if (OK ==true) {
        this.cliente = this.clienteService.cliente;
        this.setAfiliadoData(this.cliente);
        this.horaIncio();
        
      }else{
        this.setInvitadoData();
        this.mensajeDeErrorCedula();
        this.horaIncio();
      }
    })
  }

  horaIncio(){
    this.registro_Inicio ={
      FECHA_INICIO    :   this.timestampService.fechaActual,
      HORA_INICIO     :   this.timestampService.horaCompleta
    }
  }

  agregarRegistroTramite(){
    
  }

  limpiarFormulario(){
    this.cancelarDialogRT.limpiarDialog();
  }

  setInvitadoData(){
    this.registroTramiteForm.get('TIPO_CLIENTE')?.setValue('Invitado');
    this.registroTramiteForm.get('NOMBRE')?.setValue('');
    this.registroTramiteForm.get('APELLIDO_1')?.setValue('');
    this.registroTramiteForm.get('APELLIDO_2')?.setValue('');
  }

  setAfiliadoData(cliente: Cliente){
    this.registroTramiteForm.get('TIPO_CLIENTE')?.setValue(cliente.TIPO_CLIENTE);
    this.registroTramiteForm.get('NOMBRE')?.setValue(cliente.NOMBRE);
    this.registroTramiteForm.get('APELLIDO_1')?.setValue(cliente.APELLIDO_1);
    this.registroTramiteForm.get('APELLIDO_2')?.setValue(cliente.APELLIDO_2);
  }

  mensajeExito() {
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Registro éxitoso' });
  }

  mensajeDeErrorCedula() {
    this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se encontro ningun cliente' });
  }

  esInvalido(campo: string): boolean | null {
    return this.controls[campo].errors && this.controls[campo].touched;
  }



}
