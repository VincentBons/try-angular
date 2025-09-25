import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import localeNl from '@angular/common/locales/nl';
import { registerLocaleData } from '@angular/common';
import "@angular/localize/init";

registerLocaleData(localeNl);

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
