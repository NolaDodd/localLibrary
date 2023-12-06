function findAuthorById(authors, id) {
  return authors.find((search) => search.id === id)
}

function findBookById(books, id) {
  return books.find((search) => search.id === id)
}

// returns an array with two more arrays inside, the first with all checked out books, and the second with all returned books. 
//I found all checked out books first and pushed them into array, then found all the returned books and pushed them in after.
function partitionBooksByBorrowedStatus(books) {
  const sortedBooks = [];
  
  let checkedOut = books.filter((book) => !book.borrows[0].returned);
sortedBooks.push(checkedOut)
  
    let returnedBook = books.filter((book)=> book.borrows[0].returned)
sortedBooks.push(returnedBook)
  return sortedBooks
}

// Search through accounts for objects that match the book borrow id with a helper function. 
//Then push matches into array. Limit to 10 objects.

function findAccountByIdHelper(accounts, id) {
  return accounts.find(account => account.id === id);
}

function getBorrowersForBook(book, accounts) {
  let borrowers = [];
  for (let i = 0; i < book.borrows.length; i++) {
    let account = findAccountByIdHelper(accounts, book.borrows[i].id);
    
    if (account) {
      borrowers.push({...account, returned: book.borrows[i].returned});    
    }  
  }
  return borrowers.slice(0, 10);
}                 

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
