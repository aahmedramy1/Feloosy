import {Component, inject, ViewChild} from "@angular/core";
import {BaseChartDirective} from "ng2-charts";
import {ExpensesService} from "../../expenses.service";
import {IncomeService} from "../../income.service";

@Component({
  selector: 'app-income-expense',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './income-expense.component.html',
  styleUrls: ['./income-expense.component.css']
})

export class IncomeExpenseComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  expensesService = inject(ExpensesService)
  incomeService = inject(IncomeService)

  public barChartOptions: any = {
    responsive: true,
  };
  public barChartLabels: any[] = [];
  public barChartType: any = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  expenses: any = [];
  income: any = [];

  public barChartData: any[] = [];

  constructor() {
    Promise.all([
      this.fetchExpenses(),
      this.fetchIncome(),
    ]).then(() => {
      this.processFinancialData();
    }).catch(console.error)
  }

  async fetchExpenses() {
    this.expenses = await this.expensesService.getUserExpenses();
  }
  async fetchIncome() {
    this.income = await this.incomeService.getUserIncome();
  }

  formatDate(dateString: any) {
    const date = new Date(dateString);

    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure it's two digits
    const year = date.getFullYear();

    return `${month}/${year}`;
  }

  processFinancialData = () => {
    const expensesByMonth = this.expenses.reduce((acc: any, expense: any) => {
      const month = this.formatDate(expense.monthYear);
      acc[month] = acc[month] || 0;
      acc[month] += Number(expense.amount)
      return acc;
    }, {});

    const incomeByMonth = this.income.reduce((acc: any, income: any) => {
      const month = this.formatDate(income.monthYear);
      acc[month] = acc[month] || 0;
      acc[month] += Number(income.amount)
      return acc;
    }, {});

    const months = Object.keys(expensesByMonth);
    console.log(months)
    const expensesData = months.map((month) => expensesByMonth[month]);
    const incomeData = months.map((month) => incomeByMonth[month]);

    this.barChartLabels = months;
    this.barChartData = [
      {data: expensesData, label: 'Expenses'},
      {data: incomeData, label: 'Income'}
    ];

    this.chart?.update();
  }

}
