import { Observable } from 'rxjs';

export interface FromLocalStorageOptions {
  json: boolean;
}

export function fromLocalStorage<T = string | null>(
  key: string,
  { json }: FromLocalStorageOptions = { json: false }
): Observable<T> {
  return new Observable<T>((subscriber) => {
    try {
      const lsItem = localStorage.getItem(key);
      const result: T = lsItem !== null && json ? JSON.parse(lsItem) : lsItem;
      subscriber.next(result);
      subscriber.complete();
    } catch (e) {
      subscriber.error(e);
    }
  });
}
