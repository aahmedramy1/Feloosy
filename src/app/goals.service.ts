import {inject, Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {addDoc, collection, Firestore, getDocs} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class GoalsService {
  firestore = inject(Firestore)

  constructor(private authService: AuthService) {}

 async addNewGoal(goal: any) {
    const currentUser = this.authService.getCurrentUser()
    let goalsRef = collection(this.firestore, `users/${currentUser.uid}/goals`);
    goal.createdAt = new Date();
    await addDoc(goalsRef, goal);
 }

 async getUserGoals() {
    const currentUser = this.authService.getCurrentUser();
    let goalsRef = collection(this.firestore, `users/${currentUser.uid}/goals`);
    let goals = await getDocs(goalsRef);
    return goals.docs.map(doc => doc.data());
 }

}
