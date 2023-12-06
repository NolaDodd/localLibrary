function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id)
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((nameA, nameB) => (nameA.name.last > nameB.name.last ? 1:-1))
}

// Search through each book object, then inside the borrows for each book. 
//If the borrows id matches the accounts id, then add to total counter. 
function getTotalNumberOfBorrows(accounts, books) {
 let total = 0;
  books.forEach(book => {
   book.borrows.forEach(borrow => {
     if (borrow.id === accounts.id) {
        total += 1; 
     }
    });
  });
  return total;
}

//Loop through the array of all book objects. Check if a book is currently checked out by the given account. 
//For each book checked out by that account, find the corresponding author from the array of all author objects. 
//Nest the author object inside the book object. Add the modified book object to the array that will be returned.

function getBooksPossessedByAccount(account, books, authors) {
  const borrowedBooks = [];
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const borrowRecord = book.borrows.find(borrow => borrow.id === account.id && !borrow.returned); 
    if (borrowRecord) {
      const author = authors.find(author => author.id === book.authorId);
      const newObject = {
        ...book,
        author
      };
      borrowedBooks.push(newObject);
    }
  }
  return borrowedBooks;
}
  
module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
