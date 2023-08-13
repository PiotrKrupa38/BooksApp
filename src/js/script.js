

'use strict';

const templates = {
  bookLink: Handlebars.compile(document.querySelector('#template-book').innerHTML),
};

const select = {
  bookList: '.books-list',
  bookImage: '.book__image',
  filterBook: '.filters'
};


class BooksList {
  constructor() {
    const thisBooksList = this;
    thisBooksList.render();
    thisBooksList.determineRatingBgc();
    thisBooksList.initActions();
  }

  render() {
    const thisBooksList = this;
    for (let bookId in dataSource.books) {
      bookId = dataSource.books[bookId];
      const generatedHTML = templates.bookLink({
        id: bookId.id,
        name: bookId.name,
        price: bookId.price,
        image: bookId.image,
        rating: bookId.rating,
        ratingBgc: thisBooksList.determineRatingBgc(bookId.rating),
        ratingWidth: bookId.rating * 10,

      });
      console.log('generatedHTML:', generatedHTML);


      const listOfBook = document.querySelector(select.bookList);
      const creation = utils.createDOMFromHTML(generatedHTML);
      listOfBook.appendChild(creation);
    }
  }
 

  initActions() {
    const thisBooksList = this;
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
    console.log(filterOfBooks);
    filterOfBooks.addEventListener('click', function(callback) {
      const clickedElement = callback.target;
      thisBooksList.filters = [];
      console.log('clickedElement', clickedElement);

      if(
        clickedElement.tagName == 'INPUT' &&
        clickedElement.type == 'checkbox' &&
        clickedElement.name == 'filter'
      ) {
        if(clickedElement.checked) {thisBooksList.filters.push(clickedElement.value);
        } else {
          const indexOfValue = thisBooksList.filters.indexOf(clickedElement.value);
          thisBooksList.filters.splice(indexOfValue, 1);
        }
      }
      thisBooksList.filterBooks();
    });
  }


  filterBooks(){
    const thisBooksList = this;
    for(let book of dataSource.books) {
      let shouldBeHidden = false;
      const filterOfHiddenBooks = document.querySelector(select.bookImage + '[data-id = "' + book.id + '"]'); 
      for(const filter of thisBooksList.filters) {
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

  determineRatingBgc(rating){
    const thisBooksList = this;
    console.log(thisBooksList);
    let background = '';
  
    if (rating < 6) {
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
      background = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      background = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
    }
  
    return background;
  }
  
}

const app = new BooksList();
console.log(app);
