import {tap} from 'rxjs/operators';

// tslint:disable-next-line:no-console
export const debug = () => tap(console.info, console.error)
