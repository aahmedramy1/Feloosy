import {Component, inject, ViewChild} from "@angular/core";
import {BaseChartDirective} from "ng2-charts";
import {IncomeService} from "../../../income.service";

@Component({
  selector: 'app-income-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './income-chart.component.html',
  styleUrls: ['./income-chart.component.css']
})

export class IncomeChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  incomeService = inject(IncomeService)
  income: any = [];

  public barChartData: any = {
    labels: [],
    datasets: []
  };
  public barChartType: any = 'bar';
  public barChartLegend = true;
  public barChartOptions: any = {
    responsive: true,
    scales: {
      x: {},
      y: {}
    }
  };

  constructor() {
    this.fetchIncome().catch(console.error)
  }

  async fetchIncome() {
    this.income = await this.incomeService.getUserIncome();
    this.updateIncomeChartData();
  }

  formatDate(dateString: any) {
    const date = new Date(dateString);

    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure it's two digits
    const year = date.getFullYear();

    return `${month}/${year}`;
  }

  private updateIncomeChartData() {
    const incomeByMonth = new Map<string, number>();
    for (const income of this.income) {
      let monthYear: string = this.formatDate(income.monthYear);
      if (incomeByMonth.has(monthYear)) {
        incomeByMonth.set(monthYear, Number(incomeByMonth.get(monthYear))! + Number(income.amount));
      } else {
        incomeByMonth.set(monthYear, Number(income.amount));
      }
    }

    const labels = Array.from(incomeByMonth.keys()).sort();
    const data = labels.map(label => incomeByMonth.get(label));

    this.barChartData.labels = labels;
    this.barChartData.datasets = [{
      data: data,
      label: 'Income'
    }];


    this.chart?.update();
  }

}
