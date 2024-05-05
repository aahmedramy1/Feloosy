import {inject, Injectable} from '@angular/core';
import {addDoc, collection, Firestore} from "@angular/fire/firestore";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  firestore = inject(Firestore)

  constructor(private authService: AuthService) { }

  async addNewIncome(income: any) {
    const currentUser = this.authService.getCurrentUser();
    let incomeRef = collection(this.firestore, `users/${currentUser.uid}/income`)
    income.createdAt = new Date();
    await addDoc(incomeRef, income)
  }
}
