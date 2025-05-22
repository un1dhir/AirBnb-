// M-Pesa Integration Functions
class MpesaIntegration {
    constructor() {
        this.apiUrl = 'https://api.mpesa.com'; // This would be your backend endpoint
    }

    // Initiate STK push
    async initiateSTKPush(phone, amount, reference, callbackUrl) {
        try {
            // In a real implementation, this would call your backend API
            // which would then call the Safaricom M-Pesa API
            const response = await fetch(`${this.apiUrl}/mpesa/stkpush`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: this.formatPhoneNumber(phone),
                    amount: amount,
                    reference: reference,
                    callbackUrl: callbackUrl
                })
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error initiating STK push:', error);
            throw error;
        }
    }

    // Format phone number to 2547XXXXXXXX
    formatPhoneNumber(phone) {
        // Remove all non-digit characters
        let cleaned = phone.replace(/\D/g, '');

        // Handle Kenyan numbers starting with 0 or +254 or 254
        if (cleaned.startsWith('0')) {
            return '254' + cleaned.substring(1);
        } else if (cleaned.startsWith('254')) {
            return cleaned;
        } else if (cleaned.startsWith('+254')) {
            return cleaned.substring(1);
        } else {
            // Assume it's already in 254 format
            return cleaned;
        }
    }

    // Check payment status
    async checkPaymentStatus(transactionId) {
        try {
            const response = await fetch(`${this.apiUrl}/mpesa/status/${transactionId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error checking payment status:', error);
            throw error;
        }
    }

    // Handle M-Pesa callback (this would be on your backend)
    handleCallback(callbackData) {
        // Process the callback data from M-Pesa
        // This would update your database with the payment status
        console.log('Received M-Pesa callback:', callbackData);

        // Return appropriate response to M-Pesa
        return {
            ResultCode: 0,
            ResultDesc: "Success"
        };
    }
}

// Initialize M-Pesa integration if on relevant page
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('mpesaForm')) {
        const mpesa = new MpesaIntegration();

        // Make available globally for demo purposes
        window.mpesa = mpesa;

        // Example usage in the payment modal
        document.getElementById('mpesaForm').addEventListener('submit', async function(e) {
            e.preventDefault();

            const phone = document.getElementById('mpesaPhone').value;
            const amount = document.getElementById('mpesaAmount').value;
            const reference = document.getElementById('mpesaReference').value;

            try {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';

                // In a real app, you would call your backend which then calls M-Pesa
                // For this demo, we'll simulate the response
                const response = await mpesa.initiateSTKPush(phone, amount, reference, 'https://yourdomain.com/mpesa-callback');

                // Simulated success response
                setTimeout(() => {
                    alert(`Payment request sent to ${phone} for KES ${amount}`);
                    document.getElementById('paymentModal').classList.remove('active');
                    this.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Payment Request';
                }, 1500);

            } catch (error) {
                alert('Error processing payment: ' + error.message);
                const submitBtn = this.querySelector('button[type="submit"]');
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Payment Request';
            }
        });
    }
});