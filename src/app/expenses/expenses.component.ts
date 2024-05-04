import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {ExpensesService} from "../expenses.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [
    MatButton,
    RouterLink
  ],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent {
  expensesService = inject(ExpensesService)

}
