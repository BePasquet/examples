import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { defer, fromEvent, merge, Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

@Directive({
  selector: '[uploader]',
})
export class UploaderDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  accepts: string[] = [];

  @Input()
  multiple: boolean = false;

  @Output()
  fileChanges = new EventEmitter<FileList>();

  private readonly inputFileRef: HTMLInputElement;

  private readonly openFilePicker$ = defer(() =>
    fromEvent(this.elementRef.nativeElement, 'click').pipe(
      tap(() => this.inputFileRef.click())
    )
  );

  private readonly resetFilePicker$ = defer(() =>
    fromEvent(this.inputFileRef, 'click').pipe(
      tap((ev) => ((ev.target as HTMLInputElement).value = ''))
    )
  );

  private readonly filePickerChanges$ = defer(() =>
    fromEvent(this.inputFileRef, 'change').pipe(
      map((ev) => (ev.target as HTMLInputElement).files)
    )
  );

  private readonly fileChanges$ = this.openFilePicker$.pipe(
    switchMap(() => this.filePickerChanges$),
    filter((files) => !!files),
    tap((files) => this.fileChanges.emit(files as FileList))
  );

  private readonly effects$ = merge(this.resetFilePicker$, this.fileChanges$);

  private readonly subscriptions = new Subscription();

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {
    const input = document.createElement('input');
    input.type = 'file';
    this.inputFileRef = input;
  }

  ngOnInit(): void {
    if (!!this.accepts.length) {
      this.inputFileRef.accept = this.accepts.join(';');
    }

    this.inputFileRef.multiple = this.multiple;
  }

  ngAfterViewInit(): void {
    this.effects$.subscribe();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
