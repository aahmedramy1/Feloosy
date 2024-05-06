import {Component, inject, ViewChild} from "@angular/core";
import {BaseChartDirective} from "ng2-charts";
import {ExpensesService} from "../../../expenses.service";

@Component({
  selector: 'app-expense-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './expense-chart.component.html',
  styleUrl: './expense-chart.component.css'
})

export class ExpenseChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  expensesService = inject(ExpensesService)

  public barChartOptions: any = {
    responsive: true,
    scales: {
      x: {},
      y: {}
    }
  };
  public barChartType: any = 'bar';
  public barChartLegend = true;

  // Separate chart data for expenses and income
  public barChartData: any = {
    labels: [],
    datasets: []
  };

  expenses: any = [];

  constructor() {
    this.fetchExpenses().catch(console.error)
  }

  async fetchExpenses() {
    this.expenses = await this.expensesService.getUserExpenses();
    this.updateExpensesChartData();
  }

  formatDate(dateString: any) {
    const date = new Date(dateString);

    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure it's two digits
    const year = date.getFullYear();

    return `${month}/${year}`;
  }

  private updateExpensesChartData() {
    const expensesByMonth = new Map<string, number>();
    for (const expense of this.expenses) {
      let monthYear: string = this.formatDate(expense.monthYear);
      if (expensesByMonth.has(monthYear)) {
        expensesByMonth.set(monthYear, Number(expensesByMonth.get(monthYear))! + Number(expense.amount));
      } else {
        expensesByMonth.set(monthYear, Number(expense.amount));
      }
    }

    const labels = Array.from(expensesByMonth.keys()).sort();
    const data = labels.map(label => expensesByMonth.get(label));

    this.barChartData.labels = labels;
    this.barChartData.datasets = [{
      data: data,
      label: 'Expenses'
    }];

    this.chart?.update();
  }

}
