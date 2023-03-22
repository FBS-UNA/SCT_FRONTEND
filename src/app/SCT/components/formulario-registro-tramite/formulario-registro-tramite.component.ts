import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Cliente } from '../../interfaces/cliente.interface';
import { Tramite } from '../../interfaces/tramite.interface';
import { ClientesService } from '../../services/clientes.service';
import { TramitesService } from '../../services/tramites.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { RegistroTramiteModel } from '../../interfaces/registro-tramite.interface';
import { TimestampService } from '../../services/timestamp.service';
import { ConfirmarRegistroTramite } from '../confirmar-registro-tramite/confirmar-registro-tramite.component';

@Component({
  selector: 'app-formulario-registro-tramite',
  templateUrl: './formulario-registro-tramite.component.html'
})
export class FormularioRegistroTramiteComponent implements OnInit {


  @Output() refreshData = new EventEmitter<void>();
  @ViewChild(ConfirmarRegistroTramite) ConfReTramiteDialog!: ConfirmarRegistroTramite;
  @ViewChild('selectTramites') selectTramites!: any;

  registroTramiteForm !: FormGroup;


  re_tramite!: RegistroTramiteModel;
  cliente!: Cliente;
  tramites: Tramite[] = [];
  nombreTramites: Tramite[] = [];



  constructor(
    private fb: FormBuilder,
    private clienteService: ClientesService,
    private messageService: MessageService,
    private tramitesService: TramitesService,
    public authService: AuthService,
    private confirmationService: ConfirmationService,
    private timestampService: TimestampService
  ) { }

  ngOnInit(){
    this.resetearFormulario();
    this.cargarTramites();
  }

  cargarDataEmit() {
    this.refreshData.emit();
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
        
      }else{
        this.mensajeDeErrorCedula();
      }
    })
  }

/*
  setInvitadoData(){
    this.registroTramiteForm.get('TIPO_CLIENTE')?.setValue('Invitado');
    this.registroTramiteForm.get('NOMBRE')?.setValue('');
    this.registroTramiteForm.get('APELLIDO_1')?.setValue('');
    this.registroTramiteForm.get('APELLIDO_2')?.setValue('');
  }
*/

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

  borrar() {
    this.ngOnInit();
    this.nombreTramites = [];
  }


  confirmar(){
    const formValue = { ...this.registroTramiteForm.value };
    if (this.registroTramiteForm.invalid) {
      this.registroTramiteForm.markAllAsTouched();
      return ;
    }

    this.setReTramite();

  }

  setReTramite(){
    this.re_tramite = {
      CEDULA_CLIENTE : this.controls['CEDULA'].value,
      NOMBRE_TRAMITE : this.selectTramites.selectedOption.NOMBRE_TRAMITE,
      ID_TRAMITE : this.controls['TRAMITE'].value,
      DESCRIPCION :this.controls['DESCRIPCION'].value,
      FECHA: this.timestampService.fechaActual,
      HORA: this.timestampService.horaCompleta
    };

    this.confirmarTramiteDialog();
  }

  confirmarTramiteDialog(){
    this.ConfReTramiteDialog.cargarReTramiteDialog(this.re_tramite);
  }

}
