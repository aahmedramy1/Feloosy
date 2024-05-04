import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {ExpensesComponent} from "./expenses/expenses.component";
import {ExpensesFormComponent} from "./expenses-form/expenses-form.component";

export const routes: Routes = [
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
  }
];
