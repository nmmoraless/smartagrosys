import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PlanificacionCultivoComponent } from './pages/planificacion-cultivo/planificacion-cultivo.component';
import { TerrenosComponent } from './pages/terrenos/terrenos.component';
import { NotfoundpageComponent } from './pages/notfoundpage/notfoundpage.component';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SiembraComponent } from './pages/siembra/siembra.component';
import { MantenimientoComponent } from './pages/mantenimiento/mantenimiento.component';
import { FertilizanteComponent } from './pages/fertilizante/fertilizante.component';
import { PlagaComponent } from './pages/plaga/plaga.component';
import { CosechaComponent } from './pages/cosecha/cosecha.component';
import { AlmacenComponent } from './pages/almacen/almacen.component';
import { EtapaComponent } from './pages/etapa/etapa.component';
import { FrecuenciaComponent } from './pages/frecuencia/frecuencia.component';
import { SemillaComponent } from './pages/semilla/semilla.component';
import { TipoTerrenoComponent } from './pages/tipo-terreno/tipo-terreno.component';
import { UnidadMedidaComponent } from './pages/unidad-medida/unidad-medida.component';
import { PlanificacionesComponent } from './pages/planificacion-cultivo/planificaciones/planificaciones.component';
import { ListaTerrenosComponent } from './pages/terrenos/lista-terrenos/lista-terrenos.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'planificacion', component: PlanificacionCultivoComponent},
      {path: 'planificacion/editar/:id', component: PlanificacionCultivoComponent},
      {path: 'planificaciones', component: PlanificacionesComponent},
      {path: 'terreno/agregar', component: TerrenosComponent},
      {path: 'terreno/editar/:id', component: TerrenosComponent},
      {path: 'terrenos', component: ListaTerrenosComponent},
      {path: 'siembra', component: SiembraComponent},
      {path: 'mantenimiento', component: MantenimientoComponent},
      {path: 'fertilizante', component: FertilizanteComponent},
      {path: 'plaga', component: PlagaComponent},
      {path: 'cosecha', component: CosechaComponent},
      {path: 'almacen', component: AlmacenComponent},
      {path: 'etapa', component: EtapaComponent},
      {path: 'frecuencia', component: FrecuenciaComponent},
      {path: 'semilla', component: SemillaComponent},
      {path: 'tipo-terreno', component: TipoTerrenoComponent},
      {path: 'unidad-medida', component: UnidadMedidaComponent},
      {path: '',redirectTo:'/dashboard', pathMatch: 'full'},
    ]
  },
  {path: 'login',component: LoginComponent},
  {path: 'register',component: RegisterComponent},
  {path: '**', component: NotfoundpageComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
