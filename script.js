document.getElementById('signin-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
        alert('Please enter both your email/username and password.');
        return;
    }

    // Basic email validation (optional)
    if (!email.includes('@') && !email.includes('.')) {
        // It might be a username, so we just warn but don't block
        console.log('Username provided:', email);
    }

    // This is where you'd connect to a backend.
    // For demo, show a branded success message.
    alert(`🔐 Welcome back, ${email.split('@')[0] || email}!\n\n(Backend integration required for real authentication.)`);

    // You could redirect to a dashboard here:
    // window.location.href = '/dashboard.html';

    console.log('GBP Store Sign-in:', { email, password });
});

// Add some interactivity - show password toggle could be added here
console.log('🇬🇧 GBP Store — Sign-in page loaded');
