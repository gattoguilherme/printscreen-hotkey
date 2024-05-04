import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxCaptureModule } from "ngx-capture";

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
