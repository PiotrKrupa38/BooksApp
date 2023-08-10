
{
  'use strict';

  const templates = {
    bookLink: Handlebars.compile(document.querySelector('#template-book').innerHTML),
  };

  const select = {
    bookList: '.books-list',
    bookImage: '.book_image'
  };

  function render() {

    for (let bookId in dataSource.books) {
      bookId = dataSource.books[bookId];
      const generatedHTML = templates.bookLink({
        id: bookId.id,
        name: bookId.name,
        price: bookId.price,
        image: bookId.image,
        rating: bookId.rating,

      });
      console.log('generatedHTML:', generatedHTML);


      const listOfBook = document.querySelector(select.bookList);
      const creation = utils.createDOMFromHTML(generatedHTML);
      listOfBook.appendChild(creation);
    }
  }
 

  function initActions() {

    const favoriteBooks = [];
    const allImages = document.querySelectorAll(select.bookImage);

    for(let image of allImages) {
      image.addEventListener('dblclick', function(event){
        event.preventDefault();
        image.classList.add('.favorite');

        const bookId = image.getAttribute('data-id');

        favoriteBooks.push(bookId);
      });
    }
  }

  render();
  initActions();
}