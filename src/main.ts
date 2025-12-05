/// <reference types="@angular/localize" />

import 'zone.js';
import { environment } from './environments/environment';
import { ENVIRONMENT } from './app/config/environment.token';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import * as bootstrap from "bootstrap";

(window as any).bootstrap = bootstrap;

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
     provideHttpClient(),
         { provide: ENVIRONMENT, useValue: environment }
    // other providers
  ],
});
