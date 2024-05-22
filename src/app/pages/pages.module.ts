import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlanificacionCultivoComponent } from './planificacion-cultivo/planificacion-cultivo.component';
import { TerrenosComponent } from './terrenos/terrenos.component';
import { PagesComponent } from './pages.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    DashboardComponent, 
    PlanificacionCultivoComponent,
    TerrenosComponent,
    PagesComponent, 
  ],
  exports: [
    DashboardComponent, 
    PlanificacionCultivoComponent,
    TerrenosComponent, 
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
