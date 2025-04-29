import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      take(1), // wait for Firebase to emit the current auth state
      map(user => {
        if (user) {
          return true;
        } else {
          console.log('Redirecting to login...');
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
