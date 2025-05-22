document.addEventListener('DOMContentLoaded', function() {
    // Login Form Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Simple validation
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }

            // In a real app, you would send this to your backend
            console.log('Login attempt with:', { email, password });

            // Redirect to dashboard (simulated)
            window.location.href = 'dashboard.html';
        });
    }

    // Registration Form Submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const terms = document.getElementById('terms').checked;

            // Validation
            if (!fullName || !email || !password || !confirmPassword) {
                alert('Please fill in all fields');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            if (password.length < 8) {
                alert('Password must be at least 8 characters');
                return;
            }

            if (!terms) {
                alert('You must agree to the terms and conditions');
                return;
            }

            // In a real app, you would send this to your backend
            console.log('Registration with:', { fullName, email, password });

            // Redirect to dashboard (simulated)
            window.location.href = 'dashboard.html';
        });
    }
});