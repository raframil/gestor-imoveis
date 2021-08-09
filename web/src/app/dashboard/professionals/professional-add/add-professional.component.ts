import { Professional } from '../models/professional';
import { UtilService } from '../../../core/services/util/util.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProfessionalsService } from '../services/professionals.service';
import { ToastrService } from 'ngx-toastr';
interface Type {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-professional',
  templateUrl: './add-professional.component.html',
  styleUrls: ['./add-professional.component.css'],
})
export class AddProfessionalComponent implements OnInit {
  form: FormGroup;
  types: Type[] = [
    { value: 'Contratado', viewValue: 'Contratado' },
    { value: 'Comissionado', viewValue: 'Comissionado' },
  ];

  constructor(
    public dialogRef: MatDialogRef<AddProfessionalComponent>,
    private formBuilder: FormBuilder,
    private professionalsService: ProfessionalsService,
    private utilService: UtilService,
    private toastr: ToastrService
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      creci: ['', [Validators.required, Validators.maxLength(255)]],
      type: ['', [Validators.required, Validators.maxLength(255)]],
      salary: ['', [Validators.maxLength(255)]],
      admissionDate: ['', [Validators.required, Validators.maxLength(255)]],
      commissionPercentage: [
        '1',
        [Validators.required, Validators.maxLength(255)],
      ],
    });
  }

  ngOnInit(): void {}

  create() {
    console.log(this.form);
    this.utilService.validateAllFormFields(this.form);

    if (this.form.invalid) {
      console.log('Formulário inválido');
      return;
    }

    const professional: Professional = this.form.value;
    professional.admissionDate = this.utilService.toDate(
      professional.admissionDate.toString()
    );

    if (professional.type === 'Comissionado') {
      delete professional.salary;
    }

    this.professionalsService.create(professional).subscribe(
      (res) => {
        this.dialogRef.close(true);
      },
      (error) => {
        if (error.status === 409) {
          this.toastr.warning(
            `Um profissional com o creci ${professional.creci} já existe`,
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
