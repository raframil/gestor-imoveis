import { PropertiesService } from './../services/properties.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Property } from '../models/property';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css'],
})
export class EditPropertyComponent implements OnInit {
  property: Property;
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditPropertyComponent>,
    private formBuilder: FormBuilder,
    private propertiesService: PropertiesService,
    @Inject(MAT_DIALOG_DATA) public data: Property
  ) {
    this.property = data;

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

  ngOnInit(): void {
    this.form.patchValue(this.property);
  }

  update() {
    const property = Object.assign({}, this.form.value);
    const id = this.form.get('id').value;
    delete property.id;
    delete property.type;
    this.propertiesService.update(id, property).subscribe(
      (res) => {
        console.log(res);
        this.dialogRef.close(true);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
