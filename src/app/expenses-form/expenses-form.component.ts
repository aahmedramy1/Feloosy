import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {ExpensesService} from "../expenses.service";
import {MatFormField, MatFormFieldModule, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import moment from 'moment';

@Component({
  selector: 'app-expenses-form',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatIcon,
    MatInput,
    ReactiveFormsModule,
    NgIf,
    MatCard,
    MatCardContent,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './expenses-form.component.html',
  styleUrl: './expenses-form.component.css'
})
export class ExpensesFormComponent {
  expensesService = inject(ExpensesService)
  form: FormGroup = new FormGroup({
    amount: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    description: new FormControl(''),
    monthYear: new FormControl(moment())
  });


  setMonthAndYear(normalizedMonthAndYear: any, datepicker: MatDatepicker<any>) {

    // const ctrlValue = this.date.value ?? moment();
    const ctrlValue = this.form.get('monthYear')?.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.form.get('monthYear')?.setValue(ctrlValue);
    datepicker.close();
  }


  constructor(private snackBar: MatSnackBar, private router: Router) {}
  async onSubmit() {
    let expense = this.form.value;
    expense.monthYear = expense.monthYear.toISOString()
    await this.expensesService.addNewExpense(expense);
    this.openSnackBar('Expense added successfully');
    this.form.reset();
    await this.router.navigate(['/expenses']);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
        duration: 3000,
      });
  }

}
