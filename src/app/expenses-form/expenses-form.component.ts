import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {ExpensesService} from "../expenses.service";
import {MatFormField} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

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
  ],
  templateUrl: './expenses-form.component.html',
  styleUrl: './expenses-form.component.css'
})
export class ExpensesFormComponent {
  expensesService = inject(ExpensesService)
  form: FormGroup = new FormGroup({
    amount: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    description: new FormControl(''),
  });

  constructor(private snackBar: MatSnackBar, private router: Router) {}
  async onSubmit() {
    let expense = this.form.value;
    expense.date = new Date();
    console.log("expense", expense);
    let response = await this.expensesService.addNewExpense(expense);
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
