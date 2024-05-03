import {inject, Injectable} from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "@angular/fire/auth";
import {from} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth)

  async register(email: string, username: string, password: string): Promise<void> {
    // Create a user with email and password
    try {
      const response = await createUserWithEmailAndPassword(this.firebaseAuth, email, password);
      await updateProfile(response.user, {
        displayName: username
      });
    } catch (error) {
      console.error('Error during registration:', error);
      throw error; // Rethrow to make sure it propagates to the caller
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const response = await signInWithEmailAndPassword(this.firebaseAuth, email, password);
      return response.user
    } catch (error) {
      console.error('Error during login:', error);
      throw error; // Rethrow to make sure it propagates to the caller
    }
  }
}