import {combineEpics, createEpicMiddleware} from 'redux-observable';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import questions, {QuestionActions, questionEpics, QuestionState} from './questions'
import filters, {filterEpics, Filters, FiltersActions} from './filters';

export type RootState = {
  questions: QuestionState
  filters: Filters
}

export type RootAction = FiltersActions | QuestionActions

const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState>()
const store = createStore(
    combineReducers({questions, filters}),
    applyMiddleware(epicMiddleware)
)
epicMiddleware.run(combineEpics(...questionEpics, ...filterEpics))

export default store
