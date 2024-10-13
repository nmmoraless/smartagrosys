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
import { SiembrasComponent } from './pages/siembra/siembras/siembras.component';
import { MantenimientosComponent } from './pages/mantenimiento/mantenimientos/mantenimientos.component';
import { FertilizantesComponent } from './pages/fertilizante/fertilizantes/fertilizantes.component';
import { PlagasComponent } from './pages/plaga/plagas/plagas.component';
import { CosechasComponent } from './pages/cosecha/cosechas/cosechas.component';
import { AlmacenesComponent } from './pages/almacen/almacenes/almacenes.component';
import { EtapasComponent } from './pages/etapa/etapas/etapas.component';
import { FrecuenciasComponent } from './pages/frecuencia/frecuencias/frecuencias.component';
import { SemillasComponent } from './pages/semilla/semillas/semillas.component';
import { TiposTerrenoComponent } from './pages/tipo-terreno/tipos-terreno/tipos-terreno.component';
import { UnidadesMedidaComponent } from './pages/unidad-medida/unidades-medida/unidades-medida.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'planificaciones', component: PlanificacionesComponent},
      {path: 'planificacion/agregar', component: PlanificacionCultivoComponent},
      {path: 'planificacion/editar/:id', component: PlanificacionCultivoComponent},
      {path: 'terrenos', component: ListaTerrenosComponent},
      {path: 'terreno/agregar', component: TerrenosComponent},
      {path: 'terreno/editar/:id', component: TerrenosComponent},
      {path: 'siembras', component: SiembrasComponent},
      {path: 'siembra/agregar', component: SiembraComponent},
      {path: 'siembra/editar/:id', component: SiembraComponent},
      {path: 'mantenimientos', component: MantenimientosComponent},
      {path: 'mantenimiento/agregar', component: MantenimientoComponent},
      {path: 'mantenimiento/editar/:id', component: MantenimientoComponent},
      {path: 'fertilizantes', component: FertilizantesComponent},
      {path: 'fertilizante/agregar', component: FertilizanteComponent},
      {path: 'fertilizante/editar/:id', component: FertilizanteComponent},
      {path: 'plagas', component: PlagasComponent},
      {path: 'plaga/agregar', component: PlagaComponent},
      {path: 'plaga/editar/:id', component: PlagaComponent},
      {path: 'cosechas', component: CosechasComponent},
      {path: 'cosecha/agregar', component: CosechaComponent},
      {path: 'cosecha/editar/:id', component: CosechaComponent},
      {path: 'almacenes', component: AlmacenesComponent},
      {path: 'almacen/agregar', component: AlmacenComponent},
      {path: 'almacen/editar/:id', component: AlmacenComponent},
      {path: 'etapas', component: EtapasComponent},
      {path: 'etapa/agregar', component: EtapaComponent},
      {path: 'etapa/editar/:id', component: EtapaComponent},
      {path: 'frecuencias', component: FrecuenciasComponent},
      {path: 'frecuencia/agregar', component: FrecuenciaComponent},
      {path: 'frecuencia/editar/:id', component: FrecuenciaComponent},
      {path: 'semillas', component: SemillasComponent},
      {path: 'semilla/agregar', component: SemillaComponent},
      {path: 'semilla/editar/:id', component: SemillaComponent},
      {path: 'tipos-terreno', component: TiposTerrenoComponent},
      {path: 'tipo-terreno/agregar', component: TipoTerrenoComponent},
      {path: 'tipo-terreno/editar/:id', component: TipoTerrenoComponent},
      {path: 'unidades-medida', component: UnidadesMedidaComponent},
      {path: 'unidad-medida/agregar', component: UnidadMedidaComponent},
      {path: 'unidad-medida/editar/:id', component: UnidadMedidaComponent},
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
