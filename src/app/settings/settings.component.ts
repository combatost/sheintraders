import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass'],
})
export class SettingsComponent implements OnInit {
  user: any;
  newPassword: string = '';
  confirmPassword: string = '';
  showPasswordForm: boolean = false;
  passwordChangeMessage: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  openPasswordChangeForm() {
    this.showPasswordForm = true;
  }

  cancelPasswordChange() {
    this.showPasswordForm = false;
    this.newPassword = '';
    this.confirmPassword = '';
  }

  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    this.afAuth.currentUser
      .then(user => user?.updatePassword(this.newPassword))
      .then(() => {
        this.passwordChangeMessage = 'Password changed successfully!';
        setTimeout(() => {
          this.passwordChangeMessage = '';
          this.showPasswordForm = false;
        }, 2000); // Show success message for 2 seconds
      })
      .catch(err => {
        alert(err.message);
      });
  }

  deleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action is irreversible.')) {
      this.afAuth.currentUser
        .then(user => user?.delete())
        .then(() => {
          alert('Account deleted successfully.');
          this.router.navigate(['/login']);
        })
        .catch(err => alert(err.message));
    }
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
