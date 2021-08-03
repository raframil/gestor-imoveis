import { Property } from './../models/property';
import { UtilService } from './../../../core/services/util/util.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PropertiesService } from '../services/properties.service';
import { ToastrService } from 'ngx-toastr';
interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  form: FormGroup;
  types: Type[] = [
    { value: 'Casa', viewValue: 'Casa' },
    { value: 'Apartamento', viewValue: 'Apartamento' },
    { value: 'Sala comercial', viewValue: 'Sala comercial' },
    { value: 'Lote', viewValue: 'Lote' },
    { value: 'Chácara', viewValue: 'Chácara' },
    { value: 'Sítio', viewValue: 'Sítio' },
    { value: 'Fazenda', viewValue: 'Fazenda' },
  ];

  constructor(
    public dialogRef: MatDialogRef<AddPropertyComponent>,
    private formBuilder: FormBuilder,
    private propertiesService: PropertiesService,
    private utilService: UtilService,
    private toastr: ToastrService
  ) {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      type: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      sellerName: ['', [Validators.required, Validators.maxLength(255)]],
      price: ['', [Validators.required, Validators.maxLength(255)]],
      image: ['', [Validators.required, Validators.maxLength(1000)]],
      date: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  ngOnInit(): void {}

  create() {
    this.utilService.validateAllFormFields(this.form);

    if (this.form.invalid) {
      return;
    }

    const property: Property = this.form.value;
    property.date = this.utilService.toDate(property.date.toString());

    this.propertiesService.create(property).subscribe(
      (res) => {
        this.dialogRef.close(true);
      },
      (error) => {
        if (error.status === 409) {
          this.toastr.warning(
            `Um imóvel com o código ${property.id} já existe`,
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
