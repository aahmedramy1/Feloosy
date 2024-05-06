import { Component } from '@angular/core';
import {IncomeChartComponent} from "./components/income-chart/income-chart.component";
import {ExpenseChartComponent} from "./components/expense-chart/expense-chart.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IncomeChartComponent, ExpenseChartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


}
