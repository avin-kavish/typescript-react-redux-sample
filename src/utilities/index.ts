import {tap} from 'rxjs/operators';

// tslint:disable-next-line:no-console
export const debugStream = () => process.env.NODE_ENV === 'development' ? tap(console.info, console.error) : tap()

export const jsonHeader = {'Content-type': 'application/json'}

export type Intrinsics = JSX.IntrinsicElements

export const safeJoin = (value: any, separator = '\n') => Array.isArray(value) && value.join(separator)
