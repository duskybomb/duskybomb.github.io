import { getBlogPosts } from 'app/blog/utils'
import { getPublications } from 'app/publications/utils'

export const baseUrl = 'https://harshitjoshi.com'

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let publications = getPublications().map((pub) => ({
    url: `${baseUrl}/publications/${pub.slug}`,
    lastModified: pub.metadata.publishedAt,
  }))

  let routes = ['', '/blog', '/publications', '/news', '/fun'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs, ...publications]
}
