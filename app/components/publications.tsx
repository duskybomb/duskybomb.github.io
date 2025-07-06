import Link from 'next/link'
import { formatDate, getPublications, getYear } from 'app/publications/utils'
import { ArrowIcon } from 'app/components/footer'

export function Publications({ showAll = false }: { showAll?: boolean }) {
  let allPubs = getPublications()

  return (
    <div>
      <h3 className="mb-4 text-xl font-semibold tracking-tighter">Publications</h3>
      {allPubs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1
          }
          return 1
        })
        .filter((pub) => showAll || pub.metadata.selected === "True")
        .map((pub) => (
          <Link
            key={pub.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/publications/${pub.slug}`}
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-600 dark:text-neutral-400 flex-none w-14 pr-2 tabular-nums">
                {getYear(pub.metadata.publishedAt)}
              </p>
              <div>
                <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                  {pub.metadata.title}
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  {pub.metadata.authors} • {pub.metadata.venue}
                </p>
                <p className="flex text-neutral-600 dark:text-neutral-400 text-sm space-x-2">
                    {pub.metadata.link && <a href={pub.metadata.link} className="text-neutral-600 dark:text-neutral-400 text-sm bright">
                        project page
                    </a>}
                    {pub.metadata.code && <a href={pub.metadata.code} className="text-neutral-600 dark:text-neutral-400 text-sm bright">
                        code
                    </a>}
                    {pub.metadata.arxiv && <a href={pub.metadata.arxiv} className="text-neutral-600 dark:text-neutral-400 text-sm bright">
                        arxiv
                    </a>}
                    {pub.metadata.media && <a href={pub.metadata.media} className="text-neutral-600 dark:text-neutral-400 text-sm bright">
                        media
                    </a>}
                </p>
              </div>
            </div>
          </Link>
        ))}
    </div>
  )
}
