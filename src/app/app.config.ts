import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};

export const content = [
  'Welcome at webdave_de',
  'My content:',
  '[livestream] https://webdave.tv',
  '[Blog] https://blog.webdave.de',
  'Need to boost your skills? Reach out to me.',
  'I offer:',
];

export const options = [
  '[Workshop] Javascript fundamentals',
  '[Workshop] Angular fundamentals',
  '[Workshop] Angular advanced',
  '[Workshop] Testing',
  '[Workshop] Other topics (RxJS, Redux)',
  'Consulting',
];

export const text = [...content, ...options];
