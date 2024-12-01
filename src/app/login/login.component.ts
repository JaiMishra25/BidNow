import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface LoginCredentials {
  email: string;
  password: string;
}

@Component({
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;
  rememberMe: boolean = false;
  showPassword: boolean = false;
  
  // Simulated user credentials (in a real app, this would come from a service)
  private validCredentials: LoginCredentials[] = [
    { email: 'user@example.com', password: 'password123' },
    { email: 'admin@example.com', password: 'admin123' }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // Check for saved credentials in localStorage
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      this.email = savedEmail;
      this.rememberMe = true;
    }
  }

  onLogin(form: NgForm) {
    // Reset messages
    this.errorMessage = '';
    this.successMessage = '';

    // Validate form
    if (!form.valid) {
      this.errorMessage = 'Please fill out the form correctly.';
      return;
    }

    // Start loading
    this.isLoading = true;

    // Simulate API call with validation
    this.authenticateUser(this.email, this.password);
  }

  private authenticateUser(email: string, password: string) {
    // Simulate async authentication
    setTimeout(() => {
      const isValidUser = this.validateCredentials(email, password);

      if (isValidUser) {
        // Handle successful login
        this.handleSuccessfulLogin();
      } else {
        // Handle login failure
        this.handleLoginFailure();
      }

      // Stop loading
      this.isLoading = false;
    }, 1500);
  }

  private validateCredentials(email: string, password: string): boolean {
    return this.validCredentials.some(
      cred => cred.email === email && cred.password === password
    );
  }

  private handleSuccessfulLogin() {
    // Manage "Remember Me" functionality
    if (this.rememberMe) {
      localStorage.setItem('rememberedEmail', this.email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }

    // Set success message
    this.successMessage = 'Login successful!';
    this.errorMessage = '';
    
    // Navigate to dashboard after a short delay
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 1500);
  }

  private handleLoginFailure() {
    this.errorMessage = 'Invalid email or password.';
    this.successMessage = '';
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Forgot password navigation
  onForgotPassword() {
    this.router.navigate(['/password-recovery']);
  }

  // Sign up navigation
  onSignUp() {
    this.router.navigate(['/register']);
  }
}