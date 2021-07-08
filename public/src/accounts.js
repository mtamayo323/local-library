function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => {
    const lastNameA = accountA.name.last;
    const lastNameB = accountB.name.last;
    return lastNameA < lastNameB ? -1 : 1;
  })
}

function getTotalNumberOfBorrows(account, books) {
  const {id} = account;
  let total = 0;
  for (let book in books) {
    const {borrows} = books[book];
    borrows.forEach((element) => {
      if (element.id ===id) {
        total++
      }
    })
  }
  return total;
}

function getBooksPossessedByAccount(account, books, authors) {

  const patronId = account.id; 
  const patronCheckedOutBooks = []; 

  books.forEach((book) => {
    const borrows = book.borrows;

    const isCheckedOutByPatron = borrows.some((borrow) => borrow.id === patronId && !borrow.returned);
    if (!isCheckedOutByPatron) {
      return;
    }

    book.author = authors.find((author) => author.id === book.authorId);
    patronCheckedOutBooks.push(book);
  });

  return patronCheckedOutBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
