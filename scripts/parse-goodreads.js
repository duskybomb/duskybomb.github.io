const fs = require('fs');
const path = require('path');

// Read the CSV file
const csvPath = path.join(__dirname, '../data/goodreads_library_export.csv');
const csvContent = fs.readFileSync(csvPath, 'utf8');

// Parse CSV (simple parser for this specific format)
const lines = csvContent.split('\n');
const headers = lines[0].split(',');

// Find column indices
const titleIndex = headers.findIndex(h => h === 'Title');
const authorIndex = headers.findIndex(h => h === 'Author');
const myRatingIndex = headers.findIndex(h => h === 'My Rating');
const dateReadIndex = headers.findIndex(h => h === 'Date Read');
const exclusiveShelfIndex = headers.findIndex(h => h === 'Exclusive Shelf');
const myReviewIndex = headers.findIndex(h => h === 'My Review');
const pagesIndex = headers.findIndex(h => h === 'Number of Pages');
const yearIndex = headers.findIndex(h => h === 'Year Published');

const books = [];
let id = 1;

// Process each line
for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  
  // Parse CSV line (handling quoted fields)
  const fields = [];
  let currentField = '';
  let inQuotes = false;
  
  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    
    if (char === '"' && (j === 0 || line[j-1] === ',')) {
      inQuotes = true;
    } else if (char === '"' && inQuotes && (j === line.length - 1 || line[j+1] === ',')) {
      inQuotes = false;
    } else if (char === ',' && !inQuotes) {
      fields.push(currentField);
      currentField = '';
    } else {
      currentField += char;
    }
  }
  fields.push(currentField); // Add the last field
  
  const title = fields[titleIndex]?.replace(/"/g, '');
  const author = fields[authorIndex]?.replace(/"/g, '');
  const myRating = parseInt(fields[myRatingIndex]) || 0;
  const dateRead = fields[dateReadIndex]?.replace(/"/g, '');
  const exclusiveShelf = fields[exclusiveShelfIndex]?.replace(/"/g, '');
  const myReview = fields[myReviewIndex]?.replace(/"/g, '');
  
  // Only include books that are read and have a rating > 0
  if (exclusiveShelf === 'read' && myRating > 0 && title && author) {
    // Format date
    let formattedDate = '';
    if (dateRead) {
      const date = new Date(dateRead);
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                     'July', 'August', 'September', 'October', 'November', 'December'];
      formattedDate = `${months[date.getMonth()]} ${date.getFullYear()}`;
    }
    
    // Generate a simple review if none exists
    let review = myReview || '';
    if (!review) {
      if (myRating === 5) {
        review = 'Absolutely loved this book! A must-read that left a lasting impression.';
      } else if (myRating === 4) {
        review = 'Really enjoyed this one. Well written and engaging throughout.';
      } else if (myRating === 3) {
        review = 'A solid read with some interesting ideas and good moments.';
      } else if (myRating === 2) {
        review = 'Had some good parts but overall didn\'t quite work for me.';
      } else {
        review = 'Not my cup of tea, but might appeal to others.';
      }
    }
    
    books.push({
      id: id++,
      title,
      author,
      rating: myRating,
      review,
      dateRead: formattedDate || `${new Date().getFullYear()}`,
      coverUrl: null
    });
  }
}

// Sort by rating (highest first), then by date read (most recent first)
books.sort((a, b) => {
  if (b.rating !== a.rating) {
    return b.rating - a.rating;
  }
  // If ratings are equal, sort by date (this is a simple string sort)
  return b.dateRead.localeCompare(a.dateRead);
});

// Create the JSON structure
const booksJson = {
  books: books
};

// Write to books.json
const outputPath = path.join(__dirname, '../data/books.json');
fs.writeFileSync(outputPath, JSON.stringify(booksJson, null, 2));

console.log(`Successfully parsed ${books.length} books from Goodreads export!`);
console.log('Books have been sorted by rating (highest first), then by date read.');
console.log('Generated books.json with your reading history.'); 