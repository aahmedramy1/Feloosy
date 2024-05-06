import {Component, inject} from '@angular/core';
import {GoalsService} from "../goals.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import moment from "moment";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-goals-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatCard, MatCardContent, MatFormField, MatInput, NgIf, MatDatepicker, MatDatepickerInput, MatDatepickerToggle, MatHint, MatLabel, MatSuffix, MatButton],
  templateUrl: './goals-form.component.html',
  styleUrl: './goals-form.component.css'
})
export class GoalsFormComponent {
  goalsService = inject(GoalsService)

  form: FormGroup = new FormGroup({
    targetAmount: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    description: new FormControl(''),
    monthYear: new FormControl(moment()),
  })

  setMonthAndYear(normalizedMonthAndYear: any, datepicker: MatDatepicker<any>) {
    const ctrlValue = this.form.get('monthYear')?.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.form.get('monthYear')?.setValue(ctrlValue);
    datepicker.close();
  }

  constructor(private snackBar: MatSnackBar, private router: Router) {}

  async onSubmit() {
    let goal = this.form.value;
    goal.monthYear = goal.monthYear.toISOString()
    await this.goalsService.addNewGoal(goal);
    this.openSnackBar('Goal added successfully');
    this.form.reset();
    await this.router.navigate(['/goals']);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

}
