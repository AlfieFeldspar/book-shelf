// let books = [
//   {
//     title: 'Harry Potter',
//     author: 'J.K. Rowling',
//     imageURL:
//       'https://books.google.com/books/content?id=WV8pZj_oNBwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
//     isbn: '9781921479311',
//     pageCount: 268,
//   },
// ];

// const Handlebars = require('handlebars'); //do not need if handlebars cdn is in html

let renderBooks = function () {
  console.log('rendering!');

  $('.books').empty();
  let source = $('#book-template').html();

  console.log(source);

  const template = Handlebars.compile(source);

  for (let i = 0; i < books.length; i++) {
    // create HTML and append to .books
    let newHTML = template(books[i]);
    $('.books').append(newHTML);
  }
};

var addBooks = function (data) {
  books = [];

  for (var i = 0; i < data.items.length; i++) {
    var bookData = data.items[i];
    
    var book = {
      title: bookData.volumeInfo.title || null,
      author: bookData.volumeInfo.authors ? bookData.volumeInfo.authors[0] : null,
      imageURL: bookData.volumeInfo.imageLinks ? bookData.volumeInfo.imageLinks.thumbnail : null,
      pageCount: bookData.volumeInfo.pageCount || null,
      isbn: bookData.volumeInfo.industryIdentifiers ?
      bookData.volumeInfo.industryIdentifiers[0].identifier : null,
    };

    books.push(book);
  }
  renderBooks();
};

$('.search').on('click', function () {
  var userSearch = $('#search-query').val();
  // console.log("usersearch val: " + userSearch);
  fetch(userSearch);
});

var fetch = function (query) {
  $.ajax({
    method: "GET",
    url: "https://www.googleapis.com/books/v1/volumes?q=" + query,
    dataType: "json",
    success: function(data) {
      addBooks(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
};




