import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { preventDefault } from './prevent-default';
import { stopPropagation } from './stop-propagation';

export function preventDefaultPropagation<
  T extends Event
>(): MonoTypeOperatorFunction<T> {
  return (source$: Observable<T>) =>
    source$.pipe(preventDefault(), stopPropagation());
}
