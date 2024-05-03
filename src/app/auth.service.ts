import {inject, Injectable} from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "@angular/fire/auth";
import {doc, Firestore, setDoc} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth)
  firestore = inject(Firestore)

  async register(email: string, username: string, password: string): Promise<void> {
    // Create a user with email and password
    try {
      const response = await createUserWithEmailAndPassword(this.firebaseAuth, email, password);
      await updateProfile(response.user, {
        displayName: username
      });
      const userDocRef = doc(this.firestore, 'users', response.user.uid);
      await setDoc(userDocRef, {
        username: username,
        email: email,
        uid: response.user.uid
      });

      this.saveUserToLocalStorage(response.user)

    } catch (error) {
      console.error('Error during registration:', error);
      throw error; // Rethrow to make sure it propagates to the caller
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const response = await signInWithEmailAndPassword(this.firebaseAuth, email, password);
      this.saveUserToLocalStorage(response.user);
    } catch (error) {
      console.error('Error during login:', error);
      throw error; // Rethrow to make sure it propagates to the caller
    }
  }

  logout(): Promise<void> {
    return this.firebaseAuth.signOut().then(() => {
      localStorage.removeItem('user');
    });
  }

  private saveUserToLocalStorage(user: any): void {
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    };
    localStorage.setItem('user', JSON.stringify(userData));
  }

  getCurrentUser(): any {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }


}
