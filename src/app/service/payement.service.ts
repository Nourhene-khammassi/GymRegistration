// payment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../models/payement';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:3000/payment'; // Modifier l'URL en fonction de votre API

  constructor(private http: HttpClient) { }

  makePayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.apiUrl, payment);
  }



  getPaymentsForUserByMonth(userId: number, month: string): Observable<any[]> {
    // Assurez-vous que l'URL est correcte
    return this.http.get<any[]>(`${this.apiUrl}?userId=${userId}&month=${month}`);
  }


  getPaymentsByUserId(userId: number): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}?userId=${userId}`);
  }


}

