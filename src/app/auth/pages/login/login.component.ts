import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
    a{
      text-decoration: none;
    }
    
    `
  ]
})
export class LoginComponent {

  loginForm: FormGroup = this.fb.group({
    CEDULA: [null, [Validators.required]],
    CONTRASENA: [null, [Validators.required]]
  });


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) { }


  get controls(): any{
    return this.loginForm.controls;
  }

  isInvalid(campo: string): boolean | null{
    return this.controls[campo].errors && this.controls[campo].touched;
  }

  mensajeCredencialesInvalidas(){
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Credenciales Inválidas'});
  }



  login(){
    if (this.loginForm.invalid) {
      Object.values(this.loginForm.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }

    const body = this.loginForm.value;
    this.authService.login(body).subscribe(res=>{

      if(res === true){
        this.router.navigateByUrl('/sct');
      }else{
        this.mensajeCredencialesInvalidas();
      }
    })

  }

}
