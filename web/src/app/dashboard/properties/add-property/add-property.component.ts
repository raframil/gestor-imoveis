import { UtilService } from './../../../core/services/util/util.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PropertiesService } from '../services/properties.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddPropertyComponent>,
    private formBuilder: FormBuilder,
    private propertiesService: PropertiesService,
    private utilService: UtilService
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

    const property = this.form.value;

    this.propertiesService.create(property).subscribe(
      (res) => {
        console.log(res);
        this.dialogRef.close(true);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
