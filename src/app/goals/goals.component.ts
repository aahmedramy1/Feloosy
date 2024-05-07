import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {GoalsService} from "../goals.service";
import {
   MatRowDef,
  MatTableModule
} from "@angular/material/table";

@Component({
  selector: 'app-goals',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    MatTableModule,
    MatRowDef
  ],
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.css'
})
export class GoalsComponent {
  goalsService = inject(GoalsService)

  goals: any = []
  displayedColumns: string[] = ['targetAmount', 'description', 'monthYear'];

  constructor() {
    this.fetchGoals().catch(console.error)
  }

  async fetchGoals() {
    this.goals = await this.goalsService.getUserGoals();
    console.log("this.goals", this.goals)
  }

  formatDate(dateString: string) {

    let date = new Date(dateString);

    let month = (date.getMonth() + 1).toString().padStart(2, '0');  // Ensures two digit formatting
    let year = date.getFullYear();
    return `${month}/${year}`;
  }

}
