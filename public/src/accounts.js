function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => accountA.name.last > accountB.name.last ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
  let counter = 0 
  for(let i = 0; i < books.length; i++) {
    for(let y = 0; y < books[i].borrows.length; y++) {
      if(books[i].borrows[y].id == account.id) {
        counter++
      }
    }
  }
  return counter; 
}

function getBooksPossessedByAccount(account, books, authors) {
  let booksCheckedOut = books.filter((book) => book.borrows[0].id === account.id);
  let foundAuthor = authors.find((author) => author.id === booksCheckedOut[0].authorId);
  booksCheckedOut = [
    {id: booksCheckedOut[0].id,
    title: booksCheckedOut[0].title,
    authorId: booksCheckedOut[0].authorId,
    author: foundAuthor,
    borrows: booksCheckedOut[0].borrows}
  ];
  return booksCheckedOut;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
