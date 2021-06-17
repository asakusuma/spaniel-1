import { Frame } from './metal/index';
import {
  SpanielTrackedElement,
  DOMString,
  DOMRectReadOnly,
  IntersectionObserverInit,
  DOMMargin,
  InternalIntersectionObserverEntry
} from './interfaces';
export declare class SpanielIntersectionObserver implements IntersectionObserver {
  private scheduler;
  private callback;
  root: SpanielTrackedElement | null;
  rootMargin: DOMString;
  protected rootMarginObj: DOMMargin;
  thresholds: number[];
  private records;
  observe(target: HTMLElement): string;
  private onTick;
  unobserve(target: SpanielTrackedElement): void;
  disconnect(): void;
  takeRecords(): IntersectionObserverEntry[];
  private generateEntryEvent;
  constructor(callback: Function, options?: IntersectionObserverInit);
}
export declare function generateEntry(
  frame: Frame,
  clientRect: DOMRectReadOnly,
  el: HTMLElement,
  rootMargin: DOMMargin
): InternalIntersectionObserverEntry;
