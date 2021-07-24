import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
} from '@angular/core';
import { defer, fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, pluck, tap } from 'rxjs/operators';

@Directive({ selector: '[debouncedInput]' })
export class DebouncedInputDirective implements AfterViewInit, OnDestroy {
  @Output()
  textChanges = new EventEmitter<string>();

  private readonly textInput$ = defer(() =>
    fromEvent<InputEvent>(this.elementRef.nativeElement, 'input')
  );

  private readonly debouncedText$ = this.textInput$.pipe(
    pluck('target', 'value'),
    debounceTime(350),
    distinctUntilChanged(),
    tap((text) => this.textChanges.emit(text as string))
  );

  private readonly subscriptions = new Subscription();

  constructor(private readonly elementRef: ElementRef<HTMLInputElement>) {}

  ngAfterViewInit(): void {
    this.subscriptions.add(this.debouncedText$.subscribe());
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
