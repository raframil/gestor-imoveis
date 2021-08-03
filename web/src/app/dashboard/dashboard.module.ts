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

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    PropertiesComponent,
    NavigationComponent,
    EditPropertyComponent,
    AddPropertyComponent,
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
  ],
})
export class DashboardModule {}
