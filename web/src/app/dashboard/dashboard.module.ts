import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { NavigationComponent } from './navigation/navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDialogComponent } from '../core/confirm-dialog/confirm-dialog.component';
import { EditPropertyComponent } from './properties/edit-property/edit-property.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddPropertyComponent } from './properties/add-property/add-property.component';
import { PropertiesComponent } from './properties/list-property/properties.component';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { ProfessionalListComponent } from './professionals/professional-list/professional-list.component';
import { EditProfessionalComponent } from './professionals/professional-edit/edit-professional.component';
import { AddProfessionalComponent } from './professionals/professional-add/add-professional.component';
import { AddSaleComponent } from './sales/add-sale/add-sale.component';
import { SalesComponent } from './sales/list-sale/sales.component';



export const customCurrencyMaskConfig = {
  align: 'left',
  allowNegative: true,
  allowZero: true,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL,
};

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    PropertiesComponent,
    NavigationComponent,
    EditPropertyComponent,
    AddPropertyComponent,
    ProfessionalListComponent,
    EditProfessionalComponent,
    AddProfessionalComponent,
    AddSaleComponent,
    SalesComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot(),
  ],
})
export class DashboardModule {}
