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
    ...Array(5).fill({
    id: 57515,
    question: 'Do you keep all surveillance recordings for at least 90 calendar days?',
    category: 'Company Policy',
    questionGroup: ['A name of the question group'],
    license: [
      'A: Type  01 = Cultivation; Specialty Outdoor',
      'A: Type  01A = Cultivation; Specialty Indoor',
      'A: Type  01C = Cultivation; Specialty Cottage'
    ],
    state: 'CA',
    status: 'Active',
    display: 'Draft',
  })
]
