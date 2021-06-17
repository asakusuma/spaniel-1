export function calculateIsIntersecting(_a) {
  var intersectionRect = _a.intersectionRect;
  return intersectionRect.width >= 0 && intersectionRect.height >= 0;
}
export function getBoundingClientRect(element) {
  try {
    return element.getBoundingClientRect();
  } catch (e) {
    if (typeof e === 'object' && e !== null && (e.number & 0xffff) === 16389) {
      return { top: 0, bottom: 0, left: 0, width: 0, height: 0, right: 0, x: 0, y: 0 };
    } else {
      throw e;
    }
  }
}
export function throttle(cb, thottleDelay, scope) {
  if (thottleDelay === void 0) {
    thottleDelay = 5;
  }
  if (scope === void 0) {
    scope = window;
  }
  var cookie;
  return function() {
    scope.clearTimeout(cookie);
    cookie = scope.setTimeout(cb, thottleDelay);
  };
}
//# sourceMappingURL=utils.js.map
