import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;
  rememberMe: boolean = false;

  constructor(private router: Router) {}

  onLogin(form: any) {
    if (!form.valid) {
      this.errorMessage = 'Please fill out the form correctly.';
      return;
    }

    this.isLoading = true;

    // Simulate API call
    setTimeout(() => {
      if (this.email && this.password) {
        this.successMessage = 'Login successful!';
        this.errorMessage = '';
        
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      } else {
        this.errorMessage = 'Invalid email or password.';
        this.successMessage = '';
      }
      this.isLoading = false;
    }, 1500);
  }
}