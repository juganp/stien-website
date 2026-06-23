import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ProductRequestItem {
  productName: string;
  quantity: number;
}

export interface SubmitEnquiryPayload {
  customerName: string;
  customerEmail: string;
  companyName?: string;
  phone?: string;
  message: string;
  productRequests: ProductRequestItem[];
}

export interface EnquiryResponse {
  id: string;
}

@Injectable({ providedIn: 'root' })
export class EnquiryService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.vilaiflowApiUrl}/api/public/enquiries`;

  submit(payload: SubmitEnquiryPayload): Observable<EnquiryResponse> {
    alert('JP')
    return this.http.post<EnquiryResponse>(this.apiUrl, payload);
  }
}
