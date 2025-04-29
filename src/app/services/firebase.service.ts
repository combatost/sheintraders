import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  isLoggedIn = false;

  constructor(
    public firebaseAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  async signin(email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      });
  }

  async signup(email: string, password: string) {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      });
  }

  logout() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }

  getUserUID(): string | null {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.uid || null;
  }

  async saveUserData(data: any) {
    const user = await this.firebaseAuth.currentUser;
    if (user) {
      return this.firestore.collection('users').doc(user.uid).set({ data });
    }
    throw new Error('User not authenticated');
  }

  getUserData(): Observable<any> {
    return this.firebaseAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.collection('users').doc(user.uid).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }
}
