import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuctionDetailComponent } from './auction-detail/auction-detail.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminDashboardChartsComponent } from './admin-dashboard-charts/admin-dashboard-charts.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuctionService } from './auction.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { provideAnimations } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'password-recovery', component: PasswordRecoveryComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'auction-detail', component: AuctionDetailComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'auction-detail/:id', component: AuctionDetailComponent },
  { path: 'admin-dashboard/charts', component: AdminDashboardChartsComponent },
  { path: 'user-detail/:id', component: UserDetailComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    FormsModule,  
    CommonModule  
  ],
};
