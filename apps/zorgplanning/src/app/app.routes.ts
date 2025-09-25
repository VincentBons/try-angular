import { Route } from '@angular/router';
import { FeatureClientsDashboard } from '@zorgplanning/feature-clients-dashboard';

export const appRoutes: Route[] = [
  {
    path:'',
    pathMatch: 'full',
    redirectTo:'dashboard'
  },
  { path: 'dashboard', component: FeatureClientsDashboard },
  {
    path: 'client/:id',
    loadComponent: () => import("@zorgplanning/feature-client-details").then(m => m.FeatureClientDetails),
    title: 'Zorgplanning | Client details',
    children: [
      {
        path: 'add-care-moment',
        loadComponent: () => import("@zorgplanning/feature-form-care-moment").then(m => m.FeatureFormCareMoment),
        title: 'Zorgplanning | Voeg zorgmoment toe'
      }
    ]
  }
];
