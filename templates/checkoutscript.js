document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItemsSection = document.querySelector('.order-items');
    const itemSubtotalElement = document.getElementById('itemSubtotal');
    const estTaxElement = document.getElementById('estTax');
    const estShippingElement = document.getElementById('estShipping');
    const estimatedTotalElement = document.getElementById('estimatedTotal');

    let subtotal = 0;

    // Dynamically create and add the cart item elements
    cart.forEach(item => {
        //const price = parseFloat(item.price.replace("$", ""));
        //const quantity = parseInt(item.quantity, 10);
        //subtotal += price * quantity;

        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name} Image" style="width:100px; height:auto;">
            <p class="item-name">${item.name}</p>
            <p class="item-price">${item.price}</p>
            <p class="item-quantity">Quantity: ${item.quantity}</p>
            <button class="remove-item-btn" data-id="${item.id}">Remove</button>
        `;
        orderItemsSection.appendChild(itemElement);
    });
    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.getAttribute('data-id');
            removeItemFromCart(itemId);
        });
    });
    
    function removeItemFromCart(itemId) {
        // Fetch the current cart
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        // Filter out the item to be removed
        cart = cart.filter(item => item.id !== itemId);
        // Update the cart in localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        // Refresh the cart display
        location.reload(); // Quick way to refresh the page. For a better UX, consider dynamically updating the DOM instead.
    }

    const taxRate = 0.03; // Example: 3% tax rate
    const tax = subtotal * taxRate;
    const shippingCost = 0; // Assuming free shipping for simplicity
    const total = subtotal + tax + shippingCost;

    document.getElementById('itemSubtotal').innerText = `Item Subtotal: $${subtotal.toFixed(2)}`;
    document.getElementById('estTax').innerText = `Est. Sales tax (3%): $${tax.toFixed(2)}`;
    document.getElementById('estShipping').innerText = `Est. Shipping: Free`;
    document.getElementById('estimatedTotal').innerText = `Estimated Total: $${total.toFixed(2)}`;
    // Calculate taxes and total
    // const tax = subtotal * 0.03; // Example tax rate of 3%
    // const shippingCost = 0; // Assuming free shipping
    // const total = subtotal + tax + shippingCost;

    // Update the Order Summary section with calculated values
    // itemSubtotalElement.innerText = `Item Subtotal: $${subtotal.toFixed(2)}`;
    // estTaxElement.innerText = `Est. Sales tax (3%): $${tax.toFixed(2)}`;
    // estShippingElement.innerText = `Est. Shipping: ${shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}`;
    // estimatedTotalElement.innerText = `Estimated Total: $${total.toFixed(2)}`;

    // Add any additional event listeners for the checkout process here
    const checkoutButton = document.getElementById('finalizeCheckout');
    checkoutButton.addEventListener('click', function() {
        // Placeholder for checkout functionality
        console.log('Proceeding to checkout...');
        // Here, you would typically handle the checkout process, such as validating the cart,
        // collecting payment information, and finalizing the order.
    });
});