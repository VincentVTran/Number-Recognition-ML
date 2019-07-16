import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MainScreenComponent } from './components/main-screen/main-screen.component';
import { AboutComponent } from './components/about/about.component';
const routes: Routes = [
  { path:'about', component: AboutComponent},
  { path:'canvas', component: MainScreenComponent},
  { path:'', redirectTo: '/canvas', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
