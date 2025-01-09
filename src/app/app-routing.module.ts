import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UserComponent } from './user/user.component';

const appRoutes: Route[] = [
  {
    path: '',
    component: HomepageComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
