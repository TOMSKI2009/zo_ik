const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\User\\Downloads\\zo_ik';
const files = ['index.html', 'shop.html', 'product.html', 'about.html', 'contact.html', 'cart.html'];

for (let file of files) {
  let p = path.join(dir, file);
  let html = fs.readFileSync(p, 'utf8');
  html = html.replace(/addToკალათა/g, 'addToCart');
  // Also let's check for any other broken english functions:
  // Are there any others? The dictionary replaced exact matches.
  // "Home", "Shop", "About", "Contact", "Cart", "Search"
  // "Cart" -> "კალათა"
  // Did it replace "fhz_cart" -> "fhz_კალათა" ???
  html = html.replace(/fhz_კალათა/g, 'fhz_cart');
  html = html.replace(/renderკალათა/g, 'renderCart');
  html = html.replace(/updateკალათაCount/g, 'updateCartCount');
  html = html.replace(/cartNavBtn/g, 'cartNavBtn'); // original
  html = html.replace(/კალათაNavBtn/g, 'cartNavBtn');
  
  // What about "Search"? Did "Search" break any JS?
  // "Search" -> "ძიება"
  html = html.replace(/searchBtn/g, 'searchBtn');
  html = html.replace(/ძიებაBtn/g, 'searchBtn');
  
  fs.writeFileSync(p, html);
}
console.log("Fixed JS broken by translation");
