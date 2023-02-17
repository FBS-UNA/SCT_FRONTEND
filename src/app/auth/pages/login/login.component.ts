import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  ) { }


  get controls(): any{
    return this.loginForm.controls;
  }

  isInvalid(campo: string): boolean | null{
    return this.controls[campo].errors && this.controls[campo].touched;
  }

  checkInputs(){
    if (this.loginForm.invalid) {
      Object.values(this.loginForm.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }
  }

  login(){

    this.checkInputs();

    console.log('Hola')
  }

}
