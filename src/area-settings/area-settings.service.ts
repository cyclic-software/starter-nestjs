import { Injectable } from '@nestjs/common';

@Injectable()
export class AreaSettingsService {
  async getPricing() {
    const details = {
      extraChargeMessage:
        '$10.00 per additional drop off (Surcharge of $20.00 for PH)',
      normalCharge: 48,
      priorityCharge: 68,
      additionalCharge: 10,
      surge: 10,
      tip: 12,
      cancelationCharge: 15,
      cancelationMessage:
        'Booking Cancellation is free before valet driver is being assigned to you. Cancellation fee: $15.00',
    };
    const pricing = [
      {
        title: 'Normal Valet',
        description: 'Option to book for NOW or LATER',
        amount: 48,
        slug: 'normal',
      },
      {
        title: 'Priority Valet',
        description: '30 mins to pick up',
        amount: 68,
        slug: 'priority',
      },
      {
        title: 'Surge',
        description: 'Additional charge applies during peak period',
        amount: 10,
        slug: 'surge',
      },
    ];
    return {
      message: 'Your area pricing details',
      data: { details, pricing },
    };
  }
}
