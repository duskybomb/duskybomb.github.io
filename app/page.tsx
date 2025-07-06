import { BlogPosts } from 'app/components/posts'
import { ExpandableText } from 'app/components/ExpandableText'
import { News } from 'app/components/news'
import { Publications } from 'app/components/publications'
import Image from 'next/image'

export default function Page() {
  return (
    <section>
      {/* Header section with profile picture and intro */}
      <div className="mb-8 flex flex-col md:flex-row md:items-start md:gap-8">
        {/* Profile Picture */}
        <div className="mb-6 md:mb-0 flex justify-center md:justify-start">
          <div className="relative">
            <Image
              src="/harshit.jpg"
              alt="Harshit Joshi"
              width={150}
              height={150}
              className="rounded-full border-2 border-neutral-200 dark:border-neutral-700 shadow-lg"
              priority
            />
          </div>
        </div>
        
        {/* Name and Bio Content */}
        <div className="flex-1">
          <h1 className="mb-6 text-2xl font-semibold tracking-tighter text-center md:text-left">
            Harshit Joshi (हर्षित जोशी)
          </h1>
          <p className="mb-4">
            I'm a second-year CS PhD student at Stanford University with the StanfordNLP group and <a href="https://oval.cs.stanford.edu/" className='bright'>OVAL</a> lab, advised by <a href="https://suif.stanford.edu/~lam/" className="people">Prof. Monica Lam</a>.
            I'm currently interested in creating useful systems that assist users to leverage capabilities of Large Language Models for gathering and creating knowledge.
          </p>

          <p className="mb-4">
            Previously, I was a Research Fellow at Microsoft Research with the <a href="https://www.microsoft.com/en-us/research/group/prose/" className="bright">PROSE</a> group, where I worked on Program Repair and Formula Intelligence in Excel spreadsheets, advised by <a href="https://www.josecambronero.com/" className="people">Dr. José Cambronero</a> and <a href="https://www.vuminhle.com/" className="people">Dr. Vu Le</a>.
          </p>
          <ExpandableText
            moreLabel={<span className="bright">More History ↓</span>}
            lessLabel={<span className="bright">&nbsp;Less History ↑</span>}
          >
            <>
              I have been a Research Software Engineer at{' '}
              <a href="https://www.supedio.com/" className="bright">
                Supedio GmbH
              </a>{' '}
              working on Master Data Management, Medical Entity Resolution and Text Extraction from PDFs. I have interned with the research team at DRDO, Govt. of India, where I worked on an Image Segmentation task in a simulated Gazebo environment. I spent a summer at Chennai Mathematical Institute as a Mathematical Finance Summer Scholar, working on sliding-window approaches for finding abnormal rate of returns. In the summer of 2018, I was a student developer with Google Summer of Code.
            </>
          </ExpandableText>
          <p className="mb-4">
            If you're an undergrad/master's student at Stanford interested in research, please reach out! I'm more than happy to chat about opportunities here! (email address at the bottom of the page)
          </p>
        </div>
      </div>

      {/* Rest of the content */}
      <div className="my-8">
        <News />
        <Publications />
        <BlogPosts />
        <div className="mt-8">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Email: <a className="bright">harshitj at stanford dot edu</a>
          </p>
        </div>
      </div>
    </section>
  )
}
