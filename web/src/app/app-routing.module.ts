import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from './dashboard/navigation/navigation.component';
import { ProfessionalListComponent } from './dashboard/professionals/professional-list/professional-list.component';
import { PropertiesComponent } from './dashboard/properties/list-property/properties.component';

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
      {
        path: 'corretores',
        component: ProfessionalListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}