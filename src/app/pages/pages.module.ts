import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { UserComponent } from './user/user.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PagesComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterLinkActive,
    RouterLink,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PagesModule { }