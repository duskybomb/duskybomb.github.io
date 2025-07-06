import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Harshit Joshi',
    template: '%s | Harshit Joshi',
  },
  description: 'Stanford CS PhD Candidate working on LLMs and knowledge systems',
  openGraph: {
    title: 'Harshit Joshi',
    description: 'Stanford CS PhD Candidate working on LLMs and knowledge systems',
    url: baseUrl,
    siteName: 'Harshit Joshi',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://harshitjoshi.com/public/harshit.jpg',
        width: 800,
        height: 600,
        alt: 'Harshit Joshi',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-black',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
      <GoogleAnalytics gaId="G-JHJ6H2DLJS" />
    </html>
  )
}
