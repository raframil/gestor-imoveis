import { UtilService } from '../../../core/services/util/util.service';
import { ProfessionalsService } from '../services/professionals.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Professional } from '../models/professional';

@Component({
  selector: 'app-edit-professional',
  templateUrl: './edit-professional.component.html',
  styleUrls: ['./edit-professional.component.css'],
})
export class EditProfessionalComponent implements OnInit {
  professional: Professional;
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditProfessionalComponent>,
    private formBuilder: FormBuilder,
    private professionalsService: ProfessionalsService,
    private utilService: UtilService,
    @Inject(MAT_DIALOG_DATA) public data: Professional
  ) {
    this.professional = data;

    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      creci: ['', [Validators.required, Validators.maxLength(255)]],
      type: ['', [Validators.required, Validators.maxLength(255)]],
      salary: ['', [Validators.required, Validators.maxLength(255)]],
      admissionDate: ['', [Validators.required, Validators.maxLength(255)]],
      commissionPercentage: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  ngOnInit(): void {
    const admissionDate = this.professional.admissionDate.toString().split('T')[0];
    const formatDate = this.utilService.fromDate(admissionDate);
    this.form.patchValue(this.professional);
    this.form.get('admissionDate').setValue(formatDate);
  }

  update() {
    const professional = Object.assign({}, this.form.value);
    const id = this.professional._id;
    console.log('Profissional: ',professional);
    // delete professional._id;
    // delete professional.type;
    // professional.admissionDate = this.utilService.toDate(professional.admissionDate.toString());
    this.professionalsService.update(id, professional).subscribe(
      (res) => {
        // console.log(res);
        this.dialogRef.close(true);
      },
      (error) => {
        console.error("Error: ", error);
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
