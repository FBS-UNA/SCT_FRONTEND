import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [

    `
    :host ::ng-deep .p-menubar {
      background-color: white;
      border-radius: 0px 0px 10px 10px;
      z-index: 100;
      margin-left: 15%;
      height: 10%;
    }
    
    `
]
})
export class NavbarComponent implements OnInit {


  items = [
    {

      label: 'Mi actividad',
      icon: 'pi pi-bookmark',
      id:1,
      styleClass: 'p-button-text',
      
    },
    {

      label: 'Mi Peril',
      icon: 'pi pi-id-card',
      id:2,
      styleClass: 'p-button-text'
    },
    {

      label: 'Salir',
      icon: 'pi pi-sign-out',
      styleClass: 'p-button-text p-button-danger ms-3',
      id:3,
      event : this.cerrarSesion
    },

  ];

  foo(id: number){

    this.items.forEach(item=>{
      if(id === item.id){
        item.event?.call
      }
    })

  }


  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  get usuario() {
    return this.authService.usuario;
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.router.navigateByUrl('/auth');
  }

  ngOnInit(): void {
  }

}
