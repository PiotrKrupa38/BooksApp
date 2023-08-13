
{
  'use strict';

  const templates = {
    bookLink: Handlebars.compile(document.querySelector('#template-book').innerHTML),
  };

  const select = {
    bookList: '.books-list',
    bookImage: '.book__image',
    filterBook: '.filter'
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
    //const allImages = document.querySelectorAll(select.bookImage);
    const listOfBook = document.querySelector(select.bookList);

    //for(let image of allImages) {
    listOfBook.addEventListener('dblclick', function(event){
      event.preventDefault();
      if (event.target.offsetParent.classList.contains('book__image')) {
        const link = event.target.offsetParent;
        const bookId = link.getAttribute('data-id');

        if(favoriteBooks.includes(bookId)) {
          const indexOfBook = favoriteBooks.indexOf(bookId);
          link.classList.remove('favorite');
          favoriteBooks.splice(indexOfBook, 1);
        } else {
          link.classList.add('favorite');
          favoriteBooks.push(bookId);
        }
      }
    });

    
    const filterOfBooks = document.querySelector(select.filterBook);
    filterOfBooks.addEventListener('click', function(callback) {
      const clickedElement = callback.target;
      console.log('clickedElement', clickedElement);

      if(
        clickedElement.tagName == 'INPUT' &&
        clickedElement.type == 'checkbox' &&
        clickedElement.name == 'filter'
      ) {
        if(clickedElement.checked) {filters.push(clickedElement.value);
        } else {
          const indexOfValue = filters.indexOf(clickedElement.value);
          filters.splice(indexOfValue, 1);
        }
      }
      filterBooks();
    });
  }

  const filters = [];

  function filterBooks(){
    for(let book of dataSource.books) {
      let shouldBeHidden = false;
      const filterOfHiddenBooks = document.querySelector(select.bookImage + '[data-id = "' + book.id + '"]'); 
      for(const filter of filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      if (shouldBeHidden == true) {
        filterOfHiddenBooks.classList.add('hidden');
      } else {
        filterOfHiddenBooks.classList.remove('hidden');
      }
    }
  }

  


  render();
  initActions();
}