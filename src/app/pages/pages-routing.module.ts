import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenGuard } from '../guard/token.guard';
import { DetailGroupComponent } from './detail-group/detail-group.component';
import { GroupComponent } from './group/group.component';
import { PagesComponent } from './pages.component';
import { ParticipantsComponent } from './participants/participants.component';
import { UserProfileDetailsComponent } from './user-profile-details/user-profile-details.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  {
    path: 'main',
    component: PagesComponent,
    canActivate: [TokenGuard],
    canLoad: [TokenGuard],
    children: [
      {path: 'user/:id', component: UserComponent},
      {path: 'group/:id', component: GroupComponent},
      {path: 'participants/:id', component: ParticipantsComponent},
      {path: 'group/detail/:id', component: DetailGroupComponent},
      {path: 'user/profile/:id', component: UserProfileDetailsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
