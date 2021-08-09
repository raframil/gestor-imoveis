import { UtilService } from './../../../core/services/util/util.service';
import { Property } from './../models/property';
import { EditPropertyComponent } from '../edit-property/edit-property.component';
import { PropertiesService } from '../services/properties.service';
import { Component, OnInit } from '@angular/core';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from 'src/app/core/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AddPropertyComponent } from '../add-property/add-property.component';

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
    public dialog: MatDialog,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.list();
  }

  mapAvailableTypes(properties) {
    return properties
      .map((property) => {
        return property.type;
      })
      .filter((item, index, arry) => arry.indexOf(item) === index);
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

  create() {
    const dialogRef = this.dialog.open(AddPropertyComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.list();
      }
    });
  }

  list() {
    this.loading = true;
    try {
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
    } catch (error) {
      console.error(error);
    }
  }

  edit(property: Property) {
    const dialogRef = this.dialog.open(EditPropertyComponent, {
      width: '600px',
      data: property,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.list();
      }
    });
  }

  delete(property: Property) {
    const message = `Você tem certeza que deseja excluir ${property.type} de ${property.sellerName}?`;
    const dialogData = new ConfirmDialogModel('Excluir propriedade', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.propertiesService.delete(property.id).subscribe(
          (res) => {
            this.list();
          },
          (error) => {
            this.list();
          }
        );
      }
    });
  }

  onImgError(event) {
    event.target.src = 'assets/houseplaceholder.jpg';
  }
}
