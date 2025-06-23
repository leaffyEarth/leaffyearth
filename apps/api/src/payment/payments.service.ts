import { Injectable, BadRequestException } from '@nestjs/common';
import Razorpay from 'razorpay';
import Crypto from 'crypto';



interface VerifyPaymentBody {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}

@Injectable()
export class PaymentsService {
    private razorpay: any;

    constructor() {
        console.log("getting the cred", process.env.RAZORPAY_KEY_ID,  process.env.RAZORPAY_SECRET, process.env.MONGODB_URI)
        this.razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID || '',
            key_secret: process.env.RAZORPAY_SECRET || '',
        });
    }


    // async createOrder(amount: number, currency: string = 'INR'): Promise<CreateOrderResponse> {
    async createOrder(amount: number, currency: string = 'INR'): Promise<any> {
        if (!amount || amount <= 0) {
            throw new BadRequestException('Invalid amount specified.');
        }

        try {
            const options = {
                amount: amount * 100,
                currency,
                receipt: `receipt_order_${new Date().getTime()}`,
            };

            const order = await this.razorpay.orders.create(options);
            //   return order as CreateOrderResponse;
            return order;

        } catch (error) {
            throw new Error(`Failed to create order: ${error}`);
        }
    }


    verifyPaymentSignature(body: VerifyPaymentBody): boolean {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            throw new BadRequestException('Missing payment verification parameters.');
        }

        const shasum = Crypto.createHmac('sha256', process.env.RAZORPAY_SECRET || '');
        shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = shasum.digest('hex');

        return digest === razorpay_signature;
    }
}
