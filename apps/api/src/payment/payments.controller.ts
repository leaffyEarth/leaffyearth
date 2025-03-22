import { Controller, Post, Body, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @Get()
    @ApiOperation({ summary: 'Get response' })
    async getResponse() {
        console.log('hello');
        return {
            success: 'hello',
        };
    }

    @Post('create-order')
    @ApiOperation({
        summary: 'Creates a new payment order using the provided amount.',
    })
    async createOrder(@Body() body: { amount: number }) {
        const { amount } = body;
        const order = await this.paymentsService.createOrder(amount);
        return {
            success: true,
            order,
        };
    }

    @Post('verify')
    @ApiOperation({
        summary: 'Verifies the payment using the provided payment details.',
    })
    async verifyPayment(@Body() body: any) {
        const isPaymentValid = this.paymentsService.verifyPaymentSignature(body);
        if (isPaymentValid) {
            return { success: true, message: 'Payment verified successfully' };
        } else {
            return { success: false, message: 'Payment verification failed' };
        }
    }
}
