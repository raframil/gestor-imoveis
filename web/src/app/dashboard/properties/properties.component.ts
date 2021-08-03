import { PropertiesService } from './services/properties.service';
import { Component, OnInit } from '@angular/core';
import { Property } from './models/property';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from 'src/app/core/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
})
export class PropertiesComponent implements OnInit {
  properties: Property[] = [];
  nonFilteredPropertis: Property[];
  loading = false;

  availableTypes: [];

  constructor(
    private propertiesService: PropertiesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.list();
  }

  mapAvailableTypes(properties) {
    return properties.map((property) => {
      return property.type;
    });
  }

  onChange(type) {
    this.properties = this.nonFilteredPropertis;
    if (type === 'all') {
      return;
    }

    const filteredValues = this.properties.filter((property) => {
      return property.type === type;
    });

    this.properties = filteredValues;
  }

  list() {
    this.loading = true;
    try {
      setTimeout(() => {
        this.propertiesService
          .list()
          .subscribe((res) => {
            this.properties = res;
            this.nonFilteredPropertis = res;
            this.availableTypes = this.mapAvailableTypes(res);
          })
          .add(() => {
            this.loading = false;
          });
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  }

  delete(property: Property) {
    console.warn('opaaaa');
    console.warn(property);

    const message = `Você tem certeza que deseja excluir?`;
    const dialogData = new ConfirmDialogModel('Confirmar aluguel', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.warn(result);
      if (result) {
      }
    });
  }
}
