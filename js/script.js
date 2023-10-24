const bookContainer = document.querySelector('.book-container-js');
const booksPerRow = 4;
let currentPage = 0;
const booksPerPage = booksPerRow * 2;
const footer = document.getElementById('footer');
const skeleton = document.querySelector(".book-row");
let isLoading = false;
const titleElement = document.querySelector('.title');
const authorElement = document.querySelector('.author');
const priceElement = document.querySelector('.price');
const descriptionElement = document.querySelector('.description');
const favButton = document.querySelector('.favorite');



const title = titleElement ? titleElement.textContent : 'No Title';
const author = authorElement ? authorElement.textContent : 'No Author';
const price = priceElement ? priceElement.textContent : 'No Price';
const description = descriptionElement ? descriptionElement.textContent : 'No Description';

favButton.addEventListener('click',   () => {
  handleFavoriteClick(title, author, price, description);  
});
favButton.addEventListener('mouseenter', () => {
  favButton.style.backgroundColor = '#937DC2';
  favButton.style.color = 'white';
});
favButton.addEventListener('mouseleave', () => {
  favButton.style.backgroundColor = 'initial';
  favButton.style.color = 'initial';

});

 function handleFavoriteClick(title, author, price, description) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const existingBookIndex = favorites.findIndex((book) => book.title === title);

  if (existingBookIndex === -1) {
    const favoriteBook = {
      title,
      author,
      price,
      description,
    };

    favorites.push(favoriteBook);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert('Book added to favorites!');
    // favImage.src = '../images/fav-full.svg'; 
  } else {
    favorites.splice(existingBookIndex, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert('Book removed from favorites!');
    // favImage.src = '../images/book-slider/fav.svg'; 
  }
}

function loadBooks() {
  if (isLoading) {
    return;
  }
  isLoading = true;

  fetch(`https://www.googleapis.com/books/v1/volumes?q=science+fiction&filter=paid-ebooks&startIndex=${currentPage * booksPerPage}&maxResults=${booksPerPage}&key=AIzaSyBNDq9xZF4lKEyKVm2PI0vgT9r0jlA2kXQ`)
    .then((response) => response.json())
    .then((data) => {
      const books = data.items;
      // skeleton.style.display = 'none';

      if (books && books.length > 0) {
        let currentRow;

        for (let i = 0; i < books.length; i++) {
          if (i % booksPerRow === 0) {
            // Create a new row for every group of four books
            currentRow = document.createElement('div');
            currentRow.classList.add('h-flex', 'collection');
            bookContainer.appendChild(currentRow);
          }

          const book = books[i];
          const title = book.volumeInfo.title || "No Title";
          const author = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : "No authors";
          const price = book.saleInfo && book.saleInfo.retailPrice ? `$${book.saleInfo.retailPrice.amount}` : "Price not available";
          const description = book.volumeInfo.description || "No Description Available";
          const imageUrl = book.volumeInfo.imageLinks.thumbnail || "../images/book-slider/prin-img.png";

          const bookInfo = document.createElement('div');
          bookInfo.classList.add('book-info', 'c-flex');

          const bookImg = document.createElement('img');
          bookImg.src = imageUrl;
          bookImg.classList.add('book-img');

          const infoDesc = document.createElement('div');
          infoDesc.classList.add('info-desc');

          const bookTitle = document.createElement('p');
          bookTitle.textContent = title;
          bookTitle.classList.add('book-title');

          const bookAuthor = document.createElement('p');
          bookAuthor.textContent = author;
          bookAuthor.classList.add('author');

          const priceFavContainer = document.createElement('div');
          priceFavContainer.classList.add('h-flex', 'price-fav');
          const bookPrice = document.createElement('p');

          bookPrice.textContent = price;
          bookPrice.classList.add('price');
          const favImage = document.createElement('img');      
          favImage.src = '../images/book-slider/fav.svg';
          favImage.classList.add('fav');

     
          favImage.addEventListener('click', () => {
            handleFavoriteClick(title, author, price, description);  
          });
          

          const cartButton = document.createElement('button');
          cartButton.classList.add('cart-button');

          const cartIcon = document.createElement('img');
          cartIcon.src = '../images/book-slider/cart.svg';
          cartIcon.classList.add('cart-icon');
          cartButton.textContent = 'Add to Cart';

          priceFavContainer.appendChild(bookPrice);
          priceFavContainer.appendChild(favImage); 
          infoDesc.appendChild(bookTitle);
          infoDesc.appendChild(bookAuthor);
          infoDesc.appendChild(priceFavContainer);
          infoDesc.appendChild(cartButton);
          cartButton.appendChild(cartIcon);
          bookInfo.appendChild(bookImg);
          bookInfo.appendChild(infoDesc);

          currentRow.appendChild(bookInfo);
        }
      }

      isLoading = false;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      isLoading = false;
    });

  currentPage++;
}

function onScroll(entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && !isLoading) {
      loadBooks();
    }
  });
}

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0,
};


const observer = new IntersectionObserver(onScroll, options);
observer.observe(footer);

loadBooks();

const backToTopButton = document.getElementById('backToTopBtn');


window.addEventListener('scroll', () => {
  if (window.scrollY >= 500) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
});


backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
