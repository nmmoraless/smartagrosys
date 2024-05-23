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

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'planificacion', component: PlanificacionCultivoComponent},
      {path: 'terrenos', component: TerrenosComponent},
      {path: 'siembra', component: SiembraComponent},
      {path: 'mantenimiento', component: MantenimientoComponent},
      {path: 'fertilizante', component: FertilizanteComponent},
      {path: 'plaga', component: PlagaComponent},
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
