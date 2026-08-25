// Auth state observer
auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in, redirect to dashboard if on login/signup page
        if (window.location.pathname.includes('login.html') || 
            window.location.pathname.includes('signup.html') ||
            window.location.pathname === '/' || 
            window.location.pathname === '') {
            window.location.href = 'index.html';
        }
    } else {
        // User is signed out, redirect to login if on protected page
        if (!window.location.pathname.includes('login.html') && 
            !window.location.pathname.includes('signup.html')) {
            window.location.href = 'login.html';
        }
    }
});

// Login form
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const errorEl = document.getElementById('error-message');
            const btn = document.getElementById('login-btn');

            btn.disabled = true;
            btn.textContent = 'Signing in...';
            errorEl.classList.add('hidden');

            try {
                await auth.signInWithEmailAndPassword(email, password);
                window.location.href = 'index.html';
            } catch (error) {
                errorEl.textContent = error.message;
                errorEl.classList.remove('hidden');
                btn.disabled = false;
                btn.textContent = 'Sign in';
            }
        });
    }

    // Signup form
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const displayName = document.getElementById('display-name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const errorEl = document.getElementById('error-message');
            const successEl = document.getElementById('success-message');
            const btn = document.getElementById('signup-btn');

            btn.disabled = true;
            btn.textContent = 'Creating account...';
            errorEl.classList.add('hidden');
            successEl.classList.add('hidden');

            try {
                const userCredential = await auth.createUserWithEmailAndPassword(email, password);
                await userCredential.user.updateProfile({ displayName });
                
                // Create user document in Firestore
                await db.collection('users').doc(userCredential.user.uid).set({
                    displayName: displayName,
                    email: email,
                    balance: 0,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    orders: []
                });

                successEl.textContent = 'Account created successfully! Redirecting...';
                successEl.classList.remove('hidden');
                setTimeout(() => window.location.href = 'index.html', 1500);
            } catch (error) {
                errorEl.textContent = error.message;
                errorEl.classList.remove('hidden');
                btn.disabled = false;
                btn.textContent = 'Create account';
            }
        });
    }

    // Google login
    document.querySelectorAll('#google-login, #google-signup').forEach(btn => {
        if (btn) {
            btn.addEventListener('click', async () => {
                try {
                    const provider = new firebase.auth.GoogleAuthProvider();
                    await auth.signInWithPopup(provider);
                    window.location.href = 'index.html';
                } catch (error) {
                    alert(error.message);
                }
            });
        }
    });

    // Guest login (demo mode)
    const guestBtn = document.getElementById('guest-login');
    if (guestBtn) {
        guestBtn.addEventListener('click', async () => {
            try {
                await auth.signInAnonymously();
                window.location.href = 'index.html';
            } catch (error) {
                alert(error.message);
            }
        });
    }

    // Forgot password
    const forgotLink = document.getElementById('forgot-password');
    if (forgotLink) {
        forgotLink.addEventListener('click', async (e) => {
            e.preventDefault();
            const email = prompt('Enter your email address to reset your password:');
            if (email) {
                try {
                    await auth.sendPasswordResetEmail(email);
                    alert('Password reset email sent! Check your inbox.');
                } catch (error) {
                    alert(error.message);
                }
            }
        });
    }

    // Logout
    document.querySelectorAll('#logout-btn, #mobile-logout-btn').forEach(btn => {
        if (btn) {
            btn.addEventListener('click', async () => {
                if (confirm('Are you sure you want to logout?')) {
                    await auth.signOut();
                    window.location.href = 'login.html';
                }
            });
        }
    });
});
