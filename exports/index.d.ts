import { SpanielTrackedElement, DOMMargin, IntersectionObserverClass } from './interfaces';
export { Watcher, WatcherConfig } from './watcher';
import { SpanielObserver } from './spaniel-observer';
import { setGlobalEngine, getGlobalEngine } from './metal/engine';
import { on, off, scheduleWork, scheduleRead, Frame } from './metal/index';
import w from './metal/window-proxy';
import { invalidate } from './metal/window-proxy';
declare const IntersectionObserver: IntersectionObserverClass;
export {
  on,
  off,
  scheduleRead,
  scheduleWork,
  IntersectionObserver,
  SpanielObserver,
  SpanielTrackedElement,
  setGlobalEngine,
  getGlobalEngine,
  w as __w__,
  invalidate
};
export declare function queryElement(el: Element, callback: (clientRect: ClientRect, frame: Frame) => void): void;
export declare function elementSatisfiesRatio(
  el: HTMLElement,
  ratio: number,
  callback: (result: Boolean) => void,
  rootMargin?: DOMMargin
): void;
