import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/blog/utils'

export function BlogPosts() {
  let allBlogs = getBlogPosts()

  return (
    <div>
      <h3 className="mb-4 text-xl font-semibold tracking-tighter">Blog Posts</h3>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <span className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <span className="text-neutral-600 w-[100px] tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </span>
              <span className="text-neutral-900 tracking-tight">
                {post.metadata.title}
              </span>
            </span>
          </Link>
        ))}
    </div>
  )
}
