import {inject, Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {addDoc, collection, Firestore, getDocs, setDoc} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  firestore = inject(Firestore)
  constructor(private authService: AuthService) { }

  async addNewExpense(expense: any) {
    const currentUser = this.authService.getCurrentUser()
    let expensesRef = collection(this.firestore, `users/${currentUser.uid}/expenses`);
    expense.createdAt = new Date();
    await addDoc(expensesRef, expense);
  }

  async getUserExpenses() {
    const currentUser = this.authService.getCurrentUser()
    let expensesRef = collection(this.firestore, `users/${currentUser.uid}/expenses`);
    let expenses = await getDocs(expensesRef);
    return expenses.docs.map(doc => doc.data())
  }



}
