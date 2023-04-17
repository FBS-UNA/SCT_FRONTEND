import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SCTRoutingModule } from './sct-routing.module';
import { RegistroEntradaComponent } from './pages/registro-entrada/registro-entrada.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MantenimientoAreasComponent } from './pages/mantenimiento-areas/mantenimiento-areas.component';
import { MantenimientoTramitesComponent } from './pages/mantenimiento-tramites/mantenimiento-tramites.component';
import { MainComponent } from './pages/main/main.component';
import { SharedModule } from '../shared/shared.module';
import { TablaAreasComponent } from './components/tabla-areas/tabla-areas.component';
import { TablaTramitesComponent } from './components/tabla-tramites/tabla-tramites.component';
import { AsociarTramitesDialogComponent } from './components/asociar-tramites-dialog/asociar-tramites-dialog.component';
import { FormularioRegistroEntradaComponent } from './components/formulario-registro-entrada/formulario-registro-entrada.component';


import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { AEDTramiteComponent } from './components/aed-tramite/aed-tramite.component';
import { AEDAreaComponent } from './components/aed-area/aed-area.component';
import { RegistroTramiteComponent } from './pages/registro-tramite/registro-tramite.component';
import { FormularioRegistroTramiteComponent } from './components/formulario-registro-tramite/formulario-registro-tramite.component';
import { CRRegistroTramiteComponent } from './components/cr-registro-tramite/cr-registro-tramite.component';
import { AsignacionRolesComponent } from './pages/asignacion-roles/asignacion-roles.component';
import { TablaAsignacionRolesComponent } from './components/tabla-asignacion-roles/tabla-asignacion-roles.component';
import { EUsuarioComponent } from './components/e-usuario/e-usuario.component';



@NgModule({
  declarations: [
    RegistroEntradaComponent,
    InicioComponent,
    MantenimientoAreasComponent,
    MantenimientoTramitesComponent,
    MainComponent,

    TablaAreasComponent,
    TablaTramitesComponent,
    AsociarTramitesDialogComponent,
    FormularioRegistroEntradaComponent,
    FormularioRegistroTramiteComponent,

    AEDTramiteComponent,
    AEDAreaComponent,
    RegistroTramiteComponent,
    FormularioRegistroTramiteComponent,
    CRRegistroTramiteComponent,
    RegistroTramiteComponent,
    AsignacionRolesComponent,
    TablaAsignacionRolesComponent,
    EUsuarioComponent,
  ],
  imports: [
    CommonModule,
    SCTRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class SCTModule { }
