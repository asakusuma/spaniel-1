import { SpanielClientRectInterface } from './metal/interfaces';
export declare function calculateIsIntersecting({ intersectionRect }: { intersectionRect: ClientRect }): boolean;
export declare function getBoundingClientRect(element: Element): SpanielClientRectInterface;
export declare function throttle(cb: Function, thottleDelay?: number, scope?: Window): () => void;
