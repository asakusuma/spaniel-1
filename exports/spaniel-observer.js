/*
Copyright 2017 LinkedIn Corp. Licensed under the Apache License,
Version 2.0 (the "License"); you may not use this file except in
compliance with the License. You may obtain a copy of the License
at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*/
import { SpanielIntersectionObserver } from './intersection-observer';
import { generateToken, off, on, scheduleWork } from './metal/index';
import w from './metal/window-proxy';
import { calculateIsIntersecting } from './utils';
var emptyRect = { x: 0, y: 0, width: 0, height: 0 };
export function DOMMarginToRootMargin(d) {
  return d.top + 'px ' + d.right + 'px ' + d.bottom + 'px ' + d.left + 'px';
}
var SpanielObserver = /** @class */ (function() {
  function SpanielObserver(callback, options) {
    var _this = this;
    this.paused = false;
    this.queuedEntries = [];
    this.recordStore = {};
    this.callback = callback;
    var _a = options || {
        threshold: []
      },
      root = _a.root,
      rootMargin = _a.rootMargin,
      threshold = _a.threshold,
      ALLOW_CACHED_SCHEDULER = _a.ALLOW_CACHED_SCHEDULER,
      BACKGROUND_TAB_FIX = _a.BACKGROUND_TAB_FIX,
      USE_NATIVE_IO = _a.USE_NATIVE_IO;
    rootMargin = rootMargin || '0px';
    var convertedRootMargin = typeof rootMargin !== 'string' ? DOMMarginToRootMargin(rootMargin) : rootMargin;
    this.thresholds = threshold.sort(function(t) {
      return t.ratio;
    });
    var o = {
      root: root,
      rootMargin: convertedRootMargin,
      threshold: this.thresholds.map(function(t) {
        return t.ratio;
      }),
      ALLOW_CACHED_SCHEDULER: ALLOW_CACHED_SCHEDULER
    };
    this.usingNativeIo = !!USE_NATIVE_IO && !!w.IntersectionObserver;
    var IntersectionObserver = this.usingNativeIo ? w.IntersectionObserver : SpanielIntersectionObserver;
    this.observer = new IntersectionObserver(function(records) {
      return _this.internalCallback(records);
    }, o);
    this.onTabHidden = this._onTabHidden.bind(this);
    this.onWindowClosed = this._onWindowClosed.bind(this);
    this.onTabShown = this._onTabShown.bind(this);
    if (w.hasDOM) {
      on('beforeunload', this.onWindowClosed);
      on('hide', this.onTabHidden);
      on('show', this.onTabShown);
      if (BACKGROUND_TAB_FIX) {
        this.paused = w.document.visibilityState !== 'visible';
      }
    }
  }
  SpanielObserver.prototype._onWindowClosed = function() {
    this.onTabHidden();
  };
  SpanielObserver.prototype.setAllHidden = function() {
    var ids = Object.keys(this.recordStore);
    for (var i = 0; i < ids.length; i++) {
      this.handleRecordExiting(this.recordStore[ids[i]]);
    }
    this.flushQueuedEntries();
  };
  SpanielObserver.prototype._onTabHidden = function() {
    this.paused = true;
    this.setAllHidden();
  };
  SpanielObserver.prototype._onTabShown = function() {
    this.paused = false;
    var ids = Object.keys(this.recordStore);
    var highResTime = performance.now();
    var unixTime = Date.now();
    for (var i = 0; i < ids.length; i++) {
      var entry = this.recordStore[ids[i]].lastSeenEntry;
      if (entry) {
        var intersectionRatio = entry.intersectionRatio,
          boundingClientRect = entry.boundingClientRect,
          rootBounds = entry.rootBounds,
          intersectionRect = entry.intersectionRect,
          isIntersecting = entry.isIntersecting,
          target = entry.target;
        this.handleObserverEntry({
          intersectionRatio: intersectionRatio,
          boundingClientRect: boundingClientRect,
          time: unixTime,
          highResTime: highResTime,
          unixTime: unixTime,
          isIntersecting: isIntersecting,
          rootBounds: rootBounds,
          intersectionRect: intersectionRect,
          target: target
        });
      }
    }
  };
  SpanielObserver.prototype.internalCallback = function(records) {
    records.forEach(this.handleObserverEntry.bind(this));
  };
  SpanielObserver.prototype.flushQueuedEntries = function() {
    if (this.queuedEntries.length > 0) {
      this.callback(this.queuedEntries);
      this.queuedEntries = [];
    }
  };
  SpanielObserver.prototype.generateSpanielEntry = function(entry, state) {
    var intersectionRatio = entry.intersectionRatio,
      rootBounds = entry.rootBounds,
      boundingClientRect = entry.boundingClientRect,
      intersectionRect = entry.intersectionRect,
      isIntersecting = entry.isIntersecting,
      time = entry.time,
      target = entry.target;
    var record = this.recordStore[target.__spanielId];
    var unixTime = this.usingNativeIo
      ? Math.floor(w.performance.timeOrigin || w.performance.timing.navigationStart + time)
      : time;
    var highResTime = this.usingNativeIo ? time : entry.highResTime;
    if (!highResTime) {
      throw new Error('Missing high res timestamp');
    }
    return {
      intersectionRatio: intersectionRatio,
      isIntersecting: isIntersecting,
      unixTime: unixTime,
      highResTime: highResTime,
      rootBounds: rootBounds,
      boundingClientRect: boundingClientRect,
      intersectionRect: intersectionRect,
      target: target,
      duration: 0,
      entering: false,
      payload: record.payload,
      label: state.threshold.label
    };
  };
  SpanielObserver.prototype.calculateDuration = function(compatTime, unixTime, highResTime) {
    return this.usingNativeIo ? highResTime - compatTime.highResTime : unixTime - compatTime.unixTime;
  };
  SpanielObserver.prototype.handleRecordExiting = function(record) {
    var _this = this;
    var time = Date.now();
    var perfTime = performance.now();
    record.thresholdStates.forEach(function(state) {
      var boundingClientRect = record.lastSeenEntry && record.lastSeenEntry.boundingClientRect;
      _this.handleThresholdExiting(
        {
          intersectionRatio: -1,
          isIntersecting: false,
          unixTime: time,
          highResTime: perfTime,
          payload: record.payload,
          label: state.threshold.label,
          entering: false,
          rootBounds: emptyRect,
          boundingClientRect: boundingClientRect || emptyRect,
          intersectionRect: emptyRect,
          duration: _this.calculateDuration(state.lastVisible, time, perfTime),
          target: record.target
        },
        state
      );
      state.lastSatisfied = false;
      state.visible = false;
      state.lastEntry = null;
    });
  };
  SpanielObserver.prototype.handleThresholdExiting = function(spanielEntry, state) {
    var highResTime = spanielEntry.highResTime;
    var hasTimeThreshold = !!state.threshold.time;
    if (state.lastSatisfied && (!hasTimeThreshold || (hasTimeThreshold && state.visible))) {
      // Make into function
      spanielEntry.duration = highResTime - state.lastVisible.highResTime;
      spanielEntry.entering = false;
      state.visible = false;
      this.queuedEntries.push(spanielEntry);
    }
    clearTimeout(state.timeoutId);
  };
  SpanielObserver.prototype.handleObserverEntry = function(entry) {
    var _this = this;
    var target = entry.target;
    var record = this.recordStore[target.__spanielId];
    if (record) {
      record.lastSeenEntry = entry;
      if (!this.paused) {
        record.thresholdStates.forEach(function(state) {
          // Find the thresholds that were crossed. Since you can have multiple thresholds
          // for the same ratio, could be multiple thresholds
          var hasTimeThreshold = !!state.threshold.time;
          var spanielEntry = _this.generateSpanielEntry(entry, state);
          var ratioSatisfied = entry.intersectionRatio >= state.threshold.ratio;
          // The spaniel polyfill doesn't have isIntersecting, so only calculate if it doesn't exist, i.e. we aren't using
          // the native intersectionobserver
          var isIntersecting =
            typeof spanielEntry.isIntersecting === 'boolean'
              ? spanielEntry.isIntersecting
              : calculateIsIntersecting(entry);
          var isSatisfied = ratioSatisfied && isIntersecting;
          if (isSatisfied != state.lastSatisfied) {
            if (isSatisfied) {
              spanielEntry.entering = true;
              if (hasTimeThreshold) {
                state.lastVisible = {
                  highResTime: spanielEntry.highResTime,
                  unixTime: spanielEntry.unixTime
                };
                var timerId = Number(
                  setTimeout(function() {
                    state.visible = true;
                    spanielEntry.duration = performance.now() - state.lastVisible.highResTime;
                    _this.callback([spanielEntry]);
                  }, state.threshold.time)
                );
                state.timeoutId = timerId;
              } else {
                state.visible = true;
                _this.queuedEntries.push(spanielEntry);
              }
            } else {
              _this.handleThresholdExiting(spanielEntry, state);
            }
            state.lastEntry = entry;
            state.lastSatisfied = isSatisfied;
          }
        });
        this.flushQueuedEntries();
      }
    }
  };
  SpanielObserver.prototype.disconnect = function() {
    this.setAllHidden();
    this.observer.disconnect();
    this.recordStore = {};
  };
  /*
   * Must be called when the SpanielObserver is done being used.
   * This will prevent memory leaks.
   */
  SpanielObserver.prototype.destroy = function() {
    this.disconnect();
    if (w.hasDOM) {
      off('beforeunload', this.onWindowClosed);
      off('hide', this.onTabHidden);
      off('show', this.onTabShown);
    }
  };
  SpanielObserver.prototype.unobserve = function(element) {
    var _this = this;
    var record = this.recordStore[element.__spanielId];
    if (record) {
      delete this.recordStore[element.__spanielId];
      this.observer.unobserve(element);
      scheduleWork(function() {
        _this.handleRecordExiting(record);
        _this.flushQueuedEntries();
      });
    }
  };
  SpanielObserver.prototype.observe = function(target, payload) {
    if (payload === void 0) {
      payload = null;
    }
    var trackedTarget = target;
    var id = (trackedTarget.__spanielId = trackedTarget.__spanielId || generateToken());
    this.recordStore[id] = {
      target: trackedTarget,
      payload: payload,
      lastSeenEntry: null,
      thresholdStates: this.thresholds.map(function(threshold) {
        return {
          lastSatisfied: false,
          lastEntry: null,
          threshold: threshold,
          visible: false,
          lastVisible: {
            unixTime: 0,
            highResTime: -1
          }
        };
      })
    };
    this.observer.observe(trackedTarget);
    return id;
  };
  return SpanielObserver;
})();
export { SpanielObserver };
//# sourceMappingURL=spaniel-observer.js.map
