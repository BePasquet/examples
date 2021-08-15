import { fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function fromFiles(files: File[]): Observable<string> {
  const readerResults = files.map((file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return fromEvent(reader, 'loadend').pipe(
      map(() => reader.result as string)
    );
  });

  return merge(...readerResults);
}
