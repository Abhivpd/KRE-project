import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/pages/public/public.module').then(
        (m) => m.PublicModule
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/pages/private/private.module').then(
        (m) => m.PrivateModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
