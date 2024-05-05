import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {ExpensesService} from "../expenses.service";
import {RouterLink} from "@angular/router";
import {MatTableModule} from '@angular/material/table';
import {MatOption} from "@angular/material/autocomplete";
import {MatFormField, MatLabel, MatSelect} from "@angular/material/select";
@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    MatTableModule,
    MatOption,
    MatSelect,
    MatFormField,
    MatLabel
  ],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent {
  categories = [
      {value: undefined, viewValue: 'All'},
      {value: "1", viewValue: 'Rent'},
      {value: '2', viewValue: 'Insurances'},
      {value: '3', viewValue: 'Utilities'},
      {value: '4', viewValue: 'Food'},
      {value: '5', viewValue: 'Others'},
  ];
  selected = undefined

  expensesService = inject(ExpensesService)
  displayedColumns: string[] = ['amount', 'category','description', 'monthYear', 'isRecurring'];
  dataSource: any = [];
  expenses: any = [];

  constructor() {
     this.fetchExpenses().catch(console.error)
  }

  async fetchExpenses() {
    let expenses = await this.expensesService.getUserExpenses();
    this.dataSource = expenses;
    this.expenses = expenses;
  }

   formatDate(dateString: string) {

    let date = new Date(dateString);

    let month = (date.getMonth() + 1).toString().padStart(2, '0');  // Ensures two digit formatting
    let year = date.getFullYear();
    return `${month}/${year}`;
  }

  getCategory(value: string) {
    return this.categories.find(category => category.value === value)?.viewValue;
  }
  onCategoryChange(event: any) {
    if (event === undefined) {
      this.expenses = this.dataSource;
      return;
    }
    this.expenses = this.dataSource.filter((expense: any) => expense.category === event);
  }
}
