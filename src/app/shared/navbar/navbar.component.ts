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
