import { useState, useCallback } from 'react';
import { createRazorpayOrder, verifyRazorpayPayment, createOrder } from './api';
import { useToast } from '../components/Toast/Toast';

const useRazorpay = () => {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const loadRazorpayScript = useCallback(() => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }, []);

  const initiatePayment = useCallback(
    async (amount, customerDetails, orderData, onSuccess, onFallbackToCOD) => {
      setLoading(true);

      try {
        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
          addToast('Razorpay SDK failed to load. Falling back to Cash on Delivery.', 'warning');
          if (onFallbackToCOD) onFallbackToCOD();
          setLoading(false);
          return;
        }

        // 1. Create order on backend (which communicates with Razorpay)
        const rpOrder = await createRazorpayOrder(amount * 100, 'INR');

        // 2. Initialize Razorpay options
        const options = {
          key: 'rzp_test_placeholder', // Should be replaced with env var in production
          amount: rpOrder.amount,
          currency: rpOrder.currency,
          name: 'Balaji Marketing Vasai',
          description: `Order Payment`,
          order_id: rpOrder.id,
          handler: async function (response) {
            try {
              // 3. Verify payment signature on backend
              const verification = await verifyRazorpayPayment({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              });

              if (verification.status === 'success') {
                // 4. Create actual order in our system
                const finalOrderData = {
                  ...orderData,
                  paymentMethod: 'razorpay',
                  paymentId: response.razorpay_payment_id,
                  status: 'confirmed',
                };
                
                const createdOrder = await createOrder(finalOrderData);
                if (onSuccess) onSuccess(createdOrder);
              } else {
                addToast('Payment verification failed. Please contact support.', 'error');
              }
            } catch (err) {
              addToast('Failed to save order after successful payment. Please contact support.', 'error');
            }
          },
          prefill: {
            name: customerDetails.name,
            email: customerDetails.email || '',
            contact: customerDetails.phone,
          },
          theme: {
            color: '#D32F2F', // var(--color-primary)
          },
        };

        const rzp = new window.Razorpay(options);
        
        rzp.on('payment.failed', function (response) {
          addToast(`Payment failed: ${response.error.description}`, 'error');
        });

        rzp.open();
      } catch (err) {
        console.error(err);
        addToast('Could not initiate payment. Falling back to COD.', 'warning');
        if (onFallbackToCOD) onFallbackToCOD();
      } finally {
        setLoading(false);
      }
    },
    [loadRazorpayScript, addToast]
  );

  return { initiatePayment, loading };
};

export default useRazorpay;
