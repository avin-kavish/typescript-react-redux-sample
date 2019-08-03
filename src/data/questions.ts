export interface Question {
  id: number,
  question: string,
  category: string,
  questionGroup: string[],
  license: string[],
  state: string,
  status: string,
  display: string
}

export const questions: Question[] = [
  ...Array(15).fill({
    id: 57515,
    question: 'Do you keep all surveillance recordings for at least 90 calendar days?',
    category: 'Company Policy',
    questionGroup: [
      'A name of the question group',
      'Another name of a question group'
    ],
    license: [
      'A: Type  01 = Cultivation; Specialty Outdoor',
      'A: Type  01A = Cultivation; Specialty Indoor',
      'A: Type  01C = Cultivation; Specialty Cottage'
    ],
    state: 'CA',
    status: 'Active',
    display: 'Draft',
  }).map((q: Question, i) => ({...q, id: q.id + i, display: Math.random() < 0.6 ? 'Published' : 'Draft'}))
]

export const questionCols = [
  {
    label: '#',
    key: 'id'
  },
  {
    label: 'Question',
    key: 'question'
  },
  {
    label: 'Category',
    key: 'question'
  },
  {
    label: 'State',
    key: 'question'
  },
  {
    label: 'Question Group',
    key: 'question'
  },
  {
    label: 'License',
    key: 'question'
  },
  {
    label: 'Status',
    key: 'question'
  },
  {
    label: 'Display',
    key: 'display'
  },
  {
    label: 'Action',
    key: 'action'
  },
]


export function filterQuestions(param: Partial<Record<keyof Question, string>>, page: number, perPage: number) {
  const filters = Object.entries(param)

  const filtered = questions
      .filter(q => filters.reduce((acc, [key, value]) => acc && q[key] === value, true))
  return {
    questions: filtered.slice((page - 1) * perPage, page * perPage),
    total: filtered.length
  }
}
