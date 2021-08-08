// import { Component, OnInit } from '@angular/core';
import { Professional } from './../models/professional';
import { EditProfessionalComponent } from '../professional-edit/edit-professional.component';
import { ProfessionalsService } from '../services/professionals.service';
import { Component, OnInit } from '@angular/core';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from 'src/app/core/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AddProfessionalComponent } from '../professional-add/add-professional.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-professional-list',
  templateUrl: './professional-list.component.html',
  styleUrls: ['./professional-list.component.css'],
})

export class ProfessionalListComponent implements OnInit {
  professionals: Professional[] = [];
  nonFilteredPropertis: Professional[];
  loading = false;


  availableTypes: [];

  constructor(
    private professionalsService: ProfessionalsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.list();
  }

  mapAvailableTypes(professionals) {
    return professionals.map((professional) => {
      return professional.type;
    });
  }

  onChange(type) {
    this.professionals = this.nonFilteredPropertis;
    if (type === 'all') {
      return;
    }

    const filteredValues = this.professionals.filter((professional) => {
      return professional.type === type;
    });

    this.professionals = filteredValues;
  }

  create() {
    const dialogRef = this.dialog.open(AddProfessionalComponent, {
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
      this.professionalsService
        .list()
        .subscribe((res) => {
          this.professionals = res;
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

  edit(professional: Professional) {
    const dialogRef = this.dialog.open(EditProfessionalComponent, {
      width: '600px',
      data: professional,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.list();
      }
    });
  }

  delete(professional: Professional) {
    const message = `Você tem certeza que deseja excluir ${professional.type} de ${professional.creci}?`;
    const dialogData = new ConfirmDialogModel('Excluir propriedade', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.professionalsService.delete(professional._id).subscribe(
          (res) => {
            this.list();
          },
          (error) => {
            console.log('deu erro');
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
