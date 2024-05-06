import {Component, inject, ViewChild} from "@angular/core";
import {BaseChartDirective} from "ng2-charts";
import {GoalsService} from "../../../goals.service";

@Component({
  selector: 'app-goals-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './goals-chart.component.html',
  styleUrls: ['./goals-chart.component.css']
})

export class GoalsChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  goalsService = inject(GoalsService)
  goals: any = [];

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
    this.fetchGoals().catch(console.error)
  }

  async fetchGoals() {
    this.goals = await this.goalsService.getUserGoals();
    this.updateGoalsChartData();
  }

  formatDate(dateString: any) {
    const date = new Date(dateString);

    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure it's two digits
    const year = date.getFullYear();

    return `${month}/${year}`;
  }

  private updateGoalsChartData() {
    const goalsByMonth = new Map<string, number>();
    for (const goal of this.goals) {
      let monthYear: string = this.formatDate(goal.monthYear);
      if (goalsByMonth.has(monthYear)) {
        goalsByMonth.set(monthYear, Number(goalsByMonth.get(monthYear))! + Number(goal.targetAmount));
      } else {
        goalsByMonth.set(monthYear, Number(goal.targetAmount));
      }
    }

      const labels = Array.from(goalsByMonth.keys());
      const data = labels.map(label => goalsByMonth.get(label));

      this.barChartData.labels = labels;

      this.barChartData.datasets = [
        {
          data: data,
          label: 'Goals',
          backgroundColor: '#3F51B5',
          borderColor: '#3F51B5',
          borderWidth: 1
        }
      ];

      this.chart?.update();
  }

}
