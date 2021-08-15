import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export function preventDefault<T extends Event>(): MonoTypeOperatorFunction<T> {
  return (source$: Observable<T>) =>
    source$.pipe(tap((ev) => ev.preventDefault()));
}
