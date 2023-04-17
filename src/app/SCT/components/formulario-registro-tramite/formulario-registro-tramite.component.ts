import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Cliente } from '../../interfaces/cliente.interface';
import { Tramite } from '../../interfaces/tramite.interface';
import { ClientesService } from '../../services/clientes.service';
import { TimestampService } from '../../services/timestamp.service';
import { TramitesService } from '../../services/tramites.service';
import { CRRegistroTramiteComponent } from '../cr-registro-tramite/cr-registro-tramite.component';
import { RegistroTramiteModel } from '../../interfaces/registro-tramite.interface';


@Component({
  selector: 'app-formulario-registro-tramite',
  templateUrl: './formulario-registro-tramite.component.html',
  styles: [
  ]
})
export class FormularioRegistroTramiteComponent implements OnInit {

  @Output() refreshData = new EventEmitter<void>();
  @ViewChild('selectTramites') selectTramites!: any;
  @ViewChild(CRRegistroTramiteComponent) crRegistroTramiteDialog !: CRRegistroTramiteComponent;

  registroTramiteForm !: FormGroup;

  cliente!: Cliente;
  tramites: Tramite[] = [];
  nombreTramites: Tramite[] = []; 
  re_tramite!: RegistroTramiteModel;


  constructor(
    private fb: FormBuilder,
    private clienteService: ClientesService,
    private messageService: MessageService,
    private tramitesService: TramitesService,
    public authService: AuthService,
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
      CEDULA: ['', [Validators.required, Validators.minLength(9), Validators.pattern('^([A-Za-z]\\d{8}|\\d{9})$')]],
      TIPO_CLIENTE: [{ value: '', disabled: true }],
      NOMBRE: [{ value: '', disabled: true }],
      APELLIDO_1: [{ value: '', disabled: true }],
      APELLIDO_2: [{ value: '', disabled: true }],
      TRAMITE: ['', Validators.required],
      DESCRIPCION: [''],
    })
  }


  cargarTramites() {
    this.tramitesService.getTramitesHabilitados().subscribe(res => {
      if (res.OK) {
        this.tramites = res.TRAMITES;
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

  limpiarFormulario(){
    this.crRegistroTramiteDialog.limpiarDialog();
  }

  setInvitadoData(){
    this.registroTramiteForm.get('TIPO_CLIENTE')?.setValue('Invitado');
    this.registroTramiteForm.get('NOMBRE')?.setValue('');
    this.registroTramiteForm.get('APELLIDO_1')?.setValue('');
    this.registroTramiteForm.get('APELLIDO_2')?.setValue('');
  }

  setAfiliadoData(cliente: Cliente){
    this.registroTramiteForm.get('TIPO_CLIENTE')?.setValue(cliente.TIPO);
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
    this.crRegistroTramiteDialog.cargarReTramiteDialog(this.re_tramite);
  }

}
