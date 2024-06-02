import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotfoundpageComponent } from './pages/notfoundpage/notfoundpage.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotfoundpageComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy} // Soluciona el error al actualizar la página donde se perdía la ruta (adiciona un (#) en la url).
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
