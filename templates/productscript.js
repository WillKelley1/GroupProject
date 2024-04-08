// document.addEventListener('DOMContentLoaded', function() {
//     // Simulated product data
//     var productData = {
//         imageUrl: 'path-to-product-image.jpg', // Replace with your image path
//         name: 'Garden Shovel',
//         price: '$15.99',
//         rating: 4, // Assuming a 5-star rating system
//         itemNumber: 'G123',
//         description: 'This is a sturdy garden shovel, perfect for all your gardening needs.'
//     };

//     // Populate the product data
//     document.getElementById('productImage').src = productData.imageUrl;
//     document.getElementById('productName').textContent = productData.name;
//     document.getElementById('productPrice').textContent = productData.price;
//     document.getElementById('productRating').getElementsByClassName('stars')[0].textContent = '★★★★★'.slice(0, productData.rating) + '☆☆☆☆☆'.slice(0, 5-productData.rating);
//     document.getElementById('itemNumber').textContent = productData.itemNumber;
//     document.getElementById('productDescription').textContent = productData.description;

//     // TODO: Add event listeners and functionality for quantity changes and adding to cart
// });
// productscript.js
document.addEventListener('DOMContentLoaded', function() {
    const productId = sessionStorage.getItem('currentProductId');

    // Fetch the product details from products.json
    fetch('products.json')
        .then(response => response.json())
        .then(allProducts => {
            // Find the current product across all categories
            let currentProduct = null;
            for (const category in allProducts) {
                const product = allProducts[category].find(product => product.id === productId);
                if (product) {
                    currentProduct = product;
                    break;
                }
            }

            if (currentProduct) {
                // Populate the product details
                document.getElementById('productImage').src = currentProduct.image;
                document.getElementById('productName').textContent = currentProduct.name;
                document.getElementById('productPrice').textContent = currentProduct.price;
                document.getElementById('productRating').textContent = '★'.repeat(currentProduct.rating) + '☆'.repeat(5 - currentProduct.rating);
                document.getElementById('productDescription').textContent = currentProduct.description;

                // Add event listener for "Add to Cart" button
                const addToCartButton = document.getElementById('addToCart');
                addToCartButton.addEventListener('click', function() {
                    addProductToCart(currentProduct);
                    window.location.href = 'checkout.html'; // Redirect to checkout page
                });

            } else {
                console.error('Product not found');
            }
        });

        function addProductToCart(product) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const productToAdd = {
                id: product.id,
                name: product.name,
                price: parseFloat(product.price.replace("$", "")),
                quantity: parseInt(document.getElementById('quantity').value, 10),
                image: product.image,
                description: product.description
            };
    
            // Check if product already exists in cart
            const existingProductIndex = cart.findIndex(item => item.id === productToAdd.id);
            if (existingProductIndex !== -1) {
                // Update quantity if product exists
                cart[existingProductIndex].quantity += productToAdd.quantity;
            } else {
                // Add new product to cart
                cart.push(productToAdd);
            }
    
            // Store the updated cart back in localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
        }
});