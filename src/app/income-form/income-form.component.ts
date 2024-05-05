import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import moment from "moment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {IncomeService} from "../income.service";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-income-form',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    NgIf,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatHint,
    MatLabel,
    MatSuffix,
    MatButton
  ],
  templateUrl: './income-form.component.html',
  styleUrl: './income-form.component.css'
})
export class IncomeFormComponent {
  incomeService = inject(IncomeService)

  form: FormGroup = new FormGroup({
    amount: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    source: new FormControl(''),
    monthYear: new FormControl(moment())
  })

  async onSubmit() {
    let income = this.form.value
    income.monthYear = income.monthYear.toISOString()
    await this.incomeService.addNewIncome(income)
    this.openSnackBar("Income Added Successfully")
    this.form.reset()
    await this.router.navigate(['/income'])
  }

  setMonthAndYear(normalizedMonthAndYear: any, datepicker: MatDatepicker<any>) {
    // const ctrlValue = this.date.value ?? moment();
    const ctrlValue = this.form.get('monthYear')?.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.form.get('monthYear')?.setValue(ctrlValue);
    datepicker.close();
  }

  constructor(private snackBar: MatSnackBar, private router: Router) {}

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

}
