import {Question} from '../data/questions';
import {Epic} from 'redux-observable';
import {catchError, delay, filter, map, switchMap, tap} from 'rxjs/operators';
import {ActionType, createAction, isActionOf, isOfType} from 'typesafe-actions';
import {RootState} from './store';
import {ajax} from 'rxjs/ajax';
import {of} from 'rxjs';
import {debugStream, jsonHeader} from '../utilities';
import history from './history';

export const SEARCH_QUESTIONS = 'questions/SEARCH'
export const SORT = 'questions/SORT'
export const CHANGE_PER_PAGE = 'questions/CHANGE_PER_PAGE'
export const CHANGE_PAGE = 'questions/CHANGE_PAGE'
export const BEGIN_FETCH = 'questions/BEGIN_FETCH'
export const FETCH_SUCCESS = 'questions/FETCH_SUCCESS'
export const FETCH_FAILURE = 'questions/FETCH_ERROR'

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

export type SortDirection = 'asc' | 'desc' | 'none'
export type SortType<T = Question> = [keyof T, SortDirection]

interface SortAction {
  type: typeof SORT
  payload: SortType
}

interface BeginFetchAction {
  type: typeof BEGIN_FETCH
  payload: Partial<{ filters: SearchFilters, page: number, perPage: number, sort: SortType }>
}

interface FetchSuccessAction {
  type: typeof FETCH_SUCCESS
  payload: SearchResults
}

interface FetchFailureAction {
  type: typeof FETCH_FAILURE
  payload: Error
}

export type QuestionActions =
    | SearchQuestionsAction
    | ChangePerPageAction
    | ChangePageAction
    | SortAction
    | BeginFetchAction
    | FetchSuccessAction
    | FetchFailureAction
    | ActionType<typeof questionsCrud>

export const searchQuestions = (payload: SearchFilters): SearchQuestionsAction => ({type: SEARCH_QUESTIONS, payload});

export const changePage = (payload: number): ChangePageAction => ({type: CHANGE_PAGE, payload});

export const changePerPage = (payload: number): ChangePerPageAction => ({type: CHANGE_PER_PAGE, payload});

export const sortQuestions = (payload: SortType): SortAction => ({type: SORT, payload});

export const beginFetch = (payload: BeginFetchAction['payload']): BeginFetchAction => ({type: BEGIN_FETCH, payload})

export const fetchSuccess = (payload: SearchResults): FetchSuccessAction => ({type: FETCH_SUCCESS, payload});

export const fetchFailure = (payload: Error): FetchFailureAction => ({type: FETCH_FAILURE, payload})

export const questionsCrud = {
  create: createAction('questions/CREATE', action => (question: Question) => action(question)),
  read: createAction('questions/READ', action => (question: Question) => action(question)),
  update: createAction('questions/UPDATE', action => (question: Question) => action(question)),
  delete: createAction('questions/DELETE', action => (question: Question) => action(question))
}

export type SearchFilters = Partial<Record<keyof Question, string>>

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
  sort: SortType
  isLoading: boolean
}

const initialState: QuestionState = {
  questions: [],
  total: 0,
  page: 1,
  perPage: 5,
  filters: {},
  sort: null,
  isLoading: false
}

export default function reducer(state: QuestionState = initialState, action: QuestionActions): QuestionState {
  switch (action.type) {
    case SEARCH_QUESTIONS:
      return {...state, filters: action.payload}
    case SORT:
      return {...state, sort: action.payload}
    case CHANGE_PAGE:
      return {...state, page: action.payload}
    case CHANGE_PER_PAGE:
      return {...state, perPage: action.payload}
    case BEGIN_FETCH:
      return {...state, isLoading: true}
    case FETCH_SUCCESS:
      return {...state, ...action.payload, isLoading: false}
    case FETCH_FAILURE:
      return {...state, isLoading: false}
    default:
      return state
  }
}

const {create} = questionsCrud

type QuestionEpic = Epic<QuestionActions, QuestionActions, RootState>

const addEpic: QuestionEpic = (action$, state$) =>
    action$.pipe(
        filter(isActionOf(create)),
        debugStream(),
        switchMap(action =>
            ajax.post(`http://localhost:3000/questions/add`, action.payload, jsonHeader)
                .pipe(
                    map(value => beginFetch(null)),
                    tap(() => history.goBack()),
                    catchError(error => of(fetchFailure(error)))
                )
        )
    )

export const searchEpic: QuestionEpic = (action$, state$) =>
    action$.pipe(
        filter(isOfType(SEARCH_QUESTIONS)),
        map(action => beginFetch({filters: action.payload}))
    )

export const changePageEpic: QuestionEpic = (action$, state$) =>
    action$.pipe(
        filter(isOfType(CHANGE_PAGE)),
        map(action => beginFetch({page: action.payload}))
    )

export const changePerPageEpic: QuestionEpic = (action$, state$) =>
    action$.pipe(
        filter(isOfType(CHANGE_PER_PAGE)),
        map(action => beginFetch({perPage: action.payload}))
    )

export const sortEpic: QuestionEpic = (action$, state$) =>
    action$.pipe(
        filter(isOfType(SORT)),
        tap(v => console.log(v)),
        map(action => beginFetch({sort: action.payload}))
    )

export const fetchEpic: QuestionEpic = (action$, state$) =>
    action$.pipe(
        filter(isOfType(BEGIN_FETCH)),
        delay(process.env.NODE_ENV === 'development' ? 400 : 0), // Delay to simulate network latency
        switchMap(action => {
              const {filters, perPage, page, sort} = state$.value.questions

              return ajax({
                url: `http://localhost:3000/questions`,
                method: 'post',
                body: {filters, perPage, page, sort, ...action.payload},
                headers: jsonHeader
              })
                  .pipe(
                      debugStream(),
                      map(res => fetchSuccess(res.response)),
                      catchError(err => of(fetchFailure(err)))
                  )
            }
        )
    )

export const questionEpics = [
  searchEpic,
  changePageEpic,
  changePerPageEpic,
  sortEpic,
  fetchEpic,
  addEpic
]
