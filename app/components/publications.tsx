import Link from 'next/link'
import { formatDate, getPublications, getYear } from 'app/publications/utils'
import { ArrowIcon } from 'app/components/footer'

export function Publications({ showAll = false }: { showAll?: boolean }) {
  let allPubs = getPublications()

  return (
    <div>
      {!showAll && <h3 className="mb-4 text-xl font-semibold tracking-tighter">Publications</h3>}
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
          <div
            key={pub.slug}
            className="flex flex-col space-y-1 mb-4"
          >
            <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
              <p className="text-neutral-600 flex-none w-14 pr-2 tabular-nums">
                {getYear(pub.metadata.publishedAt)}
              </p>
              <div>
                <Link href={`/publications/${pub.slug}`} className="text-neutral-900 tracking-tight hover:underline">
                  {pub.metadata.title}
                </Link>
                <p className="text-neutral-600 text-sm">
                  {pub.metadata.authors} • {pub.metadata.venue}
                </p>
                <p className="flex text-neutral-600 text-sm space-x-2">
                    {pub.metadata.link && <a href={pub.metadata.link} className="text-neutral-600 text-sm bright hover:text-neutral-900" target="_blank" rel="noopener noreferrer">
                        project page
                    </a>}
                    {pub.metadata.code && <a href={pub.metadata.code} className="text-neutral-600 text-sm bright hover:text-neutral-900" target="_blank" rel="noopener noreferrer">
                        code
                    </a>}
                    {pub.metadata.arxiv && <a href={pub.metadata.arxiv} className="text-neutral-600 text-sm bright hover:text-neutral-900" target="_blank" rel="noopener noreferrer">
                        arxiv
                    </a>}
                    {pub.metadata.media && <a href={pub.metadata.media} className="text-neutral-600 text-sm bright hover:text-neutral-900" target="_blank" rel="noopener noreferrer">
                        media
                    </a>}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
