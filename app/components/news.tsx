
import { formatDate, getNews } from 'app/news/utils'

export function News() {
  let allNews = getNews()

  return (
    <div>
      <h3 className="mb-4 text-xl font-semibold tracking-tighter">News</h3>
      {allNews
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .slice(0, 5)
        .map((post, index) => (
          <div
            key={index}
            className="flex flex-col space-y-1 mb-4"
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 flex-none w-28 pr-2 tabular-nums">
                {formatDate(post.metadata.publishedAt, true)}
              </p>
              <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                {post.metadata.title} {post.metadata.link && <a href={post.metadata.link} className="text-neutral-600 dark:text-neutral-400 text-sm bright"> Link</a>}
                {post.metadata.video && <a href={post.metadata.video} className="text-neutral-600 dark:text-neutral-400 text-sm bright"> Video</a>}
                {post.metadata.image && <a href={post.metadata.image} className="text-neutral-600 dark:text-neutral-400 text-sm bright"> Image</a>}
              </p>
            </div>
          </div>
        ))}
    </div>
  )
}
