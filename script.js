document.addEventListener('DOMContentLoaded', () => {

    // === DATA STORE: CLIENT'S CONTENT MANAGEMENT AREA ===
    const watchData = {
        'navigator': {
            name: 'The Navigator',
            price: 1850,
            short_desc: 'A robust dual-time zone automatic, built for the modern adventurer.',
            description: 'Built for the modern adventurer, The Navigator features a robust stainless steel case, a dual-time zone function, and a compass bezel. Its automatic movement ensures you\'re always on time, no matter where your journey takes you.',
            specs: { 'Case Size': '42mm', 'Material': '316L Stainless Steel', 'Movement': 'Swiss Automatic (ETA 2893-2)', 'Water Resistance': '100m', 'Crystal': 'Sapphire Crystal' },
            images: [
                'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg', 'https://images.pexels.com/photos/277406/pexels-photo-277406.jpeg', 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg', 'https://images.pexels.com/photos/236915/pexels-photo-236915.jpeg', 'https://images.pexels.com/photos/266656/pexels-photo-266656.jpeg'
            ]
        },
        'monarch': {
            name: 'The Monarch',
            price: 2300,
            short_desc: 'A classic dress watch with a polished gold-tone case for pure class.',
            description: 'Exuding pure class, The Monarch is a dress watch that commands attention. Its polished gold-tone case, clean white dial, and genuine leather strap create a look of understated luxury.',
            specs: { 'Case Size': '40mm', 'Material': 'Gold-PVD Coated Steel', 'Movement': 'Swiss Quartz (Ronda)', 'Water Resistance': '50m', 'Strap': 'Genuine Alligator Leather' },
            images: [
                'https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg', 'https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg', 'https://images.pexels.com/photos/1034008/pexels-photo-1034008.jpeg', 'https://images.pexels.com/photos/277319/pexels-photo-277319.jpeg', 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg'
            ]
        },
        'minimalist': {
            name: 'The Minimalist',
            price: 980,
            short_desc: 'Embracing "less is more," with a clean, balanced dial for the modern professional.',
            description: 'Simplicity is the ultimate sophistication. The Minimalist strips away the non-essential, leaving a clean, balanced dial and a slender case that slips effortlessly under a cuff. A true modern classic.',
            specs: { 'Case Size': '38mm', 'Material': 'Polished Stainless Steel', 'Movement': 'Japanese Quartz (Miyota)', 'Water Resistance': '30m', 'Crystal': 'Hardened Mineral Crystal' },
            images: [
                'https://images.pexels.com/photos/9978711/pexels-photo-9978711.jpeg', 'https://images.pexels.com/photos/47856/rolex-watch-time-luxury-47856.jpeg', 'https://images.pexels.com/photos/1162519/pexels-photo-1162519.jpeg', 'https://images.pexels.com/photos/4449070/pexels-photo-4449070.jpeg', 'https://images.pexels.com/photos/133509/pexels-photo-133509.jpeg'
            ]
        }
    };

    // === GLOBAL SITE FEATURES ===
    // --- Preloader ---
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('hidden');
        });
    }

    // --- Header Scroll Effect & Footer Injection ---
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 50));
    }
    const footer = document.querySelector('footer.footer');
    if (footer) {
        footer.innerHTML = `
            <div class="container">
                <div class="footer-grid">
                    <div class="footer-brand">
                        <a href="index.html" class="logo">CHRONO<span>LUX</span></a>
                        <p>Precision timepieces for the moments that become part of your story.</p>
                        <div class="social-links">
                            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                            <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" aria-label="Pinterest"><i class="fab fa-pinterest-p"></i></a>
                        </div>
                    </div>
                    <div class="footer-column">
                        <h4>Explore</h4>
                        <a href="index.html#featured">The collection</a>
                        <a href="about.html">Our story</a>
                        <a href="contact.html">Journal</a>
                    </div>
                    <div class="footer-column">
                        <h4>Client care</h4>
                        <a href="contact.html">Contact us</a>
                        <a href="contact.html">Delivery & returns</a>
                        <a href="contact.html">Watch care</a>
                    </div>
                    <div class="footer-newsletter">
                        <h4>Stay in time</h4>
                        <p>New releases, private previews, and stories from the atelier.</p>
                        <form class="newsletter-form" onsubmit="event.preventDefault(); this.classList.add('subscribed'); this.querySelector('input').value='Thank you for subscribing'; this.querySelector('input').disabled=true; this.querySelector('button').disabled=true;">
                            <input type="email" aria-label="Email address" placeholder="Your email address" required>
                            <button type="submit" aria-label="Subscribe"><i class="fa-solid fa-arrow-right"></i></button>
                        </form>
                    </div>
                </div>
                <div class="footer-bottom"><p>&copy; ${new Date().getFullYear()} ChronoLux. All rights reserved.</p><div><a href="#">Privacy</a><a href="#">Terms</a><span>Made by KneoSS</span></div></div>
            </div>`;
    }

    // --- Scroll Animations ---
    const scrollElements = document.querySelectorAll('.animate-on-scroll');
    if (scrollElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('is-visible');
            });
        }, { threshold: 0.1 });
        scrollElements.forEach(el => observer.observe(el));
    }
    
    // === SHOPPING CART LOGIC (PERSISTENT) ===
    let cart = JSON.parse(localStorage.getItem('CHRONOLUX_CART')) || [];
    const saveCart = () => localStorage.setItem('CHRONOLUX_CART', JSON.stringify(cart));
    const formatCurrency = price => `$${price.toLocaleString()}`;

    const updateCartIcon = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartBadge = document.querySelector('.cart-badge');
        if (cartBadge) {
            cartBadge.textContent = totalItems;
            cartBadge.dataset.count = totalItems;
            cartBadge.classList.toggle('show', totalItems > 0);
        }
    };

    const addToCart = (productId) => {
        const product = watchData[productId];
        if (!product) return;

        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                image: product.images[0],
                quantity: 1
            });
        }
        saveCart();
        updateCartIcon();
    };

    // --- Add to Cart Button Listeners ---
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.closest('.product-card, .product-actions')?.dataset.id;
            if (productId) {
                addToCart(productId);
                
                // Visual feedback
                const originalText = button.textContent;
                button.textContent = 'Added!';
                button.classList.add('added');
                setTimeout(() => {
                    button.textContent = originalText;
                    button.classList.remove('added');
                }, 1500);
            }
        });
    });

    // === PAGE-SPECIFIC LOGIC ===
    // --- Product Detail Page ---
    if (document.body.id === 'product-detail-page') {
        const params = new URLSearchParams(window.location.search);
        const productId = params.get('id');
        const product = watchData[productId];
        
        if (product) {
            // Populate content
            document.title = `${product.name} | ChronoLux`;
            document.getElementById('product-name').textContent = product.name;
            document.getElementById('product-price').textContent = formatCurrency(product.price);
            document.getElementById('product-description').textContent = product.description;
            document.querySelector('.product-actions').dataset.id = productId;
            
            const mainImage = document.getElementById('main-product-image');
            mainImage.src = product.images[0];
            mainImage.alt = product.name;

            const specsList = document.getElementById('product-specs');
            specsList.innerHTML = Object.entries(product.specs).map(([key, value]) => `<li>${key}: <span>${value}</span></li>`).join('');

            const thumbnailGallery = document.getElementById('thumbnail-gallery');
            thumbnailGallery.innerHTML = product.images.map((imgSrc, index) => `<img src="${imgSrc}" alt="Thumbnail ${index + 1}" class="${index === 0 ? 'active-thumbnail' : ''}">`).join('');
            thumbnailGallery.addEventListener('click', (e) => {
                if (e.target.tagName === 'IMG') {
                    mainImage.src = e.target.src;
                    document.querySelector('.thumbnail-images .active-thumbnail').classList.remove('active-thumbnail');
                    e.target.classList.add('active-thumbnail');
                }
            });

            const buyNowButton = document.querySelector('.buy-now-btn');
            if (buyNowButton) {
                buyNowButton.addEventListener('click', () => {
                    addToCart(productId);
                    window.location.href = 'cart.html';
                });
            }
        } else {
            // Product not found
            document.getElementById('product-content').style.display = 'none';
            document.getElementById('product-not-found').style.display = 'block';
        }
    }
    
    // --- Cart Page ---
    if (document.body.id === 'cart-page') {
        const cartItemsList = document.querySelector('.cart-items-list');
        const emptyCartMessage = document.querySelector('.empty-cart-message');
        const cartSummary = document.querySelector('.cart-summary');
        const checkoutBtn = document.querySelector('.checkout-btn');

        const renderCart = () => {
            if (cart.length === 0) {
                emptyCartMessage.style.display = 'block';
                cartItemsList.innerHTML = '';
                cartSummary.style.display = 'none';
            } else {
                emptyCartMessage.style.display = 'none';
                cartSummary.style.display = 'block';

                cartItemsList.innerHTML = cart.map(item => `
                    <div class="cart-item" data-id="${item.id}">
                        <div class="cart-item-img"><img src="${item.image}" alt="${item.name}"></div>
                        <div class="cart-item-details">
                            <h3>${item.name}</h3>
                            <p class="price">${formatCurrency(item.price)}</p>
                        </div>
                        <div class="cart-item-actions">
                            <div class="quantity-selector">
                                <button class="quantity-btn decrease">-</button>
                                <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                                <button class="quantity-btn increase">+</button>
                            </div>
                            <button class="remove-btn"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                `).join('');
            }
            updateCartSummary();
        };

        const updateCartSummary = () => {
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            document.getElementById('cart-subtotal').textContent = formatCurrency(subtotal);
            document.getElementById('cart-total').textContent = formatCurrency(subtotal); // Assuming free shipping
            checkoutBtn.classList.toggle('disabled', cart.length === 0);
        };

        cartItemsList.addEventListener('click', e => {
            const target = e.target.closest('button');
            if (!target) return;

            const cartItemDiv = e.target.closest('.cart-item');
            const productId = cartItemDiv.dataset.id;
            const itemInCart = cart.find(item => item.id === productId);

            if (target.classList.contains('increase')) {
                itemInCart.quantity++;
            } else if (target.classList.contains('decrease')) {
                if (itemInCart.quantity > 1) {
                    itemInCart.quantity--;
                } else {
                    cart = cart.filter(item => item.id !== productId);
                }
            } else if (target.classList.contains('remove-btn')) {
                cart = cart.filter(item => item.id !== productId);
            }
            
            saveCart();
            renderCart();
            updateCartIcon();
        });
        
        checkoutBtn.addEventListener('click', e => {
            if (cart.length === 0) {
                e.preventDefault();
            } else {
                localStorage.removeItem('CHRONOLUX_CART'); // Clear cart on "checkout"
            }
        });
        
        renderCart();
    }
    
    // --- Contact Page ---
    if (document.body.id === 'contact-page') {
        const form = document.getElementById('contact-form');
        form.addEventListener('submit', e => {
            e.preventDefault();
            // This is a demo. A real form would send data to a server.
            alert('Thank you for your message! We will get back to you shortly.');
            form.reset();
        });
    }

    // --- Initial Call on every page load ---
    updateCartIcon();
});
