document.addEventListener('DOMContentLoaded', function() {
    // Quantity buttons functionality
    const minusButtons = document.querySelectorAll('.minus');
    const plusButtons = document.querySelectorAll('.plus');
    const removeButtons = document.querySelectorAll('.remove-btn');
    const qtyInputs = document.querySelectorAll('.qty-input');
    
    // Handle minus button clicks
    minusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.qty-input');
            let value = parseInt(input.value);
            if (value > 1) {
                input.value = value - 1;
                updateCartTotals();
            }
        });
    });
    
    // Handle plus button clicks
    plusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.qty-input');
            let value = parseInt(input.value);
            input.value = value + 1;
            updateCartTotals();
        });
    });
    
    // Handle quantity input changes
    qtyInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.value < 1) {
                this.value = 1;
            }
            updateCartTotals();
        });
    });
    
    // Handle remove button clicks
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            cartItem.style.opacity = 0;
            setTimeout(() => {
                cartItem.remove();
                updateCartTotals();
                updateCartCount();
            }, 300);
        });
    });
    
    // Update cart totals based on quantities and prices
    function updateCartTotals() {
        let subtotal = 0;
        
        // Calculate subtotal from all items
        document.querySelectorAll('.cart-item').forEach(item => {
            const priceText = item.querySelector('.price').textContent;
            const price = parseFloat(priceText.replace('$', ''));
            const quantity = parseInt(item.querySelector('.qty-input').value);
            subtotal += price * quantity;
        });
        
        // Tax calculation (assumes 8% tax rate)
        const tax = subtotal * 0.08;
        const total = subtotal + tax;
        
        // Update summary display
        const summaryItems = document.querySelectorAll('.summary-item');
        summaryItems[0].querySelector('span:last-child').textContent = `$${subtotal.toFixed(2)}`;
        summaryItems[2].querySelector('span:last-child').textContent = `$${tax.toFixed(2)}`;
        summaryItems[3].querySelector('span:last-child').textContent = `$${total.toFixed(2)}`;
        
        // Update cart count
        updateCartCount();
    }
    
    // Update the cart count badge
    function updateCartCount() {
        const cartItems = document.querySelectorAll('.cart-item');
        const cartCount = document.querySelector('.cart-count');
        cartCount.textContent = cartItems.length;
        
        // If cart is empty, show message
        const cartContainer = document.querySelector('.cart-container');
        if (cartItems.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.classList.add('empty-cart');
            emptyMessage.innerHTML = `
                <div class="empty-cart-message">
                    <i class="fas fa-shopping-cart"></i>
                    <h2>Your cart is empty</h2>
                    <p>Looks like you haven't added anything to your cart yet.</p>
                    <a href="#" class="continue-shopping">Continue Shopping</a>
                </div>
            `;
            
            // Replace cart container with empty message
            cartContainer.innerHTML = '';
            cartContainer.appendChild(emptyMessage);
        }
    }
    
    // Checkout button functionality
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            alert('Proceeding to checkout...');
            // Typically here you'd redirect to a checkout page
        });
    }
    
    // Product data - normally this would come from a database or API
    const productData = {
        'Jungle Harmony': {
            type: 'Acrylic Painting',
            artist: 'Jane Goodart',
            price: '$329.99',
            medium: 'Acrylic on Canvas',
            description: 'A vibrant exploration of jungle life featuring monkeys in their natural habitat. This piece captures the harmony between primates and their environment through bold colors and dynamic composition.'
        },
        'Primate Dreams': {
            type: 'Digital Art',
            artist: 'Michael Simian',
            price: '$189.99',
            medium: 'Digital Illustration',
            description: 'An ethereal digital creation depicting the dream world of primates. The surreal elements combined with realistic monkey features create a dreamlike quality that invites viewers to imagine the subconscious of our evolutionary relatives.'
        },
        'Banana Abstract': {
            type: 'Mixed Media',
            artist: 'Anna Primatologist',
            price: '$249.99',
            medium: 'Mixed Media on Wood',
            description: 'A playful abstract interpretation of monkeys and their favorite fruit. This mixed media piece incorporates actual banana fibers and vibrant colors to create texture and depth while maintaining a sense of humor.'
        },
        'Swinging Serenity': {
            type: 'Oil Painting',
            artist: 'Paul Chimpart',
            price: '$459.99',
            medium: 'Oil on Canvas',
            description: 'A serene oil painting capturing a moment of tranquility as monkeys swing through the forest canopy. The artist\'s masterful use of light and shadow creates a peaceful atmosphere that transports viewers to the quiet moments of jungle life.'
        },
        'Bronze Monkey': {
            type: 'Sculpture',
            artist: 'Sarah Sculptor',
            price: '$899.99',
            medium: 'Bronze',
            description: 'An elegant bronze sculpture depicting a contemplative monkey. The textured finish and attention to anatomical detail showcase the artist\'s deep understanding of primate form and expression, creating a piece that feels both ancient and timeless.'
        },
        'Monkey Business': {
            type: 'Limited Print',
            artist: 'Robert Primographer',
            price: '$125.99',
            medium: 'Giclee Print',
            description: 'A humorous limited edition print featuring monkeys in human business attire. This satirical artwork comments on corporate culture through the lens of our primate cousins, with meticulous attention to detail in every expression and gesture.'
        },
        'Geometric Primate': {
            type: 'Digital Print',
            artist: 'Geometric Designs',
            price: '$89.99',
            medium: 'Digital Print on Paper',
            description: 'A modern interpretation of primates through geometric shapes and bold colors. This digital print reduces the monkey form to its essential elements, creating a contemporary piece that works in any modern space.'
        },
        'Watercolor Wildlife': {
            type: 'Watercolor',
            artist: 'Maria Monkeybrush',
            price: '$219.99',
            medium: 'Watercolor on Paper',
            description: 'A delicate watercolor painting showcasing the gentle side of monkey behavior. The artist\'s light touch and transparent washes create a dreamy quality that emphasizes the tender moments of primate family life.'
        }
    };

    // DOM elements
    const modal = document.getElementById('quickViewModal');
    const modalClose = document.querySelector('.modal-close');
    const quickViewButtons = document.querySelectorAll('.quick-view');
    const modalProductImage = document.getElementById('modalProductImage');
    const modalProductTitle = document.getElementById('modalProductTitle');
    const modalProductType = document.getElementById('modalProductType');
    const modalProductArtist = document.getElementById('modalProductArtist');
    const modalProductPrice = document.getElementById('modalProductPrice');
    const modalProductDescription = document.getElementById('modalProductDescription');
    const modalProductMedium = document.getElementById('modalProductMedium');

    // Mobile menu toggle
    document.querySelector('.menu-toggle')?.addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('active');
    });

    // Quantity selector functionality
    document.querySelectorAll('.qty-btn').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.qty-input');
            const currentValue = parseInt(input.value);
            
            if (this.classList.contains('plus')) {
                input.value = currentValue + 1;
            } else if (this.classList.contains('minus') && currentValue > 1) {
                input.value = currentValue - 1;
            }
        });
    });

    // Quick view functionality
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get product details from the artwork card
            const artworkCard = this.closest('.artwork-card');
            const productImage = artworkCard.querySelector('.artwork-image img').src;
            const productTitle = artworkCard.querySelector('.artwork-details h3').textContent;
            
            // Populate modal with product data
            modalProductImage.src = productImage;
            modalProductImage.alt = productTitle;
            modalProductTitle.textContent = productTitle;
            
            // Get additional info from our product data object
            const product = productData[productTitle];
            if (product) {
                modalProductType.textContent = product.type;
                modalProductArtist.textContent = `By ${product.artist}`;
                modalProductPrice.textContent = product.price;
                modalProductDescription.textContent = product.description;
                modalProductMedium.textContent = product.medium;
            }
            
            // Show the modal
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close modal when clicking the X
    modalClose.addEventListener('click', function() {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Re-enable scrolling
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    // Filter buttons functionality
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Here you would typically filter the artwork grid
            // For demo purposes, we're just changing the active state
        });
    });
});