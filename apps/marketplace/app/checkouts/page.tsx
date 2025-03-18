"use client"

import React, { useState } from 'react';
import { api } from '../../utils/api';

const CheckoutPage = () => {
    const [amount, setAmount] = useState<number>(0);

    console.log('Current Axios baseURL:', api.defaults.baseURL);

    const handlePayment = async () => {
        try {
            const createOrderRes = await api.post('payments/create-order', {
                amount,
            });
            const { orderId, amount: orderAmount, currency } = createOrderRes.data;

            const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
            const options = {
                key: razorpayKey,
                amount: orderAmount?.toString(),
                currency: currency,
                name: 'My E-Commerce',
                description: 'Purchase Description',
                order_id: orderId,

                handler: async function (response: any) {
                    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

                    const verifyRes = await api.post('/payments/verify', {
                        razorpay_order_id,
                        razorpay_payment_id,
                        razorpay_signature,
                    });

                    if (verifyRes.data.success) {
                        alert('Payment Verified! Order Placed Successfully!');
                    } else {
                        alert('Payment Verification Failed!');
                    }
                },

                modal: {
                    ondismiss: function () {
                        console.log('Payment popup closed by user');
                    }
                },
            };

            console.log("options", options)

            const rzp = new (window as any).Razorpay(options);
            rzp.on('payment.failed', function (response: any) {
                console.error('Payment Failed:', response.error);
                alert('Payment Failed: ' + response.error.description);
            });

            rzp.open();

        } catch (error) {
            console.error(error);
            alert('Error while initiating payment');
        }
    };

    return (
        <div
            style={{ marginTop: '10%', marginBottom: '10%', }}
        >
            <h1>Checkout</h1>
            <div>
                <input
                    type="number"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={e => setAmount(Number(e.target.value))}
                />
                <button onClick={handlePayment}>Pay Now</button>
            </div>
        </div>
    );
};

export default CheckoutPage;
