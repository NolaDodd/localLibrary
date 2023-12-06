function getTotalBooksCount(books) {  
  let result = books.reduce((total, book) => total + 1, 0)
  return result
}

function getTotalAccountsCount(accounts) {
  let result = accounts.reduce((total, account) => total + 1, 0)
  return result
}

// Search the books.borrows.returned. 
// If it says false, then add +1 to counter to represent it's checked out. 
function getBooksBorrowedCount(books) {
  let total = 0
  let booksBorrowed = books.forEach(check => {
  check.borrows[0].returned ? total += 0 : total += 1
  } )
  return total
}

//Sort books by their borrow length (aka. the most popular books.) 
//Then map the books into the proper format and slice to only take the top 5 books. 

function getMostPopularBooks(books) {
  books.sort((bookA, bookB) => bookB.borrows.length - bookA.borrows.length);

  const mostPopular = books.map(book => ({ name: book.title, count: book.borrows.length }));

  return mostPopular.slice(0, 5);
}
   
//Count up each Genre into an Object. Then push the objects individually into the array with the correct format. 
//Then sort by count number, then slice to return the top five.

function getMostCommonGenres(books) {
  const genreArray = []
  const genreCounts = {};

  books.forEach((book) => {
    const genre = book.genre;
    if (genreCounts[genre]){
      genreCounts[genre] += 1;
    } else {
      if (!genreCounts[genre]){
        genreCounts[genre] = 1
      }
    }
  })
  
  for (let genre in genreCounts){
    genreArray.push({name: genre, count: genreCounts[genre]})
    } 
  
  genreArray.sort((genreA, genreB) => genreB.count - genreA.count)   
 
  return genreArray.slice(0, 5);
}

// First loop through both the books and authors arrays. 
//Then if the books authorId  and the author's id matches, add that current book's borrow length to the author's name in the authorObject. 
//Then take the authorObject keys and number counts and remap  the name and count in the correct format, and push into an array. 
//Then sort by count and slice to keep the top 5. 

function getMostPopularAuthors(books, authors) {
const authorArray = []
const authorObject = {}

for (let i=0; i < books.length; i++){
  let bookauthorId = books[i].authorId
  
  for (let j=0; j < authors.length; j++){
   let authorId = authors[j].id
    const authorname = `${authors[j].name.first} ${authors[j].name.last}`

    if (bookauthorId === authorId){
              
        if (authorObject[authorname]){
          authorObject[authorname] += books[i].borrows.length
        } else {
          authorObject[authorname] = books[i].borrows.length
        }  
      }  
    } 
  }
  
  Object.keys(authorObject).map(key => {
    authorArray.push({name: key, count: authorObject[key]});
})

  authorArray.sort((authorA, authorB) => authorB.count - authorA.count)
    
return authorArray.slice(0, 5)  
} 
  
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
