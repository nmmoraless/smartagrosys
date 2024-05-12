import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PlanificacionCultivoComponent } from './pages/planificacion-cultivo/planificacion-cultivo.component';
import { TerrenosComponent } from './pages/terrenos/terrenos.component';
import { NotfoundpageComponent } from './pages/notfoundpage/notfoundpage.component';

const routes: Routes = [
  {path: 'dashboard',component: DashboardComponent},
  {path: 'login',component: LoginComponent},
  {path: 'register',component: RegisterComponent},
  {path: 'planificacion',component: PlanificacionCultivoComponent},
  {path: 'terrenos', component: TerrenosComponent},
  {path: '',redirectTo:'/dashboard', pathMatch: 'full'},
  {path: '**', component: NotfoundpageComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
