import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from './dashboard/navigation/navigation.component';
import { PropertiesComponent } from './dashboard/properties/properties.component';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: '',
        redirectTo: 'imoveis',
        pathMatch: 'full',
      },
      {
        path: 'imoveis',
        component: PropertiesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
