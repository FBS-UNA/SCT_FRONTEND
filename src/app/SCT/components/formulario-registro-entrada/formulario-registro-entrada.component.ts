import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Cliente } from '../../interfaces/cliente.interface';
import { RegistroEntradaModel } from '../../interfaces/regsitro-entrada.interface';
import { ClientesService } from '../../services/clientes.service';
import { RegistroEntradaService } from '../../services/registro-entrada.service';
import { TimestampService } from '../../services/timestamp.service';

@Component({
  selector: 'app-formulario-registro-entrada',
  templateUrl: './formulario-registro-entrada.component.html',
  styles: [
  ]
})
export class FormularioRegistroEntradaComponent implements OnInit {

  registroEntradaForm!: FormGroup;

  cliente!: Cliente;
  registro!: RegistroEntradaModel;


  cargarData(CEDULA:string = '',TIPO_CLIENTE: string = '',NOMBRE:string = '',APELLIDO_1:string = '',APELLIDO_2:string= '',AREA:string='',MOTIVO:string='' ){
    this.registroEntradaForm = this.fb.group({
      CEDULA: [CEDULA, [Validators.required, Validators.minLength(9)]],
      TIPO_CLIENTE: [{ value: TIPO_CLIENTE, disabled: true }],
      NOMBRE: [NOMBRE, Validators.required],
      APELLIDO_1: [APELLIDO_1, Validators.required],
      APELLIDO_2: [APELLIDO_2, Validators.required],
      AREA: [AREA, Validators.required],
      MOTIVO: [MOTIVO, Validators.required],
    })
  }

  constructor(
    private fb: FormBuilder,
    private clienteService: ClientesService,
    private messageService: MessageService,
    private registroEntradaService: RegistroEntradaService,
    private timestampService: TimestampService,
  ) { }

  ngOnInit(){
    this.cargarData();
  }

  
  get controls(): any {
    return this.registroEntradaForm.controls;
  }

  registrar() {
    const formValue = { ...this.registroEntradaForm.value };
    if (this.registroEntradaForm.invalid) {
      this.registroEntradaForm.markAllAsTouched();
      return ;
    }
    this.cliente = formValue;
    if(this.controls['TIPO_CLIENTE'].value == 'Invitado'){
      this.agregarInvitado();
    }
    this.agregarRegistro();
  }

  agregarInvitado(){
    this.clienteService.addCliente(this.cliente).subscribe(({OK})=>{
      if(OK==true){
        this.registroEntradaForm.reset();
      }
    });
  }

  agregarRegistro(){
    this.registro = {
      CEDULA_CLIENTE : this.controls['CEDULA'].value,
      AREA_DESTINO : this.controls['AREA'].value,
      MOTIVO_VISITA :this.controls['MOTIVO'].value,
      FECHA: this.timestampService.fechaActual,
      HORA: this.timestampService.horaCompleta
    };
    this.registroEntradaService.addRegistro(this.registro).subscribe(OK=>{
        if(OK){
          this.mensajeExito();
          this.registroEntradaForm.reset();
        }
    })
  }


  buscar() {
    this.clienteService.getCliente(this.controls['CEDULA'].value).subscribe(OK => {
      if (OK ==true) {
        this.cliente = this.clienteService.cliente;
        const {CEDULA, TIPO_CLIENTE, NOMBRE, APELLIDO_1, APELLIDO_2} = this.cliente;
        this.cargarData(CEDULA,TIPO_CLIENTE,NOMBRE,APELLIDO_1,APELLIDO_2)  
      }else{
        this.cargarData(this.controls['CEDULA'].value,'Invitado')
        this.mensajeDeErrorCedula();
      }
    })
  }

  borrar() {
    this.registroEntradaForm.reset();
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
