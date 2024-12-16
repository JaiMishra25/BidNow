import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Merge BrowserAnimationsModule into appConfig
const updatedAppConfig = {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []), // Include existing providers
    importProvidersFrom(BrowserAnimationsModule), // Add BrowserAnimationsModule
  ],
};

bootstrapApplication(AppComponent, updatedAppConfig)
  .catch((err) => console.error(err));
