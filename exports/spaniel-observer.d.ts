import {
  DOMMargin,
  DOMString,
  SpanielObserverEntry,
  SpanielObserverInit,
  SpanielObserverInterface,
  SpanielRecord,
  SpanielThreshold,
  SpanielTrackedElement
} from './interfaces';
import { SpanielIntersectionObserver } from './intersection-observer';
export declare function DOMMarginToRootMargin(d: DOMMargin): DOMString;
export declare class SpanielObserver implements SpanielObserverInterface {
  callback: (entries: SpanielObserverEntry[]) => void;
  observer: SpanielIntersectionObserver | IntersectionObserver;
  thresholds: SpanielThreshold[];
  recordStore: {
    [key: string]: SpanielRecord;
  };
  queuedEntries: SpanielObserverEntry[];
  private paused;
  private usingNativeIo;
  private onWindowClosed;
  private onTabHidden;
  private onTabShown;
  constructor(callback: (entries: SpanielObserverEntry[]) => void, options?: SpanielObserverInit);
  private _onWindowClosed;
  private setAllHidden;
  private _onTabHidden;
  private _onTabShown;
  private internalCallback;
  private flushQueuedEntries;
  private generateSpanielEntry;
  private calculateDuration;
  private handleRecordExiting;
  private handleThresholdExiting;
  private handleObserverEntry;
  disconnect(): void;
  destroy(): void;
  unobserve(element: SpanielTrackedElement): void;
  observe(target: Element, payload?: any): string;
}
