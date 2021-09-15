function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let notReturned = books.filter((book) => book.borrows[0].returned === false);
  return notReturned.length;
}

function getMostCommonGenres(books) {
  let genres = [];
  for (let i = 0; i < books.length; i++) {
    const genreExist = genres.some((genre) => genre.name === books[i].genre);
    if (genreExist) {
     const genreObj = genres.find((genre) => genre.name === books[i].genre); 
      genreObj.count += 1;
    } else {
      genres.push({name: books[i].genre, count:1})
    }
  }
  genres.sort((genreA, genreB) => (genreA.count < genreB.count ? 1 : -1));
  return getTopFive(genres);
}

function getMostPopularBooks(books) {
  let popularBooks = [];
  for (let i = 0; i < books.length; i++) {
    const bookie = books[i];
    const titleExist = popularBooks.some((book) => popularBooks.name === bookie.title);
    if (titleExist) {
      for (let y = 0; y < bookie.borrows.length; y++) {
        const borrowNum = books[i].borrows[y];
        const bookObj = popularBooks.find((book) => popularBooks.name === bookie.title)
        const borrowCount = bookObj.filter((book) => bookObj.borrows)
        bookObj.count = borrowCount.length;
      } 
    } else {
       popularBooks.push({name: bookie.title, count: bookie.borrows.length}); 
      }
   }
  popularBooks.sort((bookA, bookB) => bookA.count < bookB.count ? 1 : -1);
  return getTopFive(popularBooks);
}

function getMostPopularAuthors(books, authors) {
  const bookArr = authors.map((author) => {
    const name = author.name;
    const firstName = name.first;
    const lastName = name.last;
    return {
      name: `${firstName} ${lastName}`,
      count: books.filter((book) => {
        return book.authorId === author.id
      }).reduce((acc, curr) => {
        return acc += curr.borrows.length;
      }, 0)
    };
  });
  bookArr.sort((bookA, bookB) => bookA.count < bookB.count ? 1 : -1);
  return getTopFive(bookArr);
}
// this is my helper function // 
function getTopFive(arr) {
  return arr.slice(0, 5);
};

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
