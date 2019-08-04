import {SortType} from '../state/questions';
import {questionStrings} from './questionStrings';
import {ColumnDef} from '../components';
import {states} from './states';
import {Filters} from '../state/filters';

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

export const questionCols: ColumnDef<Question>[] = [
  {
    label: '#',
    key: 'id',
    sortable: true
  },
  {
    label: 'Question',
    key: 'question',
    sortable: true
  },
  {
    label: 'Category',
    key: 'category',
    sortable: true
  },
  {
    label: 'State',
    key: 'state',
    sortable: true
  },
  {
    label: 'Question Group',
    key: 'questionGroup',
    sortable: false
  },
  {
    label: 'License',
    key: 'license',
    sortable: false
  },
  {
    label: 'Status',
    key: 'status',
    sortable: true
  },
  {
    label: 'Display',
    key: 'display',
    sortable: false
  },
  {
    label: 'Action',
    key: null,
    sortable: false
  },
]

/**
 * CODE FOR MOCKING BACKEND
 * No coding standards followed
 * Fake Logic to support CRUD operations on Questions
 */

const categories = [
  'Company Policy',
  'Private Policy',
  'Public Policy',
  'Government Policy'
]

export const questions: Question[] = Array(50).fill({
  id: 57515,
  question: 'Do you keep all surveillance recordings for at least 90 calendar days?',
  category: 'Company Policy',
  questionGroup: [
    'A name of the question group',
    'Another name of a question group',
    'The other question group that is being used'
  ],
  license: [
    'A: Type 01 = Cultivation; Specialty Outdoor',
    'A: Type 01A = Cultivation; Specialty Indoor',
    'A: Type 01C = Cultivation; Specialty Cottage'
  ],
  state: 'CA',
  status: 'Active',
  display: 'Draft',
}).map((q: Question, i) => ({
  ...q,
  id: q.id + i,
  question: questionStrings[i % 50],
  category: categories[Math.floor(Math.random() * categories.length)],
  state: states[Math.floor(Math.random() * states.length)][0],
  display: Math.random() < 0.6 ? 'Published' : 'Draft',
  status: Math.random() < 0.7 ? 'Active' : 'Inactive'
}))

// This code is not the clearest to read, it is only for testing purposes
export function filterQuestions(param: Partial<Record<keyof Question, string>>, page: number, perPage: number, sort?: SortType<Question>) {
  const filters = Object.entries(param || {})

  let filtered = questions
      .filter(question => filters.reduce((acc, [key, value]) =>
              acc && (key === 'question'
                  ? question.question.toLowerCase().includes(value.trim().toLowerCase())
                  : key === 'license' || key === 'questionGroup'
                  ? question[key].find(el => el === value)
                  : question[key] === value),
          true))

  if (sort && sort[1] !== 'none') {
    const [key, direction] = sort
    filtered = filtered.sort((q1, q2) => {
      const val1 = q1[key]
      const val2 = q2[key]
      return (direction === 'asc' ? 1 : -1) * CompareAny(val1, val2)
    })
  }

  return {
    questions: filtered.slice((page - 1) * perPage, page * perPage),
    total: filtered.length
  }
}

function CompareAny(val1: any, val2: any) {
  if (typeof val1 === 'string' && typeof val2 === 'string')
    return val1.localeCompare(val2)
  else if (typeof val1 === 'number' && typeof val2 === 'number')
    return val1 - val2
  else
    return 0
}

// This code is not the clearest to read, it is only for testing purposes
export function makeConstraints() {
  const constraints: Filters = questions.reduce((acc, q) => {
    Object.entries(q).forEach(([key, value]) => {
      acc[key] = acc[key] || []

      if (Array.isArray(value)) {
        value.forEach(v => {
          if (!acc[key].find((el: any) => el === v))
            acc[key].push(v)
        })
      } else if (!acc[key].find((el: any) => el === value))
        acc[key].push(value)
    })
    return acc
  }, {})

  for (const key in constraints) {
    if (constraints.hasOwnProperty(key) && Array.isArray(constraints[key]))
      constraints[key].sort((a: any, b: any) => String(a).localeCompare(b))
  }

  return constraints
}

export function addQuestion(question: Question) {
  questions.unshift(question)
}
