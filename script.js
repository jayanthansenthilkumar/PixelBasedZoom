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
});