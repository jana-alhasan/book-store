import {handleFavoriteClick} from '../js/script.js'

 


function displayFavorites() {
  let favorites = localStorage.getItem('favorites');
  const favoritesContainer = document.getElementById('favorites-container');

  if (favorites && favoritesContainer) {
    favorites = JSON.parse(favorites);
    favoritesContainer.innerHTML = '';
    for (const favorite of favorites) {
      const favoriteBookDiv = document.createElement('div');
      favoriteBookDiv.innerHTML = `
        <h2>${favorite.title}</h2>
        <p>${favorite.author}</p>
        <p>${favorite.price}</p>
        <p>${favorite.description}</p>
      `;
      favoritesContainer.appendChild(favoriteBookDiv);
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  displayFavorites();
});

const favButton = document.querySelector('.favorite');
document.addEventListener('DOMContentLoaded', function () {
if (favButton) {
  favButton.addEventListener('click',  handleFavoriteClick(title, author, price, description));


}
});


