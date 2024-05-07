import {Component, inject, ViewChild} from "@angular/core";
import {BaseChartDirective} from "ng2-charts";
import {ExpensesService} from "../../expenses.service";
import {IncomeService} from "../../income.service";
import {GoalsService} from "../../goals.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-goals-progress',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './goals-progress.component.html',
  styleUrls: ['./goals-progress.component.css']
})

export class GoalsProgressComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  expensesService = inject(ExpensesService)
  incomeService = inject(IncomeService)
  goalsService = inject(GoalsService)

  public barChartOptions: any = {
    responsive: true,
  };
  public barChartLabels: any[] = [];
  public barChartType: any = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  expenses: any = [];
  income: any = [];
  goals: any = []

  public barChartData: any[] = [];

  constructor() {
    Promise.all([
      this.fetchExpenses(),
      this.fetchIncome(),
      this.fetchGoals()
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

  async fetchGoals() {
    this.goals = await this.goalsService.getUserGoals()
  }

  formatDate(dateString: any) {
    const date = new Date(dateString);

    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure it's two digits
    const year = date.getFullYear();

    return `${month}/${year}`;
  }

  processFinancialData() {
    const monthMap = new Map();

    this.goals.forEach((goal: any) => {
      const key = this.formatDate(goal.monthYear)
      if(!monthMap.has(key)) {
        monthMap.set(key, {income: 0, expense: 0, goals: 0});
      }
      monthMap.get(key).goals += Number(goal.targetAmount)
    })

    this.income.forEach((item: any) => {
      const key = this.formatDate(item.monthYear)
      if(monthMap.has(key)) {
        monthMap.get(key).income += Number(item.amount)
      }
    })

    this.expenses.forEach((expense: any) => {
        const key = this.formatDate(expense.monthYear)
      if(monthMap.has(key)) {
        monthMap.get(key).expense += Number(expense.amount)
      }

    })



    const amountSavedData: any = [];
    const remainingGoalsData: any = [];
    const labels: any = []

    const sortedMap = new Map([...monthMap.entries()].sort());

    sortedMap.forEach((value: any, key: any) => {
        const saved = Math.max(0, value.income - value.expense);
        const remaining = Math.max(0, value.goals - saved);
        amountSavedData.push(saved)
        remainingGoalsData.push(remaining)
        labels.push(key)
    })

    this.barChartData =  [
      {data: amountSavedData, label: 'Amount saved', stack: 'a'},
      {data: remainingGoalsData, label: 'Remaining', stack: 'a'}
    ];

    this.barChartLabels = labels

    this.chart?.update();



  }

  ngOnInit() {
  }
}
