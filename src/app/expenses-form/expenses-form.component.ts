import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {ExpensesService} from "../expenses.service";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {
  MatDatepicker,
  MatDatepickerModule,
} from "@angular/material/datepicker";
import moment from 'moment';
import { MatSelectModule} from "@angular/material/select";

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
    MatSelectModule,
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

  categories: any[] = [
    {value: "1", viewValue: 'Rent'},
    {value: '2', viewValue: 'Insurances'},
    {value: '3', viewValue: 'Utilities'},
    {value: '4', viewValue: 'Food'},
    {value: '5', viewValue: 'Others'},
  ];
  selected = this.categories[0].value;


  setMonthAndYear(normalizedMonthAndYear: any, datepicker: MatDatepicker<any>) {

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
    expense.category = this.selected
    await this.expensesService.addNewExpense(expense);
    this.openSnackBar('Expense Added Successfully');
    this.form.reset();
    await this.router.navigate(['/expenses']);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
        duration: 3000,
      });
  }

}
