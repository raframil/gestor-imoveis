import { Sale } from '../models/sale';
import { UtilService } from './../../../core/services/util/util.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SalesService } from '../services/sales.service';
import { ToastrService } from 'ngx-toastr';
import { Property } from '../../properties/models/property';
import { PropertiesService } from '../../properties/services/properties.service';
import { Professional } from '../../professionals/models/professional';
import { ProfessionalsService } from '../../professionals/services/professionals.service';
// interface Type {
//   value: string;
//   viewValue: string;
// }

@Component({
  selector: 'app-add-sale',
  templateUrl: './add-sale.component.html',
  styleUrls: ['./add-sale.component.css'],
})
export class AddSaleComponent implements OnInit {
  form: FormGroup;

  sellers: Professional[] = [];
  properties: Property[] = [];
  loading = false;

  public listProperties() {
    this.loading = true;
    try {
      this.propertiesService
        .list()
        .subscribe((res) => {
          this.properties = res;
        })
        .add(() => {
          this.loading = false;
        });
    } catch (error) {
      console.error(error);
    }
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

  constructor(
    public dialogRef: MatDialogRef<AddSaleComponent>,
    private formBuilder: FormBuilder,
    private salesService: SalesService,
    private utilService: UtilService,
    private toastr: ToastrService,
    private propertiesService: PropertiesService,
    private professionalService: ProfessionalsService,
  ) {
    // console.log(property, seller);
    this.form = this.formBuilder.group({
      salePrice: ['', [Validators.required, Validators.maxLength(255)]],
      saleDate: ['', [Validators.required, Validators.maxLength(255)]],
      buyerName: ['', [Validators.required, Validators.maxLength(255)]],
      propertyId: ['', [Validators.required, Validators.maxLength(255)]],
      sellerId: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  ngOnInit(): void {
    this.listProperties();
    this.listSellers();
  }

  create() {

    console.log(this.form);
    this.utilService.validateAllFormFields(this.form);

    if (this.form.invalid) {
      console.log('Formulário inválido');
      return;
    }else{
      console.log('form válido');
    }

    const sale: Sale = this.form.value;
    sale.saleDate = this.utilService.toDate(sale.saleDate.toString());

    console.log('A venda: ', sale);
    this.salesService.create(sale).subscribe(
      (res) => {
        this.dialogRef.close(true);
      },
      (error) => {
        if (error.status === 409) {
          this.toastr.warning(
            // `Um imóvel com o código ${sale.id} já existe`,
            'Atenção'
          );
        }
        console.error(error);
      }
    );
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
