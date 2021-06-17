!(function(t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? e(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], e)
    : e((t.spaniel = {}));
})(this, function(t) {
  'use strict';
  function e(t) {
    var e = t.intersectionRect;
    return e.width >= 0 && e.height >= 0;
  }
  function i(t) {
    try {
      return t.getBoundingClientRect();
    } catch (t) {
      if ('object' == typeof t && null !== t && 16389 == (65535 & t.number))
        return { top: 0, bottom: 0, left: 0, width: 0, height: 0, right: 0, x: 0, y: 0 };
      throw t;
    }
  }
  function n() {
    ++A.version;
  }
  function o() {
    var t = null != document.scrollingElement;
    (A.getScrollTop = t
      ? function() {
          return document.scrollingElement.scrollTop;
        }
      : function() {
          return window.scrollY;
        }),
      (A.getScrollLeft = t
        ? function() {
            return document.scrollingElement.scrollLeft;
          }
        : function() {
            return window.scrollX;
          });
  }
  function r(t) {
    return !q && ((q = t), !0);
  }
  function s() {
    return q || (q = new D());
  }
  function h() {
    return W++ + M;
  }
  function u() {
    return P || (P = new j());
  }
  function c() {
    return (
      G ||
      (G = {
        scroll: new F(function(t) {
          var e = this.state,
            i = e.scrollTop,
            n = e.scrollLeft;
          return (this.state = t), i !== t.scrollTop || n !== t.scrollLeft;
        }),
        resize: new F(function(t) {
          var e = this.state,
            i = e.width,
            n = e.height;
          return (this.state = t), n !== t.height || i !== t.width;
        }),
        destroy: new Q(),
        beforeunload: new Q(),
        hide: new Q(),
        show: new Q()
      })
    );
  }
  function l(t, e) {
    var i = c()[t];
    i && i.listen(e);
  }
  function a(t, e) {
    if (G) {
      var i = G[t];
      i && i.unlisten(e);
    }
  }
  function d(t, e) {
    if (G) {
      var i = G[t];
      i && i.trigger(e);
    }
  }
  function f(t) {
    u().scheduleWork(t);
  }
  function p(t) {
    u().scheduleRead(t);
  }
  function g(t) {
    var e = t.left,
      i = t.right,
      n = t.top,
      o = t.bottom;
    return { left: e, top: n, bottom: o, right: i, width: i - e, height: o - n, x: e, y: n };
  }
  function m(t) {
    var e = t.split(' ').map(function(t) {
      return parseInt(t, 10);
    });
    switch (e.length) {
      case 2:
        return { top: e[0], left: e[1], bottom: e[0], right: e[1] };
      case 3:
        return { top: e[0], left: e[1], bottom: e[2], right: e[1] };
      case 4:
        return { top: e[0], left: e[1], bottom: e[2], right: e[3] };
      default:
        return { top: 0, left: 0, bottom: 0, right: 0 };
    }
  }
  function y(t) {
    var i = t.unixTime,
      n = t.highResTime,
      o = t.rootBounds,
      r = t.boundingClientRect,
      s = t.intersectionRect,
      h = t.target,
      u = r.height * r.width;
    return {
      time: i,
      unixTime: i,
      highResTime: n,
      rootBounds: o,
      boundingClientRect: r,
      intersectionRect: s,
      target: h,
      intersectionRatio: u > 0 ? (s.width * s.height) / u : 0,
      isIntersecting: e({ intersectionRect: s })
    };
  }
  function v() {
    return { bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0, x: 0, y: 0 };
  }
  function b(t, e, i, n) {
    if ('none' === i.style.display)
      return {
        unixTime: t.dateNow,
        highResTime: t.highResTime,
        boundingClientRect: v(),
        intersectionRatio: 0,
        intersectionRect: v(),
        isIntersecting: !1,
        rootBounds: v(),
        target: i,
        time: t.dateNow
      };
    var o = e.bottom,
      r = e.right,
      s = t.left + n.left,
      h = t.top + n.top,
      u = {
        left: s,
        top: h,
        bottom: n.bottom,
        right: n.right,
        width: t.width - (n.right + n.left),
        height: t.height - (n.bottom + n.top),
        y: h,
        x: s
      },
      c = Math.max(u.left, e.left),
      l = Math.max(u.top, e.top),
      a = Math.min(u.left + u.width, e.right) - c,
      d = Math.min(u.top + u.height, e.bottom) - l,
      f = a >= 0 ? c : 0,
      p = l >= 0 ? l : 0,
      m = { left: f, top: p, x: f, y: p, width: a, height: d, right: r, bottom: o };
    return y({
      unixTime: t.dateNow,
      highResTime: t.highResTime,
      rootBounds: u,
      target: i,
      boundingClientRect: g(e),
      intersectionRect: m
    });
  }
  function w(t) {
    return t.top + 'px ' + t.right + 'px ' + t.bottom + 'px ' + t.left + 'px';
  }
  function R(t) {
    t.forEach(function(t) {
      var e = t.label,
        i = t.duration,
        n = t.boundingClientRect,
        o = t.intersectionRect,
        r = { duration: i, boundingClientRect: n, visibleTime: t.unixTime, intersectionRect: o };
      t.entering
        ? t.payload.callback(e, r)
        : 'impressed' === t.label &&
          ((r.visibleTime = t.highResTime - t.duration), t.payload.callback('impression-complete', r));
    });
  }
  function T(t, e) {
    u().queryElement(t, e);
  }
  function E(t, e, i, n) {
    void 0 === e && (e = 0),
      void 0 === n && (n = { top: 0, bottom: 0, left: 0, right: 0 }),
      T(t, function(o, r) {
        var s = b(r, o, t, n);
        i(s.isIntersecting && s.intersectionRatio >= e);
      });
  }
  var _ = (function() {
      var t = function(e, i) {
        return (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(t, e) {
              t.__proto__ = e;
            }) ||
          function(t, e) {
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
          })(e, i);
      };
      return function(e, i) {
        function n() {
          this.constructor = e;
        }
        t(e, i), (e.prototype = null === i ? Object.create(i) : ((n.prototype = i.prototype), new n()));
      };
    })(),
    S = (function() {
      function t() {
        this.items = [];
      }
      return (
        (t.prototype.remove = function(t) {
          for (var e = this.items.length, i = 0; i < e; i++)
            this.removePredicate(t, this.items[i]) && (this.items.splice(i, 1), i--, e--);
        }),
        (t.prototype.clear = function() {
          this.items = [];
        }),
        (t.prototype.push = function(t) {
          this.items.push(t);
        }),
        (t.prototype.isEmpty = function() {
          return 0 === this.items.length;
        }),
        t
      );
    })(),
    x = (function(t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        _(e, t),
        (e.prototype.removePredicate = function(t, e) {
          return 'string' == typeof t ? e.id === t : e.callback === t;
        }),
        e
      );
    })(S),
    I = (function(t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        _(e, t),
        (e.prototype.removePredicate = function(t, e) {
          return e === t;
        }),
        e
      );
    })(S),
    C = (function(t) {
      function e() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        _(e, t),
        (e.prototype.removePredicate = function(t, e) {
          return 'string' == typeof t ? e.id === t : 'function' == typeof t ? e.callback === t : e.el === t;
        }),
        e
      );
    })(S),
    O = function() {
      return 0;
    },
    k = !('undefined' == typeof window || !window || 'undefined' == typeof document || !document),
    L = k && !!window.requestAnimationFrame,
    A = {
      hasDOM: k,
      hasRAF: L,
      getScrollTop: O,
      getScrollLeft: O,
      getHeight: O,
      getWidth: O,
      rAF: L
        ? window.requestAnimationFrame.bind(window)
        : function(t) {
            t();
          },
      meta: { width: 0, height: 0, scrollTop: 0, scrollLeft: 0, x: 0, y: 0, top: 0, left: 0 },
      version: 0,
      lastVersion: 0,
      updateMeta: O,
      get isDirty() {
        return A.version !== A.lastVersion;
      },
      document: window.document,
      IntersectionObserver: k && window.IntersectionObserver,
      performance: k && window.performance
    };
  k &&
    ((A.getHeight = function() {
      return window.innerHeight;
    }),
    (A.getWidth = function() {
      return window.innerWidth;
    }),
    (A.updateMeta = function() {
      (A.meta.height = A.getHeight()),
        (A.meta.width = A.getWidth()),
        (A.meta.scrollLeft = A.getScrollLeft()),
        (A.meta.scrollTop = A.getScrollTop()),
        (A.lastVersion = A.version);
    }),
    A.updateMeta(),
    'loading' !== document.readyState ? o() : document.addEventListener('DOMContentLoaded', o),
    window.addEventListener('resize', n, !1),
    window.addEventListener('scroll', n, !1));
  var D = (function() {
      function t() {
        (this.reads = []), (this.work = []), (this.running = !1);
      }
      return (
        (t.prototype.scheduleRead = function(t) {
          this.reads.unshift(t), this.run();
        }),
        (t.prototype.scheduleWork = function(t) {
          this.work.unshift(t), this.run();
        }),
        (t.prototype.run = function() {
          var t = this;
          this.running ||
            ((this.running = !0),
            A.rAF(function() {
              t.running = !1;
              for (var e = 0, i = t.reads.length; e < i; e++) t.reads.pop()();
              for (var e = 0, n = t.work.length; e < n; e++) t.work.pop()();
              (t.work.length > 0 || t.reads.length > 0) && t.run();
            }));
        }),
        t
      );
    })(),
    q = null,
    H = (function() {
      var t = function(e, i) {
        return (t =
          Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array &&
            function(t, e) {
              t.__proto__ = e;
            }) ||
          function(t, e) {
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
          })(e, i);
      };
      return function(e, i) {
        function n() {
          this.constructor = e;
        }
        t(e, i), (e.prototype = null === i ? Object.create(i) : ((n.prototype = i.prototype), new n()));
      };
    })(),
    M = 'xxxx'.replace(/[xy]/g, function(t) {
      var e = (16 * Math.random()) | 0;
      return ('x' === t ? e : (3 & e) | 8).toString(16);
    }),
    W = 0,
    B = (function() {
      function t(t, e, i, n, o, r, s, h, u, c) {
        (this.dateNow = t),
          (this.highResTime = e),
          (this.scrollTop = i),
          (this.scrollLeft = n),
          (this.width = o),
          (this.height = r),
          (this.x = s),
          (this.y = h),
          (this.top = u),
          (this.left = c);
      }
      return (
        (t.generate = function(e) {
          void 0 === e && (e = window);
          var i = this.revalidateRootMeta(e);
          return new t(
            Date.now(),
            performance.now(),
            i.scrollTop,
            i.scrollLeft,
            i.width,
            i.height,
            i.x,
            i.y,
            i.top,
            i.left
          );
        }),
        (t.revalidateRootMeta = function(t) {
          void 0 === t && (t = document);
          var e = null,
            n = { width: 0, height: 0, scrollTop: 0, scrollLeft: 0, x: 0, y: 0, top: 0, left: 0 };
          return (
            A.isDirty && A.updateMeta(),
            t === window || t === document
              ? ((n.height = A.meta.height),
                (n.width = A.meta.width),
                (n.scrollLeft = A.meta.scrollLeft),
                (n.scrollTop = A.meta.scrollTop),
                n)
              : ((e = i(t)),
                (n.scrollTop = t.scrollTop),
                (n.scrollLeft = t.scrollLeft),
                (n.width = e.width),
                (n.height = e.height),
                (n.x = e.x),
                (n.y = e.y),
                (n.top = e.top),
                (n.left = e.left),
                n)
          );
        }),
        t
      );
    })(),
    N = (function() {
      function t(t, e) {
        (this.isTicking = !1), (this.toRemove = []), (this.engine = t || s()), (this.root = e || window);
      }
      return (
        (t.prototype.tick = function() {
          if (this.queue.isEmpty()) this.isTicking = !1;
          else {
            if (this.toRemove.length > 0) {
              for (var t = 0; t < this.toRemove.length; t++) this.queue.remove(this.toRemove[t]);
              this.toRemove = [];
            }
            this.applyQueue(B.generate(this.root)), this.engine.scheduleRead(this.tick.bind(this));
          }
        }),
        (t.prototype.scheduleWork = function(t) {
          this.engine.scheduleWork(t);
        }),
        (t.prototype.scheduleRead = function(t) {
          this.engine.scheduleRead(t);
        }),
        (t.prototype.queryElement = function(t, e) {
          var n,
            o,
            r = this;
          this.engine.scheduleRead(function() {
            (n = i(t)), (o = B.generate(r.root));
          }),
            this.engine.scheduleWork(function() {
              e(n, o);
            });
        }),
        (t.prototype.unwatch = function(t) {
          this.toRemove.push(t);
        }),
        (t.prototype.unwatchAll = function() {
          this.queue.clear();
        }),
        (t.prototype.startTicking = function() {
          this.isTicking || ((this.isTicking = !0), this.engine.scheduleRead(this.tick.bind(this)));
        }),
        t
      );
    })(),
    j = (function(t) {
      function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        return (e.queue = new x()), e;
      }
      return (
        H(e, t),
        (e.prototype.applyQueue = function(t) {
          for (var e = 0; e < this.queue.items.length; e++) {
            var i = this.queue.items[e],
              n = i.id;
            (0, i.callback)(t, n);
          }
        }),
        (e.prototype.watch = function(t) {
          this.startTicking();
          var e = h();
          return this.queue.push({ callback: t, id: e }), e;
        }),
        e
      );
    })(N),
    V = (function(t) {
      function e(e) {
        var i = t.call(this, void 0, window) || this;
        return (i.predicate = e), i;
      }
      return (
        H(e, t),
        (e.prototype.applyQueue = function(e) {
          this.predicate(e) && t.prototype.applyQueue.call(this, e);
        }),
        e
      );
    })(j),
    U = (function(t) {
      function e(e, i, n) {
        void 0 === n && (n = !1);
        var o = t.call(this, e, i) || this;
        return (o.lastVersion = A.version), (o.queue = new C()), (o.ALLOW_CACHED_SCHEDULER = n), o;
      }
      return (
        H(e, t),
        Object.defineProperty(e.prototype, 'isDirty', {
          get: function() {
            return A.version !== this.lastVersion;
          },
          enumerable: !0,
          configurable: !0
        }),
        (e.prototype.applyQueue = function(t) {
          for (var e = 0; e < this.queue.items.length; e++) {
            var n = this.queue.items[e],
              o = n.callback,
              r = n.el,
              s = n.id,
              h = n.clientRect;
            (!this.isDirty && h && this.ALLOW_CACHED_SCHEDULER) || (h = this.queue.items[e].clientRect = i(r)),
              o(t, s, h);
          }
          this.lastVersion = A.version;
        }),
        (e.prototype.watch = function(t, e, i) {
          this.startTicking(), (i = i || h());
          return this.queue.push({ el: t, callback: e, id: i, clientRect: null }), i;
        }),
        e
      );
    })(N),
    P = null,
    Q = (function() {
      function t() {
        this.queue = new I();
      }
      return (
        (t.prototype.listen = function(t) {
          this.queue.push(t);
        }),
        (t.prototype.unlisten = function(t) {
          this.queue.remove(t);
        }),
        (t.prototype.trigger = function(t) {
          for (var e = 0; e < this.queue.items.length; e++) this.queue.items[e](t);
        }),
        t
      );
    })(),
    F = (function() {
      function t(t) {
        this.scheduler = new V(t.bind(this));
      }
      return (
        (t.prototype.trigger = function() {}),
        (t.prototype.listen = function(t) {
          (this.state = B.generate()), this.scheduler.watch(t);
        }),
        (t.prototype.unlisten = function(t) {
          this.scheduler.unwatch(t);
        }),
        t
      );
    })(),
    G = null;
  A.hasDOM &&
    (window.addEventListener('beforeunload', function() {
      d('beforeunload'), d('destroy');
    }),
    document.addEventListener('visibilitychange', function() {
      d('visible' === document.visibilityState ? 'show' : 'hide');
    }));
  var X = (function() {
      function t(t, e) {
        void 0 === e && (e = {}),
          (this.records = {}),
          (this.callback = t),
          (e.threshold = e.threshold || 0),
          (this.rootMarginObj = m(e.rootMargin || '0px')),
          (this.root = e.root || null),
          Array.isArray(e.threshold) ? (this.thresholds = e.threshold) : (this.thresholds = [e.threshold]),
          (this.scheduler = new U(void 0, this.root, e.ALLOW_CACHED_SCHEDULER));
      }
      return (
        (t.prototype.observe = function(t) {
          var e = this,
            i = t,
            n = (i.__spanielId = i.__spanielId || h());
          return (
            this.scheduler.watch(
              t,
              function(t, n, o) {
                e.onTick(t, n, o, i);
              },
              i.__spanielId
            ),
            n
          );
        }),
        (t.prototype.onTick = function(t, e, i, n) {
          var o = this,
            r = this.generateEntryEvent(t, i, n),
            s = r.numSatisfiedThresholds,
            h = r.entry,
            u = this.records[e] || (this.records[e] = { entry: h, numSatisfiedThresholds: 0 });
          (s === u.numSatisfiedThresholds && h.isIntersecting === u.entry.isIntersecting) ||
            ((u.numSatisfiedThresholds = s),
            (u.entry = h),
            this.scheduler.scheduleWork(function() {
              o.callback([h]);
            }));
        }),
        (t.prototype.unobserve = function(t) {
          this.scheduler.unwatch(t.__spanielId), delete this.records[t.__spanielId];
        }),
        (t.prototype.disconnect = function() {
          this.scheduler.unwatchAll(), (this.records = {});
        }),
        (t.prototype.takeRecords = function() {
          return [];
        }),
        (t.prototype.generateEntryEvent = function(t, e, i) {
          for (var n = 0, o = b(t, e, i, this.rootMarginObj), r = 0; r < this.thresholds.length; r++) {
            var s = this.thresholds[r];
            o.intersectionRatio >= s && n++;
          }
          return { numSatisfiedThresholds: n, entry: o };
        }),
        t
      );
    })(),
    K = { x: 0, y: 0, width: 0, height: 0 },
    z = (function() {
      function t(t, e) {
        var i = this;
        (this.paused = !1), (this.queuedEntries = []), (this.recordStore = {}), (this.callback = t);
        var n = e || { threshold: [] },
          o = n.root,
          r = n.rootMargin,
          s = n.threshold,
          h = n.ALLOW_CACHED_SCHEDULER,
          u = n.BACKGROUND_TAB_FIX,
          c = n.USE_NATIVE_IO;
        r = r || '0px';
        var a = 'string' != typeof r ? w(r) : r;
        this.thresholds = s.sort(function(t) {
          return t.ratio;
        });
        var d = {
          root: o,
          rootMargin: a,
          threshold: this.thresholds.map(function(t) {
            return t.ratio;
          }),
          ALLOW_CACHED_SCHEDULER: h
        };
        this.usingNativeIo = !!c && !!A.IntersectionObserver;
        var f = this.usingNativeIo ? A.IntersectionObserver : X;
        (this.observer = new f(function(t) {
          return i.internalCallback(t);
        }, d)),
          (this.onTabHidden = this._onTabHidden.bind(this)),
          (this.onWindowClosed = this._onWindowClosed.bind(this)),
          (this.onTabShown = this._onTabShown.bind(this)),
          A.hasDOM &&
            (l('beforeunload', this.onWindowClosed),
            l('hide', this.onTabHidden),
            l('show', this.onTabShown),
            u && (this.paused = 'visible' !== A.document.visibilityState));
      }
      return (
        (t.prototype._onWindowClosed = function() {
          this.onTabHidden();
        }),
        (t.prototype.setAllHidden = function() {
          for (var t = Object.keys(this.recordStore), e = 0; e < t.length; e++)
            this.handleRecordExiting(this.recordStore[t[e]]);
          this.flushQueuedEntries();
        }),
        (t.prototype._onTabHidden = function() {
          (this.paused = !0), this.setAllHidden();
        }),
        (t.prototype._onTabShown = function() {
          this.paused = !1;
          for (var t = Object.keys(this.recordStore), e = performance.now(), i = Date.now(), n = 0; n < t.length; n++) {
            var o = this.recordStore[t[n]].lastSeenEntry;
            if (o) {
              var r = o.intersectionRatio,
                s = o.boundingClientRect,
                h = o.rootBounds,
                u = o.intersectionRect,
                c = o.isIntersecting,
                l = o.target;
              this.handleObserverEntry({
                intersectionRatio: r,
                boundingClientRect: s,
                time: i,
                highResTime: e,
                unixTime: i,
                isIntersecting: c,
                rootBounds: h,
                intersectionRect: u,
                target: l
              });
            }
          }
        }),
        (t.prototype.internalCallback = function(t) {
          t.forEach(this.handleObserverEntry.bind(this));
        }),
        (t.prototype.flushQueuedEntries = function() {
          this.queuedEntries.length > 0 && (this.callback(this.queuedEntries), (this.queuedEntries = []));
        }),
        (t.prototype.generateSpanielEntry = function(t, e) {
          var i = t.intersectionRatio,
            n = t.rootBounds,
            o = t.boundingClientRect,
            r = t.intersectionRect,
            s = t.isIntersecting,
            h = t.time,
            u = t.target,
            c = this.recordStore[u.__spanielId],
            l = this.usingNativeIo
              ? Math.floor(A.performance.timeOrigin || A.performance.timing.navigationStart + h)
              : h,
            a = this.usingNativeIo ? h : t.highResTime;
          if (!a) throw new Error('Missing high res timestamp');
          return {
            intersectionRatio: i,
            isIntersecting: s,
            unixTime: l,
            highResTime: a,
            rootBounds: n,
            boundingClientRect: o,
            intersectionRect: r,
            target: u,
            duration: 0,
            entering: !1,
            payload: c.payload,
            label: e.threshold.label
          };
        }),
        (t.prototype.calculateDuration = function(t, e, i) {
          return this.usingNativeIo ? i - t.highResTime : e - t.unixTime;
        }),
        (t.prototype.handleRecordExiting = function(t) {
          var e = this,
            i = Date.now(),
            n = performance.now();
          t.thresholdStates.forEach(function(o) {
            var r = t.lastSeenEntry && t.lastSeenEntry.boundingClientRect;
            e.handleThresholdExiting(
              {
                intersectionRatio: -1,
                isIntersecting: !1,
                unixTime: i,
                highResTime: n,
                payload: t.payload,
                label: o.threshold.label,
                entering: !1,
                rootBounds: K,
                boundingClientRect: r || K,
                intersectionRect: K,
                duration: e.calculateDuration(o.lastVisible, i, n),
                target: t.target
              },
              o
            ),
              (o.lastSatisfied = !1),
              (o.visible = !1),
              (o.lastEntry = null);
          });
        }),
        (t.prototype.handleThresholdExiting = function(t, e) {
          var i = t.highResTime,
            n = !!e.threshold.time;
          e.lastSatisfied &&
            (!n || (n && e.visible)) &&
            ((t.duration = i - e.lastVisible.highResTime),
            (t.entering = !1),
            (e.visible = !1),
            this.queuedEntries.push(t)),
            clearTimeout(e.timeoutId);
        }),
        (t.prototype.handleObserverEntry = function(t) {
          var i = this,
            n = t.target,
            o = this.recordStore[n.__spanielId];
          o &&
            ((o.lastSeenEntry = t),
            this.paused ||
              (o.thresholdStates.forEach(function(n) {
                var o = !!n.threshold.time,
                  r = i.generateSpanielEntry(t, n),
                  s = t.intersectionRatio >= n.threshold.ratio,
                  h = 'boolean' == typeof r.isIntersecting ? r.isIntersecting : e(t),
                  u = s && h;
                if (u != n.lastSatisfied) {
                  if (u)
                    if (((r.entering = !0), o)) {
                      n.lastVisible = { highResTime: r.highResTime, unixTime: r.unixTime };
                      var c = Number(
                        setTimeout(function() {
                          (n.visible = !0),
                            (r.duration = performance.now() - n.lastVisible.highResTime),
                            i.callback([r]);
                        }, n.threshold.time)
                      );
                      n.timeoutId = c;
                    } else (n.visible = !0), i.queuedEntries.push(r);
                  else i.handleThresholdExiting(r, n);
                  (n.lastEntry = t), (n.lastSatisfied = u);
                }
              }),
              this.flushQueuedEntries()));
        }),
        (t.prototype.disconnect = function() {
          this.setAllHidden(), this.observer.disconnect(), (this.recordStore = {});
        }),
        (t.prototype.destroy = function() {
          this.disconnect(),
            A.hasDOM &&
              (a('beforeunload', this.onWindowClosed), a('hide', this.onTabHidden), a('show', this.onTabShown));
        }),
        (t.prototype.unobserve = function(t) {
          var e = this,
            i = this.recordStore[t.__spanielId];
          i &&
            (delete this.recordStore[t.__spanielId],
            this.observer.unobserve(t),
            f(function() {
              e.handleRecordExiting(i), e.flushQueuedEntries();
            }));
        }),
        (t.prototype.observe = function(t, e) {
          void 0 === e && (e = null);
          var i = t,
            n = (i.__spanielId = i.__spanielId || h());
          return (
            (this.recordStore[n] = {
              target: i,
              payload: e,
              lastSeenEntry: null,
              thresholdStates: this.thresholds.map(function(t) {
                return {
                  lastSatisfied: !1,
                  lastEntry: null,
                  threshold: t,
                  visible: !1,
                  lastVisible: { unixTime: 0, highResTime: -1 }
                };
              })
            }),
            this.observer.observe(i),
            n
          );
        }),
        t
      );
    })(),
    Y = (function() {
      function t(t) {
        void 0 === t && (t = {});
        var e = t.time,
          i = t.ratio,
          n = t.rootMargin,
          o = t.root,
          r = t.ALLOW_CACHED_SCHEDULER,
          s = t.BACKGROUND_TAB_FIX,
          h = t.USE_NATIVE_IO,
          u = [{ label: 'exposed', time: 0, ratio: 0 }];
        e && u.push({ label: 'impressed', time: e, ratio: i || 0 }),
          i && u.push({ label: 'visible', time: 0, ratio: i }),
          (this.observer = new z(R, {
            rootMargin: n,
            threshold: u,
            root: o,
            ALLOW_CACHED_SCHEDULER: r,
            BACKGROUND_TAB_FIX: s,
            USE_NATIVE_IO: h
          }));
      }
      return (
        (t.prototype.watch = function(t, e) {
          this.observer.observe(t, { callback: e });
        }),
        (t.prototype.unwatch = function(t) {
          this.observer.unobserve(t);
        }),
        (t.prototype.disconnect = function() {
          this.observer.disconnect();
        }),
        (t.prototype.destroy = function() {
          this.observer.destroy();
        }),
        t
      );
    })(),
    J = A.IntersectionObserver ? A.IntersectionObserver : X;
  (t.on = l),
    (t.off = a),
    (t.scheduleRead = p),
    (t.scheduleWork = f),
    (t.IntersectionObserver = J),
    (t.SpanielObserver = z),
    (t.setGlobalEngine = r),
    (t.getGlobalEngine = s),
    (t.__w__ = A),
    (t.invalidate = n),
    (t.queryElement = T),
    (t.elementSatisfiesRatio = E),
    (t.Watcher = Y),
    Object.defineProperty(t, '__esModule', { value: !0 });
});
//# sourceMappingURL=spaniel.map
