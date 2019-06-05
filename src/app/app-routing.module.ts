import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from './framework/start/start.component';
import { ImpressumComponent } from './framework/impressum/impressum.component';
import { ClientsComponent } from './framework/clients/clients.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/start',
    pathMatch: 'full'
  },
  {
    path: 'start',
    component: StartComponent
  },
  // {
  //   path: 'clients',
  //   component: ClientsComponent
  // },
  {
    path: 'impressum',
    component: ImpressumComponent
  },
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule)
  },
  {
    path: 'workshops',
    loadChildren: () =>
      import('./workshops/workshops.module').then(m => m.WorkshopsModule)
  },
  {
    path: 'ngx-img-cropper',
    loadChildren: () =>
      import('./cropper/cropper.module').then(m => m.CropperModule)
  },
  {
    path: '**',
    redirectTo: '/start',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
