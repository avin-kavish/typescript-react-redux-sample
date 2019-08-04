import {ActionType, createAsyncAction, getType, isActionOf} from 'typesafe-actions';
import {Question} from '../data/questions';
import {Epic} from 'redux-observable';
import {RootAction, RootState} from './store';
import {catchError, filter, map, switchMap, takeUntil} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import {of} from 'rxjs';

export type Filters = Partial<Record<keyof Question, string[]>>
export type FiltersActions = ActionType<typeof fetchFilters>

export const fetchFilters = createAsyncAction(
    'FETCH_FILTERS_REQUEST',
    'FETCH_FILTERS_SUCCESS',
    'FETCH_FILTERS_FAILURE',
    'FETCH_FILTERS_CANCEL'
)<null, Filters, Error, string>()

const {request: begin, success, failure, cancel} = fetchFilters
const initialState: Filters = {
  license: [],
  category: [],
  state: [],
  status: [],
  display: [],
}

export default function reducer(state: Filters = initialState, action: FiltersActions) {
  return action.type === getType(success) ? action.payload : state;
}


const fetchFiltersEpic: Epic<RootAction, RootAction, RootState> = (action$, store$) =>
    action$.pipe(
        filter(isActionOf(begin)),
        switchMap(action =>
            ajax.getJSON<Filters>(`http://localhost:3000/filters`).pipe(
                map(success),
                catchError(error => of(failure(error))),
                takeUntil(action$.pipe(filter(isActionOf(cancel))))
            )
        )
    )

export const filterEpics = [fetchFiltersEpic]
