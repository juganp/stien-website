import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  readonly apiBaseUrl = 'http://localhost:5000';
  readonly apiKey = ''; // Set via environment or build config
}
