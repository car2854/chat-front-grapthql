import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { UserComponent } from './user/user.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { GroupComponent } from './group/group.component';
import { ParticipantsComponent } from './participants/participants.component';
import { DetailGroupComponent } from './detail-group/detail-group.component';


@NgModule({
  declarations: [
    PagesComponent,
    UserComponent,
    GroupComponent,
    ParticipantsComponent,
    DetailGroupComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterLinkActive,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule
  ]
})
export class PagesModule { }
