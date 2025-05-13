import { Injectable } from '@angular/core';

declare var payhere: any;

@Injectable({
  providedIn: 'root'
})
export class PayHereService {

  constructor() { }

  initiatePayment(paymentData: any): void {
    console.log('Merchant ID:', paymentData.merchant_id);

    payhere.onCompleted = (orderId: string) => {
      console.log(`Payment completed! Order ID: ${orderId}`);
      alert(`Payment successful! Order ID: ${orderId}`);
    };

    payhere.onDismissed = () => {
      console.log('Payment dismissed');
      alert('Payment cancelled!');
    };

    payhere.onError = (error: string) => {
      console.error(`Payment error: ${error}`);
      alert(`Payment failed! Error: ${error}`);
    };

    payhere.startPayment(paymentData);
  }
}
