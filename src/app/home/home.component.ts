import {ChangeDetectorRef, Component, inject, ViewChild} from '@angular/core';
import {ExpensesService} from "../expenses.service";
import {IncomeService} from "../income.service";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ BaseChartDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;

  expensesService = inject(ExpensesService)
  incomeService = inject(IncomeService)

  public barChartOptions: any = {
    responsive: true,
    scales: {
      x: {},
      y: {}
    }
  };
  public barChartType: any = 'bar';
  public barChartLegend = true;
  public barChartData: any = {
    labels: [],
    datasets: []
  };

  income: any = [];
  expenses: any = [];

  constructor() {
    this.fetchIncome().catch(console.error)
    this.fetchExpenses().catch(console.error)
  }

  async fetchIncome() {
    this.income = await this.incomeService.getUserIncome();
  }

  async fetchExpenses() {
    this.expenses = await this.expensesService.getUserExpenses();
    this.updateChartData();
  }

  formatDate(dateString: any) {
    const date = new Date(dateString);

    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure it's two digits
    const year = date.getFullYear();

    return `${month}/${year}`;
  }

  private updateChartData() {
    // Create a map to hold sums of expenses by monthYear
    const expensesByMonth = new Map<string, number>();

    // Aggregate expenses by monthYear
    for (const expense of this.expenses) {
      let monthYear: string = this.formatDate(expense.monthYear);
      if (expensesByMonth.has(monthYear)) {
        expensesByMonth.set(monthYear, Number(expensesByMonth.get(monthYear))! + Number(expense.amount))
      } else {
        expensesByMonth.set(monthYear, expense.amount);
      }
    }

    console.log(expensesByMonth)

    // Convert the map back to arrays suitable for the chart data
    const labels = Array.from(expensesByMonth.keys()).sort();
    const data = labels.map(label => expensesByMonth.get(label));

    this.barChartData.labels = labels;
    this.barChartData.datasets = [{
      data: data,
      label: 'Expenses'
    }];

    // Trigger change detection if necessary (if using ChangeDetectorRef)
    this.chart?.update();
  }

}
