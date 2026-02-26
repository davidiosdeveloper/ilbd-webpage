import { Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout.component/layout.component';
import { Home } from './features/home/home';
import { Petitions } from '@features/petitions/petitions';
import { Events } from '@features/events/events';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: Home },
      { path: 'petitions', component: Petitions },
      { path: 'events', component: Events }
    ]
  }
];