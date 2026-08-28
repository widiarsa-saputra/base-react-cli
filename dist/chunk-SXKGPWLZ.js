#!/usr/bin/env node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x2) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x2, {
  get: (a2, b2) => (typeof require !== "undefined" ? require : a2)[b2]
}) : x2)(function(x2) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x2 + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/degit/dist/utils-Do89zw85.js
import { createRequire as e } from "module";
import t from "fs";
import n from "path";
import r from "os";
import i from "https";
import * as a from "url";
var o = Object.create;
var s = Object.defineProperty;
var c = Object.getOwnPropertyDescriptor;
var l = Object.getOwnPropertyNames;
var u = Object.getPrototypeOf;
var d = Object.prototype.hasOwnProperty;
var f = (e2, t2) => () => (t2 || (e2((t2 = { exports: {} }).exports, t2), e2 = null), t2.exports);
var p = (e2, t2, n2, r2) => {
  if (t2 && typeof t2 == `object` || typeof t2 == `function`) for (var i2 = l(t2), a2 = 0, o2 = i2.length, u2; a2 < o2; a2++) u2 = i2[a2], !d.call(e2, u2) && u2 !== n2 && s(e2, u2, { get: ((e3) => t2[e3]).bind(null, u2), enumerable: !(r2 = c(t2, u2)) || r2.enumerable });
  return e2;
};
var m = (e2, t2, n2) => (n2 = e2 == null ? {} : o(u(e2)), p(t2 || !e2 || !e2.__esModule ? s(n2, `default`, { value: e2, enumerable: true }) : n2, e2));
var h = e(import.meta.url);
var g = f(((e2, t2) => {
  var n2 = 1e3, r2 = n2 * 60, i2 = r2 * 60, a2 = i2 * 24, o2 = a2 * 7, s2 = a2 * 365.25;
  t2.exports = function(e3, t3) {
    t3 ||= {};
    var n3 = typeof e3;
    if (n3 === `string` && e3.length > 0) return c2(e3);
    if (n3 === `number` && isFinite(e3)) return t3.long ? u2(e3) : l2(e3);
    throw Error(`val is not a non-empty string or a valid number. val=` + JSON.stringify(e3));
  };
  function c2(e3) {
    if (e3 = String(e3), !(e3.length > 100)) {
      var t3 = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e3);
      if (t3) {
        var c3 = parseFloat(t3[1]);
        switch ((t3[2] || `ms`).toLowerCase()) {
          case `years`:
          case `year`:
          case `yrs`:
          case `yr`:
          case `y`:
            return c3 * s2;
          case `weeks`:
          case `week`:
          case `w`:
            return c3 * o2;
          case `days`:
          case `day`:
          case `d`:
            return c3 * a2;
          case `hours`:
          case `hour`:
          case `hrs`:
          case `hr`:
          case `h`:
            return c3 * i2;
          case `minutes`:
          case `minute`:
          case `mins`:
          case `min`:
          case `m`:
            return c3 * r2;
          case `seconds`:
          case `second`:
          case `secs`:
          case `sec`:
          case `s`:
            return c3 * n2;
          case `milliseconds`:
          case `millisecond`:
          case `msecs`:
          case `msec`:
          case `ms`:
            return c3;
          default:
            return;
        }
      }
    }
  }
  function l2(e3) {
    var t3 = Math.abs(e3);
    return t3 >= a2 ? Math.round(e3 / a2) + `d` : t3 >= i2 ? Math.round(e3 / i2) + `h` : t3 >= r2 ? Math.round(e3 / r2) + `m` : t3 >= n2 ? Math.round(e3 / n2) + `s` : e3 + `ms`;
  }
  function u2(e3) {
    var t3 = Math.abs(e3);
    return t3 >= a2 ? d2(e3, t3, a2, `day`) : t3 >= i2 ? d2(e3, t3, i2, `hour`) : t3 >= r2 ? d2(e3, t3, r2, `minute`) : t3 >= n2 ? d2(e3, t3, n2, `second`) : e3 + ` ms`;
  }
  function d2(e3, t3, n3, r3) {
    var i3 = t3 >= n3 * 1.5;
    return Math.round(e3 / n3) + ` ` + r3 + (i3 ? `s` : ``);
  }
}));
var _ = f(((e2, t2) => {
  function n2(e3) {
    n3.debug = n3, n3.default = n3, n3.coerce = c2, n3.disable = o2, n3.enable = i2, n3.enabled = s2, n3.humanize = g(), n3.destroy = l2, Object.keys(e3).forEach((t4) => {
      n3[t4] = e3[t4];
    }), n3.names = [], n3.skips = [], n3.formatters = {};
    function t3(e4) {
      let t4 = 0;
      for (let n4 = 0; n4 < e4.length; n4++) t4 = (t4 << 5) - t4 + e4.charCodeAt(n4), t4 |= 0;
      return n3.colors[Math.abs(t4) % n3.colors.length];
    }
    n3.selectColor = t3;
    function n3(e4) {
      let t4, i3 = null, a3, o3;
      function s3(...e5) {
        if (!s3.enabled) return;
        let r3 = s3, i4 = Number(/* @__PURE__ */ new Date());
        r3.diff = i4 - (t4 || i4), r3.prev = t4, r3.curr = i4, t4 = i4, e5[0] = n3.coerce(e5[0]), typeof e5[0] != `string` && e5.unshift(`%O`);
        let a4 = 0;
        e5[0] = e5[0].replace(/%([a-zA-Z%])/g, (t5, i5) => {
          if (t5 === `%%`) return `%`;
          a4++;
          let o4 = n3.formatters[i5];
          if (typeof o4 == `function`) {
            let n4 = e5[a4];
            t5 = o4.call(r3, n4), e5.splice(a4, 1), a4--;
          }
          return t5;
        }), n3.formatArgs.call(r3, e5), (r3.log || n3.log).apply(r3, e5);
      }
      return s3.namespace = e4, s3.useColors = n3.useColors(), s3.color = n3.selectColor(e4), s3.extend = r2, s3.destroy = n3.destroy, Object.defineProperty(s3, `enabled`, { enumerable: true, configurable: false, get: () => i3 === null ? (a3 !== n3.namespaces && (a3 = n3.namespaces, o3 = n3.enabled(e4)), o3) : i3, set: (e5) => {
        i3 = e5;
      } }), typeof n3.init == `function` && n3.init(s3), s3;
    }
    function r2(e4, t4) {
      let r3 = n3(this.namespace + (t4 === void 0 ? `:` : t4) + e4);
      return r3.log = this.log, r3;
    }
    function i2(e4) {
      n3.save(e4), n3.namespaces = e4, n3.names = [], n3.skips = [];
      let t4 = (typeof e4 == `string` ? e4 : ``).trim().replace(/\s+/g, `,`).split(`,`).filter(Boolean);
      for (let e5 of t4) e5[0] === `-` ? n3.skips.push(e5.slice(1)) : n3.names.push(e5);
    }
    function a2(e4, t4) {
      let n4 = 0, r3 = 0, i3 = -1, a3 = 0;
      for (; n4 < e4.length; ) if (r3 < t4.length && (t4[r3] === e4[n4] || t4[r3] === `*`)) t4[r3] === `*` ? (i3 = r3, a3 = n4, r3++) : (n4++, r3++);
      else if (i3 !== -1) r3 = i3 + 1, a3++, n4 = a3;
      else return false;
      for (; r3 < t4.length && t4[r3] === `*`; ) r3++;
      return r3 === t4.length;
    }
    function o2() {
      let e4 = [...n3.names, ...n3.skips.map((e5) => `-` + e5)].join(`,`);
      return n3.enable(``), e4;
    }
    function s2(e4) {
      for (let t4 of n3.skips) if (a2(e4, t4)) return false;
      for (let t4 of n3.names) if (a2(e4, t4)) return true;
      return false;
    }
    function c2(e4) {
      return e4 instanceof Error ? e4.stack || e4.message : e4;
    }
    function l2() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return n3.enable(n3.load()), n3;
  }
  t2.exports = n2;
}));
var v = f(((e2, t2) => {
  e2.formatArgs = r2, e2.save = i2, e2.load = a2, e2.useColors = n2, e2.storage = o2(), e2.destroy = /* @__PURE__ */ (() => {
    let e3 = false;
    return () => {
      e3 || (e3 = true, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })(), e2.colors = `#0000CC.#0000FF.#0033CC.#0033FF.#0066CC.#0066FF.#0099CC.#0099FF.#00CC00.#00CC33.#00CC66.#00CC99.#00CCCC.#00CCFF.#3300CC.#3300FF.#3333CC.#3333FF.#3366CC.#3366FF.#3399CC.#3399FF.#33CC00.#33CC33.#33CC66.#33CC99.#33CCCC.#33CCFF.#6600CC.#6600FF.#6633CC.#6633FF.#66CC00.#66CC33.#9900CC.#9900FF.#9933CC.#9933FF.#99CC00.#99CC33.#CC0000.#CC0033.#CC0066.#CC0099.#CC00CC.#CC00FF.#CC3300.#CC3333.#CC3366.#CC3399.#CC33CC.#CC33FF.#CC6600.#CC6633.#CC9900.#CC9933.#CCCC00.#CCCC33.#FF0000.#FF0033.#FF0066.#FF0099.#FF00CC.#FF00FF.#FF3300.#FF3333.#FF3366.#FF3399.#FF33CC.#FF33FF.#FF6600.#FF6633.#FF9900.#FF9933.#FFCC00.#FFCC33`.split(`.`);
  function n2() {
    if (typeof window < `u` && window.process && (window.process.type === `renderer` || window.process.__nwjs)) return true;
    if (typeof navigator < `u` && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return false;
    let e3;
    return typeof document < `u` && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window < `u` && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator < `u` && navigator.userAgent && (e3 = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(e3[1], 10) >= 31 || typeof navigator < `u` && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function r2(e3) {
    if (e3[0] = (this.useColors ? `%c` : ``) + this.namespace + (this.useColors ? ` %c` : ` `) + e3[0] + (this.useColors ? `%c ` : ` `) + `+` + t2.exports.humanize(this.diff), !this.useColors) return;
    let n3 = `color: ` + this.color;
    e3.splice(1, 0, n3, `color: inherit`);
    let r3 = 0, i3 = 0;
    e3[0].replace(/%[a-zA-Z%]/g, (e4) => {
      e4 !== `%%` && (r3++, e4 === `%c` && (i3 = r3));
    }), e3.splice(i3, 0, n3);
  }
  e2.log = console.debug || console.log || (() => {
  });
  function i2(t3) {
    try {
      t3 ? e2.storage.setItem(`debug`, t3) : e2.storage.removeItem(`debug`);
    } catch {
    }
  }
  function a2() {
    let t3;
    try {
      t3 = e2.storage.getItem(`debug`) || e2.storage.getItem(`DEBUG`);
    } catch {
    }
    return !t3 && typeof process < `u` && `env` in process && (t3 = process.env.DEBUG), t3;
  }
  function o2() {
    try {
      return localStorage;
    } catch {
    }
  }
  t2.exports = _()(e2);
  let { formatters: s2 } = t2.exports;
  s2.j = function(e3) {
    try {
      return JSON.stringify(e3);
    } catch (e4) {
      return `[UnexpectedJSONParseError]: ` + e4.message;
    }
  };
}));
var y = f(((e2, t2) => {
  t2.exports = (e3, t3 = process.argv) => {
    let n2 = e3.startsWith(`-`) ? `` : e3.length === 1 ? `-` : `--`, r2 = t3.indexOf(n2 + e3), i2 = t3.indexOf(`--`);
    return r2 !== -1 && (i2 === -1 || r2 < i2);
  };
}));
var b = f(((e2, t2) => {
  let n2 = h(`os`), r2 = h(`tty`), i2 = y(), { env: a2 } = process, o2;
  i2(`no-color`) || i2(`no-colors`) || i2(`color=false`) || i2(`color=never`) ? o2 = 0 : (i2(`color`) || i2(`colors`) || i2(`color=true`) || i2(`color=always`)) && (o2 = 1), `FORCE_COLOR` in a2 && (o2 = a2.FORCE_COLOR === `true` ? 1 : a2.FORCE_COLOR === `false` ? 0 : a2.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(a2.FORCE_COLOR, 10), 3));
  function s2(e3) {
    return e3 === 0 ? false : { level: e3, hasBasic: true, has256: e3 >= 2, has16m: e3 >= 3 };
  }
  function c2(e3, t3) {
    if (o2 === 0) return 0;
    if (i2(`color=16m`) || i2(`color=full`) || i2(`color=truecolor`)) return 3;
    if (i2(`color=256`)) return 2;
    if (e3 && !t3 && o2 === void 0) return 0;
    let r3 = o2 || 0;
    if (a2.TERM === `dumb`) return r3;
    if (process.platform === `win32`) {
      let e4 = n2.release().split(`.`);
      return Number(e4[0]) >= 10 && Number(e4[2]) >= 10586 ? Number(e4[2]) >= 14931 ? 3 : 2 : 1;
    }
    if (`CI` in a2) return [`TRAVIS`, `CIRCLECI`, `APPVEYOR`, `GITLAB_CI`, `GITHUB_ACTIONS`, `BUILDKITE`].some((e4) => e4 in a2) || a2.CI_NAME === `codeship` ? 1 : r3;
    if (`TEAMCITY_VERSION` in a2) return +!!/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(a2.TEAMCITY_VERSION);
    if (a2.COLORTERM === `truecolor`) return 3;
    if (`TERM_PROGRAM` in a2) {
      let e4 = parseInt((a2.TERM_PROGRAM_VERSION || ``).split(`.`)[0], 10);
      switch (a2.TERM_PROGRAM) {
        case `iTerm.app`:
          return e4 >= 3 ? 3 : 2;
        case `Apple_Terminal`:
          return 2;
      }
    }
    return /-256(color)?$/i.test(a2.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(a2.TERM) || `COLORTERM` in a2 ? 1 : r3;
  }
  function l2(e3) {
    return s2(c2(e3, e3 && e3.isTTY));
  }
  t2.exports = { supportsColor: l2, stdout: s2(c2(true, r2.isatty(1))), stderr: s2(c2(true, r2.isatty(2))) };
}));
var x = f(((e2, t2) => {
  let n2 = h(`tty`), r2 = h(`util`);
  e2.init = u2, e2.log = s2, e2.formatArgs = a2, e2.save = c2, e2.load = l2, e2.useColors = i2, e2.destroy = r2.deprecate(() => {
  }, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."), e2.colors = [6, 2, 3, 4, 5, 1];
  try {
    let t3 = b();
    t3 && (t3.stderr || t3).level >= 2 && (e2.colors = [20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221]);
  } catch {
  }
  e2.inspectOpts = Object.keys(process.env).filter((e3) => /^debug_/i.test(e3)).reduce((e3, t3) => {
    let n3 = t3.substring(6).toLowerCase().replace(/_([a-z])/g, (e4, t4) => t4.toUpperCase()), r3 = process.env[t3];
    return r3 = /^(yes|on|true|enabled)$/i.test(r3) ? true : /^(no|off|false|disabled)$/i.test(r3) ? false : r3 === `null` ? null : Number(r3), e3[n3] = r3, e3;
  }, {});
  function i2() {
    return `colors` in e2.inspectOpts ? !!e2.inspectOpts.colors : n2.isatty(process.stderr.fd);
  }
  function a2(e3) {
    let { namespace: n3, useColors: r3 } = this;
    if (r3) {
      let r4 = this.color, i3 = `\x1B[3` + (r4 < 8 ? r4 : `8;5;` + r4), a3 = `  ${i3};1m${n3} \x1B[0m`;
      e3[0] = a3 + e3[0].split(`
`).join(`
` + a3), e3.push(i3 + `m+` + t2.exports.humanize(this.diff) + `\x1B[0m`);
    } else e3[0] = o2() + n3 + ` ` + e3[0];
  }
  function o2() {
    return e2.inspectOpts.hideDate ? `` : (/* @__PURE__ */ new Date()).toISOString() + ` `;
  }
  function s2(...t3) {
    return process.stderr.write(r2.formatWithOptions(e2.inspectOpts, ...t3) + `
`);
  }
  function c2(e3) {
    e3 ? process.env.DEBUG = e3 : delete process.env.DEBUG;
  }
  function l2() {
    return process.env.DEBUG;
  }
  function u2(t3) {
    t3.inspectOpts = {};
    let n3 = Object.keys(e2.inspectOpts);
    for (let r3 = 0; r3 < n3.length; r3++) t3.inspectOpts[n3[r3]] = e2.inspectOpts[n3[r3]];
  }
  t2.exports = _()(e2);
  let { formatters: d2 } = t2.exports;
  d2.o = function(e3) {
    return this.inspectOpts.colors = this.useColors, r2.inspect(e3, this.inspectOpts).split(`
`).map((e4) => e4.trim()).join(` `);
  }, d2.O = function(e3) {
    return this.inspectOpts.colors = this.useColors, r2.inspect(e3, this.inspectOpts);
  };
}));
var S = f(((e2, t2) => {
  typeof process > `u` || process.type === `renderer` || process.browser === true || process.__nwjs ? t2.exports = v() : t2.exports = x();
}));
var C = f(((e2) => {
  Object.defineProperty(e2, `__esModule`, { value: true });
  function t2(e3) {
    return function(t3, n2) {
      return new Promise((r2, i2) => {
        e3.call(this, t3, n2, (e4, t4) => {
          e4 ? i2(e4) : r2(t4);
        });
      });
    };
  }
  e2.default = t2;
}));
var w = f(((e2, t2) => {
  var n2 = e2 && e2.__importDefault || function(e3) {
    return e3 && e3.__esModule ? e3 : { default: e3 };
  };
  let r2 = h(`events`), i2 = n2(S()), a2 = n2(C()), o2 = i2.default(`agent-base`);
  function s2(e3) {
    return !!e3 && typeof e3.addRequest == `function`;
  }
  function c2() {
    let { stack: e3 } = Error();
    return typeof e3 == `string` ? e3.split(`
`).some((e4) => e4.indexOf(`(https.js:`) !== -1 || e4.indexOf(`node:https:`) !== -1) : false;
  }
  function l2(e3, t3) {
    return new l2.Agent(e3, t3);
  }
  (function(e3) {
    class t3 extends r2.EventEmitter {
      constructor(e4, t4) {
        super();
        let n3 = t4;
        typeof e4 == `function` ? this.callback = e4 : e4 && (n3 = e4), this.timeout = null, n3 && typeof n3.timeout == `number` && (this.timeout = n3.timeout), this.maxFreeSockets = 1, this.maxSockets = 1, this.maxTotalSockets = 1 / 0, this.sockets = {}, this.freeSockets = {}, this.requests = {}, this.options = {};
      }
      get defaultPort() {
        return typeof this.explicitDefaultPort == `number` ? this.explicitDefaultPort : c2() ? 443 : 80;
      }
      set defaultPort(e4) {
        this.explicitDefaultPort = e4;
      }
      get protocol() {
        return typeof this.explicitProtocol == `string` ? this.explicitProtocol : c2() ? `https:` : `http:`;
      }
      set protocol(e4) {
        this.explicitProtocol = e4;
      }
      callback(e4, t4, n3) {
        throw Error('"agent-base" has no default implementation, you must subclass and override `callback()`');
      }
      addRequest(e4, t4) {
        let n3 = Object.assign({}, t4);
        typeof n3.secureEndpoint != `boolean` && (n3.secureEndpoint = c2()), n3.host ??= `localhost`, n3.port ??= n3.secureEndpoint ? 443 : 80, n3.protocol ??= n3.secureEndpoint ? `https:` : `http:`, n3.host && n3.path && delete n3.path, delete n3.agent, delete n3.hostname, delete n3._defaultAgent, delete n3.defaultPort, delete n3.createConnection, e4._last = true, e4.shouldKeepAlive = false;
        let r3 = false, i3 = null, l3 = n3.timeout || this.timeout, u2 = (t5) => {
          e4._hadError ||= (e4.emit(`error`, t5), true);
        }, d2 = () => {
          i3 = null, r3 = true;
          let e5 = Error(`A "socket" was not created for HTTP request before ${l3}ms`);
          e5.code = `ETIMEOUT`, u2(e5);
        }, f2 = (e5) => {
          r3 || (i3 !== null && (clearTimeout(i3), i3 = null), u2(e5));
        }, p2 = (t5) => {
          if (!r3) {
            if (i3 != null && (clearTimeout(i3), i3 = null), s2(t5)) {
              o2(`Callback returned another Agent instance %o`, t5.constructor.name), t5.addRequest(e4, n3);
              return;
            }
            if (t5) {
              t5.once(`free`, () => {
                this.freeSocket(t5, n3);
              }), e4.onSocket(t5);
              return;
            }
            u2(Error(`no Duplex stream was returned to agent-base for \`${e4.method} ${e4.path}\``));
          }
        };
        if (typeof this.callback != `function`) {
          u2(Error("`callback` is not defined"));
          return;
        }
        this.promisifiedCallback || (this.callback.length >= 3 ? (o2(`Converting legacy callback function to promise`), this.promisifiedCallback = a2.default(this.callback)) : this.promisifiedCallback = this.callback), typeof l3 == `number` && l3 > 0 && (i3 = setTimeout(d2, l3)), `port` in n3 && typeof n3.port != `number` && (n3.port = Number(n3.port));
        try {
          o2(`Resolving socket for %o request: %o`, n3.protocol, `${e4.method} ${e4.path}`), Promise.resolve(this.promisifiedCallback(e4, n3)).then(p2, f2);
        } catch (e5) {
          Promise.reject(e5).catch(f2);
        }
      }
      freeSocket(e4, t4) {
        o2(`Freeing socket %o %o`, e4.constructor.name, t4), e4.destroy();
      }
      destroy() {
        o2(`Destroying agent %o`, this.constructor.name);
      }
    }
    e3.Agent = t3, e3.prototype = e3.Agent.prototype;
  })(l2 ||= {}), t2.exports = l2;
}));
var T = f(((e2) => {
  var t2 = e2 && e2.__importDefault || function(e3) {
    return e3 && e3.__esModule ? e3 : { default: e3 };
  };
  Object.defineProperty(e2, `__esModule`, { value: true });
  let n2 = t2(S()).default(`https-proxy-agent:parse-proxy-response`);
  function r2(e3) {
    return new Promise((t3, r3) => {
      let i2 = 0, a2 = [];
      function o2() {
        let t4 = e3.read();
        t4 ? d2(t4) : e3.once(`readable`, o2);
      }
      function s2() {
        e3.removeListener(`end`, l2), e3.removeListener(`error`, u2), e3.removeListener(`close`, c2), e3.removeListener(`readable`, o2);
      }
      function c2(e4) {
        n2(`onclose had error %o`, e4);
      }
      function l2() {
        n2(`onend`);
      }
      function u2(e4) {
        s2(), n2(`onerror %o`, e4), r3(e4);
      }
      function d2(e4) {
        a2.push(e4), i2 += e4.length;
        let r4 = Buffer.concat(a2, i2);
        if (r4.indexOf(`\r
\r
`) === -1) {
          n2(`have not received end of HTTP headers yet...`), o2();
          return;
        }
        let s3 = r4.toString(`ascii`, 0, r4.indexOf(`\r
`)), c3 = +s3.split(` `)[1];
        n2(`got proxy server response: %o`, s3), t3({ statusCode: c3, buffered: r4 });
      }
      e3.on(`error`, u2), e3.on(`close`, c2), e3.on(`end`, l2), o2();
    });
  }
  e2.default = r2;
}));
var E = f(((e2) => {
  var t2 = e2 && e2.__awaiter || function(e3, t3, n3, r3) {
    function i3(e4) {
      return e4 instanceof n3 ? e4 : new n3(function(t4) {
        t4(e4);
      });
    }
    return new (n3 ||= Promise)(function(n4, a3) {
      function o3(e4) {
        try {
          c3(r3.next(e4));
        } catch (e5) {
          a3(e5);
        }
      }
      function s3(e4) {
        try {
          c3(r3.throw(e4));
        } catch (e5) {
          a3(e5);
        }
      }
      function c3(e4) {
        e4.done ? n4(e4.value) : i3(e4.value).then(o3, s3);
      }
      c3((r3 = r3.apply(e3, t3 || [])).next());
    });
  }, n2 = e2 && e2.__importDefault || function(e3) {
    return e3 && e3.__esModule ? e3 : { default: e3 };
  };
  Object.defineProperty(e2, `__esModule`, { value: true });
  let r2 = n2(h(`net`)), i2 = n2(h(`tls`)), a2 = n2(h(`url`)), o2 = n2(h(`assert`)), s2 = n2(S()), c2 = w(), l2 = n2(T()), u2 = s2.default(`https-proxy-agent:agent`);
  e2.default = class extends c2.Agent {
    constructor(e3) {
      let t3;
      if (t3 = typeof e3 == `string` ? a2.default.parse(e3) : e3, !t3) throw Error("an HTTP(S) proxy server `host` and `port` must be specified!");
      u2(`creating new HttpsProxyAgent instance: %o`, t3), super(t3);
      let n3 = Object.assign({}, t3);
      this.secureProxy = t3.secureProxy || p2(n3.protocol), n3.host = n3.hostname || n3.host, typeof n3.port == `string` && (n3.port = parseInt(n3.port, 10)), !n3.port && n3.host && (n3.port = this.secureProxy ? 443 : 80), this.secureProxy && !(`ALPNProtocols` in n3) && (n3.ALPNProtocols = [`http 1.1`]), n3.host && n3.path && (delete n3.path, delete n3.pathname), this.proxy = n3;
    }
    callback(e3, n3) {
      return t2(this, void 0, void 0, function* () {
        let { proxy: t3, secureProxy: a3 } = this, s3;
        a3 ? (u2("Creating `tls.Socket`: %o", t3), s3 = i2.default.connect(t3)) : (u2("Creating `net.Socket`: %o", t3), s3 = r2.default.connect(t3));
        let c3 = Object.assign({}, t3.headers), p3 = `CONNECT ${`${n3.host}:${n3.port}`} HTTP/1.1\r
`;
        t3.auth && (c3[`Proxy-Authorization`] = `Basic ${Buffer.from(t3.auth).toString(`base64`)}`);
        let { host: h2, port: g2, secureEndpoint: _2 } = n3;
        f2(g2, _2) || (h2 += `:${g2}`), c3.Host = h2, c3.Connection = `close`;
        for (let e4 of Object.keys(c3)) p3 += `${e4}: ${c3[e4]}\r
`;
        let v2 = l2.default(s3);
        s3.write(`${p3}\r
`);
        let { statusCode: y2, buffered: b2 } = yield v2;
        if (y2 === 200) {
          if (e3.once(`socket`, d2), n3.secureEndpoint) {
            let e4 = n3.servername || n3.host;
            if (!e4) throw Error(`Could not determine "servername"`);
            return u2(`Upgrading socket connection to TLS`), i2.default.connect(Object.assign(Object.assign({}, m2(n3, `host`, `hostname`, `path`, `port`)), { socket: s3, servername: e4 }));
          }
          return s3;
        }
        s3.destroy();
        let x2 = new r2.default.Socket();
        return x2.readable = true, e3.once(`socket`, (e4) => {
          u2(`replaying proxy buffer for failed request`), o2.default(e4.listenerCount(`data`) > 0), e4.push(b2), e4.push(null);
        }), x2;
      });
    }
  };
  function d2(e3) {
    e3.resume();
  }
  function f2(e3, t3) {
    return !!(!t3 && e3 === 80 || t3 && e3 === 443);
  }
  function p2(e3) {
    return typeof e3 == `string` ? /^https:?$/i.test(e3) : false;
  }
  function m2(e3, ...t3) {
    let n3 = {}, r3;
    for (r3 in e3) t3.includes(r3) || (n3[r3] = e3[r3]);
    return n3;
  }
}));
var D = m(f(((e2, t2) => {
  let n2 = (e2 && e2.__importDefault || function(e3) {
    return e3 && e3.__esModule ? e3 : { default: e3 };
  })(E());
  function r2(e3) {
    return new n2.default(e3);
  }
  (function(e3) {
    e3.HttpsProxyAgent = n2.default, e3.prototype = n2.default.prototype;
  })(r2 ||= {}), t2.exports = r2;
}))(), 1);
var O = `degit.json`;
var k = class extends Error {
  constructor(e2, t2 = {}) {
    super(e2), Object.assign(this, t2);
  }
};
function A(e2, t2) {
  let r2 = n.resolve(e2, t2), i2 = n.relative(e2, r2);
  if (!(i2 === `` || i2.startsWith(`..`) || n.isAbsolute(i2))) return r2;
}
function j(e2) {
  try {
    return JSON.parse(t.readFileSync(e2, `utf8`));
  } catch {
    return null;
  }
}
function M(e2) {
  t.mkdirSync(e2, { recursive: true });
}
function N(e2, n2, r2) {
  return new Promise((o2, s2) => {
    let c2 = e2;
    if (r2) {
      let t2 = a.parse(e2);
      c2 = { agent: (0, D.default)(r2), hostname: t2.host, path: t2.path };
    }
    i.get(c2, (e3) => {
      let i2 = e3.statusCode;
      i2 >= 400 ? (e3.resume(), s2({ code: i2, message: e3.statusMessage })) : i2 >= 300 ? (e3.resume(), N(e3.headers.location, n2, r2).then(o2, s2)) : e3.pipe(t.createWriteStream(n2)).on(`finish`, () => o2()).on(`error`, s2);
    }).on(`error`, s2);
  });
}
function P(e2, r2) {
  let i2 = n.join(e2, `tmp`);
  t.rmSync(i2, { force: true, recursive: true }), M(i2), t.readdirSync(r2).forEach((e3) => {
    let a2 = n.join(r2, e3), o2 = n.join(i2, e3);
    t.lstatSync(a2).isDirectory() ? (t.cpSync(a2, o2, { recursive: true }), t.rmSync(a2, { force: true, recursive: true })) : (t.copyFileSync(a2, o2), t.unlinkSync(a2));
  });
}
function F(e2, r2) {
  let i2 = n.join(e2, `tmp`);
  t.readdirSync(i2).forEach((e3) => {
    let a2 = n.join(i2, e3), o2 = n.join(r2, e3);
    t.lstatSync(a2).isDirectory() ? (t.cpSync(a2, o2, { recursive: true }), t.rmSync(a2, { force: true, recursive: true })) : (e3 !== `degit.json` && t.copyFileSync(a2, o2), t.unlinkSync(a2));
  }), t.rmSync(i2, { force: true, recursive: true });
}
function I({ env: e2 = process.env, homedir: t2 = r.homedir(), platform: i2 = process.platform } = {}) {
  return i2 === `win32` ? n.join(e2.LOCALAPPDATA ?? n.join(t2, `AppData`, `Local`), `degit`) : i2 === `darwin` ? n.join(t2, `Library`, `Caches`, `degit`) : n.join(e2.XDG_CACHE_HOME ?? n.join(t2, `.cache`), `degit`);
}
var L = I();

export {
  __require,
  __commonJS,
  __export,
  __toESM,
  f,
  m,
  h,
  O,
  k,
  A,
  j,
  M,
  N,
  P,
  F,
  L
};
