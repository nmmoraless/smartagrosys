import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ColorthemeComponent } from './colortheme/colortheme.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    BreadcrumbsComponent, 
    ColorthemeComponent,
    HeaderComponent, 
    SidebarComponent,
  ],
  exports: [
    BreadcrumbsComponent, 
    ColorthemeComponent,
    HeaderComponent, 
    SidebarComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
