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
import { FormsModule } from '@angular/forms';
import { TablaAreasComponent } from './components/tabla-areas/tabla-areas.component';
import { TablaTramitesComponent } from './components/tabla-tramites/tabla-tramites.component';


@NgModule({
  declarations: [
    RegistroEntradaComponent,
    InicioComponent,
    MantenimientoAreasComponent,
    MantenimientoTramitesComponent,
    MainComponent,
    TablaAreasComponent,
    TablaTramitesComponent
  ],
  imports: [
    CommonModule,
    SCTRoutingModule,
    PrimeNgModule,
    SharedModule,
    FormsModule
  ]
})
export class SCTModule { }
