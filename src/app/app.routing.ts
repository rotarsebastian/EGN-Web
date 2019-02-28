import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
