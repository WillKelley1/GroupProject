document.addEventListener('DOMContentLoaded', function() {
    loadCartItems();

    function loadCartItems() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const orderItemsSection = document.querySelector('.order-items');
        //orderItemsSection.innerHTML = ''; // Clear current content
        orderItemsSection.innerHTML = '<h2>Your Cart</h2>'; // Reinclude the "Your Cart" heading
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width:100px; height:auto;">
                <p class="item-name">${item.name}</p>
                <p class="item-price">${item.price}</p>
                <p class="item-quantity">Quantity: ${item.quantity}</p>
                <button class="remove-item-btn" data-id="${item.id}">Remove</button>
            `;
            orderItemsSection.appendChild(itemElement);
        });

        attachRemoveButtonListeners();
        updateOrderSummary();
    }

    function attachRemoveButtonListeners() {
        document.querySelectorAll('.remove-item-btn').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.getAttribute('data-id');
                removeItemFromCart(itemId);
            });
        });
    }

    function removeItemFromCart(itemId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems(); // Refresh cart display
    }

    function updateOrderSummary() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let subtotal = 0;
    
        cart.forEach(item => {
            // Assuming price has been stored as a float; if not, you'll need to parse it
            subtotal += item.price * item.quantity;
        });
    
        const taxRate = 0.03; // Example tax rate
        const tax = subtotal * taxRate;
        const shippingCost = 0; // Example shipping cost, assuming free shipping
        const total = subtotal + tax + shippingCost;
    
        document.getElementById('itemSubtotal').textContent = `Item Subtotal: $${subtotal.toFixed(2)}`;
        document.getElementById('estTax').textContent = `Est. Sales tax (3%): $${tax.toFixed(2)}`;
        document.getElementById('estShipping').textContent = `Est. Shipping: Free`;
        document.getElementById('estimatedTotal').textContent = `Estimated Total: $${total.toFixed(2)}`;
    }
    
    // Call this function at the appropriate time

    updateOrderSummary();
    // Add an event listener for the "Proceed to Checkout" button
    document.getElementById('proceedToCheckout').addEventListener('click', function() {
    window.location.href = 'purchasePage.html'; // Redirects the user to the purchase page
        });
});