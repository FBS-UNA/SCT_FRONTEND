import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../interfaces/cliente.interface';
import { MessageService } from 'primeng/api';
import { RegistroEntradaService } from '../../services/registro-entrada.service';
import { RegistroEntradaModel } from '../../interfaces/regsitro-entrada.interface';


@Component({
  selector: 'app-registro-entrada',
  templateUrl: './registro-entrada.component.html',
  styles: [``
  ]
})
export class RegistroEntradaComponent implements OnInit {

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
    private registroEntradaService: RegistroEntradaService
  ) { }

  ngOnInit() {
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
      console.log(OK);
      if(OK==true){
        this.mensajeExito();
        this.registroEntradaForm.reset();
      }
    });
  }

  agregarRegistro(){
    // this.registroEntradaService.addRegistro(this.registro).subscribe(OK=>{
    //   if(OK ==true){
    //     this.mensajeExito();
    //     this.registroEntradaForm.reset();
    //   }
    // })
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

  buscar() {
    this.clienteService.getCliente(this.controls['CEDULA'].value).subscribe(OK => {
      console.log(OK)
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

}
