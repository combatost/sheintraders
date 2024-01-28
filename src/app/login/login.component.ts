import { Component, ElementRef, ViewChild } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('emailInput')
  emailInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  isSignedIn = false;
  isSignup = false;
  isLoading = false; // Add this property
  signupMessage = ''; // Add this property
  message: string = ''; // Add a message variable
  passwordVisible: boolean = false;
  showForgotPasswordLink: boolean = true;




  constructor(public firebaseServices: FirebaseService, private auth: AngularFireAuth) { }

  async onSignup(email: string, password: string) {
    try {
      this.isLoading = true; // Show loader while signing up

      // Check if the email is valid before proceeding
      if (!this.isValidEmail(email)) {
        this.isLoading = false; // Hide loader if email is not valid
        this.signupMessage = 'Please enter a valid email address.';
        return;
      }

      await this.firebaseServices.signup(email, password);

      this.isLoading = false; // Hide loader after the operation completes

      if (this.firebaseServices.isLoggedIn) {
        this.isSignedIn = true;
        this.signupMessage = 'Account created successfully!';

        // Set a timer to clear the message after 3000 milliseconds (3 seconds)
        setTimeout(() => {
          this.signupMessage = '';
        }, 3000);
      } else {
        this.signupMessage = 'Signup failed. Please try again.';
      }
    } catch (error: any) {
      this.isLoading = false; // Hide loader if there's an error

      if (error.code && error.code === 'auth/email-already-in-use') {
        this.signupMessage = 'Email address is already in use. Please use a different email.';
      } else {
        this.signupMessage = 'Error during signup';
      }
    }
  }


  async onSignin(email: string, password: string) {
    try {
      this.isLoading = true; // Show loader while signing in

      // Check if the email is valid before proceeding
      if (!this.isValidEmail(email)) {
        this.isLoading = false; // Hide loader if email is not valid
        this.signupMessage = 'Please enter a valid email address.';
        return;
      }

      await this.firebaseServices.signin(email, password);

      setTimeout(() => {
        this.isLoading = false; // Hide loader after the operation completes

        if (this.firebaseServices.isLoggedIn) {
          // Reset error message on successful login
          this.signupMessage = '';
          this.isSignedIn = true;

          // Wait for 3.5 seconds before showing the "Login completed" message
        } else {
          this.signupMessage = 'Login failed. Please try again.';
        }

      }, 3000); // Show loader for 3000 milliseconds (3 seconds)
    } catch (error: any) {
      this.isLoading = false; // Hide loader if there's an error

      setTimeout(() => {
        this.signupMessage = 'Please check your email or password';

        setTimeout(() => {
          this.signupMessage = ''; // Clear the message after 3000 milliseconds (3 seconds)
        }, 2000); // 3000 milliseconds (3 seconds)

      }, 1); // 3000 milliseconds (3 seconds)
    }
  }

  // Function to validate email using a regular expression
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }





  handleLogout() {
    this.firebaseServices.logout();
    this.isSignedIn = false;

  }
  resetFormFields() {
    if (this.emailInput && this.passwordInput) {
      this.emailInput.nativeElement.value = '';
      this.passwordInput.nativeElement.value = '';
    }
  }

  toggleSignup() {
    this.isSignup = !this.isSignup;
    console.log('isSignup:', this.isSignup);
    this.signupMessage = ''; // Reset the message when switching between signup and signin
  }

  onForgotPassword(email: string) {
    const lastRequestTime = localStorage.getItem('passwordResetLastRequestTime');
    const currentTime = new Date().getTime();

    // Check if there was a previous request and it's been less than 60 seconds
    if (lastRequestTime && currentTime - parseInt(lastRequestTime, 10) < 60000) {
      this.displayCountdown(parseInt(lastRequestTime, 10));
    } else {
      this.auth
        .sendPasswordResetEmail(email)
        .then(() => {
          localStorage.setItem('passwordResetLastRequestTime', currentTime.toString());
          // You may want to save the last request time on the server as well

          // Display success message after a delay
          setTimeout(() => {
            this.message = 'Password reset email sent successfully';
          }, 1000); // 2000 milliseconds (2 seconds)
        })
        .catch((error) => {
          // Display error message immediately
          this.message = `Error sending password reset email: ${error.message}`;
        });
    }
  }

  private displayCountdown(startTime: number) {
    const countdownInterval = setInterval(() => {
      const currentTime = new Date().getTime();
      const remainingTime = Math.ceil((60000 - (currentTime - startTime)) / 1000);
      if (remainingTime > 0) {
        this.message = `Please wait ${remainingTime} seconds before requesting another password reset.`;
      } else {
        clearInterval(countdownInterval);
        this.message = ''; // Reset the message when the countdown is complete
        localStorage.removeItem('passwordResetLastRequestTime');  // Remove the saved time on success
      }
    }, 1000); // Update every 1000 milliseconds (1 second)
  }


  // In your component class
  // In your component class
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  hideForgotPasswordLink() {
    this.showForgotPasswordLink = false
  }

}