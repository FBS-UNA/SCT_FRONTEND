import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { PresentacionLoginComponent } from './components/presentacion-login/presentacion-login.component';


@NgModule({
  declarations: [
    LoginComponent,
    MainComponent,
    PresentacionLoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    PrimeNgModule
  ]
})
export class AuthModule { }
