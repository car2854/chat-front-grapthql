import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenGuard } from '../guard/token.guard';
import { PagesComponent } from './pages.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  {
    path: 'main',
    component: PagesComponent,
    canActivate: [TokenGuard],
    canLoad: [TokenGuard],
    children: [
      {path: ':id', component: UserComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
