import { Controller, Post, Body, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';



@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @Get()
    async getResponse() {
        console.log("hello")
        return {
            success: "hello",
        };
    }

    @Post('create-order')
    async createOrder(@Body() body: { amount: number }) {
        const { amount } = body;
        const order = await this.paymentsService.createOrder(amount);
        return {
            success: true,
            order,
        };
    }

    @Post('verify')
    async verifyPayment(@Body() body: any) {
        const isPaymentValid = this.paymentsService.verifyPaymentSignature(body);
        if (isPaymentValid) {
            return { success: true, message: 'Payment verified successfully' };
        } else {
            return { success: false, message: 'Payment verification failed' };
        }
    }
}
