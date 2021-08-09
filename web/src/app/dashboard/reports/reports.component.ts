import { ProfessionalsService } from './../professionals/services/professionals.service';
import { PropertiesService } from './../properties/services/properties.service';
import { SalesService } from './../sales/services/sales.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpParams } from '@angular/common/http';

const MonthModel = [
  { text: 'Janeiro', value: 1 },
  { text: 'Fevereiro', value: 2 },
  { text: 'Março', value: 3 },
  { text: 'Abril', value: 4 },
  { text: 'Maior', value: 5 },
  { text: 'Junho', value: 6 },
  { text: 'Julho', value: 7 },
  { text: 'Agosto', value: 8 },
  { text: 'Setembro', value: 9 },
  { text: 'Outubro', value: 10 },
  { text: 'Novembro', value: 11 },
  { text: 'Dezembro', value: 12 },
];

export interface DataTableFaturamento {
  salePrice: number;
  saleDate: string;
  buyerName: string;
  saleComission: number;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  months = MonthModel;
  form: FormGroup;
  loading = false;

  saleData: any;

  highestComissionProfessional: any;

  // tabela
  dataSourceFaturamento: MatTableDataSource<DataTableFaturamento> =
    new MatTableDataSource([]);
  displayedColumnsFaturamento: string[] = [
    'saleDate',
    'property',
    'propertyPrice',
    'buyerName',
    'salePrice',
    'seller',
    'profit',
  ];

  displayedColumnsProperties: string[] = [
    'saleDate',
    'sellerName',
    'propertyType',
    'description',
    'propertyPrice',
    'buyerName',
    'salePrice',
    'seller',
  ];

  dataSourceStranded: MatTableDataSource<any> = new MatTableDataSource([]);
  displayedColumnsStranded: string[] = [
    'id',
    'date',
    'sellerName',
    'type',
    'description',
    'price',
  ];

  displayedColumnsProf: string[] = [
    'name',
    'creci',
    'type',
    'admissionDate',
    'salary',
    'commissionPercentage',
    'calculatedIncome',
    'comissionSum',
    'totalSales',
  ];
  dataSourceProfessionals: MatTableDataSource<any> = new MatTableDataSource([]);

  constructor(
    private formBuilder: FormBuilder,
    private salesService: SalesService,
    private propertiesService: PropertiesService,
    private professionalsService: ProfessionalsService
  ) {
    this.form = this.formBuilder.group({
      month: [''],
      year: [''],
    });
  }

  ngOnInit(): void {}

  searchProfessionalProfit() {
    let params: HttpParams;
    params = new HttpParams().set('income', '1');

    const month = this.form.get('month').value;
    const year = this.form.get('year').value;

    if (month && year) {
      params = new HttpParams()
        .set('income', '1')
        .set('month', month)
        .set('year', year);
    }

    return new Promise((resolve) => {
      this.professionalsService.list(params).subscribe((res) => {
        this.dataSourceProfessionals = new MatTableDataSource(
          res.professionals
        );
        this.highestComissionProfessional = res.highestComissionProfessional;
        console.warn(res);
        resolve(null);
      });
    });
  }

  searchStrandedProperties() {
    return new Promise((resolve, reject) => {
      const params = new HttpParams();
      params.set('stranded', '1');

      this.propertiesService.list(params).subscribe((res) => {
        this.dataSourceStranded = new MatTableDataSource(res);
        resolve(null);
      });
    });
  }

  searchSales() {
    const month = this.form.get('month').value;
    const year = this.form.get('year').value;

    return new Promise((resolve, reject) => {
      this.salesService.list(1, month, year).subscribe((res) => {
        this.saleData = res;
        this.dataSourceFaturamento = new MatTableDataSource(res.sales);
        resolve(null);
      });
    });
  }

  async search() {
    this.loading = true;
    await this.searchSales();
    await this.searchStrandedProperties();
    await this.searchProfessionalProfit();
    this.loading = false;
  }
}
