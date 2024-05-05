import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {ExpensesComponent} from "./expenses/expenses.component";
import {ExpensesFormComponent} from "./expenses-form/expenses-form.component";
import {IncomeComponent} from "./income/income.component";
import {IncomeFormComponent} from "./income-form/income-form.component";
import {HomeComponent} from "./home/home.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: "Home"
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login'
  },
  {
    path: "signup",
    component: SignupComponent,
    title: "Signup"
  },
  {
    path: "expenses",
    component: ExpensesComponent,
    title: "Expenses"
  },
  {
    path: "expenses/new",
    component: ExpensesFormComponent,
    title: "New Expense"
  },
  {
    path: "income",
    component: IncomeComponent,
    title: "Income"
  },
  {
    path: "income/new",
    component: IncomeFormComponent,
    title: "New Income"
  }
];
