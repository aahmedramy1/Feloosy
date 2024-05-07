import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {ExpensesComponent} from "./expenses/expenses.component";
import {ExpensesFormComponent} from "./expenses-form/expenses-form.component";
import {IncomeComponent} from "./income/income.component";
import {IncomeFormComponent} from "./income-form/income-form.component";
import {HomeComponent} from "./home/home.component";
import {GoalsComponent} from "./goals/goals.component";
import {GoalsFormComponent} from "./goals-form/goals-form.component";
import {ReportsComponent} from "./reports/reports.component";
import { AuthGuardService as AuthGuard } from './auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: "Home",
   canActivate: [AuthGuard]
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
    title: "Expenses",
    canActivate: [AuthGuard]
  },
  {
    path: "expenses/new",
    component: ExpensesFormComponent,
    title: "New Expense",
    canActivate: [AuthGuard]
  },
  {
    path: "income",
    component: IncomeComponent,
    title: "Income",
    canActivate: [AuthGuard]
  },
  {
    path: "income/new",
    component: IncomeFormComponent,
    title: "New Income",
    canActivate: [AuthGuard]
  },
  {
    path: "goals",
    component: GoalsComponent,
    title: "Goals",
    canActivate: [AuthGuard]
  },
  {
    path: "goals/new",
    component: GoalsFormComponent,
    title: "New Goal",
    canActivate: [AuthGuard]
  },
  {
    path: "reports",
    component: ReportsComponent,
    title: "Reports",
    canActivate: [AuthGuard]
  }
];
