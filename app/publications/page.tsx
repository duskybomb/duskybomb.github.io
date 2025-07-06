import { Publications } from 'app/components/publications'

export const metadata = {
  title: 'Publications',
  description: 'My academic publications.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Publications</h1>
      <Publications showAll={true} />
    </section>
  )
} 