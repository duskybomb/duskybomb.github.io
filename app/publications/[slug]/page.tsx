import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getPublications } from 'app/publications/utils'
import { baseUrl } from 'app/sitemap'

export async function generateStaticParams() {
  let pubs = getPublications()

  return pubs.map((pub) => ({
    slug: pub.slug,
  }))
}

export function generateMetadata({ params }) {
  let pub = getPublications().find((p) => p.slug === params.slug)
  if (!pub) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = pub.metadata
  let ogImage = image
    ? image
    : `${baseUrl}/og`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/publications/${pub.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default function Publication({ params }) {
  let pub = getPublications().find((p) => p.slug === params.slug)

  if (!pub) {
    notFound()
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ScholarlyArticle',
            headline: pub.metadata.title,
            datePublished: pub.metadata.publishedAt,
            author: pub.metadata.authors,
            publisher: pub.metadata.venue,
            url: `${baseUrl}/publications/${pub.slug}`,
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {pub.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-2 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(pub.metadata.publishedAt)}
        </p>
      </div>
      <div className="flex justify-between items-center mt-2 mb-2 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {pub.metadata.authors} | {pub.metadata.venue}
        </p>
      </div>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
          <a href={pub.metadata.link} className="text-sm text-neutral-600 dark:text-neutral-400 bright hover:text-neutral-900 dark:hover:text-neutral-100">
            project page
          </a>
          {pub.metadata.code && (
            <a href={pub.metadata.code} className="text-sm text-neutral-600 dark:text-neutral-400 bright hover:text-neutral-900 dark:hover:text-neutral-100">
              code
            </a>
          )}
          {pub.metadata.arxiv && (
            <a href={pub.metadata.arxiv} className="text-sm text-neutral-600 dark:text-neutral-400 bright hover:text-neutral-900 dark:hover:text-neutral-100">
              arxiv
            </a>
          )}
          {pub.metadata.media && (
            <a href={pub.metadata.media} className="text-sm text-neutral-600 dark:text-neutral-400 bright hover:text-neutral-900 dark:hover:text-neutral-100">
              media
            </a>
          )}
        </div>
      </div>
      <article className="prose">
        <CustomMDX source={pub.content} />
      </article>
    </section>
  )
} 