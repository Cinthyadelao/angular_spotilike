import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
  { path: 'admin', loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule) },
  { path: 'music', loadChildren: () => import('./music/music.module').then(m => m.MusicModule) },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
