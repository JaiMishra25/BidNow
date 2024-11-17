import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  // Existing properties
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  // Add these new properties
  isLoading: boolean = false;

  // Password validation states
  passwordCriteria = {
    minLength: false,
    upperCase: false,
    lowerCase: false,
    specialChar: false,
    number: false,
  };

  constructor(private router: Router) {}

  // Validate password dynamically
  validatePassword(password: string) {
    this.passwordCriteria.minLength = password.length >= 8;
    this.passwordCriteria.upperCase = /[A-Z]/.test(password);
    this.passwordCriteria.lowerCase = /[a-z]/.test(password);
    this.passwordCriteria.specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    this.passwordCriteria.number = /\d/.test(password);
  }

  onRegister(form: any) {
    if (!form.valid) {
      this.errorMessage = 'Please fill out the form correctly.';
      return;
    }

    if (Object.values(this.passwordCriteria).some((condition) => !condition)) {
      this.errorMessage = 'Password does not meet the required criteria.';
      return;
    }

    // Add loading state
    this.isLoading = true;

    // Simulate API call
    setTimeout(() => {
      this.successMessage = 'Registration successful!';
      this.errorMessage = '';
      
      // Reset loading state
      this.isLoading = false;

      // Navigate to login page after successful registration
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1500);
    }, 1500); // Simulate 1.5s API call
  }
}