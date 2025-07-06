export type NewsMetadata = {
  title: string
  publishedAt: string
  link?: string
  image?: string
}

export type NewsItem = {
  metadata: NewsMetadata
}

export const newsData: NewsItem[] = [
  {
    metadata: {
      title: 'Quoted in The Economist article "Can India be an AI winner?" discussing AI developments in India.',
      publishedAt: '2025-06-12',
      link: 'https://www.economist.com/asia/2025/06/12/can-india-be-an-ai-winner'
    }
  },
  {
    metadata: {
      title: 'Genie Worksheets is accepted to ACL 2025 (See you in Vienna!)',
      publishedAt: '2025-05-15',
    }
  },
  {
    metadata: {
      title: 'Gave a talk at The First Workshop of a Public AI Assistant to World Wide Knowledge (WWK) on Genie Worksheets.',
      publishedAt: '2025-02-14',
      link: 'https://www.youtube.com/watch?v=7YUihy6_vSY'
    }
  },
  {
    metadata: {
      title: 'Aligned with Prof. Monica Lam, excited to be working on conversational agents for the real world!',
      publishedAt: '2024-03-19',
    }
  },
  {
    metadata: {
      title: 'I am rotating with Prof. Diyi Yang for the winter quarter (W \'24) in the Social And Language Technologies (SALT) Lab!',
      publishedAt: '2024-01-06',
    }
  },
  {
    metadata: {
      title: 'One of my final works at Microsoft, FLAME: A small language model for spreadsheet formulas, got accepted as Oral presentation (top ~2%) to AAAI Conference on Artificial Intelligence 2024!',
      publishedAt: '2023-12-09',
    }
  },
  {
    metadata: {
      title: 'I am rotating with Prof. Monica Lam in the Fall Quarter (F \'23), working with Open Virtual Assistant Lab (OVAL).',
      publishedAt: '2023-09-21',
    }
  },
  {
    metadata: {
      title: 'I will be joining Stanford University 🌲 for PhD in Computer Science this fall (\'23) !!!!',
      publishedAt: '2023-05-10',
    }
  },
] 