import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
    `
    a{
      text-decoration: none;
    }
    
    `
  ]
})
export class RegisterComponent {

    registerForm:FormGroup = this.fb.group({
      CEDULA: [null, [Validators.required]],
      CONTRASENA: [null, [Validators.required]],
      NOMBRE: [null, [Validators.required]],
      APELLIDO_1: [null, [Validators.required]],
      APELLIDO_2: [null, [Validators.required]],
      FECHA_NAC: [null, [Validators.required]]
    });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  
  get controls(): any{
    return this.registerForm.controls;
  }

  isInvalid(campo: string): boolean | null{
    return this.controls[campo].errors && this.controls[campo].touched;
  }

  mensajeCredencialesInvalidas(){
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Campos no válidos'});
  }


  mensajeCredencialesValidas(){
    this.messageService.add({severity:'success', summary: 'Ok', detail: 'Registro Completado'});
  }

  resetearFormulario(){
    this.registerForm = this.fb.group({
      CEDULA: ['', Validators.required],
      NOMBRE: [ '',Validators.required],
      CONTRASENA: ['',Validators.required],
      APELLIDO_1: ['',Validators.required],
      APELLIDO_2: ['',Validators.required],
      AREA: ['', Validators.required],
      FECHA_NAC: ['', Validators.required],
    });
  }

  register(){
    if (this.registerForm.invalid) {
      Object.values(this.registerForm.controls).forEach(control => {
        control.markAllAsTouched();
      });
      this.mensajeCredencialesInvalidas();
      return;
    }

    const body = this.registerForm.value;
    this.authService.register(body).subscribe(res=>{

      if(res === true){

        this.mensajeCredencialesValidas();
        this.resetearFormulario();
      }else{
        this.mensajeCredencialesInvalidas();
      }
    })
  }
}
