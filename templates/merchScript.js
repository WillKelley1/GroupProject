function loadCategory(category) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'products.json', true);
    xhr.onload = function() {
      if (this.status === 200) {
        const products = JSON.parse(this.responseText);
        const plantGrid = document.getElementById('plantGrid');
        plantGrid.innerHTML = ''; // Clear existing content
  
        products[category].forEach(product => {
          const productElement = document.createElement('a');
          productElement.href = "#";
          //productElement.onclick = "showProductPage('1'); return false;"
          productElement.className = 'plant-item';
          productElement.onclick=function(){showProductPage(product.id)};
          
          const productImage = document.createElement('img');
          productImage.src = product.image;
          productImage.alt = product.name;
          productElement.appendChild(productImage);
  
          const productName = document.createElement('h3');
          productName.textContent = product.name;
          productElement.appendChild(productName);
  
          const productPrice = document.createElement('p');
          productPrice.className = 'price';
          productPrice.textContent = product.price;
          productElement.appendChild(productPrice);
  
          const ratingElement = document.createElement('div');
          ratingElement.className = 'rating';
  
          for (let i = 0; i < 5; i++) {
            const star = document.createElement('span');
            star.innerHTML = i < product.rating ? '&#9733;' : '&#9734;'; // Filled star for ratings up to the product's rating, empty star otherwise
            ratingElement.appendChild(star);
          }
  
  productElement.appendChild(ratingElement);
  
          plantGrid.appendChild(productElement);
        });
      } else {
        console.error('Failed to fetch data');
      }
    };
    xhr.onerror = function() {
      console.error('Network error');
    };
    xhr.send();
  }
  
  // for the color changing buttons in the navigation bar on plants
  document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
  
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
            this.style.backgroundColor = randomColor;
        });
  
        link.addEventListener('mouseleave', function() {
            this.style.backgroundColor = ''; // Optionally reset the color on mouse leave
        });
    });
  });
  
  
  
  
  // Assuming you'd like to keep the category refinement static in the HTML,
  // and considering the category buttons or links might not change dynamically,
  // the onload event listener ensures a default category is loaded.
  window.onload = () => loadCategory('shirts');