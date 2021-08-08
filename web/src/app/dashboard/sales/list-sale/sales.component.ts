import { Sale } from '../models/sale';
import { SalesService } from '../services/sales.service';
import { Component, OnInit } from '@angular/core';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from 'src/app/core/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AddSaleComponent } from '../add-sale/add-sale.component';
import { Professional } from '../../professionals/models/professional';
import { ProfessionalsService } from '../../professionals/services/professionals.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent implements OnInit {
  sales: Sale[] = [];
  nonFilteredPropertis: Sale[];
  loading = false;

  sellers: Professional[] = [];
  availableSeller: [];

  constructor(
    private salesService: SalesService,
    private professionalService: ProfessionalsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.list();
    this.listSellers();
  }

  mapAvailableSeller(sales) {
    return sales.map((sale) => {
      return sale.seller;
    });
  }

  public listSellers() {
    this.loading = true;
    try {
      this.professionalService
        .list()
        .subscribe((res) => {
          this.sellers = res;
        })
        .add(() => {
          this.loading = false;
        });
    } catch (error) {
      console.error(error);
    }
  }

  onChange(sellerId) {
    this.sales = this.nonFilteredPropertis;
    if (sellerId === 'all') {
      return;
    }

    const filteredValues = this.sales.filter((sale) => {
      return sale.sellerId === sellerId;
    });

    this.sales = filteredValues;
  }

  create() {
    const dialogRef = this.dialog.open(AddSaleComponent, {
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
      this.salesService
        .list()
        .subscribe((res) => {
          this.sales = res;
          this.nonFilteredPropertis = res;
          this.availableSeller = this.mapAvailableSeller(res);
        })
        .add(() => {
          this.loading = false;
        });
    } catch (error) {
      console.error(error);
    }
  }

  onImgError(event) {
    event.target.src = 'assets/houseplaceholder.jpg';
  }
}
