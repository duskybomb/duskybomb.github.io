import booksData from '../../../data/books.json'
import Link from 'next/link'

export const metadata = {
  title: 'My Book Collection',
  description: 'All the books I\'ve read and enjoyed.',
}

export default function BooksPage() {
  return (
    <section>
      <div className="mb-8">
        <Link 
          href="/fun"
          className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors text-sm"
        >
          ← Back to Fun Stuff
        </Link>
      </div>
      
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">📚 My Book Collection</h1>
      
      <p className="text-neutral-600 dark:text-neutral-400 mb-8">
        Here's my complete reading list with {booksData.books.length} books I've read and rated. 
        They're organized by rating, with my favorites at the top.
      </p>
      
      <div className="space-y-6">
        {booksData.books.map((book) => (
          <div key={book.id} className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-shrink-0">
                {book.coverUrl ? (
                  <img 
                    src={book.coverUrl} 
                    alt={`${book.title} cover`}
                    className="w-16 h-24 object-cover rounded"
                  />
                ) : (
                  <div className="w-16 h-24 bg-neutral-200 dark:bg-neutral-700 rounded flex items-center justify-center text-neutral-500 dark:text-neutral-400 text-xs">
                    Book Cover
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">{book.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">by {book.author}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">Rating:</span>
                  <div className="flex text-yellow-500">
                    {'★'.repeat(book.rating)}{'☆'.repeat(5 - book.rating)}
                  </div>
                </div>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-2">
                  {book.review}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-500">
                  Read: {book.dateRead}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center text-sm text-neutral-500 dark:text-neutral-500 border-t border-neutral-200 dark:border-neutral-700 pt-6">
        <p>Want to recommend a book? I'm always looking for my next great read! 📖</p>
        <Link 
          href="/fun"
          className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
        >
          ← Back to Fun Stuff
        </Link>
      </div>
    </section>
  )
} 