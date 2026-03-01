export interface ProductRequestItem {
  productName: string;
  quantity: number;
}

export interface SubmitEnquiryRequest {
  customerName: string;
  customerEmail: string;
  companyName: string | null;
  phone: string | null;
  message: string;
  productRequests: ProductRequestItem[];
}
