function fetchBooks(searchTerm) {
  //const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`;
  //const apiUrl = `https://www.goodreads.com/search/index.xml?key=${apiKey}&q=${searchTerm}`;
  //const apiUrl = `https://www.goodreads.com/api/overview`;
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=10&orderBy=relevance`;
  
 
   fetch(apiUrl)
     .then(response => response.json())
     .then(data => {
       // Handle the retrieved book data
       displayResults(data);
     })
     .catch(error => {
       console.log('Error fetching book data:', error);
     });
 }
 
 // Function to display search results
 function displayResults(data) {
   // Clear previous results
   const outputList = document.getElementById('list-output');
   outputList.innerHTML = '';
 
   // Process each book item
   data.items.forEach(item => {
     const book = item.volumeInfo;
     const title = book.title;
     const authors = book.authors ? book.authors.join(', ') : 'Unknown Author';
     const publisher = book.publisher ? book.publisher : 'Unknown Publisher';
     const bookLink = book.previewLink;
     const bookImg = book.imageLinks ? book.imageLinks.thumbnail : 'https://via.placeholder.com/150';
 
     // Create HTML elements for book display
     const bookCard = document.createElement('div');
     bookCard.classList.add('book-card');
 
     const bookImage = document.createElement('img');
     bookImage.src = bookImg;
     bookImage.alt = title;
     bookCard.appendChild(bookImage);
 
     const bookDetails = document.createElement('div');
     bookDetails.classList.add('book-details');
 
     const bookTitle = document.createElement('h2');
     bookTitle.textContent = title;
     bookDetails.appendChild(bookTitle);
 
     const bookAuthor = document.createElement('p');
     bookAuthor.textContent = `Author: ${authors}`;
     bookDetails.appendChild(bookAuthor);
 
     const bookPublisher = document.createElement('p');
     bookPublisher.textContent = `Publisher: ${publisher}`;
     bookDetails.appendChild(bookPublisher);
 
     const bookReadLink = document.createElement('a');
     bookReadLink.href = bookLink;
     bookReadLink.textContent = 'Read Book';
     bookReadLink.target = '_blank';
     bookDetails.appendChild(bookReadLink);
 
     bookCard.appendChild(bookDetails);
 
     outputList.appendChild(bookCard);
   });
 }
 
 // Handle search form submission
 const searchForm = document.getElementById('search-form');
 searchForm.addEventListener('submit', function(event) {
   event.preventDefault();
   const searchTerm = document.getElementById('search-input').value.trim();
 
   if (searchTerm !== '') {
     fetchBooks(searchTerm);
   }
 });
 function displayResults(data) {
   const outputList = document.getElementById('list-output');
   outputList.innerHTML = '';
 
   if (data.totalItems === 0) {
     outputList.innerHTML = '<p>No results found! Please try again.</p>';
     return;
   }
   
   let count = 0;
 
   data.items.forEach(item => {
     const book = item.volumeInfo;
     const title = book.title;
     const authors = book.authors ? book.authors.join(', ') : 'Unknown Author';
     const publisher = book.publisher ? book.publisher : 'Unknown Publisher';
     const bookLink = book.previewLink;
     const bookImg = book.imageLinks ? book.imageLinks.thumbnail : 'https://via.placeholder.com/150';
 
     const bookCard = document.createElement('div');
     bookCard.classList.add('book-card');
 
     const bookImage = document.createElement('img');
     bookImage.src = bookImg;
     bookImage.alt = title;
     bookCard.appendChild(bookImage);
 
     const bookDetails = document.createElement('div');
     bookDetails.classList.add('book-details');
 
     const bookTitle = document.createElement('h2');
     bookTitle.textContent = title;
     bookDetails.appendChild(bookTitle);
 
     const bookAuthor = document.createElement('p');
     bookAuthor.textContent = `Author: ${authors}`;
     bookDetails.appendChild(bookAuthor);
 
     const bookPublisher = document.createElement('p');
     bookPublisher.textContent = `Publisher: ${publisher}`;
     bookDetails.appendChild(bookPublisher);
 
     const bookReadLink = document.createElement('a');
     bookReadLink.href = bookLink;
     bookReadLink.textContent = 'Read Book';
     bookReadLink.target = '_blank';
     bookDetails.appendChild(bookReadLink);
     
     const addToCartButton = document.createElement('button');
     addToCartButton.textContent = 'Add to Cart';
     addToCartButton.classList.add('add-to-cart-button'); // Add CSS class
     addToCartButton.addEventListener('click', function() {
       // Handle adding the book to the cart
       addToCart(book);
     });
     bookDetails.appendChild(addToCartButton);
 
     bookCard.appendChild(bookDetails);
 
     outputList.appendChild(bookCard);
 
     setTimeout(() => {
       bookCard.style.opacity = '1';
       bookCard.classList.add('fade-in');
     }, 100 * count);
 
 
     count++;
   });
 
   const countOutput = document.getElementById('count-output');
   countOutput.textContent = count;
 
   const searchCount = document.getElementById('search-count');
   searchCount.style.display = 'block'; // Show the search count
   count = 0;
 }
 // Global variables
 const cartItems = []; // Array to store cart items
 
 // Function to handle adding a book to the cart
 function addToCart(book) {
 cartItems.push(book); // Add the book to the cartItems array
 displayCartItems();
 alert("added scuccesfully") // Display the updated cart items
 }
 
 // Function to display the cart items
 function displayCartItems() {
 const cartItemsContainer = document.getElementById('cart-items');
 cartItemsContainer.innerHTML = ''; // Clear previous cart items
 
 if (cartItems.length === 0) {
   cartItemsContainer.textContent = 'Cart is empty.';
   return;
 }

 
 
 cartItems.forEach(book => {
   const cartItem = document.createElement('div');
   cartItem.classList.add('cart-item');
   
   const bookImage = document.createElement('img');
   bookImage.src = book.image;
   bookImage.alt = book.title;
   cartItem.appendChild(bookImage);
 
   const bookDetails = document.createElement('div');
   bookDetails.classList.add('book-details');
 
   const bookTitle = document.createElement('h3');
   bookTitle.textContent = book.title;
   bookDetails.appendChild(bookTitle);
 
   const bookAuthor = document.createElement('p');
   bookAuthor.textContent = `Author: ${book.author}`;
   bookDetails.appendChild(bookAuthor);
 
   const bookPublisher = document.createElement('p');
   bookPublisher.textContent = `Publisher: ${book.publisher}`;
   bookDetails.appendChild(bookPublisher);
 
   cartItem.appendChild(bookDetails);
   
 
   const removeButton = document.createElement('button');
   removeButton.textContent = 'Remove';
   removeButton.addEventListener('click', function() {
     removeFromCart(book);
   });
   cartItem.appendChild(removeButton);
 
   cartItemsContainer.appendChild(cartItem);
 });
 }
 
 // Function to handle removing a book from the cart
 function removeFromCart(book) {
 const bookIndex = cartItems.indexOf(book);
 if (bookIndex !== -1) {
   cartItems.splice(bookIndex, 1); // Remove the book from the cartItems array
   displayCartItems(); // Display the updated cart items
 }
 }
 
 // Rest of your existing code...
 
 // Within the displayResults function:
 const addToCartButton = document.createElement('button');
 addToCartButton.textContent = 'Add to Cart';
 addToCartButton.classList.add('add-to-cart-button');
 addToCartButton.addEventListener('click', function() {
 addToCart(book);
 });
 bookDetails.appendChild(addToCartButton);

 
 
 // Within the displayCartItems function:
 const cartItemsContainer = document.getElementById('cart-items');
 cartItemsContainer.innerHTML = ''; // Clear previous cart items
 
 // Rest of your existing code...
 // Function to display the cart items
 function displayCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const countOutput = document.getElementById('cart-count');
  
  cartItemsContainer.innerHTML = ''; // Clear previous cart items
  
  if (cartItems.length === 0) {
    cartItemsContainer.textContent = 'Cart is empty.';
    countOutput.textContent = 0;
    return;
  }
  
  cartItems.forEach(book => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
  
    const bookDetails = document.createElement('div');
    bookDetails.classList.add('book-details');
  
    const bookTitle = document.createElement('p');
    bookTitle.textContent = book.title;
    bookDetails.appendChild(bookTitle);
  
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-button');
    removeButton.addEventListener('click', function() {
      removeFromCart(book);
      displayCartItems(); // Update the displayed cart items after removing
    });
    bookDetails.appendChild(removeButton);
  
    cartItem.appendChild(bookDetails);
    cartItemsContainer.appendChild(cartItem);
  });
  
  countOutput.textContent = cartItems.length;
}





