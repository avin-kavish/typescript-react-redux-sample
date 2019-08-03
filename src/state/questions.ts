import {filterQuestions, Question, questions as questionSource} from '../data/questions';
import {Epic} from 'redux-observable';
import {filter, map} from 'rxjs/operators';
import {isOfType} from 'typesafe-actions';
import {RootState} from './store';

export const SEARCH_QUESTIONS = 'questions/SEARCH'
export const CHANGE_PER_PAGE = 'questions/CHANGE_PER_PAGE'
export const CHANGE_PAGE = 'questions/CHANGE_PAGE'
export const BEGIN_FETCH = 'questions/BEGIN_FETCH'
export const FETCH_SUCCESS = 'questions/FETCH_SUCCESS'
export const FETCH_ERROR = 'questions/FETCH_ERROR'

interface SearchQuestionsAction {
  type: typeof SEARCH_QUESTIONS
  payload: SearchFilters
}

interface ChangePerPageAction {
  type: typeof CHANGE_PER_PAGE
  payload: number
}

interface ChangePageAction {
  type: typeof CHANGE_PAGE
  payload: number
}

interface BeginFetchAction {
  type: typeof BEGIN_FETCH
  payload: { filters: SearchFilters, page: number, perPage: number }
}

interface FetchSuccessAction {
  type: typeof FETCH_SUCCESS
  payload: SearchResults
}

interface FetchErrorAction {
  type: typeof FETCH_ERROR
  payload: string
}

export type QuestionActions = SearchQuestionsAction | ChangePerPageAction | ChangePageAction | FetchSuccessAction | FetchErrorAction

type SearchFilters = Partial<Record<keyof Question, string>>

interface SearchResults {
  questions: Question[]
  total: number
}

export interface QuestionState {
  questions: Question[]
  total: number
  page: number
  perPage: number
  filters: SearchFilters
}

export function searchQuestions(payload: SearchFilters): SearchQuestionsAction {
  return {type: SEARCH_QUESTIONS, payload}
}

export function fetchSuccess(payload: SearchResults): FetchSuccessAction {
  return {type: FETCH_SUCCESS, payload}
}

export function changePage(payload: number): ChangePageAction {
  return {type: CHANGE_PAGE, payload}
}

const initialState: QuestionState = {
  questions: questionSource.slice(0, 5),
  total: questionSource.length,
  page: 1,
  perPage: 5,
  filters: {}
}

export default function reducer(state: QuestionState = initialState, action: QuestionActions): QuestionState {
  switch (action.type) {
    case SEARCH_QUESTIONS:
      return state
    case CHANGE_PAGE:
      return {...state, page: action.payload}
    case CHANGE_PER_PAGE:
      return {...state, perPage: action.payload}
    case FETCH_SUCCESS:
      return {...state, ...action.payload}
    default:
      return state
  }
}

type QuestionEpic = Epic<QuestionActions, QuestionActions, RootState>

export const searchEpic: QuestionEpic = (action$, state$) =>
    action$.pipe(
        filter(isOfType(SEARCH_QUESTIONS)),
        map(action => {
          const {page, perPage} = state$.value.questions
          return filterQuestions(action.payload, page, perPage)
        }),
        map(value => fetchSuccess(value))
    )

export const changePageEpic: QuestionEpic = (action$, state$) =>
    action$.pipe(
        filter(isOfType(CHANGE_PAGE)),
        map(action => {
          const {filters, perPage} = state$.value.questions
          return filterQuestions(filters, action.payload, perPage)
        }),
        map(value => fetchSuccess(value))
    )

export const changePerPageEpic: QuestionEpic = (action$, state$) =>
    action$.pipe(
        filter(isOfType(CHANGE_PER_PAGE)),
        map(action => {
          const {filters, page} = state$.value.questions
          return filterQuestions(filters, page, action.payload)
        }),
        map(value => fetchSuccess(value))
    )

export const questionEpics = [searchEpic, changePageEpic, changePerPageEpic]
