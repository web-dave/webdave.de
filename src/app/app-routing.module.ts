import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogComponent } from './blog/blog.component';

const routes: Routes = [
  {
    path: 'blog',
    component: BlogListComponent,
  },
  {
    path: 'blog/:url',
    component: BlogComponent,
  },
  {
    path: 'workshops',
    loadChildren: async () =>
      (await import('./workshops/workshops.module')).WorkshopsModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
