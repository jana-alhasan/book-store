const ResultSpace = document.querySelector('.book-container-js');
const myResult=document.querySelector(".collection-title");
const hiddenDiv=document.querySelector(".Book-view");
const hiddenDivS=document.querySelector(".choices");
const skeleton = document.querySelector('.book-skeleton');
const booksPerRow = 4;
const booksPerPage = booksPerRow * 2;


let currentSearchQuery = '';

function loadBooks(query) {
  skeleton.style.display = 'flex';
  ResultSpace.innerHTML = '';
  hiddenDiv.style.display = 'none';
  hiddenDivS.style.display = 'none';
  myResult.innerHTML= "Search Results"

  fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&filter=paid-ebooks&maxResults=${booksPerPage}&key=AIzaSyBNDq9xZF4lKEyKVm2PI0vgT9r0jlA2kXQ`)
    .then((response) => response.json())
    .then((data) => {
      skeleton.style.display = 'none';
      const books = data.items;
      let lengthof;
      books.length <= 4 ? (lengthof = books.length) : (lengthof = 4);
      if (books && books.length > 0) {
        for (let i = 0; i < lengthof; i++) {
          if (i % booksPerRow === 0) {
            // Create a new row for every group of four books
            const currentRow = document.createElement('div');
            currentRow.classList.add('h-flex' , 'collection');
            ResultSpace.appendChild(currentRow);
          }

          const book = books[i];
          const title = book.volumeInfo.title || "No Title";
          const author = book.volumeInfo.authors ? book.volumeInfo.authors: "No authors";
          const price = book.saleInfo && book.saleInfo.retailPrice ? `$${book.saleInfo.retailPrice.amount}` : "Price not available";
          const description = book.volumeInfo.description || "No Description Available";
          const imageUrl = book.volumeInfo.imageLinks.thumbnail || "../images/book-slider/prin-img.png";

          const bookInfo = document.createElement('div');
          bookInfo.classList.add('book-info', 'c-flex');
          bookInfo.innerHTML = `
            <img src="${imageUrl}" class="book-img">
            <div class="info-desc">
            <p class="book-title">${title}</p>
            <p class="author">${author}</p>
            <div class="h-flex price-fav">
              <p class="price">${price}</p>
              <img src="../images/book-slider/fav.svg" class="fav">
            </div>
            <button class="cart-button">
            <img src="../images/book-slider/cart.svg" class="cart-icon" >
            Add to Cart</button>
          
            </div>
          `;

          const currentRow = ResultSpace.lastChild;
          currentRow.appendChild(bookInfo);
        }
      }   else {
        console.log('no result')
      }


      isLoading = false;
     
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function handleSearchInput() {
  const searchInput = document.querySelector('.search-bar');
  const query = searchInput.value.trim();
  loadBooks(query);

 
}


document.querySelector('.search-bar').addEventListener('input', handleSearchInput);


