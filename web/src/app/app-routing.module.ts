import { ReportsComponent } from './dashboard/reports/reports.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from './dashboard/navigation/navigation.component';
import { ProfessionalListComponent } from './dashboard/professionals/professional-list/professional-list.component';
import { SalesComponent } from './dashboard/sales/list-sale/sales.component';
import { PropertiesComponent } from './dashboard/properties/list-property/properties.component';
import { PaymentListComponent } from './dashboard/payments/payment-list/payment-list.component';

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
      {
        path: 'vendas',
        component: SalesComponent,
      },
      {
        path: 'pagamentos',
        component: PaymentListComponent,
      },
      {
        path: 'relatorios',
        component: ReportsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
