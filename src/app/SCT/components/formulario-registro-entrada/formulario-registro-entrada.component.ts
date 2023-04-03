import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Cliente } from '../../interfaces/cliente.interface';
import { RegistroEntradaModel } from '../../interfaces/registro-entrada.interface';
import { ClientesService } from '../../services/clientes.service';
import { RegistroEntradaService } from '../../services/registro-entrada.service';
import { TimestampService } from '../../services/timestamp.service';
import { Area } from '../../interfaces/area.interface';
import { AreasService } from '../../services/areas.service';
import { Tramite, TramiteRegistro } from '../../interfaces/tramite.interface';
import { switchMap, tap } from 'rxjs/operators';
import { TramitesService } from '../../services/tramites.service';



@Component({
  selector: 'app-formulario-registro-entrada',
  templateUrl: './formulario-registro-entrada.component.html',
  styles: [
  ]
})
export class FormularioRegistroEntradaComponent implements OnInit{


  // IMPORTANTE
  // 
  // VOLVER A PONER LOS VALIDADORES A AREA, MOTIVO, LOS QUITÉ PARA UNAS PRUEBAS NADA MAS

  registroEntradaForm !: FormGroup;

  cliente!: Cliente;
  registro!: RegistroEntradaModel;
  areas:Area[]=[];
  nombreAreas: Area[] = [];
  tramitesAsociados: Tramite[] = [];
  nombreTramites: TramiteRegistro[] = [];

  constructor(
    private fb: FormBuilder,
    private clienteService: ClientesService,
    private messageService: MessageService,
    private registroEntradaService: RegistroEntradaService,
    private timestampService: TimestampService,
    private areasService: AreasService,
    private tramitesService: TramitesService,
  ) { }

  ngOnInit(){
    this.resetearFormulario();
    this.cargarAreas();
    this.cargarTramitesAsociados();
  }


  resetearFormulario(){
    this.registroEntradaForm = this.fb.group({
      CEDULA: ['', [Validators.required, Validators.minLength(9), Validators.pattern('^([A-Za-z]\\d{8}|\\d{9})$')]],
      TIPO_CLIENTE: [{ value: '', disabled: true }],
      NOMBRE: [{ value: '', disabled: true }, Validators.required],
      APELLIDO_1: [{ value: '', disabled: true }, Validators.required],
      APELLIDO_2: [{ value: '', disabled: true }],
      AREA: ['', Validators.required],
      MOTIVO: ['', Validators.required],
    });
  }

  cargarAreas(){
    this.areasService.getAreas().subscribe(OK => {
      if (OK) {
        this.areas = this.areasService.areas;
        this.nombreAreas = this.areas.map(({NOMBRE_AREA, ID_AREA})=>{ return { NOMBRE_AREA, ID_AREA} });
      }
    });
  }

  cargarTramitesAsociados(){
    this.registroEntradaForm.get('AREA')?.valueChanges.pipe(
      tap( ( _ ) =>{
        this.registroEntradaForm.get('MOTIVO')?.reset('');
        this.nombreTramites = [];
      }), switchMap( area => this.tramitesService.getTramitesAsociados(area))
      ).subscribe( ({OK, LISTA_TRAMITES_ASOCIADOS}) =>{
        if(OK === true){
          this.nombreTramites = LISTA_TRAMITES_ASOCIADOS;
        }
      })
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
      ID_AREA_DESTINO : this.controls['AREA'].value,
      MOTIVO_VISITA :this.controls['MOTIVO'].value,
      FECHA: this.timestampService.fechaActual,
      HORA: this.timestampService.horaCompleta
    };
    this.registroEntradaService.addRegistro(this.registro).subscribe(OK=>{
        if(OK){
          this.mensajeExito();
          this.ngOnInit();
        }
    })
  }

  buscar() {
    this.clienteService.getCliente(this.controls['CEDULA'].value).subscribe(OK => {
      if (OK ==true) {
        this.cliente = this.clienteService.cliente;
        this.setAfiliadoData(this.cliente);
        this.habilitarInputs();
      }else{
        this.setInvitadoData();
        this.mensajeDeErrorCedula();
        this.habilitarInputs();
      }
    })
  }

  habilitarInputs(){
    this.registroEntradaForm.get('NOMBRE')?.enable(); 
    this.registroEntradaForm.get('APELLIDO_1')?.enable(); 
    this.registroEntradaForm.get('APELLIDO_2')?.enable(); 
  }

  setInvitadoData(){
    this.registroEntradaForm.get('TIPO_CLIENTE')?.setValue('Invitado');
    this.registroEntradaForm.get('NOMBRE')?.setValue('');
    this.registroEntradaForm.get('APELLIDO_1')?.setValue('');
    this.registroEntradaForm.get('APELLIDO_2')?.setValue('');
  }

  setAfiliadoData(cliente: Cliente){
    this.registroEntradaForm.get('TIPO_CLIENTE')?.setValue(cliente.TIPO_CLIENTE);
    this.registroEntradaForm.get('NOMBRE')?.setValue(cliente.NOMBRE);
    this.registroEntradaForm.get('APELLIDO_1')?.setValue(cliente.APELLIDO_1);
    this.registroEntradaForm.get('APELLIDO_2')?.setValue(cliente.APELLIDO_2);
  }

  borrar() {
    this.ngOnInit();
    this.nombreTramites = [];
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
