import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { PresentacionLoginComponent } from './components/presentacion-login/presentacion-login.component';
import {ToastModule} from 'primeng/toast';
import { RegisterComponent } from './pages/register/register/register.component';


@NgModule({
  declarations: [
    LoginComponent,
    MainComponent,
    PresentacionLoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
    ToastModule
  ]
})
export class AuthModule { }
