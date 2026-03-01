import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SubmitEnquiryRequest } from '../models/enquiry.models';
import { ConfigService } from './config.service';

@Injectable({ providedIn: 'root' })
export class EnquiryService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(ConfigService);

  submitEnquiry(request: SubmitEnquiryRequest): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(
      `${this.config.apiBaseUrl}/api/public/enquiries`,
      request
    );
  }
}
