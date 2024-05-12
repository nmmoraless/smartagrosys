import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotfoundpageComponent } from './pages/notfoundpage/notfoundpage.component';
import { ColorthemeComponent } from './shared/colortheme/colortheme.component';
import { PlanificacionCultivoComponent } from './pages/planificacion-cultivo/planificacion-cultivo.component';
import { TerrenosComponent } from './pages/terrenos/terrenos.component';

@NgModule({
  declarations: [
    AppComponent,
    BreadcrumbsComponent, 
    DashboardComponent, 
    HeaderComponent, 
    LoginComponent,
    NotfoundpageComponent,
    RegisterComponent,
    SidebarComponent,
    ColorthemeComponent,
    PlanificacionCultivoComponent,
    TerrenosComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
