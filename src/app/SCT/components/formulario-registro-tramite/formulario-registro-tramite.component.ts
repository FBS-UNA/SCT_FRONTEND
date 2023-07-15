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
import { Area } from '../../interfaces/area.interface';
import { AreasService } from '../../services/areas.service';


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
  area!: Area;
  areas:Area[]=[];
  nombreAreas: Area[] = [];
  idAreaSeleccionada: number = -1;


  constructor(
    private fb: FormBuilder,
    private clienteService: ClientesService,
    private messageService: MessageService,
    private tramitesService: TramitesService,
    private areasService: AreasService,
    public authService: AuthService,
    private timestampService: TimestampService
  ) { }

  ngOnInit(){
    this.resetearFormulario();
    this.cargarAreasDelUsuario();
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
      AREA: ['', Validators.required],
      TRAMITE: ['', Validators.required],
      DESCRIPCION: [''],
    })
  }

  //GET AREA CON EL NOMBRE DEL ROL DEL USUARIO
  cargarAreasDelUsuario(){    
    this.areasService.getAreasPorUsuario(this.usuario.CEDULA).subscribe(OK => {
      if (OK == true) {
        this.areas = this.areasService.areas;
        this.nombreAreas = this.areas.map(({NOMBRE_AREA, ID_AREA})=>{ return { NOMBRE_AREA, ID_AREA} });
      }
    })
  }

  cargarTramites() {    
      
    this.tramitesService.getTramitesAsociados(this.idAreaSeleccionada, 1).subscribe(res => {
      
      if (res.OK === true) {
        this.tramites = [...res.LISTA_TRAMITES_ASOCIADOS];
        console.log(this.tramites);
        
        this.nombreTramites = this.tramites.map(({NOMBRE_TRAMITE, ID_TRAMITE})=>{
          return {NOMBRE_TRAMITE, ID_TRAMITE}
        })
      }
    });
  }

  obtenerIdArea(event: any): void {
    this.idAreaSeleccionada = event.value;
    this.cargarTramites();
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
    let nombreTramite = this.tramites.find(tramite => tramite.ID_TRAMITE == this.controls['TRAMITE'].value)?.NOMBRE_TRAMITE; 
    this.re_tramite = {
      CEDULA_CLIENTE : this.controls['CEDULA'].value,
      CEDULA_USUARIO: this.usuario.CEDULA,
      NOMBRE_TRAMITE: nombreTramite,
      DESCRIPCION :this.controls['DESCRIPCION'].value,
      FECHA: this.timestampService.fechaActual,
      HORA: this.timestampService.horaCompleta,
      ID_TRAMITE : this.controls['TRAMITE'].value,
      ID_AREA: this.idAreaSeleccionada
    };    

    this.confirmarTramiteDialog();
  }

  confirmarTramiteDialog(){
    this.crRegistroTramiteDialog.cargarReTramiteDialog(this.re_tramite);
  }

}
