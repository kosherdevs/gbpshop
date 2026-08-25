document.addEventListener('DOMContentLoaded', () => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Load user data from Firestore
    const userRef = db.collection('users').doc(currentUser.uid);

    // Real-time balance updates
    userRef.onSnapshot(doc => {
        if (doc.exists) {
            const data = doc.data();
            const balance = data.balance || 0;
            const displayName = data.displayName || currentUser.displayName || 'User';

            document.getElementById('user-display-name').textContent = displayName;
            document.getElementById('nav-balance').textContent = `$${balance.toFixed(2)}`;
            document.getElementById('dashboard-balance').textContent = `$${balance.toFixed(2)}`;
            document.getElementById('total-orders-count').textContent = (data.orders || []).length;
        }
    });

    // Mobile menu toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => mobileMenu.classList.remove('hidden'));
        menuClose.addEventListener('click', () => mobileMenu.classList.add('hidden'));
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
        });
    }

    // Navigation - page switching
    document.querySelectorAll('[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            
            // Highlight active nav item
            document.querySelectorAll('[data-page]').forEach(el => {
                el.classList.remove('bg-accent', 'text-foreground');
                el.classList.add('text-foreground/90');
            });
            link.classList.add('bg-accent', 'text-foreground');
            link.classList.remove('text-foreground/90');

            // Handle different pages
            const content = document.getElementById('page-content');
            switch(page) {
                case 'home':
                    document.getElementById('home-content').style.display = 'block';
                    break;
                case 'balance':
                    alert('💰 Balance page - Add funds feature coming soon!');
                    break;
                case 'orders':
                    alert('📦 Orders page - Your order history will appear here.');
                    break;
                case 'products':
                    alert('🛍️ Products page - Browse our catalog coming soon!');
                    break;
                case 'notifications':
                    alert('🔔 No new notifications.');
                    break;
                case 'settings':
                    alert('⚙️ Settings page - Account management coming soon!');
                    break;
                default:
                    alert(`📄 ${page} page - Coming soon!`);
            }
        });
    });

    // Stats toggle
    document.querySelectorAll('[data-stat]').forEach(stat => {
        stat.addEventListener('click', () => {
            document.querySelectorAll('[data-stat]').forEach(el => {
                el.classList.remove('bg-accent', 'text-foreground');
                el.classList.add('text-muted-foreground');
            });
            stat.classList.add('bg-accent', 'text-foreground');
            stat.classList.remove('text-muted-foreground');
            
            // Demo stats update
            const orders = Math.floor(Math.random() * 50);
            document.getElementById('orders-daily').textContent = Math.floor(Math.random() * 10);
            document.getElementById('orders-avg-daily').textContent = Math.floor(Math.random() * 3);
            document.getElementById('orders-week').textContent = Math.floor(Math.random() * 30);
            document.getElementById('orders-avg-week').textContent = Math.floor(Math.random() * 5);
            document.getElementById('orders-month').textContent = orders;
            document.getElementById('orders-avg-month').textContent = Math.floor(orders / 30);
        });
    });

    // Cart badge (demo)
    const cartBadge = document.getElementById('cart-badge');
    if (cartBadge) {
        cartBadge.classList.remove('hidden');
        cartBadge.textContent = '3';
    }

    console.log('🇬🇧 GBP Store — Dashboard ready');
});
