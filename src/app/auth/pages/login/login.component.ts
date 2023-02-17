import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    CEDULA: [null, [Validators.required]],
    CONTRASENA: [null, [Validators.required]]
  });


  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  get controls(): any{
    return this.loginForm.controls;
  }

  isInvalid(campo: string): boolean | null{
    return this.controls[campo].errors && this.controls[campo].touched;
  }

  login(){
    console.log('Hola')
  }

}
