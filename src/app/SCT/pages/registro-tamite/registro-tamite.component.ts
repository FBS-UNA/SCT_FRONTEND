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

@Component({
  selector: 'app-registro-tamite',
  templateUrl: './registro-tamite.component.html',
  styles: [
  ]
})
export class RegistroTamiteComponent implements OnInit {

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
    private registroTramiteService: RegistroTamiteService,
    private timestampService: TimestampService,
    private tramitesService: TramitesService,
  ) { }

  ngOnInit(){
    this.resetearFormulario();
    this.cargarTramites();
  }

  get controls(): any {
    return this.registroTramiteForm.controls;
  }


  resetearFormulario(){
    this.registroTramiteForm = this.fb.group({
      CEDULA: ['208130058', [Validators.required, Validators.minLength(9)]],
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
    this.registro = {
        ID_TRAMITE      :  this.controls['TRAMITE'].value,
        CEDULA_CLIENTE  :  this.controls['CEDULA'].value,
        DESCRIPCION     :  this.controls['DESCRIPCION'].value,
        REGISTRO_INICIO :  this.registro_Inicio,
        FECHA_FINAL     :  this.timestampService.fechaActual,
        HORA_FINAL      :  this.timestampService.horaCompleta 
    };
    console.log(this.registro)
    this.registroTramiteService.addRegistroTramite(this.registro).subscribe(OK=>{
        if(OK){
          this.mensajeExito();
          this.ngOnInit();
        }
    })
  }

  registrarTramite(){
    const formValue = { ...this.registroTramiteForm.value };
    if (this.registroTramiteForm.invalid) {
      this.registroTramiteForm.markAllAsTouched();
      return ;
    }else{
      this.cliente = formValue;
      this.agregarRegistroTramite();
    }
    
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
