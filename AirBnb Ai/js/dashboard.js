document.addEventListener('DOMContentLoaded', function() {
    // Mobile sidebar toggle
    const sidebarToggle = document.createElement('div');
    sidebarToggle.className = 'sidebar-toggle';
    sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.content-header').prepend(sidebarToggle);

    sidebarToggle.addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('active');
    });

    // Add Booking Modal
    const addBookingBtn = document.getElementById('addBookingBtn');
    const addBookingModal = document.getElementById('addBookingModal');
    const closeModalButtons = document.querySelectorAll('.close-modal');

    if (addBookingBtn && addBookingModal) {
        addBookingBtn.addEventListener('click', function() {
            addBookingModal.classList.add('active');
        });
    }

    // Payment Modal
    const paymentModal = document.getElementById('paymentModal');
    const paymentMethods = document.querySelectorAll('.payment-method');

    // Show payment modal when payment buttons are clicked
    document.querySelectorAll('[title="Process Payment"]').forEach(btn => {
        btn.addEventListener('click', function() {
            paymentModal.classList.add('active');
        });
    });

    // Payment method selection
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');

            const methodType = this.getAttribute('data-method');
            document.querySelectorAll('.payment-details').forEach(detail => {
                detail.classList.add('hidden');
            });
            document.getElementById(`${methodType}Payment`).classList.remove('hidden');
        });
    });

    // Close modals
    closeModalButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('active');
            });
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });

    // M-Pesa form submission
    const mpesaForm = document.getElementById('mpesaForm');
    if (mpesaForm) {
        mpesaForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const phone = document.getElementById('mpesaPhone').value;
            const amount = document.getElementById('mpesaAmount').value;
            const reference = document.getElementById('mpesaReference').value;

            if (!phone || !amount || !reference) {
                alert('Please fill in all fields');
                return;
            }

            // In a real app, this would call your backend to initiate M-Pesa payment
            console.log('M-Pesa payment request:', { phone, amount, reference });

            // Simulate successful payment
            alert(`Payment request sent to ${phone} for KES ${amount}`);
            paymentModal.classList.remove('active');
        });
    }

    // Add Booking form submission
    const addBookingForm = document.getElementById('addBookingForm');
    if (addBookingForm) {
        addBookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const property = document.getElementById('bookingProperty').value;
            const status = document.getElementById('bookingStatus').value;
            const checkIn = document.getElementById('checkInDate').value;
            const checkOut = document.getElementById('checkOutDate').value;
            const guestName = document.getElementById('guestName').value;
            const guestEmail = document.getElementById('guestEmail').value;
            const guestPhone = document.getElementById('guestPhone').value;
            const amount = document.getElementById('bookingAmount').value;
            const notes = document.getElementById('bookingNotes').value;

            // Validate required fields
            if (!property || !checkIn || !checkOut || !guestName || !guestEmail || !amount) {
                alert('Please fill in all required fields');
                return;
            }

            // In a real app, this would send data to your backend
            console.log('New booking:', {
                property, status, checkIn, checkOut,
                guestName, guestEmail, guestPhone, amount, notes
            });

            // Simulate successful booking
            alert('Booking added successfully!');
            addBookingModal.classList.remove('active');
            addBookingForm.reset();

            // In a real app, you would refresh the bookings list or add the new booking to the table
        });
    }

    // Filter bookings
    const applyFilters = document.getElementById('applyFilters');
    if (applyFilters) {
        applyFilters.addEventListener('click', function() {
            const status = document.getElementById('statusFilter').value;
            const startDate = document.getElementById('startDate').value;
            const endDate = document.getElementById('endDate').value;

            console.log('Applying filters:', { status, startDate, endDate });

            // In a real app, this would filter the bookings table or fetch filtered data from the backend
            alert('Filters applied (simulated)');
        });
    }
});