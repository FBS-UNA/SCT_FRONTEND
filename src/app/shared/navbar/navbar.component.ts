import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {


  items: MenuItem[] = [
    {
      label:'Salir',
      icon: 'pi pi-sign-out',
      command: ()=>{this.cerrarSesion()}
    }
  ];


  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  get usuario(){
    return this.authService.usuario;
  }

  cerrarSesion(){
    this.authService.cerrarSesion();
    this.router.navigateByUrl('/auth');
  }

  ngOnInit(): void {
  }

}
