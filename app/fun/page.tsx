import booksData from '../../data/books.json'
import activitiesData from '../../data/activities.json'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const VisitedWorldMap = dynamic(() => import('../components/VisitedWorldMap'), { ssr: false });

export const metadata = {
  title: 'Fun',
  description: 'Books I\'ve read, places I\'ve traveled, and other fun stuff I do.',
}

export default function Page() {
  // Get 3 random books from the collection
  const getSelectedBooks = (books: any[], count: number) => {
    return books.filter(book => book.selected === true).slice(0, count);
  };
  
  const selectedBooks = getSelectedBooks(booksData.books, 3);
  
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Fun Stuff</h1>
      
      {/* Quick Navigation */}
      <div className="mb-8 flex flex-wrap gap-4 text-sm">
        <Link href="/fun/books" className="text-neutral-600 dark:text-neutral-400 bright hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
          📚 Books
        </Link>
        <a href="#travel" className="text-neutral-600 dark:text-neutral-400 bright hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
          ✈️ Travel
        </a>
        <a href="#activities" className="text-neutral-600 dark:text-neutral-400 bright hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
          🎯 Activities
        </a>
      </div>

      {/* Books Section */}
      <div id="books" className="mb-12">
        <h2 className="text-xl font-medium tracking-tight mt-6 mb-6">📚 Books I've Read</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          Here are some books that have influenced my thinking or that I've enjoyed recently.
        </p>
        
        <div className="space-y-6">
          {selectedBooks.map((book) => (
            <div key={book.id} className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-neutral-900 dark:text-neutral-100">{book.title}</h3>
                    <div className="flex text-yellow-500">
                      {'★'.repeat(book.rating)}{'☆'.repeat(5 - book.rating)}
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">by {book.author}</p>
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
        
        <div className="mt-6 text-center">
          <Link 
            href="/fun/books"
            className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors text-sm border border-neutral-200 dark:border-neutral-700 px-4 py-2 rounded-lg hover:shadow-md"
          >
            📚 View All {booksData.books.length} Books
          </Link>
        </div>
      </div>

      {/* Travel Section */}
      <div id="travel" className="mb-12">
        <h2 className="text-xl font-medium tracking-tight mt-6 mb-6">✈️ Places I've Been</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          Hover over the map to see visited countries and latest visit date.
        </p>
        <VisitedWorldMap />
      </div>

      {/* Other Fun Activities Section */}
      <div id="activities" className="mb-12">
        <h2 className="text-xl font-medium tracking-tight mt-6 mb-6">🎯 Other Fun Activities</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          Hobbies, interests, and random fun stuff I'm into.
        </p>
        
        <div className="space-y-6">
          {/* Hobbies */}
          <div>
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-3">Current Interests</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {activitiesData.currentInterests.map((interest) => (
                <div key={interest.id} className="text-center p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                  <div className="text-2xl mb-2">{interest.icon}</div>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">{interest.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Fun Facts */}
          <div>
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-3">Fun Facts</h3>
            <div className="space-y-2">
              {activitiesData.funFacts.map((fact, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-neutral-600 dark:text-neutral-400 mt-1">•</span>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">{fact}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Current Obsessions */}
          <div>
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-3">Current Obsessions</h3>
            <div className="space-y-3">
              {activitiesData.currentObsessions.map((obsession) => (
                <div key={obsession.id} className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-3">
                  <h4 className="font-medium text-sm text-neutral-900 dark:text-neutral-100 mb-1">{obsession.topic}</h4>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">
                    {obsession.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="text-center text-sm text-neutral-500 dark:text-neutral-500 border-t border-neutral-200 dark:border-neutral-700 pt-6">
        This page is always evolving - I'll keep updating it with new books, travels, and adventures! 📝
      </div>
    </section>
  )
}
