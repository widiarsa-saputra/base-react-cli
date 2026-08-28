#!/usr/bin/env node
import {
  f,
  h,
  k,
  m
} from "./chunk-SXKGPWLZ.js";

// node_modules/degit/dist/client-D0hMiRUX.js
import i from "fs";
import a from "path";
import { execFile as o, spawn as s } from "child_process";
import { promisify as c } from "util";
var l = f(((e, t) => {
  var n = function(e2) {
    if (e2 ||= {}, this.Promise = e2.Promise || Promise, this.queues = /* @__PURE__ */ Object.create(null), this.domainReentrant = e2.domainReentrant || false, this.domainReentrant) {
      if (typeof process > `u` || process.domain === void 0) throw Error("Domain-reentrant locks require `process.domain` to exist. Please flip `opts.domainReentrant = false`, use a NodeJS version that still implements Domain, or install a browser polyfill.");
      this.domains = /* @__PURE__ */ Object.create(null);
    }
    this.timeout = e2.timeout || n.DEFAULT_TIMEOUT, this.maxOccupationTime = e2.maxOccupationTime || n.DEFAULT_MAX_OCCUPATION_TIME, this.maxExecutionTime = e2.maxExecutionTime || n.DEFAULT_MAX_EXECUTION_TIME, e2.maxPending === 1 / 0 || Number.isInteger(e2.maxPending) && e2.maxPending >= 0 ? this.maxPending = e2.maxPending : this.maxPending = n.DEFAULT_MAX_PENDING;
  };
  n.DEFAULT_TIMEOUT = 0, n.DEFAULT_MAX_OCCUPATION_TIME = 0, n.DEFAULT_MAX_EXECUTION_TIME = 0, n.DEFAULT_MAX_PENDING = 1e3, n.prototype.acquire = function(e2, t2, n2, r) {
    if (Array.isArray(e2)) return this._acquireBatch(e2, t2, n2, r);
    if (typeof t2 != `function`) throw Error(`You must pass a function to execute`);
    var i2 = null, a2 = null, o2 = null;
    typeof n2 != `function` && (r = n2, n2 = null, o2 = new this.Promise(function(e3, t3) {
      i2 = e3, a2 = t3;
    })), r ||= {};
    var s2 = false, c2 = null, l2 = null, u2 = null, d2 = this, f3 = function(t3, r2, c3) {
      l2 &&= (clearTimeout(l2), null), u2 &&= (clearTimeout(u2), null), t3 && (d2.queues[e2] && d2.queues[e2].length === 0 && delete d2.queues[e2], d2.domainReentrant && delete d2.domains[e2]), s2 ||= (o2 ? r2 ? a2(r2) : i2(c3) : typeof n2 == `function` && n2(r2, c3), true), t3 && d2.queues[e2] && d2.queues[e2].length > 0 && d2.queues[e2].shift()();
    }, p2 = function(n3) {
      if (s2) return f3(n3);
      c2 &&= (clearTimeout(c2), null), d2.domainReentrant && n3 && (d2.domains[e2] = process.domain);
      var i3 = r.maxExecutionTime || d2.maxExecutionTime;
      if (i3 && (u2 = setTimeout(function() {
        d2.queues[e2] && f3(n3, Error(`Maximum execution time is exceeded ` + e2));
      }, i3)), t2.length === 1) {
        var a3 = false;
        try {
          t2(function(e3, t3) {
            a3 || (a3 = true, f3(n3, e3, t3));
          });
        } catch (e3) {
          a3 || (a3 = true, f3(n3, e3));
        }
      } else d2._promiseTry(function() {
        return t2();
      }).then(function(e3) {
        f3(n3, void 0, e3);
      }, function(e3) {
        f3(n3, e3);
      });
    };
    d2.domainReentrant && process.domain && (p2 = process.domain.bind(p2));
    var m3 = r.maxPending || d2.maxPending;
    if (!d2.queues[e2]) d2.queues[e2] = [], p2(true);
    else if (d2.domainReentrant && process.domain && process.domain === d2.domains[e2]) p2(false);
    else if (d2.queues[e2].length >= m3) f3(false, Error(`Too many pending tasks in queue ` + e2));
    else {
      var h3 = function() {
        p2(true);
      };
      r.skipQueue ? d2.queues[e2].unshift(h3) : d2.queues[e2].push(h3);
      var g2 = r.timeout || d2.timeout;
      g2 && (c2 = setTimeout(function() {
        c2 = null, f3(false, Error(`async-lock timed out in queue ` + e2));
      }, g2));
    }
    var _2 = r.maxOccupationTime || d2.maxOccupationTime;
    if (_2 && (l2 = setTimeout(function() {
      d2.queues[e2] && f3(false, Error(`Maximum occupation time is exceeded in queue ` + e2));
    }, _2)), o2) return o2;
  }, n.prototype._acquireBatch = function(e2, t2, n2, r) {
    typeof n2 != `function` && (r = n2, n2 = null);
    var i2 = this, a2 = function(e3, t3) {
      return function(n3) {
        i2.acquire(e3, t3, n3, r);
      };
    }, o2 = e2.reduceRight(function(e3, t3) {
      return a2(t3, e3);
    }, t2);
    if (typeof n2 == `function`) o2(n2);
    else return new this.Promise(function(e3, t3) {
      o2.length === 1 ? o2(function(n3, r2) {
        n3 ? t3(n3) : e3(r2);
      }) : e3(o2());
    });
  }, n.prototype.isBusy = function(e2) {
    return e2 ? !!this.queues[e2] : Object.keys(this.queues).length > 0;
  }, n.prototype._promiseTry = function(e2) {
    try {
      return this.Promise.resolve(e2());
    } catch (e3) {
      return this.Promise.reject(e3);
    }
  }, t.exports = n;
}));
var u = f(((e, t) => {
  t.exports = l();
}));
var d = f(((e, t) => {
  typeof Object.create == `function` ? t.exports = function(e2, t2) {
    t2 && (e2.super_ = t2, e2.prototype = Object.create(t2.prototype, { constructor: { value: e2, enumerable: false, writable: true, configurable: true } }));
  } : t.exports = function(e2, t2) {
    if (t2) {
      e2.super_ = t2;
      var n = function() {
      };
      n.prototype = t2.prototype, e2.prototype = new n(), e2.prototype.constructor = e2;
    }
  };
}));
var f2 = f(((t, n) => {
  try {
    var r = h(`util`);
    if (typeof r.inherits != `function`) throw ``;
    n.exports = r.inherits;
  } catch {
    n.exports = d();
  }
}));
var p = f(((t, n) => {
  var r = h(`buffer`), i2 = r.Buffer;
  function a2(e, t2) {
    for (var n2 in e) t2[n2] = e[n2];
  }
  i2.from && i2.alloc && i2.allocUnsafe && i2.allocUnsafeSlow ? n.exports = r : (a2(r, t), t.Buffer = o2);
  function o2(e, t2, n2) {
    return i2(e, t2, n2);
  }
  o2.prototype = Object.create(i2.prototype), a2(i2, o2), o2.from = function(e, t2, n2) {
    if (typeof e == `number`) throw TypeError(`Argument must not be a number`);
    return i2(e, t2, n2);
  }, o2.alloc = function(e, t2, n2) {
    if (typeof e != `number`) throw TypeError(`Argument must be a number`);
    var r2 = i2(e);
    return t2 === void 0 ? r2.fill(0) : typeof n2 == `string` ? r2.fill(t2, n2) : r2.fill(t2), r2;
  }, o2.allocUnsafe = function(e) {
    if (typeof e != `number`) throw TypeError(`Argument must be a number`);
    return i2(e);
  }, o2.allocUnsafeSlow = function(e) {
    if (typeof e != `number`) throw TypeError(`Argument must be a number`);
    return r.SlowBuffer(e);
  };
}));
var m2 = f(((e, t) => {
  var n = {}.toString;
  t.exports = Array.isArray || function(e2) {
    return n.call(e2) == `[object Array]`;
  };
}));
var h2 = f(((e, t) => {
  t.exports = TypeError;
}));
var g = f(((e, t) => {
  t.exports = Object;
}));
var _ = f(((e, t) => {
  t.exports = Error;
}));
var v = f(((e, t) => {
  t.exports = EvalError;
}));
var y = f(((e, t) => {
  t.exports = RangeError;
}));
var b = f(((e, t) => {
  t.exports = ReferenceError;
}));
var x = f(((e, t) => {
  t.exports = SyntaxError;
}));
var S = f(((e, t) => {
  t.exports = URIError;
}));
var C = f(((e, t) => {
  t.exports = Math.abs;
}));
var w = f(((e, t) => {
  t.exports = Math.floor;
}));
var T = f(((e, t) => {
  t.exports = Math.max;
}));
var E = f(((e, t) => {
  t.exports = Math.min;
}));
var D = f(((e, t) => {
  t.exports = Math.pow;
}));
var O = f(((e, t) => {
  t.exports = Math.round;
}));
var k2 = f(((e, t) => {
  t.exports = Number.isNaN || function(e2) {
    return e2 !== e2;
  };
}));
var A = f(((e, t) => {
  var n = k2();
  t.exports = function(e2) {
    return n(e2) || e2 === 0 ? e2 : e2 < 0 ? -1 : 1;
  };
}));
var j = f(((e, t) => {
  t.exports = Object.getOwnPropertyDescriptor;
}));
var M = f(((e, t) => {
  var n = j();
  if (n) try {
    n([], `length`);
  } catch {
    n = null;
  }
  t.exports = n;
}));
var N = f(((e, t) => {
  var n = Object.defineProperty || false;
  if (n) try {
    n({}, `a`, { value: 1 });
  } catch {
    n = false;
  }
  t.exports = n;
}));
var P = f(((e, t) => {
  t.exports = function() {
    if (typeof Symbol != `function` || typeof Object.getOwnPropertySymbols != `function`) return false;
    if (typeof Symbol.iterator == `symbol`) return true;
    var e2 = {}, t2 = /* @__PURE__ */ Symbol(`test`), n = Object(t2);
    if (typeof t2 == `string` || Object.prototype.toString.call(t2) !== `[object Symbol]` || Object.prototype.toString.call(n) !== `[object Symbol]`) return false;
    var r = 42;
    for (var i2 in e2[t2] = r, e2) return false;
    if (typeof Object.keys == `function` && Object.keys(e2).length !== 0 || typeof Object.getOwnPropertyNames == `function` && Object.getOwnPropertyNames(e2).length !== 0) return false;
    var a2 = Object.getOwnPropertySymbols(e2);
    if (a2.length !== 1 || a2[0] !== t2 || !Object.prototype.propertyIsEnumerable.call(e2, t2)) return false;
    if (typeof Object.getOwnPropertyDescriptor == `function`) {
      var o2 = Object.getOwnPropertyDescriptor(e2, t2);
      if (o2.value !== r || o2.enumerable !== true) return false;
    }
    return true;
  };
}));
var F = f(((e, t) => {
  var n = typeof Symbol < `u` && Symbol, r = P();
  t.exports = function() {
    return typeof n != `function` || typeof Symbol != `function` || typeof n(`foo`) != `symbol` || typeof /* @__PURE__ */ Symbol(`bar`) != `symbol` ? false : r();
  };
}));
var ee = f(((e, t) => {
  t.exports = typeof Reflect < `u` && Reflect.getPrototypeOf || null;
}));
var I = f(((e, t) => {
  t.exports = g().getPrototypeOf || null;
}));
var L = f(((e, t) => {
  var n = `Function.prototype.bind called on incompatible `, r = Object.prototype.toString, i2 = Math.max, a2 = `[object Function]`, o2 = function(e2, t2) {
    for (var n2 = [], r2 = 0; r2 < e2.length; r2 += 1) n2[r2] = e2[r2];
    for (var i3 = 0; i3 < t2.length; i3 += 1) n2[i3 + e2.length] = t2[i3];
    return n2;
  }, s2 = function(e2, t2) {
    for (var n2 = [], r2 = t2 || 0, i3 = 0; r2 < e2.length; r2 += 1, i3 += 1) n2[i3] = e2[r2];
    return n2;
  }, c2 = function(e2, t2) {
    for (var n2 = ``, r2 = 0; r2 < e2.length; r2 += 1) n2 += e2[r2], r2 + 1 < e2.length && (n2 += t2);
    return n2;
  };
  t.exports = function(e2) {
    var t2 = this;
    if (typeof t2 != `function` || r.apply(t2) !== a2) throw TypeError(n + t2);
    for (var l2 = s2(arguments, 1), u2, d2 = function() {
      if (this instanceof u2) {
        var n2 = t2.apply(this, o2(l2, arguments));
        return Object(n2) === n2 ? n2 : this;
      }
      return t2.apply(e2, o2(l2, arguments));
    }, f3 = i2(0, t2.length - l2.length), p2 = [], m3 = 0; m3 < f3; m3++) p2[m3] = `$` + m3;
    if (u2 = Function(`binder`, `return function (` + c2(p2, `,`) + `){ return binder.apply(this,arguments); }`)(d2), t2.prototype) {
      var h3 = function() {
      };
      h3.prototype = t2.prototype, u2.prototype = new h3(), h3.prototype = null;
    }
    return u2;
  };
}));
var R = f(((e, t) => {
  var n = L();
  t.exports = Function.prototype.bind || n;
}));
var te = f(((e, t) => {
  t.exports = Function.prototype.call;
}));
var ne = f(((e, t) => {
  t.exports = Function.prototype.apply;
}));
var z = f(((e, t) => {
  t.exports = typeof Reflect < `u` && Reflect && Reflect.apply;
}));
var B = f(((e, t) => {
  var n = R(), r = ne(), i2 = te();
  t.exports = z() || n.call(i2, r);
}));
var V = f(((e, t) => {
  var n = R(), r = h2(), i2 = te(), a2 = B();
  t.exports = function(e2) {
    if (e2.length < 1 || typeof e2[0] != `function`) throw new r(`a function is required`);
    return a2(n, i2, e2);
  };
}));
var H = f(((e, t) => {
  var n = V(), r = M(), i2;
  try {
    i2 = [].__proto__ === Array.prototype;
  } catch (e2) {
    if (!e2 || typeof e2 != `object` || !(`code` in e2) || e2.code !== `ERR_PROTO_ACCESS`) throw e2;
  }
  var a2 = !!i2 && r && r(Object.prototype, `__proto__`), o2 = Object, s2 = o2.getPrototypeOf;
  t.exports = a2 && typeof a2.get == `function` ? n([a2.get]) : typeof s2 == `function` ? function(e2) {
    return s2(e2 == null ? e2 : o2(e2));
  } : false;
}));
var re = f(((e, t) => {
  var n = ee(), r = I(), i2 = H();
  t.exports = n ? function(e2) {
    return n(e2);
  } : r ? function(e2) {
    if (!e2 || typeof e2 != `object` && typeof e2 != `function`) throw TypeError(`getProto: not an object`);
    return r(e2);
  } : i2 ? function(e2) {
    return i2(e2);
  } : null;
}));
var ie = f(((e, t) => {
  var n = Function.prototype.call, r = Object.prototype.hasOwnProperty;
  t.exports = R().call(n, r);
}));
var ae = f(((e, t) => {
  var n, r = g(), i2 = _(), a2 = v(), o2 = y(), s2 = b(), c2 = x(), l2 = h2(), u2 = S(), d2 = C(), f3 = w(), p2 = T(), m3 = E(), k3 = D(), j2 = O(), P2 = A(), L2 = Function, z2 = function(e2) {
    try {
      return L2(`"use strict"; return (` + e2 + `).constructor;`)();
    } catch {
    }
  }, B2 = M(), V2 = N(), H2 = function() {
    throw new l2();
  }, ae2 = B2 ? (function() {
    try {
      return arguments.callee, H2;
    } catch {
      try {
        return B2(arguments, `callee`).get;
      } catch {
        return H2;
      }
    }
  })() : H2, U2 = F()(), W2 = re(), oe2 = I(), se2 = ee(), G2 = ne(), K2 = te(), ce2 = {}, le2 = typeof Uint8Array > `u` || !W2 ? n : W2(Uint8Array), q2 = { __proto__: null, "%AggregateError%": typeof AggregateError > `u` ? n : AggregateError, "%Array%": Array, "%ArrayBuffer%": typeof ArrayBuffer > `u` ? n : ArrayBuffer, "%ArrayIteratorPrototype%": U2 && W2 ? W2([][Symbol.iterator]()) : n, "%AsyncFromSyncIteratorPrototype%": n, "%AsyncFunction%": ce2, "%AsyncGenerator%": ce2, "%AsyncGeneratorFunction%": ce2, "%AsyncIteratorPrototype%": ce2, "%Atomics%": typeof Atomics > `u` ? n : Atomics, "%BigInt%": typeof BigInt > `u` ? n : BigInt, "%BigInt64Array%": typeof BigInt64Array > `u` ? n : BigInt64Array, "%BigUint64Array%": typeof BigUint64Array > `u` ? n : BigUint64Array, "%Boolean%": Boolean, "%DataView%": typeof DataView > `u` ? n : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": i2, "%eval%": eval, "%EvalError%": a2, "%Float16Array%": typeof Float16Array > `u` ? n : Float16Array, "%Float32Array%": typeof Float32Array > `u` ? n : Float32Array, "%Float64Array%": typeof Float64Array > `u` ? n : Float64Array, "%FinalizationRegistry%": typeof FinalizationRegistry > `u` ? n : FinalizationRegistry, "%Function%": L2, "%GeneratorFunction%": ce2, "%Int8Array%": typeof Int8Array > `u` ? n : Int8Array, "%Int16Array%": typeof Int16Array > `u` ? n : Int16Array, "%Int32Array%": typeof Int32Array > `u` ? n : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": U2 && W2 ? W2(W2([][Symbol.iterator]())) : n, "%JSON%": typeof JSON == `object` ? JSON : n, "%Map%": typeof Map > `u` ? n : Map, "%MapIteratorPrototype%": typeof Map > `u` || !U2 || !W2 ? n : W2((/* @__PURE__ */ new Map())[Symbol.iterator]()), "%Math%": Math, "%Number%": Number, "%Object%": r, "%Object.getOwnPropertyDescriptor%": B2, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": typeof Promise > `u` ? n : Promise, "%Proxy%": typeof Proxy > `u` ? n : Proxy, "%RangeError%": o2, "%ReferenceError%": s2, "%Reflect%": typeof Reflect > `u` ? n : Reflect, "%RegExp%": RegExp, "%Set%": typeof Set > `u` ? n : Set, "%SetIteratorPrototype%": typeof Set > `u` || !U2 || !W2 ? n : W2((/* @__PURE__ */ new Set())[Symbol.iterator]()), "%SharedArrayBuffer%": typeof SharedArrayBuffer > `u` ? n : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": U2 && W2 ? W2(``[Symbol.iterator]()) : n, "%Symbol%": U2 ? Symbol : n, "%SyntaxError%": c2, "%ThrowTypeError%": ae2, "%TypedArray%": le2, "%TypeError%": l2, "%Uint8Array%": typeof Uint8Array > `u` ? n : Uint8Array, "%Uint8ClampedArray%": typeof Uint8ClampedArray > `u` ? n : Uint8ClampedArray, "%Uint16Array%": typeof Uint16Array > `u` ? n : Uint16Array, "%Uint32Array%": typeof Uint32Array > `u` ? n : Uint32Array, "%URIError%": u2, "%WeakMap%": typeof WeakMap > `u` ? n : WeakMap, "%WeakRef%": typeof WeakRef > `u` ? n : WeakRef, "%WeakSet%": typeof WeakSet > `u` ? n : WeakSet, "%Function.prototype.call%": K2, "%Function.prototype.apply%": G2, "%Object.defineProperty%": V2, "%Object.getPrototypeOf%": oe2, "%Math.abs%": d2, "%Math.floor%": f3, "%Math.max%": p2, "%Math.min%": m3, "%Math.pow%": k3, "%Math.round%": j2, "%Math.sign%": P2, "%Reflect.getPrototypeOf%": se2 };
  if (W2) try {
    null.error;
  } catch (e2) {
    q2[`%Error.prototype%`] = W2(W2(e2));
  }
  var ue2 = function e2(t2) {
    var n2;
    if (t2 === `%AsyncFunction%`) n2 = z2(`async function () {}`);
    else if (t2 === `%GeneratorFunction%`) n2 = z2(`function* () {}`);
    else if (t2 === `%AsyncGeneratorFunction%`) n2 = z2(`async function* () {}`);
    else if (t2 === `%AsyncGenerator%`) {
      var r2 = e2(`%AsyncGeneratorFunction%`);
      r2 && (n2 = r2.prototype);
    } else if (t2 === `%AsyncIteratorPrototype%`) {
      var i3 = e2(`%AsyncGenerator%`);
      i3 && W2 && (n2 = W2(i3.prototype));
    }
    return q2[t2] = n2, n2;
  }, J2 = { __proto__: null, "%ArrayBufferPrototype%": [`ArrayBuffer`, `prototype`], "%ArrayPrototype%": [`Array`, `prototype`], "%ArrayProto_entries%": [`Array`, `prototype`, `entries`], "%ArrayProto_forEach%": [`Array`, `prototype`, `forEach`], "%ArrayProto_keys%": [`Array`, `prototype`, `keys`], "%ArrayProto_values%": [`Array`, `prototype`, `values`], "%AsyncFunctionPrototype%": [`AsyncFunction`, `prototype`], "%AsyncGenerator%": [`AsyncGeneratorFunction`, `prototype`], "%AsyncGeneratorPrototype%": [`AsyncGeneratorFunction`, `prototype`, `prototype`], "%BooleanPrototype%": [`Boolean`, `prototype`], "%DataViewPrototype%": [`DataView`, `prototype`], "%DatePrototype%": [`Date`, `prototype`], "%ErrorPrototype%": [`Error`, `prototype`], "%EvalErrorPrototype%": [`EvalError`, `prototype`], "%Float32ArrayPrototype%": [`Float32Array`, `prototype`], "%Float64ArrayPrototype%": [`Float64Array`, `prototype`], "%FunctionPrototype%": [`Function`, `prototype`], "%Generator%": [`GeneratorFunction`, `prototype`], "%GeneratorPrototype%": [`GeneratorFunction`, `prototype`, `prototype`], "%Int8ArrayPrototype%": [`Int8Array`, `prototype`], "%Int16ArrayPrototype%": [`Int16Array`, `prototype`], "%Int32ArrayPrototype%": [`Int32Array`, `prototype`], "%JSONParse%": [`JSON`, `parse`], "%JSONStringify%": [`JSON`, `stringify`], "%MapPrototype%": [`Map`, `prototype`], "%NumberPrototype%": [`Number`, `prototype`], "%ObjectPrototype%": [`Object`, `prototype`], "%ObjProto_toString%": [`Object`, `prototype`, `toString`], "%ObjProto_valueOf%": [`Object`, `prototype`, `valueOf`], "%PromisePrototype%": [`Promise`, `prototype`], "%PromiseProto_then%": [`Promise`, `prototype`, `then`], "%Promise_all%": [`Promise`, `all`], "%Promise_reject%": [`Promise`, `reject`], "%Promise_resolve%": [`Promise`, `resolve`], "%RangeErrorPrototype%": [`RangeError`, `prototype`], "%ReferenceErrorPrototype%": [`ReferenceError`, `prototype`], "%RegExpPrototype%": [`RegExp`, `prototype`], "%SetPrototype%": [`Set`, `prototype`], "%SharedArrayBufferPrototype%": [`SharedArrayBuffer`, `prototype`], "%StringPrototype%": [`String`, `prototype`], "%SymbolPrototype%": [`Symbol`, `prototype`], "%SyntaxErrorPrototype%": [`SyntaxError`, `prototype`], "%TypedArrayPrototype%": [`TypedArray`, `prototype`], "%TypeErrorPrototype%": [`TypeError`, `prototype`], "%Uint8ArrayPrototype%": [`Uint8Array`, `prototype`], "%Uint8ClampedArrayPrototype%": [`Uint8ClampedArray`, `prototype`], "%Uint16ArrayPrototype%": [`Uint16Array`, `prototype`], "%Uint32ArrayPrototype%": [`Uint32Array`, `prototype`], "%URIErrorPrototype%": [`URIError`, `prototype`], "%WeakMapPrototype%": [`WeakMap`, `prototype`], "%WeakSetPrototype%": [`WeakSet`, `prototype`] }, Y2 = R(), X2 = ie(), Z2 = Y2.call(K2, Array.prototype.concat), de2 = Y2.call(G2, Array.prototype.splice), Q2 = Y2.call(K2, String.prototype.replace), fe2 = Y2.call(K2, String.prototype.slice), pe2 = Y2.call(K2, RegExp.prototype.exec), $2 = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, me2 = /\\(\\)?/g, he2 = function(e2) {
    var t2 = fe2(e2, 0, 1), n2 = fe2(e2, -1);
    if (t2 === `%` && n2 !== `%`) throw new c2("invalid intrinsic syntax, expected closing `%`");
    if (n2 === `%` && t2 !== `%`) throw new c2("invalid intrinsic syntax, expected opening `%`");
    var r2 = [];
    return Q2(e2, $2, function(e3, t3, n3, i3) {
      r2[r2.length] = n3 ? Q2(i3, me2, `$1`) : t3 || e3;
    }), r2;
  }, ge2 = function(e2, t2) {
    var n2 = e2, r2;
    if (X2(J2, n2) && (r2 = J2[n2], n2 = `%` + r2[0] + `%`), X2(q2, n2)) {
      var i3 = q2[n2];
      if (i3 === ce2 && (i3 = ue2(n2)), i3 === void 0 && !t2) throw new l2(`intrinsic ` + e2 + ` exists, but is not available. Please file an issue!`);
      return { alias: r2, name: n2, value: i3 };
    }
    throw new c2(`intrinsic ` + e2 + ` does not exist!`);
  };
  t.exports = function(e2, t2) {
    if (typeof e2 != `string` || e2.length === 0) throw new l2(`intrinsic name must be a non-empty string`);
    if (arguments.length > 1 && typeof t2 != `boolean`) throw new l2(`"allowMissing" argument must be a boolean`);
    if (pe2(/^%?[^%]*%?$/, e2) === null) throw new c2("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var n2 = he2(e2), r2 = n2.length > 0 ? n2[0] : ``, i3 = ge2(`%` + r2 + `%`, t2), a3 = i3.name, o3 = i3.value, s3 = false, u3 = i3.alias;
    u3 && (r2 = u3[0], de2(n2, Z2([0, 1], u3)));
    for (var d3 = 1, f4 = true; d3 < n2.length; d3 += 1) {
      var p3 = n2[d3], m4 = fe2(p3, 0, 1), h3 = fe2(p3, -1);
      if ((m4 === `"` || m4 === `'` || m4 === "`" || h3 === `"` || h3 === `'` || h3 === "`") && m4 !== h3) throw new c2(`property names with quotes must have matching quotes`);
      if ((p3 === `constructor` || !f4) && (s3 = true), r2 += `.` + p3, a3 = `%` + r2 + `%`, X2(q2, a3)) o3 = q2[a3];
      else if (o3 != null) {
        if (!(p3 in o3)) {
          if (!t2) throw new l2(`base intrinsic for ` + e2 + ` exists, but the property is not available.`);
          return;
        }
        if (B2 && d3 + 1 >= n2.length) {
          var g2 = B2(o3, p3);
          f4 = !!g2, o3 = f4 && `get` in g2 && !(`originalValue` in g2.get) ? g2.get : o3[p3];
        } else f4 = X2(o3, p3), o3 = o3[p3];
        f4 && !s3 && (q2[a3] = o3);
      }
    }
    return o3;
  };
}));
var U = f(((e, t) => {
  var n = ae(), r = V(), i2 = r([n(`%String.prototype.indexOf%`)]);
  t.exports = function(e2, t2) {
    var a2 = n(e2, !!t2);
    return typeof a2 == `function` && i2(e2, `.prototype.`) > -1 ? r([a2]) : a2;
  };
}));
var W = f(((e, t) => {
  var n = Function.prototype.toString, r = typeof Reflect == `object` && Reflect !== null && Reflect.apply, i2, a2;
  if (typeof r == `function` && typeof Object.defineProperty == `function`) try {
    i2 = Object.defineProperty({}, `length`, { get: function() {
      throw a2;
    } }), a2 = {}, r(function() {
      throw 42;
    }, null, i2);
  } catch (e2) {
    e2 !== a2 && (r = null);
  }
  else r = null;
  var o2 = /^\s*class\b/, s2 = function(e2) {
    try {
      var t2 = n.call(e2);
      return o2.test(t2);
    } catch {
      return false;
    }
  }, c2 = function(e2) {
    try {
      return s2(e2) ? false : (n.call(e2), true);
    } catch {
      return false;
    }
  }, l2 = Object.prototype.toString, u2 = `[object Object]`, d2 = `[object Function]`, f3 = `[object GeneratorFunction]`, p2 = `[object HTMLAllCollection]`, m3 = `[object HTML document.all class]`, h3 = `[object HTMLCollection]`, g2 = typeof Symbol == `function` && !!Symbol.toStringTag, _2 = !(0 in [,]), v2 = function() {
    return false;
  };
  if (typeof document == `object`) {
    var y2 = document.all;
    l2.call(y2) === l2.call(document.all) && (v2 = function(e2) {
      if ((_2 || !e2) && (e2 === void 0 || typeof e2 == `object`)) try {
        var t2 = l2.call(e2);
        return (t2 === p2 || t2 === m3 || t2 === h3 || t2 === u2) && e2(``) == null;
      } catch {
      }
      return false;
    });
  }
  t.exports = r ? function(e2) {
    if (v2(e2)) return true;
    if (!e2 || typeof e2 != `function` && typeof e2 != `object`) return false;
    try {
      r(e2, null, i2);
    } catch (e3) {
      if (e3 !== a2) return false;
    }
    return !s2(e2) && c2(e2);
  } : function(e2) {
    if (v2(e2)) return true;
    if (!e2 || typeof e2 != `function` && typeof e2 != `object`) return false;
    if (g2) return c2(e2);
    if (s2(e2)) return false;
    var t2 = l2.call(e2);
    return t2 !== d2 && t2 !== f3 && !/^\[object HTML/.test(t2) ? false : c2(e2);
  };
}));
var oe = f(((e, t) => {
  var n = W(), r = Object.prototype.toString, i2 = Object.prototype.hasOwnProperty, a2 = function(e2, t2, n2) {
    for (var r2 = 0, a3 = e2.length; r2 < a3; r2++) i2.call(e2, r2) && (n2 == null ? t2(e2[r2], r2, e2) : t2.call(n2, e2[r2], r2, e2));
  }, o2 = function(e2, t2, n2) {
    for (var r2 = 0, i3 = e2.length; r2 < i3; r2++) n2 == null ? t2(e2.charAt(r2), r2, e2) : t2.call(n2, e2.charAt(r2), r2, e2);
  }, s2 = function(e2, t2, n2) {
    for (var r2 in e2) i2.call(e2, r2) && (n2 == null ? t2(e2[r2], r2, e2) : t2.call(n2, e2[r2], r2, e2));
  };
  function c2(e2) {
    return r.call(e2) === `[object Array]`;
  }
  t.exports = function(e2, t2, r2) {
    if (!n(t2)) throw TypeError(`iterator must be a function`);
    var i3;
    arguments.length >= 3 && (i3 = r2), c2(e2) ? a2(e2, t2, i3) : typeof e2 == `string` ? o2(e2, t2, i3) : s2(e2, t2, i3);
  };
}));
var se = f(((e, t) => {
  t.exports = [`Float16Array`, `Float32Array`, `Float64Array`, `Int8Array`, `Int16Array`, `Int32Array`, `Uint8Array`, `Uint8ClampedArray`, `Uint16Array`, `Uint32Array`, `BigInt64Array`, `BigUint64Array`];
}));
var G = f(((e, t) => {
  var n = se(), r = typeof globalThis > `u` ? global : globalThis;
  t.exports = function() {
    for (var e2 = [], t2 = 0; t2 < n.length; t2++) typeof r[n[t2]] == `function` && (e2[e2.length] = n[t2]);
    return e2;
  };
}));
var K = f(((e, t) => {
  var n = N(), r = x(), i2 = h2(), a2 = M();
  t.exports = function(e2, t2, o2) {
    if (!e2 || typeof e2 != `object` && typeof e2 != `function`) throw new i2("`obj` must be an object or a function`");
    if (typeof t2 != `string` && typeof t2 != `symbol`) throw new i2("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != `boolean` && arguments[3] !== null) throw new i2("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != `boolean` && arguments[4] !== null) throw new i2("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != `boolean` && arguments[5] !== null) throw new i2("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != `boolean`) throw new i2("`loose`, if provided, must be a boolean");
    var s2 = arguments.length > 3 ? arguments[3] : null, c2 = arguments.length > 4 ? arguments[4] : null, l2 = arguments.length > 5 ? arguments[5] : null, u2 = arguments.length > 6 ? arguments[6] : false, d2 = !!a2 && a2(e2, t2);
    if (n) n(e2, t2, { configurable: l2 === null && d2 ? d2.configurable : !l2, enumerable: s2 === null && d2 ? d2.enumerable : !s2, value: o2, writable: c2 === null && d2 ? d2.writable : !c2 });
    else if (u2 || !s2 && !c2 && !l2) e2[t2] = o2;
    else throw new r(`This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.`);
  };
}));
var ce = f(((e, t) => {
  var n = N(), r = function() {
    return !!n;
  };
  r.hasArrayLengthDefineBug = function() {
    if (!n) return null;
    try {
      return n([], `length`, { value: 1 }).length !== 1;
    } catch {
      return true;
    }
  }, t.exports = r;
}));
var le = f(((e, t) => {
  var n = ae(), r = K(), i2 = ce()(), a2 = M(), o2 = h2(), s2 = n(`%Math.floor%`);
  t.exports = function(e2, t2) {
    if (typeof e2 != `function`) throw new o2("`fn` is not a function");
    if (typeof t2 != `number` || t2 < 0 || t2 > 4294967295 || s2(t2) !== t2) throw new o2("`length` must be a positive 32-bit integer");
    var n2 = arguments.length > 2 && !!arguments[2], c2 = true, l2 = true;
    if (`length` in e2 && a2) {
      var u2 = a2(e2, `length`);
      u2 && !u2.configurable && (c2 = false), u2 && !u2.writable && (l2 = false);
    }
    return (c2 || l2 || !n2) && (i2 ? r(e2, `length`, t2, true, true) : r(e2, `length`, t2)), e2;
  };
}));
var q = f(((e, t) => {
  var n = R(), r = ne(), i2 = B();
  t.exports = function() {
    return i2(n, r, arguments);
  };
}));
var ue = f(((e, t) => {
  var n = le(), r = N(), i2 = V(), a2 = q();
  t.exports = function(e2) {
    var t2 = i2(arguments), r2 = 1 + e2.length - (arguments.length - 1);
    return n(t2, r2 > 0 ? r2 : 0, true);
  }, r ? r(t.exports, `apply`, { value: a2 }) : t.exports.apply = a2;
}));
var J = f(((e, t) => {
  var n = P();
  t.exports = function() {
    return n() && !!Symbol.toStringTag;
  };
}));
var Y = f(((e, t) => {
  var n = oe(), r = G(), i2 = ue(), a2 = U(), o2 = M(), s2 = re(), c2 = a2(`Object.prototype.toString`), l2 = J()(), u2 = typeof globalThis > `u` ? global : globalThis, d2 = r(), f3 = a2(`String.prototype.slice`), p2 = a2(`Array.prototype.indexOf`, true) || function(e2, t2) {
    for (var n2 = 0; n2 < e2.length; n2 += 1) if (e2[n2] === t2) return n2;
    return -1;
  }, m3 = { __proto__: null };
  l2 && o2 && s2 ? n(d2, function(e2) {
    var t2 = new u2[e2]();
    if (Symbol.toStringTag in t2 && s2) {
      var n2 = s2(t2), r2 = o2(n2, Symbol.toStringTag);
      if (!r2 && n2 && (r2 = o2(s2(n2), Symbol.toStringTag)), r2 && r2.get) {
        var a3 = i2(r2.get);
        m3[`$` + e2] = a3;
      }
    }
  }) : n(d2, function(e2) {
    var t2 = new u2[e2](), n2 = t2.slice || t2.set;
    if (n2) {
      var r2 = i2(n2);
      m3[`$` + e2] = r2;
    }
  });
  var h3 = function(e2) {
    var t2 = false;
    return n(m3, function(n2, r2) {
      if (!t2) try {
        `$` + n2(e2) === r2 && (t2 = f3(r2, 1));
      } catch {
      }
    }), t2;
  }, g2 = function(e2) {
    var t2 = false;
    return n(m3, function(n2, r2) {
      if (!t2) try {
        n2(e2), t2 = f3(r2, 1);
      } catch {
      }
    }), t2;
  };
  t.exports = function(e2) {
    if (!e2 || typeof e2 != `object`) return false;
    if (!l2) {
      var t2 = f3(c2(e2), 8, -1);
      return p2(d2, t2) > -1 ? t2 : t2 === `Object` ? g2(e2) : false;
    }
    return o2 ? h3(e2) : null;
  };
}));
var X = f(((e, t) => {
  var n = Y();
  t.exports = function(e2) {
    return !!n(e2);
  };
}));
var Z = f(((e, t) => {
  var n = h2(), r = U()(`TypedArray.prototype.buffer`, true), i2 = X();
  t.exports = r || function(e2) {
    if (!i2(e2)) throw new n(`Not a Typed Array`);
    return e2.buffer;
  };
}));
var de = f(((e, t) => {
  var n = p().Buffer, r = m2(), i2 = Z(), a2 = ArrayBuffer.isView || function(e2) {
    try {
      return i2(e2), true;
    } catch {
      return false;
    }
  }, o2 = typeof Uint8Array < `u`, s2 = typeof ArrayBuffer < `u` && typeof Uint8Array < `u`, c2 = s2 && (n.prototype instanceof Uint8Array || n.TYPED_ARRAY_SUPPORT);
  t.exports = function(e2, t2) {
    if (n.isBuffer(e2)) return e2.constructor && !(`isBuffer` in e2) ? n.from(e2) : e2;
    if (typeof e2 == `string`) return n.from(e2, t2);
    if (s2 && a2(e2)) {
      if (e2.byteLength === 0) return n.alloc(0);
      if (c2) {
        var i3 = n.from(e2.buffer, e2.byteOffset, e2.byteLength);
        if (i3.byteLength === e2.byteLength) return i3;
      }
      var l2 = e2 instanceof Uint8Array ? e2 : new Uint8Array(e2.buffer, e2.byteOffset, e2.byteLength), u2 = n.from(l2);
      if (u2.length === e2.byteLength) return u2;
    }
    if (o2 && e2 instanceof Uint8Array) return n.from(e2);
    var d2 = r(e2);
    if (d2) for (var f3 = 0; f3 < e2.length; f3 += 1) {
      var p2 = e2[f3];
      if (typeof p2 != `number` || p2 < 0 || p2 > 255 || ~~p2 !== p2) throw RangeError(`Array items must be numbers in the range 0-255.`);
    }
    if (d2 || n.isBuffer(e2) && e2.constructor && typeof e2.constructor.isBuffer == `function` && e2.constructor.isBuffer(e2)) return n.from(e2);
    throw TypeError(`The "data" argument must be a string, an Array, a Buffer, a Uint8Array, or a DataView.`);
  };
}));
var Q = f(((e, t) => {
  var n = p().Buffer, r = de();
  function i2(e2, t2) {
    this._block = n.alloc(e2), this._finalSize = t2, this._blockSize = e2, this._len = 0;
  }
  i2.prototype.update = function(e2, t2) {
    e2 = r(e2, t2 || `utf8`);
    for (var n2 = this._block, i3 = this._blockSize, a2 = e2.length, o2 = this._len, s2 = 0; s2 < a2; ) {
      for (var c2 = o2 % i3, l2 = Math.min(a2 - s2, i3 - c2), u2 = 0; u2 < l2; u2++) n2[c2 + u2] = e2[s2 + u2];
      o2 += l2, s2 += l2, o2 % i3 === 0 && this._update(n2);
    }
    return this._len += a2, this;
  }, i2.prototype.digest = function(e2) {
    var t2 = this._len % this._blockSize;
    this._block[t2] = 128, this._block.fill(0, t2 + 1), t2 >= this._finalSize && (this._update(this._block), this._block.fill(0));
    var n2 = this._len * 8;
    if (n2 <= 4294967295) this._block.writeUInt32BE(n2, this._blockSize - 4);
    else {
      var r2 = (n2 & 4294967295) >>> 0, i3 = (n2 - r2) / 4294967296;
      this._block.writeUInt32BE(i3, this._blockSize - 8), this._block.writeUInt32BE(r2, this._blockSize - 4);
    }
    this._update(this._block);
    var a2 = this._hash();
    return e2 ? a2.toString(e2) : a2;
  }, i2.prototype._update = function() {
    throw Error(`_update must be implemented by subclass`);
  }, t.exports = i2;
}));
var fe = f(((e, t) => {
  var n = f2(), r = Q(), i2 = p().Buffer, a2 = [1518500249, 1859775393, -1894007588, -899497514], o2 = Array(80);
  function s2() {
    this.init(), this._w = o2, r.call(this, 64, 56);
  }
  n(s2, r), s2.prototype.init = function() {
    return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this;
  };
  function c2(e2) {
    return e2 << 1 | e2 >>> 31;
  }
  function l2(e2) {
    return e2 << 5 | e2 >>> 27;
  }
  function u2(e2) {
    return e2 << 30 | e2 >>> 2;
  }
  function d2(e2, t2, n2, r2) {
    return e2 === 0 ? t2 & n2 | ~t2 & r2 : e2 === 2 ? t2 & n2 | t2 & r2 | n2 & r2 : t2 ^ n2 ^ r2;
  }
  s2.prototype._update = function(e2) {
    for (var t2 = this._w, n2 = this._a | 0, r2 = this._b | 0, i3 = this._c | 0, o3 = this._d | 0, s3 = this._e | 0, f3 = 0; f3 < 16; ++f3) t2[f3] = e2.readInt32BE(f3 * 4);
    for (; f3 < 80; ++f3) t2[f3] = c2(t2[f3 - 3] ^ t2[f3 - 8] ^ t2[f3 - 14] ^ t2[f3 - 16]);
    for (var p2 = 0; p2 < 80; ++p2) {
      var m3 = ~~(p2 / 20), h3 = l2(n2) + d2(m3, r2, i3, o3) + s3 + t2[p2] + a2[m3] | 0;
      s3 = o3, o3 = i3, i3 = u2(r2), r2 = n2, n2 = h3;
    }
    this._a = n2 + this._a | 0, this._b = r2 + this._b | 0, this._c = i3 + this._c | 0, this._d = o3 + this._d | 0, this._e = s3 + this._e | 0;
  }, s2.prototype._hash = function() {
    var e2 = i2.allocUnsafe(20);
    return e2.writeInt32BE(this._a | 0, 0), e2.writeInt32BE(this._b | 0, 4), e2.writeInt32BE(this._c | 0, 8), e2.writeInt32BE(this._d | 0, 12), e2.writeInt32BE(this._e | 0, 16), e2;
  }, t.exports = s2;
}));
var pe = f(((e) => {
  (function(t) {
    typeof DO_NOT_EXPORT_CRC > `u` ? typeof e == `object` ? t(e) : typeof define == `function` && define.amd ? define(function() {
      var e2 = {};
      return t(e2), e2;
    }) : t({}) : t({});
  })(function(e2) {
    e2.version = `1.2.2`;
    function t() {
      for (var e3 = 0, t2 = Array(256), n2 = 0; n2 != 256; ++n2) e3 = n2, e3 = e3 & 1 ? -306674912 ^ e3 >>> 1 : e3 >>> 1, e3 = e3 & 1 ? -306674912 ^ e3 >>> 1 : e3 >>> 1, e3 = e3 & 1 ? -306674912 ^ e3 >>> 1 : e3 >>> 1, e3 = e3 & 1 ? -306674912 ^ e3 >>> 1 : e3 >>> 1, e3 = e3 & 1 ? -306674912 ^ e3 >>> 1 : e3 >>> 1, e3 = e3 & 1 ? -306674912 ^ e3 >>> 1 : e3 >>> 1, e3 = e3 & 1 ? -306674912 ^ e3 >>> 1 : e3 >>> 1, e3 = e3 & 1 ? -306674912 ^ e3 >>> 1 : e3 >>> 1, t2[n2] = e3;
      return typeof Int32Array < `u` ? new Int32Array(t2) : t2;
    }
    var n = t();
    function r(e3) {
      var t2 = 0, n2 = 0, r2 = 0, i3 = typeof Int32Array < `u` ? new Int32Array(4096) : Array(4096);
      for (r2 = 0; r2 != 256; ++r2) i3[r2] = e3[r2];
      for (r2 = 0; r2 != 256; ++r2) for (n2 = e3[r2], t2 = 256 + r2; t2 < 4096; t2 += 256) n2 = i3[t2] = n2 >>> 8 ^ e3[n2 & 255];
      var a3 = [];
      for (r2 = 1; r2 != 16; ++r2) a3[r2 - 1] = typeof Int32Array < `u` ? i3.subarray(r2 * 256, r2 * 256 + 256) : i3.slice(r2 * 256, r2 * 256 + 256);
      return a3;
    }
    var i2 = r(n), a2 = i2[0], o2 = i2[1], s2 = i2[2], c2 = i2[3], l2 = i2[4], u2 = i2[5], d2 = i2[6], f3 = i2[7], p2 = i2[8], m3 = i2[9], h3 = i2[10], g2 = i2[11], _2 = i2[12], v2 = i2[13], y2 = i2[14];
    function b2(e3, t2) {
      for (var r2 = t2 ^ -1, i3 = 0, a3 = e3.length; i3 < a3; ) r2 = r2 >>> 8 ^ n[(r2 ^ e3.charCodeAt(i3++)) & 255];
      return ~r2;
    }
    function x2(e3, t2) {
      for (var r2 = t2 ^ -1, i3 = e3.length - 15, b3 = 0; b3 < i3; ) r2 = y2[e3[b3++] ^ r2 & 255] ^ v2[e3[b3++] ^ r2 >> 8 & 255] ^ _2[e3[b3++] ^ r2 >> 16 & 255] ^ g2[e3[b3++] ^ r2 >>> 24] ^ h3[e3[b3++]] ^ m3[e3[b3++]] ^ p2[e3[b3++]] ^ f3[e3[b3++]] ^ d2[e3[b3++]] ^ u2[e3[b3++]] ^ l2[e3[b3++]] ^ c2[e3[b3++]] ^ s2[e3[b3++]] ^ o2[e3[b3++]] ^ a2[e3[b3++]] ^ n[e3[b3++]];
      for (i3 += 15; b3 < i3; ) r2 = r2 >>> 8 ^ n[(r2 ^ e3[b3++]) & 255];
      return ~r2;
    }
    function S2(e3, t2) {
      for (var r2 = t2 ^ -1, i3 = 0, a3 = e3.length, o3 = 0, s3 = 0; i3 < a3; ) o3 = e3.charCodeAt(i3++), o3 < 128 ? r2 = r2 >>> 8 ^ n[(r2 ^ o3) & 255] : o3 < 2048 ? (r2 = r2 >>> 8 ^ n[(r2 ^ (192 | o3 >> 6 & 31)) & 255], r2 = r2 >>> 8 ^ n[(r2 ^ (128 | o3 & 63)) & 255]) : o3 >= 55296 && o3 < 57344 ? (o3 = (o3 & 1023) + 64, s3 = e3.charCodeAt(i3++) & 1023, r2 = r2 >>> 8 ^ n[(r2 ^ (240 | o3 >> 8 & 7)) & 255], r2 = r2 >>> 8 ^ n[(r2 ^ (128 | o3 >> 2 & 63)) & 255], r2 = r2 >>> 8 ^ n[(r2 ^ (128 | s3 >> 6 & 15 | (o3 & 3) << 4)) & 255], r2 = r2 >>> 8 ^ n[(r2 ^ (128 | s3 & 63)) & 255]) : (r2 = r2 >>> 8 ^ n[(r2 ^ (224 | o3 >> 12 & 15)) & 255], r2 = r2 >>> 8 ^ n[(r2 ^ (128 | o3 >> 6 & 63)) & 255], r2 = r2 >>> 8 ^ n[(r2 ^ (128 | o3 & 63)) & 255]);
      return ~r2;
    }
    e2.table = n, e2.bstr = b2, e2.buf = x2, e2.str = S2;
  });
}));
var $ = f(((e) => {
  var t = typeof Uint8Array < `u` && typeof Uint16Array < `u` && typeof Int32Array < `u`;
  function n(e2, t2) {
    return Object.prototype.hasOwnProperty.call(e2, t2);
  }
  e.assign = function(e2) {
    for (var t2 = Array.prototype.slice.call(arguments, 1); t2.length; ) {
      var r2 = t2.shift();
      if (r2) {
        if (typeof r2 != `object`) throw TypeError(r2 + `must be non-object`);
        for (var i3 in r2) n(r2, i3) && (e2[i3] = r2[i3]);
      }
    }
    return e2;
  }, e.shrinkBuf = function(e2, t2) {
    return e2.length === t2 ? e2 : e2.subarray ? e2.subarray(0, t2) : (e2.length = t2, e2);
  };
  var r = { arraySet: function(e2, t2, n2, r2, i3) {
    if (t2.subarray && e2.subarray) {
      e2.set(t2.subarray(n2, n2 + r2), i3);
      return;
    }
    for (var a2 = 0; a2 < r2; a2++) e2[i3 + a2] = t2[n2 + a2];
  }, flattenChunks: function(e2) {
    var t2, n2, r2 = 0, i3, a2, o2;
    for (t2 = 0, n2 = e2.length; t2 < n2; t2++) r2 += e2[t2].length;
    for (o2 = new Uint8Array(r2), i3 = 0, t2 = 0, n2 = e2.length; t2 < n2; t2++) a2 = e2[t2], o2.set(a2, i3), i3 += a2.length;
    return o2;
  } }, i2 = { arraySet: function(e2, t2, n2, r2, i3) {
    for (var a2 = 0; a2 < r2; a2++) e2[i3 + a2] = t2[n2 + a2];
  }, flattenChunks: function(e2) {
    return [].concat.apply([], e2);
  } };
  e.setTyped = function(t2) {
    t2 ? (e.Buf8 = Uint8Array, e.Buf16 = Uint16Array, e.Buf32 = Int32Array, e.assign(e, r)) : (e.Buf8 = Array, e.Buf16 = Array, e.Buf32 = Array, e.assign(e, i2));
  }, e.setTyped(t);
}));
var me = f(((e) => {
  var t = $(), n = 4, r = 0, i2 = 1, a2 = 2;
  function o2(e2) {
    for (var t2 = e2.length; --t2 >= 0; ) e2[t2] = 0;
  }
  var s2 = 0, c2 = 1, l2 = 2, u2 = 3, d2 = 258, f3 = 29, p2 = 256, m3 = p2 + 1 + f3, h3 = 30, g2 = 19, _2 = 2 * m3 + 1, v2 = 15, y2 = 16, b2 = 7, x2 = 256, S2 = 16, C2 = 17, w2 = 18, T2 = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], E2 = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], D2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], O2 = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], k3 = 512, A2 = Array((m3 + 2) * 2);
  o2(A2);
  var j2 = Array(h3 * 2);
  o2(j2);
  var M2 = Array(k3);
  o2(M2);
  var N2 = Array(d2 - u2 + 1);
  o2(N2);
  var P2 = Array(f3);
  o2(P2);
  var F2 = Array(h3);
  o2(F2);
  function ee2(e2, t2, n2, r2, i3) {
    this.static_tree = e2, this.extra_bits = t2, this.extra_base = n2, this.elems = r2, this.max_length = i3, this.has_stree = e2 && e2.length;
  }
  var I2, L2, R2;
  function te2(e2, t2) {
    this.dyn_tree = e2, this.max_code = 0, this.stat_desc = t2;
  }
  function ne2(e2) {
    return e2 < 256 ? M2[e2] : M2[256 + (e2 >>> 7)];
  }
  function z2(e2, t2) {
    e2.pending_buf[e2.pending++] = t2 & 255, e2.pending_buf[e2.pending++] = t2 >>> 8 & 255;
  }
  function B2(e2, t2, n2) {
    e2.bi_valid > y2 - n2 ? (e2.bi_buf |= t2 << e2.bi_valid & 65535, z2(e2, e2.bi_buf), e2.bi_buf = t2 >> y2 - e2.bi_valid, e2.bi_valid += n2 - y2) : (e2.bi_buf |= t2 << e2.bi_valid & 65535, e2.bi_valid += n2);
  }
  function V2(e2, t2, n2) {
    B2(e2, n2[t2 * 2], n2[t2 * 2 + 1]);
  }
  function H2(e2, t2) {
    var n2 = 0;
    do
      n2 |= e2 & 1, e2 >>>= 1, n2 <<= 1;
    while (--t2 > 0);
    return n2 >>> 1;
  }
  function re2(e2) {
    e2.bi_valid === 16 ? (z2(e2, e2.bi_buf), e2.bi_buf = 0, e2.bi_valid = 0) : e2.bi_valid >= 8 && (e2.pending_buf[e2.pending++] = e2.bi_buf & 255, e2.bi_buf >>= 8, e2.bi_valid -= 8);
  }
  function ie2(e2, t2) {
    var n2 = t2.dyn_tree, r2 = t2.max_code, i3 = t2.stat_desc.static_tree, a3 = t2.stat_desc.has_stree, o3 = t2.stat_desc.extra_bits, s3 = t2.stat_desc.extra_base, c3 = t2.stat_desc.max_length, l3, u3, d3, f4, p3, m4, h4 = 0;
    for (f4 = 0; f4 <= v2; f4++) e2.bl_count[f4] = 0;
    for (n2[e2.heap[e2.heap_max] * 2 + 1] = 0, l3 = e2.heap_max + 1; l3 < _2; l3++) u3 = e2.heap[l3], f4 = n2[n2[u3 * 2 + 1] * 2 + 1] + 1, f4 > c3 && (f4 = c3, h4++), n2[u3 * 2 + 1] = f4, !(u3 > r2) && (e2.bl_count[f4]++, p3 = 0, u3 >= s3 && (p3 = o3[u3 - s3]), m4 = n2[u3 * 2], e2.opt_len += m4 * (f4 + p3), a3 && (e2.static_len += m4 * (i3[u3 * 2 + 1] + p3)));
    if (h4 !== 0) {
      do {
        for (f4 = c3 - 1; e2.bl_count[f4] === 0; ) f4--;
        e2.bl_count[f4]--, e2.bl_count[f4 + 1] += 2, e2.bl_count[c3]--, h4 -= 2;
      } while (h4 > 0);
      for (f4 = c3; f4 !== 0; f4--) for (u3 = e2.bl_count[f4]; u3 !== 0; ) d3 = e2.heap[--l3], !(d3 > r2) && (n2[d3 * 2 + 1] !== f4 && (e2.opt_len += (f4 - n2[d3 * 2 + 1]) * n2[d3 * 2], n2[d3 * 2 + 1] = f4), u3--);
    }
  }
  function ae2(e2, t2, n2) {
    var r2 = Array(v2 + 1), i3 = 0, a3, o3;
    for (a3 = 1; a3 <= v2; a3++) r2[a3] = i3 = i3 + n2[a3 - 1] << 1;
    for (o3 = 0; o3 <= t2; o3++) {
      var s3 = e2[o3 * 2 + 1];
      s3 !== 0 && (e2[o3 * 2] = H2(r2[s3]++, s3));
    }
  }
  function U2() {
    var e2, t2, n2, r2, i3, a3 = Array(v2 + 1);
    for (n2 = 0, r2 = 0; r2 < f3 - 1; r2++) for (P2[r2] = n2, e2 = 0; e2 < 1 << T2[r2]; e2++) N2[n2++] = r2;
    for (N2[n2 - 1] = r2, i3 = 0, r2 = 0; r2 < 16; r2++) for (F2[r2] = i3, e2 = 0; e2 < 1 << E2[r2]; e2++) M2[i3++] = r2;
    for (i3 >>= 7; r2 < h3; r2++) for (F2[r2] = i3 << 7, e2 = 0; e2 < 1 << E2[r2] - 7; e2++) M2[256 + i3++] = r2;
    for (t2 = 0; t2 <= v2; t2++) a3[t2] = 0;
    for (e2 = 0; e2 <= 143; ) A2[e2 * 2 + 1] = 8, e2++, a3[8]++;
    for (; e2 <= 255; ) A2[e2 * 2 + 1] = 9, e2++, a3[9]++;
    for (; e2 <= 279; ) A2[e2 * 2 + 1] = 7, e2++, a3[7]++;
    for (; e2 <= 287; ) A2[e2 * 2 + 1] = 8, e2++, a3[8]++;
    for (ae2(A2, m3 + 1, a3), e2 = 0; e2 < h3; e2++) j2[e2 * 2 + 1] = 5, j2[e2 * 2] = H2(e2, 5);
    I2 = new ee2(A2, T2, p2 + 1, m3, v2), L2 = new ee2(j2, E2, 0, h3, v2), R2 = new ee2([], D2, 0, g2, b2);
  }
  function W2(e2) {
    var t2;
    for (t2 = 0; t2 < m3; t2++) e2.dyn_ltree[t2 * 2] = 0;
    for (t2 = 0; t2 < h3; t2++) e2.dyn_dtree[t2 * 2] = 0;
    for (t2 = 0; t2 < g2; t2++) e2.bl_tree[t2 * 2] = 0;
    e2.dyn_ltree[x2 * 2] = 1, e2.opt_len = e2.static_len = 0, e2.last_lit = e2.matches = 0;
  }
  function oe2(e2) {
    e2.bi_valid > 8 ? z2(e2, e2.bi_buf) : e2.bi_valid > 0 && (e2.pending_buf[e2.pending++] = e2.bi_buf), e2.bi_buf = 0, e2.bi_valid = 0;
  }
  function se2(e2, n2, r2, i3) {
    oe2(e2), i3 && (z2(e2, r2), z2(e2, ~r2)), t.arraySet(e2.pending_buf, e2.window, n2, r2, e2.pending), e2.pending += r2;
  }
  function G2(e2, t2, n2, r2) {
    var i3 = t2 * 2, a3 = n2 * 2;
    return e2[i3] < e2[a3] || e2[i3] === e2[a3] && r2[t2] <= r2[n2];
  }
  function K2(e2, t2, n2) {
    for (var r2 = e2.heap[n2], i3 = n2 << 1; i3 <= e2.heap_len && (i3 < e2.heap_len && G2(t2, e2.heap[i3 + 1], e2.heap[i3], e2.depth) && i3++, !G2(t2, r2, e2.heap[i3], e2.depth)); ) e2.heap[n2] = e2.heap[i3], n2 = i3, i3 <<= 1;
    e2.heap[n2] = r2;
  }
  function ce2(e2, t2, n2) {
    var r2, i3, a3 = 0, o3, s3;
    if (e2.last_lit !== 0) do
      r2 = e2.pending_buf[e2.d_buf + a3 * 2] << 8 | e2.pending_buf[e2.d_buf + a3 * 2 + 1], i3 = e2.pending_buf[e2.l_buf + a3], a3++, r2 === 0 ? V2(e2, i3, t2) : (o3 = N2[i3], V2(e2, o3 + p2 + 1, t2), s3 = T2[o3], s3 !== 0 && (i3 -= P2[o3], B2(e2, i3, s3)), r2--, o3 = ne2(r2), V2(e2, o3, n2), s3 = E2[o3], s3 !== 0 && (r2 -= F2[o3], B2(e2, r2, s3)));
    while (a3 < e2.last_lit);
    V2(e2, x2, t2);
  }
  function le2(e2, t2) {
    var n2 = t2.dyn_tree, r2 = t2.stat_desc.static_tree, i3 = t2.stat_desc.has_stree, a3 = t2.stat_desc.elems, o3, s3, c3 = -1, l3;
    for (e2.heap_len = 0, e2.heap_max = _2, o3 = 0; o3 < a3; o3++) n2[o3 * 2] === 0 ? n2[o3 * 2 + 1] = 0 : (e2.heap[++e2.heap_len] = c3 = o3, e2.depth[o3] = 0);
    for (; e2.heap_len < 2; ) l3 = e2.heap[++e2.heap_len] = c3 < 2 ? ++c3 : 0, n2[l3 * 2] = 1, e2.depth[l3] = 0, e2.opt_len--, i3 && (e2.static_len -= r2[l3 * 2 + 1]);
    for (t2.max_code = c3, o3 = e2.heap_len >> 1; o3 >= 1; o3--) K2(e2, n2, o3);
    l3 = a3;
    do
      o3 = e2.heap[1], e2.heap[1] = e2.heap[e2.heap_len--], K2(e2, n2, 1), s3 = e2.heap[1], e2.heap[--e2.heap_max] = o3, e2.heap[--e2.heap_max] = s3, n2[l3 * 2] = n2[o3 * 2] + n2[s3 * 2], e2.depth[l3] = (e2.depth[o3] >= e2.depth[s3] ? e2.depth[o3] : e2.depth[s3]) + 1, n2[o3 * 2 + 1] = n2[s3 * 2 + 1] = l3, e2.heap[1] = l3++, K2(e2, n2, 1);
    while (e2.heap_len >= 2);
    e2.heap[--e2.heap_max] = e2.heap[1], ie2(e2, t2), ae2(n2, c3, e2.bl_count);
  }
  function q2(e2, t2, n2) {
    var r2, i3 = -1, a3, o3 = t2[1], s3 = 0, c3 = 7, l3 = 4;
    for (o3 === 0 && (c3 = 138, l3 = 3), t2[(n2 + 1) * 2 + 1] = 65535, r2 = 0; r2 <= n2; r2++) a3 = o3, o3 = t2[(r2 + 1) * 2 + 1], !(++s3 < c3 && a3 === o3) && (s3 < l3 ? e2.bl_tree[a3 * 2] += s3 : a3 === 0 ? s3 <= 10 ? e2.bl_tree[C2 * 2]++ : e2.bl_tree[w2 * 2]++ : (a3 !== i3 && e2.bl_tree[a3 * 2]++, e2.bl_tree[S2 * 2]++), s3 = 0, i3 = a3, o3 === 0 ? (c3 = 138, l3 = 3) : a3 === o3 ? (c3 = 6, l3 = 3) : (c3 = 7, l3 = 4));
  }
  function ue2(e2, t2, n2) {
    var r2, i3 = -1, a3, o3 = t2[1], s3 = 0, c3 = 7, l3 = 4;
    for (o3 === 0 && (c3 = 138, l3 = 3), r2 = 0; r2 <= n2; r2++) if (a3 = o3, o3 = t2[(r2 + 1) * 2 + 1], !(++s3 < c3 && a3 === o3)) {
      if (s3 < l3) do
        V2(e2, a3, e2.bl_tree);
      while (--s3 !== 0);
      else a3 === 0 ? s3 <= 10 ? (V2(e2, C2, e2.bl_tree), B2(e2, s3 - 3, 3)) : (V2(e2, w2, e2.bl_tree), B2(e2, s3 - 11, 7)) : (a3 !== i3 && (V2(e2, a3, e2.bl_tree), s3--), V2(e2, S2, e2.bl_tree), B2(e2, s3 - 3, 2));
      s3 = 0, i3 = a3, o3 === 0 ? (c3 = 138, l3 = 3) : a3 === o3 ? (c3 = 6, l3 = 3) : (c3 = 7, l3 = 4);
    }
  }
  function J2(e2) {
    var t2;
    for (q2(e2, e2.dyn_ltree, e2.l_desc.max_code), q2(e2, e2.dyn_dtree, e2.d_desc.max_code), le2(e2, e2.bl_desc), t2 = g2 - 1; t2 >= 3 && e2.bl_tree[O2[t2] * 2 + 1] === 0; t2--) ;
    return e2.opt_len += 3 * (t2 + 1) + 5 + 5 + 4, t2;
  }
  function Y2(e2, t2, n2, r2) {
    var i3;
    for (B2(e2, t2 - 257, 5), B2(e2, n2 - 1, 5), B2(e2, r2 - 4, 4), i3 = 0; i3 < r2; i3++) B2(e2, e2.bl_tree[O2[i3] * 2 + 1], 3);
    ue2(e2, e2.dyn_ltree, t2 - 1), ue2(e2, e2.dyn_dtree, n2 - 1);
  }
  function X2(e2) {
    var t2 = 4093624447, n2;
    for (n2 = 0; n2 <= 31; n2++, t2 >>>= 1) if (t2 & 1 && e2.dyn_ltree[n2 * 2] !== 0) return r;
    if (e2.dyn_ltree[18] !== 0 || e2.dyn_ltree[20] !== 0 || e2.dyn_ltree[26] !== 0) return i2;
    for (n2 = 32; n2 < p2; n2++) if (e2.dyn_ltree[n2 * 2] !== 0) return i2;
    return r;
  }
  var Z2 = false;
  function de2(e2) {
    Z2 ||= (U2(), true), e2.l_desc = new te2(e2.dyn_ltree, I2), e2.d_desc = new te2(e2.dyn_dtree, L2), e2.bl_desc = new te2(e2.bl_tree, R2), e2.bi_buf = 0, e2.bi_valid = 0, W2(e2);
  }
  function Q2(e2, t2, n2, r2) {
    B2(e2, (s2 << 1) + +!!r2, 3), se2(e2, t2, n2, true);
  }
  function fe2(e2) {
    B2(e2, c2 << 1, 3), V2(e2, x2, A2), re2(e2);
  }
  function pe2(e2, t2, r2, i3) {
    var o3, s3, u3 = 0;
    e2.level > 0 ? (e2.strm.data_type === a2 && (e2.strm.data_type = X2(e2)), le2(e2, e2.l_desc), le2(e2, e2.d_desc), u3 = J2(e2), o3 = e2.opt_len + 3 + 7 >>> 3, s3 = e2.static_len + 3 + 7 >>> 3, s3 <= o3 && (o3 = s3)) : o3 = s3 = r2 + 5, r2 + 4 <= o3 && t2 !== -1 ? Q2(e2, t2, r2, i3) : e2.strategy === n || s3 === o3 ? (B2(e2, (c2 << 1) + +!!i3, 3), ce2(e2, A2, j2)) : (B2(e2, (l2 << 1) + +!!i3, 3), Y2(e2, e2.l_desc.max_code + 1, e2.d_desc.max_code + 1, u3 + 1), ce2(e2, e2.dyn_ltree, e2.dyn_dtree)), W2(e2), i3 && oe2(e2);
  }
  function me2(e2, t2, n2) {
    return e2.pending_buf[e2.d_buf + e2.last_lit * 2] = t2 >>> 8 & 255, e2.pending_buf[e2.d_buf + e2.last_lit * 2 + 1] = t2 & 255, e2.pending_buf[e2.l_buf + e2.last_lit] = n2 & 255, e2.last_lit++, t2 === 0 ? e2.dyn_ltree[n2 * 2]++ : (e2.matches++, t2--, e2.dyn_ltree[(N2[n2] + p2 + 1) * 2]++, e2.dyn_dtree[ne2(t2) * 2]++), e2.last_lit === e2.lit_bufsize - 1;
  }
  e._tr_init = de2, e._tr_stored_block = Q2, e._tr_flush_block = pe2, e._tr_tally = me2, e._tr_align = fe2;
}));
var he = f(((e, t) => {
  function n(e2, t2, n2, r) {
    for (var i2 = e2 & 65535 | 0, a2 = e2 >>> 16 & 65535 | 0, o2 = 0; n2 !== 0; ) {
      o2 = n2 > 2e3 ? 2e3 : n2, n2 -= o2;
      do
        i2 = i2 + t2[r++] | 0, a2 = a2 + i2 | 0;
      while (--o2);
      i2 %= 65521, a2 %= 65521;
    }
    return i2 | a2 << 16 | 0;
  }
  t.exports = n;
}));
var ge = f(((e, t) => {
  function n() {
    for (var e2, t2 = [], n2 = 0; n2 < 256; n2++) {
      e2 = n2;
      for (var r2 = 0; r2 < 8; r2++) e2 = e2 & 1 ? 3988292384 ^ e2 >>> 1 : e2 >>> 1;
      t2[n2] = e2;
    }
    return t2;
  }
  var r = n();
  function i2(e2, t2, n2, i3) {
    var a2 = r, o2 = i3 + n2;
    e2 ^= -1;
    for (var s2 = i3; s2 < o2; s2++) e2 = e2 >>> 8 ^ a2[(e2 ^ t2[s2]) & 255];
    return e2 ^ -1;
  }
  t.exports = i2;
}));
var _e = f(((e, t) => {
  t.exports = { 2: `need dictionary`, 1: `stream end`, 0: ``, "-1": `file error`, "-2": `stream error`, "-3": `data error`, "-4": `insufficient memory`, "-5": `buffer error`, "-6": `incompatible version` };
}));
var ve = f(((e) => {
  var t = $(), n = me(), r = he(), i2 = ge(), a2 = _e(), o2 = 0, s2 = 1, c2 = 3, l2 = 4, u2 = 5, d2 = 0, f3 = 1, p2 = -2, m3 = -3, h3 = -5, g2 = -1, _2 = 1, v2 = 2, y2 = 3, b2 = 4, x2 = 0, S2 = 2, C2 = 8, w2 = 9, T2 = 15, E2 = 8, D2 = 286, O2 = 30, k3 = 19, A2 = 2 * D2 + 1, j2 = 15, M2 = 3, N2 = 258, P2 = N2 + M2 + 1, F2 = 32, ee2 = 42, I2 = 69, L2 = 73, R2 = 91, te2 = 103, ne2 = 113, z2 = 666, B2 = 1, V2 = 2, H2 = 3, re2 = 4, ie2 = 3;
  function ae2(e2, t2) {
    return e2.msg = a2[t2], t2;
  }
  function U2(e2) {
    return (e2 << 1) - (e2 > 4 ? 9 : 0);
  }
  function W2(e2) {
    for (var t2 = e2.length; --t2 >= 0; ) e2[t2] = 0;
  }
  function oe2(e2) {
    var n2 = e2.state, r2 = n2.pending;
    r2 > e2.avail_out && (r2 = e2.avail_out), r2 !== 0 && (t.arraySet(e2.output, n2.pending_buf, n2.pending_out, r2, e2.next_out), e2.next_out += r2, n2.pending_out += r2, e2.total_out += r2, e2.avail_out -= r2, n2.pending -= r2, n2.pending === 0 && (n2.pending_out = 0));
  }
  function se2(e2, t2) {
    n._tr_flush_block(e2, e2.block_start >= 0 ? e2.block_start : -1, e2.strstart - e2.block_start, t2), e2.block_start = e2.strstart, oe2(e2.strm);
  }
  function G2(e2, t2) {
    e2.pending_buf[e2.pending++] = t2;
  }
  function K2(e2, t2) {
    e2.pending_buf[e2.pending++] = t2 >>> 8 & 255, e2.pending_buf[e2.pending++] = t2 & 255;
  }
  function ce2(e2, n2, a3, o3) {
    var s3 = e2.avail_in;
    return s3 > o3 && (s3 = o3), s3 === 0 ? 0 : (e2.avail_in -= s3, t.arraySet(n2, e2.input, e2.next_in, s3, a3), e2.state.wrap === 1 ? e2.adler = r(e2.adler, n2, s3, a3) : e2.state.wrap === 2 && (e2.adler = i2(e2.adler, n2, s3, a3)), e2.next_in += s3, e2.total_in += s3, s3);
  }
  function le2(e2, t2) {
    var n2 = e2.max_chain_length, r2 = e2.strstart, i3, a3, o3 = e2.prev_length, s3 = e2.nice_match, c3 = e2.strstart > e2.w_size - P2 ? e2.strstart - (e2.w_size - P2) : 0, l3 = e2.window, u3 = e2.w_mask, d3 = e2.prev, f4 = e2.strstart + N2, p3 = l3[r2 + o3 - 1], m4 = l3[r2 + o3];
    e2.prev_length >= e2.good_match && (n2 >>= 2), s3 > e2.lookahead && (s3 = e2.lookahead);
    do {
      if (i3 = t2, l3[i3 + o3] !== m4 || l3[i3 + o3 - 1] !== p3 || l3[i3] !== l3[r2] || l3[++i3] !== l3[r2 + 1]) continue;
      r2 += 2, i3++;
      do
        ;
      while (l3[++r2] === l3[++i3] && l3[++r2] === l3[++i3] && l3[++r2] === l3[++i3] && l3[++r2] === l3[++i3] && l3[++r2] === l3[++i3] && l3[++r2] === l3[++i3] && l3[++r2] === l3[++i3] && l3[++r2] === l3[++i3] && r2 < f4);
      if (a3 = N2 - (f4 - r2), r2 = f4 - N2, a3 > o3) {
        if (e2.match_start = t2, o3 = a3, a3 >= s3) break;
        p3 = l3[r2 + o3 - 1], m4 = l3[r2 + o3];
      }
    } while ((t2 = d3[t2 & u3]) > c3 && --n2 !== 0);
    return o3 <= e2.lookahead ? o3 : e2.lookahead;
  }
  function q2(e2) {
    var n2 = e2.w_size, r2, i3, a3, o3, s3;
    do {
      if (o3 = e2.window_size - e2.lookahead - e2.strstart, e2.strstart >= n2 + (n2 - P2)) {
        t.arraySet(e2.window, e2.window, n2, n2, 0), e2.match_start -= n2, e2.strstart -= n2, e2.block_start -= n2, i3 = e2.hash_size, r2 = i3;
        do
          a3 = e2.head[--r2], e2.head[r2] = a3 >= n2 ? a3 - n2 : 0;
        while (--i3);
        i3 = n2, r2 = i3;
        do
          a3 = e2.prev[--r2], e2.prev[r2] = a3 >= n2 ? a3 - n2 : 0;
        while (--i3);
        o3 += n2;
      }
      if (e2.strm.avail_in === 0) break;
      if (i3 = ce2(e2.strm, e2.window, e2.strstart + e2.lookahead, o3), e2.lookahead += i3, e2.lookahead + e2.insert >= M2) for (s3 = e2.strstart - e2.insert, e2.ins_h = e2.window[s3], e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[s3 + 1]) & e2.hash_mask; e2.insert && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[s3 + M2 - 1]) & e2.hash_mask, e2.prev[s3 & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = s3, s3++, e2.insert--, !(e2.lookahead + e2.insert < M2)); ) ;
    } while (e2.lookahead < P2 && e2.strm.avail_in !== 0);
  }
  function ue2(e2, t2) {
    var n2 = 65535;
    for (n2 > e2.pending_buf_size - 5 && (n2 = e2.pending_buf_size - 5); ; ) {
      if (e2.lookahead <= 1) {
        if (q2(e2), e2.lookahead === 0 && t2 === o2) return B2;
        if (e2.lookahead === 0) break;
      }
      e2.strstart += e2.lookahead, e2.lookahead = 0;
      var r2 = e2.block_start + n2;
      if ((e2.strstart === 0 || e2.strstart >= r2) && (e2.lookahead = e2.strstart - r2, e2.strstart = r2, se2(e2, false), e2.strm.avail_out === 0) || e2.strstart - e2.block_start >= e2.w_size - P2 && (se2(e2, false), e2.strm.avail_out === 0)) return B2;
    }
    return e2.insert = 0, t2 === l2 ? (se2(e2, true), e2.strm.avail_out === 0 ? H2 : re2) : (e2.strstart > e2.block_start && (se2(e2, false), e2.strm.avail_out), B2);
  }
  function J2(e2, t2) {
    for (var r2, i3; ; ) {
      if (e2.lookahead < P2) {
        if (q2(e2), e2.lookahead < P2 && t2 === o2) return B2;
        if (e2.lookahead === 0) break;
      }
      if (r2 = 0, e2.lookahead >= M2 && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + M2 - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), r2 !== 0 && e2.strstart - r2 <= e2.w_size - P2 && (e2.match_length = le2(e2, r2)), e2.match_length >= M2) if (i3 = n._tr_tally(e2, e2.strstart - e2.match_start, e2.match_length - M2), e2.lookahead -= e2.match_length, e2.match_length <= e2.max_lazy_match && e2.lookahead >= M2) {
        e2.match_length--;
        do
          e2.strstart++, e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + M2 - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart;
        while (--e2.match_length !== 0);
        e2.strstart++;
      } else e2.strstart += e2.match_length, e2.match_length = 0, e2.ins_h = e2.window[e2.strstart], e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + 1]) & e2.hash_mask;
      else i3 = n._tr_tally(e2, 0, e2.window[e2.strstart]), e2.lookahead--, e2.strstart++;
      if (i3 && (se2(e2, false), e2.strm.avail_out === 0)) return B2;
    }
    return e2.insert = e2.strstart < M2 - 1 ? e2.strstart : M2 - 1, t2 === l2 ? (se2(e2, true), e2.strm.avail_out === 0 ? H2 : re2) : e2.last_lit && (se2(e2, false), e2.strm.avail_out === 0) ? B2 : V2;
  }
  function Y2(e2, t2) {
    for (var r2, i3, a3; ; ) {
      if (e2.lookahead < P2) {
        if (q2(e2), e2.lookahead < P2 && t2 === o2) return B2;
        if (e2.lookahead === 0) break;
      }
      if (r2 = 0, e2.lookahead >= M2 && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + M2 - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), e2.prev_length = e2.match_length, e2.prev_match = e2.match_start, e2.match_length = M2 - 1, r2 !== 0 && e2.prev_length < e2.max_lazy_match && e2.strstart - r2 <= e2.w_size - P2 && (e2.match_length = le2(e2, r2), e2.match_length <= 5 && (e2.strategy === _2 || e2.match_length === M2 && e2.strstart - e2.match_start > 4096) && (e2.match_length = M2 - 1)), e2.prev_length >= M2 && e2.match_length <= e2.prev_length) {
        a3 = e2.strstart + e2.lookahead - M2, i3 = n._tr_tally(e2, e2.strstart - 1 - e2.prev_match, e2.prev_length - M2), e2.lookahead -= e2.prev_length - 1, e2.prev_length -= 2;
        do
          ++e2.strstart <= a3 && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + M2 - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart);
        while (--e2.prev_length !== 0);
        if (e2.match_available = 0, e2.match_length = M2 - 1, e2.strstart++, i3 && (se2(e2, false), e2.strm.avail_out === 0)) return B2;
      } else if (e2.match_available) {
        if (i3 = n._tr_tally(e2, 0, e2.window[e2.strstart - 1]), i3 && se2(e2, false), e2.strstart++, e2.lookahead--, e2.strm.avail_out === 0) return B2;
      } else e2.match_available = 1, e2.strstart++, e2.lookahead--;
    }
    return e2.match_available &&= (i3 = n._tr_tally(e2, 0, e2.window[e2.strstart - 1]), 0), e2.insert = e2.strstart < M2 - 1 ? e2.strstart : M2 - 1, t2 === l2 ? (se2(e2, true), e2.strm.avail_out === 0 ? H2 : re2) : e2.last_lit && (se2(e2, false), e2.strm.avail_out === 0) ? B2 : V2;
  }
  function X2(e2, t2) {
    for (var r2, i3, a3, s3, c3 = e2.window; ; ) {
      if (e2.lookahead <= N2) {
        if (q2(e2), e2.lookahead <= N2 && t2 === o2) return B2;
        if (e2.lookahead === 0) break;
      }
      if (e2.match_length = 0, e2.lookahead >= M2 && e2.strstart > 0 && (a3 = e2.strstart - 1, i3 = c3[a3], i3 === c3[++a3] && i3 === c3[++a3] && i3 === c3[++a3])) {
        s3 = e2.strstart + N2;
        do
          ;
        while (i3 === c3[++a3] && i3 === c3[++a3] && i3 === c3[++a3] && i3 === c3[++a3] && i3 === c3[++a3] && i3 === c3[++a3] && i3 === c3[++a3] && i3 === c3[++a3] && a3 < s3);
        e2.match_length = N2 - (s3 - a3), e2.match_length > e2.lookahead && (e2.match_length = e2.lookahead);
      }
      if (e2.match_length >= M2 ? (r2 = n._tr_tally(e2, 1, e2.match_length - M2), e2.lookahead -= e2.match_length, e2.strstart += e2.match_length, e2.match_length = 0) : (r2 = n._tr_tally(e2, 0, e2.window[e2.strstart]), e2.lookahead--, e2.strstart++), r2 && (se2(e2, false), e2.strm.avail_out === 0)) return B2;
    }
    return e2.insert = 0, t2 === l2 ? (se2(e2, true), e2.strm.avail_out === 0 ? H2 : re2) : e2.last_lit && (se2(e2, false), e2.strm.avail_out === 0) ? B2 : V2;
  }
  function Z2(e2, t2) {
    for (var r2; ; ) {
      if (e2.lookahead === 0 && (q2(e2), e2.lookahead === 0)) {
        if (t2 === o2) return B2;
        break;
      }
      if (e2.match_length = 0, r2 = n._tr_tally(e2, 0, e2.window[e2.strstart]), e2.lookahead--, e2.strstart++, r2 && (se2(e2, false), e2.strm.avail_out === 0)) return B2;
    }
    return e2.insert = 0, t2 === l2 ? (se2(e2, true), e2.strm.avail_out === 0 ? H2 : re2) : e2.last_lit && (se2(e2, false), e2.strm.avail_out === 0) ? B2 : V2;
  }
  function de2(e2, t2, n2, r2, i3) {
    this.good_length = e2, this.max_lazy = t2, this.nice_length = n2, this.max_chain = r2, this.func = i3;
  }
  var Q2 = [new de2(0, 0, 0, 0, ue2), new de2(4, 4, 8, 4, J2), new de2(4, 5, 16, 8, J2), new de2(4, 6, 32, 32, J2), new de2(4, 4, 16, 16, Y2), new de2(8, 16, 32, 32, Y2), new de2(8, 16, 128, 128, Y2), new de2(8, 32, 128, 256, Y2), new de2(32, 128, 258, 1024, Y2), new de2(32, 258, 258, 4096, Y2)];
  function fe2(e2) {
    e2.window_size = 2 * e2.w_size, W2(e2.head), e2.max_lazy_match = Q2[e2.level].max_lazy, e2.good_match = Q2[e2.level].good_length, e2.nice_match = Q2[e2.level].nice_length, e2.max_chain_length = Q2[e2.level].max_chain, e2.strstart = 0, e2.block_start = 0, e2.lookahead = 0, e2.insert = 0, e2.match_length = e2.prev_length = M2 - 1, e2.match_available = 0, e2.ins_h = 0;
  }
  function pe2() {
    this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = C2, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new t.Buf16(A2 * 2), this.dyn_dtree = new t.Buf16((2 * O2 + 1) * 2), this.bl_tree = new t.Buf16((2 * k3 + 1) * 2), W2(this.dyn_ltree), W2(this.dyn_dtree), W2(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new t.Buf16(j2 + 1), this.heap = new t.Buf16(2 * D2 + 1), W2(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new t.Buf16(2 * D2 + 1), W2(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
  }
  function ve2(e2) {
    var t2;
    return !e2 || !e2.state ? ae2(e2, p2) : (e2.total_in = e2.total_out = 0, e2.data_type = S2, t2 = e2.state, t2.pending = 0, t2.pending_out = 0, t2.wrap < 0 && (t2.wrap = -t2.wrap), t2.status = t2.wrap ? ee2 : ne2, e2.adler = t2.wrap === 2 ? 0 : 1, t2.last_flush = o2, n._tr_init(t2), d2);
  }
  function ye2(e2) {
    var t2 = ve2(e2);
    return t2 === d2 && fe2(e2.state), t2;
  }
  function be2(e2, t2) {
    return !e2 || !e2.state || e2.state.wrap !== 2 ? p2 : (e2.state.gzhead = t2, d2);
  }
  function xe2(e2, n2, r2, i3, a3, o3) {
    if (!e2) return p2;
    var s3 = 1;
    if (n2 === g2 && (n2 = 6), i3 < 0 ? (s3 = 0, i3 = -i3) : i3 > 15 && (s3 = 2, i3 -= 16), a3 < 1 || a3 > w2 || r2 !== C2 || i3 < 8 || i3 > 15 || n2 < 0 || n2 > 9 || o3 < 0 || o3 > b2) return ae2(e2, p2);
    i3 === 8 && (i3 = 9);
    var c3 = new pe2();
    return e2.state = c3, c3.strm = e2, c3.wrap = s3, c3.gzhead = null, c3.w_bits = i3, c3.w_size = 1 << c3.w_bits, c3.w_mask = c3.w_size - 1, c3.hash_bits = a3 + 7, c3.hash_size = 1 << c3.hash_bits, c3.hash_mask = c3.hash_size - 1, c3.hash_shift = ~~((c3.hash_bits + M2 - 1) / M2), c3.window = new t.Buf8(c3.w_size * 2), c3.head = new t.Buf16(c3.hash_size), c3.prev = new t.Buf16(c3.w_size), c3.lit_bufsize = 1 << a3 + 6, c3.pending_buf_size = c3.lit_bufsize * 4, c3.pending_buf = new t.Buf8(c3.pending_buf_size), c3.d_buf = 1 * c3.lit_bufsize, c3.l_buf = 3 * c3.lit_bufsize, c3.level = n2, c3.strategy = o3, c3.method = r2, ye2(e2);
  }
  function Se2(e2, t2) {
    return xe2(e2, t2, C2, T2, E2, x2);
  }
  function Ce2(e2, t2) {
    var r2, a3, m4, g3;
    if (!e2 || !e2.state || t2 > u2 || t2 < 0) return e2 ? ae2(e2, p2) : p2;
    if (a3 = e2.state, !e2.output || !e2.input && e2.avail_in !== 0 || a3.status === z2 && t2 !== l2) return ae2(e2, e2.avail_out === 0 ? h3 : p2);
    if (a3.strm = e2, r2 = a3.last_flush, a3.last_flush = t2, a3.status === ee2) if (a3.wrap === 2) e2.adler = 0, G2(a3, 31), G2(a3, 139), G2(a3, 8), a3.gzhead ? (G2(a3, +!!a3.gzhead.text + (a3.gzhead.hcrc ? 2 : 0) + (a3.gzhead.extra ? 4 : 0) + (a3.gzhead.name ? 8 : 0) + (a3.gzhead.comment ? 16 : 0)), G2(a3, a3.gzhead.time & 255), G2(a3, a3.gzhead.time >> 8 & 255), G2(a3, a3.gzhead.time >> 16 & 255), G2(a3, a3.gzhead.time >> 24 & 255), G2(a3, a3.level === 9 ? 2 : a3.strategy >= v2 || a3.level < 2 ? 4 : 0), G2(a3, a3.gzhead.os & 255), a3.gzhead.extra && a3.gzhead.extra.length && (G2(a3, a3.gzhead.extra.length & 255), G2(a3, a3.gzhead.extra.length >> 8 & 255)), a3.gzhead.hcrc && (e2.adler = i2(e2.adler, a3.pending_buf, a3.pending, 0)), a3.gzindex = 0, a3.status = I2) : (G2(a3, 0), G2(a3, 0), G2(a3, 0), G2(a3, 0), G2(a3, 0), G2(a3, a3.level === 9 ? 2 : a3.strategy >= v2 || a3.level < 2 ? 4 : 0), G2(a3, ie2), a3.status = ne2);
    else {
      var _3 = C2 + (a3.w_bits - 8 << 4) << 8, b3 = -1;
      b3 = a3.strategy >= v2 || a3.level < 2 ? 0 : a3.level < 6 ? 1 : a3.level === 6 ? 2 : 3, _3 |= b3 << 6, a3.strstart !== 0 && (_3 |= F2), _3 += 31 - _3 % 31, a3.status = ne2, K2(a3, _3), a3.strstart !== 0 && (K2(a3, e2.adler >>> 16), K2(a3, e2.adler & 65535)), e2.adler = 1;
    }
    if (a3.status === I2) if (a3.gzhead.extra) {
      for (m4 = a3.pending; a3.gzindex < (a3.gzhead.extra.length & 65535) && !(a3.pending === a3.pending_buf_size && (a3.gzhead.hcrc && a3.pending > m4 && (e2.adler = i2(e2.adler, a3.pending_buf, a3.pending - m4, m4)), oe2(e2), m4 = a3.pending, a3.pending === a3.pending_buf_size)); ) G2(a3, a3.gzhead.extra[a3.gzindex] & 255), a3.gzindex++;
      a3.gzhead.hcrc && a3.pending > m4 && (e2.adler = i2(e2.adler, a3.pending_buf, a3.pending - m4, m4)), a3.gzindex === a3.gzhead.extra.length && (a3.gzindex = 0, a3.status = L2);
    } else a3.status = L2;
    if (a3.status === L2) if (a3.gzhead.name) {
      m4 = a3.pending;
      do {
        if (a3.pending === a3.pending_buf_size && (a3.gzhead.hcrc && a3.pending > m4 && (e2.adler = i2(e2.adler, a3.pending_buf, a3.pending - m4, m4)), oe2(e2), m4 = a3.pending, a3.pending === a3.pending_buf_size)) {
          g3 = 1;
          break;
        }
        g3 = a3.gzindex < a3.gzhead.name.length ? a3.gzhead.name.charCodeAt(a3.gzindex++) & 255 : 0, G2(a3, g3);
      } while (g3 !== 0);
      a3.gzhead.hcrc && a3.pending > m4 && (e2.adler = i2(e2.adler, a3.pending_buf, a3.pending - m4, m4)), g3 === 0 && (a3.gzindex = 0, a3.status = R2);
    } else a3.status = R2;
    if (a3.status === R2) if (a3.gzhead.comment) {
      m4 = a3.pending;
      do {
        if (a3.pending === a3.pending_buf_size && (a3.gzhead.hcrc && a3.pending > m4 && (e2.adler = i2(e2.adler, a3.pending_buf, a3.pending - m4, m4)), oe2(e2), m4 = a3.pending, a3.pending === a3.pending_buf_size)) {
          g3 = 1;
          break;
        }
        g3 = a3.gzindex < a3.gzhead.comment.length ? a3.gzhead.comment.charCodeAt(a3.gzindex++) & 255 : 0, G2(a3, g3);
      } while (g3 !== 0);
      a3.gzhead.hcrc && a3.pending > m4 && (e2.adler = i2(e2.adler, a3.pending_buf, a3.pending - m4, m4)), g3 === 0 && (a3.status = te2);
    } else a3.status = te2;
    if (a3.status === te2 && (a3.gzhead.hcrc ? (a3.pending + 2 > a3.pending_buf_size && oe2(e2), a3.pending + 2 <= a3.pending_buf_size && (G2(a3, e2.adler & 255), G2(a3, e2.adler >> 8 & 255), e2.adler = 0, a3.status = ne2)) : a3.status = ne2), a3.pending !== 0) {
      if (oe2(e2), e2.avail_out === 0) return a3.last_flush = -1, d2;
    } else if (e2.avail_in === 0 && U2(t2) <= U2(r2) && t2 !== l2) return ae2(e2, h3);
    if (a3.status === z2 && e2.avail_in !== 0) return ae2(e2, h3);
    if (e2.avail_in !== 0 || a3.lookahead !== 0 || t2 !== o2 && a3.status !== z2) {
      var x3 = a3.strategy === v2 ? Z2(a3, t2) : a3.strategy === y2 ? X2(a3, t2) : Q2[a3.level].func(a3, t2);
      if ((x3 === H2 || x3 === re2) && (a3.status = z2), x3 === B2 || x3 === H2) return e2.avail_out === 0 && (a3.last_flush = -1), d2;
      if (x3 === V2 && (t2 === s2 ? n._tr_align(a3) : t2 !== u2 && (n._tr_stored_block(a3, 0, 0, false), t2 === c2 && (W2(a3.head), a3.lookahead === 0 && (a3.strstart = 0, a3.block_start = 0, a3.insert = 0))), oe2(e2), e2.avail_out === 0)) return a3.last_flush = -1, d2;
    }
    return t2 === l2 ? a3.wrap <= 0 ? f3 : (a3.wrap === 2 ? (G2(a3, e2.adler & 255), G2(a3, e2.adler >> 8 & 255), G2(a3, e2.adler >> 16 & 255), G2(a3, e2.adler >> 24 & 255), G2(a3, e2.total_in & 255), G2(a3, e2.total_in >> 8 & 255), G2(a3, e2.total_in >> 16 & 255), G2(a3, e2.total_in >> 24 & 255)) : (K2(a3, e2.adler >>> 16), K2(a3, e2.adler & 65535)), oe2(e2), a3.wrap > 0 && (a3.wrap = -a3.wrap), a3.pending === 0 ? f3 : d2) : d2;
  }
  function we2(e2) {
    var t2;
    return !e2 || !e2.state ? p2 : (t2 = e2.state.status, t2 !== ee2 && t2 !== I2 && t2 !== L2 && t2 !== R2 && t2 !== te2 && t2 !== ne2 && t2 !== z2 ? ae2(e2, p2) : (e2.state = null, t2 === ne2 ? ae2(e2, m3) : d2));
  }
  function Te2(e2, n2) {
    var i3 = n2.length, a3, o3, s3, c3, l3, u3, f4, m4;
    if (!e2 || !e2.state || (a3 = e2.state, c3 = a3.wrap, c3 === 2 || c3 === 1 && a3.status !== ee2 || a3.lookahead)) return p2;
    for (c3 === 1 && (e2.adler = r(e2.adler, n2, i3, 0)), a3.wrap = 0, i3 >= a3.w_size && (c3 === 0 && (W2(a3.head), a3.strstart = 0, a3.block_start = 0, a3.insert = 0), m4 = new t.Buf8(a3.w_size), t.arraySet(m4, n2, i3 - a3.w_size, a3.w_size, 0), n2 = m4, i3 = a3.w_size), l3 = e2.avail_in, u3 = e2.next_in, f4 = e2.input, e2.avail_in = i3, e2.next_in = 0, e2.input = n2, q2(a3); a3.lookahead >= M2; ) {
      o3 = a3.strstart, s3 = a3.lookahead - (M2 - 1);
      do
        a3.ins_h = (a3.ins_h << a3.hash_shift ^ a3.window[o3 + M2 - 1]) & a3.hash_mask, a3.prev[o3 & a3.w_mask] = a3.head[a3.ins_h], a3.head[a3.ins_h] = o3, o3++;
      while (--s3);
      a3.strstart = o3, a3.lookahead = M2 - 1, q2(a3);
    }
    return a3.strstart += a3.lookahead, a3.block_start = a3.strstart, a3.insert = a3.lookahead, a3.lookahead = 0, a3.match_length = a3.prev_length = M2 - 1, a3.match_available = 0, e2.next_in = u3, e2.input = f4, e2.avail_in = l3, a3.wrap = c3, d2;
  }
  e.deflateInit = Se2, e.deflateInit2 = xe2, e.deflateReset = ye2, e.deflateResetKeep = ve2, e.deflateSetHeader = be2, e.deflate = Ce2, e.deflateEnd = we2, e.deflateSetDictionary = Te2, e.deflateInfo = `pako deflate (from Nodeca project)`;
}));
var ye = f(((e) => {
  var t = $(), n = true, r = true;
  try {
    String.fromCharCode.apply(null, [0]);
  } catch {
    n = false;
  }
  try {
    String.fromCharCode.apply(null, new Uint8Array(1));
  } catch {
    r = false;
  }
  for (var i2 = new t.Buf8(256), a2 = 0; a2 < 256; a2++) i2[a2] = a2 >= 252 ? 6 : a2 >= 248 ? 5 : a2 >= 240 ? 4 : a2 >= 224 ? 3 : a2 >= 192 ? 2 : 1;
  i2[254] = i2[254] = 1, e.string2buf = function(e2) {
    var n2, r2, i3, a3, o3, s2 = e2.length, c2 = 0;
    for (a3 = 0; a3 < s2; a3++) r2 = e2.charCodeAt(a3), (r2 & 64512) == 55296 && a3 + 1 < s2 && (i3 = e2.charCodeAt(a3 + 1), (i3 & 64512) == 56320 && (r2 = 65536 + (r2 - 55296 << 10) + (i3 - 56320), a3++)), c2 += r2 < 128 ? 1 : r2 < 2048 ? 2 : r2 < 65536 ? 3 : 4;
    for (n2 = new t.Buf8(c2), o3 = 0, a3 = 0; o3 < c2; a3++) r2 = e2.charCodeAt(a3), (r2 & 64512) == 55296 && a3 + 1 < s2 && (i3 = e2.charCodeAt(a3 + 1), (i3 & 64512) == 56320 && (r2 = 65536 + (r2 - 55296 << 10) + (i3 - 56320), a3++)), r2 < 128 ? n2[o3++] = r2 : r2 < 2048 ? (n2[o3++] = 192 | r2 >>> 6, n2[o3++] = 128 | r2 & 63) : r2 < 65536 ? (n2[o3++] = 224 | r2 >>> 12, n2[o3++] = 128 | r2 >>> 6 & 63, n2[o3++] = 128 | r2 & 63) : (n2[o3++] = 240 | r2 >>> 18, n2[o3++] = 128 | r2 >>> 12 & 63, n2[o3++] = 128 | r2 >>> 6 & 63, n2[o3++] = 128 | r2 & 63);
    return n2;
  };
  function o2(e2, i3) {
    if (i3 < 65534 && (e2.subarray && r || !e2.subarray && n)) return String.fromCharCode.apply(null, t.shrinkBuf(e2, i3));
    for (var a3 = ``, o3 = 0; o3 < i3; o3++) a3 += String.fromCharCode(e2[o3]);
    return a3;
  }
  e.buf2binstring = function(e2) {
    return o2(e2, e2.length);
  }, e.binstring2buf = function(e2) {
    for (var n2 = new t.Buf8(e2.length), r2 = 0, i3 = n2.length; r2 < i3; r2++) n2[r2] = e2.charCodeAt(r2);
    return n2;
  }, e.buf2string = function(e2, t2) {
    var n2, r2, a3, s2, c2 = t2 || e2.length, l2 = Array(c2 * 2);
    for (r2 = 0, n2 = 0; n2 < c2; ) {
      if (a3 = e2[n2++], a3 < 128) {
        l2[r2++] = a3;
        continue;
      }
      if (s2 = i2[a3], s2 > 4) {
        l2[r2++] = 65533, n2 += s2 - 1;
        continue;
      }
      for (a3 &= s2 === 2 ? 31 : s2 === 3 ? 15 : 7; s2 > 1 && n2 < c2; ) a3 = a3 << 6 | e2[n2++] & 63, s2--;
      if (s2 > 1) {
        l2[r2++] = 65533;
        continue;
      }
      a3 < 65536 ? l2[r2++] = a3 : (a3 -= 65536, l2[r2++] = 55296 | a3 >> 10 & 1023, l2[r2++] = 56320 | a3 & 1023);
    }
    return o2(l2, r2);
  }, e.utf8border = function(e2, t2) {
    var n2;
    for (t2 ||= e2.length, t2 > e2.length && (t2 = e2.length), n2 = t2 - 1; n2 >= 0 && (e2[n2] & 192) == 128; ) n2--;
    return n2 < 0 || n2 === 0 ? t2 : n2 + i2[e2[n2]] > t2 ? n2 : t2;
  };
}));
var be = f(((e, t) => {
  function n() {
    this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = ``, this.state = null, this.data_type = 2, this.adler = 0;
  }
  t.exports = n;
}));
var xe = f(((e) => {
  var t = ve(), n = $(), r = ye(), i2 = _e(), a2 = be(), o2 = Object.prototype.toString, s2 = 0, c2 = 4, l2 = 0, u2 = 1, d2 = 2, f3 = -1, p2 = 0, m3 = 8;
  function h3(e2) {
    if (!(this instanceof h3)) return new h3(e2);
    this.options = n.assign({ level: f3, method: m3, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: p2, to: `` }, e2 || {});
    var s3 = this.options;
    s3.raw && s3.windowBits > 0 ? s3.windowBits = -s3.windowBits : s3.gzip && s3.windowBits > 0 && s3.windowBits < 16 && (s3.windowBits += 16), this.err = 0, this.msg = ``, this.ended = false, this.chunks = [], this.strm = new a2(), this.strm.avail_out = 0;
    var c3 = t.deflateInit2(this.strm, s3.level, s3.method, s3.windowBits, s3.memLevel, s3.strategy);
    if (c3 !== l2) throw Error(i2[c3]);
    if (s3.header && t.deflateSetHeader(this.strm, s3.header), s3.dictionary) {
      var u3 = typeof s3.dictionary == `string` ? r.string2buf(s3.dictionary) : o2.call(s3.dictionary) === `[object ArrayBuffer]` ? new Uint8Array(s3.dictionary) : s3.dictionary;
      if (c3 = t.deflateSetDictionary(this.strm, u3), c3 !== l2) throw Error(i2[c3]);
      this._dict_set = true;
    }
  }
  h3.prototype.push = function(e2, i3) {
    var a3 = this.strm, f4 = this.options.chunkSize, p3, m4;
    if (this.ended) return false;
    m4 = i3 === ~~i3 ? i3 : i3 === true ? c2 : s2, typeof e2 == `string` ? a3.input = r.string2buf(e2) : o2.call(e2) === `[object ArrayBuffer]` ? a3.input = new Uint8Array(e2) : a3.input = e2, a3.next_in = 0, a3.avail_in = a3.input.length;
    do {
      if (a3.avail_out === 0 && (a3.output = new n.Buf8(f4), a3.next_out = 0, a3.avail_out = f4), p3 = t.deflate(a3, m4), p3 !== u2 && p3 !== l2) return this.onEnd(p3), this.ended = true, false;
      (a3.avail_out === 0 || a3.avail_in === 0 && (m4 === c2 || m4 === d2)) && (this.options.to === `string` ? this.onData(r.buf2binstring(n.shrinkBuf(a3.output, a3.next_out))) : this.onData(n.shrinkBuf(a3.output, a3.next_out)));
    } while ((a3.avail_in > 0 || a3.avail_out === 0) && p3 !== u2);
    return m4 === c2 ? (p3 = t.deflateEnd(this.strm), this.onEnd(p3), this.ended = true, p3 === l2) : m4 === d2 ? (this.onEnd(l2), a3.avail_out = 0, true) : true;
  }, h3.prototype.onData = function(e2) {
    this.chunks.push(e2);
  }, h3.prototype.onEnd = function(e2) {
    e2 === l2 && (this.options.to === `string` ? this.result = this.chunks.join(``) : this.result = n.flattenChunks(this.chunks)), this.chunks = [], this.err = e2, this.msg = this.strm.msg;
  };
  function g2(e2, t2) {
    var n2 = new h3(t2);
    if (n2.push(e2, true), n2.err) throw n2.msg || i2[n2.err];
    return n2.result;
  }
  function _2(e2, t2) {
    return t2 ||= {}, t2.raw = true, g2(e2, t2);
  }
  function v2(e2, t2) {
    return t2 ||= {}, t2.gzip = true, g2(e2, t2);
  }
  e.Deflate = h3, e.deflate = g2, e.deflateRaw = _2, e.gzip = v2;
}));
var Se = f(((e, t) => {
  var n = 30, r = 12;
  t.exports = function(e2, t2) {
    var i2 = e2.state, a2 = e2.next_in, o2, s2, c2, l2, u2, d2, f3, p2, m3, h3, g2, _2, v2, y2, b2, x2, S2, C2, w2, T2, E2, D2 = e2.input, O2;
    o2 = a2 + (e2.avail_in - 5), s2 = e2.next_out, O2 = e2.output, c2 = s2 - (t2 - e2.avail_out), l2 = s2 + (e2.avail_out - 257), u2 = i2.dmax, d2 = i2.wsize, f3 = i2.whave, p2 = i2.wnext, m3 = i2.window, h3 = i2.hold, g2 = i2.bits, _2 = i2.lencode, v2 = i2.distcode, y2 = (1 << i2.lenbits) - 1, b2 = (1 << i2.distbits) - 1;
    top: do {
      g2 < 15 && (h3 += D2[a2++] << g2, g2 += 8, h3 += D2[a2++] << g2, g2 += 8), x2 = _2[h3 & y2];
      dolen: for (; ; ) {
        if (S2 = x2 >>> 24, h3 >>>= S2, g2 -= S2, S2 = x2 >>> 16 & 255, S2 === 0) O2[s2++] = x2 & 65535;
        else if (S2 & 16) {
          C2 = x2 & 65535, S2 &= 15, S2 && (g2 < S2 && (h3 += D2[a2++] << g2, g2 += 8), C2 += h3 & (1 << S2) - 1, h3 >>>= S2, g2 -= S2), g2 < 15 && (h3 += D2[a2++] << g2, g2 += 8, h3 += D2[a2++] << g2, g2 += 8), x2 = v2[h3 & b2];
          dodist: for (; ; ) {
            if (S2 = x2 >>> 24, h3 >>>= S2, g2 -= S2, S2 = x2 >>> 16 & 255, S2 & 16) {
              if (w2 = x2 & 65535, S2 &= 15, g2 < S2 && (h3 += D2[a2++] << g2, g2 += 8, g2 < S2 && (h3 += D2[a2++] << g2, g2 += 8)), w2 += h3 & (1 << S2) - 1, w2 > u2) {
                e2.msg = `invalid distance too far back`, i2.mode = n;
                break top;
              }
              if (h3 >>>= S2, g2 -= S2, S2 = s2 - c2, w2 > S2) {
                if (S2 = w2 - S2, S2 > f3 && i2.sane) {
                  e2.msg = `invalid distance too far back`, i2.mode = n;
                  break top;
                }
                if (T2 = 0, E2 = m3, p2 === 0) {
                  if (T2 += d2 - S2, S2 < C2) {
                    C2 -= S2;
                    do
                      O2[s2++] = m3[T2++];
                    while (--S2);
                    T2 = s2 - w2, E2 = O2;
                  }
                } else if (p2 < S2) {
                  if (T2 += d2 + p2 - S2, S2 -= p2, S2 < C2) {
                    C2 -= S2;
                    do
                      O2[s2++] = m3[T2++];
                    while (--S2);
                    if (T2 = 0, p2 < C2) {
                      S2 = p2, C2 -= S2;
                      do
                        O2[s2++] = m3[T2++];
                      while (--S2);
                      T2 = s2 - w2, E2 = O2;
                    }
                  }
                } else if (T2 += p2 - S2, S2 < C2) {
                  C2 -= S2;
                  do
                    O2[s2++] = m3[T2++];
                  while (--S2);
                  T2 = s2 - w2, E2 = O2;
                }
                for (; C2 > 2; ) O2[s2++] = E2[T2++], O2[s2++] = E2[T2++], O2[s2++] = E2[T2++], C2 -= 3;
                C2 && (O2[s2++] = E2[T2++], C2 > 1 && (O2[s2++] = E2[T2++]));
              } else {
                T2 = s2 - w2;
                do
                  O2[s2++] = O2[T2++], O2[s2++] = O2[T2++], O2[s2++] = O2[T2++], C2 -= 3;
                while (C2 > 2);
                C2 && (O2[s2++] = O2[T2++], C2 > 1 && (O2[s2++] = O2[T2++]));
              }
            } else if (S2 & 64) {
              e2.msg = `invalid distance code`, i2.mode = n;
              break top;
            } else {
              x2 = v2[(x2 & 65535) + (h3 & (1 << S2) - 1)];
              continue dodist;
            }
            break;
          }
        } else if (!(S2 & 64)) {
          x2 = _2[(x2 & 65535) + (h3 & (1 << S2) - 1)];
          continue dolen;
        } else if (S2 & 32) {
          i2.mode = r;
          break top;
        } else {
          e2.msg = `invalid literal/length code`, i2.mode = n;
          break top;
        }
        break;
      }
    } while (a2 < o2 && s2 < l2);
    C2 = g2 >> 3, a2 -= C2, g2 -= C2 << 3, h3 &= (1 << g2) - 1, e2.next_in = a2, e2.next_out = s2, e2.avail_in = a2 < o2 ? 5 + (o2 - a2) : 5 - (a2 - o2), e2.avail_out = s2 < l2 ? 257 + (l2 - s2) : 257 - (s2 - l2), i2.hold = h3, i2.bits = g2;
  };
}));
var Ce = f(((e, t) => {
  var n = $(), r = 15, i2 = 852, a2 = 592, o2 = 0, s2 = 1, c2 = 2, l2 = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], u2 = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], d2 = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], f3 = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
  t.exports = function(e2, t2, p2, m3, h3, g2, _2, v2) {
    var y2 = v2.bits, b2 = 0, x2 = 0, S2 = 0, C2 = 0, w2 = 0, T2 = 0, E2 = 0, D2 = 0, O2 = 0, k3 = 0, A2, j2, M2, N2, P2, F2 = null, ee2 = 0, I2, L2 = new n.Buf16(r + 1), R2 = new n.Buf16(r + 1), te2 = null, ne2 = 0, z2, B2, V2;
    for (b2 = 0; b2 <= r; b2++) L2[b2] = 0;
    for (x2 = 0; x2 < m3; x2++) L2[t2[p2 + x2]]++;
    for (w2 = y2, C2 = r; C2 >= 1 && L2[C2] === 0; C2--) ;
    if (w2 > C2 && (w2 = C2), C2 === 0) return h3[g2++] = 20971520, h3[g2++] = 20971520, v2.bits = 1, 0;
    for (S2 = 1; S2 < C2 && L2[S2] === 0; S2++) ;
    for (w2 < S2 && (w2 = S2), D2 = 1, b2 = 1; b2 <= r; b2++) if (D2 <<= 1, D2 -= L2[b2], D2 < 0) return -1;
    if (D2 > 0 && (e2 === o2 || C2 !== 1)) return -1;
    for (R2[1] = 0, b2 = 1; b2 < r; b2++) R2[b2 + 1] = R2[b2] + L2[b2];
    for (x2 = 0; x2 < m3; x2++) t2[p2 + x2] !== 0 && (_2[R2[t2[p2 + x2]]++] = x2);
    if (e2 === o2 ? (F2 = te2 = _2, I2 = 19) : e2 === s2 ? (F2 = l2, ee2 -= 257, te2 = u2, ne2 -= 257, I2 = 256) : (F2 = d2, te2 = f3, I2 = -1), k3 = 0, x2 = 0, b2 = S2, P2 = g2, T2 = w2, E2 = 0, M2 = -1, O2 = 1 << w2, N2 = O2 - 1, e2 === s2 && O2 > i2 || e2 === c2 && O2 > a2) return 1;
    for (; ; ) {
      z2 = b2 - E2, _2[x2] < I2 ? (B2 = 0, V2 = _2[x2]) : _2[x2] > I2 ? (B2 = te2[ne2 + _2[x2]], V2 = F2[ee2 + _2[x2]]) : (B2 = 96, V2 = 0), A2 = 1 << b2 - E2, j2 = 1 << T2, S2 = j2;
      do
        j2 -= A2, h3[P2 + (k3 >> E2) + j2] = z2 << 24 | B2 << 16 | V2 | 0;
      while (j2 !== 0);
      for (A2 = 1 << b2 - 1; k3 & A2; ) A2 >>= 1;
      if (A2 === 0 ? k3 = 0 : (k3 &= A2 - 1, k3 += A2), x2++, --L2[b2] === 0) {
        if (b2 === C2) break;
        b2 = t2[p2 + _2[x2]];
      }
      if (b2 > w2 && (k3 & N2) !== M2) {
        for (E2 === 0 && (E2 = w2), P2 += S2, T2 = b2 - E2, D2 = 1 << T2; T2 + E2 < C2 && (D2 -= L2[T2 + E2], !(D2 <= 0)); ) T2++, D2 <<= 1;
        if (O2 += 1 << T2, e2 === s2 && O2 > i2 || e2 === c2 && O2 > a2) return 1;
        M2 = k3 & N2, h3[M2] = w2 << 24 | T2 << 16 | P2 - g2 | 0;
      }
    }
    return k3 !== 0 && (h3[P2 + k3] = b2 - E2 << 24 | 4194304), v2.bits = w2, 0;
  };
}));
var we = f(((e) => {
  var t = $(), n = he(), r = ge(), i2 = Se(), a2 = Ce(), o2 = 0, s2 = 1, c2 = 2, l2 = 4, u2 = 5, d2 = 6, f3 = 0, p2 = 1, m3 = 2, h3 = -2, g2 = -3, _2 = -4, v2 = -5, y2 = 8, b2 = 1, x2 = 2, S2 = 3, C2 = 4, w2 = 5, T2 = 6, E2 = 7, D2 = 8, O2 = 9, k3 = 10, A2 = 11, j2 = 12, M2 = 13, N2 = 14, P2 = 15, F2 = 16, ee2 = 17, I2 = 18, L2 = 19, R2 = 20, te2 = 21, ne2 = 22, z2 = 23, B2 = 24, V2 = 25, H2 = 26, re2 = 27, ie2 = 28, ae2 = 29, U2 = 30, W2 = 31, oe2 = 32, se2 = 852, G2 = 592, K2 = 15;
  function ce2(e2) {
    return (e2 >>> 24 & 255) + (e2 >>> 8 & 65280) + ((e2 & 65280) << 8) + ((e2 & 255) << 24);
  }
  function le2() {
    this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new t.Buf16(320), this.work = new t.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
  }
  function q2(e2) {
    var n2;
    return !e2 || !e2.state ? h3 : (n2 = e2.state, e2.total_in = e2.total_out = n2.total = 0, e2.msg = ``, n2.wrap && (e2.adler = n2.wrap & 1), n2.mode = b2, n2.last = 0, n2.havedict = 0, n2.dmax = 32768, n2.head = null, n2.hold = 0, n2.bits = 0, n2.lencode = n2.lendyn = new t.Buf32(se2), n2.distcode = n2.distdyn = new t.Buf32(G2), n2.sane = 1, n2.back = -1, f3);
  }
  function ue2(e2) {
    var t2;
    return !e2 || !e2.state ? h3 : (t2 = e2.state, t2.wsize = 0, t2.whave = 0, t2.wnext = 0, q2(e2));
  }
  function J2(e2, t2) {
    var n2, r2;
    return !e2 || !e2.state || (r2 = e2.state, t2 < 0 ? (n2 = 0, t2 = -t2) : (n2 = (t2 >> 4) + 1, t2 < 48 && (t2 &= 15)), t2 && (t2 < 8 || t2 > 15)) ? h3 : (r2.window !== null && r2.wbits !== t2 && (r2.window = null), r2.wrap = n2, r2.wbits = t2, ue2(e2));
  }
  function Y2(e2, t2) {
    var n2, r2;
    return e2 ? (r2 = new le2(), e2.state = r2, r2.window = null, n2 = J2(e2, t2), n2 !== f3 && (e2.state = null), n2) : h3;
  }
  function X2(e2) {
    return Y2(e2, K2);
  }
  var Z2 = true, de2, Q2;
  function fe2(e2) {
    if (Z2) {
      var n2;
      for (de2 = new t.Buf32(512), Q2 = new t.Buf32(32), n2 = 0; n2 < 144; ) e2.lens[n2++] = 8;
      for (; n2 < 256; ) e2.lens[n2++] = 9;
      for (; n2 < 280; ) e2.lens[n2++] = 7;
      for (; n2 < 288; ) e2.lens[n2++] = 8;
      for (a2(s2, e2.lens, 0, 288, de2, 0, e2.work, { bits: 9 }), n2 = 0; n2 < 32; ) e2.lens[n2++] = 5;
      a2(c2, e2.lens, 0, 32, Q2, 0, e2.work, { bits: 5 }), Z2 = false;
    }
    e2.lencode = de2, e2.lenbits = 9, e2.distcode = Q2, e2.distbits = 5;
  }
  function pe2(e2, n2, r2, i3) {
    var a3, o3 = e2.state;
    return o3.window === null && (o3.wsize = 1 << o3.wbits, o3.wnext = 0, o3.whave = 0, o3.window = new t.Buf8(o3.wsize)), i3 >= o3.wsize ? (t.arraySet(o3.window, n2, r2 - o3.wsize, o3.wsize, 0), o3.wnext = 0, o3.whave = o3.wsize) : (a3 = o3.wsize - o3.wnext, a3 > i3 && (a3 = i3), t.arraySet(o3.window, n2, r2 - i3, a3, o3.wnext), i3 -= a3, i3 ? (t.arraySet(o3.window, n2, r2 - i3, i3, 0), o3.wnext = i3, o3.whave = o3.wsize) : (o3.wnext += a3, o3.wnext === o3.wsize && (o3.wnext = 0), o3.whave < o3.wsize && (o3.whave += a3))), 0;
  }
  function me2(e2, se3) {
    var G3, K3, le3, q3, ue3, J3, Y3, X3, Z3, de3, Q3, $2, me3, he2, ge2 = 0, _e3, ve3, ye3, be2, xe2, Se2, Ce2, we2, Te2 = new t.Buf8(4), Ee2, De2, Oe2 = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
    if (!e2 || !e2.state || !e2.output || !e2.input && e2.avail_in !== 0) return h3;
    G3 = e2.state, G3.mode === j2 && (G3.mode = M2), ue3 = e2.next_out, le3 = e2.output, Y3 = e2.avail_out, q3 = e2.next_in, K3 = e2.input, J3 = e2.avail_in, X3 = G3.hold, Z3 = G3.bits, de3 = J3, Q3 = Y3, we2 = f3;
    inf_leave: for (; ; ) switch (G3.mode) {
      case b2:
        if (G3.wrap === 0) {
          G3.mode = M2;
          break;
        }
        for (; Z3 < 16; ) {
          if (J3 === 0) break inf_leave;
          J3--, X3 += K3[q3++] << Z3, Z3 += 8;
        }
        if (G3.wrap & 2 && X3 === 35615) {
          G3.check = 0, Te2[0] = X3 & 255, Te2[1] = X3 >>> 8 & 255, G3.check = r(G3.check, Te2, 2, 0), X3 = 0, Z3 = 0, G3.mode = x2;
          break;
        }
        if (G3.flags = 0, G3.head && (G3.head.done = false), !(G3.wrap & 1) || (((X3 & 255) << 8) + (X3 >> 8)) % 31) {
          e2.msg = `incorrect header check`, G3.mode = U2;
          break;
        }
        if ((X3 & 15) !== y2) {
          e2.msg = `unknown compression method`, G3.mode = U2;
          break;
        }
        if (X3 >>>= 4, Z3 -= 4, Ce2 = (X3 & 15) + 8, G3.wbits === 0) G3.wbits = Ce2;
        else if (Ce2 > G3.wbits) {
          e2.msg = `invalid window size`, G3.mode = U2;
          break;
        }
        G3.dmax = 1 << Ce2, e2.adler = G3.check = 1, G3.mode = X3 & 512 ? k3 : j2, X3 = 0, Z3 = 0;
        break;
      case x2:
        for (; Z3 < 16; ) {
          if (J3 === 0) break inf_leave;
          J3--, X3 += K3[q3++] << Z3, Z3 += 8;
        }
        if (G3.flags = X3, (G3.flags & 255) !== y2) {
          e2.msg = `unknown compression method`, G3.mode = U2;
          break;
        }
        if (G3.flags & 57344) {
          e2.msg = `unknown header flags set`, G3.mode = U2;
          break;
        }
        G3.head && (G3.head.text = X3 >> 8 & 1), G3.flags & 512 && (Te2[0] = X3 & 255, Te2[1] = X3 >>> 8 & 255, G3.check = r(G3.check, Te2, 2, 0)), X3 = 0, Z3 = 0, G3.mode = S2;
      case S2:
        for (; Z3 < 32; ) {
          if (J3 === 0) break inf_leave;
          J3--, X3 += K3[q3++] << Z3, Z3 += 8;
        }
        G3.head && (G3.head.time = X3), G3.flags & 512 && (Te2[0] = X3 & 255, Te2[1] = X3 >>> 8 & 255, Te2[2] = X3 >>> 16 & 255, Te2[3] = X3 >>> 24 & 255, G3.check = r(G3.check, Te2, 4, 0)), X3 = 0, Z3 = 0, G3.mode = C2;
      case C2:
        for (; Z3 < 16; ) {
          if (J3 === 0) break inf_leave;
          J3--, X3 += K3[q3++] << Z3, Z3 += 8;
        }
        G3.head && (G3.head.xflags = X3 & 255, G3.head.os = X3 >> 8), G3.flags & 512 && (Te2[0] = X3 & 255, Te2[1] = X3 >>> 8 & 255, G3.check = r(G3.check, Te2, 2, 0)), X3 = 0, Z3 = 0, G3.mode = w2;
      case w2:
        if (G3.flags & 1024) {
          for (; Z3 < 16; ) {
            if (J3 === 0) break inf_leave;
            J3--, X3 += K3[q3++] << Z3, Z3 += 8;
          }
          G3.length = X3, G3.head && (G3.head.extra_len = X3), G3.flags & 512 && (Te2[0] = X3 & 255, Te2[1] = X3 >>> 8 & 255, G3.check = r(G3.check, Te2, 2, 0)), X3 = 0, Z3 = 0;
        } else G3.head && (G3.head.extra = null);
        G3.mode = T2;
      case T2:
        if (G3.flags & 1024 && ($2 = G3.length, $2 > J3 && ($2 = J3), $2 && (G3.head && (Ce2 = G3.head.extra_len - G3.length, G3.head.extra || (G3.head.extra = Array(G3.head.extra_len)), t.arraySet(G3.head.extra, K3, q3, $2, Ce2)), G3.flags & 512 && (G3.check = r(G3.check, K3, $2, q3)), J3 -= $2, q3 += $2, G3.length -= $2), G3.length)) break inf_leave;
        G3.length = 0, G3.mode = E2;
      case E2:
        if (G3.flags & 2048) {
          if (J3 === 0) break inf_leave;
          $2 = 0;
          do
            Ce2 = K3[q3 + $2++], G3.head && Ce2 && G3.length < 65536 && (G3.head.name += String.fromCharCode(Ce2));
          while (Ce2 && $2 < J3);
          if (G3.flags & 512 && (G3.check = r(G3.check, K3, $2, q3)), J3 -= $2, q3 += $2, Ce2) break inf_leave;
        } else G3.head && (G3.head.name = null);
        G3.length = 0, G3.mode = D2;
      case D2:
        if (G3.flags & 4096) {
          if (J3 === 0) break inf_leave;
          $2 = 0;
          do
            Ce2 = K3[q3 + $2++], G3.head && Ce2 && G3.length < 65536 && (G3.head.comment += String.fromCharCode(Ce2));
          while (Ce2 && $2 < J3);
          if (G3.flags & 512 && (G3.check = r(G3.check, K3, $2, q3)), J3 -= $2, q3 += $2, Ce2) break inf_leave;
        } else G3.head && (G3.head.comment = null);
        G3.mode = O2;
      case O2:
        if (G3.flags & 512) {
          for (; Z3 < 16; ) {
            if (J3 === 0) break inf_leave;
            J3--, X3 += K3[q3++] << Z3, Z3 += 8;
          }
          if (X3 !== (G3.check & 65535)) {
            e2.msg = `header crc mismatch`, G3.mode = U2;
            break;
          }
          X3 = 0, Z3 = 0;
        }
        G3.head && (G3.head.hcrc = G3.flags >> 9 & 1, G3.head.done = true), e2.adler = G3.check = 0, G3.mode = j2;
        break;
      case k3:
        for (; Z3 < 32; ) {
          if (J3 === 0) break inf_leave;
          J3--, X3 += K3[q3++] << Z3, Z3 += 8;
        }
        e2.adler = G3.check = ce2(X3), X3 = 0, Z3 = 0, G3.mode = A2;
      case A2:
        if (G3.havedict === 0) return e2.next_out = ue3, e2.avail_out = Y3, e2.next_in = q3, e2.avail_in = J3, G3.hold = X3, G3.bits = Z3, m3;
        e2.adler = G3.check = 1, G3.mode = j2;
      case j2:
        if (se3 === u2 || se3 === d2) break inf_leave;
      case M2:
        if (G3.last) {
          X3 >>>= Z3 & 7, Z3 -= Z3 & 7, G3.mode = re2;
          break;
        }
        for (; Z3 < 3; ) {
          if (J3 === 0) break inf_leave;
          J3--, X3 += K3[q3++] << Z3, Z3 += 8;
        }
        switch (G3.last = X3 & 1, X3 >>>= 1, --Z3, X3 & 3) {
          case 0:
            G3.mode = N2;
            break;
          case 1:
            if (fe2(G3), G3.mode = R2, se3 === d2) {
              X3 >>>= 2, Z3 -= 2;
              break inf_leave;
            }
            break;
          case 2:
            G3.mode = ee2;
            break;
          case 3:
            e2.msg = `invalid block type`, G3.mode = U2;
        }
        X3 >>>= 2, Z3 -= 2;
        break;
      case N2:
        for (X3 >>>= Z3 & 7, Z3 -= Z3 & 7; Z3 < 32; ) {
          if (J3 === 0) break inf_leave;
          J3--, X3 += K3[q3++] << Z3, Z3 += 8;
        }
        if ((X3 & 65535) != (X3 >>> 16 ^ 65535)) {
          e2.msg = `invalid stored block lengths`, G3.mode = U2;
          break;
        }
        if (G3.length = X3 & 65535, X3 = 0, Z3 = 0, G3.mode = P2, se3 === d2) break inf_leave;
      case P2:
        G3.mode = F2;
      case F2:
        if ($2 = G3.length, $2) {
          if ($2 > J3 && ($2 = J3), $2 > Y3 && ($2 = Y3), $2 === 0) break inf_leave;
          t.arraySet(le3, K3, q3, $2, ue3), J3 -= $2, q3 += $2, Y3 -= $2, ue3 += $2, G3.length -= $2;
          break;
        }
        G3.mode = j2;
        break;
      case ee2:
        for (; Z3 < 14; ) {
          if (J3 === 0) break inf_leave;
          J3--, X3 += K3[q3++] << Z3, Z3 += 8;
        }
        if (G3.nlen = (X3 & 31) + 257, X3 >>>= 5, Z3 -= 5, G3.ndist = (X3 & 31) + 1, X3 >>>= 5, Z3 -= 5, G3.ncode = (X3 & 15) + 4, X3 >>>= 4, Z3 -= 4, G3.nlen > 286 || G3.ndist > 30) {
          e2.msg = `too many length or distance symbols`, G3.mode = U2;
          break;
        }
        G3.have = 0, G3.mode = I2;
      case I2:
        for (; G3.have < G3.ncode; ) {
          for (; Z3 < 3; ) {
            if (J3 === 0) break inf_leave;
            J3--, X3 += K3[q3++] << Z3, Z3 += 8;
          }
          G3.lens[Oe2[G3.have++]] = X3 & 7, X3 >>>= 3, Z3 -= 3;
        }
        for (; G3.have < 19; ) G3.lens[Oe2[G3.have++]] = 0;
        if (G3.lencode = G3.lendyn, G3.lenbits = 7, Ee2 = { bits: G3.lenbits }, we2 = a2(o2, G3.lens, 0, 19, G3.lencode, 0, G3.work, Ee2), G3.lenbits = Ee2.bits, we2) {
          e2.msg = `invalid code lengths set`, G3.mode = U2;
          break;
        }
        G3.have = 0, G3.mode = L2;
      case L2:
        for (; G3.have < G3.nlen + G3.ndist; ) {
          for (; ge2 = G3.lencode[X3 & (1 << G3.lenbits) - 1], _e3 = ge2 >>> 24, ve3 = ge2 >>> 16 & 255, ye3 = ge2 & 65535, !(_e3 <= Z3); ) {
            if (J3 === 0) break inf_leave;
            J3--, X3 += K3[q3++] << Z3, Z3 += 8;
          }
          if (ye3 < 16) X3 >>>= _e3, Z3 -= _e3, G3.lens[G3.have++] = ye3;
          else {
            if (ye3 === 16) {
              for (De2 = _e3 + 2; Z3 < De2; ) {
                if (J3 === 0) break inf_leave;
                J3--, X3 += K3[q3++] << Z3, Z3 += 8;
              }
              if (X3 >>>= _e3, Z3 -= _e3, G3.have === 0) {
                e2.msg = `invalid bit length repeat`, G3.mode = U2;
                break;
              }
              Ce2 = G3.lens[G3.have - 1], $2 = 3 + (X3 & 3), X3 >>>= 2, Z3 -= 2;
            } else if (ye3 === 17) {
              for (De2 = _e3 + 3; Z3 < De2; ) {
                if (J3 === 0) break inf_leave;
                J3--, X3 += K3[q3++] << Z3, Z3 += 8;
              }
              X3 >>>= _e3, Z3 -= _e3, Ce2 = 0, $2 = 3 + (X3 & 7), X3 >>>= 3, Z3 -= 3;
            } else {
              for (De2 = _e3 + 7; Z3 < De2; ) {
                if (J3 === 0) break inf_leave;
                J3--, X3 += K3[q3++] << Z3, Z3 += 8;
              }
              X3 >>>= _e3, Z3 -= _e3, Ce2 = 0, $2 = 11 + (X3 & 127), X3 >>>= 7, Z3 -= 7;
            }
            if (G3.have + $2 > G3.nlen + G3.ndist) {
              e2.msg = `invalid bit length repeat`, G3.mode = U2;
              break;
            }
            for (; $2--; ) G3.lens[G3.have++] = Ce2;
          }
        }
        if (G3.mode === U2) break;
        if (G3.lens[256] === 0) {
          e2.msg = `invalid code -- missing end-of-block`, G3.mode = U2;
          break;
        }
        if (G3.lenbits = 9, Ee2 = { bits: G3.lenbits }, we2 = a2(s2, G3.lens, 0, G3.nlen, G3.lencode, 0, G3.work, Ee2), G3.lenbits = Ee2.bits, we2) {
          e2.msg = `invalid literal/lengths set`, G3.mode = U2;
          break;
        }
        if (G3.distbits = 6, G3.distcode = G3.distdyn, Ee2 = { bits: G3.distbits }, we2 = a2(c2, G3.lens, G3.nlen, G3.ndist, G3.distcode, 0, G3.work, Ee2), G3.distbits = Ee2.bits, we2) {
          e2.msg = `invalid distances set`, G3.mode = U2;
          break;
        }
        if (G3.mode = R2, se3 === d2) break inf_leave;
      case R2:
        G3.mode = te2;
      case te2:
        if (J3 >= 6 && Y3 >= 258) {
          e2.next_out = ue3, e2.avail_out = Y3, e2.next_in = q3, e2.avail_in = J3, G3.hold = X3, G3.bits = Z3, i2(e2, Q3), ue3 = e2.next_out, le3 = e2.output, Y3 = e2.avail_out, q3 = e2.next_in, K3 = e2.input, J3 = e2.avail_in, X3 = G3.hold, Z3 = G3.bits, G3.mode === j2 && (G3.back = -1);
          break;
        }
        for (G3.back = 0; ge2 = G3.lencode[X3 & (1 << G3.lenbits) - 1], _e3 = ge2 >>> 24, ve3 = ge2 >>> 16 & 255, ye3 = ge2 & 65535, !(_e3 <= Z3); ) {
          if (J3 === 0) break inf_leave;
          J3--, X3 += K3[q3++] << Z3, Z3 += 8;
        }
        if (ve3 && !(ve3 & 240)) {
          for (be2 = _e3, xe2 = ve3, Se2 = ye3; ge2 = G3.lencode[Se2 + ((X3 & (1 << be2 + xe2) - 1) >> be2)], _e3 = ge2 >>> 24, ve3 = ge2 >>> 16 & 255, ye3 = ge2 & 65535, !(be2 + _e3 <= Z3); ) {
            if (J3 === 0) break inf_leave;
            J3--, X3 += K3[q3++] << Z3, Z3 += 8;
          }
          X3 >>>= be2, Z3 -= be2, G3.back += be2;
        }
        if (X3 >>>= _e3, Z3 -= _e3, G3.back += _e3, G3.length = ye3, ve3 === 0) {
          G3.mode = H2;
          break;
        }
        if (ve3 & 32) {
          G3.back = -1, G3.mode = j2;
          break;
        }
        if (ve3 & 64) {
          e2.msg = `invalid literal/length code`, G3.mode = U2;
          break;
        }
        G3.extra = ve3 & 15, G3.mode = ne2;
      case ne2:
        if (G3.extra) {
          for (De2 = G3.extra; Z3 < De2; ) {
            if (J3 === 0) break inf_leave;
            J3--, X3 += K3[q3++] << Z3, Z3 += 8;
          }
          G3.length += X3 & (1 << G3.extra) - 1, X3 >>>= G3.extra, Z3 -= G3.extra, G3.back += G3.extra;
        }
        G3.was = G3.length, G3.mode = z2;
      case z2:
        for (; ge2 = G3.distcode[X3 & (1 << G3.distbits) - 1], _e3 = ge2 >>> 24, ve3 = ge2 >>> 16 & 255, ye3 = ge2 & 65535, !(_e3 <= Z3); ) {
          if (J3 === 0) break inf_leave;
          J3--, X3 += K3[q3++] << Z3, Z3 += 8;
        }
        if (!(ve3 & 240)) {
          for (be2 = _e3, xe2 = ve3, Se2 = ye3; ge2 = G3.distcode[Se2 + ((X3 & (1 << be2 + xe2) - 1) >> be2)], _e3 = ge2 >>> 24, ve3 = ge2 >>> 16 & 255, ye3 = ge2 & 65535, !(be2 + _e3 <= Z3); ) {
            if (J3 === 0) break inf_leave;
            J3--, X3 += K3[q3++] << Z3, Z3 += 8;
          }
          X3 >>>= be2, Z3 -= be2, G3.back += be2;
        }
        if (X3 >>>= _e3, Z3 -= _e3, G3.back += _e3, ve3 & 64) {
          e2.msg = `invalid distance code`, G3.mode = U2;
          break;
        }
        G3.offset = ye3, G3.extra = ve3 & 15, G3.mode = B2;
      case B2:
        if (G3.extra) {
          for (De2 = G3.extra; Z3 < De2; ) {
            if (J3 === 0) break inf_leave;
            J3--, X3 += K3[q3++] << Z3, Z3 += 8;
          }
          G3.offset += X3 & (1 << G3.extra) - 1, X3 >>>= G3.extra, Z3 -= G3.extra, G3.back += G3.extra;
        }
        if (G3.offset > G3.dmax) {
          e2.msg = `invalid distance too far back`, G3.mode = U2;
          break;
        }
        G3.mode = V2;
      case V2:
        if (Y3 === 0) break inf_leave;
        if ($2 = Q3 - Y3, G3.offset > $2) {
          if ($2 = G3.offset - $2, $2 > G3.whave && G3.sane) {
            e2.msg = `invalid distance too far back`, G3.mode = U2;
            break;
          }
          $2 > G3.wnext ? ($2 -= G3.wnext, me3 = G3.wsize - $2) : me3 = G3.wnext - $2, $2 > G3.length && ($2 = G3.length), he2 = G3.window;
        } else he2 = le3, me3 = ue3 - G3.offset, $2 = G3.length;
        $2 > Y3 && ($2 = Y3), Y3 -= $2, G3.length -= $2;
        do
          le3[ue3++] = he2[me3++];
        while (--$2);
        G3.length === 0 && (G3.mode = te2);
        break;
      case H2:
        if (Y3 === 0) break inf_leave;
        le3[ue3++] = G3.length, Y3--, G3.mode = te2;
        break;
      case re2:
        if (G3.wrap) {
          for (; Z3 < 32; ) {
            if (J3 === 0) break inf_leave;
            J3--, X3 |= K3[q3++] << Z3, Z3 += 8;
          }
          if (Q3 -= Y3, e2.total_out += Q3, G3.total += Q3, Q3 && (e2.adler = G3.check = G3.flags ? r(G3.check, le3, Q3, ue3 - Q3) : n(G3.check, le3, Q3, ue3 - Q3)), Q3 = Y3, (G3.flags ? X3 : ce2(X3)) !== G3.check) {
            e2.msg = `incorrect data check`, G3.mode = U2;
            break;
          }
          X3 = 0, Z3 = 0;
        }
        G3.mode = ie2;
      case ie2:
        if (G3.wrap && G3.flags) {
          for (; Z3 < 32; ) {
            if (J3 === 0) break inf_leave;
            J3--, X3 += K3[q3++] << Z3, Z3 += 8;
          }
          if (X3 !== (G3.total & 4294967295)) {
            e2.msg = `incorrect length check`, G3.mode = U2;
            break;
          }
          X3 = 0, Z3 = 0;
        }
        G3.mode = ae2;
      case ae2:
        we2 = p2;
        break inf_leave;
      case U2:
        we2 = g2;
        break inf_leave;
      case W2:
        return _2;
      case oe2:
      default:
        return h3;
    }
    return e2.next_out = ue3, e2.avail_out = Y3, e2.next_in = q3, e2.avail_in = J3, G3.hold = X3, G3.bits = Z3, (G3.wsize || Q3 !== e2.avail_out && G3.mode < U2 && (G3.mode < re2 || se3 !== l2)) && pe2(e2, e2.output, e2.next_out, Q3 - e2.avail_out) ? (G3.mode = W2, _2) : (de3 -= e2.avail_in, Q3 -= e2.avail_out, e2.total_in += de3, e2.total_out += Q3, G3.total += Q3, G3.wrap && Q3 && (e2.adler = G3.check = G3.flags ? r(G3.check, le3, Q3, e2.next_out - Q3) : n(G3.check, le3, Q3, e2.next_out - Q3)), e2.data_type = G3.bits + (G3.last ? 64 : 0) + (G3.mode === j2 ? 128 : 0) + (G3.mode === R2 || G3.mode === P2 ? 256 : 0), (de3 === 0 && Q3 === 0 || se3 === l2) && we2 === f3 && (we2 = v2), we2);
  }
  function _e2(e2) {
    if (!e2 || !e2.state) return h3;
    var t2 = e2.state;
    return t2.window &&= null, e2.state = null, f3;
  }
  function ve2(e2, t2) {
    var n2;
    return !e2 || !e2.state || (n2 = e2.state, !(n2.wrap & 2)) ? h3 : (n2.head = t2, t2.done = false, f3);
  }
  function ye2(e2, t2) {
    var r2 = t2.length, i3, a3, o3;
    return !e2 || !e2.state || (i3 = e2.state, i3.wrap !== 0 && i3.mode !== A2) ? h3 : i3.mode === A2 && (a3 = 1, a3 = n(a3, t2, r2, 0), a3 !== i3.check) ? g2 : (o3 = pe2(e2, t2, r2, r2), o3 ? (i3.mode = W2, _2) : (i3.havedict = 1, f3));
  }
  e.inflateReset = ue2, e.inflateReset2 = J2, e.inflateResetKeep = q2, e.inflateInit = X2, e.inflateInit2 = Y2, e.inflate = me2, e.inflateEnd = _e2, e.inflateGetHeader = ve2, e.inflateSetDictionary = ye2, e.inflateInfo = `pako inflate (from Nodeca project)`;
}));
var Te = f(((e, t) => {
  t.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
}));
var Ee = f(((e, t) => {
  function n() {
    this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = ``, this.comment = ``, this.hcrc = 0, this.done = false;
  }
  t.exports = n;
}));
var De = f(((e) => {
  var t = we(), n = $(), r = ye(), i2 = Te(), a2 = _e(), o2 = be(), s2 = Ee(), c2 = Object.prototype.toString;
  function l2(e2) {
    if (!(this instanceof l2)) return new l2(e2);
    this.options = n.assign({ chunkSize: 16384, windowBits: 0, to: `` }, e2 || {});
    var u3 = this.options;
    u3.raw && u3.windowBits >= 0 && u3.windowBits < 16 && (u3.windowBits = -u3.windowBits, u3.windowBits === 0 && (u3.windowBits = -15)), u3.windowBits >= 0 && u3.windowBits < 16 && !(e2 && e2.windowBits) && (u3.windowBits += 32), u3.windowBits > 15 && u3.windowBits < 48 && (u3.windowBits & 15 || (u3.windowBits |= 15)), this.err = 0, this.msg = ``, this.ended = false, this.chunks = [], this.strm = new o2(), this.strm.avail_out = 0;
    var d3 = t.inflateInit2(this.strm, u3.windowBits);
    if (d3 !== i2.Z_OK || (this.header = new s2(), t.inflateGetHeader(this.strm, this.header), u3.dictionary && (typeof u3.dictionary == `string` ? u3.dictionary = r.string2buf(u3.dictionary) : c2.call(u3.dictionary) === `[object ArrayBuffer]` && (u3.dictionary = new Uint8Array(u3.dictionary)), u3.raw && (d3 = t.inflateSetDictionary(this.strm, u3.dictionary), d3 !== i2.Z_OK)))) throw Error(a2[d3]);
  }
  l2.prototype.push = function(e2, a3) {
    var o3 = this.strm, s3 = this.options.chunkSize, l3 = this.options.dictionary, u3, d3, f3, p2, m3, h3 = false;
    if (this.ended) return false;
    d3 = a3 === ~~a3 ? a3 : a3 === true ? i2.Z_FINISH : i2.Z_NO_FLUSH, typeof e2 == `string` ? o3.input = r.binstring2buf(e2) : c2.call(e2) === `[object ArrayBuffer]` ? o3.input = new Uint8Array(e2) : o3.input = e2, o3.next_in = 0, o3.avail_in = o3.input.length;
    do {
      if (o3.avail_out === 0 && (o3.output = new n.Buf8(s3), o3.next_out = 0, o3.avail_out = s3), u3 = t.inflate(o3, i2.Z_NO_FLUSH), u3 === i2.Z_NEED_DICT && l3 && (u3 = t.inflateSetDictionary(this.strm, l3)), u3 === i2.Z_BUF_ERROR && h3 === true && (u3 = i2.Z_OK, h3 = false), u3 !== i2.Z_STREAM_END && u3 !== i2.Z_OK) return this.onEnd(u3), this.ended = true, false;
      o3.next_out && (o3.avail_out === 0 || u3 === i2.Z_STREAM_END || o3.avail_in === 0 && (d3 === i2.Z_FINISH || d3 === i2.Z_SYNC_FLUSH)) && (this.options.to === `string` ? (f3 = r.utf8border(o3.output, o3.next_out), p2 = o3.next_out - f3, m3 = r.buf2string(o3.output, f3), o3.next_out = p2, o3.avail_out = s3 - p2, p2 && n.arraySet(o3.output, o3.output, f3, p2, 0), this.onData(m3)) : this.onData(n.shrinkBuf(o3.output, o3.next_out))), o3.avail_in === 0 && o3.avail_out === 0 && (h3 = true);
    } while ((o3.avail_in > 0 || o3.avail_out === 0) && u3 !== i2.Z_STREAM_END);
    return u3 === i2.Z_STREAM_END && (d3 = i2.Z_FINISH), d3 === i2.Z_FINISH ? (u3 = t.inflateEnd(this.strm), this.onEnd(u3), this.ended = true, u3 === i2.Z_OK) : d3 === i2.Z_SYNC_FLUSH ? (this.onEnd(i2.Z_OK), o3.avail_out = 0, true) : true;
  }, l2.prototype.onData = function(e2) {
    this.chunks.push(e2);
  }, l2.prototype.onEnd = function(e2) {
    e2 === i2.Z_OK && (this.options.to === `string` ? this.result = this.chunks.join(``) : this.result = n.flattenChunks(this.chunks)), this.chunks = [], this.err = e2, this.msg = this.strm.msg;
  };
  function u2(e2, t2) {
    var n2 = new l2(t2);
    if (n2.push(e2, true), n2.err) throw n2.msg || a2[n2.err];
    return n2.result;
  }
  function d2(e2, t2) {
    return t2 ||= {}, t2.raw = true, u2(e2, t2);
  }
  e.Inflate = l2, e.inflate = u2, e.inflateRaw = d2, e.ungzip = u2;
}));
var Oe = f(((e, t) => {
  var n = $().assign, r = xe(), i2 = De(), a2 = Te(), o2 = {};
  n(o2, r, i2, a2), t.exports = o2;
}));
var ke = f(((e, t) => {
  let n = (e2, t2) => function(...n2) {
    let r = t2.promiseModule;
    return new r((r2, i2) => {
      t2.multiArgs ? n2.push((...e3) => {
        t2.errorFirst ? e3[0] ? i2(e3) : (e3.shift(), r2(e3)) : r2(e3);
      }) : t2.errorFirst ? n2.push((e3, t3) => {
        e3 ? i2(e3) : r2(t3);
      }) : n2.push(r2), e2.apply(this, n2);
    });
  };
  t.exports = (e2, t2) => {
    t2 = Object.assign({ exclude: [/.+(Sync|Stream)$/], errorFirst: true, promiseModule: Promise }, t2);
    let r = typeof e2;
    if (!(e2 !== null && (r === `object` || r === `function`))) throw TypeError(`Expected \`input\` to be a \`Function\` or \`Object\`, got \`${e2 === null ? `null` : r}\``);
    let i2 = (e3) => {
      let n2 = (t3) => typeof t3 == `string` ? e3 === t3 : t3.test(e3);
      return t2.include ? t2.include.some(n2) : !t2.exclude.some(n2);
    }, a2;
    a2 = r === `function` ? function(...r2) {
      return t2.excludeMain ? e2(...r2) : n(e2, t2).apply(this, r2);
    } : Object.create(Object.getPrototypeOf(e2));
    for (let r2 in e2) {
      let o2 = e2[r2];
      a2[r2] = typeof o2 == `function` && i2(r2) ? n(o2, t2) : o2;
    }
    return a2;
  };
}));
var Ae = f(((e, t) => {
  function n(e2) {
    return Array.isArray(e2) ? e2 : [e2];
  }
  let r = /^\s+$/, i2 = /(?:[^\\]|^)\\$/, a2 = /^\\!/, o2 = /^\\#/, s2 = /\r?\n/g, c2 = /^\.*\/|^\.+$/, l2 = `node-ignore`;
  typeof Symbol < `u` && (l2 = /* @__PURE__ */ Symbol.for(`node-ignore`));
  let u2 = l2, d2 = (e2, t2, n2) => Object.defineProperty(e2, t2, { value: n2 }), f3 = /([0-z])-([0-z])/g, p2 = () => false, m3 = (e2) => e2.replace(f3, (e3, t2, n2) => t2.charCodeAt(0) <= n2.charCodeAt(0) ? e3 : ``), h3 = (e2) => {
    let { length: t2 } = e2;
    return e2.slice(0, t2 - t2 % 2);
  }, g2 = [[/^\uFEFF/, () => ``], [/((?:\\\\)*?)(\\?\s+)$/, (e2, t2, n2) => t2 + (n2.indexOf(`\\`) === 0 ? ` ` : ``)], [/(\\+?)\s/g, (e2, t2) => {
    let { length: n2 } = t2;
    return t2.slice(0, n2 - n2 % 2) + ` `;
  }], [/[\\$.|*+(){^]/g, (e2) => `\\${e2}`], [/(?!\\)\?/g, () => `[^/]`], [/^\//, () => `^`], [/\//g, () => `\\/`], [/^\^*\\\*\\\*\\\//, () => `^(?:.*\\/)?`], [/^(?=[^^])/, function() {
    return /\/(?!$)/.test(this) ? `^` : `(?:^|\\/)`;
  }], [/\\\/\\\*\\\*(?=\\\/|$)/g, (e2, t2, n2) => t2 + 6 < n2.length ? `(?:\\/[^\\/]+)*` : `\\/.+`], [/(^|[^\\]+)(\\\*)+(?=.+)/g, (e2, t2, n2) => t2 + n2.replace(/\\\*/g, `[^\\/]*`)], [/\\\\\\(?=[$.|*+(){^])/g, () => `\\`], [/\\\\/g, () => `\\`], [/(\\)?\[([^\]/]*?)(\\*)($|\])/g, (e2, t2, n2, r2, i3) => t2 === `\\` ? `\\[${n2}${h3(r2)}${i3}` : i3 === `]` && r2.length % 2 == 0 ? `[${m3(n2)}${r2}]` : `[]`], [/(?:[^*])$/, (e2) => /\/$/.test(e2) ? `${e2}$` : `${e2}(?=$|\\/$)`], [/(\^|\\\/)?\\\*$/, (e2, t2) => `${t2 ? `${t2}[^/]+` : `[^/]*`}(?=$|\\/$)`]], _2 = /* @__PURE__ */ Object.create(null), v2 = (e2, t2) => {
    let n2 = _2[e2];
    return n2 || (n2 = g2.reduce((t3, [n3, r2]) => t3.replace(n3, r2.bind(e2)), e2), _2[e2] = n2), t2 ? new RegExp(n2, `i`) : new RegExp(n2);
  }, y2 = (e2) => typeof e2 == `string`, b2 = (e2) => e2 && y2(e2) && !r.test(e2) && !i2.test(e2) && e2.indexOf(`#`) !== 0, x2 = (e2) => e2.split(s2);
  var S2 = class {
    constructor(e2, t2, n2, r2) {
      this.origin = e2, this.pattern = t2, this.negative = n2, this.regex = r2;
    }
  };
  let C2 = (e2, t2) => {
    let n2 = e2, r2 = false;
    e2.indexOf(`!`) === 0 && (r2 = true, e2 = e2.substr(1)), e2 = e2.replace(a2, `!`).replace(o2, `#`);
    let i3 = v2(e2, t2);
    return new S2(n2, e2, r2, i3);
  }, w2 = (e2, t2) => {
    throw new t2(e2);
  }, T2 = (e2, t2, n2) => y2(e2) ? e2 ? T2.isNotRelative(e2) ? n2(`path should be a \`path.relative()\`d string, but got "${t2}"`, RangeError) : true : n2(`path must not be empty`, TypeError) : n2(`path must be a string, but got \`${t2}\``, TypeError), E2 = (e2) => c2.test(e2);
  T2.isNotRelative = E2, T2.convert = (e2) => e2;
  var D2 = class {
    constructor({ ignorecase: e2 = true, ignoreCase: t2 = e2, allowRelativePaths: n2 = false } = {}) {
      d2(this, u2, true), this._rules = [], this._ignoreCase = t2, this._allowRelativePaths = n2, this._initCache();
    }
    _initCache() {
      this._ignoreCache = /* @__PURE__ */ Object.create(null), this._testCache = /* @__PURE__ */ Object.create(null);
    }
    _addPattern(e2) {
      if (e2 && e2[u2]) {
        this._rules = this._rules.concat(e2._rules), this._added = true;
        return;
      }
      if (b2(e2)) {
        let t2 = C2(e2, this._ignoreCase);
        this._added = true, this._rules.push(t2);
      }
    }
    add(e2) {
      return this._added = false, n(y2(e2) ? x2(e2) : e2).forEach(this._addPattern, this), this._added && this._initCache(), this;
    }
    addPattern(e2) {
      return this.add(e2);
    }
    _testOne(e2, t2) {
      let n2 = false, r2 = false;
      return this._rules.forEach((i3) => {
        let { negative: a3 } = i3;
        r2 === a3 && n2 !== r2 || a3 && !n2 && !r2 && !t2 || i3.regex.test(e2) && (n2 = !a3, r2 = a3);
      }), { ignored: n2, unignored: r2 };
    }
    _test(e2, t2, n2, r2) {
      let i3 = e2 && T2.convert(e2);
      return T2(i3, e2, this._allowRelativePaths ? p2 : w2), this._t(i3, t2, n2, r2);
    }
    _t(e2, t2, n2, r2) {
      if (e2 in t2) return t2[e2];
      if (r2 ||= e2.split(`/`), r2.pop(), !r2.length) return t2[e2] = this._testOne(e2, n2);
      let i3 = this._t(r2.join(`/`) + `/`, t2, n2, r2);
      return t2[e2] = i3.ignored ? i3 : this._testOne(e2, n2);
    }
    ignores(e2) {
      return this._test(e2, this._ignoreCache, false).ignored;
    }
    createFilter() {
      return (e2) => !this.ignores(e2);
    }
    filter(e2) {
      return n(e2).filter(this.createFilter());
    }
    test(e2) {
      return this._test(e2, this._testCache, true);
    }
  };
  let O2 = (e2) => new D2(e2);
  if (O2.isPathValid = (e2) => T2(e2 && T2.convert(e2), e2, p2), O2.default = O2, t.exports = O2, typeof process < `u` && (process.env && process.env.IGNORE_TEST_WIN32 || process.platform === `win32`)) {
    T2.convert = (e3) => /^\\\\\?\\/.test(e3) || /["<>|\u0000-\u001F]+/u.test(e3) ? e3 : e3.replace(/\\/g, `/`);
    let e2 = /^[a-z]:\//i;
    T2.isNotRelative = (t2) => e2.test(t2) || E2(t2);
  }
}));
var je = f(((e, t) => {
  function n(e2) {
    return e2.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
  }
  function r(e2, t2, r2) {
    return t2 = t2 instanceof RegExp ? t2 : new RegExp(n(t2), `g`), e2.replace(t2, r2);
  }
  t.exports = { clean: function(e2) {
    if (typeof e2 != `string`) throw Error(`Expected a string, received: ` + e2);
    return e2 = r(e2, `./`, `/`), e2 = r(e2, `..`, `.`), e2 = r(e2, ` `, `-`), e2 = r(e2, /^[~^:?*\\\-]/g, ``), e2 = r(e2, /[~^:?*\\]/g, `-`), e2 = r(e2, /[~^:?*\\\-]$/g, ``), e2 = r(e2, `@{`, `-`), e2 = r(e2, /\.$/g, ``), e2 = r(e2, /\/$/g, ``), e2 = r(e2, /\.lock$/g, ``), e2;
  } };
}));
var Me = f(((e, t) => {
  t.exports = function(e2, t2) {
    var n = e2, r = t2, i2 = n.length, a2 = r.length, o2 = false, s2 = null, c2 = i2 + 1, l2 = [], u2 = [], d2 = [], f3 = ``, p2 = -1, m3 = 0, h3 = 1, g2, _2, v2 = function() {
      i2 >= a2 && (g2 = n, _2 = i2, n = r, r = g2, i2 = a2, a2 = _2, o2 = true, c2 = i2 + 1);
    }, y2 = function(e3, t3, n2) {
      return { x: e3, y: t3, k: n2 };
    }, b2 = function(e3, t3) {
      return { elem: e3, t: t3 };
    }, x2 = function(e3, t3, o3) {
      var s3 = t3 > o3 ? l2[e3 - 1 + c2] : l2[e3 + 1 + c2], d3, f4 = Math.max(t3, o3);
      for (d3 = f4 - e3; d3 < i2 && f4 < a2 && n[d3] === r[f4]; ) ++d3, ++f4;
      return l2[e3 + c2] = u2.length, u2[u2.length] = new y2(d3, f4, s3), f4;
    }, S2 = function(e3) {
      var t3 = i3 = 1, i3, a3 = s3 = 0, s3, c3;
      for (c3 = e3.length - 1; c3 >= 0; --c3) for (; a3 < e3[c3].x || s3 < e3[c3].y; ) e3[c3].y - e3[c3].x > s3 - a3 ? (o2 ? d2[d2.length] = new b2(r[s3], p2) : d2[d2.length] = new b2(r[s3], h3), ++i3, ++s3) : e3[c3].y - e3[c3].x < s3 - a3 ? (o2 ? d2[d2.length] = new b2(n[a3], h3) : d2[d2.length] = new b2(n[a3], p2), ++t3, ++a3) : (d2[d2.length] = new b2(n[a3], m3), f3 += n[a3], ++t3, ++i3, ++a3, ++s3);
    };
    return v2(), { SES_DELETE: -1, SES_COMMON: 0, SES_ADD: 1, editdistance: function() {
      return s2;
    }, getlcs: function() {
      return f3;
    }, getses: function() {
      return d2;
    }, compose: function() {
      var e3 = a2 - i2, t3 = i2 + a2 + 3, n2 = {}, r2, o3, d3, f4, p3;
      for (f4 = 0; f4 < t3; ++f4) n2[f4] = -1, l2[f4] = -1;
      r2 = -1;
      do {
        for (++r2, p3 = -r2; p3 <= e3 - 1; ++p3) n2[p3 + c2] = x2(p3, n2[p3 - 1 + c2] + 1, n2[p3 + 1 + c2]);
        for (p3 = e3 + r2; p3 >= e3 + 1; --p3) n2[p3 + c2] = x2(p3, n2[p3 - 1 + c2] + 1, n2[p3 + 1 + c2]);
        n2[e3 + c2] = x2(e3, n2[e3 - 1 + c2] + 1, n2[e3 + 1 + c2]);
      } while (n2[e3 + c2] !== a2);
      for (s2 = e3 + 2 * r2, o3 = l2[e3 + c2], d3 = []; o3 !== -1; ) d3[d3.length] = new y2(u2[o3].x, u2[o3].y, null), o3 = u2[o3].k;
      S2(d3);
    } };
  };
}));
var Ne = f(((e, t) => {
  var n = Me();
  function r(e2, t2) {
    var r2 = new n(e2, t2);
    r2.compose();
    for (var i3 = r2.getses(), a3, o3, s2 = e2.length - 1, c2 = t2.length - 1, l2 = i3.length - 1; l2 >= 0; --l2) i3[l2].t === r2.SES_COMMON ? (o3 ? (o3.chain = { file1index: s2, file2index: c2, chain: null }, o3 = o3.chain) : (a3 = { file1index: s2, file2index: c2, chain: null }, o3 = a3), s2--, c2--) : i3[l2].t === r2.SES_DELETE ? s2-- : i3[l2].t === r2.SES_ADD && c2--;
    var u2 = { file1index: -1, file2index: -1, chain: null };
    return o3 ? (o3.chain = u2, a3) : u2;
  }
  function i2(e2, t2) {
    for (var n2 = [], i3 = e2.length, a3 = t2.length, o3 = r(e2, t2); o3 !== null; o3 = o3.chain) {
      var s2 = i3 - o3.file1index - 1, c2 = a3 - o3.file2index - 1;
      i3 = o3.file1index, a3 = o3.file2index, (s2 || c2) && n2.push({ file1: [i3 + 1, s2], file2: [a3 + 1, c2] });
    }
    return n2.reverse(), n2;
  }
  function a2(e2, t2, n2) {
    var r2, a3 = i2(t2, e2), o3 = i2(t2, n2), s2 = [];
    function c2(e3, t3) {
      s2.push([e3.file1[0], t3, e3.file1[1], e3.file2[0], e3.file2[1]]);
    }
    for (r2 = 0; r2 < a3.length; r2++) c2(a3[r2], 0);
    for (r2 = 0; r2 < o3.length; r2++) c2(o3[r2], 2);
    s2.sort(function(e3, t3) {
      return e3[0] - t3[0];
    });
    var l2 = [], u2 = 0;
    function d2(e3) {
      e3 > u2 && (l2.push([1, u2, e3 - u2]), u2 = e3);
    }
    for (var f3 = 0; f3 < s2.length; f3++) {
      for (var p2 = f3, m3 = s2[f3], h3 = m3[0], g2 = h3 + m3[2]; f3 < s2.length - 1; ) {
        var _2 = s2[f3 + 1], v2 = _2[0];
        if (v2 > g2) break;
        g2 = Math.max(g2, v2 + _2[2]), f3++;
      }
      if (d2(h3), p2 == f3) m3[4] > 0 && l2.push([m3[1], m3[3], m3[4]]);
      else {
        var y2 = { 0: [e2.length, -1, t2.length, -1], 2: [n2.length, -1, t2.length, -1] };
        for (r2 = p2; r2 <= f3; r2++) {
          m3 = s2[r2];
          var b2 = y2[m3[1]], x2 = m3[0], S2 = x2 + m3[2], C2 = m3[3], w2 = C2 + m3[4];
          b2[0] = Math.min(C2, b2[0]), b2[1] = Math.max(w2, b2[1]), b2[2] = Math.min(x2, b2[2]), b2[3] = Math.max(S2, b2[3]);
        }
        var T2 = y2[0][0] + (h3 - y2[0][2]), E2 = y2[0][1] + (g2 - y2[0][3]), D2 = y2[2][0] + (h3 - y2[2][2]), O2 = y2[2][1] + (g2 - y2[2][3]);
        l2.push([-1, T2, E2 - T2, h3, g2 - h3, D2, O2 - D2]);
      }
      u2 = g2;
    }
    return d2(t2.length), l2;
  }
  function o2(e2, t2, n2) {
    var r2 = [], i3 = [e2, t2, n2], o3 = a2(e2, t2, n2), s2 = [];
    function c2() {
      s2.length && r2.push({ ok: s2 }), s2 = [];
    }
    function l2(e3) {
      for (var t3 = 0; t3 < e3.length; t3++) s2.push(e3[t3]);
    }
    function u2(t3) {
      if (t3[2] != t3[6]) return true;
      for (var r3 = t3[1], i4 = t3[5], a3 = 0; a3 < t3[2]; a3++) if (e2[a3 + r3] != n2[a3 + i4]) return true;
      return false;
    }
    for (var d2 = 0; d2 < o3.length; d2++) {
      var f3 = o3[d2], p2 = f3[0];
      p2 == -1 ? u2(f3) ? (c2(), r2.push({ conflict: { a: e2.slice(f3[1], f3[1] + f3[2]), aIndex: f3[1], o: t2.slice(f3[3], f3[3] + f3[4]), oIndex: f3[3], b: n2.slice(f3[5], f3[5] + f3[6]), bIndex: f3[5] } })) : l2(i3[0].slice(f3[1], f3[1] + f3[2])) : l2(i3[p2].slice(f3[1], f3[1] + f3[2]));
    }
    return c2(), r2;
  }
  t.exports = o2;
}));
var Pe = f(((t) => {
  Object.defineProperty(t, `__esModule`, { value: true });
  function n(e) {
    return e && typeof e == `object` && `default` in e ? e.default : e;
  }
  var r = n(u()), i2 = n(fe()), a2 = n(pe()), o2 = n(Oe()), s2 = h(`crypto`), c2 = n(ke());
  n(Ae());
  var l2 = n(je());
  n(Ne());
  var d2 = class e extends Error {
    constructor(e2) {
      super(e2), this.caller = ``;
    }
    toJSON() {
      return { code: this.code, data: this.data, caller: this.caller, message: this.message, stack: this.stack };
    }
    fromJSON(t2) {
      let n2 = new e(t2.message);
      return n2.code = t2.code, n2.data = t2.data, n2.caller = t2.caller, n2.stack = t2.stack, n2;
    }
    get isIsomorphicGitError() {
      return true;
    }
  }, f3 = class e extends d2 {
    constructor(t2) {
      super(`Modifying the index is not possible because you have unmerged files: ${t2.toString}. Fix them up in the work tree, and then use 'git add/rm as appropriate to mark resolution and make a commit.`), this.code = this.name = e.code, this.data = { filepaths: t2 };
    }
  };
  f3.code = `UnmergedPathsError`;
  var p2 = class e extends d2 {
    constructor(t2) {
      super(`An internal error caused this command to fail.

If you're not a developer, report the bug to the developers of the application you're using. If this is a bug in isomorphic-git then you should create a proper bug yourselves. The bug should include a minimal reproduction and details about the version and environment.

Please file a bug report at https://github.com/isomorphic-git/isomorphic-git/issues with this error message: ${t2}`), this.code = this.name = e.code, this.data = { message: t2 };
    }
  };
  p2.code = `InternalError`;
  var m3 = class e extends d2 {
    constructor(t2) {
      super(`The filepath "${t2}" contains unsafe character sequences`), this.code = this.name = e.code, this.data = { filepath: t2 };
    }
  };
  m3.code = `UnsafeFilepathError`;
  var h3 = class {
    constructor(e) {
      this.buffer = e, this._start = 0;
    }
    eof() {
      return this._start >= this.buffer.length;
    }
    tell() {
      return this._start;
    }
    seek(e) {
      this._start = e;
    }
    slice(e) {
      let t2 = this.buffer.slice(this._start, this._start + e);
      return this._start += e, t2;
    }
    toString(e, t2) {
      let n2 = this.buffer.toString(e, this._start, this._start + t2);
      return this._start += t2, n2;
    }
    write(e, t2, n2) {
      let r2 = this.buffer.write(e, this._start, t2, n2);
      return this._start += t2, r2;
    }
    copy(e, t2, n2) {
      let r2 = e.copy(this.buffer, this._start, t2, n2);
      return this._start += r2, r2;
    }
    readUInt8() {
      let e = this.buffer.readUInt8(this._start);
      return this._start += 1, e;
    }
    writeUInt8(e) {
      let t2 = this.buffer.writeUInt8(e, this._start);
      return this._start += 1, t2;
    }
    readUInt16BE() {
      let e = this.buffer.readUInt16BE(this._start);
      return this._start += 2, e;
    }
    writeUInt16BE(e) {
      let t2 = this.buffer.writeUInt16BE(e, this._start);
      return this._start += 2, t2;
    }
    readUInt32BE() {
      let e = this.buffer.readUInt32BE(this._start);
      return this._start += 4, e;
    }
    writeUInt32BE(e) {
      let t2 = this.buffer.writeUInt32BE(e, this._start);
      return this._start += 4, t2;
    }
  };
  function g2(e, t2) {
    return -(e < t2) || +(e > t2);
  }
  function _2(e, t2) {
    return g2(e.path, t2.path);
  }
  function v2(e) {
    let t2 = e > 0 ? e >> 12 : 0;
    t2 !== 4 && t2 !== 8 && t2 !== 10 && t2 !== 14 && (t2 = 8);
    let n2 = e & 511;
    return n2 = n2 & 73 ? 493 : 420, t2 !== 8 && (n2 = 0), (t2 << 12) + n2;
  }
  let y2 = 2 ** 32;
  function b2(e, t2, n2, r2) {
    if (e !== void 0 && t2 !== void 0) return [e, t2];
    n2 === void 0 && (n2 = r2.valueOf());
    let i3 = Math.floor(n2 / 1e3);
    return [i3, (n2 - i3 * 1e3) * 1e6];
  }
  function x2(e) {
    let [t2, n2] = b2(e.ctimeSeconds, e.ctimeNanoseconds, e.ctimeMs, e.ctime), [r2, i3] = b2(e.mtimeSeconds, e.mtimeNanoseconds, e.mtimeMs, e.mtime);
    return { ctimeSeconds: t2 % y2, ctimeNanoseconds: n2 % y2, mtimeSeconds: r2 % y2, mtimeNanoseconds: i3 % y2, dev: e.dev % y2, ino: e.ino % y2, mode: v2(e.mode % y2), uid: e.uid % y2, gid: e.gid % y2, size: e.size > -1 ? e.size % y2 : 0 };
  }
  function S2(e) {
    let t2 = ``;
    for (let n2 of new Uint8Array(e)) n2 < 16 && (t2 += `0`), t2 += n2.toString(16);
    return t2;
  }
  let C2 = null;
  async function w2(e) {
    return C2 === null && (C2 = await D2()), C2 ? E2(e) : T2(e);
  }
  function T2(e) {
    return new i2().update(e).digest(`hex`);
  }
  async function E2(e) {
    return S2(await crypto.subtle.digest(`SHA-1`, e));
  }
  async function D2() {
    try {
      return await E2(new Uint8Array([])) === `da39a3ee5e6b4b0d3255bfef95601890afd80709`;
    } catch {
    }
    return false;
  }
  function O2(e) {
    return { assumeValid: !!(e & 32768), extended: !!(e & 16384), stage: (e & 12288) >> 12, nameLength: e & 4095 };
  }
  function k3(e) {
    let t2 = e.flags;
    return t2.extended = false, t2.nameLength = Math.min(Buffer.from(e.path).length, 4095), (t2.assumeValid ? 32768 : 0) + (t2.extended ? 16384 : 0) + ((t2.stage & 3) << 12) + (t2.nameLength & 4095);
  }
  var A2 = class e {
    constructor(e2, t2) {
      this._dirty = false, this._unmergedPaths = t2 || /* @__PURE__ */ new Set(), this._entries = e2 || /* @__PURE__ */ new Map();
    }
    _addEntry(e2) {
      if (e2.flags.stage === 0) e2.stages = [e2], this._entries.set(e2.path, e2), this._unmergedPaths.delete(e2.path);
      else {
        let t2 = this._entries.get(e2.path);
        t2 ||= (this._entries.set(e2.path, e2), e2), t2.stages[e2.flags.stage] = e2, this._unmergedPaths.add(e2.path);
      }
    }
    static async from(t2) {
      if (Buffer.isBuffer(t2)) return e.fromBuffer(t2);
      if (t2 === null) return new e(null);
      throw new p2(`invalid type passed to GitIndex.from`);
    }
    static async fromBuffer(t2) {
      if (t2.length === 0) throw new p2(`Index file is empty (.git/index)`);
      let n2 = new e(), r2 = new h3(t2), i3 = r2.toString(`utf8`, 4);
      if (i3 !== `DIRC`) throw new p2(`Invalid dircache magic file number: ${i3}`);
      let a3 = await w2(t2.slice(0, -20)), o3 = t2.slice(-20).toString(`hex`);
      if (o3 !== a3) throw new p2(`Invalid checksum in GitIndex buffer: expected ${o3} but saw ${a3}`);
      let s3 = r2.readUInt32BE();
      if (s3 !== 2) throw new p2(`Unsupported dircache version: ${s3}`);
      let c3 = r2.readUInt32BE(), l3 = 0;
      for (; !r2.eof() && l3 < c3; ) {
        let e2 = {};
        e2.ctimeSeconds = r2.readUInt32BE(), e2.ctimeNanoseconds = r2.readUInt32BE(), e2.mtimeSeconds = r2.readUInt32BE(), e2.mtimeNanoseconds = r2.readUInt32BE(), e2.dev = r2.readUInt32BE(), e2.ino = r2.readUInt32BE(), e2.mode = r2.readUInt32BE(), e2.uid = r2.readUInt32BE(), e2.gid = r2.readUInt32BE(), e2.size = r2.readUInt32BE(), e2.oid = r2.slice(20).toString(`hex`), e2.flags = O2(r2.readUInt16BE());
        let i4 = t2.indexOf(0, r2.tell() + 1) - r2.tell();
        if (i4 < 1) throw new p2(`Got a path length of: ${i4}`);
        if (e2.path = r2.toString(`utf8`, i4), e2.path.includes(`..\\`) || e2.path.includes(`../`)) throw new m3(e2.path);
        let a4 = 8 - (r2.tell() - 12) % 8;
        for (a4 === 0 && (a4 = 8); a4--; ) {
          let t3 = r2.readUInt8();
          if (t3 !== 0) throw new p2(`Expected 1-8 null characters but got '${t3}' after ${e2.path}`);
          if (r2.eof()) throw new p2(`Unexpected end of file`);
        }
        e2.stages = [], n2._addEntry(e2), l3++;
      }
      return n2;
    }
    get unmergedPaths() {
      return [...this._unmergedPaths];
    }
    get entries() {
      return [...this._entries.values()].sort(_2);
    }
    get entriesMap() {
      return this._entries;
    }
    get entriesFlat() {
      return [...this.entries].flatMap((e2) => e2.stages.length > 1 ? e2.stages.filter((e3) => e3) : e2);
    }
    *[Symbol.iterator]() {
      for (let e2 of this.entries) yield e2;
    }
    insert({ filepath: e2, stats: t2, oid: n2, stage: r2 = 0 }) {
      t2 ||= { ctimeSeconds: 0, ctimeNanoseconds: 0, mtimeSeconds: 0, mtimeNanoseconds: 0, dev: 0, ino: 0, mode: 0, uid: 0, gid: 0, size: 0 }, t2 = x2(t2);
      let i3 = Buffer.from(e2), a3 = { ctimeSeconds: t2.ctimeSeconds, ctimeNanoseconds: t2.ctimeNanoseconds, mtimeSeconds: t2.mtimeSeconds, mtimeNanoseconds: t2.mtimeNanoseconds, dev: t2.dev, ino: t2.ino, mode: t2.mode || 33188, uid: t2.uid, gid: t2.gid, size: t2.size, path: e2, oid: n2, flags: { assumeValid: false, extended: false, stage: r2, nameLength: i3.length < 4095 ? i3.length : 4095 }, stages: [] };
      this._addEntry(a3), this._dirty = true;
    }
    delete({ filepath: e2 }) {
      if (this._entries.has(e2)) this._entries.delete(e2);
      else for (let t2 of this._entries.keys()) t2.startsWith(e2 + `/`) && this._entries.delete(t2);
      this._unmergedPaths.has(e2) && this._unmergedPaths.delete(e2), this._dirty = true;
    }
    clear() {
      this._entries.clear(), this._dirty = true;
    }
    has({ filepath: e2 }) {
      return this._entries.has(e2);
    }
    render() {
      return this.entries.map((e2) => `${e2.mode.toString(8)} ${e2.oid}    ${e2.path}`).join(`
`);
    }
    static async _entryToBuffer(e2) {
      let t2 = Buffer.from(e2.path), n2 = Math.ceil((62 + t2.length + 1) / 8) * 8, r2 = Buffer.alloc(n2), i3 = new h3(r2), a3 = x2(e2);
      return i3.writeUInt32BE(a3.ctimeSeconds), i3.writeUInt32BE(a3.ctimeNanoseconds), i3.writeUInt32BE(a3.mtimeSeconds), i3.writeUInt32BE(a3.mtimeNanoseconds), i3.writeUInt32BE(a3.dev), i3.writeUInt32BE(a3.ino), i3.writeUInt32BE(a3.mode), i3.writeUInt32BE(a3.uid), i3.writeUInt32BE(a3.gid), i3.writeUInt32BE(a3.size), i3.write(e2.oid, 20, `hex`), i3.writeUInt16BE(k3(e2)), i3.write(e2.path, t2.length, `utf8`), r2;
    }
    async toObject() {
      let t2 = Buffer.alloc(12), n2 = new h3(t2);
      n2.write(`DIRC`, 4, `utf8`), n2.writeUInt32BE(2), n2.writeUInt32BE(this.entriesFlat.length);
      let r2 = [];
      for (let t3 of this.entries) if (r2.push(e._entryToBuffer(t3)), t3.stages.length > 1) for (let n3 of t3.stages) n3 && n3 !== t3 && r2.push(e._entryToBuffer(n3));
      r2 = await Promise.all(r2);
      let i3 = Buffer.concat(r2), a3 = Buffer.concat([t2, i3]), o3 = await w2(a3);
      return Buffer.concat([a3, Buffer.from(o3, `hex`)]);
    }
  };
  function j2(e, t2, n2 = true, r2 = true) {
    let i3 = x2(e), a3 = x2(t2);
    return n2 && i3.mode !== a3.mode || i3.mtimeSeconds !== a3.mtimeSeconds || i3.ctimeSeconds !== a3.ctimeSeconds || i3.uid !== a3.uid || i3.gid !== a3.gid || r2 && i3.ino !== a3.ino || i3.size !== a3.size;
  }
  let M2 = null, N2 = /* @__PURE__ */ Symbol(`IndexCache`);
  function P2() {
    return { map: /* @__PURE__ */ new Map(), stats: /* @__PURE__ */ new Map() };
  }
  async function F2(e, t2, n2) {
    let [r2, i3] = await Promise.all([e.lstat(t2), e.read(t2)]), a3 = await A2.from(i3);
    n2.map.set(t2, a3), n2.stats.set(t2, r2);
  }
  async function ee2(e, t2, n2) {
    let r2 = n2.stats.get(t2);
    if (r2 === void 0) return true;
    if (r2 === null) return false;
    let i3 = await e.lstat(t2);
    return i3 === null ? false : j2(r2, i3);
  }
  var I2 = class {
    static async acquire({ fs: e, gitdir: t2, cache: n2, allowUnmerged: i3 = true }, a3) {
      n2[N2] || (n2[N2] = P2());
      let o3 = `${t2}/index`;
      M2 === null && (M2 = new r({ maxPending: 1 / 0 }));
      let s3, c3 = [];
      return await M2.acquire(o3, async () => {
        let t3 = n2[N2];
        await ee2(e, o3, t3) && await F2(e, o3, t3);
        let r2 = t3.map.get(o3);
        if (c3 = r2.unmergedPaths, c3.length && !i3) throw new f3(c3);
        if (s3 = await a3(r2), r2._dirty) {
          let n3 = await r2.toObject();
          await e.write(o3, n3), t3.stats.set(o3, await e.lstat(o3)), r2._dirty = false;
        }
      }), s3;
    }
  };
  function L2(e) {
    let t2 = Math.max(e.lastIndexOf(`/`), e.lastIndexOf(`\\`));
    return t2 > -1 && (e = e.slice(t2 + 1)), e;
  }
  function R2(e) {
    let t2 = Math.max(e.lastIndexOf(`/`), e.lastIndexOf(`\\`));
    return t2 === -1 ? `.` : t2 === 0 ? `/` : e.slice(0, t2);
  }
  function te2(e) {
    let t2 = /* @__PURE__ */ new Map(), n2 = function(e2) {
      if (!t2.has(e2)) {
        let r3 = { type: `tree`, fullpath: e2, basename: L2(e2), metadata: {}, children: [] };
        t2.set(e2, r3), r3.parent = n2(R2(e2)), r3.parent && r3.parent !== r3 && r3.parent.children.push(r3);
      }
      return t2.get(e2);
    }, r2 = function(e2, r3) {
      if (!t2.has(e2)) {
        let i3 = { type: `blob`, fullpath: e2, basename: L2(e2), metadata: r3, parent: n2(R2(e2)), children: [] };
        i3.parent && i3.parent.children.push(i3), t2.set(e2, i3);
      }
      return t2.get(e2);
    };
    n2(`.`);
    for (let t3 of e) r2(t3.path, t3);
    return t2;
  }
  function ne2(e) {
    switch (e) {
      case 16384:
        return `tree`;
      case 33188:
        return `blob`;
      case 33261:
        return `blob`;
      case 40960:
        return `blob`;
      case 57344:
        return `commit`;
    }
    throw new p2(`Unexpected GitTree entry mode: ${e.toString(8)}`);
  }
  var z2 = class {
    constructor({ fs: e, gitdir: t2, cache: n2 }) {
      this.treePromise = I2.acquire({ fs: e, gitdir: t2, cache: n2 }, async function(e2) {
        return te2(e2.entries);
      });
      let r2 = this;
      this.ConstructEntry = class {
        constructor(e2) {
          this._fullpath = e2, this._type = false, this._mode = false, this._stat = false, this._oid = false;
        }
        async type() {
          return r2.type(this);
        }
        async mode() {
          return r2.mode(this);
        }
        async stat() {
          return r2.stat(this);
        }
        async content() {
          return r2.content(this);
        }
        async oid() {
          return r2.oid(this);
        }
      };
    }
    async readdir(e) {
      let t2 = e._fullpath, n2 = (await this.treePromise).get(t2);
      if (!n2 || n2.type === `blob`) return null;
      if (n2.type !== `tree`) throw Error(`ENOTDIR: not a directory, scandir '${t2}'`);
      let r2 = n2.children.map((e2) => e2.fullpath);
      return r2.sort(g2), r2;
    }
    async type(e) {
      return e._type === false && await e.stat(), e._type;
    }
    async mode(e) {
      return e._mode === false && await e.stat(), e._mode;
    }
    async stat(e) {
      if (e._stat === false) {
        let t2 = (await this.treePromise).get(e._fullpath);
        if (!t2) throw Error(`ENOENT: no such file or directory, lstat '${e._fullpath}'`);
        let n2 = t2.type === `tree` ? {} : x2(t2.metadata);
        e._type = t2.type === `tree` ? `tree` : ne2(n2.mode), e._mode = n2.mode, t2.type === `tree` ? e._stat = void 0 : e._stat = n2;
      }
      return e._stat;
    }
    async content(e) {
    }
    async oid(e) {
      return e._oid === false && (e._oid = (await this.treePromise).get(e._fullpath).metadata.oid), e._oid;
    }
  };
  let B2 = /* @__PURE__ */ Symbol(`GitWalkSymbol`);
  function V2() {
    let e = /* @__PURE__ */ Object.create(null);
    return Object.defineProperty(e, B2, { value: function({ fs: e2, gitdir: t2, cache: n2 }) {
      return new z2({ fs: e2, gitdir: t2, cache: n2 });
    } }), Object.freeze(e), e;
  }
  var H2 = class e extends d2 {
    constructor(t2) {
      super(`Could not find ${t2}.`), this.code = this.name = e.code, this.data = { what: t2 };
    }
  };
  H2.code = `NotFoundError`;
  var re2 = class e extends d2 {
    constructor(t2, n2, r2, i3) {
      super(`Object ${t2} ${i3 ? `at ${i3}` : ``}was anticipated to be a ${r2} but it is a ${n2}.`), this.code = this.name = e.code, this.data = { oid: t2, actual: n2, expected: r2, filepath: i3 };
    }
  };
  re2.code = `ObjectTypeError`;
  var ie2 = class e extends d2 {
    constructor(t2) {
      super(`Expected a 40-char hex object id but saw "${t2}".`), this.code = this.name = e.code, this.data = { value: t2 };
    }
  };
  ie2.code = `InvalidOidError`;
  var ae2 = class e extends d2 {
    constructor(t2) {
      super(`Could not find a fetch refspec for remote "${t2}". Make sure the config file has an entry like the following:
[remote "${t2}"]
	fetch = +refs/heads/*:refs/remotes/origin/*
`), this.code = this.name = e.code, this.data = { remote: t2 };
    }
  };
  ae2.code = `NoRefspecError`;
  var U2 = class e {
    constructor(e2) {
      if (this.refs = /* @__PURE__ */ new Map(), this.parsedConfig = [], e2) {
        let t2 = null;
        this.parsedConfig = e2.trim().split(`
`).map((e3) => {
          if (/^\s*#/.test(e3)) return { line: e3, comment: true };
          let n2 = e3.indexOf(` `);
          if (e3.startsWith(`^`)) {
            let n3 = e3.slice(1);
            return this.refs.set(t2 + `^{}`, n3), { line: e3, ref: t2, peeled: n3 };
          } else {
            let r2 = e3.slice(0, n2);
            return t2 = e3.slice(n2 + 1), this.refs.set(t2, r2), { line: e3, ref: t2, oid: r2 };
          }
        });
      }
      return this;
    }
    static from(t2) {
      return new e(t2);
    }
    delete(e2) {
      this.parsedConfig = this.parsedConfig.filter((t2) => t2.ref !== e2), this.refs.delete(e2);
    }
    toString() {
      return this.parsedConfig.map(({ line: e2 }) => e2).join(`
`) + `
`;
    }
  }, W2 = class e {
    constructor({ remotePath: e2, localPath: t2, force: n2, matchPrefix: r2 }) {
      Object.assign(this, { remotePath: e2, localPath: t2, force: n2, matchPrefix: r2 });
    }
    static from(t2) {
      let [n2, r2, i3, a3, o3] = t2.match(/^(\+?)(.*?)(\*?):(.*?)(\*?)$/).slice(1), s3 = n2 === `+`, c3 = i3 === `*`;
      if (c3 !== (o3 === `*`)) throw new p2(`Invalid refspec`);
      return new e({ remotePath: r2, localPath: a3, force: s3, matchPrefix: c3 });
    }
    translate(e2) {
      if (this.matchPrefix) {
        if (e2.startsWith(this.remotePath)) return this.localPath + e2.replace(this.remotePath, ``);
      } else if (e2 === this.remotePath) return this.localPath;
      return null;
    }
    reverseTranslate(e2) {
      if (this.matchPrefix) {
        if (e2.startsWith(this.localPath)) return this.remotePath + e2.replace(this.localPath, ``);
      } else if (e2 === this.localPath) return this.remotePath;
      return null;
    }
  }, oe2 = class e {
    constructor(e2 = []) {
      this.rules = e2;
    }
    static from(t2) {
      let n2 = [];
      for (let e2 of t2) n2.push(W2.from(e2));
      return new e(n2);
    }
    add(e2) {
      let t2 = W2.from(e2);
      this.rules.push(t2);
    }
    translate(e2) {
      let t2 = [];
      for (let n2 of this.rules) for (let r2 of e2) {
        let e3 = n2.translate(r2);
        e3 && t2.push([r2, e3]);
      }
      return t2;
    }
    translateOne(e2) {
      let t2 = null;
      for (let n2 of this.rules) {
        let r2 = n2.translate(e2);
        r2 && (t2 = r2);
      }
      return t2;
    }
    localNamespaces() {
      return this.rules.filter((e2) => e2.matchPrefix).map((e2) => e2.localPath.replace(/\/$/, ``));
    }
  };
  function se2(e, t2) {
    let n2 = e.replace(/\^\{\}$/, ``), r2 = t2.replace(/\^\{\}$/, ``), i3 = -(n2 < r2) || +(n2 > r2);
    return i3 === 0 ? e.endsWith(`^{}`) ? 1 : -1 : i3;
  }
  function G2(e, t2) {
    let n2 = ``, r2 = 0, i3 = -1, a3 = 0, o3 = `\0`;
    for (let s3 = 0; s3 <= e.length; ++s3) {
      if (s3 < e.length) o3 = e[s3];
      else if (o3 === `/`) break;
      else o3 = `/`;
      if (o3 === `/`) {
        if (!(i3 === s3 - 1 || a3 === 1)) if (a3 === 2) {
          if (n2.length < 2 || r2 !== 2 || n2.at(-1) !== `.` || n2.at(-2) !== `.`) {
            if (n2.length > 2) {
              let e2 = n2.lastIndexOf(`/`);
              e2 === -1 ? (n2 = ``, r2 = 0) : (n2 = n2.slice(0, e2), r2 = n2.length - 1 - n2.lastIndexOf(`/`)), i3 = s3, a3 = 0;
              continue;
            } else if (n2.length !== 0) {
              n2 = ``, r2 = 0, i3 = s3, a3 = 0;
              continue;
            }
          }
          t2 && (n2 += n2.length > 0 ? `/..` : `..`, r2 = 2);
        } else n2.length > 0 ? n2 += `/` + e.slice(i3 + 1, s3) : n2 = e.slice(i3 + 1, s3), r2 = s3 - i3 - 1;
        i3 = s3, a3 = 0;
      } else o3 === `.` && a3 !== -1 ? ++a3 : a3 = -1;
    }
    return n2;
  }
  function K2(e) {
    if (!e.length) return `.`;
    let t2 = e[0] === `/`, n2 = e.at(-1) === `/`;
    return e = G2(e, !t2), e.length ? (n2 && (e += `/`), t2 ? `/${e}` : e) : t2 ? `/` : n2 ? `./` : `.`;
  }
  function ce2(...e) {
    if (e.length === 0) return `.`;
    let t2;
    for (let n2 = 0; n2 < e.length; ++n2) {
      let r2 = e[n2];
      r2.length > 0 && (t2 === void 0 ? t2 = r2 : t2 += `/` + r2);
    }
    return t2 === void 0 ? `.` : K2(t2);
  }
  let le2 = (e) => {
    if (typeof e == `number`) return e;
    e = e.toLowerCase();
    let t2 = parseInt(e);
    return e.endsWith(`k`) && (t2 *= 1024), e.endsWith(`m`) && (t2 *= 1024 * 1024), e.endsWith(`g`) && (t2 *= 1024 * 1024 * 1024), t2;
  }, q2 = (e) => {
    if (typeof e == `boolean`) return e;
    if (e = e.trim().toLowerCase(), e === `true` || e === `yes` || e === `on`) return true;
    if (e === `false` || e === `no` || e === `off`) return false;
    throw Error(`Expected 'true', 'false', 'yes', 'no', 'on', or 'off', but got ${e}`);
  }, ue2 = { core: { filemode: q2, bare: q2, logallrefupdates: q2, symlinks: q2, ignorecase: q2, bigFileThreshold: le2 } }, J2 = /^\[([A-Za-z0-9-.]+)(?: "(.*)")?\]$/, Y2 = /^[A-Za-z0-9-.]+$/, X2 = /^([A-Za-z][A-Za-z-]*)(?: *= *(.*))?$/, Z2 = /^[A-Za-z][A-Za-z-]*$/, de2 = /^(.*?)( *[#;].*)$/, Q2 = (e) => {
    let t2 = J2.exec(e);
    if (t2 != null) {
      let [e2, n2] = t2.slice(1);
      return [e2, n2];
    }
    return null;
  }, $2 = (e) => {
    let t2 = X2.exec(e);
    if (t2 != null) {
      let [e2, n2 = `true`] = t2.slice(1);
      return [e2, ge2(me2(n2))];
    }
    return null;
  }, me2 = (e) => {
    let t2 = de2.exec(e);
    if (t2 == null) return e;
    let [n2, r2] = t2.slice(1);
    return he2(n2) && he2(r2) ? `${n2}${r2}` : n2;
  }, he2 = (e) => (e.match(/(?:^|[^\\])"/g) || []).length % 2 != 0, ge2 = (e) => e.split(``).reduce((e2, t2, n2, r2) => {
    let i3 = t2 === `"` && r2[n2 - 1] !== `\\`, a3 = t2 === `\\` && r2[n2 + 1] === `"`;
    return i3 || a3 ? e2 : e2 + t2;
  }, ``), _e2 = (e) => e == null ? null : e.toLowerCase(), ve2 = (e, t2, n2) => [_e2(e), t2, _e2(n2)].filter((e2) => e2 != null).join(`.`), ye2 = (e) => {
    let t2 = e.split(`.`), n2 = t2.shift(), r2 = t2.pop(), i3 = t2.length ? t2.join(`.`) : void 0;
    return { section: n2, subsection: i3, name: r2, path: ve2(n2, i3, r2), sectionPath: ve2(n2, i3, null), isSection: !!n2 };
  }, be2 = (e, t2) => e.reduce((e2, n2, r2) => t2(n2) ? r2 : e2, -1);
  var xe2 = class e {
    constructor(e2) {
      let t2 = null, n2 = null;
      this.parsedConfig = e2 ? e2.split(`
`).map((e3) => {
        let r2 = null, i3 = null, a3 = e3.trim(), o3 = Q2(a3), s3 = o3 != null;
        if (s3) [t2, n2] = o3;
        else {
          let e4 = $2(a3);
          e4 != null && ([r2, i3] = e4);
        }
        let c3 = ve2(t2, n2, r2);
        return { line: e3, isSection: s3, section: t2, subsection: n2, name: r2, value: i3, path: c3 };
      }) : [];
    }
    static from(t2) {
      return new e(t2);
    }
    async get(e2, t2 = false) {
      let n2 = ye2(e2).path, r2 = this.parsedConfig.filter((e3) => e3.path === n2).map(({ section: e3, name: t3, value: n3 }) => {
        let r3 = ue2[e3] && ue2[e3][t3];
        return r3 ? r3(n3) : n3;
      });
      return t2 ? r2 : r2.pop();
    }
    async getall(e2) {
      return this.get(e2, true);
    }
    async getSubsections(e2) {
      return this.parsedConfig.filter((t2) => t2.isSection && t2.section === e2).map((e3) => e3.subsection);
    }
    async deleteSection(e2, t2) {
      this.parsedConfig = this.parsedConfig.filter((n2) => !(n2.section === e2 && n2.subsection === t2));
    }
    async append(e2, t2) {
      return this.set(e2, t2, true);
    }
    async set(e2, t2, n2 = false) {
      let { section: r2, subsection: i3, name: a3, path: o3, sectionPath: s3, isSection: c3 } = ye2(e2), l3 = be2(this.parsedConfig, (e3) => e3.path === o3);
      if (t2 == null) l3 !== -1 && this.parsedConfig.splice(l3, 1);
      else if (l3 !== -1) {
        let e3 = this.parsedConfig[l3], r3 = Object.assign({}, e3, { name: a3, value: t2, modified: true });
        n2 ? this.parsedConfig.splice(l3 + 1, 0, r3) : this.parsedConfig[l3] = r3;
      } else {
        let e3 = this.parsedConfig.findIndex((e4) => e4.path === s3), n3 = { section: r2, subsection: i3, name: a3, value: t2, modified: true, path: o3 };
        if (Y2.test(r2) && Z2.test(a3)) if (e3 >= 0) this.parsedConfig.splice(e3 + 1, 0, n3);
        else {
          let e4 = { isSection: c3, section: r2, subsection: i3, modified: true, path: s3 };
          this.parsedConfig.push(e4, n3);
        }
      }
    }
    toString() {
      return this.parsedConfig.map(({ line: e2, section: t2, subsection: n2, name: r2, value: i3, modified: a3 = false }) => a3 ? r2 != null && i3 != null ? typeof i3 == `string` && /[#;]/.test(i3) ? `	${r2} = "${i3}"` : `	${r2} = ${i3}` : n2 == null ? `[${t2}]` : `[${t2} "${n2}"]` : e2).join(`
`);
    }
  }, Se2 = class {
    static async get({ fs: e, gitdir: t2 }) {
      let n2 = await e.read(`${t2}/config`, { encoding: `utf8` });
      return xe2.from(n2);
    }
    static async save({ fs: e, gitdir: t2, config: n2 }) {
      await e.write(`${t2}/config`, n2.toString(), { encoding: `utf8` });
    }
  };
  let Ce2 = (e) => [`${e}`, `refs/${e}`, `refs/tags/${e}`, `refs/heads/${e}`, `refs/remotes/${e}`, `refs/remotes/${e}/HEAD`], we2 = [`config`, `description`, `index`, `shallow`, `commondir`], Te2;
  async function Ee2(e, t2) {
    return Te2 === void 0 && (Te2 = new r()), Te2.acquire(e, t2);
  }
  var De2 = class e {
    static async updateRemoteRefs({ fs: t2, gitdir: n2, remote: r2, refs: i3, symrefs: a3, tags: o3, refspecs: s3 = void 0, prune: c3 = false, pruneTags: l3 = false }) {
      for (let e2 of i3.values()) if (!e2.match(/[0-9a-f]{40}/)) throw new ie2(e2);
      let u2 = await Se2.get({ fs: t2, gitdir: n2 });
      if (!s3) {
        if (s3 = await u2.getall(`remote.${r2}.fetch`), s3.length === 0) throw new ae2(r2);
        s3.unshift(`+HEAD:refs/remotes/${r2}/HEAD`);
      }
      let d3 = oe2.from(s3), f4 = /* @__PURE__ */ new Map();
      if (l3) {
        let r3 = await e.listRefs({ fs: t2, gitdir: n2, filepath: `refs/tags` });
        await e.deleteRefs({ fs: t2, gitdir: n2, refs: r3.map((e2) => `refs/tags/${e2}`) });
      }
      if (o3) {
        for (let r3 of i3.keys()) if (r3.startsWith(`refs/tags`) && !r3.endsWith(`^{}`) && !await e.exists({ fs: t2, gitdir: n2, ref: r3 })) {
          let e2 = i3.get(r3);
          f4.set(r3, e2);
        }
      }
      let p3 = d3.translate([...i3.keys()]);
      for (let [e2, t3] of p3) {
        let n3 = i3.get(e2);
        f4.set(t3, n3);
      }
      let m4 = d3.translate([...a3.keys()]);
      for (let [e2, t3] of m4) {
        let n3 = a3.get(e2), r3 = d3.translateOne(n3);
        r3 && f4.set(t3, `ref: ${r3}`);
      }
      let h4 = [];
      if (c3) {
        for (let r3 of d3.localNamespaces()) {
          let i4 = (await e.listRefs({ fs: t2, gitdir: n2, filepath: r3 })).map((e2) => `${r3}/${e2}`);
          for (let e2 of i4) f4.has(e2) || h4.push(e2);
        }
        h4.length > 0 && await e.deleteRefs({ fs: t2, gitdir: n2, refs: h4 });
      }
      for (let [e2, r3] of f4) await Ee2(e2, async () => t2.write(ce2(n2, e2), `${r3.trim()}
`, `utf8`));
      return { pruned: h4 };
    }
    static async writeRef({ fs: e2, gitdir: t2, ref: n2, value: r2 }) {
      if (!r2.match(/[0-9a-f]{40}/)) throw new ie2(r2);
      await Ee2(n2, async () => e2.write(ce2(t2, n2), `${r2.trim()}
`, `utf8`));
    }
    static async writeSymbolicRef({ fs: e2, gitdir: t2, ref: n2, value: r2 }) {
      await Ee2(n2, async () => e2.write(ce2(t2, n2), `ref: ${r2.trim()}
`, `utf8`));
    }
    static async deleteRef({ fs: t2, gitdir: n2, ref: r2 }) {
      return e.deleteRefs({ fs: t2, gitdir: n2, refs: [r2] });
    }
    static async deleteRefs({ fs: e2, gitdir: t2, refs: n2 }) {
      await Promise.all(n2.map((n3) => e2.rm(ce2(t2, n3))));
      let r2 = await Ee2(`packed-refs`, async () => e2.read(`${t2}/packed-refs`, { encoding: `utf8` })), i3 = U2.from(r2), a3 = i3.refs.size;
      for (let e3 of n2) i3.refs.has(e3) && i3.delete(e3);
      i3.refs.size < a3 && (r2 = i3.toString(), await Ee2(`packed-refs`, async () => e2.write(`${t2}/packed-refs`, r2, { encoding: `utf8` })));
    }
    static async resolve({ fs: t2, gitdir: n2, ref: r2, depth: i3 = void 0 }) {
      if (i3 !== void 0 && (i3--, i3 === -1)) return r2;
      if (r2.startsWith(`ref: `)) return r2 = r2.slice(5), e.resolve({ fs: t2, gitdir: n2, ref: r2, depth: i3 });
      if (r2.length === 40 && /[0-9a-f]{40}/.test(r2)) return r2;
      let a3 = await e.packedRefs({ fs: t2, gitdir: n2 }), o3 = Ce2(r2).filter((e2) => !we2.includes(e2));
      for (let r3 of o3) {
        let o4 = await Ee2(r3, async () => await t2.read(`${n2}/${r3}`, { encoding: `utf8` }) || a3.get(r3));
        if (o4) return e.resolve({ fs: t2, gitdir: n2, ref: o4.trim(), depth: i3 });
      }
      throw new H2(r2);
    }
    static async exists({ fs: t2, gitdir: n2, ref: r2 }) {
      try {
        return await e.expand({ fs: t2, gitdir: n2, ref: r2 }), true;
      } catch {
        return false;
      }
    }
    static async expand({ fs: t2, gitdir: n2, ref: r2 }) {
      if (r2.length === 40 && /[0-9a-f]{40}/.test(r2)) return r2;
      let i3 = await e.packedRefs({ fs: t2, gitdir: n2 }), a3 = Ce2(r2);
      for (let e2 of a3) if (await Ee2(e2, async () => t2.exists(`${n2}/${e2}`)) || i3.has(e2)) return e2;
      throw new H2(r2);
    }
    static async expandAgainstMap({ ref: e2, map: t2 }) {
      let n2 = Ce2(e2);
      for (let e3 of n2) if (await t2.has(e3)) return e3;
      throw new H2(e2);
    }
    static resolveAgainstMap({ ref: t2, fullref: n2 = t2, depth: r2 = void 0, map: i3 }) {
      if (r2 !== void 0 && (r2--, r2 === -1)) return { fullref: n2, oid: t2 };
      if (t2.startsWith(`ref: `)) return t2 = t2.slice(5), e.resolveAgainstMap({ ref: t2, fullref: n2, depth: r2, map: i3 });
      if (t2.length === 40 && /[0-9a-f]{40}/.test(t2)) return { fullref: n2, oid: t2 };
      let a3 = Ce2(t2);
      for (let t3 of a3) {
        let n3 = i3.get(t3);
        if (n3) return e.resolveAgainstMap({ ref: n3.trim(), fullref: t3, depth: r2, map: i3 });
      }
      throw new H2(t2);
    }
    static async packedRefs({ fs: e2, gitdir: t2 }) {
      let n2 = await Ee2(`packed-refs`, async () => e2.read(`${t2}/packed-refs`, { encoding: `utf8` }));
      return U2.from(n2).refs;
    }
    static async listRefs({ fs: t2, gitdir: n2, filepath: r2 }) {
      let i3 = e.packedRefs({ fs: t2, gitdir: n2 }), a3 = null;
      try {
        a3 = await t2.readdirDeep(`${n2}/${r2}`), a3 = a3.map((e2) => e2.replace(`${n2}/${r2}/`, ``));
      } catch {
        a3 = [];
      }
      for (let e2 of (await i3).keys()) e2.startsWith(r2) && (e2 = e2.replace(r2 + `/`, ``), a3.includes(e2) || a3.push(e2));
      return a3.sort(se2), a3;
    }
    static async listBranches({ fs: t2, gitdir: n2, remote: r2 }) {
      return r2 ? e.listRefs({ fs: t2, gitdir: n2, filepath: `refs/remotes/${r2}` }) : e.listRefs({ fs: t2, gitdir: n2, filepath: `refs/heads` });
    }
    static async listTags({ fs: t2, gitdir: n2 }) {
      return (await e.listRefs({ fs: t2, gitdir: n2, filepath: `refs/tags` })).filter((e2) => !e2.endsWith(`^{}`));
    }
  };
  function Me2(e, t2) {
    return g2(Pe2(e), Pe2(t2));
  }
  function Pe2(e) {
    return e.mode === `040000` ? e.path + `/` : e.path;
  }
  function Fe2(e) {
    switch (e) {
      case `040000`:
        return `tree`;
      case `100644`:
        return `blob`;
      case `100755`:
        return `blob`;
      case `120000`:
        return `blob`;
      case `160000`:
        return `commit`;
    }
    throw new p2(`Unexpected GitTree entry mode: ${e}`);
  }
  function Ie2(e) {
    let t2 = [], n2 = 0;
    for (; n2 < e.length; ) {
      let r2 = e.indexOf(32, n2);
      if (r2 === -1) throw new p2(`GitTree: Error parsing buffer at byte location ${n2}: Could not find the next space character.`);
      let i3 = e.indexOf(0, n2);
      if (i3 === -1) throw new p2(`GitTree: Error parsing buffer at byte location ${n2}: Could not find the next null character.`);
      let a3 = e.slice(n2, r2).toString(`utf8`);
      a3 === `40000` && (a3 = `040000`);
      let o3 = Fe2(a3), s3 = e.slice(r2 + 1, i3).toString(`utf8`);
      if (s3.includes(`\\`) || s3.includes(`/`)) throw new m3(s3);
      let c3 = e.slice(i3 + 1, i3 + 21).toString(`hex`);
      n2 = i3 + 21, t2.push({ mode: a3, path: s3, oid: c3, type: o3 });
    }
    return t2;
  }
  function Le2(e) {
    if (typeof e == `number` && (e = e.toString(8)), e.match(/^0?4.*/)) return `040000`;
    if (e.match(/^1006.*/)) return `100644`;
    if (e.match(/^1007.*/)) return `100755`;
    if (e.match(/^120.*/)) return `120000`;
    if (e.match(/^160.*/)) return `160000`;
    throw new p2(`Could not understand file mode: ${e}`);
  }
  function Re2(e) {
    return !e.oid && e.sha && (e.oid = e.sha), e.mode = Le2(e.mode), e.type ||= Fe2(e.mode), e;
  }
  var ze2 = class e {
    constructor(e2) {
      if (Buffer.isBuffer(e2)) this._entries = Ie2(e2);
      else if (Array.isArray(e2)) this._entries = e2.map(Re2);
      else throw new p2(`invalid type passed to GitTree constructor`);
      this._entries.sort(_2);
    }
    static from(t2) {
      return new e(t2);
    }
    render() {
      return this._entries.map((e2) => `${e2.mode} ${e2.type} ${e2.oid}    ${e2.path}`).join(`
`);
    }
    toObject() {
      let e2 = [...this._entries];
      return e2.sort(Me2), Buffer.concat(e2.map((e3) => {
        let t2 = Buffer.from(e3.mode.replace(/^0/, ``)), n2 = Buffer.from(` `), r2 = Buffer.from(e3.path, `utf8`), i3 = Buffer.from([0]), a3 = Buffer.from(e3.oid, `hex`);
        return Buffer.concat([t2, n2, r2, i3, a3]);
      }));
    }
    entries() {
      return this._entries;
    }
    *[Symbol.iterator]() {
      for (let e2 of this._entries) yield e2;
    }
  }, Be2 = class {
    static wrap({ type: e, object: t2 }) {
      let n2 = `${e} ${t2.length}\0`, r2 = n2.length, i3 = r2 + t2.length, a3 = new Uint8Array(i3);
      for (let e2 = 0; e2 < r2; e2++) a3[e2] = n2.charCodeAt(e2);
      return a3.set(t2, r2), a3;
    }
    static unwrap(e) {
      let t2 = e.indexOf(32), n2 = e.indexOf(0), r2 = e.slice(0, t2).toString(`utf8`), i3 = e.slice(t2 + 1, n2).toString(`utf8`), a3 = e.length - (n2 + 1);
      if (parseInt(i3) !== a3) throw new p2(`Length mismatch: expected ${i3} bytes but got ${a3} instead.`);
      return { type: r2, object: Buffer.from(e.slice(n2 + 1)) };
    }
  };
  async function Ve2({ fs: e, gitdir: t2, oid: n2 }) {
    let r2 = `objects/${n2.slice(0, 2)}/${n2.slice(2)}`, i3 = await e.read(`${t2}/${r2}`);
    return i3 ? { object: i3, format: `deflated`, source: r2 } : null;
  }
  function He2(e, t2) {
    let n2 = new h3(e), r2 = Ue2(n2);
    if (r2 !== t2.byteLength) throw new p2(`applyDelta expected source buffer to be ${r2} bytes but the provided buffer was ${t2.length} bytes`);
    let i3 = Ue2(n2), a3, o3 = Ge2(n2, t2);
    if (o3.byteLength === i3) a3 = o3;
    else {
      a3 = Buffer.alloc(i3);
      let e2 = new h3(a3);
      for (e2.copy(o3); !n2.eof(); ) e2.copy(Ge2(n2, t2));
      let r3 = e2.tell();
      if (i3 !== r3) throw new p2(`applyDelta expected target buffer to be ${i3} bytes but the resulting buffer was ${r3} bytes`);
    }
    return a3;
  }
  function Ue2(e) {
    let t2 = 0, n2 = 0, r2 = null;
    do
      r2 = e.readUInt8(), t2 |= (r2 & 127) << n2, n2 += 7;
    while (r2 & 128);
    return t2;
  }
  function We2(e, t2, n2) {
    let r2 = 0, i3 = 0;
    for (; n2--; ) t2 & 1 && (r2 |= e.readUInt8() << i3), t2 >>= 1, i3 += 8;
    return r2;
  }
  function Ge2(e, t2) {
    let n2 = e.readUInt8();
    if (n2 & 128) {
      let r2 = We2(e, n2 & 15, 4), i3 = We2(e, (n2 & 112) >> 4, 3);
      return i3 === 0 && (i3 = 65536), t2.slice(r2, r2 + i3);
    } else return e.slice(n2);
  }
  function Ke2(e) {
    let t2 = [e];
    return { next() {
      return Promise.resolve({ done: t2.length === 0, value: t2.pop() });
    }, return() {
      return t2 = [], {};
    }, [Symbol.asyncIterator]() {
      return this;
    } };
  }
  function qe2(e) {
    return e[Symbol.asyncIterator] ? e[Symbol.asyncIterator]() : e[Symbol.iterator] ? e[Symbol.iterator]() : e.next ? e : Ke2(e);
  }
  var Je2 = class {
    constructor(e) {
      if (typeof Buffer > `u`) throw Error(`Missing Buffer dependency`);
      this.stream = qe2(e), this.buffer = null, this.cursor = 0, this.undoCursor = 0, this.started = false, this._ended = false, this._discardedBytes = 0;
    }
    eof() {
      return this._ended && this.cursor === this.buffer.length;
    }
    tell() {
      return this._discardedBytes + this.cursor;
    }
    async byte() {
      if (!this.eof() && (this.started || await this._init(), !(this.cursor === this.buffer.length && (await this._loadnext(), this._ended)))) return this._moveCursor(1), this.buffer[this.undoCursor];
    }
    async chunk() {
      if (!this.eof() && (this.started || await this._init(), !(this.cursor === this.buffer.length && (await this._loadnext(), this._ended)))) return this._moveCursor(this.buffer.length), this.buffer.slice(this.undoCursor, this.cursor);
    }
    async read(e) {
      if (!this.eof()) return this.started || await this._init(), this.cursor + e > this.buffer.length && (this._trim(), await this._accumulate(e)), this._moveCursor(e), this.buffer.slice(this.undoCursor, this.cursor);
    }
    async skip(e) {
      this.eof() || (this.started || await this._init(), this.cursor + e > this.buffer.length && (this._trim(), await this._accumulate(e)), this._moveCursor(e));
    }
    async undo() {
      this.cursor = this.undoCursor;
    }
    async _next() {
      this.started = true;
      let { done: e, value: t2 } = await this.stream.next();
      return e && (this._ended = true, !t2) ? Buffer.alloc(0) : (t2 &&= Buffer.from(t2), t2);
    }
    _trim() {
      this.buffer = this.buffer.slice(this.undoCursor), this.cursor -= this.undoCursor, this._discardedBytes += this.undoCursor, this.undoCursor = 0;
    }
    _moveCursor(e) {
      this.undoCursor = this.cursor, this.cursor += e, this.cursor > this.buffer.length && (this.cursor = this.buffer.length);
    }
    async _accumulate(e) {
      if (this._ended) return;
      let t2 = [this.buffer];
      for (; this.cursor + e > Ye2(t2); ) {
        let e2 = await this._next();
        if (this._ended) break;
        t2.push(e2);
      }
      this.buffer = Buffer.concat(t2);
    }
    async _loadnext() {
      this._discardedBytes += this.buffer.length, this.undoCursor = 0, this.cursor = 0, this.buffer = await this._next();
    }
    async _init() {
      this.buffer = await this._next();
    }
  };
  function Ye2(e) {
    return e.reduce((e2, t2) => e2 + t2.length, 0);
  }
  async function Xe2(e, t2) {
    let n2 = new Je2(e), r2 = await n2.read(4);
    if (r2 = r2.toString(`utf8`), r2 !== `PACK`) throw new p2(`Invalid PACK header '${r2}'`);
    let i3 = await n2.read(4);
    if (i3 = i3.readUInt32BE(0), i3 !== 2) throw new p2(`Invalid packfile version: ${i3}`);
    let a3 = await n2.read(4);
    if (a3 = a3.readUInt32BE(0), !(a3 < 1)) for (; !n2.eof() && a3--; ) {
      let e2 = n2.tell(), { type: r3, length: i4, ofs: s3, reference: c3 } = await Ze2(n2), l3 = new o2.Inflate();
      for (; !l3.result; ) {
        let o3 = await n2.chunk();
        if (!o3) break;
        if (l3.push(o3, false), l3.err) throw new p2(`Pako error: ${l3.msg}`);
        if (l3.result) {
          if (l3.result.length !== i4) throw new p2(`Inflated object size is different from that stated in packfile.`);
          await n2.undo(), await n2.read(o3.length - l3.strm.avail_in);
          let u2 = n2.tell();
          await t2({ data: l3.result, type: r3, num: a3, offset: e2, end: u2, reference: c3, ofs: s3 });
        }
      }
    }
  }
  async function Ze2(e) {
    let t2 = await e.byte(), n2 = t2 >> 4 & 7, r2 = t2 & 15;
    if (t2 & 128) {
      let n3 = 4;
      do
        t2 = await e.byte(), r2 |= (t2 & 127) << n3, n3 += 7;
      while (t2 & 128);
    }
    let i3, a3;
    if (n2 === 6) {
      let n3 = 0;
      i3 = 0;
      let r3 = [];
      do
        t2 = await e.byte(), i3 |= (t2 & 127) << n3, n3 += 7, r3.push(t2);
      while (t2 & 128);
      a3 = Buffer.from(r3);
    }
    return n2 === 7 && (a3 = await e.read(20)), { type: n2, length: r2, ofs: i3, reference: a3 };
  }
  let Qe2 = false;
  async function $e2(e) {
    return Qe2 === null && (Qe2 = tt2()), Qe2 ? et2(e) : o2.inflate(e);
  }
  async function et2(e) {
    let t2 = new DecompressionStream(`deflate`), n2 = new Blob([e]).stream().pipeThrough(t2);
    return new Uint8Array(await new Response(n2).arrayBuffer());
  }
  function tt2() {
    try {
      if (new DecompressionStream(`deflate`)) return true;
    } catch {
    }
    return false;
  }
  function nt2(e) {
    let t2 = [], n2 = 0, r2 = 0;
    do {
      n2 = e.readUInt8();
      let i3 = n2 & 127;
      t2.push(i3), r2 = n2 & 128;
    } while (r2);
    return t2.reduce((e2, t3) => e2 + 1 << 7 | t3, -1);
  }
  function rt2(e, t2) {
    let n2 = t2, r2 = 4, i3 = null;
    do
      i3 = e.readUInt8(), n2 |= (i3 & 127) << r2, r2 += 7;
    while (i3 & 128);
    return n2;
  }
  var it2 = class e {
    constructor(e2) {
      Object.assign(this, e2), this.offsetCache = {};
    }
    static async fromIdx({ idx: t2, getExternalRefDelta: n2 }) {
      let r2 = new h3(t2);
      if (r2.slice(4).toString(`hex`) !== `ff744f63`) return;
      let i3 = r2.readUInt32BE();
      if (i3 !== 2) throw new p2(`Unable to read version ${i3} packfile IDX. (Only version 2 supported)`);
      if (t2.byteLength > 2048 * 1024 * 1024) throw new p2(`To keep implementation simple, I haven't implemented the layer 5 feature needed to support packfiles > 2GB in size.`);
      r2.seek(r2.tell() + 1020);
      let a3 = r2.readUInt32BE(), o3 = [];
      for (let e2 = 0; e2 < a3; e2++) o3[e2] = r2.slice(20).toString(`hex`);
      r2.seek(r2.tell() + 4 * a3);
      let s3 = /* @__PURE__ */ new Map();
      for (let e2 = 0; e2 < a3; e2++) s3.set(o3[e2], r2.readUInt32BE());
      return new e({ hashes: o3, crcs: {}, offsets: s3, packfileSha: r2.slice(20).toString(`hex`), getExternalRefDelta: n2 });
    }
    static async fromPack({ pack: t2, getExternalRefDelta: n2, onProgress: r2 }) {
      let i3 = { 1: `commit`, 2: `tree`, 3: `blob`, 4: `tag`, 6: `ofs-delta`, 7: `ref-delta` }, o3 = {}, s3 = t2.slice(-20).toString(`hex`), c3 = [], l3 = {}, u2 = /* @__PURE__ */ new Map(), d3 = null, f4 = null;
      await Xe2([t2], async ({ data: e2, type: t3, reference: n3, offset: a3, num: s4 }) => {
        d3 === null && (d3 = s4);
        let c4 = Math.floor((d3 - s4) * 100 / d3);
        c4 !== f4 && r2 && await r2({ phase: `Receiving objects`, loaded: d3 - s4, total: d3 }), f4 = c4, t3 = i3[t3], ([`commit`, `tree`, `blob`, `tag`].includes(t3) || t3 === `ofs-delta` || t3 === `ref-delta`) && (o3[a3] = { type: t3, offset: a3 });
      });
      let p3 = Object.keys(o3).map(Number);
      for (let [e2, n3] of p3.entries()) {
        let r3 = e2 + 1 === p3.length ? t2.byteLength - 20 : p3[e2 + 1], i4 = o3[n3], s4 = a2.buf(t2.slice(n3, r3)) >>> 0;
        i4.end = r3, i4.crc = s4;
      }
      let m4 = new e({ pack: Promise.resolve(t2), packfileSha: s3, crcs: l3, hashes: c3, offsets: u2, getExternalRefDelta: n2 });
      f4 = null;
      let h4 = 0, g3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (let e2 in o3) {
        e2 = Number(e2);
        let t3 = Math.floor(h4 * 100 / d3);
        t3 !== f4 && r2 && await r2({ phase: `Resolving deltas`, loaded: h4, total: d3 }), h4++, f4 = t3;
        let n3 = o3[e2];
        if (!n3.oid) try {
          m4.readDepth = 0, m4.externalReadDepth = 0;
          let { type: t4, object: r3 } = await m4.readSlice({ start: e2 });
          g3[m4.readDepth] += 1;
          let i4 = await w2(Be2.wrap({ type: t4, object: r3 }));
          n3.oid = i4, c3.push(i4), u2.set(i4, e2), l3[i4] = n3.crc;
        } catch {
          continue;
        }
      }
      return c3.sort(), m4;
    }
    async toBuffer() {
      let e2 = [], t2 = (t3, n3) => {
        e2.push(Buffer.from(t3, n3));
      };
      t2(`ff744f63`, `hex`), t2(`00000002`, `hex`);
      let n2 = new h3(Buffer.alloc(256 * 4));
      for (let e3 = 0; e3 < 256; e3++) {
        let t3 = 0;
        for (let n3 of this.hashes) parseInt(n3.slice(0, 2), 16) <= e3 && t3++;
        n2.writeUInt32BE(t3);
      }
      e2.push(n2.buffer);
      for (let e3 of this.hashes) t2(e3, `hex`);
      let r2 = new h3(Buffer.alloc(this.hashes.length * 4));
      for (let e3 of this.hashes) r2.writeUInt32BE(this.crcs[e3]);
      e2.push(r2.buffer);
      let i3 = new h3(Buffer.alloc(this.hashes.length * 4));
      for (let e3 of this.hashes) i3.writeUInt32BE(this.offsets.get(e3));
      e2.push(i3.buffer), t2(this.packfileSha, `hex`);
      let a3 = Buffer.concat(e2), o3 = await w2(a3), s3 = Buffer.alloc(20);
      return s3.write(o3, `hex`), Buffer.concat([a3, s3]);
    }
    async load({ pack: e2 }) {
      this.pack = e2;
    }
    async unload() {
      this.pack = null;
    }
    async read({ oid: e2 }) {
      if (!this.offsets.get(e2)) {
        if (this.getExternalRefDelta) return this.externalReadDepth++, this.getExternalRefDelta(e2);
        throw new p2(`Could not read object ${e2} from packfile`);
      }
      let t2 = this.offsets.get(e2);
      return this.readSlice({ start: t2 });
    }
    async readSlice({ start: e2 }) {
      if (this.offsetCache[e2]) return Object.assign({}, this.offsetCache[e2]);
      this.readDepth++;
      let t2 = { 16: `commit`, 32: `tree`, 48: `blob`, 64: `tag`, 96: `ofs_delta`, 112: `ref_delta` }, n2 = await this.pack;
      if (!n2) throw new p2(`Could not read packfile data. The packfile may be missing, corrupted, or too large to read into memory.`);
      let r2 = n2.slice(e2), i3 = new h3(r2), a3 = i3.readUInt8(), o3 = a3 & 112, s3 = t2[o3];
      if (s3 === void 0) throw new p2(`Unrecognized type: 0b` + o3.toString(2));
      let c3 = a3 & 15, l3 = c3;
      a3 & 128 && (l3 = rt2(i3, c3));
      let u2 = null, d3 = null;
      if (s3 === `ofs_delta`) {
        let t3 = e2 - nt2(i3);
        ({ object: u2, type: s3 } = await this.readSlice({ start: t3 }));
      }
      if (s3 === `ref_delta`) {
        let e3 = i3.slice(20).toString(`hex`);
        ({ object: u2, type: s3 } = await this.read({ oid: e3 }));
      }
      let f4 = r2.slice(i3.tell());
      if (d3 = Buffer.from(await $e2(f4)), d3.byteLength !== l3) throw new p2(`Packfile told us object would have length ${l3} but it had length ${d3.byteLength}`);
      return u2 && (d3 = Buffer.from(He2(d3, u2))), this.readDepth > 3 && (this.offsetCache[e2] = { type: s3, object: d3 }), { type: s3, format: `content`, object: d3 };
    }
  };
  let at2 = /* @__PURE__ */ Symbol(`PackfileCache`);
  async function ot2({ fs: e, filename: t2, getExternalRefDelta: n2, emitter: r2, emitterPrefix: i3 }) {
    let a3 = await e.read(t2);
    return it2.fromIdx({ idx: a3, getExternalRefDelta: n2 });
  }
  function st2({ fs: e, cache: t2, filename: n2, getExternalRefDelta: r2, emitter: i3, emitterPrefix: a3 }) {
    t2[at2] || (t2[at2] = /* @__PURE__ */ new Map());
    let o3 = t2[at2].get(n2);
    return o3 || (o3 = ot2({ fs: e, filename: n2, getExternalRefDelta: r2, emitter: i3, emitterPrefix: a3 }), t2[at2].set(n2, o3)), o3;
  }
  let ct2 = 8 * 1024 * 1024;
  async function lt2(e, { start: t2 = 0, end: n2 = e.length } = {}) {
    let r2 = s2.createHash(`sha1`);
    for (let i3 = t2; i3 < n2; i3 += ct2) r2.update(e.subarray(i3, Math.min(i3 + ct2, n2)));
    return r2.digest(`hex`);
  }
  async function ut2({ fs: e, cache: t2, gitdir: n2, oid: r2, format: i3 = `content`, getExternalRefDelta: a3 }) {
    let o3 = await e.readdir(ce2(n2, `objects/pack`));
    o3 = o3.filter((e2) => e2.endsWith(`.idx`));
    for (let i4 of o3) {
      let o4 = `${n2}/objects/pack/${i4}`, s3 = await st2({ fs: e, cache: t2, filename: o4, getExternalRefDelta: a3 });
      if (s3.error) throw new p2(s3.error);
      if (s3.offsets.has(r2)) {
        let t3 = o4.replace(/idx$/, `pack`);
        s3.pack ||= e.read(t3);
        let n3 = await s3.pack;
        if (!n3) throw s3.pack = null, new p2(`Could not read packfile at ${t3}. The file may be missing, corrupted, or too large to read into memory.`);
        if (!s3._checksumVerified) {
          let e2 = s3.packfileSha, t4 = n3.subarray(-20), r3 = Array.from(t4).map((e3) => e3.toString(16).padStart(2, `0`)).join(``);
          if (r3 !== e2) throw new p2(`Packfile trailer mismatch: expected ${e2}, got ${r3}. The packfile may be corrupted.`);
          let i5 = await lt2(n3, { start: 0, end: n3.length - 20 });
          if (i5 !== e2) throw new p2(`Packfile payload corrupted: calculated ${i5} but expected ${e2}. The packfile may have been tampered with.`);
          s3._checksumVerified = true;
        }
        let c3 = await s3.read({ oid: r2, getExternalRefDelta: a3 });
        return c3.format = `content`, c3.source = `objects/pack/${i4.replace(/idx$/, `pack`)}`, c3;
      }
    }
    return null;
  }
  async function dt2({ fs: e, cache: t2, gitdir: n2, oid: r2, format: i3 = `content` }) {
    let a3 = (r3) => dt2({ fs: e, cache: t2, gitdir: n2, oid: r3 }), o3;
    if (r2 === `4b825dc642cb6eb9a060e54bf8d69288fbee4904` && (o3 = { format: `wrapped`, object: Buffer.from(`tree 0\0`) }), o3 ||= await Ve2({ fs: e, gitdir: n2, oid: r2 }), !o3) {
      if (o3 = await ut2({ fs: e, cache: t2, gitdir: n2, oid: r2, getExternalRefDelta: a3 }), !o3) throw new H2(r2);
      return o3;
    }
    if (i3 === `deflated` || (o3.format === `deflated` && (o3.object = Buffer.from(await $e2(o3.object)), o3.format = `wrapped`), i3 === `wrapped`)) return o3;
    let s3 = await w2(o3.object);
    if (s3 !== r2) throw new p2(`SHA check failed! Expected ${r2}, computed ${s3}`);
    let { object: c3, type: l3 } = Be2.unwrap(o3.object);
    if (o3.type = l3, o3.object = c3, o3.format = `content`, i3 === `content`) return o3;
    throw new p2(`invalid requested format "${i3}"`);
  }
  var ft2 = class e extends d2 {
    constructor(t2, n2, r2 = true) {
      super(`Failed to create ${t2} at ${n2} because it already exists.${r2 ? ` (Hint: use 'force: true' parameter to overwrite existing ${t2}.)` : ``}`), this.code = this.name = e.code, this.data = { noun: t2, where: n2, canForce: r2 };
    }
  };
  ft2.code = `AlreadyExistsError`;
  var pt2 = class e extends d2 {
    constructor(t2, n2, r2) {
      super(`Found multiple ${t2} matching "${n2}" (${r2.join(`, `)}). Use a longer abbreviation length to disambiguate them.`), this.code = this.name = e.code, this.data = { nouns: t2, short: n2, matches: r2 };
    }
  };
  pt2.code = `AmbiguousError`;
  var mt2 = class e extends d2 {
    constructor(t2) {
      super(`Your local changes to the following files would be overwritten by checkout: ${t2.join(`, `)}`), this.code = this.name = e.code, this.data = { filepaths: t2 };
    }
  };
  mt2.code = `CheckoutConflictError`;
  var ht2 = class e extends d2 {
    constructor(t2, n2) {
      super(`Cannot cherry-pick merge commit ${t2}. Merge commits have ${n2} parents and require specifying which parent to use as the base.`), this.code = this.name = e.code, this.data = { oid: t2, parentCount: n2 };
    }
  };
  ht2.code = `CherryPickMergeCommitError`;
  var gt2 = class e extends d2 {
    constructor(t2) {
      super(`Cannot cherry-pick root commit ${t2}. Root commits have no parents.`), this.code = this.name = e.code, this.data = { oid: t2 };
    }
  };
  gt2.code = `CherryPickRootCommitError`;
  var _t2 = class e extends d2 {
    constructor(t2, n2) {
      super(`Failed to checkout "${t2}" because commit ${n2} is not available locally. Do a git fetch to make the branch available locally.`), this.code = this.name = e.code, this.data = { ref: t2, oid: n2 };
    }
  };
  _t2.code = `CommitNotFetchedError`;
  var vt2 = class e extends d2 {
    constructor() {
      super(`Empty response from git server.`), this.code = this.name = e.code, this.data = {};
    }
  };
  vt2.code = `EmptyServerResponseError`;
  var yt2 = class e extends d2 {
    constructor() {
      super(`A simple fast-forward merge was not possible.`), this.code = this.name = e.code, this.data = {};
    }
  };
  yt2.code = `FastForwardError`;
  var bt2 = class e extends d2 {
    constructor(t2, n2) {
      super(`One or more branches were not updated: ${t2}`), this.code = this.name = e.code, this.data = { prettyDetails: t2, result: n2 };
    }
  };
  bt2.code = `GitPushError`;
  var xt2 = class e extends d2 {
    constructor(t2, n2, r2) {
      super(`HTTP Error: ${t2} ${n2}`), this.code = this.name = e.code, this.data = { statusCode: t2, statusMessage: n2, response: r2 };
    }
  };
  xt2.code = `HttpError`;
  var St2 = class e extends d2 {
    constructor(t2) {
      let n2 = `invalid filepath`;
      t2 === `leading-slash` || t2 === `trailing-slash` ? n2 = `"filepath" parameter should not include leading or trailing directory separators because these can cause problems on some platforms.` : t2 === `directory` && (n2 = `"filepath" should not be a directory.`), super(n2), this.code = this.name = e.code, this.data = { reason: t2 };
    }
  };
  St2.code = `InvalidFilepathError`;
  var Ct2 = class e extends d2 {
    constructor(t2, n2) {
      super(`"${t2}" would be an invalid git reference. (Hint: a valid alternative would be "${n2}".)`), this.code = this.name = e.code, this.data = { ref: t2, suggestion: n2 };
    }
  };
  Ct2.code = `InvalidRefNameError`;
  var wt2 = class e extends d2 {
    constructor(t2) {
      super(`Maximum search depth of ${t2} exceeded.`), this.code = this.name = e.code, this.data = { depth: t2 };
    }
  };
  wt2.code = `MaxDepthError`;
  var Tt2 = class e extends d2 {
    constructor() {
      super(`Merges with conflicts are not supported yet.`), this.code = this.name = e.code, this.data = {};
    }
  };
  Tt2.code = `MergeNotSupportedError`;
  var Et2 = class e extends d2 {
    constructor(t2, n2, r2, i3) {
      super(`Automatic merge failed with one or more merge conflicts in the following files: ${t2.toString()}. Fix conflicts then commit the result.`), this.code = this.name = e.code, this.data = { filepaths: t2, bothModified: n2, deleteByUs: r2, deleteByTheirs: i3 };
    }
  };
  Et2.code = `MergeConflictError`;
  var Dt2 = class e extends d2 {
    constructor(t2) {
      super(`No name was provided for ${t2} in the argument or in the .git/config file.`), this.code = this.name = e.code, this.data = { role: t2 };
    }
  };
  Dt2.code = `MissingNameError`;
  var Ot2 = class e extends d2 {
    constructor(t2) {
      super(`The function requires a "${t2}" parameter but none was provided.`), this.code = this.name = e.code, this.data = { parameter: t2 };
    }
  };
  Ot2.code = `MissingParameterError`;
  var kt2 = class e extends d2 {
    constructor(t2) {
      super(`There are multiple errors that were thrown by the method. Please refer to the "errors" property to see more`), this.code = this.name = e.code, this.data = { errors: t2 }, this.errors = t2;
    }
  };
  kt2.code = `MultipleGitError`;
  var At2 = class e extends d2 {
    constructor(t2, n2) {
      super(`Expected "${t2}" but received "${n2}".`), this.code = this.name = e.code, this.data = { expected: t2, actual: n2 };
    }
  };
  At2.code = `ParseError`;
  var jt2 = class e extends d2 {
    constructor(t2) {
      let n2 = ``;
      t2 === `not-fast-forward` ? n2 = ` because it was not a simple fast-forward` : t2 === `tag-exists` && (n2 = ` because tag already exists`), super(`Push rejected${n2}. Use "force: true" to override.`), this.code = this.name = e.code, this.data = { reason: t2 };
    }
  };
  jt2.code = `PushRejectedError`;
  var Mt2 = class e extends d2 {
    constructor(t2, n2) {
      super(`Remote does not support the "${t2}" so the "${n2}" parameter cannot be used.`), this.code = this.name = e.code, this.data = { capability: t2, parameter: n2 };
    }
  };
  Mt2.code = `RemoteCapabilityError`;
  var Nt2 = class e extends d2 {
    constructor(t2, n2) {
      super(`Remote did not reply using the "smart" HTTP protocol. Expected "001e# service=git-upload-pack" but received: ${t2}`), this.code = this.name = e.code, this.data = { preview: t2, response: n2 };
    }
  };
  Nt2.code = `SmartHttpError`;
  var Pt2 = class e extends d2 {
    constructor(t2, n2, r2) {
      super(`Git remote "${t2}" uses an unrecognized transport protocol: "${n2}"`), this.code = this.name = e.code, this.data = { url: t2, transport: n2, suggestion: r2 };
    }
  };
  Pt2.code = `UnknownTransportError`;
  var Ft2 = class e extends d2 {
    constructor(t2) {
      super(`Cannot parse remote URL: "${t2}"`), this.code = this.name = e.code, this.data = { url: t2 };
    }
  };
  Ft2.code = `UrlParseError`;
  var It2 = class e extends d2 {
    constructor() {
      super(`The operation was canceled.`), this.code = this.name = e.code, this.data = {};
    }
  };
  It2.code = `UserCanceledError`;
  var Lt2 = class e extends d2 {
    constructor(t2) {
      super(`Could not merge index: Entry for '${t2}' is not up to date. Either reset the index entry to HEAD, or stage your unstaged changes.`), this.code = this.name = e.code, this.data = { filepath: t2 };
    }
  };
  Lt2.code = `IndexResetError`;
  var Rt2 = class e extends d2 {
    constructor(t2) {
      super(`"${t2}" does not point to any commit. You're maybe working on a repository with no commits yet. `), this.code = this.name = e.code, this.data = { ref: t2 };
    }
  };
  Rt2.code = `NoCommitError`;
  function zt2({ name: e, email: t2, timestamp: n2, timezoneOffset: r2 }) {
    return r2 = Bt2(r2), `${e} <${t2}> ${n2} ${r2}`;
  }
  function Bt2(e) {
    let t2 = Vt2(Ht2(e));
    e = Math.abs(e);
    let n2 = Math.floor(e / 60);
    e -= n2 * 60;
    let r2 = String(n2), i3 = String(e);
    return r2.length < 2 && (r2 = `0` + r2), i3.length < 2 && (i3 = `0` + i3), (t2 === -1 ? `-` : `+`) + r2 + i3;
  }
  function Vt2(e) {
    return Math.sign(e) || (Object.is(e, -0) ? -1 : 1);
  }
  function Ht2(e) {
    return e === 0 ? e : -e;
  }
  function Ut2(e) {
    return e = e.replace(/\r/g, ``), e = e.replace(/^\n+/, ``), e = e.replace(/\n+$/, ``) + `
`, e;
  }
  function Wt2(e) {
    let [, t2, n2, r2, i3] = e.match(/^(.*) <(.*)> (.*) (.*)$/);
    return { name: t2, email: n2, timestamp: Number(r2), timezoneOffset: Gt2(i3) };
  }
  function Gt2(e) {
    let [, t2, n2, r2] = e.match(/(\+|-)(\d\d)(\d\d)/);
    return r2 = (t2 === `+` ? 1 : -1) * (Number(n2) * 60 + Number(r2)), Kt2(r2);
  }
  function Kt2(e) {
    return e === 0 ? e : -e;
  }
  var qt = class e {
    constructor(t2) {
      if (typeof t2 == `string`) this._tag = t2;
      else if (Buffer.isBuffer(t2)) this._tag = t2.toString(`utf8`);
      else if (typeof t2 == `object`) this._tag = e.render(t2);
      else throw new p2(`invalid type passed to GitAnnotatedTag constructor`);
    }
    static from(t2) {
      return new e(t2);
    }
    static render(e2) {
      return `object ${e2.object}
type ${e2.type}
tag ${e2.tag}
tagger ${zt2(e2.tagger)}

${e2.message}
${e2.gpgsig ? e2.gpgsig : ``}`;
    }
    justHeaders() {
      return this._tag.slice(0, this._tag.indexOf(`

`));
    }
    message() {
      let e2 = this.withoutSignature();
      return e2.slice(e2.indexOf(`

`) + 2);
    }
    parse() {
      return Object.assign(this.headers(), { message: this.message(), gpgsig: this.gpgsig() });
    }
    render() {
      return this._tag;
    }
    headers() {
      let e2 = this.justHeaders().split(`
`), t2 = [];
      for (let n3 of e2) n3[0] === ` ` ? t2[t2.length - 1] += `
` + n3.slice(1) : t2.push(n3);
      let n2 = {};
      for (let e3 of t2) {
        let t3 = e3.slice(0, e3.indexOf(` `)), r2 = e3.slice(e3.indexOf(` `) + 1);
        Array.isArray(n2[t3]) ? n2[t3].push(r2) : n2[t3] = r2;
      }
      return n2.tagger &&= Wt2(n2.tagger), n2.committer &&= Wt2(n2.committer), n2;
    }
    withoutSignature() {
      let e2 = Ut2(this._tag);
      return e2.indexOf(`
-----BEGIN PGP SIGNATURE-----`) === -1 ? e2 : e2.slice(0, e2.lastIndexOf(`
-----BEGIN PGP SIGNATURE-----`));
    }
    gpgsig() {
      if (this._tag.indexOf(`
-----BEGIN PGP SIGNATURE-----`) !== -1) return Ut2(this._tag.slice(this._tag.indexOf(`-----BEGIN PGP SIGNATURE-----`), this._tag.indexOf(`-----END PGP SIGNATURE-----`) + 27));
    }
    payload() {
      return this.withoutSignature() + `
`;
    }
    toObject() {
      return Buffer.from(this._tag, `utf8`);
    }
    static async sign(t2, n2, r2) {
      let i3 = t2.payload(), { signature: a3 } = await n2({ payload: i3, secretKey: r2 });
      a3 = Ut2(a3);
      let o3 = i3 + a3;
      return e.from(o3);
    }
  };
  function Jt(e) {
    return e.trim().split(`
`).map((e2) => ` ` + e2).join(`
`) + `
`;
  }
  function Yt(e) {
    return e.split(`
`).map((e2) => e2.replace(/^ /, ``)).join(`
`);
  }
  var Xt = class e {
    constructor(t2) {
      if (typeof t2 == `string`) this._commit = t2;
      else if (Buffer.isBuffer(t2)) this._commit = t2.toString(`utf8`);
      else if (typeof t2 == `object`) this._commit = e.render(t2);
      else throw new p2(`invalid type passed to GitCommit constructor`);
    }
    static fromPayloadSignature({ payload: t2, signature: n2 }) {
      let r2 = e.justHeaders(t2), i3 = e.justMessage(t2);
      return new e(Ut2(r2 + `
gpgsig` + Jt(n2) + `
` + i3));
    }
    static from(t2) {
      return new e(t2);
    }
    toObject() {
      return Buffer.from(this._commit, `utf8`);
    }
    headers() {
      return this.parseHeaders();
    }
    message() {
      return e.justMessage(this._commit);
    }
    parse() {
      return Object.assign({ message: this.message() }, this.headers());
    }
    static justMessage(e2) {
      return Ut2(e2.slice(e2.indexOf(`

`) + 2));
    }
    static justHeaders(e2) {
      return e2.slice(0, e2.indexOf(`

`));
    }
    parseHeaders() {
      let t2 = e.justHeaders(this._commit).split(`
`), n2 = [];
      for (let e2 of t2) e2[0] === ` ` ? n2[n2.length - 1] += `
` + e2.slice(1) : n2.push(e2);
      let r2 = { parent: [] };
      for (let e2 of n2) {
        let t3 = e2.slice(0, e2.indexOf(` `)), n3 = e2.slice(e2.indexOf(` `) + 1);
        Array.isArray(r2[t3]) ? r2[t3].push(n3) : r2[t3] = n3;
      }
      return r2.author &&= Wt2(r2.author), r2.committer &&= Wt2(r2.committer), r2;
    }
    static renderHeaders(e2) {
      let t2 = ``;
      if (e2.tree ? t2 += `tree ${e2.tree}
` : t2 += `tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904
`, e2.parent) {
        if (e2.parent.length === void 0) throw new p2(`commit 'parent' property should be an array`);
        for (let n3 of e2.parent) t2 += `parent ${n3}
`;
      }
      let n2 = e2.author;
      t2 += `author ${zt2(n2)}
`;
      let r2 = e2.committer || e2.author;
      return t2 += `committer ${zt2(r2)}
`, e2.gpgsig && (t2 += `gpgsig` + Jt(e2.gpgsig)), t2;
    }
    static render(t2) {
      return e.renderHeaders(t2) + `
` + Ut2(t2.message);
    }
    render() {
      return this._commit;
    }
    withoutSignature() {
      let e2 = Ut2(this._commit);
      if (e2.indexOf(`
gpgsig`) === -1) return e2;
      let t2 = e2.slice(0, e2.indexOf(`
gpgsig`)), n2 = e2.slice(e2.indexOf(`-----END PGP SIGNATURE-----
`) + 28);
      return Ut2(t2 + `
` + n2);
    }
    isolateSignature() {
      return Yt(this._commit.slice(this._commit.indexOf(`-----BEGIN PGP SIGNATURE-----`), this._commit.indexOf(`-----END PGP SIGNATURE-----`) + 27));
    }
    static async sign(t2, n2, r2) {
      let i3 = t2.withoutSignature(), a3 = e.justMessage(t2._commit), { signature: o3 } = await n2({ payload: i3, secretKey: r2 });
      o3 = Ut2(o3);
      let s3 = e.justHeaders(t2._commit) + `
gpgsig` + Jt(o3) + `
` + a3;
      return e.from(s3);
    }
  };
  async function Zt({ fs: e, cache: t2, gitdir: n2, oid: r2 }) {
    if (r2 === `4b825dc642cb6eb9a060e54bf8d69288fbee4904`) return { tree: ze2.from([]), oid: r2 };
    let { type: i3, object: a3 } = await dt2({ fs: e, cache: t2, gitdir: n2, oid: r2 });
    if (i3 === `tag`) return r2 = qt.from(a3).parse().object, Zt({ fs: e, cache: t2, gitdir: n2, oid: r2 });
    if (i3 === `commit`) return r2 = Xt.from(a3).parse().tree, Zt({ fs: e, cache: t2, gitdir: n2, oid: r2 });
    if (i3 !== `tree`) throw new re2(r2, i3, `tree`);
    return { tree: ze2.from(a3), oid: r2 };
  }
  var Qt = class {
    constructor({ fs: e, gitdir: t2, ref: n2, cache: r2 }) {
      this.fs = e, this.cache = r2, this.gitdir = t2, this.mapPromise = (async () => {
        let r3 = /* @__PURE__ */ new Map(), i4;
        try {
          i4 = await De2.resolve({ fs: e, gitdir: t2, ref: n2 });
        } catch (e2) {
          e2 instanceof H2 && (i4 = `4b825dc642cb6eb9a060e54bf8d69288fbee4904`);
        }
        let a3 = await Zt({ fs: e, cache: this.cache, gitdir: t2, oid: i4 });
        return a3.type = `tree`, a3.mode = `40000`, r3.set(`.`, a3), r3;
      })();
      let i3 = this;
      this.ConstructEntry = class {
        constructor(e2) {
          this._fullpath = e2, this._type = false, this._mode = false, this._stat = false, this._content = false, this._oid = false;
        }
        async type() {
          return i3.type(this);
        }
        async mode() {
          return i3.mode(this);
        }
        async stat() {
          return i3.stat(this);
        }
        async content() {
          return i3.content(this);
        }
        async oid() {
          return i3.oid(this);
        }
      };
    }
    async readdir(e) {
      let t2 = e._fullpath, { fs: n2, cache: r2, gitdir: i3 } = this, a3 = await this.mapPromise, o3 = a3.get(t2);
      if (!o3) throw Error(`No obj for ${t2}`);
      let s3 = o3.oid;
      if (!s3) throw Error(`No oid for obj ${JSON.stringify(o3)}`);
      if (o3.type !== `tree`) return null;
      let { type: c3, object: l3 } = await dt2({ fs: n2, cache: r2, gitdir: i3, oid: s3 });
      if (c3 !== o3.type) throw new re2(s3, c3, o3.type);
      let u2 = ze2.from(l3);
      for (let e2 of u2) a3.set(ce2(t2, e2.path), e2);
      return u2.entries().map((e2) => ce2(t2, e2.path));
    }
    async type(e) {
      if (e._type === false) {
        let { type: t2 } = (await this.mapPromise).get(e._fullpath);
        e._type = t2;
      }
      return e._type;
    }
    async mode(e) {
      if (e._mode === false) {
        let { mode: t2 } = (await this.mapPromise).get(e._fullpath);
        e._mode = v2(parseInt(t2, 8));
      }
      return e._mode;
    }
    async stat(e) {
    }
    async content(e) {
      if (e._content === false) {
        let t2 = await this.mapPromise, { fs: n2, cache: r2, gitdir: i3 } = this, a3 = t2.get(e._fullpath).oid, { type: o3, object: s3 } = await dt2({ fs: n2, cache: r2, gitdir: i3, oid: a3 });
        o3 === `blob` ? e._content = new Uint8Array(s3) : e._content = void 0;
      }
      return e._content;
    }
    async oid(e) {
      return e._oid === false && (e._oid = (await this.mapPromise).get(e._fullpath).oid), e._oid;
    }
  };
  function $t({ ref: e = `HEAD` } = {}) {
    let t2 = /* @__PURE__ */ Object.create(null);
    return Object.defineProperty(t2, B2, { value: function({ fs: t3, gitdir: n2, cache: r2 }) {
      return new Qt({ fs: t3, gitdir: n2, ref: e, cache: r2 });
    } }), Object.freeze(t2), t2;
  }
  var en = class {
    constructor({ fs: e, dir: t2, gitdir: n2, cache: r2, refresh: i3 = true }) {
      this.fs = e, this.cache = r2, this.dir = t2, this.gitdir = n2, this.refresh = i3, this.config = null;
      let a3 = this;
      this.ConstructEntry = class {
        constructor(e2) {
          this._fullpath = e2, this._type = false, this._mode = false, this._stat = false, this._content = false, this._oid = false;
        }
        async type() {
          return a3.type(this);
        }
        async mode() {
          return a3.mode(this);
        }
        async stat() {
          return a3.stat(this);
        }
        async content() {
          return a3.content(this);
        }
        async oid() {
          return a3.oid(this);
        }
      };
    }
    async readdir(e) {
      let t2 = e._fullpath, { fs: n2, dir: r2 } = this, i3 = await n2.readdir(ce2(r2, t2));
      return i3 === null ? null : i3.map((e2) => ce2(t2, e2));
    }
    async type(e) {
      return e._type === false && await e.stat(), e._type;
    }
    async mode(e) {
      return e._mode === false && await e.stat(), e._mode;
    }
    async stat(e) {
      if (e._stat === false) {
        let { fs: t2, dir: n2 } = this, r2 = await t2.lstat(`${n2}/${e._fullpath}`);
        if (!r2) throw Error(`ENOENT: no such file or directory, lstat '${e._fullpath}'`);
        let i3 = r2.isDirectory() ? `tree` : `blob`;
        i3 === `blob` && !r2.isFile() && !r2.isSymbolicLink() && (i3 = `special`), e._type = i3, r2 = x2(r2), e._mode = r2.mode, r2.size === -1 && e._actualSize && (r2.size = e._actualSize), e._stat = r2;
      }
      return e._stat;
    }
    async content(e) {
      if (e._content === false) {
        let { fs: t2, dir: n2, gitdir: r2 } = this;
        if (await e.type() === `tree`) e._content = void 0;
        else {
          let i3;
          if (await e.mode() >> 12 == 10) i3 = await t2.readlink(`${n2}/${e._fullpath}`);
          else {
            let a3 = await (await this._getGitConfig(t2, r2)).get(`core.autocrlf`);
            i3 = await t2.read(`${n2}/${e._fullpath}`, { autocrlf: a3 });
          }
          e._actualSize = i3.length, e._stat && e._stat.size === -1 && (e._stat.size = e._actualSize), e._content = new Uint8Array(i3);
        }
      }
      return e._content;
    }
    async oid(e) {
      if (e._oid === false) {
        let t2 = this, { fs: n2, gitdir: r2, cache: i3 } = this, a3;
        await I2.acquire({ fs: n2, gitdir: r2, cache: i3 }, async function(i4) {
          let o3 = i4.entriesMap.get(e._fullpath), s3 = await e.stat(), c3 = await (await t2._getGitConfig(n2, r2)).get(`core.filemode`), l3 = typeof process < `u` ? process.platform !== `win32` : true;
          if (!o3 || j2(s3, o3, c3, l3)) {
            let n3 = await e.content();
            n3 === void 0 ? a3 = void 0 : (a3 = await w2(Be2.wrap({ type: `blob`, object: n3 })), t2.refresh && o3 && a3 === o3.oid && (!c3 || s3.mode === o3.mode) && j2(s3, o3, c3, l3) && i4.insert({ filepath: e._fullpath, stats: s3, oid: a3 }));
          } else a3 = o3.oid;
        }), e._oid = a3;
      }
      return e._oid;
    }
    async _getGitConfig(e, t2) {
      return this.config ||= await Se2.get({ fs: e, gitdir: t2 }), this.config;
    }
  };
  function tn({ refresh: e = true } = {}) {
    let t2 = /* @__PURE__ */ Object.create(null);
    return Object.defineProperty(t2, B2, { value: function({ fs: t3, dir: n2, gitdir: r2, cache: i3 }) {
      return new en({ fs: t3, dir: n2, gitdir: r2, cache: i3, refresh: e });
    } }), Object.freeze(t2), t2;
  }
  function nn(e, t2) {
    let n2 = t2 - e;
    return Array.from({ length: n2 }, (t3, n3) => e + n3);
  }
  let rn = Array.prototype.flat === void 0 ? (e) => e.reduce((e2, t2) => e2.concat(t2), []) : (e) => e.flat();
  var an = class {
    constructor() {
      this.value = null;
    }
    consider(e) {
      e != null && (this.value === null || e < this.value) && (this.value = e);
    }
    reset() {
      this.value = null;
    }
  };
  function* on(e) {
    let t2 = new an(), n2, r2 = [], i3 = e.length;
    for (let n3 = 0; n3 < i3; n3++) r2[n3] = e[n3].next().value, r2[n3] !== void 0 && t2.consider(r2[n3]);
    if (t2.value !== null) for (; ; ) {
      let a3 = [];
      n2 = t2.value, t2.reset();
      for (let o3 = 0; o3 < i3; o3++) r2[o3] !== void 0 && r2[o3] === n2 ? (a3[o3] = r2[o3], r2[o3] = e[o3].next().value) : a3[o3] = null, r2[o3] !== void 0 && t2.consider(r2[o3]);
      if (yield a3, t2.value === null) return;
    }
  }
  async function sn({ fs: e, cache: t2, dir: n2, gitdir: r2, trees: i3, map: a3 = async (e2, t3) => t3, reduce: o3 = async (e2, t3) => {
    let n3 = rn(t3);
    return e2 !== void 0 && n3.unshift(e2), n3;
  }, iterate: s3 = (e2, t3) => Promise.all([...t3].map(e2)) }) {
    let c3 = i3.map((i4) => i4[B2]({ fs: e, dir: n2, gitdir: r2, cache: t2 })), l3 = Array(c3.length).fill(`.`), u2 = nn(0, c3.length), d3 = async (e2) => (u2.forEach((t3) => {
      let n3 = e2[t3];
      e2[t3] = n3 && new c3[t3].ConstructEntry(n3);
    }), { entries: e2, children: on((await Promise.all(u2.map((t3) => {
      let n3 = e2[t3];
      return n3 ? c3[t3].readdir(n3) : [];
    }))).map((e3) => (e3 === null ? [] : e3)[Symbol.iterator]())) }), f4 = async (e2) => {
      let { entries: t3, children: n3 } = await d3(e2), r3 = t3.find((e3) => e3 && e3._fullpath)._fullpath, i4 = await a3(r3, t3);
      if (i4 !== null) {
        let e3 = await s3(f4, n3);
        return e3 = e3.filter((e4) => e4 !== void 0), o3(i4, e3);
      }
    };
    return f4(l3);
  }
  async function cn(e, t2) {
    let n2 = await e.readdir(t2);
    n2 == null ? await e.rm(t2) : n2.length ? await Promise.all(n2.map((n3) => {
      let r2 = ce2(t2, n3);
      return e.lstat(r2).then((t3) => {
        if (t3) return t3.isDirectory() ? cn(e, r2) : e.rm(r2);
      });
    })).then(() => e.rmdir(t2)) : await e.rmdir(t2);
  }
  function ln(e) {
    return un(e) && dn(e.then) && dn(e.catch);
  }
  function un(e) {
    return e && typeof e == `object`;
  }
  function dn(e) {
    return typeof e == `function`;
  }
  function fn(e) {
    return ln(((e2) => {
      try {
        return e2.readFile().catch((e3) => e3);
      } catch (e3) {
        return e3;
      }
    })(e));
  }
  let pn = [`readFile`, `writeFile`, `mkdir`, `rmdir`, `unlink`, `stat`, `lstat`, `readdir`, `readlink`, `symlink`];
  function mn(e, t2) {
    if (fn(t2)) for (let n2 of pn) e[`_${n2}`] = t2[n2].bind(t2);
    else for (let n2 of pn) e[`_${n2}`] = c2(t2[n2].bind(t2));
    fn(t2) ? (t2.cp && (e._cp = t2.cp.bind(t2)), t2.rm ? e._rm = t2.rm.bind(t2) : t2.rmdir.length > 1 ? e._rm = t2.rmdir.bind(t2) : e._rm = cn.bind(null, e)) : (t2.cp && (e._cp = c2(t2.cp.bind(t2))), t2.rm ? e._rm = c2(t2.rm.bind(t2)) : t2.rmdir.length > 2 ? e._rm = c2(t2.rmdir.bind(t2)) : e._rm = cn.bind(null, e));
  }
  var hn = class {
    constructor(e) {
      if (e._original_unwrapped_fs !== void 0) return e;
      let t2 = Object.getOwnPropertyDescriptor(e, `promises`);
      t2 && t2.enumerable ? mn(this, e.promises) : mn(this, e), this._original_unwrapped_fs = e;
    }
    async exists(e, t2 = {}) {
      try {
        return await this._stat(e), true;
      } catch (e2) {
        if (e2.code === `ENOENT` || e2.code === `ENOTDIR` || (e2.code || ``).includes(`ENS`)) return false;
        throw console.log(`Unhandled error in "FileSystem.exists()" function`, e2), e2;
      }
    }
    async read(e, t2 = {}) {
      try {
        let n2 = await this._readFile(e, t2);
        if (t2.autocrlf === `true`) try {
          n2 = new TextDecoder(`utf8`, { fatal: true }).decode(n2), n2 = n2.replace(/\r\n/g, `
`), n2 = new TextEncoder().encode(n2);
        } catch {
        }
        return typeof n2 != `string` && (n2 = Buffer.from(n2)), n2;
      } catch {
        return null;
      }
    }
    async write(e, t2, n2 = {}) {
      try {
        await this._writeFile(e, t2, n2);
      } catch {
        await this.mkdir(R2(e)), await this._writeFile(e, t2, n2);
      }
    }
    async mkdir(e, t2 = false) {
      try {
        await this._mkdir(e);
      } catch (n2) {
        if (n2 === null || n2.code === `EEXIST`) return;
        if (t2) throw n2;
        if (n2.code === `ENOENT`) {
          let t3 = R2(e);
          if (t3 === `.` || t3 === `/` || t3 === e) throw n2;
          await this.mkdir(t3), await this.mkdir(e, true);
        }
      }
    }
    async rm(e) {
      try {
        await this._unlink(e);
      } catch (e2) {
        if (e2.code !== `ENOENT`) throw e2;
      }
    }
    async rmdir(e, t2) {
      try {
        t2 && t2.recursive ? await this._rm(e, t2) : await this._rmdir(e);
      } catch (e2) {
        if (e2.code !== `ENOENT`) throw e2;
      }
    }
    async readdir(e) {
      try {
        let t2 = await this._readdir(e);
        return t2.sort(g2), t2;
      } catch (e2) {
        return e2.code === `ENOTDIR` ? null : [];
      }
    }
    async readdirDeep(e) {
      let t2 = await this._readdir(e);
      return (await Promise.all(t2.map(async (t3) => {
        let n2 = e + `/` + t3;
        return (await this._stat(n2)).isDirectory() ? this.readdirDeep(n2) : n2;
      }))).reduce((e2, t3) => e2.concat(t3), []);
    }
    async lstat(e) {
      try {
        return await this._lstat(e);
      } catch (e2) {
        if (e2.code === `ENOENT` || (e2.code || ``).includes(`ENS`)) return null;
        throw e2;
      }
    }
    async readlink(e, t2 = { encoding: `buffer` }) {
      try {
        let n2 = await this._readlink(e, t2);
        return Buffer.isBuffer(n2) ? n2 : Buffer.from(n2);
      } catch (e2) {
        if (e2.code === `ENOENT` || (e2.code || ``).includes(`ENS`)) return null;
        throw e2;
      }
    }
    async writelink(e, t2) {
      return this._symlink(t2.toString(`utf8`), e);
    }
  };
  function gn(e, t2) {
    if (t2 === void 0) throw new Ot2(e);
  }
  function _n(e) {
    return e.startsWith(`/`) || /^[a-zA-Z]:[\\/]/.test(e);
  }
  async function vn({ fsp: e, dotgit: t2 }) {
    gn(`fsp`, e), gn(`dotgit`, t2);
    let n2 = await e._stat(t2).catch(() => ({ isFile: () => false, isDirectory: () => false }));
    return n2.isDirectory() ? t2 : n2.isFile() ? e._readFile(t2, `utf8`).then((e2) => e2.trimRight().substr(8)).then((e2) => _n(e2) ? e2 : ce2(R2(t2), e2)) : t2;
  }
  let yn = /(^|[/.])([/.]|$)|^@$|@{|[\x00-\x20\x7f~^:?*[\\]|\.lock(\/|$)/;
  function bn(e, t2) {
    if (typeof e != `string`) throw TypeError(`Reference name must be a string`);
    return !yn.test(e) && (!!t2 || e.includes(`/`));
  }
  async function xn({ fs: e, gitdir: t2, remote: n2, url: r2, force: i3 }) {
    if (!bn(n2, true)) throw new Ct2(n2, l2.clean(n2));
    let a3 = await Se2.get({ fs: e, gitdir: t2 });
    if (!i3 && (await a3.getSubsections(`remote`)).includes(n2) && r2 !== await a3.get(`remote.${n2}.url`)) throw new ft2(`remote`, n2);
    await a3.set(`remote.${n2}.url`, r2), await a3.set(`remote.${n2}.fetch`, `+refs/heads/*:refs/remotes/${n2}/*`), await Se2.save({ fs: e, gitdir: t2, config: a3 });
  }
  let Sn = (e, t2) => e === `.` || t2 == null || t2.length === 0 || t2 === `.` ? true : t2.length >= e.length ? t2.startsWith(e) : e.startsWith(t2);
  async function Cn({ fs: e, cache: t2, onProgress: n2, onPostCheckout: r2, dir: i3, gitdir: a3, remote: o3, ref: s3, filepaths: c3, noCheckout: l3, noUpdateHead: u2, dryRun: d3, force: f4, track: m4 = true, nonBlocking: h4 = false, batchSize: g3 = 100 }) {
    let _3;
    if (r2) try {
      _3 = await De2.resolve({ fs: e, gitdir: a3, ref: `HEAD` });
    } catch {
      _3 = `0000000000000000000000000000000000000000`;
    }
    let v3;
    try {
      v3 = await De2.resolve({ fs: e, gitdir: a3, ref: s3 });
    } catch (t3) {
      if (s3 === `HEAD`) throw t3;
      let n3 = `${o3}/${s3}`;
      if (v3 = await De2.resolve({ fs: e, gitdir: a3, ref: n3 }), m4) {
        let t4 = await Se2.get({ fs: e, gitdir: a3 });
        await t4.set(`branch.${s3}.remote`, o3), await t4.set(`branch.${s3}.merge`, `refs/heads/${s3}`), await Se2.save({ fs: e, gitdir: a3, config: t4 });
      }
      await De2.writeRef({ fs: e, gitdir: a3, ref: `refs/heads/${s3}`, value: v3 });
    }
    if (!l3) {
      let o4;
      try {
        o4 = await wn({ fs: e, cache: t2, onProgress: n2, dir: i3, gitdir: a3, ref: s3, force: f4, filepaths: c3 });
      } catch (e2) {
        throw e2 instanceof H2 && e2.data.what === v3 ? new _t2(s3, v3) : e2;
      }
      let l4 = o4.filter(([e2]) => e2 === `conflict`).map(([e2, t3]) => t3);
      if (l4.length > 0) throw new mt2(l4);
      let u3 = o4.filter(([e2]) => e2 === `error`).map(([e2, t3]) => t3);
      if (u3.length > 0) throw new p2(u3.join(`, `));
      if (d3) {
        r2 && await r2({ previousHead: _3, newHead: v3, type: c3 != null && c3.length > 0 ? `file` : `branch` });
        return;
      }
      let m5 = 0, y3 = o4.length;
      if (await I2.acquire({ fs: e, gitdir: a3, cache: t2 }, async function(t3) {
        await Promise.all(o4.filter(([e2]) => e2 === `delete` || e2 === `delete-index`).map(async function([r3, a4]) {
          let o5 = `${i3}/${a4}`;
          r3 === `delete` && await e.rm(o5), t3.delete({ filepath: a4 }), n2 && await n2({ phase: `Updating workdir`, loaded: ++m5, total: y3 });
        }));
      }), await I2.acquire({ fs: e, gitdir: a3, cache: t2 }, async function(t3) {
        for (let [r3, a4] of o4) if (r3 === `rmdir` || r3 === `rmdir-index`) {
          let o5 = `${i3}/${a4}`;
          try {
            r3 === `rmdir` && await e.rmdir(o5), t3.delete({ filepath: a4 }), n2 && await n2({ phase: `Updating workdir`, loaded: ++m5, total: y3 });
          } catch (e2) {
            if (e2.code === `ENOTEMPTY`) console.log(`Did not delete ${a4} because directory is not empty`);
            else throw e2;
          }
        }
      }), await Promise.all(o4.filter(([e2]) => e2 === `mkdir` || e2 === `mkdir-index`).map(async function([t3, r3]) {
        let a4 = `${i3}/${r3}`;
        await e.mkdir(a4), n2 && await n2({ phase: `Updating workdir`, loaded: ++m5, total: y3 });
      })), h4) {
        let r3 = await Dn(`Update Working Dir`, o4.filter(([e2]) => e2 === `create` || e2 === `create-index` || e2 === `update` || e2 === `mkdir-index`).map(([n3, r4, o5, s4, c4]) => () => En({ fs: e, cache: t2, gitdir: a3, dir: i3 }, [n3, r4, o5, s4, c4])), n2, g3);
        await I2.acquire({ fs: e, gitdir: a3, cache: t2, allowUnmerged: true }, async function(e2) {
          await Dn(`Update Index`, r3.map(([t3, n3, r4]) => () => Tn({ index: e2, fullpath: t3, oid: n3, stats: r4 })), n2, g3);
        });
      } else await I2.acquire({ fs: e, gitdir: a3, cache: t2, allowUnmerged: true }, async function(r3) {
        let s4 = await Promise.allSettled(o4.filter(([e2]) => e2 === `create` || e2 === `create-index` || e2 === `update` || e2 === `mkdir-index`).map(async function([o5, s5, c5, l5, u4]) {
          let d4 = `${i3}/${s5}`;
          if (o5 !== `create-index` && o5 !== `mkdir-index`) {
            let { object: n3 } = await dt2({ fs: e, cache: t2, gitdir: a3, oid: c5 });
            if (u4 && await e.rm(d4), l5 === 33188) await e.write(d4, n3);
            else if (l5 === 33261) await e.write(d4, n3, { mode: 511 });
            else if (l5 === 40960) await e.writelink(d4, n3);
            else throw new p2(`Invalid mode 0o${l5.toString(8)} detected in blob ${c5}`);
          }
          let f5 = await e.lstat(d4);
          l5 === 33261 && (f5.mode = 493), o5 === `mkdir-index` && (f5.mode = 57344), r3.insert({ filepath: s5, stats: f5, oid: c5 }), n2 && await n2({ phase: `Updating workdir`, loaded: ++m5, total: y3 });
        })), c4 = [];
        for (let e2 of s4) e2.status === `rejected` && (c4.push(e2.reason), console.error(`[isomorphic-git checkout] task rejected:`, e2.reason?.stack ?? e2.reason));
        if (c4.length > 0) throw new kt2(c4);
      });
      r2 && await r2({ previousHead: _3, newHead: v3, type: c3 != null && c3.length > 0 ? `file` : `branch` });
    }
    if (!u2) {
      let t3 = await De2.expand({ fs: e, gitdir: a3, ref: s3 });
      t3.startsWith(`refs/heads`) ? await De2.writeSymbolicRef({ fs: e, gitdir: a3, ref: `HEAD`, value: t3 }) : await De2.writeRef({ fs: e, gitdir: a3, ref: `HEAD`, value: v3 });
    }
  }
  async function wn({ fs: e, cache: t2, onProgress: n2, dir: r2, gitdir: i3, ref: a3, force: o3, filepaths: s3 }) {
    let c3 = 0;
    return sn({ fs: e, cache: t2, dir: r2, gitdir: i3, trees: [$t({ ref: a3 }), tn(), V2()], map: async function(e2, [t3, r3, i4]) {
      if (e2 !== `.`) {
        if (s3 && !s3.some((t4) => Sn(e2, t4))) return null;
        switch (n2 && await n2({ phase: `Analyzing workdir`, loaded: ++c3 }), [!!i4, !!t3, !!r3].map(Number).join(``)) {
          case `000`:
            return;
          case `001`:
            return o3 && s3 && s3.includes(e2) ? [`delete`, e2] : void 0;
          case `010`:
            switch (await t3.type()) {
              case `tree`:
                return [`mkdir`, e2];
              case `blob`:
                return [`create`, e2, await t3.oid(), await t3.mode()];
              case `commit`:
                return [`mkdir-index`, e2, await t3.oid(), await t3.mode()];
              default:
                return [`error`, `new entry Unhandled type ${await t3.type()}`];
            }
          case `011`:
            switch (`${await t3.type()}-${await r3.type()}`) {
              case `tree-tree`:
                return;
              case `tree-blob`:
              case `blob-tree`:
                return [`conflict`, e2];
              case `blob-blob`:
                return await t3.oid() === await r3.oid() ? await t3.mode() === await r3.mode() ? [`create-index`, e2, await t3.oid(), await t3.mode()] : o3 ? [`update`, e2, await t3.oid(), await t3.mode(), true] : [`conflict`, e2] : o3 ? [`update`, e2, await t3.oid(), await t3.mode(), await t3.mode() !== await r3.mode()] : [`conflict`, e2];
              case `commit-tree`:
                return;
              case `commit-blob`:
                return [`conflict`, e2];
              default:
                return [`error`, `new entry Unhandled type ${t3.type}`];
            }
          case `100`:
            return [`delete-index`, e2];
          case `101`:
            switch (await i4.type()) {
              case `tree`:
                return [`rmdir-index`, e2];
              case `blob`:
                return await i4.oid() === await r3.oid() || o3 ? [`delete`, e2] : [`conflict`, e2];
              case `commit`:
                return [`rmdir-index`, e2];
              default:
                return [`error`, `delete entry Unhandled type ${await i4.type()}`];
            }
          case `110`:
          case `111`:
            switch (`${await i4.type()}-${await t3.type()}`) {
              case `tree-tree`:
                return;
              case `blob-blob`:
                if (await i4.oid() === await t3.oid() && await i4.mode() === await t3.mode() && !o3) return;
                if (r3) {
                  if (await r3.oid() !== await i4.oid() && await r3.oid() !== await t3.oid()) return o3 ? [`update`, e2, await t3.oid(), await t3.mode(), await t3.mode() !== await r3.mode()] : [`conflict`, e2];
                } else if (o3) return [`update`, e2, await t3.oid(), await t3.mode(), await t3.mode() !== await i4.mode()];
                return await t3.mode() === await i4.mode() ? await t3.oid() === await i4.oid() ? void 0 : [`update`, e2, await t3.oid(), await t3.mode(), false] : [`update`, e2, await t3.oid(), await t3.mode(), true];
              case `tree-blob`:
                return [`update-dir-to-blob`, e2, await t3.oid()];
              case `blob-tree`:
                return [`update-blob-to-tree`, e2];
              case `commit-commit`:
                return [`mkdir-index`, e2, await t3.oid(), await t3.mode()];
              default:
                return [`error`, `update entry Unhandled type ${await i4.type()}-${await t3.type()}`];
            }
        }
      }
    }, reduce: async function(e2, t3) {
      return t3 = rn(t3), e2 ? e2 && e2[0] === `rmdir` ? (t3.push(e2), t3) : (t3.unshift(e2), t3) : t3;
    } });
  }
  async function Tn({ index: e, fullpath: t2, stats: n2, oid: r2 }) {
    try {
      e.insert({ filepath: t2, stats: n2, oid: r2 });
    } catch (e2) {
      console.warn(`Error inserting ${t2} into index:`, e2);
    }
  }
  async function En({ fs: e, cache: t2, gitdir: n2, dir: r2 }, [i3, a3, o3, s3, c3]) {
    let l3 = `${r2}/${a3}`;
    if (i3 !== `create-index` && i3 !== `mkdir-index`) {
      let { object: r3 } = await dt2({ fs: e, cache: t2, gitdir: n2, oid: o3 });
      if (c3 && await e.rm(l3), s3 === 33188) await e.write(l3, r3);
      else if (s3 === 33261) await e.write(l3, r3, { mode: 511 });
      else if (s3 === 40960) await e.writelink(l3, r3);
      else throw new p2(`Invalid mode 0o${s3.toString(8)} detected in blob ${o3}`);
    }
    let u2 = await e.lstat(l3);
    return s3 === 33261 && (u2.mode = 493), i3 === `mkdir-index` && (u2.mode = 57344), [a3, o3, u2];
  }
  async function Dn(e, t2, n2, r2) {
    let i3 = [], a3 = [];
    for (let o3 = 0; o3 < t2.length; o3 += r2) {
      let s3 = t2.slice(o3, o3 + r2).map((e2) => e2());
      (await Promise.allSettled(s3)).forEach((t3) => {
        t3.status === `fulfilled` ? i3.push(t3.value) : (a3.push(t3.reason), console.error(`[isomorphic-git ${e}] task rejected:`, t3.reason?.stack ?? t3.reason));
      }), n2 && await n2({ phase: `Updating workdir`, loaded: o3 + s3.length, total: t2.length });
    }
    if (a3.length > 0) throw new kt2(a3);
    return i3;
  }
  async function On({ fs: e, onProgress: t2, onPostCheckout: n2, dir: r2, gitdir: i3 = ce2(r2, `.git`), remote: a3 = `origin`, ref: o3, filepaths: s3, noCheckout: c3 = false, noUpdateHead: l3 = o3 === void 0, dryRun: u2 = false, force: d3 = false, track: f4 = true, cache: p3 = {}, nonBlocking: m4 = false, batchSize: h4 = 100 }) {
    try {
      gn(`fs`, e), gn(`dir`, r2), gn(`gitdir`, i3);
      let g3 = o3 || `HEAD`, _3 = new hn(e);
      return await Cn({ fs: _3, cache: p3, onProgress: t2, onPostCheckout: n2, dir: r2, gitdir: await vn({ fsp: _3, dotgit: i3 }), remote: a3, ref: g3, filepaths: s3, noCheckout: c3, noUpdateHead: l3, dryRun: u2, force: d3, track: f4, nonBlocking: m4, batchSize: h4 });
    } catch (e2) {
      throw e2.caller = `git.checkout`, e2;
    }
  }
  let kn = /^refs\/(heads\/|tags\/|remotes\/)?(.*)/;
  function An(e) {
    let t2 = kn.exec(e);
    return t2 ? t2[1] === `remotes/` && e.endsWith(`/HEAD`) ? t2[2].slice(0, -5) : t2[2] : e;
  }
  async function jn({ fs: e, gitdir: t2, fullname: n2 = false, test: r2 = false }) {
    let i3 = await De2.resolve({ fs: e, gitdir: t2, ref: `HEAD`, depth: 2 });
    if (r2) try {
      await De2.resolve({ fs: e, gitdir: t2, ref: i3 });
    } catch {
      return;
    }
    if (i3.startsWith(`refs/`)) return n2 ? i3 : An(i3);
  }
  function Mn(e) {
    return e = e.replace(/^git@([^:]+):/, `https://$1/`), e = e.replace(/^ssh:\/\//, `https://`), e;
  }
  function Nn({ username: e = ``, password: t2 = `` }) {
    return `Basic ${Buffer.from(`${e}:${t2}`).toString(`base64`)}`;
  }
  async function Pn(e, t2) {
    let n2 = qe2(e);
    for (; ; ) {
      let { value: e2, done: r2 } = await n2.next();
      if (e2 && await t2(e2), r2) break;
    }
    n2.return && n2.return();
  }
  async function Fn(e) {
    let t2 = 0, n2 = [];
    await Pn(e, (e2) => {
      n2.push(e2), t2 += e2.byteLength;
    });
    let r2 = new Uint8Array(t2), i3 = 0;
    for (let e2 of n2) r2.set(e2, i3), i3 += e2.byteLength;
    return r2;
  }
  function In(e) {
    let t2 = e.match(/^https?:\/\/([^/]+)@/);
    if (t2 == null) return { url: e, auth: {} };
    t2 = t2[1];
    let [n2, r2] = t2.split(`:`);
    return e = e.replace(`${t2}@`, ``), { url: e, auth: { username: n2, password: r2 } };
  }
  function Ln(e, t2) {
    let n2 = t2.toString(16);
    return `0`.repeat(e - n2.length) + n2;
  }
  var Rn = class {
    static flush() {
      return Buffer.from(`0000`, `utf8`);
    }
    static delim() {
      return Buffer.from(`0001`, `utf8`);
    }
    static encode(e) {
      typeof e == `string` && (e = Buffer.from(e));
      let t2 = Ln(4, e.length + 4);
      return Buffer.concat([Buffer.from(t2, `utf8`), e]);
    }
    static streamReader(e) {
      let t2 = new Je2(e);
      return async function() {
        try {
          let e2 = await t2.read(4);
          return e2 == null ? true : (e2 = parseInt(e2.toString(`utf8`), 16), e2 === 0 || e2 === 1 ? null : await t2.read(e2 - 4) ?? true);
        } catch (t3) {
          return e.error = t3, true;
        }
      };
    }
  };
  async function zn(e) {
    let t2 = {}, n2;
    for (; n2 = await e(), n2 !== true; ) {
      if (n2 === null) continue;
      n2 = n2.toString(`utf8`).replace(/\n$/, ``);
      let e2 = n2.indexOf(`=`);
      if (e2 > -1) {
        let r2 = n2.slice(0, e2);
        t2[r2] = n2.slice(e2 + 1);
      } else t2[n2] = true;
    }
    return { protocolVersion: 2, capabilities2: t2 };
  }
  async function Bn(e, { service: t2 }) {
    let n2 = /* @__PURE__ */ new Set(), r2 = /* @__PURE__ */ new Map(), i3 = /* @__PURE__ */ new Map(), a3 = Rn.streamReader(e), o3 = await a3();
    for (; o3 === null; ) o3 = await a3();
    if (o3 === true) throw new vt2();
    if (o3.includes(`version 2`)) return zn(a3);
    if (o3.toString(`utf8`).replace(/\n$/, ``) !== `# service=${t2}`) throw new At2(`# service=${t2}\\n`, o3.toString(`utf8`));
    let s3 = await a3();
    for (; s3 === null; ) s3 = await a3();
    if (s3 === true) return { capabilities: n2, refs: r2, symrefs: i3 };
    if (s3 = s3.toString(`utf8`), s3.includes(`version 2`)) return zn(a3);
    let [c3, l3] = Vn(s3, `\0`, `\\x00`);
    if (l3.split(` `).map((e2) => n2.add(e2)), c3 !== `0000000000000000000000000000000000000000 capabilities^{}`) {
      let [e2, t3] = Vn(c3, ` `, ` `);
      for (r2.set(t3, e2); ; ) {
        let e3 = await a3();
        if (e3 === true) break;
        if (e3 !== null) {
          let [t4, n3] = Vn(e3.toString(`utf8`), ` `, ` `);
          r2.set(n3, t4);
        }
      }
    }
    for (let e2 of n2) if (e2.startsWith(`symref=`)) {
      let t3 = e2.match(/symref=([^:]+):(.*)/);
      t3.length === 3 && i3.set(t3[1], t3[2]);
    }
    return { protocolVersion: 1, capabilities: n2, refs: r2, symrefs: i3 };
  }
  function Vn(e, t2, n2) {
    let r2 = e.trim().split(t2);
    if (r2.length !== 2) throw new At2(`Two strings separated by '${n2}'`, e.toString(`utf8`));
    return r2;
  }
  let Hn = (e, t2) => e.endsWith(`?`) ? `${e}${t2}` : `${e}/${t2.replace(/^https?:\/\//, ``)}`, Un = (e, t2) => {
    (t2.username || t2.password) && (e.Authorization = Nn(t2)), t2.headers && Object.assign(e, t2.headers);
  }, Wn = async (e) => {
    try {
      let t2 = Buffer.from(await Fn(e.body)), n2 = t2.toString(`utf8`);
      return { preview: n2.length < 256 ? n2 : n2.slice(0, 256) + `...`, response: n2, data: t2 };
    } catch {
      return {};
    }
  };
  var Gn = class {
    static async capabilities() {
      return [`discover`, `connect`];
    }
    static async discover({ http: e, onProgress: t2, onAuth: n2, onAuthSuccess: r2, onAuthFailure: i3, corsProxy: a3, service: o3, url: s3, headers: c3, protocolVersion: l3 }) {
      let { url: u2, auth: d3 } = In(s3), f4 = a3 ? Hn(a3, u2) : u2;
      (d3.username || d3.password) && (c3.Authorization = Nn(d3)), l3 === 2 && (c3[`Git-Protocol`] = `version=2`);
      let p3, m4, h4 = false;
      do
        if (p3 = await e.request({ onProgress: t2, method: `GET`, url: `${f4}/info/refs?service=${o3}`, headers: c3 }), m4 = false, p3.statusCode === 401 || p3.statusCode === 203) {
          let e2 = h4 ? i3 : n2;
          if (e2) {
            if (d3 = await e2(u2, { ...d3, headers: { ...c3 } }), d3 && d3.cancel) throw new It2();
            d3 && (Un(c3, d3), h4 = true, m4 = true);
          }
        } else p3.statusCode === 200 && h4 && r2 && await r2(u2, d3);
      while (m4);
      if (p3.statusCode !== 200) {
        let { response: e2 } = await Wn(p3);
        throw new xt2(p3.statusCode, p3.statusMessage, e2);
      }
      if (p3.headers[`content-type`] === `application/x-${o3}-advertisement`) {
        let e2 = await Bn(p3.body, { service: o3 });
        return e2.auth = d3, e2;
      } else {
        let { preview: e2, response: t3, data: n3 } = await Wn(p3);
        try {
          let e3 = await Bn([n3], { service: o3 });
          return e3.auth = d3, e3;
        } catch {
          throw new Nt2(e2, t3);
        }
      }
    }
    static async connect({ http: e, onProgress: t2, corsProxy: n2, service: r2, url: i3, auth: a3, body: o3, headers: s3 }) {
      let c3 = In(i3);
      c3 && (i3 = c3.url), n2 && (i3 = Hn(n2, i3)), s3[`content-type`] = `application/x-${r2}-request`, s3.accept = `application/x-${r2}-result`, Un(s3, a3);
      let l3 = await e.request({ onProgress: t2, method: `POST`, url: `${i3}/${r2}`, body: o3, headers: s3 });
      if (l3.statusCode !== 200) {
        let { response: e2 } = Wn(l3);
        throw new xt2(l3.statusCode, l3.statusMessage, e2);
      }
      return l3;
    }
  }, Kn = class {
    static getRemoteHelperFor({ url: e }) {
      let t2 = /* @__PURE__ */ new Map();
      t2.set(`http`, Gn), t2.set(`https`, Gn);
      let n2 = qn({ url: e });
      if (!n2) throw new Ft2(e);
      if (t2.has(n2.transport)) return t2.get(n2.transport);
      throw new Pt2(e, n2.transport, n2.transport === `ssh` ? Mn(e) : void 0);
    }
  };
  function qn({ url: e }) {
    if (e.startsWith(`git@`)) return { transport: `ssh`, address: e };
    let t2 = e.match(/(\w+)(:\/\/|::)(.*)/);
    if (t2 !== null) {
      if (t2[2] === `://`) return { transport: t2[1], address: t2[0] };
      if (t2[2] === `::`) return { transport: t2[1], address: t2[3] };
    }
  }
  let Jn = null;
  var Yn = class {
    static async read({ fs: e, gitdir: t2 }) {
      Jn === null && (Jn = new r());
      let n2 = ce2(t2, `shallow`), i3 = /* @__PURE__ */ new Set();
      return await Jn.acquire(n2, async function() {
        let t3 = await e.read(n2, { encoding: `utf8` });
        if (t3 === null || t3.trim() === ``) return i3;
        t3.trim().split(`
`).map((e2) => i3.add(e2));
      }), i3;
    }
    static async write({ fs: e, gitdir: t2, oids: n2 }) {
      Jn === null && (Jn = new r());
      let i3 = ce2(t2, `shallow`);
      if (n2.size > 0) {
        let t3 = [...n2].join(`
`) + `
`;
        await Jn.acquire(i3, async function() {
          await e.write(i3, t3, { encoding: `utf8` });
        });
      } else await Jn.acquire(i3, async function() {
        await e.rm(i3);
      });
    }
  };
  async function Xn({ fs: e, gitdir: t2, oid: n2 }) {
    let r2 = `objects/${n2.slice(0, 2)}/${n2.slice(2)}`;
    return e.exists(`${t2}/${r2}`);
  }
  async function Zn({ fs: e, cache: t2, gitdir: n2, oid: r2, getExternalRefDelta: i3 }) {
    let a3 = await e.readdir(ce2(n2, `objects/pack`));
    a3 = a3.filter((e2) => e2.endsWith(`.idx`));
    for (let o3 of a3) {
      let a4 = await st2({ fs: e, cache: t2, filename: `${n2}/objects/pack/${o3}`, getExternalRefDelta: i3 });
      if (a4.error) throw new p2(a4.error);
      if (a4.offsets.has(r2)) return true;
    }
    return false;
  }
  async function Qn({ fs: e, cache: t2, gitdir: n2, oid: r2, format: i3 = `content` }) {
    let a3 = (r3) => dt2({ fs: e, cache: t2, gitdir: n2, oid: r3 }), o3 = await Xn({ fs: e, gitdir: n2, oid: r2 });
    return o3 ||= await Zn({ fs: e, cache: t2, gitdir: n2, oid: r2, getExternalRefDelta: a3 }), o3;
  }
  function $n(e) {
    return e.slice(0, 12).toString(`hex`) === `5041434b0000000200000000`;
  }
  function er(e, t2) {
    let n2 = e.map((e2) => e2.split(`=`, 1)[0]);
    return t2.filter((e2) => {
      let t3 = e2.split(`=`, 1)[0];
      return n2.includes(t3);
    });
  }
  let tr = { name: `isomorphic-git`, version: `1.38.1`, agent: `git/isomorphic-git@1.38.1` };
  var nr = class {
    constructor() {
      this._queue = [];
    }
    write(e) {
      if (this._ended) throw Error(`You cannot write to a FIFO that has already been ended!`);
      if (this._waiting) {
        let t2 = this._waiting;
        this._waiting = null, t2({ value: e });
      } else this._queue.push(e);
    }
    end() {
      if (this._ended = true, this._waiting) {
        let e = this._waiting;
        this._waiting = null, e({ done: true });
      }
    }
    destroy(e) {
      this.error = e, this.end();
    }
    async next() {
      if (this._queue.length > 0) return { value: this._queue.shift() };
      if (this._ended) return { done: true };
      if (this._waiting) throw Error(`You cannot call read until the previous call to read has returned!`);
      return new Promise((e) => {
        this._waiting = e;
      });
    }
  };
  function rr(e) {
    let t2 = e.indexOf(`\r`), n2 = e.indexOf(`
`);
    return t2 === -1 && n2 === -1 ? -1 : t2 === -1 ? n2 + 1 : n2 === -1 ? t2 + 1 : n2 === t2 + 1 ? n2 + 1 : Math.min(t2, n2) + 1;
  }
  function ir(e) {
    let t2 = new nr(), n2 = ``;
    return (async () => {
      await Pn(e, (e2) => {
        for (e2 = e2.toString(`utf8`), n2 += e2; ; ) {
          let e3 = rr(n2);
          if (e3 === -1) break;
          t2.write(n2.slice(0, e3)), n2 = n2.slice(e3);
        }
      }), n2.length > 0 && t2.write(n2), t2.end();
    })(), t2;
  }
  var ar = class {
    static demux(e) {
      let t2 = Rn.streamReader(e), n2 = new nr(), r2 = new nr(), i3 = new nr(), a3 = async function() {
        let o3 = await t2();
        if (o3 === null) return a3();
        if (o3 === true) {
          n2.end(), i3.end(), e.error ? r2.destroy(e.error) : r2.end();
          return;
        }
        switch (o3[0]) {
          case 1:
            r2.write(o3.slice(1));
            break;
          case 2:
            i3.write(o3.slice(1));
            break;
          case 3: {
            let e2 = o3.slice(1);
            i3.write(e2), n2.end(), i3.end(), r2.destroy(Error(e2.toString(`utf8`)));
            return;
          }
          default:
            n2.write(o3);
        }
        a3();
      };
      return a3(), { packetlines: n2, packfile: r2, progress: i3 };
    }
  };
  async function or(e) {
    let { packetlines: t2, packfile: n2, progress: r2 } = ar.demux(e), i3 = [], a3 = [], o3 = [], s3 = false, c3 = false;
    return new Promise((l3, u2) => {
      Pn(t2, (t3) => {
        let d3 = t3.toString(`utf8`).trim();
        if (d3.startsWith(`shallow`)) {
          let e2 = d3.slice(-41).trim();
          e2.length !== 40 && u2(new ie2(e2)), i3.push(e2);
        } else if (d3.startsWith(`unshallow`)) {
          let e2 = d3.slice(-41).trim();
          e2.length !== 40 && u2(new ie2(e2)), a3.push(e2);
        } else if (d3.startsWith(`ACK`)) {
          let [, e2, t4] = d3.split(` `);
          o3.push({ oid: e2, status: t4 }), t4 || (c3 = true);
        } else d3.startsWith(`NAK`) ? (s3 = true, c3 = true) : (c3 = true, s3 = true);
        c3 && (e.error ? u2(e.error) : l3({ shallows: i3, unshallows: a3, acks: o3, nak: s3, packfile: n2, progress: r2 }));
      }).finally(() => {
        c3 || (e.error ? u2(e.error) : l3({ shallows: i3, unshallows: a3, acks: o3, nak: s3, packfile: n2, progress: r2 }));
      });
    });
  }
  function sr({ capabilities: e = [], wants: t2 = [], haves: n2 = [], shallows: r2 = [], depth: i3 = null, since: a3 = null, exclude: o3 = [] }) {
    let s3 = [];
    t2 = [...new Set(t2)];
    let c3 = ` ${e.join(` `)}`;
    for (let e2 of t2) s3.push(Rn.encode(`want ${e2}${c3}
`)), c3 = ``;
    for (let e2 of r2) s3.push(Rn.encode(`shallow ${e2}
`));
    i3 !== null && s3.push(Rn.encode(`deepen ${i3}
`)), a3 !== null && s3.push(Rn.encode(`deepen-since ${Math.floor(a3.valueOf() / 1e3)}
`));
    for (let e2 of o3) s3.push(Rn.encode(`deepen-not ${e2}
`));
    s3.push(Rn.flush());
    for (let e2 of n2) s3.push(Rn.encode(`have ${e2}
`));
    return s3.push(Rn.encode(`done
`)), s3;
  }
  async function cr({ fs: e, cache: t2, http: n2, onProgress: r2, onMessage: i3, onAuth: a3, onAuthSuccess: o3, onAuthFailure: s3, gitdir: c3, ref: l3, remoteRef: u2, remote: d3, url: f4, corsProxy: p3, depth: m4 = null, since: h4 = null, exclude: g3 = [], relative: _3 = false, tags: v3 = false, singleBranch: y3 = false, headers: b3 = {}, prune: x3 = false, pruneTags: S3 = false }) {
    let C3 = l3 || await jn({ fs: e, gitdir: c3, test: true }), w3 = await Se2.get({ fs: e, gitdir: c3 }), T3 = d3 || C3 && await w3.get(`branch.${C3}.remote`) || `origin`, E3 = f4 || await w3.get(`remote.${T3}.url`);
    if (E3 === void 0) throw new Ot2(`remote OR url`);
    let D3 = u2 || C3 && await w3.get(`branch.${C3}.merge`) || l3 || `HEAD`;
    p3 === void 0 && (p3 = await w3.get(`http.corsProxy`));
    let O3 = Kn.getRemoteHelperFor({ url: E3 }), k4 = await O3.discover({ http: n2, onAuth: a3, onAuthSuccess: o3, onAuthFailure: s3, corsProxy: p3, service: `git-upload-pack`, url: E3, headers: b3, protocolVersion: 1 }), A3 = k4.auth, j3 = k4.refs;
    if (j3.size === 0) return { defaultBranch: null, fetchHead: null, fetchHeadDescription: null };
    if (m4 !== null && !k4.capabilities.has(`shallow`)) throw new Mt2(`shallow`, `depth`);
    if (h4 !== null && !k4.capabilities.has(`deepen-since`)) throw new Mt2(`deepen-since`, `since`);
    if (g3.length > 0 && !k4.capabilities.has(`deepen-not`)) throw new Mt2(`deepen-not`, `exclude`);
    if (_3 === true && !k4.capabilities.has(`deepen-relative`)) throw new Mt2(`deepen-relative`, `relative`);
    let { oid: M3, fullref: N3 } = De2.resolveAgainstMap({ ref: D3, map: j3 });
    for (let e2 of j3.keys()) e2 === N3 || e2 === `HEAD` || e2.startsWith(`refs/heads/`) || v3 && e2.startsWith(`refs/tags/`) || j3.delete(e2);
    let P3 = er([...k4.capabilities], [`multi_ack_detailed`, `no-done`, `side-band-64k`, `ofs-delta`, `agent=${tr.agent}`]);
    _3 && P3.push(`deepen-relative`);
    let F3 = y3 ? [M3] : j3.values(), ee3 = y3 ? [C3] : await De2.listRefs({ fs: e, gitdir: c3, filepath: `refs` }), I3 = [];
    for (let n3 of ee3) try {
      n3 = await De2.expand({ fs: e, gitdir: c3, ref: n3 });
      let r3 = await De2.resolve({ fs: e, gitdir: c3, ref: n3 });
      await Qn({ fs: e, cache: t2, gitdir: c3, oid: r3 }) && I3.push(r3);
    } catch {
    }
    I3 = [...new Set(I3)];
    let L3 = await Yn.read({ fs: e, gitdir: c3 }), R3 = k4.capabilities.has(`shallow`) ? [...L3] : [], te3 = sr({ capabilities: P3, wants: F3, haves: I3, shallows: R3, depth: m4, since: h4, exclude: g3 }), ne3 = Buffer.from(await Fn(te3)), z3 = await O3.connect({ http: n2, onProgress: r2, corsProxy: p3, service: `git-upload-pack`, url: E3, auth: A3, body: [ne3], headers: b3 }), B3 = await or(z3.body);
    z3.headers && (B3.headers = z3.headers);
    for (let n3 of B3.shallows) if (!L3.has(n3)) try {
      let { object: r3 } = await dt2({ fs: e, cache: t2, gitdir: c3, oid: n3 }), i4 = new Xt(r3), a4 = await Promise.all(i4.headers().parent.map((n4) => Qn({ fs: e, cache: t2, gitdir: c3, oid: n4 })));
      a4.length === 0 || a4.every((e2) => e2) || L3.add(n3);
    } catch {
      L3.add(n3);
    }
    for (let e2 of B3.unshallows) L3.delete(e2);
    if (await Yn.write({ fs: e, gitdir: c3, oids: L3 }), y3) {
      let t3 = /* @__PURE__ */ new Map([[N3, M3]]), n3 = /* @__PURE__ */ new Map(), r3 = 10, i4 = N3;
      for (; r3--; ) {
        let e2 = k4.symrefs.get(i4);
        if (e2 === void 0) break;
        n3.set(i4, e2), i4 = e2;
      }
      let a4 = j3.get(i4);
      a4 && t3.set(i4, a4);
      let { pruned: o4 } = await De2.updateRemoteRefs({ fs: e, gitdir: c3, remote: T3, refs: t3, symrefs: n3, tags: v3, prune: x3 });
      x3 && (B3.pruned = o4);
    } else {
      let { pruned: t3 } = await De2.updateRemoteRefs({ fs: e, gitdir: c3, remote: T3, refs: j3, symrefs: k4.symrefs, tags: v3, prune: x3, pruneTags: S3 });
      x3 && (B3.pruned = t3);
    }
    if (B3.HEAD = k4.symrefs.get(`HEAD`), B3.HEAD === void 0) {
      let { oid: e2 } = De2.resolveAgainstMap({ ref: `HEAD`, map: j3 });
      for (let [t3, n3] of j3.entries()) if (t3 !== `HEAD` && n3 === e2) {
        B3.HEAD = t3;
        break;
      }
    }
    B3.FETCH_HEAD = { oid: M3, description: `${N3.startsWith(`refs/tags`) ? `tag` : `branch`} '${An(N3)}' of ${E3}` }, (r2 || i3) && Pn(ir(B3.progress), async (e2) => {
      if (i3 && await i3(e2), r2) {
        let t3 = e2.match(/([^:]*).*\((\d+?)\/(\d+?)\)/);
        t3 && await r2({ phase: t3[1].trim(), loaded: parseInt(t3[2], 10), total: parseInt(t3[3], 10) });
      }
    });
    let V3 = Buffer.from(await Fn(B3.packfile));
    if (z3.body.error) throw z3.body.error;
    let H3 = V3.slice(-20).toString(`hex`), re3 = { defaultBranch: B3.HEAD, fetchHead: B3.FETCH_HEAD.oid, fetchHeadDescription: B3.FETCH_HEAD.description };
    if (B3.headers && (re3.headers = B3.headers), x3 && (re3.pruned = B3.pruned), H3 !== `` && !$n(V3)) {
      re3.packfile = `objects/pack/pack-${H3}.pack`;
      let n3 = ce2(c3, re3.packfile);
      await e.write(n3, V3);
      let i4 = await it2.fromPack({ pack: V3, getExternalRefDelta: (n4) => dt2({ fs: e, cache: t2, gitdir: c3, oid: n4 }), onProgress: r2 });
      await e.write(n3.replace(/\.pack$/, `.idx`), await i4.toBuffer());
    }
    return re3;
  }
  async function lr({ fs: e, bare: t2 = false, dir: n2, gitdir: r2 = t2 ? n2 : ce2(n2, `.git`), defaultBranch: i3 = `master` }) {
    if (await e.exists(r2 + `/config`)) return;
    let a3 = [`hooks`, `info`, `objects/info`, `objects/pack`, `refs/heads`, `refs/tags`];
    a3 = a3.map((e2) => r2 + `/` + e2);
    for (let t3 of a3) await e.mkdir(t3);
    await e.write(r2 + `/config`, `[core]
	repositoryformatversion = 0
	filemode = false
	bare = ${t2}
` + (t2 ? `` : `	logallrefupdates = true
`) + `	symlinks = false
	ignorecase = true
`), await e.write(r2 + `/HEAD`, `ref: refs/heads/${i3}
`);
  }
  async function ur({ fs: e, cache: t2, http: n2, onProgress: r2, onMessage: i3, onAuth: a3, onAuthSuccess: o3, onAuthFailure: s3, onPostCheckout: c3, dir: l3, gitdir: u2, url: d3, corsProxy: f4, ref: p3, remote: m4, depth: h4, since: g3, exclude: _3, relative: v3, singleBranch: y3, noCheckout: b3, noTags: x3, headers: S3, nonBlocking: C3, batchSize: w3 = 100 }) {
    try {
      if (await lr({ fs: e, gitdir: u2 }), await xn({ fs: e, gitdir: u2, remote: m4, url: d3, force: false }), f4) {
        let t3 = await Se2.get({ fs: e, gitdir: u2 });
        await t3.set(`http.corsProxy`, f4), await Se2.save({ fs: e, gitdir: u2, config: t3 });
      }
      let { defaultBranch: T3, fetchHead: E3 } = await cr({ fs: e, cache: t2, http: n2, onProgress: r2, onMessage: i3, onAuth: a3, onAuthSuccess: o3, onAuthFailure: s3, gitdir: u2, ref: p3, remote: m4, corsProxy: f4, depth: h4, since: g3, exclude: _3, relative: v3, singleBranch: y3, headers: S3, tags: !x3 });
      if (E3 === null) return;
      p3 ||= T3, p3 = p3.replace(`refs/heads/`, ``), await Cn({ fs: e, cache: t2, onProgress: r2, onPostCheckout: c3, dir: l3, gitdir: u2, ref: p3, remote: m4, noCheckout: b3, nonBlocking: C3, batchSize: w3 });
    } catch (t3) {
      throw await e.rmdir(u2, { recursive: true, maxRetries: 10 }).catch(() => void 0), t3;
    }
  }
  async function dr({ fs: e, http: t2, onProgress: n2, onMessage: r2, onAuth: i3, onAuthSuccess: a3, onAuthFailure: o3, onPostCheckout: s3, dir: c3, gitdir: l3 = ce2(c3, `.git`), url: u2, corsProxy: d3 = void 0, ref: f4 = void 0, remote: p3 = `origin`, depth: m4 = void 0, since: h4 = void 0, exclude: g3 = [], relative: _3 = false, singleBranch: v3 = false, noCheckout: y3 = false, noTags: b3 = false, headers: x3 = {}, cache: S3 = {}, nonBlocking: C3 = false, batchSize: w3 = 100 }) {
    try {
      gn(`fs`, e), gn(`http`, t2), gn(`gitdir`, l3), y3 || gn(`dir`, c3), gn(`url`, u2);
      let T3 = new hn(e);
      return await ur({ fs: T3, cache: S3, http: t2, onProgress: n2, onMessage: r2, onAuth: i3, onAuthSuccess: a3, onAuthFailure: o3, onPostCheckout: s3, dir: c3, gitdir: await vn({ fsp: T3, dotgit: l3 }), url: u2, corsProxy: d3, ref: f4, remote: p3, depth: m4, since: h4, exclude: g3, relative: _3, singleBranch: v3, noCheckout: y3, noTags: b3, headers: x3, nonBlocking: C3, batchSize: w3 });
    } catch (e2) {
      throw e2.caller = `git.clone`, e2;
    }
  }
  function fr(e, t2, n2, r2) {
    let i3 = [];
    for (let [a3, o3] of e.refs) {
      if (t2 && !a3.startsWith(t2)) continue;
      if (a3.endsWith(`^{}`)) {
        if (r2) {
          let e2 = a3.replace(`^{}`, ``), t3 = i3[i3.length - 1], n3 = t3.ref === e2 ? t3 : i3.find((t4) => t4.ref === e2);
          if (n3 === void 0) throw Error(`I did not expect this to happen`);
          n3.peeled = o3;
        }
        continue;
      }
      let s3 = { ref: a3, oid: o3 };
      n2 && e.symrefs.has(a3) && (s3.target = e.symrefs.get(a3)), i3.push(s3);
    }
    return i3;
  }
  async function pr({ http: e, onAuth: t2, onAuthSuccess: n2, onAuthFailure: r2, corsProxy: i3, url: a3, headers: o3 = {}, forPush: s3 = false, protocolVersion: c3 = 2 }) {
    try {
      gn(`http`, e), gn(`url`, a3);
      let l3 = await Kn.getRemoteHelperFor({ url: a3 }).discover({ http: e, onAuth: t2, onAuthSuccess: n2, onAuthFailure: r2, corsProxy: i3, service: s3 ? `git-receive-pack` : `git-upload-pack`, url: a3, headers: o3, protocolVersion: c3 });
      if (l3.protocolVersion === 2) return { protocolVersion: l3.protocolVersion, capabilities: l3.capabilities2 };
      let u2 = {};
      for (let e2 of l3.capabilities) {
        let [t3, n3] = e2.split(`=`);
        n3 ? u2[t3] = n3 : u2[t3] = true;
      }
      return { protocolVersion: 1, capabilities: u2, refs: fr(l3, void 0, true, true) };
    } catch (e2) {
      throw e2.caller = `git.getRemoteInfo2`, e2;
    }
  }
  async function mr(e) {
    let t2 = Rn.streamReader(e), n2 = [], r2;
    for (; r2 = await t2(), r2 !== true; ) {
      if (r2 === null) continue;
      r2 = r2.toString(`utf8`).replace(/\n$/, ``);
      let [e2, t3, ...i3] = r2.split(` `), a3 = { ref: t3, oid: e2 };
      for (let e3 of i3) {
        let [t4, n3] = e3.split(`:`);
        t4 === `symref-target` ? a3.target = n3 : t4 === `peeled` && (a3.peeled = n3);
      }
      n2.push(a3);
    }
    return n2;
  }
  async function hr({ prefix: e, symrefs: t2, peelTags: n2 }) {
    let r2 = [];
    return r2.push(Rn.encode(`command=ls-refs
`)), r2.push(Rn.encode(`agent=${tr.agent}
`)), (n2 || t2 || e) && r2.push(Rn.delim()), n2 && r2.push(Rn.encode(`peel`)), t2 && r2.push(Rn.encode(`symrefs`)), e && r2.push(Rn.encode(`ref-prefix ${e}`)), r2.push(Rn.flush()), r2;
  }
  async function gr({ http: e, onAuth: t2, onAuthSuccess: n2, onAuthFailure: r2, corsProxy: i3, url: a3, headers: o3 = {}, forPush: s3 = false, protocolVersion: c3 = 2, prefix: l3, symrefs: u2, peelTags: d3 }) {
    try {
      gn(`http`, e), gn(`url`, a3);
      let f4 = await Gn.discover({ http: e, onAuth: t2, onAuthSuccess: n2, onAuthFailure: r2, corsProxy: i3, service: s3 ? `git-receive-pack` : `git-upload-pack`, url: a3, headers: o3, protocolVersion: c3 });
      if (f4.protocolVersion === 1) return fr(f4, l3, u2, d3);
      let p3 = await hr({ prefix: l3, symrefs: u2, peelTags: d3 });
      return mr((await Gn.connect({ http: e, auth: f4.auth, headers: o3, corsProxy: i3, service: s3 ? `git-receive-pack` : `git-upload-pack`, url: a3, body: p3 })).body);
    } catch (e2) {
      throw e2.caller = `git.listServerRefs`, e2;
    }
  }
  t.checkout = On, t.clone = dr, t.getRemoteInfo2 = pr, t.listServerRefs = gr;
}));
var Fe = f(((e, t) => {
  t.exports = function(e2, t2) {
    var n = [];
    e2.on(`data`, function(e3) {
      n.push(e3);
    }), e2.once(`end`, function() {
      t2 && t2(null, Buffer.concat(n)), t2 = null;
    }), e2.once(`error`, function(e3) {
      t2 && t2(e3), t2 = null;
    });
  };
}));
var Ie = f(((e, t) => {
  let n = [`aborted`, `complete`, `headers`, `httpVersion`, `httpVersionMinor`, `httpVersionMajor`, `method`, `rawHeaders`, `rawTrailers`, `setTimeout`, `socket`, `statusCode`, `statusMessage`, `trailers`, `url`];
  t.exports = (e2, t2) => {
    if (t2._readableState.autoDestroy) throw Error("The second stream must have the `autoDestroy` option set to `false`");
    let r = new Set(Object.keys(e2).concat(n)), i2 = {};
    for (let n2 of r) n2 in t2 || (i2[n2] = { get() {
      let t3 = e2[n2];
      return typeof t3 == `function` ? t3.bind(e2) : t3;
    }, set(t3) {
      e2[n2] = t3;
    }, enumerable: true, configurable: false });
    return Object.defineProperties(t2, i2), e2.once(`aborted`, () => {
      t2.destroy(), t2.emit(`aborted`);
    }), e2.once(`close`, () => {
      e2.complete && t2.readable ? t2.once(`end`, () => {
        t2.emit(`close`);
      }) : t2.emit(`close`);
    }), t2;
  };
}));
var Le = f(((t, n) => {
  let { Transform: r, PassThrough: i2 } = h(`stream`), a2 = h(`zlib`), o2 = Ie();
  n.exports = (e) => {
    let t2 = (e.headers[`content-encoding`] || ``).toLowerCase();
    if (![`gzip`, `deflate`, `br`].includes(t2)) return e;
    let n2 = t2 === `br`;
    if (n2 && typeof a2.createBrotliDecompress != `function`) return e.destroy(Error(`Brotli is not supported on Node.js < 12`)), e;
    let s2 = true, c2 = new r({ transform(e2, t3, n3) {
      s2 = false, n3(null, e2);
    }, flush(e2) {
      e2();
    } }), l2 = new i2({ autoDestroy: false, destroy(t3, n3) {
      e.destroy(), n3(t3);
    } }), u2 = n2 ? a2.createBrotliDecompress() : a2.createUnzip();
    return u2.once(`error`, (t3) => {
      if (s2 && !e.readable) {
        l2.end();
        return;
      }
      l2.destroy(t3);
    }), o2(e, l2), e.pipe(c2).pipe(u2).pipe(l2), l2;
  };
}));
var Re = f(((e, t) => {
  t.exports = n;
  function n(e2, t2) {
    if (e2 && t2) return n(e2)(t2);
    if (typeof e2 != `function`) throw TypeError(`need wrapper function`);
    return Object.keys(e2).forEach(function(t3) {
      r[t3] = e2[t3];
    }), r;
    function r() {
      for (var t3 = Array(arguments.length), n2 = 0; n2 < t3.length; n2++) t3[n2] = arguments[n2];
      var r2 = e2.apply(this, t3), i2 = t3[t3.length - 1];
      return typeof r2 == `function` && r2 !== i2 && Object.keys(i2).forEach(function(e3) {
        r2[e3] = i2[e3];
      }), r2;
    }
  }
}));
var ze = f(((e, t) => {
  var n = Re();
  t.exports = n(r), t.exports.strict = n(i2), r.proto = r(function() {
    Object.defineProperty(Function.prototype, `once`, { value: function() {
      return r(this);
    }, configurable: true }), Object.defineProperty(Function.prototype, `onceStrict`, { value: function() {
      return i2(this);
    }, configurable: true });
  });
  function r(e2) {
    var t2 = function() {
      return t2.called ? t2.value : (t2.called = true, t2.value = e2.apply(this, arguments));
    };
    return t2.called = false, t2;
  }
  function i2(e2) {
    var t2 = function() {
      if (t2.called) throw Error(t2.onceError);
      return t2.called = true, t2.value = e2.apply(this, arguments);
    };
    return t2.onceError = (e2.name || "Function wrapped with `once`") + ` shouldn't be called more than once`, t2.called = false, t2;
  }
}));
var Be = f(((t, n) => {
  n.exports = d2;
  let r = Fe(), i2 = Le(), a2 = h(`http`), o2 = h(`https`), s2 = ze(), c2 = h(`querystring`), l2 = h(`url`), u2 = (e) => typeof e == `object` && !!e && typeof e.pipe == `function`;
  function d2(e, t2) {
    if (e = Object.assign({ maxRedirects: 10 }, typeof e == `string` ? { url: e } : e), t2 = s2(t2), e.url) {
      let { hostname: t3, port: n3, protocol: r3, auth: i3, path: a3 } = l2.parse(e.url);
      delete e.url, !t3 && !n3 && !r3 && !i3 ? e.path = a3 : Object.assign(e, { hostname: t3, port: n3, protocol: r3, auth: i3, path: a3 });
    }
    let n2 = { "accept-encoding": `gzip, deflate` };
    e.headers && Object.keys(e.headers).forEach((t3) => n2[t3.toLowerCase()] = e.headers[t3]), e.headers = n2;
    let r2;
    e.body ? r2 = e.json && !u2(e.body) ? JSON.stringify(e.body) : e.body : e.form && (r2 = typeof e.form == `string` ? e.form : c2.stringify(e.form), e.headers[`content-type`] = `application/x-www-form-urlencoded`), r2 && (e.method ||= `POST`, u2(r2) || (e.headers[`content-length`] = Buffer.byteLength(r2)), e.json && !e.form && (e.headers[`content-type`] = `application/json`)), delete e.body, delete e.form, e.json && (e.headers.accept = `application/json`), e.method &&= e.method.toUpperCase();
    let f3 = e.hostname, p2 = (e.protocol === `https:` ? o2 : a2).request(e, (n3) => {
      if (e.followRedirects !== false && n3.statusCode >= 300 && n3.statusCode < 400 && n3.headers.location) {
        e.url = n3.headers.location, delete e.headers.host, n3.resume();
        let r4 = l2.parse(e.url).hostname;
        return r4 !== null && r4 !== f3 && (delete e.headers.cookie, delete e.headers.authorization), e.method === `POST` && [301, 302].includes(n3.statusCode) && (e.method = `GET`, delete e.headers[`content-length`], delete e.headers[`content-type`]), e.maxRedirects-- === 0 ? t2(Error(`too many redirects`)) : d2(e, t2);
      }
      let r3 = typeof i2 == `function` && e.method !== `HEAD`;
      t2(null, r3 ? i2(n3) : n3);
    });
    return p2.on(`timeout`, () => {
      p2.abort(), t2(Error(`Request timed out`));
    }), p2.on(`error`, t2), u2(r2) ? r2.on(`error`, t2).pipe(p2) : p2.end(r2), p2;
  }
  d2.concat = (e, t2) => d2(e, (n2, i3) => {
    if (n2) return t2(n2);
    r(i3, (n3, r2) => {
      if (n3) return t2(n3);
      if (e.json) try {
        r2 = JSON.parse(r2.toString());
      } catch (e2) {
        return t2(e2, i3, r2);
      }
      t2(null, i3, r2);
    });
  }), [`get`, `post`, `put`, `patch`, `head`, `delete`].forEach((e) => {
    d2[e] = (t2, n2) => (typeof t2 == `string` && (t2 = { url: t2 }), d2(Object.assign({ method: e.toUpperCase() }, t2), n2));
  });
}));
var Ve = f(((e, t) => {
  t.exports = { AggregateError: class extends Error {
    constructor(e2) {
      if (!Array.isArray(e2)) throw TypeError(`Expected input to be an Array, got ${typeof e2}`);
      let t2 = ``;
      for (let n = 0; n < e2.length; n++) t2 += `    ${e2[n].stack}
`;
      super(t2), this.name = `AggregateError`, this.errors = e2;
    }
  }, ArrayIsArray(e2) {
    return Array.isArray(e2);
  }, ArrayPrototypeIncludes(e2, t2) {
    return e2.includes(t2);
  }, ArrayPrototypeIndexOf(e2, t2) {
    return e2.indexOf(t2);
  }, ArrayPrototypeJoin(e2, t2) {
    return e2.join(t2);
  }, ArrayPrototypeMap(e2, t2) {
    return e2.map(t2);
  }, ArrayPrototypePop(e2, t2) {
    return e2.pop(t2);
  }, ArrayPrototypePush(e2, t2) {
    return e2.push(t2);
  }, ArrayPrototypeSlice(e2, t2, n) {
    return e2.slice(t2, n);
  }, Error, FunctionPrototypeCall(e2, t2, ...n) {
    return e2.call(t2, ...n);
  }, FunctionPrototypeSymbolHasInstance(e2, t2) {
    return Function.prototype[Symbol.hasInstance].call(e2, t2);
  }, MathFloor: Math.floor, Number, NumberIsInteger: Number.isInteger, NumberIsNaN: Number.isNaN, NumberMAX_SAFE_INTEGER: 2 ** 53 - 1, NumberMIN_SAFE_INTEGER: -(2 ** 53 - 1), NumberParseInt: Number.parseInt, ObjectDefineProperties(e2, t2) {
    return Object.defineProperties(e2, t2);
  }, ObjectDefineProperty(e2, t2, n) {
    return Object.defineProperty(e2, t2, n);
  }, ObjectGetOwnPropertyDescriptor(e2, t2) {
    return Object.getOwnPropertyDescriptor(e2, t2);
  }, ObjectKeys(e2) {
    return Object.keys(e2);
  }, ObjectSetPrototypeOf(e2, t2) {
    return Object.setPrototypeOf(e2, t2);
  }, Promise, PromisePrototypeCatch(e2, t2) {
    return e2.catch(t2);
  }, PromisePrototypeThen(e2, t2, n) {
    return e2.then(t2, n);
  }, PromiseReject(e2) {
    return Promise.reject(e2);
  }, PromiseResolve(e2) {
    return Promise.resolve(e2);
  }, ReflectApply: Reflect.apply, RegExpPrototypeTest(e2, t2) {
    return e2.test(t2);
  }, SafeSet: Set, String, StringPrototypeSlice(e2, t2, n) {
    return e2.slice(t2, n);
  }, StringPrototypeToLowerCase(e2) {
    return e2.toLowerCase();
  }, StringPrototypeToUpperCase(e2) {
    return e2.toUpperCase();
  }, StringPrototypeTrim(e2) {
    return e2.trim();
  }, Symbol, SymbolFor: Symbol.for, SymbolAsyncIterator: Symbol.asyncIterator, SymbolHasInstance: Symbol.hasInstance, SymbolIterator: Symbol.iterator, SymbolDispose: Symbol.dispose || /* @__PURE__ */ Symbol(`Symbol.dispose`), SymbolAsyncDispose: Symbol.asyncDispose || /* @__PURE__ */ Symbol(`Symbol.asyncDispose`), TypedArrayPrototypeSet(e2, t2, n) {
    return e2.set(t2, n);
  }, Boolean, Uint8Array };
}));
var He = f(((e, t) => {
  t.exports = { format(e2, ...t2) {
    return e2.replace(/%([sdifj])/g, function(...[e3, n]) {
      let r = t2.shift();
      return n === `f` ? r.toFixed(6) : n === `j` ? JSON.stringify(r) : n === `s` && typeof r == `object` ? `${r.constructor === Object ? `` : r.constructor.name} {}`.trim() : r.toString();
    });
  }, inspect(e2) {
    switch (typeof e2) {
      case `string`:
        if (e2.includes(`'`)) {
          if (!e2.includes(`"`)) return `"${e2}"`;
          if (!e2.includes("`") && !e2.includes("${")) return `\`${e2}\``;
        }
        return `'${e2}'`;
      case `number`:
        return isNaN(e2) ? `NaN` : Object.is(e2, -0) ? String(e2) : e2;
      case `bigint`:
        return `${String(e2)}n`;
      case `boolean`:
      case `undefined`:
        return String(e2);
      case `object`:
        return `{}`;
    }
  } };
}));
var Ue = f(((e, t) => {
  let { format: n, inspect: r } = He(), { AggregateError: i2 } = Ve(), a2 = globalThis.AggregateError || i2, o2 = /* @__PURE__ */ Symbol(`kIsNodeError`), s2 = [`string`, `function`, `number`, `object`, `Function`, `Object`, `boolean`, `bigint`, `symbol`], c2 = /^([A-Z][a-z0-9]*)+$/, l2 = {};
  function u2(e2, t2) {
    if (!e2) throw new l2.ERR_INTERNAL_ASSERTION(t2);
  }
  function d2(e2) {
    let t2 = ``, n2 = e2.length, r2 = +(e2[0] === `-`);
    for (; n2 >= r2 + 4; n2 -= 3) t2 = `_${e2.slice(n2 - 3, n2)}${t2}`;
    return `${e2.slice(0, n2)}${t2}`;
  }
  function f3(e2, t2, r2) {
    if (typeof t2 == `function`) return u2(t2.length <= r2.length, `Code: ${e2}; The provided arguments length (${r2.length}) does not match the required ones (${t2.length}).`), t2(...r2);
    let i3 = (t2.match(/%[dfijoOs]/g) || []).length;
    return u2(i3 === r2.length, `Code: ${e2}; The provided arguments length (${r2.length}) does not match the required ones (${i3}).`), r2.length === 0 ? t2 : n(t2, ...r2);
  }
  function p2(e2, t2, n2) {
    n2 ||= Error;
    class r2 extends n2 {
      constructor(...n3) {
        super(f3(e2, t2, n3));
      }
      toString() {
        return `${this.name} [${e2}]: ${this.message}`;
      }
    }
    Object.defineProperties(r2.prototype, { name: { value: n2.name, writable: true, enumerable: false, configurable: true }, toString: { value() {
      return `${this.name} [${e2}]: ${this.message}`;
    }, writable: true, enumerable: false, configurable: true } }), r2.prototype.code = e2, r2.prototype[o2] = true, l2[e2] = r2;
  }
  function m3(e2) {
    let t2 = `__node_internal_` + e2.name;
    return Object.defineProperty(e2, `name`, { value: t2 }), e2;
  }
  function h3(e2, t2) {
    if (e2 && t2 && e2 !== t2) {
      if (Array.isArray(t2.errors)) return t2.errors.push(e2), t2;
      let n2 = new a2([t2, e2], t2.message);
      return n2.code = t2.code, n2;
    }
    return e2 || t2;
  }
  var g2 = class extends Error {
    constructor(e2 = `The operation was aborted`, t2 = void 0) {
      if (t2 !== void 0 && typeof t2 != `object`) throw new l2.ERR_INVALID_ARG_TYPE(`options`, `Object`, t2);
      super(e2, t2), this.code = `ABORT_ERR`, this.name = `AbortError`;
    }
  };
  p2(`ERR_ASSERTION`, `%s`, Error), p2(`ERR_INVALID_ARG_TYPE`, (e2, t2, n2) => {
    u2(typeof e2 == `string`, `'name' must be a string`), Array.isArray(t2) || (t2 = [t2]);
    let i3 = `The `;
    e2.endsWith(` argument`) ? i3 += `${e2} ` : i3 += `"${e2}" ${e2.includes(`.`) ? `property` : `argument`} `, i3 += `must be `;
    let a3 = [], o3 = [], l3 = [];
    for (let e3 of t2) u2(typeof e3 == `string`, `All expected entries have to be of type string`), s2.includes(e3) ? a3.push(e3.toLowerCase()) : c2.test(e3) ? o3.push(e3) : (u2(e3 !== `object`, `The value "object" should be written as "Object"`), l3.push(e3));
    if (o3.length > 0) {
      let e3 = a3.indexOf(`object`);
      e3 !== -1 && (a3.splice(a3, e3, 1), o3.push(`Object`));
    }
    if (a3.length > 0) {
      switch (a3.length) {
        case 1:
          i3 += `of type ${a3[0]}`;
          break;
        case 2:
          i3 += `one of type ${a3[0]} or ${a3[1]}`;
          break;
        default: {
          let e3 = a3.pop();
          i3 += `one of type ${a3.join(`, `)}, or ${e3}`;
        }
      }
      (o3.length > 0 || l3.length > 0) && (i3 += ` or `);
    }
    if (o3.length > 0) {
      switch (o3.length) {
        case 1:
          i3 += `an instance of ${o3[0]}`;
          break;
        case 2:
          i3 += `an instance of ${o3[0]} or ${o3[1]}`;
          break;
        default: {
          let e3 = o3.pop();
          i3 += `an instance of ${o3.join(`, `)}, or ${e3}`;
        }
      }
      l3.length > 0 && (i3 += ` or `);
    }
    switch (l3.length) {
      case 0:
        break;
      case 1:
        l3[0].toLowerCase() !== l3[0] && (i3 += `an `), i3 += `${l3[0]}`;
        break;
      case 2:
        i3 += `one of ${l3[0]} or ${l3[1]}`;
        break;
      default: {
        let e3 = l3.pop();
        i3 += `one of ${l3.join(`, `)}, or ${e3}`;
      }
    }
    if (n2 == null) i3 += `. Received ${n2}`;
    else if (typeof n2 == `function` && n2.name) i3 += `. Received function ${n2.name}`;
    else if (typeof n2 == `object`) {
      var d3;
      if ((d3 = n2.constructor) != null && d3.name) i3 += `. Received an instance of ${n2.constructor.name}`;
      else {
        let e3 = r(n2, { depth: -1 });
        i3 += `. Received ${e3}`;
      }
    } else {
      let e3 = r(n2, { colors: false });
      e3.length > 25 && (e3 = `${e3.slice(0, 25)}...`), i3 += `. Received type ${typeof n2} (${e3})`;
    }
    return i3;
  }, TypeError), p2(`ERR_INVALID_ARG_VALUE`, (e2, t2, n2 = `is invalid`) => {
    let i3 = r(t2);
    return i3.length > 128 && (i3 = i3.slice(0, 128) + `...`), `The ${e2.includes(`.`) ? `property` : `argument`} '${e2}' ${n2}. Received ${i3}`;
  }, TypeError), p2(`ERR_INVALID_RETURN_VALUE`, (e2, t2, n2) => {
    var r2;
    return `Expected ${e2} to be returned from the "${t2}" function but got ${n2 != null && (r2 = n2.constructor) != null && r2.name ? `instance of ${n2.constructor.name}` : `type ${typeof n2}`}.`;
  }, TypeError), p2(`ERR_MISSING_ARGS`, (...e2) => {
    u2(e2.length > 0, `At least one arg needs to be specified`);
    let t2, n2 = e2.length;
    switch (e2 = (Array.isArray(e2) ? e2 : [e2]).map((e3) => `"${e3}"`).join(` or `), n2) {
      case 1:
        t2 += `The ${e2[0]} argument`;
        break;
      case 2:
        t2 += `The ${e2[0]} and ${e2[1]} arguments`;
        break;
      default:
        {
          let n3 = e2.pop();
          t2 += `The ${e2.join(`, `)}, and ${n3} arguments`;
        }
        break;
    }
    return `${t2} must be specified`;
  }, TypeError), p2(`ERR_OUT_OF_RANGE`, (e2, t2, n2) => {
    u2(t2, `Missing "range" argument`);
    let i3;
    if (Number.isInteger(n2) && Math.abs(n2) > 2 ** 32) i3 = d2(String(n2));
    else if (typeof n2 == `bigint`) {
      i3 = String(n2);
      let e3 = BigInt(2) ** BigInt(32);
      (n2 > e3 || n2 < -e3) && (i3 = d2(i3)), i3 += `n`;
    } else i3 = r(n2);
    return `The value of "${e2}" is out of range. It must be ${t2}. Received ${i3}`;
  }, RangeError), p2(`ERR_MULTIPLE_CALLBACK`, `Callback called multiple times`, Error), p2(`ERR_METHOD_NOT_IMPLEMENTED`, `The %s method is not implemented`, Error), p2(`ERR_STREAM_ALREADY_FINISHED`, `Cannot call %s after a stream was finished`, Error), p2(`ERR_STREAM_CANNOT_PIPE`, `Cannot pipe, not readable`, Error), p2(`ERR_STREAM_DESTROYED`, `Cannot call %s after a stream was destroyed`, Error), p2(`ERR_STREAM_NULL_VALUES`, `May not write null values to stream`, TypeError), p2(`ERR_STREAM_PREMATURE_CLOSE`, `Premature close`, Error), p2(`ERR_STREAM_PUSH_AFTER_EOF`, `stream.push() after EOF`, Error), p2(`ERR_STREAM_UNSHIFT_AFTER_END_EVENT`, `stream.unshift() after end event`, Error), p2(`ERR_STREAM_WRITE_AFTER_END`, `write after end`, Error), p2(`ERR_UNKNOWN_ENCODING`, `Unknown encoding: %s`, TypeError), t.exports = { AbortError: g2, aggregateTwoErrors: m3(h3), hideStackFrames: m3, codes: l2 };
}));
var We = f(((e, t) => {
  Object.defineProperty(e, `__esModule`, { value: true });
  let n = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap();
  function i2(e2) {
    let t2 = n.get(e2);
    return console.assert(t2 != null, `'this' is expected an Event object, but got`, e2), t2;
  }
  function a2(e2) {
    if (e2.passiveListener != null) {
      typeof console < `u` && typeof console.error == `function` && console.error(`Unable to preventDefault inside passive event listener invocation.`, e2.passiveListener);
      return;
    }
    e2.event.cancelable && (e2.canceled = true, typeof e2.event.preventDefault == `function` && e2.event.preventDefault());
  }
  function o2(e2, t2) {
    n.set(this, { eventTarget: e2, event: t2, eventPhase: 2, currentTarget: e2, canceled: false, stopped: false, immediateStopped: false, passiveListener: null, timeStamp: t2.timeStamp || Date.now() }), Object.defineProperty(this, `isTrusted`, { value: false, enumerable: true });
    let r2 = Object.keys(t2);
    for (let e3 = 0; e3 < r2.length; ++e3) {
      let t3 = r2[e3];
      t3 in this || Object.defineProperty(this, t3, s2(t3));
    }
  }
  o2.prototype = { get type() {
    return i2(this).event.type;
  }, get target() {
    return i2(this).eventTarget;
  }, get currentTarget() {
    return i2(this).currentTarget;
  }, composedPath() {
    let e2 = i2(this).currentTarget;
    return e2 == null ? [] : [e2];
  }, get NONE() {
    return 0;
  }, get CAPTURING_PHASE() {
    return 1;
  }, get AT_TARGET() {
    return 2;
  }, get BUBBLING_PHASE() {
    return 3;
  }, get eventPhase() {
    return i2(this).eventPhase;
  }, stopPropagation() {
    let e2 = i2(this);
    e2.stopped = true, typeof e2.event.stopPropagation == `function` && e2.event.stopPropagation();
  }, stopImmediatePropagation() {
    let e2 = i2(this);
    e2.stopped = true, e2.immediateStopped = true, typeof e2.event.stopImmediatePropagation == `function` && e2.event.stopImmediatePropagation();
  }, get bubbles() {
    return !!i2(this).event.bubbles;
  }, get cancelable() {
    return !!i2(this).event.cancelable;
  }, preventDefault() {
    a2(i2(this));
  }, get defaultPrevented() {
    return i2(this).canceled;
  }, get composed() {
    return !!i2(this).event.composed;
  }, get timeStamp() {
    return i2(this).timeStamp;
  }, get srcElement() {
    return i2(this).eventTarget;
  }, get cancelBubble() {
    return i2(this).stopped;
  }, set cancelBubble(e2) {
    if (!e2) return;
    let t2 = i2(this);
    t2.stopped = true, typeof t2.event.cancelBubble == `boolean` && (t2.event.cancelBubble = true);
  }, get returnValue() {
    return !i2(this).canceled;
  }, set returnValue(e2) {
    e2 || a2(i2(this));
  }, initEvent() {
  } }, Object.defineProperty(o2.prototype, `constructor`, { value: o2, configurable: true, writable: true }), typeof window < `u` && window.Event !== void 0 && (Object.setPrototypeOf(o2.prototype, window.Event.prototype), r.set(window.Event.prototype, o2));
  function s2(e2) {
    return { get() {
      return i2(this).event[e2];
    }, set(t2) {
      i2(this).event[e2] = t2;
    }, configurable: true, enumerable: true };
  }
  function c2(e2) {
    return { value() {
      let t2 = i2(this).event;
      return t2[e2].apply(t2, arguments);
    }, configurable: true, enumerable: true };
  }
  function l2(e2, t2) {
    let n2 = Object.keys(t2);
    if (n2.length === 0) return e2;
    function r2(t3, n3) {
      e2.call(this, t3, n3);
    }
    r2.prototype = Object.create(e2.prototype, { constructor: { value: r2, configurable: true, writable: true } });
    for (let i3 = 0; i3 < n2.length; ++i3) {
      let a3 = n2[i3];
      if (!(a3 in e2.prototype)) {
        let e3 = typeof Object.getOwnPropertyDescriptor(t2, a3).value == `function`;
        Object.defineProperty(r2.prototype, a3, e3 ? c2(a3) : s2(a3));
      }
    }
    return r2;
  }
  function u2(e2) {
    if (e2 == null || e2 === Object.prototype) return o2;
    let t2 = r.get(e2);
    return t2 ?? (t2 = l2(u2(Object.getPrototypeOf(e2)), e2), r.set(e2, t2)), t2;
  }
  function d2(e2, t2) {
    return new (u2(Object.getPrototypeOf(t2)))(e2, t2);
  }
  function f3(e2) {
    return i2(e2).immediateStopped;
  }
  function p2(e2, t2) {
    i2(e2).eventPhase = t2;
  }
  function m3(e2, t2) {
    i2(e2).currentTarget = t2;
  }
  function h3(e2, t2) {
    i2(e2).passiveListener = t2;
  }
  let g2 = /* @__PURE__ */ new WeakMap();
  function _2(e2) {
    return typeof e2 == `object` && !!e2;
  }
  function v2(e2) {
    let t2 = g2.get(e2);
    if (t2 == null) throw TypeError(`'this' is expected an EventTarget object, but got another value.`);
    return t2;
  }
  function y2(e2) {
    return { get() {
      let t2 = v2(this).get(e2);
      for (; t2 != null; ) {
        if (t2.listenerType === 3) return t2.listener;
        t2 = t2.next;
      }
      return null;
    }, set(t2) {
      typeof t2 != `function` && !_2(t2) && (t2 = null);
      let n2 = v2(this), r2 = null, i3 = n2.get(e2);
      for (; i3 != null; ) i3.listenerType === 3 ? r2 === null ? i3.next === null ? n2.delete(e2) : n2.set(e2, i3.next) : r2.next = i3.next : r2 = i3, i3 = i3.next;
      if (t2 !== null) {
        let i4 = { listener: t2, listenerType: 3, passive: false, once: false, next: null };
        r2 === null ? n2.set(e2, i4) : r2.next = i4;
      }
    }, configurable: true, enumerable: true };
  }
  function b2(e2, t2) {
    Object.defineProperty(e2, `on${t2}`, y2(t2));
  }
  function x2(e2) {
    function t2() {
      S2.call(this);
    }
    t2.prototype = Object.create(S2.prototype, { constructor: { value: t2, configurable: true, writable: true } });
    for (let n2 = 0; n2 < e2.length; ++n2) b2(t2.prototype, e2[n2]);
    return t2;
  }
  function S2() {
    if (this instanceof S2) {
      g2.set(this, /* @__PURE__ */ new Map());
      return;
    }
    if (arguments.length === 1 && Array.isArray(arguments[0])) return x2(arguments[0]);
    if (arguments.length > 0) {
      let e2 = Array(arguments.length);
      for (let t2 = 0; t2 < arguments.length; ++t2) e2[t2] = arguments[t2];
      return x2(e2);
    }
    throw TypeError(`Cannot call a class as a function`);
  }
  S2.prototype = { addEventListener(e2, t2, n2) {
    if (t2 == null) return;
    if (typeof t2 != `function` && !_2(t2)) throw TypeError(`'listener' should be a function or an object.`);
    let r2 = v2(this), i3 = _2(n2), a3 = (i3 ? n2.capture : n2) ? 1 : 2, o3 = { listener: t2, listenerType: a3, passive: i3 && !!n2.passive, once: i3 && !!n2.once, next: null }, s3 = r2.get(e2);
    if (s3 === void 0) {
      r2.set(e2, o3);
      return;
    }
    let c3 = null;
    for (; s3 != null; ) {
      if (s3.listener === t2 && s3.listenerType === a3) return;
      c3 = s3, s3 = s3.next;
    }
    c3.next = o3;
  }, removeEventListener(e2, t2, n2) {
    if (t2 == null) return;
    let r2 = v2(this), i3 = (_2(n2) ? n2.capture : n2) ? 1 : 2, a3 = null, o3 = r2.get(e2);
    for (; o3 != null; ) {
      if (o3.listener === t2 && o3.listenerType === i3) {
        a3 === null ? o3.next === null ? r2.delete(e2) : r2.set(e2, o3.next) : a3.next = o3.next;
        return;
      }
      a3 = o3, o3 = o3.next;
    }
  }, dispatchEvent(e2) {
    if (e2 == null || typeof e2.type != `string`) throw TypeError(`"event.type" should be a string.`);
    let t2 = v2(this), n2 = e2.type, r2 = t2.get(n2);
    if (r2 == null) return true;
    let i3 = d2(this, e2), a3 = null;
    for (; r2 != null; ) {
      if (r2.once ? a3 === null ? r2.next === null ? t2.delete(n2) : t2.set(n2, r2.next) : a3.next = r2.next : a3 = r2, h3(i3, r2.passive ? r2.listener : null), typeof r2.listener == `function`) try {
        r2.listener.call(this, i3);
      } catch (e3) {
        typeof console < `u` && typeof console.error == `function` && console.error(e3);
      }
      else r2.listenerType !== 3 && typeof r2.listener.handleEvent == `function` && r2.listener.handleEvent(i3);
      if (f3(i3)) break;
      r2 = r2.next;
    }
    return h3(i3, null), p2(i3, 0), m3(i3, null), !i3.defaultPrevented;
  } }, Object.defineProperty(S2.prototype, `constructor`, { value: S2, configurable: true, writable: true }), typeof window < `u` && window.EventTarget !== void 0 && Object.setPrototypeOf(S2.prototype, window.EventTarget.prototype), e.defineEventAttribute = b2, e.EventTarget = S2, e.default = S2, t.exports = S2, t.exports.EventTarget = t.exports.default = S2, t.exports.defineEventAttribute = b2;
}));
var Ge = f(((e, t) => {
  Object.defineProperty(e, `__esModule`, { value: true });
  var n = We(), r = class extends n.EventTarget {
    constructor() {
      throw super(), TypeError(`AbortSignal cannot be constructed directly`);
    }
    get aborted() {
      let e2 = o2.get(this);
      if (typeof e2 != `boolean`) throw TypeError(`Expected 'this' to be an 'AbortSignal' object, but got ${this === null ? `null` : typeof this}`);
      return e2;
    }
  };
  n.defineEventAttribute(r.prototype, `abort`);
  function i2() {
    let e2 = Object.create(r.prototype);
    return n.EventTarget.call(e2), o2.set(e2, false), e2;
  }
  function a2(e2) {
    o2.get(e2) === false && (o2.set(e2, true), e2.dispatchEvent({ type: `abort` }));
  }
  let o2 = /* @__PURE__ */ new WeakMap();
  Object.defineProperties(r.prototype, { aborted: { enumerable: true } }), typeof Symbol == `function` && typeof Symbol.toStringTag == `symbol` && Object.defineProperty(r.prototype, Symbol.toStringTag, { configurable: true, value: `AbortSignal` });
  var s2 = class {
    constructor() {
      c2.set(this, i2());
    }
    get signal() {
      return l2(this);
    }
    abort() {
      a2(l2(this));
    }
  };
  let c2 = /* @__PURE__ */ new WeakMap();
  function l2(e2) {
    let t2 = c2.get(e2);
    if (t2 == null) throw TypeError(`Expected 'this' to be an 'AbortController' object, but got ${e2 === null ? `null` : typeof e2}`);
    return t2;
  }
  Object.defineProperties(s2.prototype, { signal: { enumerable: true }, abort: { enumerable: true } }), typeof Symbol == `function` && typeof Symbol.toStringTag == `symbol` && Object.defineProperty(s2.prototype, Symbol.toStringTag, { configurable: true, value: `AbortController` }), e.AbortController = s2, e.AbortSignal = r, e.default = s2, t.exports = s2, t.exports.AbortController = t.exports.default = s2, t.exports.AbortSignal = r;
}));
var Ke = f(((t, n) => {
  let r = h(`buffer`), { format: i2, inspect: a2 } = He(), { codes: { ERR_INVALID_ARG_TYPE: o2 } } = Ue(), { kResistStopPropagation: s2, AggregateError: c2, SymbolDispose: l2 } = Ve(), u2 = globalThis.AbortSignal || Ge().AbortSignal, d2 = globalThis.AbortController || Ge().AbortController, f3 = Object.getPrototypeOf(async function() {
  }).constructor, p2 = globalThis.Blob || r.Blob, m3 = p2 === void 0 ? function(e) {
    return false;
  } : function(e) {
    return e instanceof p2;
  }, h3 = (e, t2) => {
    if (e !== void 0 && (typeof e != `object` || !e || !(`aborted` in e))) throw new o2(t2, `AbortSignal`, e);
  }, g2 = (e, t2) => {
    if (typeof e != `function`) throw new o2(t2, `Function`, e);
  };
  n.exports = { AggregateError: c2, kEmptyObject: Object.freeze({}), once(e) {
    let t2 = false;
    return function(...n2) {
      t2 || (t2 = true, e.apply(this, n2));
    };
  }, createDeferredPromise: function() {
    let e, t2;
    return { promise: new Promise((n2, r2) => {
      e = n2, t2 = r2;
    }), resolve: e, reject: t2 };
  }, promisify(e) {
    return new Promise((t2, n2) => {
      e((e2, ...r2) => e2 ? n2(e2) : t2(...r2));
    });
  }, debuglog() {
    return function() {
    };
  }, format: i2, inspect: a2, types: { isAsyncFunction(e) {
    return e instanceof f3;
  }, isArrayBufferView(e) {
    return ArrayBuffer.isView(e);
  } }, isBlob: m3, deprecate(e, t2) {
    return e;
  }, addAbortListener: h(`events`).addAbortListener || function(e, t2) {
    if (e === void 0) throw new o2(`signal`, `AbortSignal`, e);
    h3(e, `signal`), g2(t2, `listener`);
    let n2;
    return e.aborted ? queueMicrotask(() => t2()) : (e.addEventListener(`abort`, t2, { __proto__: null, once: true, [s2]: true }), n2 = () => {
      e.removeEventListener(`abort`, t2);
    }), { __proto__: null, [l2]() {
      var e2;
      (e2 = n2) == null || e2();
    } };
  }, AbortSignalAny: u2.any || function(e) {
    if (e.length === 1) return e[0];
    let t2 = new d2(), n2 = () => t2.abort();
    return e.forEach((e2) => {
      h3(e2, `signals`), e2.addEventListener(`abort`, n2, { once: true });
    }), t2.signal.addEventListener(`abort`, () => {
      e.forEach((e2) => e2.removeEventListener(`abort`, n2));
    }, { once: true }), t2.signal;
  } }, n.exports.promisify.custom = /* @__PURE__ */ Symbol.for(`nodejs.util.promisify.custom`);
}));
var qe = f(((e, t) => {
  let { ArrayIsArray: n, ArrayPrototypeIncludes: r, ArrayPrototypeJoin: i2, ArrayPrototypeMap: a2, NumberIsInteger: o2, NumberIsNaN: s2, NumberMAX_SAFE_INTEGER: c2, NumberMIN_SAFE_INTEGER: l2, NumberParseInt: u2, ObjectPrototypeHasOwnProperty: d2, RegExpPrototypeExec: f3, String: p2, StringPrototypeToUpperCase: m3, StringPrototypeTrim: h3 } = Ve(), { hideStackFrames: g2, codes: { ERR_SOCKET_BAD_PORT: _2, ERR_INVALID_ARG_TYPE: v2, ERR_INVALID_ARG_VALUE: y2, ERR_OUT_OF_RANGE: b2, ERR_UNKNOWN_SIGNAL: x2 } } = Ue(), { normalizeEncoding: S2 } = Ke(), { isAsyncFunction: C2, isArrayBufferView: w2 } = Ke().types, T2 = {};
  function E2(e2) {
    return e2 === (e2 | 0);
  }
  function D2(e2) {
    return e2 === e2 >>> 0;
  }
  let O2 = /^[0-7]+$/;
  function k3(e2, t2, n2) {
    if (e2 === void 0 && (e2 = n2), typeof e2 == `string`) {
      if (f3(O2, e2) === null) throw new y2(t2, e2, `must be a 32-bit unsigned integer or an octal string`);
      e2 = u2(e2, 8);
    }
    return M2(e2, t2), e2;
  }
  let A2 = g2((e2, t2, n2 = l2, r2 = c2) => {
    if (typeof e2 != `number`) throw new v2(t2, `number`, e2);
    if (!o2(e2)) throw new b2(t2, `an integer`, e2);
    if (e2 < n2 || e2 > r2) throw new b2(t2, `>= ${n2} && <= ${r2}`, e2);
  }), j2 = g2((e2, t2, n2 = -2147483648, r2 = 2147483647) => {
    if (typeof e2 != `number`) throw new v2(t2, `number`, e2);
    if (!o2(e2)) throw new b2(t2, `an integer`, e2);
    if (e2 < n2 || e2 > r2) throw new b2(t2, `>= ${n2} && <= ${r2}`, e2);
  }), M2 = g2((e2, t2, n2 = false) => {
    if (typeof e2 != `number`) throw new v2(t2, `number`, e2);
    if (!o2(e2)) throw new b2(t2, `an integer`, e2);
    let r2 = +!!n2, i3 = 4294967295;
    if (e2 < r2 || e2 > i3) throw new b2(t2, `>= ${r2} && <= ${i3}`, e2);
  });
  function N2(e2, t2) {
    if (typeof e2 != `string`) throw new v2(t2, `string`, e2);
  }
  function P2(e2, t2, n2 = void 0, r2) {
    if (typeof e2 != `number`) throw new v2(t2, `number`, e2);
    if (n2 != null && e2 < n2 || r2 != null && e2 > r2 || (n2 != null || r2 != null) && s2(e2)) throw new b2(t2, `${n2 == null ? `` : `>= ${n2}`}${n2 != null && r2 != null ? ` && ` : ``}${r2 == null ? `` : `<= ${r2}`}`, e2);
  }
  let F2 = g2((e2, t2, n2) => {
    if (!r(n2, e2)) throw new y2(t2, e2, `must be one of: ` + i2(a2(n2, (e3) => typeof e3 == `string` ? `'${e3}'` : p2(e3)), `, `));
  });
  function ee2(e2, t2) {
    if (typeof e2 != `boolean`) throw new v2(t2, `boolean`, e2);
  }
  function I2(e2, t2, n2) {
    return e2 == null || !d2(e2, t2) ? n2 : e2[t2];
  }
  let L2 = g2((e2, t2, r2 = null) => {
    let i3 = I2(r2, `allowArray`, false), a3 = I2(r2, `allowFunction`, false);
    if (!I2(r2, `nullable`, false) && e2 === null || !i3 && n(e2) || typeof e2 != `object` && (!a3 || typeof e2 != `function`)) throw new v2(t2, `Object`, e2);
  }), R2 = g2((e2, t2) => {
    if (e2 != null && typeof e2 != `object` && typeof e2 != `function`) throw new v2(t2, `a dictionary`, e2);
  }), te2 = g2((e2, t2, r2 = 0) => {
    if (!n(e2)) throw new v2(t2, `Array`, e2);
    if (e2.length < r2) throw new y2(t2, e2, `must be longer than ${r2}`);
  });
  function ne2(e2, t2) {
    te2(e2, t2);
    for (let n2 = 0; n2 < e2.length; n2++) N2(e2[n2], `${t2}[${n2}]`);
  }
  function z2(e2, t2) {
    te2(e2, t2);
    for (let n2 = 0; n2 < e2.length; n2++) ee2(e2[n2], `${t2}[${n2}]`);
  }
  function B2(e2, t2) {
    te2(e2, t2);
    for (let n2 = 0; n2 < e2.length; n2++) {
      let r2 = e2[n2], i3 = `${t2}[${n2}]`;
      if (r2 == null) throw new v2(i3, `AbortSignal`, r2);
      ae2(r2, i3);
    }
  }
  function V2(e2, t2 = `signal`) {
    if (N2(e2, t2), T2[e2] === void 0) throw T2[m3(e2)] === void 0 ? new x2(e2) : new x2(e2 + ` (signals must use all capital letters)`);
  }
  let H2 = g2((e2, t2 = `buffer`) => {
    if (!w2(e2)) throw new v2(t2, [`Buffer`, `TypedArray`, `DataView`], e2);
  });
  function re2(e2, t2) {
    let n2 = S2(t2), r2 = e2.length;
    if (n2 === `hex` && r2 % 2 != 0) throw new y2(`encoding`, t2, `is invalid for data of length ${r2}`);
  }
  function ie2(e2, t2 = `Port`, n2 = true) {
    if (typeof e2 != `number` && typeof e2 != `string` || typeof e2 == `string` && h3(e2).length === 0 || +e2 != e2 >>> 0 || e2 > 65535 || e2 === 0 && !n2) throw new _2(t2, e2, n2);
    return e2 | 0;
  }
  let ae2 = g2((e2, t2) => {
    if (e2 !== void 0 && (typeof e2 != `object` || !e2 || !(`aborted` in e2))) throw new v2(t2, `AbortSignal`, e2);
  }), U2 = g2((e2, t2) => {
    if (typeof e2 != `function`) throw new v2(t2, `Function`, e2);
  }), W2 = g2((e2, t2) => {
    if (typeof e2 != `function` || C2(e2)) throw new v2(t2, `Function`, e2);
  }), oe2 = g2((e2, t2) => {
    if (e2 !== void 0) throw new v2(t2, `undefined`, e2);
  });
  function se2(e2, t2, n2) {
    if (!r(n2, e2)) throw new v2(t2, `('${i2(n2, `|`)}')`, e2);
  }
  let G2 = /^(?:<[^>]*>)(?:\s*;\s*[^;"\s]+(?:=(")?[^;"\s]*\1)?)*$/;
  function K2(e2, t2) {
    if (e2 === void 0 || !f3(G2, e2)) throw new y2(t2, e2, `must be an array or string of format "</styles.css>; rel=preload; as=style"`);
  }
  function ce2(e2) {
    if (typeof e2 == `string`) return K2(e2, `hints`), e2;
    if (n(e2)) {
      let t2 = e2.length, n2 = ``;
      if (t2 === 0) return n2;
      for (let r2 = 0; r2 < t2; r2++) {
        let i3 = e2[r2];
        K2(i3, `hints`), n2 += i3, r2 !== t2 - 1 && (n2 += `, `);
      }
      return n2;
    }
    throw new y2(`hints`, e2, `must be an array or string of format "</styles.css>; rel=preload; as=style"`);
  }
  t.exports = { isInt32: E2, isUint32: D2, parseFileMode: k3, validateArray: te2, validateStringArray: ne2, validateBooleanArray: z2, validateAbortSignalArray: B2, validateBoolean: ee2, validateBuffer: H2, validateDictionary: R2, validateEncoding: re2, validateFunction: U2, validateInt32: j2, validateInteger: A2, validateNumber: P2, validateObject: L2, validateOneOf: F2, validatePlainFunction: W2, validatePort: ie2, validateSignalName: V2, validateString: N2, validateUint32: M2, validateUndefined: oe2, validateUnion: se2, validateAbortSignal: ae2, validateLinkHeaderValue: ce2 };
}));
var Je = f(((e, t) => {
  t.exports = global.process;
}));
var Ye = f(((e, t) => {
  let { SymbolAsyncIterator: n, SymbolIterator: r, SymbolFor: i2 } = Ve(), a2 = i2(`nodejs.stream.destroyed`), o2 = i2(`nodejs.stream.errored`), s2 = i2(`nodejs.stream.readable`), c2 = i2(`nodejs.stream.writable`), l2 = i2(`nodejs.stream.disturbed`), u2 = i2(`nodejs.webstream.isClosedPromise`), d2 = i2(`nodejs.webstream.controllerErrorFunction`);
  function f3(e2, t2 = false) {
    return !!(e2 && typeof e2.pipe == `function` && typeof e2.on == `function` && (!t2 || typeof e2.pause == `function` && typeof e2.resume == `function`) && (!e2._writableState || e2._readableState?.readable !== false) && (!e2._writableState || e2._readableState));
  }
  function p2(e2) {
    return !!(e2 && typeof e2.write == `function` && typeof e2.on == `function` && (!e2._readableState || e2._writableState?.writable !== false));
  }
  function m3(e2) {
    return !!(e2 && typeof e2.pipe == `function` && e2._readableState && typeof e2.on == `function` && typeof e2.write == `function`);
  }
  function h3(e2) {
    return e2 && (e2._readableState || e2._writableState || typeof e2.write == `function` && typeof e2.on == `function` || typeof e2.pipe == `function` && typeof e2.on == `function`);
  }
  function g2(e2) {
    return !!(e2 && !h3(e2) && typeof e2.pipeThrough == `function` && typeof e2.getReader == `function` && typeof e2.cancel == `function`);
  }
  function _2(e2) {
    return !!(e2 && !h3(e2) && typeof e2.getWriter == `function` && typeof e2.abort == `function`);
  }
  function v2(e2) {
    return !!(e2 && !h3(e2) && typeof e2.readable == `object` && typeof e2.writable == `object`);
  }
  function y2(e2) {
    return g2(e2) || _2(e2) || v2(e2);
  }
  function b2(e2, t2) {
    return e2 == null ? false : t2 === true ? typeof e2[n] == `function` : t2 === false ? typeof e2[r] == `function` : typeof e2[n] == `function` || typeof e2[r] == `function`;
  }
  function x2(e2) {
    if (!h3(e2)) return null;
    let t2 = e2._writableState, n2 = e2._readableState, r2 = t2 || n2;
    return !!(e2.destroyed || e2[a2] || r2 != null && r2.destroyed);
  }
  function S2(e2) {
    if (!p2(e2)) return null;
    if (e2.writableEnded === true) return true;
    let t2 = e2._writableState;
    return t2 != null && t2.errored ? false : typeof t2?.ended == `boolean` ? t2.ended : null;
  }
  function C2(e2, t2) {
    if (!p2(e2)) return null;
    if (e2.writableFinished === true) return true;
    let n2 = e2._writableState;
    return n2 != null && n2.errored ? false : typeof n2?.finished == `boolean` ? !!(n2.finished || t2 === false && n2.ended === true && n2.length === 0) : null;
  }
  function w2(e2) {
    if (!f3(e2)) return null;
    if (e2.readableEnded === true) return true;
    let t2 = e2._readableState;
    return !t2 || t2.errored ? false : typeof t2?.ended == `boolean` ? t2.ended : null;
  }
  function T2(e2, t2) {
    if (!f3(e2)) return null;
    let n2 = e2._readableState;
    return n2 != null && n2.errored ? false : typeof n2?.endEmitted == `boolean` ? !!(n2.endEmitted || t2 === false && n2.ended === true && n2.length === 0) : null;
  }
  function E2(e2) {
    return e2 && e2[s2] != null ? e2[s2] : typeof e2?.readable == `boolean` ? x2(e2) ? false : f3(e2) && e2.readable && !T2(e2) : null;
  }
  function D2(e2) {
    return e2 && e2[c2] != null ? e2[c2] : typeof e2?.writable == `boolean` ? x2(e2) ? false : p2(e2) && e2.writable && !S2(e2) : null;
  }
  function O2(e2, t2) {
    return h3(e2) ? x2(e2) ? true : !(t2?.readable !== false && E2(e2) || t2?.writable !== false && D2(e2)) : null;
  }
  function k3(e2) {
    return h3(e2) ? e2.writableErrored ? e2.writableErrored : e2._writableState?.errored ?? null : null;
  }
  function A2(e2) {
    return h3(e2) ? e2.readableErrored ? e2.readableErrored : e2._readableState?.errored ?? null : null;
  }
  function j2(e2) {
    if (!h3(e2)) return null;
    if (typeof e2.closed == `boolean`) return e2.closed;
    let t2 = e2._writableState, n2 = e2._readableState;
    return typeof t2?.closed == `boolean` || typeof n2?.closed == `boolean` ? t2?.closed || n2?.closed : typeof e2._closed == `boolean` && M2(e2) ? e2._closed : null;
  }
  function M2(e2) {
    return typeof e2._closed == `boolean` && typeof e2._defaultKeepAlive == `boolean` && typeof e2._removedConnection == `boolean` && typeof e2._removedContLen == `boolean`;
  }
  function N2(e2) {
    return typeof e2._sent100 == `boolean` && M2(e2);
  }
  function P2(e2) {
    return typeof e2._consuming == `boolean` && typeof e2._dumped == `boolean` && e2.req?.upgradeOrConnect === void 0;
  }
  function F2(e2) {
    if (!h3(e2)) return null;
    let t2 = e2._writableState, n2 = e2._readableState, r2 = t2 || n2;
    return !r2 && N2(e2) || !!(r2 && r2.autoDestroy && r2.emitClose && r2.closed === false);
  }
  function ee2(e2) {
    return !!(e2 && (e2[l2] ?? (e2.readableDidRead || e2.readableAborted)));
  }
  function I2(e2) {
    return !!(e2 && (e2[o2] ?? e2.readableErrored ?? e2.writableErrored ?? e2._readableState?.errorEmitted ?? e2._writableState?.errorEmitted ?? e2._readableState?.errored ?? e2._writableState?.errored));
  }
  t.exports = { isDestroyed: x2, kIsDestroyed: a2, isDisturbed: ee2, kIsDisturbed: l2, isErrored: I2, kIsErrored: o2, isReadable: E2, kIsReadable: s2, kIsClosedPromise: u2, kControllerErrorFunction: d2, kIsWritable: c2, isClosed: j2, isDuplexNodeStream: m3, isFinished: O2, isIterable: b2, isReadableNodeStream: f3, isReadableStream: g2, isReadableEnded: w2, isReadableFinished: T2, isReadableErrored: A2, isNodeStream: h3, isWebStream: y2, isWritable: D2, isWritableNodeStream: p2, isWritableStream: _2, isWritableEnded: S2, isWritableFinished: C2, isWritableErrored: k3, isServerRequest: P2, isServerResponse: N2, willEmitClose: F2, isTransformStream: v2 };
}));
var Xe = f(((e, t) => {
  let n = Je(), { AbortError: r, codes: i2 } = Ue(), { ERR_INVALID_ARG_TYPE: a2, ERR_STREAM_PREMATURE_CLOSE: o2 } = i2, { kEmptyObject: s2, once: c2 } = Ke(), { validateAbortSignal: l2, validateFunction: u2, validateObject: d2, validateBoolean: f3 } = qe(), { Promise: p2, PromisePrototypeThen: m3, SymbolDispose: h3 } = Ve(), { isClosed: g2, isReadable: _2, isReadableNodeStream: v2, isReadableStream: y2, isReadableFinished: b2, isReadableErrored: x2, isWritable: S2, isWritableNodeStream: C2, isWritableStream: w2, isWritableFinished: T2, isWritableErrored: E2, isNodeStream: D2, willEmitClose: O2, kIsClosedPromise: k3 } = Ye(), A2;
  function j2(e2) {
    return e2.setHeader && typeof e2.abort == `function`;
  }
  let M2 = () => {
  };
  function N2(e2, t2, i3) {
    if (arguments.length === 2 ? (i3 = t2, t2 = s2) : t2 == null ? t2 = s2 : d2(t2, `options`), u2(i3, `callback`), l2(t2.signal, `options.signal`), i3 = c2(i3), y2(e2) || w2(e2)) return P2(e2, t2, i3);
    if (!D2(e2)) throw new a2(`stream`, [`ReadableStream`, `WritableStream`, `Stream`], e2);
    let f4 = t2.readable ?? v2(e2), p3 = t2.writable ?? C2(e2), m4 = e2._writableState, k4 = e2._readableState, N3 = () => {
      e2.writable || I2();
    }, F3 = O2(e2) && v2(e2) === f4 && C2(e2) === p3, ee2 = T2(e2, false), I2 = () => {
      ee2 = true, e2.destroyed && (F3 = false), !(F3 && (!e2.readable || f4)) && (!f4 || L2) && i3.call(e2);
    }, L2 = b2(e2, false), R2 = () => {
      L2 = true, e2.destroyed && (F3 = false), !(F3 && (!e2.writable || p3)) && (!p3 || ee2) && i3.call(e2);
    }, te2 = (t3) => {
      i3.call(e2, t3);
    }, ne2 = g2(e2), z2 = () => {
      ne2 = true;
      let t3 = E2(e2) || x2(e2);
      if (t3 && typeof t3 != `boolean`) return i3.call(e2, t3);
      if (f4 && !L2 && v2(e2, true) && !b2(e2, false) || p3 && !ee2 && !T2(e2, false)) return i3.call(e2, new o2());
      i3.call(e2);
    }, B2 = () => {
      ne2 = true;
      let t3 = E2(e2) || x2(e2);
      if (t3 && typeof t3 != `boolean`) return i3.call(e2, t3);
      i3.call(e2);
    }, V2 = () => {
      e2.req.on(`finish`, I2);
    };
    j2(e2) ? (e2.on(`complete`, I2), F3 || e2.on(`abort`, z2), e2.req ? V2() : e2.on(`request`, V2)) : p3 && !m4 && (e2.on(`end`, N3), e2.on(`close`, N3)), !F3 && typeof e2.aborted == `boolean` && e2.on(`aborted`, z2), e2.on(`end`, R2), e2.on(`finish`, I2), t2.error !== false && e2.on(`error`, te2), e2.on(`close`, z2), ne2 ? n.nextTick(z2) : m4 != null && m4.errorEmitted || k4 != null && k4.errorEmitted ? F3 || n.nextTick(B2) : (!f4 && (!F3 || _2(e2)) && (ee2 || S2(e2) === false) || !p3 && (!F3 || S2(e2)) && (L2 || _2(e2) === false) || k4 && e2.req && e2.aborted) && n.nextTick(B2);
    let H2 = () => {
      i3 = M2, e2.removeListener(`aborted`, z2), e2.removeListener(`complete`, I2), e2.removeListener(`abort`, z2), e2.removeListener(`request`, V2), e2.req && e2.req.removeListener(`finish`, I2), e2.removeListener(`end`, N3), e2.removeListener(`close`, N3), e2.removeListener(`finish`, I2), e2.removeListener(`end`, R2), e2.removeListener(`error`, te2), e2.removeListener(`close`, z2);
    };
    if (t2.signal && !ne2) {
      let a3 = () => {
        let n2 = i3;
        H2(), n2.call(e2, new r(void 0, { cause: t2.signal.reason }));
      };
      if (t2.signal.aborted) n.nextTick(a3);
      else {
        A2 ||= Ke().addAbortListener;
        let n2 = A2(t2.signal, a3), r2 = i3;
        i3 = c2((...t3) => {
          n2[h3](), r2.apply(e2, t3);
        });
      }
    }
    return H2;
  }
  function P2(e2, t2, i3) {
    let a3 = false, o3 = M2;
    if (t2.signal) if (o3 = () => {
      a3 = true, i3.call(e2, new r(void 0, { cause: t2.signal.reason }));
    }, t2.signal.aborted) n.nextTick(o3);
    else {
      A2 ||= Ke().addAbortListener;
      let n2 = A2(t2.signal, o3), r2 = i3;
      i3 = c2((...t3) => {
        n2[h3](), r2.apply(e2, t3);
      });
    }
    let s3 = (...t3) => {
      a3 || n.nextTick(() => i3.apply(e2, t3));
    };
    return m3(e2[k3].promise, s3, s3), M2;
  }
  function F2(e2, t2) {
    var n2;
    let r2 = false;
    return t2 === null && (t2 = s2), (n2 = t2) != null && n2.cleanup && (f3(t2.cleanup, `cleanup`), r2 = t2.cleanup), new p2((n3, i3) => {
      let a3 = N2(e2, t2, (e3) => {
        r2 && a3(), e3 ? i3(e3) : n3();
      });
    });
  }
  t.exports = N2, t.exports.finished = F2;
}));
var Ze = f(((e, t) => {
  let n = Je(), { aggregateTwoErrors: r, codes: { ERR_MULTIPLE_CALLBACK: i2 }, AbortError: a2 } = Ue(), { Symbol: o2 } = Ve(), { kIsDestroyed: s2, isDestroyed: c2, isFinished: l2, isServerRequest: u2 } = Ye(), d2 = o2(`kDestroy`), f3 = o2(`kConstruct`);
  function p2(e2, t2, n2) {
    e2 && (e2.stack, t2 && !t2.errored && (t2.errored = e2), n2 && !n2.errored && (n2.errored = e2));
  }
  function m3(e2, t2) {
    let n2 = this._readableState, i3 = this._writableState, a3 = i3 || n2;
    return i3 != null && i3.destroyed || n2 != null && n2.destroyed ? (typeof t2 == `function` && t2(), this) : (p2(e2, i3, n2), i3 && (i3.destroyed = true), n2 && (n2.destroyed = true), a3.constructed ? h3(this, e2, t2) : this.once(d2, function(n3) {
      h3(this, r(n3, e2), t2);
    }), this);
  }
  function h3(e2, t2, r2) {
    let i3 = false;
    function a3(t3) {
      if (i3) return;
      i3 = true;
      let a4 = e2._readableState, o3 = e2._writableState;
      p2(t3, o3, a4), o3 && (o3.closed = true), a4 && (a4.closed = true), typeof r2 == `function` && r2(t3), t3 ? n.nextTick(g2, e2, t3) : n.nextTick(_2, e2);
    }
    try {
      e2._destroy(t2 || null, a3);
    } catch (e3) {
      a3(e3);
    }
  }
  function g2(e2, t2) {
    v2(e2, t2), _2(e2);
  }
  function _2(e2) {
    let t2 = e2._readableState, n2 = e2._writableState;
    n2 && (n2.closeEmitted = true), t2 && (t2.closeEmitted = true), (n2 != null && n2.emitClose || t2 != null && t2.emitClose) && e2.emit(`close`);
  }
  function v2(e2, t2) {
    let n2 = e2._readableState, r2 = e2._writableState;
    r2 != null && r2.errorEmitted || n2 != null && n2.errorEmitted || (r2 && (r2.errorEmitted = true), n2 && (n2.errorEmitted = true), e2.emit(`error`, t2));
  }
  function y2() {
    let e2 = this._readableState, t2 = this._writableState;
    e2 && (e2.constructed = true, e2.closed = false, e2.closeEmitted = false, e2.destroyed = false, e2.errored = null, e2.errorEmitted = false, e2.reading = false, e2.ended = e2.readable === false, e2.endEmitted = e2.readable === false), t2 && (t2.constructed = true, t2.destroyed = false, t2.closed = false, t2.closeEmitted = false, t2.errored = null, t2.errorEmitted = false, t2.finalCalled = false, t2.prefinished = false, t2.ended = t2.writable === false, t2.ending = t2.writable === false, t2.finished = t2.writable === false);
  }
  function b2(e2, t2, r2) {
    let i3 = e2._readableState, a3 = e2._writableState;
    if (a3 != null && a3.destroyed || i3 != null && i3.destroyed) return this;
    i3 != null && i3.autoDestroy || a3 != null && a3.autoDestroy ? e2.destroy(t2) : t2 && (t2.stack, a3 && !a3.errored && (a3.errored = t2), i3 && !i3.errored && (i3.errored = t2), r2 ? n.nextTick(v2, e2, t2) : v2(e2, t2));
  }
  function x2(e2, t2) {
    if (typeof e2._construct != `function`) return;
    let r2 = e2._readableState, i3 = e2._writableState;
    r2 && (r2.constructed = false), i3 && (i3.constructed = false), e2.once(f3, t2), !(e2.listenerCount(f3) > 1) && n.nextTick(S2, e2);
  }
  function S2(e2) {
    let t2 = false;
    function r2(r3) {
      if (t2) {
        b2(e2, r3 ?? new i2());
        return;
      }
      t2 = true;
      let a3 = e2._readableState, o3 = e2._writableState, s3 = o3 || a3;
      a3 && (a3.constructed = true), o3 && (o3.constructed = true), s3.destroyed ? e2.emit(d2, r3) : r3 ? b2(e2, r3, true) : n.nextTick(C2, e2);
    }
    try {
      e2._construct((e3) => {
        n.nextTick(r2, e3);
      });
    } catch (e3) {
      n.nextTick(r2, e3);
    }
  }
  function C2(e2) {
    e2.emit(f3);
  }
  function w2(e2) {
    return e2?.setHeader && typeof e2.abort == `function`;
  }
  function T2(e2) {
    e2.emit(`close`);
  }
  function E2(e2, t2) {
    e2.emit(`error`, t2), n.nextTick(T2, e2);
  }
  function D2(e2, t2) {
    !e2 || c2(e2) || (!t2 && !l2(e2) && (t2 = new a2()), u2(e2) ? (e2.socket = null, e2.destroy(t2)) : w2(e2) ? e2.abort() : w2(e2.req) ? e2.req.abort() : typeof e2.destroy == `function` ? e2.destroy(t2) : typeof e2.close == `function` ? e2.close() : t2 ? n.nextTick(E2, e2, t2) : n.nextTick(T2, e2), e2.destroyed || (e2[s2] = true));
  }
  t.exports = { construct: x2, destroyer: D2, destroy: m3, undestroy: y2, errorOrDestroy: b2 };
}));
var Qe = f(((t, n) => {
  let { ArrayIsArray: r, ObjectSetPrototypeOf: i2 } = Ve(), { EventEmitter: a2 } = h(`events`);
  function o2(e) {
    a2.call(this, e);
  }
  i2(o2.prototype, a2.prototype), i2(o2, a2), o2.prototype.pipe = function(e, t2) {
    let n2 = this;
    function r2(t3) {
      e.writable && e.write(t3) === false && n2.pause && n2.pause();
    }
    n2.on(`data`, r2);
    function i3() {
      n2.readable && n2.resume && n2.resume();
    }
    e.on(`drain`, i3), !e._isStdio && (!t2 || t2.end !== false) && (n2.on(`end`, c2), n2.on(`close`, l2));
    let o3 = false;
    function c2() {
      o3 || (o3 = true, e.end());
    }
    function l2() {
      o3 || (o3 = true, typeof e.destroy == `function` && e.destroy());
    }
    function u2(e2) {
      d2(), a2.listenerCount(this, `error`) === 0 && this.emit(`error`, e2);
    }
    s2(n2, `error`, u2), s2(e, `error`, u2);
    function d2() {
      n2.removeListener(`data`, r2), e.removeListener(`drain`, i3), n2.removeListener(`end`, c2), n2.removeListener(`close`, l2), n2.removeListener(`error`, u2), e.removeListener(`error`, u2), n2.removeListener(`end`, d2), n2.removeListener(`close`, d2), e.removeListener(`close`, d2);
    }
    return n2.on(`end`, d2), n2.on(`close`, d2), e.on(`close`, d2), e.emit(`pipe`, n2), e;
  };
  function s2(e, t2, n2) {
    if (typeof e.prependListener == `function`) return e.prependListener(t2, n2);
    !e._events || !e._events[t2] ? e.on(t2, n2) : r(e._events[t2]) ? e._events[t2].unshift(n2) : e._events[t2] = [n2, e._events[t2]];
  }
  n.exports = { Stream: o2, prependListener: s2 };
}));
var $e = f(((e, t) => {
  let { SymbolDispose: n } = Ve(), { AbortError: r, codes: i2 } = Ue(), { isNodeStream: a2, isWebStream: o2, kControllerErrorFunction: s2 } = Ye(), c2 = Xe(), { ERR_INVALID_ARG_TYPE: l2 } = i2, u2, d2 = (e2, t2) => {
    if (typeof e2 != `object` || !(`aborted` in e2)) throw new l2(t2, `AbortSignal`, e2);
  };
  t.exports.addAbortSignal = function(e2, n2) {
    if (d2(e2, `signal`), !a2(n2) && !o2(n2)) throw new l2(`stream`, [`ReadableStream`, `WritableStream`, `Stream`], n2);
    return t.exports.addAbortSignalNoValidate(e2, n2);
  }, t.exports.addAbortSignalNoValidate = function(e2, t2) {
    if (typeof e2 != `object` || !(`aborted` in e2)) return t2;
    let i3 = a2(t2) ? () => {
      t2.destroy(new r(void 0, { cause: e2.reason }));
    } : () => {
      t2[s2](new r(void 0, { cause: e2.reason }));
    };
    return e2.aborted ? i3() : (u2 ||= Ke().addAbortListener, c2(t2, u2(e2, i3)[n])), t2;
  };
}));
var et = f(((t, n) => {
  let { StringPrototypeSlice: r, SymbolIterator: i2, TypedArrayPrototypeSet: a2, Uint8Array: o2 } = Ve(), { Buffer: s2 } = h(`buffer`), { inspect: c2 } = Ke();
  n.exports = class {
    constructor() {
      this.head = null, this.tail = null, this.length = 0;
    }
    push(e) {
      let t2 = { data: e, next: null };
      this.length > 0 ? this.tail.next = t2 : this.head = t2, this.tail = t2, ++this.length;
    }
    unshift(e) {
      let t2 = { data: e, next: this.head };
      this.length === 0 && (this.tail = t2), this.head = t2, ++this.length;
    }
    shift() {
      if (this.length === 0) return;
      let e = this.head.data;
      return this.length === 1 ? this.head = this.tail = null : this.head = this.head.next, --this.length, e;
    }
    clear() {
      this.head = this.tail = null, this.length = 0;
    }
    join(e) {
      if (this.length === 0) return ``;
      let t2 = this.head, n2 = `` + t2.data;
      for (; (t2 = t2.next) !== null; ) n2 += e + t2.data;
      return n2;
    }
    concat(e) {
      if (this.length === 0) return s2.alloc(0);
      let t2 = s2.allocUnsafe(e >>> 0), n2 = this.head, r2 = 0;
      for (; n2; ) a2(t2, n2.data, r2), r2 += n2.data.length, n2 = n2.next;
      return t2;
    }
    consume(e, t2) {
      let n2 = this.head.data;
      if (e < n2.length) {
        let t3 = n2.slice(0, e);
        return this.head.data = n2.slice(e), t3;
      }
      return e === n2.length ? this.shift() : t2 ? this._getString(e) : this._getBuffer(e);
    }
    first() {
      return this.head.data;
    }
    *[i2]() {
      for (let e = this.head; e; e = e.next) yield e.data;
    }
    _getString(e) {
      let t2 = ``, n2 = this.head, i3 = 0;
      do {
        let a3 = n2.data;
        if (e > a3.length) t2 += a3, e -= a3.length;
        else {
          e === a3.length ? (t2 += a3, ++i3, n2.next ? this.head = n2.next : this.head = this.tail = null) : (t2 += r(a3, 0, e), this.head = n2, n2.data = r(a3, e));
          break;
        }
        ++i3;
      } while ((n2 = n2.next) !== null);
      return this.length -= i3, t2;
    }
    _getBuffer(e) {
      let t2 = s2.allocUnsafe(e), n2 = e, r2 = this.head, i3 = 0;
      do {
        let s3 = r2.data;
        if (e > s3.length) a2(t2, s3, n2 - e), e -= s3.length;
        else {
          e === s3.length ? (a2(t2, s3, n2 - e), ++i3, r2.next ? this.head = r2.next : this.head = this.tail = null) : (a2(t2, new o2(s3.buffer, s3.byteOffset, e), n2 - e), this.head = r2, r2.data = s3.slice(e));
          break;
        }
        ++i3;
      } while ((r2 = r2.next) !== null);
      return this.length -= i3, t2;
    }
    [/* @__PURE__ */ Symbol.for(`nodejs.util.inspect.custom`)](e, t2) {
      return c2(this, { ...t2, depth: 0, customInspect: false });
    }
  };
}));
var tt = f(((e, t) => {
  let { MathFloor: n, NumberIsInteger: r } = Ve(), { validateInteger: i2 } = qe(), { ERR_INVALID_ARG_VALUE: a2 } = Ue().codes, o2 = 16 * 1024, s2 = 16;
  function c2(e2, t2, n2) {
    return e2.highWaterMark == null ? t2 ? e2[n2] : null : e2.highWaterMark;
  }
  function l2(e2) {
    return e2 ? s2 : o2;
  }
  function u2(e2, t2) {
    i2(t2, `value`, 0), e2 ? s2 = t2 : o2 = t2;
  }
  function d2(e2, t2, i3, o3) {
    let s3 = c2(t2, o3, i3);
    if (s3 != null) {
      if (!r(s3) || s3 < 0) throw new a2(o3 ? `options.${i3}` : `options.highWaterMark`, s3);
      return n(s3);
    }
    return l2(e2.objectMode);
  }
  t.exports = { getHighWaterMark: d2, getDefaultHighWaterMark: l2, setDefaultHighWaterMark: u2 };
}));
var nt = f(((e) => {
  var t = p().Buffer, n = t.isEncoding || function(e2) {
    switch (e2 = `` + e2, e2 && e2.toLowerCase()) {
      case `hex`:
      case `utf8`:
      case `utf-8`:
      case `ascii`:
      case `binary`:
      case `base64`:
      case `ucs2`:
      case `ucs-2`:
      case `utf16le`:
      case `utf-16le`:
      case `raw`:
        return true;
      default:
        return false;
    }
  };
  function r(e2) {
    if (!e2) return `utf8`;
    for (var t2; ; ) switch (e2) {
      case `utf8`:
      case `utf-8`:
        return `utf8`;
      case `ucs2`:
      case `ucs-2`:
      case `utf16le`:
      case `utf-16le`:
        return `utf16le`;
      case `latin1`:
      case `binary`:
        return `latin1`;
      case `base64`:
      case `ascii`:
      case `hex`:
        return e2;
      default:
        if (t2) return;
        e2 = (`` + e2).toLowerCase(), t2 = true;
    }
  }
  function i2(e2) {
    var i3 = r(e2);
    if (typeof i3 != `string` && (t.isEncoding === n || !n(e2))) throw Error(`Unknown encoding: ` + e2);
    return i3 || e2;
  }
  e.StringDecoder = a2;
  function a2(e2) {
    this.encoding = i2(e2);
    var n2;
    switch (this.encoding) {
      case `utf16le`:
        this.text = f3, this.end = m3, n2 = 4;
        break;
      case `utf8`:
        this.fillLast = l2, n2 = 4;
        break;
      case `base64`:
        this.text = h3, this.end = g2, n2 = 3;
        break;
      default:
        this.write = _2, this.end = v2;
        return;
    }
    this.lastNeed = 0, this.lastTotal = 0, this.lastChar = t.allocUnsafe(n2);
  }
  a2.prototype.write = function(e2) {
    if (e2.length === 0) return ``;
    var t2, n2;
    if (this.lastNeed) {
      if (t2 = this.fillLast(e2), t2 === void 0) return ``;
      n2 = this.lastNeed, this.lastNeed = 0;
    } else n2 = 0;
    return n2 < e2.length ? t2 ? t2 + this.text(e2, n2) : this.text(e2, n2) : t2 || ``;
  }, a2.prototype.end = d2, a2.prototype.text = u2, a2.prototype.fillLast = function(e2) {
    if (this.lastNeed <= e2.length) return e2.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    e2.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e2.length), this.lastNeed -= e2.length;
  };
  function o2(e2) {
    return e2 <= 127 ? 0 : e2 >> 5 == 6 ? 2 : e2 >> 4 == 14 ? 3 : e2 >> 3 == 30 ? 4 : e2 >> 6 == 2 ? -1 : -2;
  }
  function s2(e2, t2, n2) {
    var r2 = t2.length - 1;
    if (r2 < n2) return 0;
    var i3 = o2(t2[r2]);
    return i3 >= 0 ? (i3 > 0 && (e2.lastNeed = i3 - 1), i3) : --r2 < n2 || i3 === -2 ? 0 : (i3 = o2(t2[r2]), i3 >= 0 ? (i3 > 0 && (e2.lastNeed = i3 - 2), i3) : --r2 < n2 || i3 === -2 ? 0 : (i3 = o2(t2[r2]), i3 >= 0 ? (i3 > 0 && (i3 === 2 ? i3 = 0 : e2.lastNeed = i3 - 3), i3) : 0));
  }
  function c2(e2, t2, n2) {
    if ((t2[0] & 192) != 128) return e2.lastNeed = 0, `\uFFFD`;
    if (e2.lastNeed > 1 && t2.length > 1) {
      if ((t2[1] & 192) != 128) return e2.lastNeed = 1, `\uFFFD`;
      if (e2.lastNeed > 2 && t2.length > 2 && (t2[2] & 192) != 128) return e2.lastNeed = 2, `\uFFFD`;
    }
  }
  function l2(e2) {
    var t2 = this.lastTotal - this.lastNeed, n2 = c2(this, e2, t2);
    if (n2 !== void 0) return n2;
    if (this.lastNeed <= e2.length) return e2.copy(this.lastChar, t2, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
    e2.copy(this.lastChar, t2, 0, e2.length), this.lastNeed -= e2.length;
  }
  function u2(e2, t2) {
    var n2 = s2(this, e2, t2);
    if (!this.lastNeed) return e2.toString(`utf8`, t2);
    this.lastTotal = n2;
    var r2 = e2.length - (n2 - this.lastNeed);
    return e2.copy(this.lastChar, 0, r2), e2.toString(`utf8`, t2, r2);
  }
  function d2(e2) {
    var t2 = e2 && e2.length ? this.write(e2) : ``;
    return this.lastNeed ? t2 + `\uFFFD` : t2;
  }
  function f3(e2, t2) {
    if ((e2.length - t2) % 2 == 0) {
      var n2 = e2.toString(`utf16le`, t2);
      if (n2) {
        var r2 = n2.charCodeAt(n2.length - 1);
        if (r2 >= 55296 && r2 <= 56319) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = e2[e2.length - 2], this.lastChar[1] = e2[e2.length - 1], n2.slice(0, -1);
      }
      return n2;
    }
    return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = e2[e2.length - 1], e2.toString(`utf16le`, t2, e2.length - 1);
  }
  function m3(e2) {
    var t2 = e2 && e2.length ? this.write(e2) : ``;
    if (this.lastNeed) {
      var n2 = this.lastTotal - this.lastNeed;
      return t2 + this.lastChar.toString(`utf16le`, 0, n2);
    }
    return t2;
  }
  function h3(e2, t2) {
    var n2 = (e2.length - t2) % 3;
    return n2 === 0 ? e2.toString(`base64`, t2) : (this.lastNeed = 3 - n2, this.lastTotal = 3, n2 === 1 ? this.lastChar[0] = e2[e2.length - 1] : (this.lastChar[0] = e2[e2.length - 2], this.lastChar[1] = e2[e2.length - 1]), e2.toString(`base64`, t2, e2.length - n2));
  }
  function g2(e2) {
    var t2 = e2 && e2.length ? this.write(e2) : ``;
    return this.lastNeed ? t2 + this.lastChar.toString(`base64`, 0, 3 - this.lastNeed) : t2;
  }
  function _2(e2) {
    return e2.toString(this.encoding);
  }
  function v2(e2) {
    return e2 && e2.length ? this.write(e2) : ``;
  }
}));
var rt = f(((t, n) => {
  let r = Je(), { PromisePrototypeThen: i2, SymbolAsyncIterator: a2, SymbolIterator: o2 } = Ve(), { Buffer: s2 } = h(`buffer`), { ERR_INVALID_ARG_TYPE: c2, ERR_STREAM_NULL_VALUES: l2 } = Ue().codes;
  function u2(e, t2, n2) {
    let u3;
    if (typeof t2 == `string` || t2 instanceof s2) return new e({ objectMode: true, ...n2, read() {
      this.push(t2), this.push(null);
    } });
    let d2;
    if (t2 && t2[a2]) d2 = true, u3 = t2[a2]();
    else if (t2 && t2[o2]) d2 = false, u3 = t2[o2]();
    else throw new c2(`iterable`, [`Iterable`], t2);
    let f3 = new e({ objectMode: true, highWaterMark: 1, ...n2 }), p2 = false;
    f3._read = function() {
      p2 || (p2 = true, h3());
    }, f3._destroy = function(e2, t3) {
      i2(m3(e2), () => r.nextTick(t3, e2), (n3) => r.nextTick(t3, n3 || e2));
    };
    async function m3(e2) {
      let t3 = e2 != null, n3 = typeof u3.throw == `function`;
      if (t3 && n3) {
        let { value: t4, done: n4 } = await u3.throw(e2);
        if (await t4, n4) return;
      }
      if (typeof u3.return == `function`) {
        let { value: e3 } = await u3.return();
        await e3;
      }
    }
    async function h3() {
      for (; ; ) {
        try {
          let { value: e2, done: t3 } = d2 ? await u3.next() : u3.next();
          if (t3) f3.push(null);
          else {
            let t4 = e2 && typeof e2.then == `function` ? await e2 : e2;
            if (t4 === null) throw p2 = false, new l2();
            if (f3.push(t4)) continue;
            p2 = false;
          }
        } catch (e2) {
          f3.destroy(e2);
        }
        break;
      }
    }
    return f3;
  }
  n.exports = u2;
}));
var it = f(((t, n) => {
  let r = Je(), { ArrayPrototypeIndexOf: i2, NumberIsInteger: a2, NumberIsNaN: o2, NumberParseInt: s2, ObjectDefineProperties: c2, ObjectKeys: l2, ObjectSetPrototypeOf: u2, Promise: d2, SafeSet: f3, SymbolAsyncDispose: p2, SymbolAsyncIterator: m3, Symbol: h3 } = Ve();
  n.exports = H2, H2.ReadableState = V2;
  let { EventEmitter: g2 } = h(`events`), { Stream: _2, prependListener: v2 } = Qe(), { Buffer: y2 } = h(`buffer`), { addAbortSignal: b2 } = $e(), x2 = Xe(), S2 = Ke().debuglog(`stream`, (e) => {
    S2 = e;
  }), C2 = et(), w2 = Ze(), { getHighWaterMark: T2, getDefaultHighWaterMark: E2 } = tt(), { aggregateTwoErrors: D2, codes: { ERR_INVALID_ARG_TYPE: O2, ERR_METHOD_NOT_IMPLEMENTED: k3, ERR_OUT_OF_RANGE: A2, ERR_STREAM_PUSH_AFTER_EOF: j2, ERR_STREAM_UNSHIFT_AFTER_END_EVENT: M2 }, AbortError: N2 } = Ue(), { validateObject: P2 } = qe(), F2 = h3(`kPaused`), { StringDecoder: ee2 } = nt(), I2 = rt();
  u2(H2.prototype, _2.prototype), u2(H2, _2);
  let L2 = () => {
  }, { errorOrDestroy: R2 } = w2, te2 = 2048, ne2 = 4096, z2 = 65536;
  function B2(e) {
    return { enumerable: false, get() {
      return (this.state & e) !== 0;
    }, set(t2) {
      t2 ? this.state |= e : this.state &= ~e;
    } };
  }
  c2(V2.prototype, { objectMode: B2(1), ended: B2(2), endEmitted: B2(4), reading: B2(8), constructed: B2(16), sync: B2(32), needReadable: B2(64), emittedReadable: B2(128), readableListening: B2(256), resumeScheduled: B2(512), errorEmitted: B2(1024), emitClose: B2(te2), autoDestroy: B2(ne2), destroyed: B2(8192), closed: B2(16384), closeEmitted: B2(32768), multiAwaitDrain: B2(z2), readingMore: B2(131072), dataEmitted: B2(262144) });
  function V2(e, t2, n2) {
    typeof n2 != `boolean` && (n2 = t2 instanceof st()), this.state = 6192, e && e.objectMode && (this.state |= 1), n2 && e && e.readableObjectMode && (this.state |= 1), this.highWaterMark = e ? T2(this, e, `readableHighWaterMark`, n2) : E2(false), this.buffer = new C2(), this.length = 0, this.pipes = [], this.flowing = null, this[F2] = null, e && e.emitClose === false && (this.state &= ~te2), e && e.autoDestroy === false && (this.state &= ~ne2), this.errored = null, this.defaultEncoding = e && e.defaultEncoding || `utf8`, this.awaitDrainWriters = null, this.decoder = null, this.encoding = null, e && e.encoding && (this.decoder = new ee2(e.encoding), this.encoding = e.encoding);
  }
  function H2(e) {
    if (!(this instanceof H2)) return new H2(e);
    let t2 = this instanceof st();
    this._readableState = new V2(e, this, t2), e && (typeof e.read == `function` && (this._read = e.read), typeof e.destroy == `function` && (this._destroy = e.destroy), typeof e.construct == `function` && (this._construct = e.construct), e.signal && !t2 && b2(e.signal, this)), _2.call(this, e), w2.construct(this, () => {
      this._readableState.needReadable && G2(this, this._readableState);
    });
  }
  H2.prototype.destroy = w2.destroy, H2.prototype._undestroy = w2.undestroy, H2.prototype._destroy = function(e, t2) {
    t2(e);
  }, H2.prototype[g2.captureRejectionSymbol] = function(e) {
    this.destroy(e);
  }, H2.prototype[p2] = function() {
    let e;
    return this.destroyed || (e = this.readableEnded ? null : new N2(), this.destroy(e)), new d2((t2, n2) => x2(this, (r2) => r2 && r2 !== e ? n2(r2) : t2(null)));
  }, H2.prototype.push = function(e, t2) {
    return re2(this, e, t2, false);
  }, H2.prototype.unshift = function(e, t2) {
    return re2(this, e, t2, true);
  };
  function re2(e, t2, n2, r2) {
    S2(`readableAddChunk`, t2);
    let i3 = e._readableState, a3;
    if (i3.state & 1 || (typeof t2 == `string` ? (n2 ||= i3.defaultEncoding, i3.encoding !== n2 && (r2 && i3.encoding ? t2 = y2.from(t2, n2).toString(i3.encoding) : (t2 = y2.from(t2, n2), n2 = ``))) : t2 instanceof y2 ? n2 = `` : _2._isUint8Array(t2) ? (t2 = _2._uint8ArrayToBuffer(t2), n2 = ``) : t2 != null && (a3 = new O2(`chunk`, [`string`, `Buffer`, `Uint8Array`], t2))), a3) R2(e, a3);
    else if (t2 === null) i3.state &= -9, W2(e, i3);
    else if (i3.state & 1 || t2 && t2.length > 0) if (r2) if (i3.state & 4) R2(e, new M2());
    else if (i3.destroyed || i3.errored) return false;
    else ie2(e, i3, t2, true);
    else if (i3.ended) R2(e, new j2());
    else if (i3.destroyed || i3.errored) return false;
    else i3.state &= -9, i3.decoder && !n2 ? (t2 = i3.decoder.write(t2), i3.objectMode || t2.length !== 0 ? ie2(e, i3, t2, false) : G2(e, i3)) : ie2(e, i3, t2, false);
    else r2 || (i3.state &= -9, G2(e, i3));
    return !i3.ended && (i3.length < i3.highWaterMark || i3.length === 0);
  }
  function ie2(e, t2, n2, r2) {
    t2.flowing && t2.length === 0 && !t2.sync && e.listenerCount(`data`) > 0 ? ((t2.state & z2) === 0 ? t2.awaitDrainWriters = null : t2.awaitDrainWriters.clear(), t2.dataEmitted = true, e.emit(`data`, n2)) : (t2.length += t2.objectMode ? 1 : n2.length, r2 ? t2.buffer.unshift(n2) : t2.buffer.push(n2), t2.state & 64 && oe2(e)), G2(e, t2);
  }
  H2.prototype.isPaused = function() {
    let e = this._readableState;
    return e[F2] === true || e.flowing === false;
  }, H2.prototype.setEncoding = function(e) {
    let t2 = new ee2(e);
    this._readableState.decoder = t2, this._readableState.encoding = this._readableState.decoder.encoding;
    let n2 = this._readableState.buffer, r2 = ``;
    for (let e2 of n2) r2 += t2.write(e2);
    return n2.clear(), r2 !== `` && n2.push(r2), this._readableState.length = r2.length, this;
  };
  function ae2(e) {
    if (e > 1073741824) throw new A2(`size`, `<= 1GiB`, e);
    return e--, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e++, e;
  }
  function U2(e, t2) {
    return e <= 0 || t2.length === 0 && t2.ended ? 0 : t2.state & 1 ? 1 : o2(e) ? t2.flowing && t2.length ? t2.buffer.first().length : t2.length : e <= t2.length ? e : t2.ended ? t2.length : 0;
  }
  H2.prototype.read = function(e) {
    S2(`read`, e), e === void 0 ? e = NaN : a2(e) || (e = s2(e, 10));
    let t2 = this._readableState, n2 = e;
    if (e > t2.highWaterMark && (t2.highWaterMark = ae2(e)), e !== 0 && (t2.state &= -129), e === 0 && t2.needReadable && ((t2.highWaterMark === 0 ? t2.length > 0 : t2.length >= t2.highWaterMark) || t2.ended)) return S2(`read: emitReadable`, t2.length, t2.ended), t2.length === 0 && t2.ended ? Q2(this) : oe2(this), null;
    if (e = U2(e, t2), e === 0 && t2.ended) return t2.length === 0 && Q2(this), null;
    let r2 = (t2.state & 64) != 0;
    if (S2(`need readable`, r2), (t2.length === 0 || t2.length - e < t2.highWaterMark) && (r2 = true, S2(`length less than watermark`, r2)), t2.ended || t2.reading || t2.destroyed || t2.errored || !t2.constructed) r2 = false, S2(`reading, ended or constructing`, r2);
    else if (r2) {
      S2(`do read`), t2.state |= 40, t2.length === 0 && (t2.state |= 64);
      try {
        this._read(t2.highWaterMark);
      } catch (e2) {
        R2(this, e2);
      }
      t2.state &= -33, t2.reading || (e = U2(n2, t2));
    }
    let i3;
    return i3 = e > 0 ? de2(e, t2) : null, i3 === null ? (t2.needReadable = t2.length <= t2.highWaterMark, e = 0) : (t2.length -= e, t2.multiAwaitDrain ? t2.awaitDrainWriters.clear() : t2.awaitDrainWriters = null), t2.length === 0 && (t2.ended || (t2.needReadable = true), n2 !== e && t2.ended && Q2(this)), i3 !== null && !t2.errorEmitted && !t2.closeEmitted && (t2.dataEmitted = true, this.emit(`data`, i3)), i3;
  };
  function W2(e, t2) {
    if (S2(`onEofChunk`), !t2.ended) {
      if (t2.decoder) {
        let e2 = t2.decoder.end();
        e2 && e2.length && (t2.buffer.push(e2), t2.length += t2.objectMode ? 1 : e2.length);
      }
      t2.ended = true, t2.sync ? oe2(e) : (t2.needReadable = false, t2.emittedReadable = true, se2(e));
    }
  }
  function oe2(e) {
    let t2 = e._readableState;
    S2(`emitReadable`, t2.needReadable, t2.emittedReadable), t2.needReadable = false, t2.emittedReadable || (S2(`emitReadable`, t2.flowing), t2.emittedReadable = true, r.nextTick(se2, e));
  }
  function se2(e) {
    let t2 = e._readableState;
    S2(`emitReadable_`, t2.destroyed, t2.length, t2.ended), !t2.destroyed && !t2.errored && (t2.length || t2.ended) && (e.emit(`readable`), t2.emittedReadable = false), t2.needReadable = !t2.flowing && !t2.ended && t2.length <= t2.highWaterMark, Y2(e);
  }
  function G2(e, t2) {
    !t2.readingMore && t2.constructed && (t2.readingMore = true, r.nextTick(K2, e, t2));
  }
  function K2(e, t2) {
    for (; !t2.reading && !t2.ended && (t2.length < t2.highWaterMark || t2.flowing && t2.length === 0); ) {
      let n2 = t2.length;
      if (S2(`maybeReadMore read 0`), e.read(0), n2 === t2.length) break;
    }
    t2.readingMore = false;
  }
  H2.prototype._read = function(e) {
    throw new k3(`_read()`);
  }, H2.prototype.pipe = function(e, t2) {
    let n2 = this, i3 = this._readableState;
    i3.pipes.length === 1 && (i3.multiAwaitDrain || (i3.multiAwaitDrain = true, i3.awaitDrainWriters = new f3(i3.awaitDrainWriters ? [i3.awaitDrainWriters] : []))), i3.pipes.push(e), S2(`pipe count=%d opts=%j`, i3.pipes.length, t2);
    let a3 = (!t2 || t2.end !== false) && e !== r.stdout && e !== r.stderr ? s3 : _3;
    i3.endEmitted ? r.nextTick(a3) : n2.once(`end`, a3), e.on(`unpipe`, o3);
    function o3(e2, t3) {
      S2(`onunpipe`), e2 === n2 && t3 && t3.hasUnpiped === false && (t3.hasUnpiped = true, u3());
    }
    function s3() {
      S2(`onend`), e.end();
    }
    let c3, l3 = false;
    function u3() {
      S2(`cleanup`), e.removeListener(`close`, h4), e.removeListener(`finish`, g3), c3 && e.removeListener(`drain`, c3), e.removeListener(`error`, m4), e.removeListener(`unpipe`, o3), n2.removeListener(`end`, s3), n2.removeListener(`end`, _3), n2.removeListener(`data`, p3), l3 = true, c3 && i3.awaitDrainWriters && (!e._writableState || e._writableState.needDrain) && c3();
    }
    function d3() {
      l3 || (i3.pipes.length === 1 && i3.pipes[0] === e ? (S2(`false write response, pause`, 0), i3.awaitDrainWriters = e, i3.multiAwaitDrain = false) : i3.pipes.length > 1 && i3.pipes.includes(e) && (S2(`false write response, pause`, i3.awaitDrainWriters.size), i3.awaitDrainWriters.add(e)), n2.pause()), c3 || (c3 = ce2(n2, e), e.on(`drain`, c3));
    }
    n2.on(`data`, p3);
    function p3(t3) {
      S2(`ondata`);
      let n3 = e.write(t3);
      S2(`dest.write`, n3), n3 === false && d3();
    }
    function m4(t3) {
      if (S2(`onerror`, t3), _3(), e.removeListener(`error`, m4), e.listenerCount(`error`) === 0) {
        let n3 = e._writableState || e._readableState;
        n3 && !n3.errorEmitted ? R2(e, t3) : e.emit(`error`, t3);
      }
    }
    v2(e, `error`, m4);
    function h4() {
      e.removeListener(`finish`, g3), _3();
    }
    e.once(`close`, h4);
    function g3() {
      S2(`onfinish`), e.removeListener(`close`, h4), _3();
    }
    e.once(`finish`, g3);
    function _3() {
      S2(`unpipe`), n2.unpipe(e);
    }
    return e.emit(`pipe`, n2), e.writableNeedDrain === true ? d3() : i3.flowing || (S2(`pipe resume`), n2.resume()), e;
  };
  function ce2(e, t2) {
    return function() {
      let n2 = e._readableState;
      n2.awaitDrainWriters === t2 ? (S2(`pipeOnDrain`, 1), n2.awaitDrainWriters = null) : n2.multiAwaitDrain && (S2(`pipeOnDrain`, n2.awaitDrainWriters.size), n2.awaitDrainWriters.delete(t2)), (!n2.awaitDrainWriters || n2.awaitDrainWriters.size === 0) && e.listenerCount(`data`) && e.resume();
    };
  }
  H2.prototype.unpipe = function(e) {
    let t2 = this._readableState, n2 = { hasUnpiped: false };
    if (t2.pipes.length === 0) return this;
    if (!e) {
      let e2 = t2.pipes;
      t2.pipes = [], this.pause();
      for (let t3 = 0; t3 < e2.length; t3++) e2[t3].emit(`unpipe`, this, { hasUnpiped: false });
      return this;
    }
    let r2 = i2(t2.pipes, e);
    return r2 === -1 ? this : (t2.pipes.splice(r2, 1), t2.pipes.length === 0 && this.pause(), e.emit(`unpipe`, this, n2), this);
  }, H2.prototype.on = function(e, t2) {
    let n2 = _2.prototype.on.call(this, e, t2), i3 = this._readableState;
    return e === `data` ? (i3.readableListening = this.listenerCount(`readable`) > 0, i3.flowing !== false && this.resume()) : e === `readable` && !i3.endEmitted && !i3.readableListening && (i3.readableListening = i3.needReadable = true, i3.flowing = false, i3.emittedReadable = false, S2(`on readable`, i3.length, i3.reading), i3.length ? oe2(this) : i3.reading || r.nextTick(q2, this)), n2;
  }, H2.prototype.addListener = H2.prototype.on, H2.prototype.removeListener = function(e, t2) {
    let n2 = _2.prototype.removeListener.call(this, e, t2);
    return e === `readable` && r.nextTick(le2, this), n2;
  }, H2.prototype.off = H2.prototype.removeListener, H2.prototype.removeAllListeners = function(e) {
    let t2 = _2.prototype.removeAllListeners.apply(this, arguments);
    return (e === `readable` || e === void 0) && r.nextTick(le2, this), t2;
  };
  function le2(e) {
    let t2 = e._readableState;
    t2.readableListening = e.listenerCount(`readable`) > 0, t2.resumeScheduled && t2[F2] === false ? t2.flowing = true : e.listenerCount(`data`) > 0 ? e.resume() : t2.readableListening || (t2.flowing = null);
  }
  function q2(e) {
    S2(`readable nexttick read 0`), e.read(0);
  }
  H2.prototype.resume = function() {
    let e = this._readableState;
    return e.flowing || (S2(`resume`), e.flowing = !e.readableListening, ue2(this, e)), e[F2] = false, this;
  };
  function ue2(e, t2) {
    t2.resumeScheduled || (t2.resumeScheduled = true, r.nextTick(J2, e, t2));
  }
  function J2(e, t2) {
    S2(`resume`, t2.reading), t2.reading || e.read(0), t2.resumeScheduled = false, e.emit(`resume`), Y2(e), t2.flowing && !t2.reading && e.read(0);
  }
  H2.prototype.pause = function() {
    return S2(`call pause flowing=%j`, this._readableState.flowing), this._readableState.flowing !== false && (S2(`pause`), this._readableState.flowing = false, this.emit(`pause`)), this._readableState[F2] = true, this;
  };
  function Y2(e) {
    let t2 = e._readableState;
    for (S2(`flow`, t2.flowing); t2.flowing && e.read() !== null; ) ;
  }
  H2.prototype.wrap = function(e) {
    let t2 = false;
    e.on(`data`, (n3) => {
      !this.push(n3) && e.pause && (t2 = true, e.pause());
    }), e.on(`end`, () => {
      this.push(null);
    }), e.on(`error`, (e2) => {
      R2(this, e2);
    }), e.on(`close`, () => {
      this.destroy();
    }), e.on(`destroy`, () => {
      this.destroy();
    }), this._read = () => {
      t2 && e.resume && (t2 = false, e.resume());
    };
    let n2 = l2(e);
    for (let t3 = 1; t3 < n2.length; t3++) {
      let r2 = n2[t3];
      this[r2] === void 0 && typeof e[r2] == `function` && (this[r2] = e[r2].bind(e));
    }
    return this;
  }, H2.prototype[m3] = function() {
    return X2(this);
  }, H2.prototype.iterator = function(e) {
    return e !== void 0 && P2(e, `options`), X2(this, e);
  };
  function X2(e, t2) {
    typeof e.read != `function` && (e = H2.wrap(e, { objectMode: true }));
    let n2 = Z2(e, t2);
    return n2.stream = e, n2;
  }
  async function* Z2(e, t2) {
    let n2 = L2;
    function r2(t3) {
      this === e ? (n2(), n2 = L2) : n2 = t3;
    }
    e.on(`readable`, r2);
    let i3, a3 = x2(e, { writable: false }, (e2) => {
      i3 = e2 ? D2(i3, e2) : null, n2(), n2 = L2;
    });
    try {
      for (; ; ) {
        let t3 = e.destroyed ? null : e.read();
        if (t3 !== null) yield t3;
        else if (i3) throw i3;
        else if (i3 === null) return;
        else await new d2(r2);
      }
    } catch (e2) {
      throw i3 = D2(i3, e2), i3;
    } finally {
      (i3 || t2?.destroyOnReturn !== false) && (i3 === void 0 || e._readableState.autoDestroy) ? w2.destroyer(e, null) : (e.off(`readable`, r2), a3());
    }
  }
  c2(H2.prototype, { readable: { __proto__: null, get() {
    let e = this._readableState;
    return !!e && e.readable !== false && !e.destroyed && !e.errorEmitted && !e.endEmitted;
  }, set(e) {
    this._readableState && (this._readableState.readable = !!e);
  } }, readableDidRead: { __proto__: null, enumerable: false, get: function() {
    return this._readableState.dataEmitted;
  } }, readableAborted: { __proto__: null, enumerable: false, get: function() {
    return !!(this._readableState.readable !== false && (this._readableState.destroyed || this._readableState.errored) && !this._readableState.endEmitted);
  } }, readableHighWaterMark: { __proto__: null, enumerable: false, get: function() {
    return this._readableState.highWaterMark;
  } }, readableBuffer: { __proto__: null, enumerable: false, get: function() {
    return this._readableState && this._readableState.buffer;
  } }, readableFlowing: { __proto__: null, enumerable: false, get: function() {
    return this._readableState.flowing;
  }, set: function(e) {
    this._readableState && (this._readableState.flowing = e);
  } }, readableLength: { __proto__: null, enumerable: false, get() {
    return this._readableState.length;
  } }, readableObjectMode: { __proto__: null, enumerable: false, get() {
    return this._readableState ? this._readableState.objectMode : false;
  } }, readableEncoding: { __proto__: null, enumerable: false, get() {
    return this._readableState ? this._readableState.encoding : null;
  } }, errored: { __proto__: null, enumerable: false, get() {
    return this._readableState ? this._readableState.errored : null;
  } }, closed: { __proto__: null, get() {
    return this._readableState ? this._readableState.closed : false;
  } }, destroyed: { __proto__: null, enumerable: false, get() {
    return this._readableState ? this._readableState.destroyed : false;
  }, set(e) {
    this._readableState && (this._readableState.destroyed = e);
  } }, readableEnded: { __proto__: null, enumerable: false, get() {
    return this._readableState ? this._readableState.endEmitted : false;
  } } }), c2(V2.prototype, { pipesCount: { __proto__: null, get() {
    return this.pipes.length;
  } }, paused: { __proto__: null, get() {
    return this[F2] !== false;
  }, set(e) {
    this[F2] = !!e;
  } } }), H2._fromList = de2;
  function de2(e, t2) {
    if (t2.length === 0) return null;
    let n2;
    return t2.objectMode ? n2 = t2.buffer.shift() : !e || e >= t2.length ? (n2 = t2.decoder ? t2.buffer.join(``) : t2.buffer.length === 1 ? t2.buffer.first() : t2.buffer.concat(t2.length), t2.buffer.clear()) : n2 = t2.buffer.consume(e, t2.decoder), n2;
  }
  function Q2(e) {
    let t2 = e._readableState;
    S2(`endReadable`, t2.endEmitted), t2.endEmitted || (t2.ended = true, r.nextTick(fe2, t2, e));
  }
  function fe2(e, t2) {
    if (S2(`endReadableNT`, e.endEmitted, e.length), !e.errored && !e.closeEmitted && !e.endEmitted && e.length === 0) {
      if (e.endEmitted = true, t2.emit(`end`), t2.writable && t2.allowHalfOpen === false) r.nextTick(pe2, t2);
      else if (e.autoDestroy) {
        let e2 = t2._writableState;
        (!e2 || e2.autoDestroy && (e2.finished || e2.writable === false)) && t2.destroy();
      }
    }
  }
  function pe2(e) {
    e.writable && !e.writableEnded && !e.destroyed && e.end();
  }
  H2.from = function(e, t2) {
    return I2(H2, e, t2);
  };
  let $2;
  function me2() {
    return $2 === void 0 && ($2 = {}), $2;
  }
  H2.fromWeb = function(e, t2) {
    return me2().newStreamReadableFromReadableStream(e, t2);
  }, H2.toWeb = function(e, t2) {
    return me2().newReadableStreamFromStreamReadable(e, t2);
  }, H2.wrap = function(e, t2) {
    return new H2({ objectMode: e.readableObjectMode ?? e.objectMode ?? true, ...t2, destroy(t3, n2) {
      w2.destroyer(e, t3), n2(t3);
    } }).wrap(e);
  };
}));
var at = f(((t, n) => {
  let r = Je(), { ArrayPrototypeSlice: i2, Error: a2, FunctionPrototypeSymbolHasInstance: o2, ObjectDefineProperty: s2, ObjectDefineProperties: c2, ObjectSetPrototypeOf: l2, StringPrototypeToLowerCase: u2, Symbol: d2, SymbolHasInstance: f3 } = Ve();
  n.exports = P2, P2.WritableState = M2;
  let { EventEmitter: p2 } = h(`events`), m3 = Qe().Stream, { Buffer: h3 } = h(`buffer`), g2 = Ze(), { addAbortSignal: _2 } = $e(), { getHighWaterMark: v2, getDefaultHighWaterMark: y2 } = tt(), { ERR_INVALID_ARG_TYPE: b2, ERR_METHOD_NOT_IMPLEMENTED: x2, ERR_MULTIPLE_CALLBACK: S2, ERR_STREAM_CANNOT_PIPE: C2, ERR_STREAM_DESTROYED: w2, ERR_STREAM_ALREADY_FINISHED: T2, ERR_STREAM_NULL_VALUES: E2, ERR_STREAM_WRITE_AFTER_END: D2, ERR_UNKNOWN_ENCODING: O2 } = Ue().codes, { errorOrDestroy: k3 } = g2;
  l2(P2.prototype, m3.prototype), l2(P2, m3);
  function A2() {
  }
  let j2 = d2(`kOnFinished`);
  function M2(e, t2, n2) {
    typeof n2 != `boolean` && (n2 = t2 instanceof st()), this.objectMode = !!(e && e.objectMode), n2 && (this.objectMode = this.objectMode || !!(e && e.writableObjectMode)), this.highWaterMark = e ? v2(this, e, `writableHighWaterMark`, n2) : y2(false), this.finalCalled = false, this.needDrain = false, this.ending = false, this.ended = false, this.finished = false, this.destroyed = false;
    let r2 = !!(e && e.decodeStrings === false);
    this.decodeStrings = !r2, this.defaultEncoding = e && e.defaultEncoding || `utf8`, this.length = 0, this.writing = false, this.corked = 0, this.sync = true, this.bufferProcessing = false, this.onwrite = R2.bind(void 0, t2), this.writecb = null, this.writelen = 0, this.afterWriteTickInfo = null, N2(this), this.pendingcb = 0, this.constructed = true, this.prefinished = false, this.errorEmitted = false, this.emitClose = !e || e.emitClose !== false, this.autoDestroy = !e || e.autoDestroy !== false, this.errored = null, this.closed = false, this.closeEmitted = false, this[j2] = [];
  }
  function N2(e) {
    e.buffered = [], e.bufferedIndex = 0, e.allBuffers = true, e.allNoop = true;
  }
  M2.prototype.getBuffer = function() {
    return i2(this.buffered, this.bufferedIndex);
  }, s2(M2.prototype, `bufferedRequestCount`, { __proto__: null, get() {
    return this.buffered.length - this.bufferedIndex;
  } });
  function P2(e) {
    let t2 = this instanceof st();
    if (!t2 && !o2(P2, this)) return new P2(e);
    this._writableState = new M2(e, this, t2), e && (typeof e.write == `function` && (this._write = e.write), typeof e.writev == `function` && (this._writev = e.writev), typeof e.destroy == `function` && (this._destroy = e.destroy), typeof e.final == `function` && (this._final = e.final), typeof e.construct == `function` && (this._construct = e.construct), e.signal && _2(e.signal, this)), m3.call(this, e), g2.construct(this, () => {
      let e2 = this._writableState;
      e2.writing || B2(this, e2), ie2(this, e2);
    });
  }
  s2(P2, f3, { __proto__: null, value: function(e) {
    return o2(this, e) ? true : this === P2 ? e && e._writableState instanceof M2 : false;
  } }), P2.prototype.pipe = function() {
    k3(this, new C2());
  };
  function F2(e, t2, n2, i3) {
    let a3 = e._writableState;
    if (typeof n2 == `function`) i3 = n2, n2 = a3.defaultEncoding;
    else {
      if (!n2) n2 = a3.defaultEncoding;
      else if (n2 !== `buffer` && !h3.isEncoding(n2)) throw new O2(n2);
      typeof i3 != `function` && (i3 = A2);
    }
    if (t2 === null) throw new E2();
    if (!a3.objectMode) if (typeof t2 == `string`) a3.decodeStrings !== false && (t2 = h3.from(t2, n2), n2 = `buffer`);
    else if (t2 instanceof h3) n2 = `buffer`;
    else if (m3._isUint8Array(t2)) t2 = m3._uint8ArrayToBuffer(t2), n2 = `buffer`;
    else throw new b2(`chunk`, [`string`, `Buffer`, `Uint8Array`], t2);
    let o3;
    return a3.ending ? o3 = new D2() : a3.destroyed && (o3 = new w2(`write`)), o3 ? (r.nextTick(i3, o3), k3(e, o3, true), o3) : (a3.pendingcb++, ee2(e, a3, t2, n2, i3));
  }
  P2.prototype.write = function(e, t2, n2) {
    return F2(this, e, t2, n2) === true;
  }, P2.prototype.cork = function() {
    this._writableState.corked++;
  }, P2.prototype.uncork = function() {
    let e = this._writableState;
    e.corked && (e.corked--, e.writing || B2(this, e));
  }, P2.prototype.setDefaultEncoding = function(e) {
    if (typeof e == `string` && (e = u2(e)), !h3.isEncoding(e)) throw new O2(e);
    return this._writableState.defaultEncoding = e, this;
  };
  function ee2(e, t2, n2, r2, i3) {
    let a3 = t2.objectMode ? 1 : n2.length;
    t2.length += a3;
    let o3 = t2.length < t2.highWaterMark;
    return o3 || (t2.needDrain = true), t2.writing || t2.corked || t2.errored || !t2.constructed ? (t2.buffered.push({ chunk: n2, encoding: r2, callback: i3 }), t2.allBuffers && r2 !== `buffer` && (t2.allBuffers = false), t2.allNoop && i3 !== A2 && (t2.allNoop = false)) : (t2.writelen = a3, t2.writecb = i3, t2.writing = true, t2.sync = true, e._write(n2, r2, t2.onwrite), t2.sync = false), o3 && !t2.errored && !t2.destroyed;
  }
  function I2(e, t2, n2, r2, i3, a3, o3) {
    t2.writelen = r2, t2.writecb = o3, t2.writing = true, t2.sync = true, t2.destroyed ? t2.onwrite(new w2(`write`)) : n2 ? e._writev(i3, t2.onwrite) : e._write(i3, a3, t2.onwrite), t2.sync = false;
  }
  function L2(e, t2, n2, r2) {
    --t2.pendingcb, r2(n2), z2(t2), k3(e, n2);
  }
  function R2(e, t2) {
    let n2 = e._writableState, i3 = n2.sync, a3 = n2.writecb;
    if (typeof a3 != `function`) {
      k3(e, new S2());
      return;
    }
    n2.writing = false, n2.writecb = null, n2.length -= n2.writelen, n2.writelen = 0, t2 ? (t2.stack, n2.errored ||= t2, e._readableState && !e._readableState.errored && (e._readableState.errored = t2), i3 ? r.nextTick(L2, e, n2, t2, a3) : L2(e, n2, t2, a3)) : (n2.buffered.length > n2.bufferedIndex && B2(e, n2), i3 ? n2.afterWriteTickInfo !== null && n2.afterWriteTickInfo.cb === a3 ? n2.afterWriteTickInfo.count++ : (n2.afterWriteTickInfo = { count: 1, cb: a3, stream: e, state: n2 }, r.nextTick(te2, n2.afterWriteTickInfo)) : ne2(e, n2, 1, a3));
  }
  function te2({ stream: e, state: t2, count: n2, cb: r2 }) {
    return t2.afterWriteTickInfo = null, ne2(e, t2, n2, r2);
  }
  function ne2(e, t2, n2, r2) {
    for (!t2.ending && !e.destroyed && t2.length === 0 && t2.needDrain && (t2.needDrain = false, e.emit(`drain`)); n2-- > 0; ) t2.pendingcb--, r2();
    t2.destroyed && z2(t2), ie2(e, t2);
  }
  function z2(e) {
    if (e.writing) return;
    for (let t3 = e.bufferedIndex; t3 < e.buffered.length; ++t3) {
      let { chunk: n2, callback: r2 } = e.buffered[t3], i3 = e.objectMode ? 1 : n2.length;
      e.length -= i3, r2(e.errored ?? new w2(`write`));
    }
    let t2 = e[j2].splice(0);
    for (let n2 = 0; n2 < t2.length; n2++) t2[n2](e.errored ?? new w2(`end`));
    N2(e);
  }
  function B2(e, t2) {
    if (t2.corked || t2.bufferProcessing || t2.destroyed || !t2.constructed) return;
    let { buffered: n2, bufferedIndex: r2, objectMode: a3 } = t2, o3 = n2.length - r2;
    if (!o3) return;
    let s3 = r2;
    if (t2.bufferProcessing = true, o3 > 1 && e._writev) {
      t2.pendingcb -= o3 - 1;
      let r3 = t2.allNoop ? A2 : (e2) => {
        for (let t3 = s3; t3 < n2.length; ++t3) n2[t3].callback(e2);
      }, a4 = t2.allNoop && s3 === 0 ? n2 : i2(n2, s3);
      a4.allBuffers = t2.allBuffers, I2(e, t2, true, t2.length, a4, ``, r3), N2(t2);
    } else {
      do {
        let { chunk: r3, encoding: i3, callback: o4 } = n2[s3];
        n2[s3++] = null, I2(e, t2, false, a3 ? 1 : r3.length, r3, i3, o4);
      } while (s3 < n2.length && !t2.writing);
      s3 === n2.length ? N2(t2) : s3 > 256 ? (n2.splice(0, s3), t2.bufferedIndex = 0) : t2.bufferedIndex = s3;
    }
    t2.bufferProcessing = false;
  }
  P2.prototype._write = function(e, t2, n2) {
    if (this._writev) this._writev([{ chunk: e, encoding: t2 }], n2);
    else throw new x2(`_write()`);
  }, P2.prototype._writev = null, P2.prototype.end = function(e, t2, n2) {
    let i3 = this._writableState;
    typeof e == `function` ? (n2 = e, e = null, t2 = null) : typeof t2 == `function` && (n2 = t2, t2 = null);
    let o3;
    if (e != null) {
      let n3 = F2(this, e, t2);
      n3 instanceof a2 && (o3 = n3);
    }
    return i3.corked && (i3.corked = 1, this.uncork()), o3 || (!i3.errored && !i3.ending ? (i3.ending = true, ie2(this, i3, true), i3.ended = true) : i3.finished ? o3 = new T2(`end`) : i3.destroyed && (o3 = new w2(`end`))), typeof n2 == `function` && (o3 || i3.finished ? r.nextTick(n2, o3) : i3[j2].push(n2)), this;
  };
  function V2(e) {
    return e.ending && !e.destroyed && e.constructed && e.length === 0 && !e.errored && e.buffered.length === 0 && !e.finished && !e.writing && !e.errorEmitted && !e.closeEmitted;
  }
  function H2(e, t2) {
    let n2 = false;
    function i3(i4) {
      if (n2) {
        k3(e, i4 ?? S2());
        return;
      }
      if (n2 = true, t2.pendingcb--, i4) {
        let n3 = t2[j2].splice(0);
        for (let e2 = 0; e2 < n3.length; e2++) n3[e2](i4);
        k3(e, i4, t2.sync);
      } else V2(t2) && (t2.prefinished = true, e.emit(`prefinish`), t2.pendingcb++, r.nextTick(ae2, e, t2));
    }
    t2.sync = true, t2.pendingcb++;
    try {
      e._final(i3);
    } catch (e2) {
      i3(e2);
    }
    t2.sync = false;
  }
  function re2(e, t2) {
    !t2.prefinished && !t2.finalCalled && (typeof e._final == `function` && !t2.destroyed ? (t2.finalCalled = true, H2(e, t2)) : (t2.prefinished = true, e.emit(`prefinish`)));
  }
  function ie2(e, t2, n2) {
    V2(t2) && (re2(e, t2), t2.pendingcb === 0 && (n2 ? (t2.pendingcb++, r.nextTick((e2, t3) => {
      V2(t3) ? ae2(e2, t3) : t3.pendingcb--;
    }, e, t2)) : V2(t2) && (t2.pendingcb++, ae2(e, t2))));
  }
  function ae2(e, t2) {
    t2.pendingcb--, t2.finished = true;
    let n2 = t2[j2].splice(0);
    for (let e2 = 0; e2 < n2.length; e2++) n2[e2]();
    if (e.emit(`finish`), t2.autoDestroy) {
      let t3 = e._readableState;
      (!t3 || t3.autoDestroy && (t3.endEmitted || t3.readable === false)) && e.destroy();
    }
  }
  c2(P2.prototype, { closed: { __proto__: null, get() {
    return this._writableState ? this._writableState.closed : false;
  } }, destroyed: { __proto__: null, get() {
    return this._writableState ? this._writableState.destroyed : false;
  }, set(e) {
    this._writableState && (this._writableState.destroyed = e);
  } }, writable: { __proto__: null, get() {
    let e = this._writableState;
    return !!e && e.writable !== false && !e.destroyed && !e.errored && !e.ending && !e.ended;
  }, set(e) {
    this._writableState && (this._writableState.writable = !!e);
  } }, writableFinished: { __proto__: null, get() {
    return this._writableState ? this._writableState.finished : false;
  } }, writableObjectMode: { __proto__: null, get() {
    return this._writableState ? this._writableState.objectMode : false;
  } }, writableBuffer: { __proto__: null, get() {
    return this._writableState && this._writableState.getBuffer();
  } }, writableEnded: { __proto__: null, get() {
    return this._writableState ? this._writableState.ending : false;
  } }, writableNeedDrain: { __proto__: null, get() {
    let e = this._writableState;
    return e ? !e.destroyed && !e.ending && e.needDrain : false;
  } }, writableHighWaterMark: { __proto__: null, get() {
    return this._writableState && this._writableState.highWaterMark;
  } }, writableCorked: { __proto__: null, get() {
    return this._writableState ? this._writableState.corked : 0;
  } }, writableLength: { __proto__: null, get() {
    return this._writableState && this._writableState.length;
  } }, errored: { __proto__: null, enumerable: false, get() {
    return this._writableState ? this._writableState.errored : null;
  } }, writableAborted: { __proto__: null, enumerable: false, get: function() {
    return !!(this._writableState.writable !== false && (this._writableState.destroyed || this._writableState.errored) && !this._writableState.finished);
  } } });
  let U2 = g2.destroy;
  P2.prototype.destroy = function(e, t2) {
    let n2 = this._writableState;
    return !n2.destroyed && (n2.bufferedIndex < n2.buffered.length || n2[j2].length) && r.nextTick(z2, n2), U2.call(this, e, t2), this;
  }, P2.prototype._undestroy = g2.undestroy, P2.prototype._destroy = function(e, t2) {
    t2(e);
  }, P2.prototype[p2.captureRejectionSymbol] = function(e) {
    this.destroy(e);
  };
  let W2;
  function oe2() {
    return W2 === void 0 && (W2 = {}), W2;
  }
  P2.fromWeb = function(e, t2) {
    return oe2().newStreamWritableFromWritableStream(e, t2);
  }, P2.toWeb = function(e) {
    return oe2().newWritableStreamFromStreamWritable(e);
  };
}));
var ot = f(((t, n) => {
  let r = Je(), i2 = h(`buffer`), { isReadable: a2, isWritable: o2, isIterable: s2, isNodeStream: c2, isReadableNodeStream: l2, isWritableNodeStream: u2, isDuplexNodeStream: d2, isReadableStream: f3, isWritableStream: p2 } = Ye(), m3 = Xe(), { AbortError: h3, codes: { ERR_INVALID_ARG_TYPE: g2, ERR_INVALID_RETURN_VALUE: _2 } } = Ue(), { destroyer: v2 } = Ze(), y2 = st(), b2 = it(), x2 = at(), { createDeferredPromise: S2 } = Ke(), C2 = rt(), w2 = globalThis.Blob || i2.Blob, T2 = w2 === void 0 ? function(e) {
    return false;
  } : function(e) {
    return e instanceof w2;
  }, E2 = globalThis.AbortController || Ge().AbortController, { FunctionPrototypeCall: D2 } = Ve();
  var O2 = class extends y2 {
    constructor(e) {
      super(e), e?.readable === false && (this._readableState.readable = false, this._readableState.ended = true, this._readableState.endEmitted = true), e?.writable === false && (this._writableState.writable = false, this._writableState.ending = true, this._writableState.ended = true, this._writableState.finished = true);
    }
  };
  n.exports = function e(t2, n2) {
    if (d2(t2)) return t2;
    if (l2(t2)) return A2({ readable: t2 });
    if (u2(t2)) return A2({ writable: t2 });
    if (c2(t2)) return A2({ writable: false, readable: false });
    if (f3(t2)) return A2({ readable: b2.fromWeb(t2) });
    if (p2(t2)) return A2({ writable: x2.fromWeb(t2) });
    if (typeof t2 == `function`) {
      let { value: e2, write: i4, final: a3, destroy: o3 } = k3(t2);
      if (s2(e2)) return C2(O2, e2, { objectMode: true, write: i4, final: a3, destroy: o3 });
      let c3 = e2?.then;
      if (typeof c3 == `function`) {
        let t3, n3 = D2(c3, e2, (e3) => {
          if (e3 != null) throw new _2(`nully`, `body`, e3);
        }, (e3) => {
          v2(t3, e3);
        });
        return t3 = new O2({ objectMode: true, readable: false, write: i4, final(e3) {
          a3(async () => {
            try {
              await n3, r.nextTick(e3, null);
            } catch (t4) {
              r.nextTick(e3, t4);
            }
          });
        }, destroy: o3 });
      }
      throw new _2(`Iterable, AsyncIterable or AsyncFunction`, n2, e2);
    }
    if (T2(t2)) return e(t2.arrayBuffer());
    if (s2(t2)) return C2(O2, t2, { objectMode: true, writable: false });
    if (f3(t2?.readable) && p2(t2?.writable)) return O2.fromWeb(t2);
    if (typeof t2?.writable == `object` || typeof t2?.readable == `object`) return A2({ readable: t2 != null && t2.readable ? l2(t2?.readable) ? t2?.readable : e(t2.readable) : void 0, writable: t2 != null && t2.writable ? u2(t2?.writable) ? t2?.writable : e(t2.writable) : void 0 });
    let i3 = t2?.then;
    if (typeof i3 == `function`) {
      let e2;
      return D2(i3, t2, (t3) => {
        t3 != null && e2.push(t3), e2.push(null);
      }, (t3) => {
        v2(e2, t3);
      }), e2 = new O2({ objectMode: true, writable: false, read() {
      } });
    }
    throw new g2(n2, [`Blob`, `ReadableStream`, `WritableStream`, `Stream`, `Iterable`, `AsyncIterable`, `Function`, `{ readable, writable } pair`, `Promise`], t2);
  };
  function k3(e) {
    let { promise: t2, resolve: n2 } = S2(), i3 = new E2(), a3 = i3.signal;
    return { value: e((async function* () {
      for (; ; ) {
        let e2 = t2;
        t2 = null;
        let { chunk: i4, done: o3, cb: s3 } = await e2;
        if (r.nextTick(s3), o3) return;
        if (a3.aborted) throw new h3(void 0, { cause: a3.reason });
        ({ promise: t2, resolve: n2 } = S2()), yield i4;
      }
    })(), { signal: a3 }), write(e2, t3, r2) {
      let i4 = n2;
      n2 = null, i4({ chunk: e2, done: false, cb: r2 });
    }, final(e2) {
      let t3 = n2;
      n2 = null, t3({ done: true, cb: e2 });
    }, destroy(e2, t3) {
      i3.abort(), t3(e2);
    } };
  }
  function A2(e) {
    let t2 = e.readable && typeof e.readable.read != `function` ? b2.wrap(e.readable) : e.readable, n2 = e.writable, r2 = !!a2(t2), i3 = !!o2(n2), s3, c3, l3, u3, d3;
    function f4(e2) {
      let t3 = u3;
      u3 = null, t3 ? t3(e2) : e2 && d3.destroy(e2);
    }
    return d3 = new O2({ readableObjectMode: !!(t2 != null && t2.readableObjectMode), writableObjectMode: !!(n2 != null && n2.writableObjectMode), readable: r2, writable: i3 }), i3 && (m3(n2, (e2) => {
      i3 = false, e2 && v2(t2, e2), f4(e2);
    }), d3._write = function(e2, t3, r3) {
      n2.write(e2, t3) ? r3() : s3 = r3;
    }, d3._final = function(e2) {
      n2.end(), c3 = e2;
    }, n2.on(`drain`, function() {
      if (s3) {
        let e2 = s3;
        s3 = null, e2();
      }
    }), n2.on(`finish`, function() {
      if (c3) {
        let e2 = c3;
        c3 = null, e2();
      }
    })), r2 && (m3(t2, (e2) => {
      r2 = false, e2 && v2(t2, e2), f4(e2);
    }), t2.on(`readable`, function() {
      if (l3) {
        let e2 = l3;
        l3 = null, e2();
      }
    }), t2.on(`end`, function() {
      d3.push(null);
    }), d3._read = function() {
      for (; ; ) {
        let e2 = t2.read();
        if (e2 === null) {
          l3 = d3._read;
          return;
        }
        if (!d3.push(e2)) return;
      }
    }), d3._destroy = function(e2, r3) {
      !e2 && u3 !== null && (e2 = new h3()), l3 = null, s3 = null, c3 = null, u3 === null ? r3(e2) : (u3 = r3, v2(n2, e2), v2(t2, e2));
    }, d3;
  }
}));
var st = f(((e, t) => {
  let { ObjectDefineProperties: n, ObjectGetOwnPropertyDescriptor: r, ObjectKeys: i2, ObjectSetPrototypeOf: a2 } = Ve();
  t.exports = c2;
  let o2 = it(), s2 = at();
  a2(c2.prototype, o2.prototype), a2(c2, o2);
  {
    let e2 = i2(s2.prototype);
    for (let t2 = 0; t2 < e2.length; t2++) {
      let n2 = e2[t2];
      c2.prototype[n2] || (c2.prototype[n2] = s2.prototype[n2]);
    }
  }
  function c2(e2) {
    if (!(this instanceof c2)) return new c2(e2);
    o2.call(this, e2), s2.call(this, e2), e2 ? (this.allowHalfOpen = e2.allowHalfOpen !== false, e2.readable === false && (this._readableState.readable = false, this._readableState.ended = true, this._readableState.endEmitted = true), e2.writable === false && (this._writableState.writable = false, this._writableState.ending = true, this._writableState.ended = true, this._writableState.finished = true)) : this.allowHalfOpen = true;
  }
  n(c2.prototype, { writable: { __proto__: null, ...r(s2.prototype, `writable`) }, writableHighWaterMark: { __proto__: null, ...r(s2.prototype, `writableHighWaterMark`) }, writableObjectMode: { __proto__: null, ...r(s2.prototype, `writableObjectMode`) }, writableBuffer: { __proto__: null, ...r(s2.prototype, `writableBuffer`) }, writableLength: { __proto__: null, ...r(s2.prototype, `writableLength`) }, writableFinished: { __proto__: null, ...r(s2.prototype, `writableFinished`) }, writableCorked: { __proto__: null, ...r(s2.prototype, `writableCorked`) }, writableEnded: { __proto__: null, ...r(s2.prototype, `writableEnded`) }, writableNeedDrain: { __proto__: null, ...r(s2.prototype, `writableNeedDrain`) }, destroyed: { __proto__: null, get() {
    return this._readableState === void 0 || this._writableState === void 0 ? false : this._readableState.destroyed && this._writableState.destroyed;
  }, set(e2) {
    this._readableState && this._writableState && (this._readableState.destroyed = e2, this._writableState.destroyed = e2);
  } } });
  let l2;
  function u2() {
    return l2 === void 0 && (l2 = {}), l2;
  }
  c2.fromWeb = function(e2, t2) {
    return u2().newStreamDuplexFromReadableWritablePair(e2, t2);
  }, c2.toWeb = function(e2) {
    return u2().newReadableWritablePairFromDuplex(e2);
  };
  let d2;
  c2.from = function(e2) {
    return d2 ||= ot(), d2(e2, `body`);
  };
}));
var ct = f(((e, t) => {
  let { ObjectSetPrototypeOf: n, Symbol: r } = Ve();
  t.exports = c2;
  let { ERR_METHOD_NOT_IMPLEMENTED: i2 } = Ue().codes, a2 = st(), { getHighWaterMark: o2 } = tt();
  n(c2.prototype, a2.prototype), n(c2, a2);
  let s2 = r(`kCallback`);
  function c2(e2) {
    if (!(this instanceof c2)) return new c2(e2);
    let t2 = e2 ? o2(this, e2, `readableHighWaterMark`, true) : null;
    t2 === 0 && (e2 = { ...e2, highWaterMark: null, readableHighWaterMark: t2, writableHighWaterMark: e2.writableHighWaterMark || 0 }), a2.call(this, e2), this._readableState.sync = false, this[s2] = null, e2 && (typeof e2.transform == `function` && (this._transform = e2.transform), typeof e2.flush == `function` && (this._flush = e2.flush)), this.on(`prefinish`, u2);
  }
  function l2(e2) {
    typeof this._flush == `function` && !this.destroyed ? this._flush((t2, n2) => {
      if (t2) {
        e2 ? e2(t2) : this.destroy(t2);
        return;
      }
      n2 != null && this.push(n2), this.push(null), e2 && e2();
    }) : (this.push(null), e2 && e2());
  }
  function u2() {
    this._final !== l2 && l2.call(this);
  }
  c2.prototype._final = l2, c2.prototype._transform = function(e2, t2, n2) {
    throw new i2(`_transform()`);
  }, c2.prototype._write = function(e2, t2, n2) {
    let r2 = this._readableState, i3 = this._writableState, a3 = r2.length;
    this._transform(e2, t2, (e3, t3) => {
      if (e3) {
        n2(e3);
        return;
      }
      t3 != null && this.push(t3), i3.ended || a3 === r2.length || r2.length < r2.highWaterMark ? n2() : this[s2] = n2;
    });
  }, c2.prototype._read = function() {
    if (this[s2]) {
      let e2 = this[s2];
      this[s2] = null, e2();
    }
  };
}));
var lt = f(((e, t) => {
  let { ObjectSetPrototypeOf: n } = Ve();
  t.exports = i2;
  let r = ct();
  n(i2.prototype, r.prototype), n(i2, r);
  function i2(e2) {
    if (!(this instanceof i2)) return new i2(e2);
    r.call(this, e2);
  }
  i2.prototype._transform = function(e2, t2, n2) {
    n2(null, e2);
  };
}));
var ut = f(((e, t) => {
  let n = Je(), { ArrayIsArray: r, Promise: i2, SymbolAsyncIterator: a2, SymbolDispose: o2 } = Ve(), s2 = Xe(), { once: c2 } = Ke(), l2 = Ze(), u2 = st(), { aggregateTwoErrors: d2, codes: { ERR_INVALID_ARG_TYPE: f3, ERR_INVALID_RETURN_VALUE: p2, ERR_MISSING_ARGS: m3, ERR_STREAM_DESTROYED: h3, ERR_STREAM_PREMATURE_CLOSE: g2 }, AbortError: _2 } = Ue(), { validateFunction: v2, validateAbortSignal: y2 } = qe(), { isIterable: b2, isReadable: x2, isReadableNodeStream: S2, isNodeStream: C2, isTransformStream: w2, isWebStream: T2, isReadableStream: E2, isReadableFinished: D2 } = Ye(), O2 = globalThis.AbortController || Ge().AbortController, k3, A2, j2;
  function M2(e2, t2, n2) {
    let r2 = false;
    return e2.on(`close`, () => {
      r2 = true;
    }), { destroy: (t3) => {
      r2 || (r2 = true, l2.destroyer(e2, t3 || new h3(`pipe`)));
    }, cleanup: s2(e2, { readable: t2, writable: n2 }, (e3) => {
      r2 = !e3;
    }) };
  }
  function N2(e2) {
    return v2(e2[e2.length - 1], `streams[stream.length - 1]`), e2.pop();
  }
  function P2(e2) {
    if (b2(e2)) return e2;
    if (S2(e2)) return F2(e2);
    throw new f3(`val`, [`Readable`, `Iterable`, `AsyncIterable`], e2);
  }
  async function* F2(e2) {
    A2 ||= it(), yield* A2.prototype[a2].call(e2);
  }
  async function ee2(e2, t2, n2, { end: r2 }) {
    let a3, o3 = null, c3 = (e3) => {
      if (e3 && (a3 = e3), o3) {
        let e4 = o3;
        o3 = null, e4();
      }
    }, l3 = () => new i2((e3, t3) => {
      a3 ? t3(a3) : o3 = () => {
        a3 ? t3(a3) : e3();
      };
    });
    t2.on(`drain`, c3);
    let u3 = s2(t2, { readable: false }, c3);
    try {
      t2.writableNeedDrain && await l3();
      for await (let n3 of e2) t2.write(n3) || await l3();
      r2 && (t2.end(), await l3()), n2();
    } catch (e3) {
      n2(a3 === e3 ? e3 : d2(a3, e3));
    } finally {
      u3(), t2.off(`drain`, c3);
    }
  }
  async function I2(e2, t2, n2, { end: r2 }) {
    w2(t2) && (t2 = t2.writable);
    let i3 = t2.getWriter();
    try {
      for await (let t3 of e2) await i3.ready, i3.write(t3).catch(() => {
      });
      await i3.ready, r2 && await i3.close(), n2();
    } catch (e3) {
      try {
        await i3.abort(e3), n2(e3);
      } catch (e4) {
        n2(e4);
      }
    }
  }
  function L2(...e2) {
    return R2(e2, c2(N2(e2)));
  }
  function R2(e2, t2, i3) {
    if (e2.length === 1 && r(e2[0]) && (e2 = e2[0]), e2.length < 2) throw new m3(`streams`);
    let a3 = new O2(), s3 = a3.signal, c3 = i3?.signal, l3 = [];
    y2(c3, `options.signal`);
    function d3() {
      F3(new _2());
    }
    j2 ||= Ke().addAbortListener;
    let h4;
    c3 && (h4 = j2(c3, d3));
    let g3, v3, D3 = [], A3 = 0;
    function N3(e3) {
      F3(e3, --A3 === 0);
    }
    function F3(e3, r2) {
      var i4;
      if (e3 && (!g3 || g3.code === `ERR_STREAM_PREMATURE_CLOSE`) && (g3 = e3), !(!g3 && !r2)) {
        for (; D3.length; ) D3.shift()(g3);
        (i4 = h4) == null || i4[o2](), a3.abort(), r2 && (g3 || l3.forEach((e4) => e4()), n.nextTick(t2, g3, v3));
      }
    }
    let L3;
    for (let t3 = 0; t3 < e2.length; t3++) {
      let r2 = e2[t3], a4 = t3 < e2.length - 1, o3 = t3 > 0, c4 = a4 || i3?.end !== false, d4 = t3 === e2.length - 1;
      if (C2(r2)) {
        let e3 = function(e4) {
          e4 && e4.name !== `AbortError` && e4.code !== `ERR_STREAM_PREMATURE_CLOSE` && N3(e4);
        };
        var e2 = e3;
        if (c4) {
          let { destroy: e4, cleanup: t4 } = M2(r2, a4, o3);
          D3.push(e4), x2(r2) && d4 && l3.push(t4);
        }
        r2.on(`error`, e3), x2(r2) && d4 && l3.push(() => {
          r2.removeListener(`error`, e3);
        });
      }
      if (t3 === 0) if (typeof r2 == `function`) {
        if (L3 = r2({ signal: s3 }), !b2(L3)) throw new p2(`Iterable, AsyncIterable or Stream`, `source`, L3);
      } else L3 = b2(r2) || S2(r2) || w2(r2) ? r2 : u2.from(r2);
      else if (typeof r2 == `function`) if (L3 = w2(L3) ? P2(L3?.readable) : P2(L3), L3 = r2(L3, { signal: s3 }), a4) {
        if (!b2(L3, true)) throw new p2(`AsyncIterable`, `transform[${t3 - 1}]`, L3);
      } else {
        k3 ||= lt();
        let e3 = new k3({ objectMode: true }), t4 = L3?.then;
        if (typeof t4 == `function`) A3++, t4.call(L3, (t5) => {
          v3 = t5, t5 != null && e3.write(t5), c4 && e3.end(), n.nextTick(N3);
        }, (t5) => {
          e3.destroy(t5), n.nextTick(N3, t5);
        });
        else if (b2(L3, true)) A3++, ee2(L3, e3, N3, { end: c4 });
        else if (E2(L3) || w2(L3)) {
          let t5 = L3.readable || L3;
          A3++, ee2(t5, e3, N3, { end: c4 });
        } else throw new p2(`AsyncIterable or Promise`, `destination`, L3);
        L3 = e3;
        let { destroy: r3, cleanup: i4 } = M2(L3, false, true);
        D3.push(r3), d4 && l3.push(i4);
      }
      else if (C2(r2)) {
        if (S2(L3)) {
          A3 += 2;
          let e3 = te2(L3, r2, N3, { end: c4 });
          x2(r2) && d4 && l3.push(e3);
        } else if (w2(L3) || E2(L3)) {
          let e3 = L3.readable || L3;
          A3++, ee2(e3, r2, N3, { end: c4 });
        } else if (b2(L3)) A3++, ee2(L3, r2, N3, { end: c4 });
        else throw new f3(`val`, [`Readable`, `Iterable`, `AsyncIterable`, `ReadableStream`, `TransformStream`], L3);
        L3 = r2;
      } else if (T2(r2)) {
        if (S2(L3)) A3++, I2(P2(L3), r2, N3, { end: c4 });
        else if (E2(L3) || b2(L3)) A3++, I2(L3, r2, N3, { end: c4 });
        else if (w2(L3)) A3++, I2(L3.readable, r2, N3, { end: c4 });
        else throw new f3(`val`, [`Readable`, `Iterable`, `AsyncIterable`, `ReadableStream`, `TransformStream`], L3);
        L3 = r2;
      } else L3 = u2.from(r2);
    }
    return (s3 != null && s3.aborted || c3 != null && c3.aborted) && n.nextTick(d3), L3;
  }
  function te2(e2, t2, r2, { end: i3 }) {
    let a3 = false;
    if (t2.on(`close`, () => {
      a3 || r2(new g2());
    }), e2.pipe(t2, { end: false }), i3) {
      let r3 = function() {
        a3 = true, t2.end();
      };
      var r2 = r3;
      D2(e2) ? n.nextTick(r3) : e2.once(`end`, r3);
    } else r2();
    return s2(e2, { readable: true, writable: false }, (t3) => {
      let n2 = e2._readableState;
      t3 && t3.code === `ERR_STREAM_PREMATURE_CLOSE` && n2 && n2.ended && !n2.errored && !n2.errorEmitted ? e2.once(`end`, r2).once(`error`, r2) : r2(t3);
    }), s2(t2, { readable: false, writable: true }, r2);
  }
  t.exports = { pipelineImpl: R2, pipeline: L2 };
}));
var dt = f(((e, t) => {
  let { pipeline: n } = ut(), r = st(), { destroyer: i2 } = Ze(), { isNodeStream: a2, isReadable: o2, isWritable: s2, isWebStream: c2, isTransformStream: l2, isWritableStream: u2, isReadableStream: d2 } = Ye(), { AbortError: f3, codes: { ERR_INVALID_ARG_VALUE: p2, ERR_MISSING_ARGS: m3 } } = Ue(), h3 = Xe();
  t.exports = function(...e2) {
    if (e2.length === 0) throw new m3(`streams`);
    if (e2.length === 1) return r.from(e2[0]);
    let t2 = [...e2];
    if (typeof e2[0] == `function` && (e2[0] = r.from(e2[0])), typeof e2[e2.length - 1] == `function`) {
      let t3 = e2.length - 1;
      e2[t3] = r.from(e2[t3]);
    }
    for (let n2 = 0; n2 < e2.length; ++n2) if (!(!a2(e2[n2]) && !c2(e2[n2]))) {
      if (n2 < e2.length - 1 && !(o2(e2[n2]) || d2(e2[n2]) || l2(e2[n2]))) throw new p2(`streams[${n2}]`, t2[n2], `must be readable`);
      if (n2 > 0 && !(s2(e2[n2]) || u2(e2[n2]) || l2(e2[n2]))) throw new p2(`streams[${n2}]`, t2[n2], `must be writable`);
    }
    let g2, _2, v2, y2, b2;
    function x2(e3) {
      let t3 = y2;
      y2 = null, t3 ? t3(e3) : e3 ? b2.destroy(e3) : !T2 && !w2 && b2.destroy();
    }
    let S2 = e2[0], C2 = n(e2, x2), w2 = !!(s2(S2) || u2(S2) || l2(S2)), T2 = !!(o2(C2) || d2(C2) || l2(C2));
    if (b2 = new r({ writableObjectMode: !!(S2 != null && S2.writableObjectMode), readableObjectMode: !!(C2 != null && C2.readableObjectMode), writable: w2, readable: T2 }), w2) {
      if (a2(S2)) b2._write = function(e3, t3, n2) {
        S2.write(e3, t3) ? n2() : g2 = n2;
      }, b2._final = function(e3) {
        S2.end(), _2 = e3;
      }, S2.on(`drain`, function() {
        if (g2) {
          let e3 = g2;
          g2 = null, e3();
        }
      });
      else if (c2(S2)) {
        let e3 = (l2(S2) ? S2.writable : S2).getWriter();
        b2._write = async function(t3, n2, r2) {
          try {
            await e3.ready, e3.write(t3).catch(() => {
            }), r2();
          } catch (e4) {
            r2(e4);
          }
        }, b2._final = async function(t3) {
          try {
            await e3.ready, e3.close().catch(() => {
            }), _2 = t3;
          } catch (e4) {
            t3(e4);
          }
        };
      }
      h3(l2(C2) ? C2.readable : C2, () => {
        if (_2) {
          let e3 = _2;
          _2 = null, e3();
        }
      });
    }
    if (T2) {
      if (a2(C2)) C2.on(`readable`, function() {
        if (v2) {
          let e3 = v2;
          v2 = null, e3();
        }
      }), C2.on(`end`, function() {
        b2.push(null);
      }), b2._read = function() {
        for (; ; ) {
          let e3 = C2.read();
          if (e3 === null) {
            v2 = b2._read;
            return;
          }
          if (!b2.push(e3)) return;
        }
      };
      else if (c2(C2)) {
        let e3 = (l2(C2) ? C2.readable : C2).getReader();
        b2._read = async function() {
          for (; ; ) try {
            let { value: t3, done: n2 } = await e3.read();
            if (!b2.push(t3)) return;
            if (n2) {
              b2.push(null);
              return;
            }
          } catch {
            return;
          }
        };
      }
    }
    return b2._destroy = function(e3, t3) {
      !e3 && y2 !== null && (e3 = new f3()), v2 = null, g2 = null, _2 = null, y2 === null ? t3(e3) : (y2 = t3, a2(C2) && i2(C2, e3));
    }, b2;
  };
}));
var ft = f(((e, t) => {
  let n = globalThis.AbortController || Ge().AbortController, { codes: { ERR_INVALID_ARG_VALUE: r, ERR_INVALID_ARG_TYPE: i2, ERR_MISSING_ARGS: a2, ERR_OUT_OF_RANGE: o2 }, AbortError: s2 } = Ue(), { validateAbortSignal: c2, validateInteger: l2, validateObject: u2 } = qe(), d2 = Ve().Symbol(`kWeak`), f3 = Ve().Symbol(`kResistStopPropagation`), { finished: p2 } = Xe(), m3 = dt(), { addAbortSignalNoValidate: h3 } = $e(), { isWritable: g2, isNodeStream: _2 } = Ye(), { deprecate: v2 } = Ke(), { ArrayPrototypePush: y2, Boolean: b2, MathFloor: x2, Number: S2, NumberIsNaN: C2, Promise: w2, PromiseReject: T2, PromiseResolve: E2, PromisePrototypeThen: D2, Symbol: O2 } = Ve(), k3 = O2(`kEmpty`), A2 = O2(`kEof`);
  function j2(e2, t2) {
    if (t2 != null && u2(t2, `options`), t2?.signal != null && c2(t2.signal, `options.signal`), _2(e2) && !g2(e2)) throw new r(`stream`, e2, `must be writable`);
    let n2 = m3(this, e2);
    return t2 != null && t2.signal && h3(t2.signal, n2), n2;
  }
  function M2(e2, t2) {
    if (typeof e2 != `function`) throw new i2(`fn`, [`Function`, `AsyncFunction`], e2);
    t2 != null && u2(t2, `options`), t2?.signal != null && c2(t2.signal, `options.signal`);
    let n2 = 1;
    t2?.concurrency != null && (n2 = x2(t2.concurrency));
    let r2 = n2 - 1;
    return t2?.highWaterMark != null && (r2 = x2(t2.highWaterMark)), l2(n2, `options.concurrency`, 1), l2(r2, `options.highWaterMark`, 0), r2 += n2, async function* () {
      let i3 = Ke().AbortSignalAny([t2?.signal].filter(b2)), a3 = this, o3 = [], c3 = { signal: i3 }, l3, u3, d3 = false, f4 = 0;
      function p3() {
        d3 = true, m4();
      }
      function m4() {
        --f4, h4();
      }
      function h4() {
        u3 && !d3 && f4 < n2 && o3.length < r2 && (u3(), u3 = null);
      }
      async function g3() {
        try {
          for await (let t3 of a3) {
            if (d3) return;
            if (i3.aborted) throw new s2();
            try {
              if (t3 = e2(t3, c3), t3 === k3) continue;
              t3 = E2(t3);
            } catch (e3) {
              t3 = T2(e3);
            }
            f4 += 1, D2(t3, m4, p3), o3.push(t3), l3 &&= (l3(), null), !d3 && (o3.length >= r2 || f4 >= n2) && await new w2((e3) => {
              u3 = e3;
            });
          }
          o3.push(A2);
        } catch (e3) {
          let t3 = T2(e3);
          D2(t3, m4, p3), o3.push(t3);
        } finally {
          d3 = true, l3 &&= (l3(), null);
        }
      }
      g3();
      try {
        for (; ; ) {
          for (; o3.length > 0; ) {
            let e3 = await o3[0];
            if (e3 === A2) return;
            if (i3.aborted) throw new s2();
            e3 !== k3 && (yield e3), o3.shift(), h4();
          }
          await new w2((e3) => {
            l3 = e3;
          });
        }
      } finally {
        d3 = true, u3 &&= (u3(), null);
      }
    }.call(this);
  }
  function N2(e2 = void 0) {
    return e2 != null && u2(e2, `options`), e2?.signal != null && c2(e2.signal, `options.signal`), async function* () {
      let t2 = 0;
      for await (let r2 of this) {
        var n2;
        if (e2 != null && (n2 = e2.signal) != null && n2.aborted) throw new s2({ cause: e2.signal.reason });
        yield [t2++, r2];
      }
    }.call(this);
  }
  async function P2(e2, t2 = void 0) {
    for await (let n2 of L2.call(this, e2, t2)) return true;
    return false;
  }
  async function F2(e2, t2 = void 0) {
    if (typeof e2 != `function`) throw new i2(`fn`, [`Function`, `AsyncFunction`], e2);
    return !await P2.call(this, async (...t3) => !await e2(...t3), t2);
  }
  async function ee2(e2, t2) {
    for await (let n2 of L2.call(this, e2, t2)) return n2;
  }
  async function I2(e2, t2) {
    if (typeof e2 != `function`) throw new i2(`fn`, [`Function`, `AsyncFunction`], e2);
    async function n2(t3, n3) {
      return await e2(t3, n3), k3;
    }
    for await (let e3 of M2.call(this, n2, t2)) ;
  }
  function L2(e2, t2) {
    if (typeof e2 != `function`) throw new i2(`fn`, [`Function`, `AsyncFunction`], e2);
    async function n2(t3, n3) {
      return await e2(t3, n3) ? t3 : k3;
    }
    return M2.call(this, n2, t2);
  }
  var R2 = class extends a2 {
    constructor() {
      super(`reduce`), this.message = `Reduce of an empty stream requires an initial value`;
    }
  };
  async function te2(e2, t2, r2) {
    var a3;
    if (typeof e2 != `function`) throw new i2(`reducer`, [`Function`, `AsyncFunction`], e2);
    r2 != null && u2(r2, `options`), r2?.signal != null && c2(r2.signal, `options.signal`);
    let o3 = arguments.length > 1;
    if (r2 != null && (a3 = r2.signal) != null && a3.aborted) {
      let e3 = new s2(void 0, { cause: r2.signal.reason });
      throw this.once(`error`, () => {
      }), await p2(this.destroy(e3)), e3;
    }
    let l3 = new n(), m4 = l3.signal;
    if (r2 != null && r2.signal) {
      let e3 = { once: true, [d2]: this, [f3]: true };
      r2.signal.addEventListener(`abort`, () => l3.abort(), e3);
    }
    let h4 = false;
    try {
      for await (let n2 of this) {
        var g3;
        if (h4 = true, r2 != null && (g3 = r2.signal) != null && g3.aborted) throw new s2();
        o3 ? t2 = await e2(t2, n2, { signal: m4 }) : (t2 = n2, o3 = true);
      }
      if (!h4 && !o3) throw new R2();
    } finally {
      l3.abort();
    }
    return t2;
  }
  async function ne2(e2) {
    e2 != null && u2(e2, `options`), e2?.signal != null && c2(e2.signal, `options.signal`);
    let t2 = [];
    for await (let r2 of this) {
      var n2;
      if (e2 != null && (n2 = e2.signal) != null && n2.aborted) throw new s2(void 0, { cause: e2.signal.reason });
      y2(t2, r2);
    }
    return t2;
  }
  function z2(e2, t2) {
    let n2 = M2.call(this, e2, t2);
    return async function* () {
      for await (let e3 of n2) yield* e3;
    }.call(this);
  }
  function B2(e2) {
    if (e2 = S2(e2), C2(e2)) return 0;
    if (e2 < 0) throw new o2(`number`, `>= 0`, e2);
    return e2;
  }
  function V2(e2, t2 = void 0) {
    return t2 != null && u2(t2, `options`), t2?.signal != null && c2(t2.signal, `options.signal`), e2 = B2(e2), async function* () {
      var n2;
      if (t2 != null && (n2 = t2.signal) != null && n2.aborted) throw new s2();
      for await (let n3 of this) {
        var r2;
        if (t2 != null && (r2 = t2.signal) != null && r2.aborted) throw new s2();
        e2-- <= 0 && (yield n3);
      }
    }.call(this);
  }
  function H2(e2, t2 = void 0) {
    return t2 != null && u2(t2, `options`), t2?.signal != null && c2(t2.signal, `options.signal`), e2 = B2(e2), async function* () {
      var n2;
      if (t2 != null && (n2 = t2.signal) != null && n2.aborted) throw new s2();
      for await (let n3 of this) {
        var r2;
        if (t2 != null && (r2 = t2.signal) != null && r2.aborted) throw new s2();
        if (e2-- > 0 && (yield n3), e2 <= 0) return;
      }
    }.call(this);
  }
  t.exports.streamReturningOperators = { asIndexedPairs: v2(N2, `readable.asIndexedPairs will be removed in a future version.`), drop: V2, filter: L2, flatMap: z2, map: M2, take: H2, compose: j2 }, t.exports.promiseReturningOperators = { every: F2, forEach: I2, reduce: te2, toArray: ne2, some: P2, find: ee2 };
}));
var pt = f(((e, t) => {
  let { ArrayPrototypePop: n, Promise: r } = Ve(), { isIterable: i2, isNodeStream: a2, isWebStream: o2 } = Ye(), { pipelineImpl: s2 } = ut(), { finished: c2 } = Xe();
  mt();
  function l2(...e2) {
    return new r((t2, r2) => {
      let c3, l3, u2 = e2[e2.length - 1];
      if (u2 && typeof u2 == `object` && !a2(u2) && !i2(u2) && !o2(u2)) {
        let t3 = n(e2);
        c3 = t3.signal, l3 = t3.end;
      }
      s2(e2, (e3, n2) => {
        e3 ? r2(e3) : t2(n2);
      }, { signal: c3, end: l3 });
    });
  }
  t.exports = { finished: c2, pipeline: l2 };
}));
var mt = f(((t, n) => {
  let { Buffer: r } = h(`buffer`), { ObjectDefineProperty: i2, ObjectKeys: a2, ReflectApply: o2 } = Ve(), { promisify: { custom: s2 } } = Ke(), { streamReturningOperators: c2, promiseReturningOperators: l2 } = ft(), { codes: { ERR_ILLEGAL_CONSTRUCTOR: u2 } } = Ue(), d2 = dt(), { setDefaultHighWaterMark: f3, getDefaultHighWaterMark: p2 } = tt(), { pipeline: m3 } = ut(), { destroyer: h3 } = Ze(), g2 = Xe(), _2 = pt(), v2 = Ye(), y2 = n.exports = Qe().Stream;
  y2.isDestroyed = v2.isDestroyed, y2.isDisturbed = v2.isDisturbed, y2.isErrored = v2.isErrored, y2.isReadable = v2.isReadable, y2.isWritable = v2.isWritable, y2.Readable = it();
  for (let e of a2(c2)) {
    let n2 = function(...e2) {
      if (new.target) throw u2();
      return y2.Readable.from(o2(t2, this, e2));
    };
    var n = n2;
    let t2 = c2[e];
    i2(n2, `name`, { __proto__: null, value: t2.name }), i2(n2, `length`, { __proto__: null, value: t2.length }), i2(y2.Readable.prototype, e, { __proto__: null, value: n2, enumerable: false, configurable: true, writable: true });
  }
  for (let e of a2(l2)) {
    let n2 = function(...e2) {
      if (new.target) throw u2();
      return o2(t2, this, e2);
    };
    var n = n2;
    let t2 = l2[e];
    i2(n2, `name`, { __proto__: null, value: t2.name }), i2(n2, `length`, { __proto__: null, value: t2.length }), i2(y2.Readable.prototype, e, { __proto__: null, value: n2, enumerable: false, configurable: true, writable: true });
  }
  y2.Writable = at(), y2.Duplex = st(), y2.Transform = ct(), y2.PassThrough = lt(), y2.pipeline = m3;
  let { addAbortSignal: b2 } = $e();
  y2.addAbortSignal = b2, y2.finished = g2, y2.destroy = h3, y2.compose = d2, y2.setDefaultHighWaterMark = f3, y2.getDefaultHighWaterMark = p2, i2(y2, `promises`, { __proto__: null, configurable: true, enumerable: true, get() {
    return _2;
  } }), i2(m3, s2, { __proto__: null, enumerable: true, get() {
    return _2.pipeline;
  } }), i2(g2, s2, { __proto__: null, enumerable: true, get() {
    return _2.finished;
  } }), y2.Stream = y2, y2._isUint8Array = function(e) {
    return e instanceof Uint8Array;
  }, y2._uint8ArrayToBuffer = function(e) {
    return r.from(e.buffer, e.byteOffset, e.byteLength);
  };
}));
var ht = f(((t, n) => {
  let r = h(`stream`);
  if (r && process.env.READABLE_STREAM === `disable`) {
    let e = r.promises;
    n.exports._uint8ArrayToBuffer = r._uint8ArrayToBuffer, n.exports._isUint8Array = r._isUint8Array, n.exports.isDisturbed = r.isDisturbed, n.exports.isErrored = r.isErrored, n.exports.isReadable = r.isReadable, n.exports.Readable = r.Readable, n.exports.Writable = r.Writable, n.exports.Duplex = r.Duplex, n.exports.Transform = r.Transform, n.exports.PassThrough = r.PassThrough, n.exports.addAbortSignal = r.addAbortSignal, n.exports.finished = r.finished, n.exports.destroy = r.destroy, n.exports.pipeline = r.pipeline, n.exports.compose = r.compose, Object.defineProperty(r, `promises`, { configurable: true, enumerable: true, get() {
      return e;
    } }), n.exports.Stream = r.Stream;
  } else {
    let e = mt(), t2 = pt(), r2 = e.Readable.destroy;
    n.exports = e.Readable, n.exports._uint8ArrayToBuffer = e._uint8ArrayToBuffer, n.exports._isUint8Array = e._isUint8Array, n.exports.isDisturbed = e.isDisturbed, n.exports.isErrored = e.isErrored, n.exports.isReadable = e.isReadable, n.exports.Readable = e.Readable, n.exports.Writable = e.Writable, n.exports.Duplex = e.Duplex, n.exports.Transform = e.Transform, n.exports.PassThrough = e.PassThrough, n.exports.addAbortSignal = e.addAbortSignal, n.exports.finished = e.finished, n.exports.destroy = e.destroy, n.exports.destroy = r2, n.exports.pipeline = e.pipeline, n.exports.compose = e.compose, Object.defineProperty(e, `promises`, { configurable: true, enumerable: true, get() {
      return t2;
    } }), n.exports.Stream = e.Stream;
  }
  n.exports.default = n.exports;
}));
var gt = m(Pe(), 1);
var _t = m(Be(), 1);
function vt(e) {
  let t = [e];
  return { next() {
    return Promise.resolve({ done: t.length === 0, value: t.pop() });
  }, return() {
    return t = [], {};
  }, [Symbol.asyncIterator]() {
    return this;
  } };
}
function yt(e) {
  return e[Symbol.asyncIterator] ? e[Symbol.asyncIterator]() : e[Symbol.iterator] ? e[Symbol.iterator]() : e.next ? e : vt(e);
}
async function bt(e, t) {
  let n = yt(e);
  for (; ; ) {
    let { value: e2, done: r } = await n.next();
    if (e2 && await t(e2), r) break;
  }
  n.return && n.return();
}
function xt(e) {
  let { PassThrough: t } = ht(), n = new t();
  return setTimeout(async () => {
    await bt(e, (e2) => n.write(e2)), n.end();
  }, 1), n;
}
async function St(e) {
  let t = 0, n = [];
  await bt(e, (e2) => {
    n.push(e2), t += e2.byteLength;
  });
  let r = new Uint8Array(t), i2 = 0;
  for (let e2 of n) r.set(e2, i2), i2 += e2.byteLength;
  return r;
}
function Ct(e) {
  let t = Object.getOwnPropertyDescriptor(e, Symbol.asyncIterator);
  if (t && t.enumerable) return e;
  let n = false, r = [], i2 = {};
  return e.on(`data`, (e2) => {
    r.push(e2), i2.resolve && (i2.resolve({ value: r.shift(), done: false }), i2 = {});
  }), e.on(`error`, (e2) => {
    i2.reject && (i2.reject(e2), i2 = {});
  }), e.on(`end`, () => {
    n = true, i2.resolve && (i2.resolve({ done: true }), i2 = {});
  }), { next() {
    return new Promise((e2, t2) => {
      if (r.length === 0 && n) return e2({ done: true });
      if (r.length > 0) return e2({ value: r.shift(), done: false });
      r.length === 0 && !n && (i2 = { resolve: e2, reject: t2 });
    });
  }, return() {
    e.removeAllListeners(), e.destroy && e.destroy();
  }, [Symbol.asyncIterator]() {
    return this;
  } };
}
async function wt({ onProgress: e, url: t, method: n = `GET`, headers: r = {}, agent: i2, body: a2 }) {
  return a2 && Array.isArray(a2) ? a2 = Buffer.from(await St(a2)) : a2 &&= xt(a2), new Promise((e2, o2) => {
    (0, _t.default)({ url: t, method: n, headers: r, agent: i2, body: a2 }, (t2, n2) => {
      if (t2) return o2(t2);
      try {
        let t3 = Ct(n2);
        e2({ url: n2.url, method: n2.method, statusCode: n2.statusCode, statusMessage: n2.statusMessage, body: t3, headers: n2.headers });
      } catch (e3) {
        o2(e3);
      }
    });
  });
}
var Tt = { request: wt };
function Et(e, t = e.transport) {
  return t === `ssh` ? e.ssh : e.url;
}
function Dt(e) {
  return /^[0-9a-f]{7,40}$/iu.test(e);
}
function Ot(e) {
  return e.startsWith(`refs/heads/`) ? e.slice(11) : e.startsWith(`refs/tags/`) ? e.slice(10) : e;
}
function kt(e) {
  if (!e || typeof e != `object`) return false;
  let t = `${e.code || ``} ${e.message || ``}`.toLowerCase();
  return t.includes(`ssh`) && (t.includes(`agent`) || t.includes(`key`) || t.includes(`identity`) || t.includes(`publickey`) || t.includes(`authentication`));
}
function At(e) {
  return !e || typeof e != `object` ? false : e.code === `ENOENT`;
}
function jt(e, t) {
  return new k(`SSH authentication failed for ${e.url}. Start ssh-agent and add a key, or use the HTTPS source instead.`, { code: `SSH_NO_KEY`, original: t, url: e.url });
}
function Mt(e, t) {
  return new k(`git is not installed. Install git to clone ${e.url}.`, { code: `GIT_NOT_FOUND`, original: t, url: e.url });
}
function Nt(e, t) {
  if (e === `HEAD`) return { hash: t, type: `HEAD` };
  let r = /refs\/([^/]+)\/(.+)/u.exec(e);
  if (!r) throw new k(`could not parse ${e}`, { code: `BAD_REF` });
  return { hash: t, name: r[2], type: r[1] === `heads` ? `branch` : r[1] === `refs` ? `ref` : r[1] };
}
function Pt(e) {
  let t = String(e.ref || e.name || ``), n = String(e.oid || e.hash || ``);
  if (!(!t || !n)) return Nt(t, n);
}
function Ft(e) {
  let t = /* @__PURE__ */ new Set();
  return e.filter((e2) => {
    let n = e2.type === `HEAD` ? `HEAD` : e2.name ? `${e2.type}:${e2.name}` : e2.hash;
    return t.has(n) ? false : (t.add(n), true);
  });
}
function It(e) {
  let t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  for (let r of e.split(/\r?\n/u)) {
    let e2 = r.trim();
    if (!e2) continue;
    let i2 = /^ref:\s+(.+)\t(.+)$/u.exec(e2);
    if (i2) {
      n.set(i2[2], i2[1]);
      continue;
    }
    let a2 = e2.indexOf(`	`);
    if (a2 === -1) continue;
    let o2 = e2.slice(0, a2), s2 = e2.slice(a2 + 1);
    t.set(s2, Nt(s2, o2));
  }
  for (let [e2, r] of n) {
    if (e2 !== `HEAD`) continue;
    let n2 = t.get(r);
    n2 && t.set(`HEAD`, { hash: n2.hash, type: `HEAD` });
  }
  return Ft([...t.values()]);
}
function Lt(e) {
  return Ft(e.flatMap((e2) => {
    let t = Pt(e2);
    return t ? [t] : [];
  }));
}
function Rt(e) {
  let t = Ot(e);
  return t === `HEAD` ? {} : Dt(t) ? { checkoutRef: t } : t.startsWith(`refs/heads/`) ? { cloneRef: t.slice(11), singleBranch: true } : t.startsWith(`refs/tags/`) ? { cloneRef: t.slice(10), singleBranch: true } : t.startsWith(`refs/`) ? { checkoutRef: t } : { cloneRef: t, checkoutRef: t, singleBranch: true };
}
var zt = c(o);
var Bt = Tt;
function Vt(e) {
  return new Promise((t, n) => {
    let r = s(`git`, [`ls-remote`, `--symref`, Et(e)], { stdio: [`ignore`, `pipe`, `pipe`] }), i2 = r.stdout, a2 = r.stderr;
    if (!i2 || !a2) {
      n(Error(`could not start git ls-remote`));
      return;
    }
    let o2 = ``, c2 = ``;
    i2.setEncoding(`utf8`), a2.setEncoding(`utf8`), i2.on(`data`, (e2) => {
      o2 += e2;
    }), a2.on(`data`, (e2) => {
      c2 += e2;
    }), r.once(`error`, n), r.once(`close`, (e2) => {
      if (e2 !== 0) {
        let t2 = Error(c2.trim() || `git ls-remote exited with code ${e2}`);
        t2.code = e2 ?? `GIT_LS_REMOTE_FAILED`, n(t2);
        return;
      }
      t(It(o2));
    });
  });
}
async function Ht(e) {
  let t = Et(e);
  try {
    let e2 = Lt(await gt.listServerRefs({ http: Bt, peelTags: true, symrefs: true, url: t }));
    if (e2.length > 0) return e2;
  } catch {
  }
  try {
    let e2 = Lt((await gt.getRemoteInfo2({ http: Bt, protocolVersion: 1, url: t })).refs || []);
    if (e2.length > 0) return e2;
  } catch {
  }
  return Vt(e);
}
async function Ut(e, t, n, r = e.transport) {
  let o2 = Rt(n || e.ref), s2 = [`clone`, `--depth`, `1`];
  o2.cloneRef && (s2.push(`--branch`, o2.cloneRef), o2.singleBranch && s2.push(`--single-branch`)), s2.push(Et(e, r), t), await zt(`git`, s2), o2.checkoutRef && await zt(`git`, [`-C`, t, `checkout`, `--force`, o2.checkoutRef]), i.rmSync(a.join(t, `.git`), { force: true, recursive: true });
}
async function Wt(e, t, n, r = e.transport) {
  let o2 = Et(e, r), s2 = Rt(n || e.ref), c2 = s2.cloneRef && !Dt(s2.cloneRef) ? s2.cloneRef : void 0, l2 = s2.checkoutRef || (c2 ? void 0 : Ot(n || e.ref));
  try {
    await gt.clone({ fs: i, http: Bt, dir: t, depth: 1, ref: c2, singleBranch: !!c2, url: o2 });
  } catch (i2) {
    if (r !== `https`) throw i2;
    await Ut(e, t, n, r);
    return;
  }
  l2 && l2 !== `HEAD` && await gt.checkout({ force: true, fs: i, dir: t, ref: l2 }), i.rmSync(a.join(t, `.git`), { force: true, recursive: true });
}
function Gt(e, t, r, i2) {
  throw r === `ssh` && At(t) ? Mt(e, t) : r === `ssh` && kt(t) ? jt(e, t) : new k(`could not ${i2} ${e.url}`, { code: `COULD_NOT_FETCH`, original: t, url: e.url });
}
var Kt = { async fetchRefs(e) {
  try {
    return e.transport === `ssh` ? await Vt(e) : await Ht(e);
  } catch (t) {
    Gt(e, t, e.transport, `fetch`);
  }
}, async clone(e, t, n, r = e.transport) {
  try {
    r === `ssh` ? await Ut(e, t, n, r) : await Wt(e, t, n, r);
  } catch (t2) {
    Gt(e, t2, r, `clone`);
  }
} };
export {
  Kt as defaultGitClient
};
/*! Bundled license information:

degit/dist/client-D0hMiRUX.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)
  (*!
  * This code for `path.join` is directly copied from @zenfs/core/path for bundle size improvements.
  * SPDX-License-Identifier: LGPL-3.0-or-later
  * Copyright (c) James Prevett and other ZenFS contributors.
  *)
  (*! simple-concat. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)
  (*! simple-get. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)
*/
