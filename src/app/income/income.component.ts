import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {ExpensesService} from "../expenses.service";
import {IncomeService} from "../income.service";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableModule
} from "@angular/material/table";

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [
    MatButton,
    RouterLink,
    MatTableModule
  ],
  templateUrl: './income.component.html',
  styleUrl: './income.component.css'
})
export class IncomeComponent {
  dataSource: any = [];
  incomeService = inject(IncomeService)
  displayedColumns: string[] = ['amount', 'source','monthYear'];

  async fetchIncome() {
    this.dataSource = await this.incomeService.getUserIncome();
  }

  constructor() {
    this.fetchIncome().catch(console.error)
  }

  formatDate(dateString: string) {

    let date = new Date(dateString);

    let month = (date.getMonth() + 1).toString().padStart(2, '0');  // Ensures two digit formatting
    let year = date.getFullYear();
    return `${month}/${year}`;
  }

}
