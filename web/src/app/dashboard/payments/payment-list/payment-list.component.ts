import { UtilService } from './../../../core/services/util/util.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessionalsService } from './../../professionals/services/professionals.service';
import { Component, OnInit } from '@angular/core';
import { Professional } from '../../professionals/models/professional';
import { MatTableDataSource } from '@angular/material/table';

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

export interface DataTable {
  salePrice: number;
  saleDate: string;
  buyerName: string;
  saleComission: number;
}

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css'],
})
export class PaymentListComponent implements OnInit {
  loading = false;
  professionals: Professional[] = [];
  months = MonthModel;

  form: FormGroup;

  loadingPayment = false;
  professional: any;

  dataSource: MatTableDataSource<DataTable> = new MatTableDataSource([]);
  // tabela
  displayedColumns: string[] = [
    'saleDate',
    'buyerName',
    'salePrice',
    'saleComission',
  ];

  constructor(
    private professionalsService: ProfessionalsService,
    private formBuilder: FormBuilder,
    private utilService: UtilService
  ) {
    this.form = this.formBuilder.group({
      month: ['', [Validators.required]],
      year: ['', [Validators.required]],
      professional: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.listProfessionals();
  }

  getById() {
    this.utilService.validateAllFormFields(this.form);

    if (this.form.invalid) {
      return;
    }

    const professional = this.form.get('professional').value;
    const month = this.form.get('month').value;
    const year = this.form.get('year').value;

    this.loadingPayment = true;
    this.professionalsService
      .getById(professional, month, year)
      .subscribe((res) => {
        this.professional = res;
        this.dataSource = new MatTableDataSource(res.professionalSales);
        console.warn(res);
      })
      .add(() => {
        this.loadingPayment = false;
      });
  }

  listProfessionals() {
    this.loading = true;
    try {
      this.professionalsService
        .list()
        .subscribe((res) => {
          this.professionals = res;
        })
        .add(() => {
          this.loading = false;
        });
    } catch (error) {
      console.error(error);
    }
  }
}
