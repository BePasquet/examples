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
import { preventDefaultPropagation } from '../operators/prevent-default-propagation';

@Directive({
  selector: '[uploader]',
})
export class UploaderDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  accepts: string[] = [];

  @Input()
  multiple: boolean = false;

  @Output()
  fileChanges = new EventEmitter<File[]>();

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
      map((ev) => {
        const files = (ev.target as HTMLInputElement).files;
        return !!files && !!files.length ? Array.from(files) : [];
      }),
      filter((files) => !!files.length)
    )
  );

  private readonly pickerFiles$ = this.openFilePicker$.pipe(
    switchMap(() => this.filePickerChanges$)
  );

  private readonly droppedFiles$ = defer(() =>
    fromEvent<DragEvent>(this.elementRef.nativeElement, 'drop').pipe(
      preventDefaultPropagation(),
      tap(() => {
        this.elementRef.nativeElement.style.border = 'none';
      }),
      map((ev) => {
        const files = ev.dataTransfer?.files;
        return !!files && !!files.length ? Array.from(files) : [];
      }),
      filter((files) => !!files.length)
    )
  );

  private readonly highlightDropArea$ = defer(() =>
    fromEvent<DragEvent>(this.elementRef.nativeElement, 'dragenter').pipe(
      preventDefaultPropagation(),
      tap(() => this.highlightDropArea())
    )
  );

  private readonly unhighlightDropArea$ = defer(() =>
    fromEvent<DragEvent>(this.elementRef.nativeElement, 'dragleave').pipe(
      preventDefaultPropagation(),
      tap(() => this.unhighlightDropArea())
    )
  );

  private readonly preventDragOver$ = defer(() =>
    fromEvent<DragEvent>(this.elementRef.nativeElement, 'dragover').pipe(
      preventDefaultPropagation()
    )
  );

  private readonly fileChanges$ = merge(
    this.droppedFiles$,
    this.pickerFiles$
  ).pipe(tap((files) => this.fileChanges.emit(files)));

  private readonly effects$ = merge(
    this.resetFilePicker$,
    this.fileChanges$,
    this.highlightDropArea$,
    this.unhighlightDropArea$,
    this.preventDragOver$
  );

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

  private highlightDropArea(): void {
    this.elementRef.nativeElement.style.border = '1px solid red';
  }

  private unhighlightDropArea(): void {
    this.elementRef.nativeElement.style.border = 'none';
  }
}
