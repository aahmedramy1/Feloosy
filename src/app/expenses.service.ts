import {inject, Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {addDoc, collection, Firestore, setDoc} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  firestore = inject(Firestore)
  constructor(private authService: AuthService) { }

  async addNewExpense(expense: { amount: number, description: string, date: Date }) {
    const currentUser = this.authService.getCurrentUser()
    let expensesRef = collection(this.firestore, `users/${currentUser.uid}/expenses`);
    await addDoc(expensesRef, expense);
  }



}
