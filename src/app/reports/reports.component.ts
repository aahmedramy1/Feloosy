import { Component } from '@angular/core';
import {GoalsProgressComponent} from "./goals-progress/goals-progress.component";
import {IncomeExpenseComponent} from "./income-expense/income-expense.component";

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    GoalsProgressComponent,
    IncomeExpenseComponent
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

}
