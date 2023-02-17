import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SCTRoutingModule } from './sct-routing.module';
import { RegistroEntradaComponent } from './pages/registro-entrada/registro-entrada.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MantenimientoAreasComponent } from './pages/mantenimiento-areas/mantenimiento-areas.component';
import { MantenimientoTramitesComponent } from './pages/mantenimiento-tramites/mantenimiento-tramites.component';
import { MainComponent } from './pages/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';


@NgModule({
  declarations: [
    RegistroEntradaComponent,
    InicioComponent,
    MantenimientoAreasComponent,
    MantenimientoTramitesComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    SCTRoutingModule,
    PrimeNgModule,
    SharedModule
  ]
})
export class SCTModule { }
