export interface SpanielTrackedElement extends HTMLElement {
  __spanielId: string;
}
export interface SpanielThreshold {
  label: string;
  ratio: number;
  time?: number;
}
export interface SpanielObserverInit {
  root?: SpanielTrackedElement;
  rootMargin?: DOMString | DOMMargin;
  threshold: SpanielThreshold[];
  ALLOW_CACHED_SCHEDULER?: boolean;
  BACKGROUND_TAB_FIX?: boolean;
  USE_NATIVE_IO?: boolean;
}
export interface TimeCompat {
  highResTime: number;
  unixTime: number;
}
export interface SpanielRecord {
  target: SpanielTrackedElement;
  payload: any;
  thresholdStates: SpanielThresholdState[];
  lastSeenEntry: MaybeInternalIntersectionObserverEntry | null;
}
export interface SpanielThresholdState {
  lastSatisfied: Boolean;
  lastEntry: MaybeInternalIntersectionObserverEntry | null;
  threshold: SpanielThreshold;
  lastVisible: TimeCompat;
  visible: boolean;
  timeoutId?: number;
}
export interface SpanielIntersectionObserverEntryInit {
  highResTime: DOMHighResTimeStamp;
  unixTime: number;
  rootBounds: SpanielRect;
  boundingClientRect: SpanielRect;
  intersectionRect: SpanielRect & ClientRect;
  target: SpanielTrackedElement;
}
export interface SpanielRect extends Partial<DOMRectReadOnly> {
  readonly height: number;
  readonly width: number;
  readonly x: number;
  readonly y: number;
}
export interface SpanielObserverEntry {
  isIntersecting: boolean;
  duration: number;
  intersectionRatio: number;
  entering: boolean;
  label?: string;
  payload?: any;
  unixTime: number;
  highResTime: number;
  target: Element;
  boundingClientRect: SpanielRect;
  intersectionRect: SpanielRect;
  rootBounds: SpanielRect | null;
}
export interface InternalIntersectionObserverEntry {
  time: number;
  unixTime: number;
  highResTime: DOMHighResTimeStamp;
  target: Element;
  boundingClientRect: SpanielRect;
  intersectionRect: SpanielRect;
  rootBounds: SpanielRect | null;
  intersectionRatio: number;
  isIntersecting: boolean;
}
export interface MaybeInternalIntersectionObserverEntry {
  time: number;
  unixTime?: number;
  highResTime?: DOMHighResTimeStamp;
  target: Element;
  boundingClientRect: SpanielRect;
  intersectionRect: SpanielRect & ClientRect;
  rootBounds: SpanielRect | null;
  intersectionRatio: number;
  isIntersecting: boolean;
}
export interface IntersectionObserverClass {
  new (callback: IntersectionObserverCallback, options?: IntersectionObserverInit): IntersectionObserver;
}
export interface SpanielObserverInterface {
  disconnect: () => void;
  unobserve: (element: SpanielTrackedElement) => void;
  observe: (target: Element, payload: any) => string;
}
export declare type DOMString = string;
export declare type DOMHighResTimeStamp = number;
export interface DOMMargin {
  top: number;
  bottom: number;
  left: number;
  right: number;
}
export interface DOMRectReadOnly extends DOMRectInit, DOMMargin {}
export interface IntersectionObserverInit {
  root?: SpanielTrackedElement;
  rootMargin?: DOMString;
  threshold?: number | number[];
  ALLOW_CACHED_SCHEDULER?: boolean;
}
