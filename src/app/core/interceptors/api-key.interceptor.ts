import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ConfigService } from '../services/config.service';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const config = inject(ConfigService);
  const apiKey = config.apiKey;

  if (!apiKey || !req.url.includes('/api/public')) {
    return next(req);
  }

  return next(req.clone({ setHeaders: { 'X-Api-Key': apiKey } }));
};
