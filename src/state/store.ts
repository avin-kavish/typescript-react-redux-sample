import {combineEpics, createEpicMiddleware} from 'redux-observable';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import questions, {QuestionActions, questionEpics, QuestionState} from './questions'

export type RootState = {
  questions: QuestionState
}

const epicMiddleware = createEpicMiddleware<QuestionActions, QuestionActions, RootState>()

const rootReducer = combineReducers({questions})

const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware)
);

const rootEpic = combineEpics(...questionEpics)

epicMiddleware.run(rootEpic)

export default store
