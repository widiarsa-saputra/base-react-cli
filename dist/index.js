#!/usr/bin/env node
import {
  A,
  F,
  L,
  M,
  N,
  O,
  P,
  __commonJS,
  __export,
  __require,
  __toESM,
  f,
  h,
  j,
  k,
  m
} from "./chunk-SXKGPWLZ.js";

// node_modules/cli-width/index.js
var require_cli_width = __commonJS({
  "node_modules/cli-width/index.js"(exports, module) {
    "use strict";
    module.exports = cliWidth2;
    function normalizeOpts(options) {
      const defaultOpts = {
        defaultWidth: 0,
        output: process.stdout,
        tty: __require("tty")
      };
      if (!options) {
        return defaultOpts;
      }
      Object.keys(defaultOpts).forEach(function(key) {
        if (!options[key]) {
          options[key] = defaultOpts[key];
        }
      });
      return options;
    }
    function cliWidth2(options) {
      const opts = normalizeOpts(options);
      if (opts.output.getWindowSize) {
        return opts.output.getWindowSize()[0] || opts.defaultWidth;
      }
      if (opts.tty.getWindowSize) {
        return opts.tty.getWindowSize()[1] || opts.defaultWidth;
      }
      if (opts.output.columns) {
        return opts.output.columns;
      }
      if (process.env.CLI_WIDTH) {
        const width = parseInt(process.env.CLI_WIDTH, 10);
        if (!isNaN(width) && width !== 0) {
          return width;
        }
      }
      return opts.defaultWidth;
    }
  }
});

// node_modules/mute-stream/lib/index.js
var require_lib = __commonJS({
  "node_modules/mute-stream/lib/index.js"(exports, module) {
    "use strict";
    var Stream = __require("stream");
    var MuteStream2 = class extends Stream {
      #isTTY = null;
      constructor(opts = {}) {
        super(opts);
        this.writable = this.readable = true;
        this.muted = false;
        this.on("pipe", this._onpipe);
        this.replace = opts.replace;
        this._prompt = opts.prompt || null;
        this._hadControl = false;
      }
      #destSrc(key, def) {
        if (this._dest) {
          return this._dest[key];
        }
        if (this._src) {
          return this._src[key];
        }
        return def;
      }
      #proxy(method, ...args) {
        if (typeof this._dest?.[method] === "function") {
          this._dest[method](...args);
        }
        if (typeof this._src?.[method] === "function") {
          this._src[method](...args);
        }
      }
      get isTTY() {
        if (this.#isTTY !== null) {
          return this.#isTTY;
        }
        return this.#destSrc("isTTY", false);
      }
      // basically just get replace the getter/setter with a regular value
      set isTTY(val) {
        this.#isTTY = val;
      }
      get rows() {
        return this.#destSrc("rows");
      }
      get columns() {
        return this.#destSrc("columns");
      }
      mute() {
        this.muted = true;
      }
      unmute() {
        this.muted = false;
      }
      _onpipe(src) {
        this._src = src;
      }
      pipe(dest, options) {
        this._dest = dest;
        return super.pipe(dest, options);
      }
      pause() {
        if (this._src) {
          return this._src.pause();
        }
      }
      resume() {
        if (this._src) {
          return this._src.resume();
        }
      }
      write(c) {
        if (this.muted) {
          if (!this.replace) {
            return true;
          }
          if (c.match(/^\u001b/)) {
            if (c.indexOf(this._prompt) === 0) {
              c = c.slice(this._prompt.length);
              c = c.replace(/./g, this.replace);
              c = this._prompt + c;
            }
            this._hadControl = true;
            return this.emit("data", c);
          } else {
            if (this._prompt && this._hadControl && c.indexOf(this._prompt) === 0) {
              this._hadControl = false;
              this.emit("data", this._prompt);
              c = c.slice(this._prompt.length);
            }
            c = c.toString().replace(/./g, this.replace);
          }
        }
        this.emit("data", c);
      }
      end(c) {
        if (this.muted) {
          if (c && this.replace) {
            c = c.toString().replace(/./g, this.replace);
          } else {
            c = null;
          }
        }
        if (c) {
          this.emit("data", c);
        }
        this.emit("end");
      }
      destroy(...args) {
        return this.#proxy("destroy", ...args);
      }
      destroySoon(...args) {
        return this.#proxy("destroySoon", ...args);
      }
      close(...args) {
        return this.#proxy("close", ...args);
      }
    };
    module.exports = MuteStream2;
  }
});

// node_modules/universalify/index.js
var require_universalify = __commonJS({
  "node_modules/universalify/index.js"(exports) {
    "use strict";
    exports.fromCallback = function(fn2) {
      return Object.defineProperty(function(...args) {
        if (typeof args[args.length - 1] === "function") fn2.apply(this, args);
        else {
          return new Promise((resolve, reject) => {
            args.push((err, res) => err != null ? reject(err) : resolve(res));
            fn2.apply(this, args);
          });
        }
      }, "name", { value: fn2.name });
    };
    exports.fromPromise = function(fn2) {
      return Object.defineProperty(function(...args) {
        const cb = args[args.length - 1];
        if (typeof cb !== "function") return fn2.apply(this, args);
        else {
          args.pop();
          fn2.apply(this, args).then((r) => cb(null, r), cb);
        }
      }, "name", { value: fn2.name });
    };
  }
});

// node_modules/graceful-fs/polyfills.js
var require_polyfills = __commonJS({
  "node_modules/graceful-fs/polyfills.js"(exports, module) {
    "use strict";
    var constants = __require("constants");
    var origCwd = process.cwd;
    var cwd = null;
    var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
    process.cwd = function() {
      if (!cwd)
        cwd = origCwd.call(process);
      return cwd;
    };
    try {
      process.cwd();
    } catch (er2) {
    }
    if (typeof process.chdir === "function") {
      chdir = process.chdir;
      process.chdir = function(d) {
        cwd = null;
        chdir.call(process, d);
      };
      if (Object.setPrototypeOf) Object.setPrototypeOf(process.chdir, chdir);
    }
    var chdir;
    module.exports = patch;
    function patch(fs10) {
      if (constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
        patchLchmod(fs10);
      }
      if (!fs10.lutimes) {
        patchLutimes(fs10);
      }
      fs10.chown = chownFix(fs10.chown);
      fs10.fchown = chownFix(fs10.fchown);
      fs10.lchown = chownFix(fs10.lchown);
      fs10.chmod = chmodFix(fs10.chmod);
      fs10.fchmod = chmodFix(fs10.fchmod);
      fs10.lchmod = chmodFix(fs10.lchmod);
      fs10.chownSync = chownFixSync(fs10.chownSync);
      fs10.fchownSync = chownFixSync(fs10.fchownSync);
      fs10.lchownSync = chownFixSync(fs10.lchownSync);
      fs10.chmodSync = chmodFixSync(fs10.chmodSync);
      fs10.fchmodSync = chmodFixSync(fs10.fchmodSync);
      fs10.lchmodSync = chmodFixSync(fs10.lchmodSync);
      fs10.stat = statFix(fs10.stat);
      fs10.fstat = statFix(fs10.fstat);
      fs10.lstat = statFix(fs10.lstat);
      fs10.statSync = statFixSync(fs10.statSync);
      fs10.fstatSync = statFixSync(fs10.fstatSync);
      fs10.lstatSync = statFixSync(fs10.lstatSync);
      if (fs10.chmod && !fs10.lchmod) {
        fs10.lchmod = function(path11, mode, cb) {
          if (cb) process.nextTick(cb);
        };
        fs10.lchmodSync = function() {
        };
      }
      if (fs10.chown && !fs10.lchown) {
        fs10.lchown = function(path11, uid, gid, cb) {
          if (cb) process.nextTick(cb);
        };
        fs10.lchownSync = function() {
        };
      }
      if (platform === "win32") {
        fs10.rename = typeof fs10.rename !== "function" ? fs10.rename : (function(fs$rename) {
          function rename(from, to2, cb) {
            var start = Date.now();
            var backoff = 0;
            fs$rename(from, to2, function CB(er2) {
              if (er2 && (er2.code === "EACCES" || er2.code === "EPERM" || er2.code === "EBUSY") && Date.now() - start < 6e4) {
                setTimeout(function() {
                  fs10.stat(to2, function(stater, st2) {
                    if (stater && stater.code === "ENOENT")
                      fs$rename(from, to2, CB);
                    else
                      cb(er2);
                  });
                }, backoff);
                if (backoff < 100)
                  backoff += 10;
                return;
              }
              if (cb) cb(er2);
            });
          }
          if (Object.setPrototypeOf) Object.setPrototypeOf(rename, fs$rename);
          return rename;
        })(fs10.rename);
      }
      fs10.read = typeof fs10.read !== "function" ? fs10.read : (function(fs$read) {
        function read(fd, buffer, offset, length, position, callback_) {
          var callback;
          if (callback_ && typeof callback_ === "function") {
            var eagCounter = 0;
            callback = function(er2, _2, __) {
              if (er2 && er2.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                return fs$read.call(fs10, fd, buffer, offset, length, position, callback);
              }
              callback_.apply(this, arguments);
            };
          }
          return fs$read.call(fs10, fd, buffer, offset, length, position, callback);
        }
        if (Object.setPrototypeOf) Object.setPrototypeOf(read, fs$read);
        return read;
      })(fs10.read);
      fs10.readSync = typeof fs10.readSync !== "function" ? fs10.readSync : /* @__PURE__ */ (function(fs$readSync) {
        return function(fd, buffer, offset, length, position) {
          var eagCounter = 0;
          while (true) {
            try {
              return fs$readSync.call(fs10, fd, buffer, offset, length, position);
            } catch (er2) {
              if (er2.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                continue;
              }
              throw er2;
            }
          }
        };
      })(fs10.readSync);
      function patchLchmod(fs11) {
        fs11.lchmod = function(path11, mode, callback) {
          fs11.open(
            path11,
            constants.O_WRONLY | constants.O_SYMLINK,
            mode,
            function(err, fd) {
              if (err) {
                if (callback) callback(err);
                return;
              }
              fs11.fchmod(fd, mode, function(err2) {
                fs11.close(fd, function(err22) {
                  if (callback) callback(err2 || err22);
                });
              });
            }
          );
        };
        fs11.lchmodSync = function(path11, mode) {
          var fd = fs11.openSync(path11, constants.O_WRONLY | constants.O_SYMLINK, mode);
          var threw = true;
          var ret;
          try {
            ret = fs11.fchmodSync(fd, mode);
            threw = false;
          } finally {
            if (threw) {
              try {
                fs11.closeSync(fd);
              } catch (er2) {
              }
            } else {
              fs11.closeSync(fd);
            }
          }
          return ret;
        };
      }
      function patchLutimes(fs11) {
        if (constants.hasOwnProperty("O_SYMLINK") && fs11.futimes) {
          fs11.lutimes = function(path11, at2, mt2, cb) {
            fs11.open(path11, constants.O_SYMLINK, function(er2, fd) {
              if (er2) {
                if (cb) cb(er2);
                return;
              }
              fs11.futimes(fd, at2, mt2, function(er3) {
                fs11.close(fd, function(er22) {
                  if (cb) cb(er3 || er22);
                });
              });
            });
          };
          fs11.lutimesSync = function(path11, at2, mt2) {
            var fd = fs11.openSync(path11, constants.O_SYMLINK);
            var ret;
            var threw = true;
            try {
              ret = fs11.futimesSync(fd, at2, mt2);
              threw = false;
            } finally {
              if (threw) {
                try {
                  fs11.closeSync(fd);
                } catch (er2) {
                }
              } else {
                fs11.closeSync(fd);
              }
            }
            return ret;
          };
        } else if (fs11.futimes) {
          fs11.lutimes = function(_a2, _b, _c, cb) {
            if (cb) process.nextTick(cb);
          };
          fs11.lutimesSync = function() {
          };
        }
      }
      function chmodFix(orig) {
        if (!orig) return orig;
        return function(target, mode, cb) {
          return orig.call(fs10, target, mode, function(er2) {
            if (chownErOk(er2)) er2 = null;
            if (cb) cb.apply(this, arguments);
          });
        };
      }
      function chmodFixSync(orig) {
        if (!orig) return orig;
        return function(target, mode) {
          try {
            return orig.call(fs10, target, mode);
          } catch (er2) {
            if (!chownErOk(er2)) throw er2;
          }
        };
      }
      function chownFix(orig) {
        if (!orig) return orig;
        return function(target, uid, gid, cb) {
          return orig.call(fs10, target, uid, gid, function(er2) {
            if (chownErOk(er2)) er2 = null;
            if (cb) cb.apply(this, arguments);
          });
        };
      }
      function chownFixSync(orig) {
        if (!orig) return orig;
        return function(target, uid, gid) {
          try {
            return orig.call(fs10, target, uid, gid);
          } catch (er2) {
            if (!chownErOk(er2)) throw er2;
          }
        };
      }
      function statFix(orig) {
        if (!orig) return orig;
        return function(target, options, cb) {
          if (typeof options === "function") {
            cb = options;
            options = null;
          }
          function callback(er2, stats) {
            if (stats) {
              if (stats.uid < 0) stats.uid += 4294967296;
              if (stats.gid < 0) stats.gid += 4294967296;
            }
            if (cb) cb.apply(this, arguments);
          }
          return options ? orig.call(fs10, target, options, callback) : orig.call(fs10, target, callback);
        };
      }
      function statFixSync(orig) {
        if (!orig) return orig;
        return function(target, options) {
          var stats = options ? orig.call(fs10, target, options) : orig.call(fs10, target);
          if (stats) {
            if (stats.uid < 0) stats.uid += 4294967296;
            if (stats.gid < 0) stats.gid += 4294967296;
          }
          return stats;
        };
      }
      function chownErOk(er2) {
        if (!er2)
          return true;
        if (er2.code === "ENOSYS")
          return true;
        var nonroot = !process.getuid || process.getuid() !== 0;
        if (nonroot) {
          if (er2.code === "EINVAL" || er2.code === "EPERM")
            return true;
        }
        return false;
      }
    }
  }
});

// node_modules/graceful-fs/legacy-streams.js
var require_legacy_streams = __commonJS({
  "node_modules/graceful-fs/legacy-streams.js"(exports, module) {
    "use strict";
    var Stream = __require("stream").Stream;
    module.exports = legacy;
    function legacy(fs10) {
      return {
        ReadStream,
        WriteStream
      };
      function ReadStream(path11, options) {
        if (!(this instanceof ReadStream)) return new ReadStream(path11, options);
        Stream.call(this);
        var self = this;
        this.path = path11;
        this.fd = null;
        this.readable = true;
        this.paused = false;
        this.flags = "r";
        this.mode = 438;
        this.bufferSize = 64 * 1024;
        options = options || {};
        var keys = Object.keys(options);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key = keys[index];
          this[key] = options[key];
        }
        if (this.encoding) this.setEncoding(this.encoding);
        if (this.start !== void 0) {
          if ("number" !== typeof this.start) {
            throw TypeError("start must be a Number");
          }
          if (this.end === void 0) {
            this.end = Infinity;
          } else if ("number" !== typeof this.end) {
            throw TypeError("end must be a Number");
          }
          if (this.start > this.end) {
            throw new Error("start must be <= end");
          }
          this.pos = this.start;
        }
        if (this.fd !== null) {
          process.nextTick(function() {
            self._read();
          });
          return;
        }
        fs10.open(this.path, this.flags, this.mode, function(err, fd) {
          if (err) {
            self.emit("error", err);
            self.readable = false;
            return;
          }
          self.fd = fd;
          self.emit("open", fd);
          self._read();
        });
      }
      function WriteStream(path11, options) {
        if (!(this instanceof WriteStream)) return new WriteStream(path11, options);
        Stream.call(this);
        this.path = path11;
        this.fd = null;
        this.writable = true;
        this.flags = "w";
        this.encoding = "binary";
        this.mode = 438;
        this.bytesWritten = 0;
        options = options || {};
        var keys = Object.keys(options);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key = keys[index];
          this[key] = options[key];
        }
        if (this.start !== void 0) {
          if ("number" !== typeof this.start) {
            throw TypeError("start must be a Number");
          }
          if (this.start < 0) {
            throw new Error("start must be >= zero");
          }
          this.pos = this.start;
        }
        this.busy = false;
        this._queue = [];
        if (this.fd === null) {
          this._open = fs10.open;
          this._queue.push([this._open, this.path, this.flags, this.mode, void 0]);
          this.flush();
        }
      }
    }
  }
});

// node_modules/graceful-fs/clone.js
var require_clone = __commonJS({
  "node_modules/graceful-fs/clone.js"(exports, module) {
    "use strict";
    module.exports = clone;
    var getPrototypeOf = Object.getPrototypeOf || function(obj) {
      return obj.__proto__;
    };
    function clone(obj) {
      if (obj === null || typeof obj !== "object")
        return obj;
      if (obj instanceof Object)
        var copy = { __proto__: getPrototypeOf(obj) };
      else
        var copy = /* @__PURE__ */ Object.create(null);
      Object.getOwnPropertyNames(obj).forEach(function(key) {
        Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
      });
      return copy;
    }
  }
});

// node_modules/graceful-fs/graceful-fs.js
var require_graceful_fs = __commonJS({
  "node_modules/graceful-fs/graceful-fs.js"(exports, module) {
    "use strict";
    var fs10 = __require("fs");
    var polyfills = require_polyfills();
    var legacy = require_legacy_streams();
    var clone = require_clone();
    var util = __require("util");
    var gracefulQueue;
    var previousSymbol;
    if (typeof Symbol === "function" && typeof Symbol.for === "function") {
      gracefulQueue = /* @__PURE__ */ Symbol.for("graceful-fs.queue");
      previousSymbol = /* @__PURE__ */ Symbol.for("graceful-fs.previous");
    } else {
      gracefulQueue = "___graceful-fs.queue";
      previousSymbol = "___graceful-fs.previous";
    }
    function noop() {
    }
    function publishQueue(context, queue2) {
      Object.defineProperty(context, gracefulQueue, {
        get: function() {
          return queue2;
        }
      });
    }
    var debug = noop;
    if (util.debuglog)
      debug = util.debuglog("gfs4");
    else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ""))
      debug = function() {
        var m3 = util.format.apply(util, arguments);
        m3 = "GFS4: " + m3.split(/\n/).join("\nGFS4: ");
        console.error(m3);
      };
    if (!fs10[gracefulQueue]) {
      queue = global[gracefulQueue] || [];
      publishQueue(fs10, queue);
      fs10.close = (function(fs$close) {
        function close(fd, cb) {
          return fs$close.call(fs10, fd, function(err) {
            if (!err) {
              resetQueue();
            }
            if (typeof cb === "function")
              cb.apply(this, arguments);
          });
        }
        Object.defineProperty(close, previousSymbol, {
          value: fs$close
        });
        return close;
      })(fs10.close);
      fs10.closeSync = (function(fs$closeSync) {
        function closeSync(fd) {
          fs$closeSync.apply(fs10, arguments);
          resetQueue();
        }
        Object.defineProperty(closeSync, previousSymbol, {
          value: fs$closeSync
        });
        return closeSync;
      })(fs10.closeSync);
      if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) {
        process.on("exit", function() {
          debug(fs10[gracefulQueue]);
          __require("assert").equal(fs10[gracefulQueue].length, 0);
        });
      }
    }
    var queue;
    if (!global[gracefulQueue]) {
      publishQueue(global, fs10[gracefulQueue]);
    }
    module.exports = patch(clone(fs10));
    if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs10.__patched) {
      module.exports = patch(fs10);
      fs10.__patched = true;
    }
    function patch(fs11) {
      polyfills(fs11);
      fs11.gracefulify = patch;
      fs11.createReadStream = createReadStream;
      fs11.createWriteStream = createWriteStream;
      var fs$readFile = fs11.readFile;
      fs11.readFile = readFile;
      function readFile(path11, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$readFile(path11, options, cb);
        function go$readFile(path12, options2, cb2, startTime) {
          return fs$readFile(path12, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$readFile, [path12, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$writeFile = fs11.writeFile;
      fs11.writeFile = writeFile;
      function writeFile(path11, data, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$writeFile(path11, data, options, cb);
        function go$writeFile(path12, data2, options2, cb2, startTime) {
          return fs$writeFile(path12, data2, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$writeFile, [path12, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$appendFile = fs11.appendFile;
      if (fs$appendFile)
        fs11.appendFile = appendFile;
      function appendFile(path11, data, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$appendFile(path11, data, options, cb);
        function go$appendFile(path12, data2, options2, cb2, startTime) {
          return fs$appendFile(path12, data2, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$appendFile, [path12, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$copyFile = fs11.copyFile;
      if (fs$copyFile)
        fs11.copyFile = copyFile;
      function copyFile(src, dest, flags, cb) {
        if (typeof flags === "function") {
          cb = flags;
          flags = 0;
        }
        return go$copyFile(src, dest, flags, cb);
        function go$copyFile(src2, dest2, flags2, cb2, startTime) {
          return fs$copyFile(src2, dest2, flags2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$copyFile, [src2, dest2, flags2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$readdir = fs11.readdir;
      fs11.readdir = readdir;
      var noReaddirOptionVersions = /^v[0-5]\./;
      function readdir(path11, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        var go$readdir = noReaddirOptionVersions.test(process.version) ? function go$readdir2(path12, options2, cb2, startTime) {
          return fs$readdir(path12, fs$readdirCallback(
            path12,
            options2,
            cb2,
            startTime
          ));
        } : function go$readdir2(path12, options2, cb2, startTime) {
          return fs$readdir(path12, options2, fs$readdirCallback(
            path12,
            options2,
            cb2,
            startTime
          ));
        };
        return go$readdir(path11, options, cb);
        function fs$readdirCallback(path12, options2, cb2, startTime) {
          return function(err, files) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([
                go$readdir,
                [path12, options2, cb2],
                err,
                startTime || Date.now(),
                Date.now()
              ]);
            else {
              if (files && files.sort)
                files.sort();
              if (typeof cb2 === "function")
                cb2.call(this, err, files);
            }
          };
        }
      }
      if (process.version.substr(0, 4) === "v0.8") {
        var legStreams = legacy(fs11);
        ReadStream = legStreams.ReadStream;
        WriteStream = legStreams.WriteStream;
      }
      var fs$ReadStream = fs11.ReadStream;
      if (fs$ReadStream) {
        ReadStream.prototype = Object.create(fs$ReadStream.prototype);
        ReadStream.prototype.open = ReadStream$open;
      }
      var fs$WriteStream = fs11.WriteStream;
      if (fs$WriteStream) {
        WriteStream.prototype = Object.create(fs$WriteStream.prototype);
        WriteStream.prototype.open = WriteStream$open;
      }
      Object.defineProperty(fs11, "ReadStream", {
        get: function() {
          return ReadStream;
        },
        set: function(val) {
          ReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(fs11, "WriteStream", {
        get: function() {
          return WriteStream;
        },
        set: function(val) {
          WriteStream = val;
        },
        enumerable: true,
        configurable: true
      });
      var FileReadStream = ReadStream;
      Object.defineProperty(fs11, "FileReadStream", {
        get: function() {
          return FileReadStream;
        },
        set: function(val) {
          FileReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      var FileWriteStream = WriteStream;
      Object.defineProperty(fs11, "FileWriteStream", {
        get: function() {
          return FileWriteStream;
        },
        set: function(val) {
          FileWriteStream = val;
        },
        enumerable: true,
        configurable: true
      });
      function ReadStream(path11, options) {
        if (this instanceof ReadStream)
          return fs$ReadStream.apply(this, arguments), this;
        else
          return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
      }
      function ReadStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err, fd) {
          if (err) {
            if (that.autoClose)
              that.destroy();
            that.emit("error", err);
          } else {
            that.fd = fd;
            that.emit("open", fd);
            that.read();
          }
        });
      }
      function WriteStream(path11, options) {
        if (this instanceof WriteStream)
          return fs$WriteStream.apply(this, arguments), this;
        else
          return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
      }
      function WriteStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err, fd) {
          if (err) {
            that.destroy();
            that.emit("error", err);
          } else {
            that.fd = fd;
            that.emit("open", fd);
          }
        });
      }
      function createReadStream(path11, options) {
        return new fs11.ReadStream(path11, options);
      }
      function createWriteStream(path11, options) {
        return new fs11.WriteStream(path11, options);
      }
      var fs$open = fs11.open;
      fs11.open = open;
      function open(path11, flags, mode, cb) {
        if (typeof mode === "function")
          cb = mode, mode = null;
        return go$open(path11, flags, mode, cb);
        function go$open(path12, flags2, mode2, cb2, startTime) {
          return fs$open(path12, flags2, mode2, function(err, fd) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$open, [path12, flags2, mode2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      return fs11;
    }
    function enqueue(elem) {
      debug("ENQUEUE", elem[0].name, elem[1]);
      fs10[gracefulQueue].push(elem);
      retry();
    }
    var retryTimer;
    function resetQueue() {
      var now = Date.now();
      for (var i = 0; i < fs10[gracefulQueue].length; ++i) {
        if (fs10[gracefulQueue][i].length > 2) {
          fs10[gracefulQueue][i][3] = now;
          fs10[gracefulQueue][i][4] = now;
        }
      }
      retry();
    }
    function retry() {
      clearTimeout(retryTimer);
      retryTimer = void 0;
      if (fs10[gracefulQueue].length === 0)
        return;
      var elem = fs10[gracefulQueue].shift();
      var fn2 = elem[0];
      var args = elem[1];
      var err = elem[2];
      var startTime = elem[3];
      var lastTime = elem[4];
      if (startTime === void 0) {
        debug("RETRY", fn2.name, args);
        fn2.apply(null, args);
      } else if (Date.now() - startTime >= 6e4) {
        debug("TIMEOUT", fn2.name, args);
        var cb = args.pop();
        if (typeof cb === "function")
          cb.call(null, err);
      } else {
        var sinceAttempt = Date.now() - lastTime;
        var sinceStart = Math.max(lastTime - startTime, 1);
        var desiredDelay = Math.min(sinceStart * 1.2, 100);
        if (sinceAttempt >= desiredDelay) {
          debug("RETRY", fn2.name, args);
          fn2.apply(null, args.concat([startTime]));
        } else {
          fs10[gracefulQueue].push(elem);
        }
      }
      if (retryTimer === void 0) {
        retryTimer = setTimeout(retry, 0);
      }
    }
  }
});

// node_modules/fs-extra/lib/fs/index.js
var require_fs = __commonJS({
  "node_modules/fs-extra/lib/fs/index.js"(exports) {
    "use strict";
    var u = require_universalify().fromCallback;
    var fs10 = require_graceful_fs();
    var api = [
      "access",
      "appendFile",
      "chmod",
      "chown",
      "close",
      "copyFile",
      "cp",
      "fchmod",
      "fchown",
      "fdatasync",
      "fstat",
      "fsync",
      "ftruncate",
      "futimes",
      "glob",
      "lchmod",
      "lchown",
      "lutimes",
      "link",
      "lstat",
      "mkdir",
      "mkdtemp",
      "open",
      "opendir",
      "readdir",
      "readFile",
      "readlink",
      "realpath",
      "rename",
      "rm",
      "rmdir",
      "stat",
      "statfs",
      "symlink",
      "truncate",
      "unlink",
      "utimes",
      "writeFile"
    ].filter((key) => {
      return typeof fs10[key] === "function";
    });
    Object.assign(exports, fs10);
    api.forEach((method) => {
      exports[method] = u(fs10[method]);
    });
    exports.exists = function(filename, callback) {
      if (typeof callback === "function") {
        return fs10.exists(filename, callback);
      }
      return new Promise((resolve) => {
        return fs10.exists(filename, resolve);
      });
    };
    exports.read = function(fd, buffer, offset, length, position, callback) {
      if (typeof callback === "function") {
        return fs10.read(fd, buffer, offset, length, position, callback);
      }
      return new Promise((resolve, reject) => {
        fs10.read(fd, buffer, offset, length, position, (err, bytesRead, buffer2) => {
          if (err) return reject(err);
          resolve({ bytesRead, buffer: buffer2 });
        });
      });
    };
    exports.write = function(fd, buffer, ...args) {
      if (typeof args[args.length - 1] === "function") {
        return fs10.write(fd, buffer, ...args);
      }
      return new Promise((resolve, reject) => {
        fs10.write(fd, buffer, ...args, (err, bytesWritten, buffer2) => {
          if (err) return reject(err);
          resolve({ bytesWritten, buffer: buffer2 });
        });
      });
    };
    exports.readv = function(fd, buffers, ...args) {
      if (typeof args[args.length - 1] === "function") {
        return fs10.readv(fd, buffers, ...args);
      }
      return new Promise((resolve, reject) => {
        fs10.readv(fd, buffers, ...args, (err, bytesRead, buffers2) => {
          if (err) return reject(err);
          resolve({ bytesRead, buffers: buffers2 });
        });
      });
    };
    exports.writev = function(fd, buffers, ...args) {
      if (typeof args[args.length - 1] === "function") {
        return fs10.writev(fd, buffers, ...args);
      }
      return new Promise((resolve, reject) => {
        fs10.writev(fd, buffers, ...args, (err, bytesWritten, buffers2) => {
          if (err) return reject(err);
          resolve({ bytesWritten, buffers: buffers2 });
        });
      });
    };
    if (typeof fs10.realpath.native === "function") {
      exports.realpath.native = u(fs10.realpath.native);
    } else {
      process.emitWarning(
        "fs.realpath.native is not a function. Is fs being monkey-patched?",
        "Warning",
        "fs-extra-WARN0003"
      );
    }
  }
});

// node_modules/fs-extra/lib/mkdirs/utils.js
var require_utils = __commonJS({
  "node_modules/fs-extra/lib/mkdirs/utils.js"(exports, module) {
    "use strict";
    var path11 = __require("path");
    module.exports.checkPath = function checkPath(pth) {
      if (process.platform === "win32") {
        const pathHasInvalidWinCharacters = /[<>:"|?*]/.test(pth.replace(path11.parse(pth).root, ""));
        if (pathHasInvalidWinCharacters) {
          const error2 = new Error(`Path contains invalid characters: ${pth}`);
          error2.code = "EINVAL";
          throw error2;
        }
      }
    };
  }
});

// node_modules/fs-extra/lib/mkdirs/make-dir.js
var require_make_dir = __commonJS({
  "node_modules/fs-extra/lib/mkdirs/make-dir.js"(exports, module) {
    "use strict";
    var fs10 = require_fs();
    var { checkPath } = require_utils();
    var getMode = (options) => {
      const defaults = { mode: 511 };
      if (typeof options === "number") return options;
      return { ...defaults, ...options }.mode;
    };
    module.exports.makeDir = async (dir, options) => {
      checkPath(dir);
      return fs10.mkdir(dir, {
        mode: getMode(options),
        recursive: true
      });
    };
    module.exports.makeDirSync = (dir, options) => {
      checkPath(dir);
      return fs10.mkdirSync(dir, {
        mode: getMode(options),
        recursive: true
      });
    };
  }
});

// node_modules/fs-extra/lib/mkdirs/index.js
var require_mkdirs = __commonJS({
  "node_modules/fs-extra/lib/mkdirs/index.js"(exports, module) {
    "use strict";
    var u = require_universalify().fromPromise;
    var { makeDir: _makeDir, makeDirSync } = require_make_dir();
    var makeDir = u(_makeDir);
    module.exports = {
      mkdirs: makeDir,
      mkdirsSync: makeDirSync,
      // alias
      mkdirp: makeDir,
      mkdirpSync: makeDirSync,
      ensureDir: makeDir,
      ensureDirSync: makeDirSync
    };
  }
});

// node_modules/fs-extra/lib/path-exists/index.js
var require_path_exists = __commonJS({
  "node_modules/fs-extra/lib/path-exists/index.js"(exports, module) {
    "use strict";
    var u = require_universalify().fromPromise;
    var fs10 = require_fs();
    function pathExists(path11) {
      return fs10.access(path11).then(() => true).catch(() => false);
    }
    module.exports = {
      pathExists: u(pathExists),
      pathExistsSync: fs10.existsSync
    };
  }
});

// node_modules/fs-extra/lib/util/utimes.js
var require_utimes = __commonJS({
  "node_modules/fs-extra/lib/util/utimes.js"(exports, module) {
    "use strict";
    var fs10 = require_fs();
    var u = require_universalify().fromPromise;
    async function utimesMillis(path11, atime, mtime) {
      const fd = await fs10.open(path11, "r+");
      let error2 = null;
      try {
        await fs10.futimes(fd, atime, mtime);
      } catch (futimesErr) {
        error2 = futimesErr;
      } finally {
        try {
          await fs10.close(fd);
        } catch (closeErr) {
          if (!error2) error2 = closeErr;
        }
      }
      if (error2) {
        throw error2;
      }
    }
    function utimesMillisSync(path11, atime, mtime) {
      const fd = fs10.openSync(path11, "r+");
      let error2 = null;
      try {
        fs10.futimesSync(fd, atime, mtime);
      } catch (futimesErr) {
        error2 = futimesErr;
      } finally {
        try {
          fs10.closeSync(fd);
        } catch (closeErr) {
          if (!error2) error2 = closeErr;
        }
      }
      if (error2) {
        throw error2;
      }
    }
    module.exports = {
      utimesMillis: u(utimesMillis),
      utimesMillisSync
    };
  }
});

// node_modules/fs-extra/lib/util/stat.js
var require_stat = __commonJS({
  "node_modules/fs-extra/lib/util/stat.js"(exports, module) {
    "use strict";
    var fs10 = require_fs();
    var path11 = __require("path");
    var u = require_universalify().fromPromise;
    function getStats(src, dest, opts) {
      const statFunc = opts.dereference ? (file) => fs10.stat(file, { bigint: true }) : (file) => fs10.lstat(file, { bigint: true });
      return Promise.all([
        statFunc(src),
        statFunc(dest).catch((err) => {
          if (err.code === "ENOENT") return null;
          throw err;
        })
      ]).then(([srcStat, destStat]) => ({ srcStat, destStat }));
    }
    function getStatsSync(src, dest, opts) {
      let destStat;
      const statFunc = opts.dereference ? (file) => fs10.statSync(file, { bigint: true }) : (file) => fs10.lstatSync(file, { bigint: true });
      const srcStat = statFunc(src);
      try {
        destStat = statFunc(dest);
      } catch (err) {
        if (err.code === "ENOENT") return { srcStat, destStat: null };
        throw err;
      }
      return { srcStat, destStat };
    }
    async function checkPaths(src, dest, funcName, opts) {
      const { srcStat, destStat } = await getStats(src, dest, opts);
      if (destStat) {
        if (areIdentical(srcStat, destStat)) {
          const srcBaseName = path11.basename(src);
          const destBaseName = path11.basename(dest);
          if (funcName === "move" && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
            return { srcStat, destStat, isChangingCase: true };
          }
          throw new Error("Source and destination must not be the same.");
        }
        if (srcStat.isDirectory() && !destStat.isDirectory()) {
          throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
        }
        if (!srcStat.isDirectory() && destStat.isDirectory()) {
          throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`);
        }
      }
      if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
        throw new Error(errMsg(src, dest, funcName));
      }
      return { srcStat, destStat };
    }
    function checkPathsSync(src, dest, funcName, opts) {
      const { srcStat, destStat } = getStatsSync(src, dest, opts);
      if (destStat) {
        if (areIdentical(srcStat, destStat)) {
          const srcBaseName = path11.basename(src);
          const destBaseName = path11.basename(dest);
          if (funcName === "move" && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
            return { srcStat, destStat, isChangingCase: true };
          }
          throw new Error("Source and destination must not be the same.");
        }
        if (srcStat.isDirectory() && !destStat.isDirectory()) {
          throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
        }
        if (!srcStat.isDirectory() && destStat.isDirectory()) {
          throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`);
        }
      }
      if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
        throw new Error(errMsg(src, dest, funcName));
      }
      return { srcStat, destStat };
    }
    async function checkParentPaths(src, srcStat, dest, funcName) {
      const srcParent = path11.resolve(path11.dirname(src));
      const destParent = path11.resolve(path11.dirname(dest));
      if (destParent === srcParent || destParent === path11.parse(destParent).root) return;
      let destStat;
      try {
        destStat = await fs10.stat(destParent, { bigint: true });
      } catch (err) {
        if (err.code === "ENOENT") return checkParentPaths(src, srcStat, destParent, funcName);
        throw err;
      }
      if (areIdentical(srcStat, destStat)) {
        throw new Error(errMsg(src, dest, funcName));
      }
      return checkParentPaths(src, srcStat, destParent, funcName);
    }
    function checkParentPathsSync(src, srcStat, dest, funcName) {
      const srcParent = path11.resolve(path11.dirname(src));
      const destParent = path11.resolve(path11.dirname(dest));
      if (destParent === srcParent || destParent === path11.parse(destParent).root) return;
      let destStat;
      try {
        destStat = fs10.statSync(destParent, { bigint: true });
      } catch (err) {
        if (err.code === "ENOENT") return checkParentPathsSync(src, srcStat, destParent, funcName);
        throw err;
      }
      if (areIdentical(srcStat, destStat)) {
        throw new Error(errMsg(src, dest, funcName));
      }
      return checkParentPathsSync(src, srcStat, destParent, funcName);
    }
    function areIdentical(srcStat, destStat) {
      return destStat.ino !== void 0 && destStat.dev !== void 0 && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev;
    }
    function isSrcSubdir(src, dest) {
      const srcArr = path11.resolve(src).split(path11.sep).filter((i) => i);
      const destArr = path11.resolve(dest).split(path11.sep).filter((i) => i);
      return srcArr.every((cur, i) => destArr[i] === cur);
    }
    function errMsg(src, dest, funcName) {
      return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`;
    }
    module.exports = {
      // checkPaths
      checkPaths: u(checkPaths),
      checkPathsSync,
      // checkParent
      checkParentPaths: u(checkParentPaths),
      checkParentPathsSync,
      // Misc
      isSrcSubdir,
      areIdentical
    };
  }
});

// node_modules/fs-extra/lib/util/async.js
var require_async = __commonJS({
  "node_modules/fs-extra/lib/util/async.js"(exports, module) {
    "use strict";
    async function asyncIteratorConcurrentProcess(iterator, fn2) {
      const promises = [];
      for await (const item of iterator) {
        promises.push(
          fn2(item).then(
            () => null,
            (err) => err ?? new Error("unknown error")
          )
        );
      }
      await Promise.all(
        promises.map(
          (promise) => promise.then((possibleErr) => {
            if (possibleErr !== null) throw possibleErr;
          })
        )
      );
    }
    module.exports = {
      asyncIteratorConcurrentProcess
    };
  }
});

// node_modules/fs-extra/lib/copy/copy.js
var require_copy = __commonJS({
  "node_modules/fs-extra/lib/copy/copy.js"(exports, module) {
    "use strict";
    var fs10 = require_fs();
    var path11 = __require("path");
    var { mkdirs } = require_mkdirs();
    var { pathExists } = require_path_exists();
    var { utimesMillis } = require_utimes();
    var stat = require_stat();
    var { asyncIteratorConcurrentProcess } = require_async();
    async function copy(src, dest, opts = {}) {
      if (typeof opts === "function") {
        opts = { filter: opts };
      }
      opts.clobber = "clobber" in opts ? !!opts.clobber : true;
      opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
      if (opts.preserveTimestamps && process.arch === "ia32") {
        process.emitWarning(
          "Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269",
          "Warning",
          "fs-extra-WARN0001"
        );
      }
      const { srcStat, destStat } = await stat.checkPaths(src, dest, "copy", opts);
      await stat.checkParentPaths(src, srcStat, dest, "copy");
      const include = await runFilter(src, dest, opts);
      if (!include) return;
      const destParent = path11.dirname(dest);
      const dirExists = await pathExists(destParent);
      if (!dirExists) {
        await mkdirs(destParent);
      }
      await getStatsAndPerformCopy(destStat, src, dest, opts);
    }
    async function runFilter(src, dest, opts) {
      if (!opts.filter) return true;
      return opts.filter(src, dest);
    }
    async function getStatsAndPerformCopy(destStat, src, dest, opts) {
      const statFn = opts.dereference ? fs10.stat : fs10.lstat;
      const srcStat = await statFn(src);
      if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts);
      if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts);
      if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts);
      if (srcStat.isSocket()) throw new Error(`Cannot copy a socket file: ${src}`);
      if (srcStat.isFIFO()) throw new Error(`Cannot copy a FIFO pipe: ${src}`);
      throw new Error(`Unknown file: ${src}`);
    }
    async function onFile(srcStat, destStat, src, dest, opts) {
      if (!destStat) return copyFile(srcStat, src, dest, opts);
      if (opts.overwrite) {
        await fs10.unlink(dest);
        return copyFile(srcStat, src, dest, opts);
      }
      if (opts.errorOnExist) {
        throw new Error(`'${dest}' already exists`);
      }
    }
    async function copyFile(srcStat, src, dest, opts) {
      await fs10.copyFile(src, dest);
      if (opts.preserveTimestamps) {
        if (fileIsNotWritable(srcStat.mode)) {
          await makeFileWritable(dest, srcStat.mode);
        }
        const updatedSrcStat = await fs10.stat(src);
        await utimesMillis(dest, updatedSrcStat.atime, updatedSrcStat.mtime);
      }
      return fs10.chmod(dest, srcStat.mode);
    }
    function fileIsNotWritable(srcMode) {
      return (srcMode & 128) === 0;
    }
    function makeFileWritable(dest, srcMode) {
      return fs10.chmod(dest, srcMode | 128);
    }
    async function onDir(srcStat, destStat, src, dest, opts) {
      if (!destStat) {
        await fs10.mkdir(dest);
      }
      await asyncIteratorConcurrentProcess(await fs10.opendir(src), async (item) => {
        const srcItem = path11.join(src, item.name);
        const destItem = path11.join(dest, item.name);
        const include = await runFilter(srcItem, destItem, opts);
        if (include) {
          const { destStat: destStat2 } = await stat.checkPaths(srcItem, destItem, "copy", opts);
          await getStatsAndPerformCopy(destStat2, srcItem, destItem, opts);
        }
      });
      if (!destStat) {
        await fs10.chmod(dest, srcStat.mode);
      }
    }
    async function onLink(destStat, src, dest, opts) {
      let resolvedSrc = await fs10.readlink(src);
      if (opts.dereference) {
        resolvedSrc = path11.resolve(process.cwd(), resolvedSrc);
      }
      if (!destStat) {
        return fs10.symlink(resolvedSrc, dest);
      }
      let resolvedDest = null;
      try {
        resolvedDest = await fs10.readlink(dest);
      } catch (e4) {
        if (e4.code === "EINVAL" || e4.code === "UNKNOWN") return fs10.symlink(resolvedSrc, dest);
        throw e4;
      }
      if (opts.dereference) {
        resolvedDest = path11.resolve(process.cwd(), resolvedDest);
      }
      if (resolvedSrc !== resolvedDest) {
        if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
          throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`);
        }
        if (stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
          throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`);
        }
      }
      await fs10.unlink(dest);
      return fs10.symlink(resolvedSrc, dest);
    }
    module.exports = copy;
  }
});

// node_modules/fs-extra/lib/copy/copy-sync.js
var require_copy_sync = __commonJS({
  "node_modules/fs-extra/lib/copy/copy-sync.js"(exports, module) {
    "use strict";
    var fs10 = require_graceful_fs();
    var path11 = __require("path");
    var mkdirsSync = require_mkdirs().mkdirsSync;
    var utimesMillisSync = require_utimes().utimesMillisSync;
    var stat = require_stat();
    function copySync(src, dest, opts) {
      if (typeof opts === "function") {
        opts = { filter: opts };
      }
      opts = opts || {};
      opts.clobber = "clobber" in opts ? !!opts.clobber : true;
      opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
      if (opts.preserveTimestamps && process.arch === "ia32") {
        process.emitWarning(
          "Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269",
          "Warning",
          "fs-extra-WARN0002"
        );
      }
      const { srcStat, destStat } = stat.checkPathsSync(src, dest, "copy", opts);
      stat.checkParentPathsSync(src, srcStat, dest, "copy");
      if (opts.filter && !opts.filter(src, dest)) return;
      const destParent = path11.dirname(dest);
      if (!fs10.existsSync(destParent)) mkdirsSync(destParent);
      return getStats(destStat, src, dest, opts);
    }
    function getStats(destStat, src, dest, opts) {
      const statSync = opts.dereference ? fs10.statSync : fs10.lstatSync;
      const srcStat = statSync(src);
      if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts);
      else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts);
      else if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts);
      else if (srcStat.isSocket()) throw new Error(`Cannot copy a socket file: ${src}`);
      else if (srcStat.isFIFO()) throw new Error(`Cannot copy a FIFO pipe: ${src}`);
      throw new Error(`Unknown file: ${src}`);
    }
    function onFile(srcStat, destStat, src, dest, opts) {
      if (!destStat) return copyFile(srcStat, src, dest, opts);
      return mayCopyFile(srcStat, src, dest, opts);
    }
    function mayCopyFile(srcStat, src, dest, opts) {
      if (opts.overwrite) {
        fs10.unlinkSync(dest);
        return copyFile(srcStat, src, dest, opts);
      } else if (opts.errorOnExist) {
        throw new Error(`'${dest}' already exists`);
      }
    }
    function copyFile(srcStat, src, dest, opts) {
      fs10.copyFileSync(src, dest);
      if (opts.preserveTimestamps) handleTimestamps(srcStat.mode, src, dest);
      return setDestMode(dest, srcStat.mode);
    }
    function handleTimestamps(srcMode, src, dest) {
      if (fileIsNotWritable(srcMode)) makeFileWritable(dest, srcMode);
      return setDestTimestamps(src, dest);
    }
    function fileIsNotWritable(srcMode) {
      return (srcMode & 128) === 0;
    }
    function makeFileWritable(dest, srcMode) {
      return setDestMode(dest, srcMode | 128);
    }
    function setDestMode(dest, srcMode) {
      return fs10.chmodSync(dest, srcMode);
    }
    function setDestTimestamps(src, dest) {
      const updatedSrcStat = fs10.statSync(src);
      return utimesMillisSync(dest, updatedSrcStat.atime, updatedSrcStat.mtime);
    }
    function onDir(srcStat, destStat, src, dest, opts) {
      if (!destStat) return mkDirAndCopy(srcStat.mode, src, dest, opts);
      return copyDir(src, dest, opts);
    }
    function mkDirAndCopy(srcMode, src, dest, opts) {
      fs10.mkdirSync(dest);
      copyDir(src, dest, opts);
      return setDestMode(dest, srcMode);
    }
    function copyDir(src, dest, opts) {
      const dir = fs10.opendirSync(src);
      try {
        let dirent;
        while ((dirent = dir.readSync()) !== null) {
          copyDirItem(dirent.name, src, dest, opts);
        }
      } finally {
        dir.closeSync();
      }
    }
    function copyDirItem(item, src, dest, opts) {
      const srcItem = path11.join(src, item);
      const destItem = path11.join(dest, item);
      if (opts.filter && !opts.filter(srcItem, destItem)) return;
      const { destStat } = stat.checkPathsSync(srcItem, destItem, "copy", opts);
      return getStats(destStat, srcItem, destItem, opts);
    }
    function onLink(destStat, src, dest, opts) {
      let resolvedSrc = fs10.readlinkSync(src);
      if (opts.dereference) {
        resolvedSrc = path11.resolve(process.cwd(), resolvedSrc);
      }
      if (!destStat) {
        return fs10.symlinkSync(resolvedSrc, dest);
      } else {
        let resolvedDest;
        try {
          resolvedDest = fs10.readlinkSync(dest);
        } catch (err) {
          if (err.code === "EINVAL" || err.code === "UNKNOWN") return fs10.symlinkSync(resolvedSrc, dest);
          throw err;
        }
        if (opts.dereference) {
          resolvedDest = path11.resolve(process.cwd(), resolvedDest);
        }
        if (resolvedSrc !== resolvedDest) {
          if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
            throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`);
          }
          if (stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
            throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`);
          }
        }
        return copyLink(resolvedSrc, dest);
      }
    }
    function copyLink(resolvedSrc, dest) {
      fs10.unlinkSync(dest);
      return fs10.symlinkSync(resolvedSrc, dest);
    }
    module.exports = copySync;
  }
});

// node_modules/fs-extra/lib/copy/index.js
var require_copy2 = __commonJS({
  "node_modules/fs-extra/lib/copy/index.js"(exports, module) {
    "use strict";
    var u = require_universalify().fromPromise;
    module.exports = {
      copy: u(require_copy()),
      copySync: require_copy_sync()
    };
  }
});

// node_modules/fs-extra/lib/remove/index.js
var require_remove = __commonJS({
  "node_modules/fs-extra/lib/remove/index.js"(exports, module) {
    "use strict";
    var fs10 = require_graceful_fs();
    var u = require_universalify().fromCallback;
    function remove(path11, callback) {
      fs10.rm(path11, { recursive: true, force: true }, callback);
    }
    function removeSync(path11) {
      fs10.rmSync(path11, { recursive: true, force: true });
    }
    module.exports = {
      remove: u(remove),
      removeSync
    };
  }
});

// node_modules/fs-extra/lib/empty/index.js
var require_empty = __commonJS({
  "node_modules/fs-extra/lib/empty/index.js"(exports, module) {
    "use strict";
    var u = require_universalify().fromPromise;
    var fs10 = require_fs();
    var path11 = __require("path");
    var mkdir = require_mkdirs();
    var remove = require_remove();
    var emptyDir = u(async function emptyDir2(dir) {
      let items;
      try {
        items = await fs10.readdir(dir);
      } catch {
        return mkdir.mkdirs(dir);
      }
      return Promise.all(items.map((item) => remove.remove(path11.join(dir, item))));
    });
    function emptyDirSync(dir) {
      let items;
      try {
        items = fs10.readdirSync(dir);
      } catch {
        return mkdir.mkdirsSync(dir);
      }
      items.forEach((item) => {
        item = path11.join(dir, item);
        remove.removeSync(item);
      });
    }
    module.exports = {
      emptyDirSync,
      emptydirSync: emptyDirSync,
      emptyDir,
      emptydir: emptyDir
    };
  }
});

// node_modules/fs-extra/lib/ensure/file.js
var require_file = __commonJS({
  "node_modules/fs-extra/lib/ensure/file.js"(exports, module) {
    "use strict";
    var u = require_universalify().fromPromise;
    var path11 = __require("path");
    var fs10 = require_fs();
    var mkdir = require_mkdirs();
    async function createFile(file) {
      let stats;
      try {
        stats = await fs10.stat(file);
      } catch {
      }
      if (stats && stats.isFile()) return;
      const dir = path11.dirname(file);
      let dirStats = null;
      try {
        dirStats = await fs10.stat(dir);
      } catch (err) {
        if (err.code === "ENOENT") {
          await mkdir.mkdirs(dir);
          await fs10.writeFile(file, "");
          return;
        } else {
          throw err;
        }
      }
      if (dirStats.isDirectory()) {
        await fs10.writeFile(file, "");
      } else {
        await fs10.readdir(dir);
      }
    }
    function createFileSync(file) {
      let stats;
      try {
        stats = fs10.statSync(file);
      } catch {
      }
      if (stats && stats.isFile()) return;
      const dir = path11.dirname(file);
      try {
        if (!fs10.statSync(dir).isDirectory()) {
          fs10.readdirSync(dir);
        }
      } catch (err) {
        if (err && err.code === "ENOENT") mkdir.mkdirsSync(dir);
        else throw err;
      }
      fs10.writeFileSync(file, "");
    }
    module.exports = {
      createFile: u(createFile),
      createFileSync
    };
  }
});

// node_modules/fs-extra/lib/ensure/link.js
var require_link = __commonJS({
  "node_modules/fs-extra/lib/ensure/link.js"(exports, module) {
    "use strict";
    var u = require_universalify().fromPromise;
    var path11 = __require("path");
    var fs10 = require_fs();
    var mkdir = require_mkdirs();
    var { pathExists } = require_path_exists();
    var { areIdentical } = require_stat();
    async function createLink(srcpath, dstpath) {
      let dstStat;
      try {
        dstStat = await fs10.lstat(dstpath, { bigint: true });
      } catch {
      }
      let srcStat;
      try {
        srcStat = await fs10.lstat(srcpath, { bigint: true });
      } catch (err) {
        err.message = err.message.replace("lstat", "ensureLink");
        throw err;
      }
      if (dstStat && areIdentical(srcStat, dstStat)) return;
      const dir = path11.dirname(dstpath);
      const dirExists = await pathExists(dir);
      if (!dirExists) {
        await mkdir.mkdirs(dir);
      }
      await fs10.link(srcpath, dstpath);
    }
    function createLinkSync(srcpath, dstpath) {
      let dstStat;
      try {
        dstStat = fs10.lstatSync(dstpath, { bigint: true });
      } catch {
      }
      try {
        const srcStat = fs10.lstatSync(srcpath, { bigint: true });
        if (dstStat && areIdentical(srcStat, dstStat)) return;
      } catch (err) {
        err.message = err.message.replace("lstat", "ensureLink");
        throw err;
      }
      const dir = path11.dirname(dstpath);
      const dirExists = fs10.existsSync(dir);
      if (dirExists) return fs10.linkSync(srcpath, dstpath);
      mkdir.mkdirsSync(dir);
      return fs10.linkSync(srcpath, dstpath);
    }
    module.exports = {
      createLink: u(createLink),
      createLinkSync
    };
  }
});

// node_modules/fs-extra/lib/ensure/symlink-paths.js
var require_symlink_paths = __commonJS({
  "node_modules/fs-extra/lib/ensure/symlink-paths.js"(exports, module) {
    "use strict";
    var path11 = __require("path");
    var fs10 = require_fs();
    var { pathExists } = require_path_exists();
    var u = require_universalify().fromPromise;
    async function symlinkPaths(srcpath, dstpath) {
      if (path11.isAbsolute(srcpath)) {
        try {
          await fs10.lstat(srcpath);
        } catch (err) {
          err.message = err.message.replace("lstat", "ensureSymlink");
          throw err;
        }
        return {
          toCwd: srcpath,
          toDst: srcpath
        };
      }
      const dstdir = path11.dirname(dstpath);
      const relativeToDst = path11.join(dstdir, srcpath);
      const exists = await pathExists(relativeToDst);
      if (exists) {
        return {
          toCwd: relativeToDst,
          toDst: srcpath
        };
      }
      try {
        await fs10.lstat(srcpath);
      } catch (err) {
        err.message = err.message.replace("lstat", "ensureSymlink");
        throw err;
      }
      return {
        toCwd: srcpath,
        toDst: path11.relative(dstdir, srcpath)
      };
    }
    function symlinkPathsSync(srcpath, dstpath) {
      if (path11.isAbsolute(srcpath)) {
        const exists2 = fs10.existsSync(srcpath);
        if (!exists2) throw new Error("absolute srcpath does not exist");
        return {
          toCwd: srcpath,
          toDst: srcpath
        };
      }
      const dstdir = path11.dirname(dstpath);
      const relativeToDst = path11.join(dstdir, srcpath);
      const exists = fs10.existsSync(relativeToDst);
      if (exists) {
        return {
          toCwd: relativeToDst,
          toDst: srcpath
        };
      }
      const srcExists = fs10.existsSync(srcpath);
      if (!srcExists) throw new Error("relative srcpath does not exist");
      return {
        toCwd: srcpath,
        toDst: path11.relative(dstdir, srcpath)
      };
    }
    module.exports = {
      symlinkPaths: u(symlinkPaths),
      symlinkPathsSync
    };
  }
});

// node_modules/fs-extra/lib/ensure/symlink-type.js
var require_symlink_type = __commonJS({
  "node_modules/fs-extra/lib/ensure/symlink-type.js"(exports, module) {
    "use strict";
    var fs10 = require_fs();
    var u = require_universalify().fromPromise;
    async function symlinkType(srcpath, type) {
      if (type) return type;
      let stats;
      try {
        stats = await fs10.lstat(srcpath);
      } catch {
        return "file";
      }
      return stats && stats.isDirectory() ? "dir" : "file";
    }
    function symlinkTypeSync(srcpath, type) {
      if (type) return type;
      let stats;
      try {
        stats = fs10.lstatSync(srcpath);
      } catch {
        return "file";
      }
      return stats && stats.isDirectory() ? "dir" : "file";
    }
    module.exports = {
      symlinkType: u(symlinkType),
      symlinkTypeSync
    };
  }
});

// node_modules/fs-extra/lib/ensure/symlink.js
var require_symlink = __commonJS({
  "node_modules/fs-extra/lib/ensure/symlink.js"(exports, module) {
    "use strict";
    var u = require_universalify().fromPromise;
    var path11 = __require("path");
    var fs10 = require_fs();
    var { mkdirs, mkdirsSync } = require_mkdirs();
    var { symlinkPaths, symlinkPathsSync } = require_symlink_paths();
    var { symlinkType, symlinkTypeSync } = require_symlink_type();
    var { pathExists } = require_path_exists();
    var { areIdentical } = require_stat();
    async function createSymlink(srcpath, dstpath, type) {
      let stats;
      try {
        stats = await fs10.lstat(dstpath);
      } catch {
      }
      if (stats && stats.isSymbolicLink()) {
        let srcStat;
        if (path11.isAbsolute(srcpath)) {
          srcStat = await fs10.stat(srcpath, { bigint: true });
        } else {
          const dstdir = path11.dirname(dstpath);
          const relativeToDst = path11.join(dstdir, srcpath);
          try {
            srcStat = await fs10.stat(relativeToDst, { bigint: true });
          } catch {
            srcStat = await fs10.stat(srcpath, { bigint: true });
          }
        }
        let dstStat;
        try {
          dstStat = await fs10.stat(dstpath, { bigint: true });
        } catch (err) {
          if (err.code !== "ENOENT") throw err;
        }
        if (dstStat && areIdentical(srcStat, dstStat)) return;
      }
      const relative = await symlinkPaths(srcpath, dstpath);
      srcpath = relative.toDst;
      const toType = await symlinkType(relative.toCwd, type);
      const dir = path11.dirname(dstpath);
      if (!await pathExists(dir)) {
        await mkdirs(dir);
      }
      return fs10.symlink(srcpath, dstpath, toType);
    }
    function createSymlinkSync(srcpath, dstpath, type) {
      let stats;
      try {
        stats = fs10.lstatSync(dstpath);
      } catch {
      }
      if (stats && stats.isSymbolicLink()) {
        let srcStat;
        if (path11.isAbsolute(srcpath)) {
          srcStat = fs10.statSync(srcpath, { bigint: true });
        } else {
          const dstdir = path11.dirname(dstpath);
          const relativeToDst = path11.join(dstdir, srcpath);
          try {
            srcStat = fs10.statSync(relativeToDst, { bigint: true });
          } catch {
            srcStat = fs10.statSync(srcpath, { bigint: true });
          }
        }
        let dstStat;
        try {
          dstStat = fs10.statSync(dstpath, { bigint: true });
        } catch (err) {
          if (err.code !== "ENOENT") throw err;
        }
        if (dstStat && areIdentical(srcStat, dstStat)) return;
      }
      const relative = symlinkPathsSync(srcpath, dstpath);
      srcpath = relative.toDst;
      type = symlinkTypeSync(relative.toCwd, type);
      const dir = path11.dirname(dstpath);
      const exists = fs10.existsSync(dir);
      if (exists) return fs10.symlinkSync(srcpath, dstpath, type);
      mkdirsSync(dir);
      return fs10.symlinkSync(srcpath, dstpath, type);
    }
    module.exports = {
      createSymlink: u(createSymlink),
      createSymlinkSync
    };
  }
});

// node_modules/fs-extra/lib/ensure/index.js
var require_ensure = __commonJS({
  "node_modules/fs-extra/lib/ensure/index.js"(exports, module) {
    "use strict";
    var { createFile, createFileSync } = require_file();
    var { createLink, createLinkSync } = require_link();
    var { createSymlink, createSymlinkSync } = require_symlink();
    module.exports = {
      // file
      createFile,
      createFileSync,
      ensureFile: createFile,
      ensureFileSync: createFileSync,
      // link
      createLink,
      createLinkSync,
      ensureLink: createLink,
      ensureLinkSync: createLinkSync,
      // symlink
      createSymlink,
      createSymlinkSync,
      ensureSymlink: createSymlink,
      ensureSymlinkSync: createSymlinkSync
    };
  }
});

// node_modules/jsonfile/utils.js
var require_utils2 = __commonJS({
  "node_modules/jsonfile/utils.js"(exports, module) {
    "use strict";
    function stringify(obj, { EOL = "\n", finalEOL = true, replacer = null, spaces } = {}) {
      const EOF = finalEOL ? EOL : "";
      const str = JSON.stringify(obj, replacer, spaces);
      if (str === void 0) {
        throw new TypeError(`Converting ${typeof obj} value to JSON is not supported`);
      }
      return str.replace(/\n/g, EOL) + EOF;
    }
    function stripBom(content) {
      if (Buffer.isBuffer(content)) content = content.toString("utf8");
      return content.replace(/^\uFEFF/, "");
    }
    module.exports = { stringify, stripBom };
  }
});

// node_modules/jsonfile/index.js
var require_jsonfile = __commonJS({
  "node_modules/jsonfile/index.js"(exports, module) {
    "use strict";
    var _fs;
    try {
      _fs = require_graceful_fs();
    } catch (_2) {
      _fs = __require("fs");
    }
    var universalify = require_universalify();
    var { stringify, stripBom } = require_utils2();
    async function _readFile(file, options = {}) {
      if (typeof options === "string") {
        options = { encoding: options };
      }
      const fs10 = options.fs || _fs;
      const shouldThrow = "throws" in options ? options.throws : true;
      let data = await universalify.fromCallback(fs10.readFile)(file, options);
      data = stripBom(data);
      let obj;
      try {
        obj = JSON.parse(data, options ? options.reviver : null);
      } catch (err) {
        if (shouldThrow) {
          err.message = `${file}: ${err.message}`;
          throw err;
        } else {
          return null;
        }
      }
      return obj;
    }
    var readFile = universalify.fromPromise(_readFile);
    function readFileSync(file, options = {}) {
      if (typeof options === "string") {
        options = { encoding: options };
      }
      const fs10 = options.fs || _fs;
      const shouldThrow = "throws" in options ? options.throws : true;
      try {
        let content = fs10.readFileSync(file, options);
        content = stripBom(content);
        return JSON.parse(content, options.reviver);
      } catch (err) {
        if (shouldThrow) {
          err.message = `${file}: ${err.message}`;
          throw err;
        } else {
          return null;
        }
      }
    }
    async function _writeFile(file, obj, options = {}) {
      const fs10 = options.fs || _fs;
      const str = stringify(obj, options);
      await universalify.fromCallback(fs10.writeFile)(file, str, options);
    }
    var writeFile = universalify.fromPromise(_writeFile);
    function writeFileSync(file, obj, options = {}) {
      const fs10 = options.fs || _fs;
      const str = stringify(obj, options);
      return fs10.writeFileSync(file, str, options);
    }
    module.exports = {
      readFile,
      readFileSync,
      writeFile,
      writeFileSync
    };
  }
});

// node_modules/fs-extra/lib/json/jsonfile.js
var require_jsonfile2 = __commonJS({
  "node_modules/fs-extra/lib/json/jsonfile.js"(exports, module) {
    "use strict";
    var jsonFile = require_jsonfile();
    module.exports = {
      // jsonfile exports
      readJson: jsonFile.readFile,
      readJsonSync: jsonFile.readFileSync,
      writeJson: jsonFile.writeFile,
      writeJsonSync: jsonFile.writeFileSync
    };
  }
});

// node_modules/fs-extra/lib/output-file/index.js
var require_output_file = __commonJS({
  "node_modules/fs-extra/lib/output-file/index.js"(exports, module) {
    "use strict";
    var u = require_universalify().fromPromise;
    var fs10 = require_fs();
    var path11 = __require("path");
    var mkdir = require_mkdirs();
    var pathExists = require_path_exists().pathExists;
    async function outputFile(file, data, encoding = "utf-8") {
      const dir = path11.dirname(file);
      if (!await pathExists(dir)) {
        await mkdir.mkdirs(dir);
      }
      return fs10.writeFile(file, data, encoding);
    }
    function outputFileSync(file, ...args) {
      const dir = path11.dirname(file);
      if (!fs10.existsSync(dir)) {
        mkdir.mkdirsSync(dir);
      }
      fs10.writeFileSync(file, ...args);
    }
    module.exports = {
      outputFile: u(outputFile),
      outputFileSync
    };
  }
});

// node_modules/fs-extra/lib/json/output-json.js
var require_output_json = __commonJS({
  "node_modules/fs-extra/lib/json/output-json.js"(exports, module) {
    "use strict";
    var { stringify } = require_utils2();
    var { outputFile } = require_output_file();
    async function outputJson(file, data, options = {}) {
      const str = stringify(data, options);
      await outputFile(file, str, options);
    }
    module.exports = outputJson;
  }
});

// node_modules/fs-extra/lib/json/output-json-sync.js
var require_output_json_sync = __commonJS({
  "node_modules/fs-extra/lib/json/output-json-sync.js"(exports, module) {
    "use strict";
    var { stringify } = require_utils2();
    var { outputFileSync } = require_output_file();
    function outputJsonSync(file, data, options) {
      const str = stringify(data, options);
      outputFileSync(file, str, options);
    }
    module.exports = outputJsonSync;
  }
});

// node_modules/fs-extra/lib/json/index.js
var require_json = __commonJS({
  "node_modules/fs-extra/lib/json/index.js"(exports, module) {
    "use strict";
    var u = require_universalify().fromPromise;
    var jsonFile = require_jsonfile2();
    jsonFile.outputJson = u(require_output_json());
    jsonFile.outputJsonSync = require_output_json_sync();
    jsonFile.outputJSON = jsonFile.outputJson;
    jsonFile.outputJSONSync = jsonFile.outputJsonSync;
    jsonFile.writeJSON = jsonFile.writeJson;
    jsonFile.writeJSONSync = jsonFile.writeJsonSync;
    jsonFile.readJSON = jsonFile.readJson;
    jsonFile.readJSONSync = jsonFile.readJsonSync;
    module.exports = jsonFile;
  }
});

// node_modules/fs-extra/lib/move/move.js
var require_move = __commonJS({
  "node_modules/fs-extra/lib/move/move.js"(exports, module) {
    "use strict";
    var fs10 = require_fs();
    var path11 = __require("path");
    var { copy } = require_copy2();
    var { remove } = require_remove();
    var { mkdirp } = require_mkdirs();
    var { pathExists } = require_path_exists();
    var stat = require_stat();
    async function move(src, dest, opts = {}) {
      const overwrite = opts.overwrite || opts.clobber || false;
      const { srcStat, isChangingCase = false } = await stat.checkPaths(src, dest, "move", opts);
      await stat.checkParentPaths(src, srcStat, dest, "move");
      const destParent = path11.dirname(dest);
      const parsedParentPath = path11.parse(destParent);
      if (parsedParentPath.root !== destParent) {
        await mkdirp(destParent);
      }
      return doRename(src, dest, overwrite, isChangingCase);
    }
    async function doRename(src, dest, overwrite, isChangingCase) {
      if (!isChangingCase) {
        if (overwrite) {
          await remove(dest);
        } else if (await pathExists(dest)) {
          throw new Error("dest already exists.");
        }
      }
      try {
        await fs10.rename(src, dest);
      } catch (err) {
        if (err.code !== "EXDEV") {
          throw err;
        }
        await moveAcrossDevice(src, dest, overwrite);
      }
    }
    async function moveAcrossDevice(src, dest, overwrite) {
      const opts = {
        overwrite,
        errorOnExist: true,
        preserveTimestamps: true
      };
      await copy(src, dest, opts);
      return remove(src);
    }
    module.exports = move;
  }
});

// node_modules/fs-extra/lib/move/move-sync.js
var require_move_sync = __commonJS({
  "node_modules/fs-extra/lib/move/move-sync.js"(exports, module) {
    "use strict";
    var fs10 = require_graceful_fs();
    var path11 = __require("path");
    var copySync = require_copy2().copySync;
    var removeSync = require_remove().removeSync;
    var mkdirpSync = require_mkdirs().mkdirpSync;
    var stat = require_stat();
    function moveSync(src, dest, opts) {
      opts = opts || {};
      const overwrite = opts.overwrite || opts.clobber || false;
      const { srcStat, isChangingCase = false } = stat.checkPathsSync(src, dest, "move", opts);
      stat.checkParentPathsSync(src, srcStat, dest, "move");
      if (!isParentRoot(dest)) mkdirpSync(path11.dirname(dest));
      return doRename(src, dest, overwrite, isChangingCase);
    }
    function isParentRoot(dest) {
      const parent = path11.dirname(dest);
      const parsedPath = path11.parse(parent);
      return parsedPath.root === parent;
    }
    function doRename(src, dest, overwrite, isChangingCase) {
      if (isChangingCase) return rename(src, dest, overwrite);
      if (overwrite) {
        removeSync(dest);
        return rename(src, dest, overwrite);
      }
      if (fs10.existsSync(dest)) throw new Error("dest already exists.");
      return rename(src, dest, overwrite);
    }
    function rename(src, dest, overwrite) {
      try {
        fs10.renameSync(src, dest);
      } catch (err) {
        if (err.code !== "EXDEV") throw err;
        return moveAcrossDevice(src, dest, overwrite);
      }
    }
    function moveAcrossDevice(src, dest, overwrite) {
      const opts = {
        overwrite,
        errorOnExist: true,
        preserveTimestamps: true
      };
      copySync(src, dest, opts);
      return removeSync(src);
    }
    module.exports = moveSync;
  }
});

// node_modules/fs-extra/lib/move/index.js
var require_move2 = __commonJS({
  "node_modules/fs-extra/lib/move/index.js"(exports, module) {
    "use strict";
    var u = require_universalify().fromPromise;
    module.exports = {
      move: u(require_move()),
      moveSync: require_move_sync()
    };
  }
});

// node_modules/fs-extra/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/fs-extra/lib/index.js"(exports, module) {
    "use strict";
    module.exports = {
      // Export promiseified graceful-fs:
      ...require_fs(),
      // Export extra methods:
      ...require_copy2(),
      ...require_empty(),
      ...require_ensure(),
      ...require_json(),
      ...require_mkdirs(),
      ...require_move2(),
      ...require_output_file(),
      ...require_path_exists(),
      ...require_remove()
    };
  }
});

// node_modules/picocolors/picocolors.js
var require_picocolors = __commonJS({
  "node_modules/picocolors/picocolors.js"(exports, module) {
    "use strict";
    var p2 = process || {};
    var argv = p2.argv || [];
    var env2 = p2.env || {};
    var isColorSupported = !(!!env2.NO_COLOR || argv.includes("--no-color")) && (!!env2.FORCE_COLOR || argv.includes("--color") || p2.platform === "win32" || (p2.stdout || {}).isTTY && env2.TERM !== "dumb" || !!env2.CI);
    var formatter = (open, close, replace = open) => (input) => {
      let string = "" + input, index = string.indexOf(close, open.length);
      return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close;
    };
    var replaceClose = (string, close, replace, index) => {
      let result = "", cursor = 0;
      do {
        result += string.substring(cursor, index) + replace;
        cursor = index + close.length;
        index = string.indexOf(close, cursor);
      } while (~index);
      return result + string.substring(cursor);
    };
    var createColors = (enabled = isColorSupported) => {
      let f3 = enabled ? formatter : () => String;
      return {
        isColorSupported: enabled,
        reset: f3("\x1B[0m", "\x1B[0m"),
        bold: f3("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m"),
        dim: f3("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"),
        italic: f3("\x1B[3m", "\x1B[23m"),
        underline: f3("\x1B[4m", "\x1B[24m"),
        inverse: f3("\x1B[7m", "\x1B[27m"),
        hidden: f3("\x1B[8m", "\x1B[28m"),
        strikethrough: f3("\x1B[9m", "\x1B[29m"),
        black: f3("\x1B[30m", "\x1B[39m"),
        red: f3("\x1B[31m", "\x1B[39m"),
        green: f3("\x1B[32m", "\x1B[39m"),
        yellow: f3("\x1B[33m", "\x1B[39m"),
        blue: f3("\x1B[34m", "\x1B[39m"),
        magenta: f3("\x1B[35m", "\x1B[39m"),
        cyan: f3("\x1B[36m", "\x1B[39m"),
        white: f3("\x1B[37m", "\x1B[39m"),
        gray: f3("\x1B[90m", "\x1B[39m"),
        bgBlack: f3("\x1B[40m", "\x1B[49m"),
        bgRed: f3("\x1B[41m", "\x1B[49m"),
        bgGreen: f3("\x1B[42m", "\x1B[49m"),
        bgYellow: f3("\x1B[43m", "\x1B[49m"),
        bgBlue: f3("\x1B[44m", "\x1B[49m"),
        bgMagenta: f3("\x1B[45m", "\x1B[49m"),
        bgCyan: f3("\x1B[46m", "\x1B[49m"),
        bgWhite: f3("\x1B[47m", "\x1B[49m"),
        blackBright: f3("\x1B[90m", "\x1B[39m"),
        redBright: f3("\x1B[91m", "\x1B[39m"),
        greenBright: f3("\x1B[92m", "\x1B[39m"),
        yellowBright: f3("\x1B[93m", "\x1B[39m"),
        blueBright: f3("\x1B[94m", "\x1B[39m"),
        magentaBright: f3("\x1B[95m", "\x1B[39m"),
        cyanBright: f3("\x1B[96m", "\x1B[39m"),
        whiteBright: f3("\x1B[97m", "\x1B[39m"),
        bgBlackBright: f3("\x1B[100m", "\x1B[49m"),
        bgRedBright: f3("\x1B[101m", "\x1B[49m"),
        bgGreenBright: f3("\x1B[102m", "\x1B[49m"),
        bgYellowBright: f3("\x1B[103m", "\x1B[49m"),
        bgBlueBright: f3("\x1B[104m", "\x1B[49m"),
        bgMagentaBright: f3("\x1B[105m", "\x1B[49m"),
        bgCyanBright: f3("\x1B[106m", "\x1B[49m"),
        bgWhiteBright: f3("\x1B[107m", "\x1B[49m")
      };
    };
    module.exports = createColors();
    module.exports.createColors = createColors;
  }
});

// node_modules/pluralize/pluralize.js
var require_pluralize = __commonJS({
  "node_modules/pluralize/pluralize.js"(exports, module) {
    "use strict";
    (function(root, pluralize4) {
      if (typeof __require === "function" && typeof exports === "object" && typeof module === "object") {
        module.exports = pluralize4();
      } else if (typeof define === "function" && define.amd) {
        define(function() {
          return pluralize4();
        });
      } else {
        root.pluralize = pluralize4();
      }
    })(exports, function() {
      var pluralRules = [];
      var singularRules = [];
      var uncountables = {};
      var irregularPlurals = {};
      var irregularSingles = {};
      function sanitizeRule(rule) {
        if (typeof rule === "string") {
          return new RegExp("^" + rule + "$", "i");
        }
        return rule;
      }
      function restoreCase(word, token) {
        if (word === token) return token;
        if (word === word.toLowerCase()) return token.toLowerCase();
        if (word === word.toUpperCase()) return token.toUpperCase();
        if (word[0] === word[0].toUpperCase()) {
          return token.charAt(0).toUpperCase() + token.substr(1).toLowerCase();
        }
        return token.toLowerCase();
      }
      function interpolate(str, args) {
        return str.replace(/\$(\d{1,2})/g, function(match, index) {
          return args[index] || "";
        });
      }
      function replace(word, rule) {
        return word.replace(rule[0], function(match, index) {
          var result = interpolate(rule[1], arguments);
          if (match === "") {
            return restoreCase(word[index - 1], result);
          }
          return restoreCase(match, result);
        });
      }
      function sanitizeWord(token, word, rules) {
        if (!token.length || uncountables.hasOwnProperty(token)) {
          return word;
        }
        var len = rules.length;
        while (len--) {
          var rule = rules[len];
          if (rule[0].test(word)) return replace(word, rule);
        }
        return word;
      }
      function replaceWord(replaceMap, keepMap, rules) {
        return function(word) {
          var token = word.toLowerCase();
          if (keepMap.hasOwnProperty(token)) {
            return restoreCase(word, token);
          }
          if (replaceMap.hasOwnProperty(token)) {
            return restoreCase(word, replaceMap[token]);
          }
          return sanitizeWord(token, word, rules);
        };
      }
      function checkWord(replaceMap, keepMap, rules, bool) {
        return function(word) {
          var token = word.toLowerCase();
          if (keepMap.hasOwnProperty(token)) return true;
          if (replaceMap.hasOwnProperty(token)) return false;
          return sanitizeWord(token, token, rules) === token;
        };
      }
      function pluralize4(word, count, inclusive) {
        var pluralized = count === 1 ? pluralize4.singular(word) : pluralize4.plural(word);
        return (inclusive ? count + " " : "") + pluralized;
      }
      pluralize4.plural = replaceWord(
        irregularSingles,
        irregularPlurals,
        pluralRules
      );
      pluralize4.isPlural = checkWord(
        irregularSingles,
        irregularPlurals,
        pluralRules
      );
      pluralize4.singular = replaceWord(
        irregularPlurals,
        irregularSingles,
        singularRules
      );
      pluralize4.isSingular = checkWord(
        irregularPlurals,
        irregularSingles,
        singularRules
      );
      pluralize4.addPluralRule = function(rule, replacement) {
        pluralRules.push([sanitizeRule(rule), replacement]);
      };
      pluralize4.addSingularRule = function(rule, replacement) {
        singularRules.push([sanitizeRule(rule), replacement]);
      };
      pluralize4.addUncountableRule = function(word) {
        if (typeof word === "string") {
          uncountables[word.toLowerCase()] = true;
          return;
        }
        pluralize4.addPluralRule(word, "$0");
        pluralize4.addSingularRule(word, "$0");
      };
      pluralize4.addIrregularRule = function(single, plural) {
        plural = plural.toLowerCase();
        single = single.toLowerCase();
        irregularSingles[single] = plural;
        irregularPlurals[plural] = single;
      };
      [
        // Pronouns.
        ["I", "we"],
        ["me", "us"],
        ["he", "they"],
        ["she", "they"],
        ["them", "them"],
        ["myself", "ourselves"],
        ["yourself", "yourselves"],
        ["itself", "themselves"],
        ["herself", "themselves"],
        ["himself", "themselves"],
        ["themself", "themselves"],
        ["is", "are"],
        ["was", "were"],
        ["has", "have"],
        ["this", "these"],
        ["that", "those"],
        // Words ending in with a consonant and `o`.
        ["echo", "echoes"],
        ["dingo", "dingoes"],
        ["volcano", "volcanoes"],
        ["tornado", "tornadoes"],
        ["torpedo", "torpedoes"],
        // Ends with `us`.
        ["genus", "genera"],
        ["viscus", "viscera"],
        // Ends with `ma`.
        ["stigma", "stigmata"],
        ["stoma", "stomata"],
        ["dogma", "dogmata"],
        ["lemma", "lemmata"],
        ["schema", "schemata"],
        ["anathema", "anathemata"],
        // Other irregular rules.
        ["ox", "oxen"],
        ["axe", "axes"],
        ["die", "dice"],
        ["yes", "yeses"],
        ["foot", "feet"],
        ["eave", "eaves"],
        ["goose", "geese"],
        ["tooth", "teeth"],
        ["quiz", "quizzes"],
        ["human", "humans"],
        ["proof", "proofs"],
        ["carve", "carves"],
        ["valve", "valves"],
        ["looey", "looies"],
        ["thief", "thieves"],
        ["groove", "grooves"],
        ["pickaxe", "pickaxes"],
        ["passerby", "passersby"]
      ].forEach(function(rule) {
        return pluralize4.addIrregularRule(rule[0], rule[1]);
      });
      [
        [/s?$/i, "s"],
        [/[^\u0000-\u007F]$/i, "$0"],
        [/([^aeiou]ese)$/i, "$1"],
        [/(ax|test)is$/i, "$1es"],
        [/(alias|[^aou]us|t[lm]as|gas|ris)$/i, "$1es"],
        [/(e[mn]u)s?$/i, "$1s"],
        [/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i, "$1"],
        [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, "$1i"],
        [/(alumn|alg|vertebr)(?:a|ae)$/i, "$1ae"],
        [/(seraph|cherub)(?:im)?$/i, "$1im"],
        [/(her|at|gr)o$/i, "$1oes"],
        [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, "$1a"],
        [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, "$1a"],
        [/sis$/i, "ses"],
        [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, "$1$2ves"],
        [/([^aeiouy]|qu)y$/i, "$1ies"],
        [/([^ch][ieo][ln])ey$/i, "$1ies"],
        [/(x|ch|ss|sh|zz)$/i, "$1es"],
        [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, "$1ices"],
        [/\b((?:tit)?m|l)(?:ice|ouse)$/i, "$1ice"],
        [/(pe)(?:rson|ople)$/i, "$1ople"],
        [/(child)(?:ren)?$/i, "$1ren"],
        [/eaux$/i, "$0"],
        [/m[ae]n$/i, "men"],
        ["thou", "you"]
      ].forEach(function(rule) {
        return pluralize4.addPluralRule(rule[0], rule[1]);
      });
      [
        [/s$/i, ""],
        [/(ss)$/i, "$1"],
        [/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i, "$1fe"],
        [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, "$1f"],
        [/ies$/i, "y"],
        [/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i, "$1ie"],
        [/\b(mon|smil)ies$/i, "$1ey"],
        [/\b((?:tit)?m|l)ice$/i, "$1ouse"],
        [/(seraph|cherub)im$/i, "$1"],
        [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i, "$1"],
        [/(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i, "$1sis"],
        [/(movie|twelve|abuse|e[mn]u)s$/i, "$1"],
        [/(test)(?:is|es)$/i, "$1is"],
        [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, "$1us"],
        [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, "$1um"],
        [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, "$1on"],
        [/(alumn|alg|vertebr)ae$/i, "$1a"],
        [/(cod|mur|sil|vert|ind)ices$/i, "$1ex"],
        [/(matr|append)ices$/i, "$1ix"],
        [/(pe)(rson|ople)$/i, "$1rson"],
        [/(child)ren$/i, "$1"],
        [/(eau)x?$/i, "$1"],
        [/men$/i, "man"]
      ].forEach(function(rule) {
        return pluralize4.addSingularRule(rule[0], rule[1]);
      });
      [
        // Singular words with no plurals.
        "adulthood",
        "advice",
        "agenda",
        "aid",
        "aircraft",
        "alcohol",
        "ammo",
        "analytics",
        "anime",
        "athletics",
        "audio",
        "bison",
        "blood",
        "bream",
        "buffalo",
        "butter",
        "carp",
        "cash",
        "chassis",
        "chess",
        "clothing",
        "cod",
        "commerce",
        "cooperation",
        "corps",
        "debris",
        "diabetes",
        "digestion",
        "elk",
        "energy",
        "equipment",
        "excretion",
        "expertise",
        "firmware",
        "flounder",
        "fun",
        "gallows",
        "garbage",
        "graffiti",
        "hardware",
        "headquarters",
        "health",
        "herpes",
        "highjinks",
        "homework",
        "housework",
        "information",
        "jeans",
        "justice",
        "kudos",
        "labour",
        "literature",
        "machinery",
        "mackerel",
        "mail",
        "media",
        "mews",
        "moose",
        "music",
        "mud",
        "manga",
        "news",
        "only",
        "personnel",
        "pike",
        "plankton",
        "pliers",
        "police",
        "pollution",
        "premises",
        "rain",
        "research",
        "rice",
        "salmon",
        "scissors",
        "series",
        "sewage",
        "shambles",
        "shrimp",
        "software",
        "species",
        "staff",
        "swine",
        "tennis",
        "traffic",
        "transportation",
        "trout",
        "tuna",
        "wealth",
        "welfare",
        "whiting",
        "wildebeest",
        "wildlife",
        "you",
        /pok[eé]mon$/i,
        // Regexes.
        /[^aeiou]ese$/i,
        // "chinese", "japanese"
        /deer$/i,
        // "deer", "reindeer"
        /fish$/i,
        // "fish", "blowfish", "angelfish"
        /measles$/i,
        /o[iu]s$/i,
        // "carnivorous"
        /pox$/i,
        // "chickpox", "smallpox"
        /sheep$/i
      ].forEach(pluralize4.addUncountableRule);
      return pluralize4;
    });
  }
});

// node_modules/handlebars/dist/cjs/handlebars/utils.js
var require_utils3 = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/utils.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.extend = extend;
    exports.indexOf = indexOf;
    exports.escapeExpression = escapeExpression;
    exports.isEmpty = isEmpty;
    exports.createFrame = createFrame;
    exports.blockParams = blockParams;
    exports.appendContextPath = appendContextPath;
    var escape = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "`": "&#x60;",
      "=": "&#x3D;"
    };
    var badChars = /[&<>"'`=]/g;
    var possible = /[&<>"'`=]/;
    function escapeChar(chr) {
      return escape[chr];
    }
    function extend(obj) {
      for (var i = 1; i < arguments.length; i++) {
        for (var key in arguments[i]) {
          if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
            obj[key] = arguments[i][key];
          }
        }
      }
      return obj;
    }
    var toString = Object.prototype.toString;
    exports.toString = toString;
    var isFunction = function isFunction2(value) {
      return typeof value === "function";
    };
    if (isFunction(/x/)) {
      exports.isFunction = isFunction = function(value) {
        return typeof value === "function" && toString.call(value) === "[object Function]";
      };
    }
    exports.isFunction = isFunction;
    var isArray = Array.isArray || function(value) {
      return value && typeof value === "object" ? toString.call(value) === "[object Array]" : false;
    };
    exports.isArray = isArray;
    function indexOf(array, value) {
      for (var i = 0, len = array.length; i < len; i++) {
        if (array[i] === value) {
          return i;
        }
      }
      return -1;
    }
    function escapeExpression(string) {
      if (typeof string !== "string") {
        if (string && string.toHTML) {
          return string.toHTML();
        } else if (string == null) {
          return "";
        } else if (!string) {
          return string + "";
        }
        string = "" + string;
      }
      if (!possible.test(string)) {
        return string;
      }
      return string.replace(badChars, escapeChar);
    }
    function isEmpty(value) {
      if (!value && value !== 0) {
        return true;
      } else if (isArray(value) && value.length === 0) {
        return true;
      } else {
        return false;
      }
    }
    function createFrame(object) {
      var frame = extend({}, object);
      frame._parent = object;
      return frame;
    }
    function blockParams(params, ids) {
      params.path = ids;
      return params;
    }
    function appendContextPath(contextPath, id) {
      return (contextPath ? contextPath + "." : "") + id;
    }
  }
});

// node_modules/handlebars/dist/cjs/handlebars/exception.js
var require_exception = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/exception.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    var errorProps = ["description", "fileName", "lineNumber", "endLineNumber", "message", "name", "number", "stack"];
    function Exception(message, node) {
      var loc = node && node.loc, line = void 0, endLineNumber = void 0, column = void 0, endColumn = void 0;
      if (loc) {
        line = loc.start.line;
        endLineNumber = loc.end.line;
        column = loc.start.column;
        endColumn = loc.end.column;
        message += " - " + line + ":" + column;
      }
      var tmp = Error.prototype.constructor.call(this, message);
      for (var idx = 0; idx < errorProps.length; idx++) {
        this[errorProps[idx]] = tmp[errorProps[idx]];
      }
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, Exception);
      }
      try {
        if (loc) {
          this.lineNumber = line;
          this.endLineNumber = endLineNumber;
          if (Object.defineProperty) {
            Object.defineProperty(this, "column", {
              value: column,
              enumerable: true
            });
            Object.defineProperty(this, "endColumn", {
              value: endColumn,
              enumerable: true
            });
          } else {
            this.column = column;
            this.endColumn = endColumn;
          }
        }
      } catch (nop) {
      }
    }
    Exception.prototype = new Error();
    exports["default"] = Exception;
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/helpers/block-helper-missing.js
var require_block_helper_missing = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/helpers/block-helper-missing.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    var _utils = require_utils3();
    exports["default"] = function(instance) {
      instance.registerHelper("blockHelperMissing", function(context, options) {
        var inverse2 = options.inverse, fn2 = options.fn;
        if (context === true) {
          return fn2(this);
        } else if (context === false || context == null) {
          return inverse2(this);
        } else if (_utils.isArray(context)) {
          if (context.length > 0) {
            if (options.ids) {
              options.ids = [options.name];
            }
            return instance.helpers.each(context, options);
          } else {
            return inverse2(this);
          }
        } else {
          if (options.data && options.ids) {
            var data = _utils.createFrame(options.data);
            data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
            options = { data };
          }
          return fn2(context, options);
        }
      });
    };
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/helpers/each.js
var require_each = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/helpers/each.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _utils = require_utils3();
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    exports["default"] = function(instance) {
      instance.registerHelper("each", function(context, options) {
        if (!options) {
          throw new _exception2["default"]("Must pass iterator to #each");
        }
        var fn2 = options.fn, inverse2 = options.inverse, i = 0, ret = "", data = void 0, contextPath = void 0;
        if (options.data && options.ids) {
          contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + ".";
        }
        if (_utils.isFunction(context)) {
          context = context.call(this);
        }
        if (options.data) {
          data = _utils.createFrame(options.data);
        }
        function execIteration(field, index, last) {
          if (data) {
            data.key = field;
            data.index = index;
            data.first = index === 0;
            data.last = !!last;
            if (contextPath) {
              data.contextPath = contextPath + field;
            }
          }
          ret = ret + fn2(context[field], {
            data,
            blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
          });
        }
        if (context && typeof context === "object") {
          if (_utils.isArray(context)) {
            for (var j3 = context.length; i < j3; i++) {
              if (i in context) {
                execIteration(i, i, i === context.length - 1);
              }
            }
          } else if (typeof Symbol === "function" && context[Symbol.iterator]) {
            var newContext = [];
            var iterator = context[Symbol.iterator]();
            for (var it2 = iterator.next(); !it2.done; it2 = iterator.next()) {
              newContext.push(it2.value);
            }
            context = newContext;
            for (var j3 = context.length; i < j3; i++) {
              execIteration(i, i, i === context.length - 1);
            }
          } else {
            (function() {
              var priorKey = void 0;
              Object.keys(context).forEach(function(key) {
                if (priorKey !== void 0) {
                  execIteration(priorKey, i - 1);
                }
                priorKey = key;
                i++;
              });
              if (priorKey !== void 0) {
                execIteration(priorKey, i - 1, true);
              }
            })();
          }
        }
        if (i === 0) {
          ret = inverse2(this);
        }
        return ret;
      });
    };
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/helpers/helper-missing.js
var require_helper_missing = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/helpers/helper-missing.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    exports["default"] = function(instance) {
      instance.registerHelper("helperMissing", function() {
        if (arguments.length === 1) {
          return void 0;
        } else {
          throw new _exception2["default"]('Missing helper: "' + arguments[arguments.length - 1].name + '"');
        }
      });
    };
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/helpers/if.js
var require_if = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/helpers/if.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _utils = require_utils3();
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    exports["default"] = function(instance) {
      instance.registerHelper("if", function(conditional, options) {
        if (arguments.length != 2) {
          throw new _exception2["default"]("#if requires exactly one argument");
        }
        if (_utils.isFunction(conditional)) {
          conditional = conditional.call(this);
        }
        if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
          return options.inverse(this);
        } else {
          return options.fn(this);
        }
      });
      instance.registerHelper("unless", function(conditional, options) {
        if (arguments.length != 2) {
          throw new _exception2["default"]("#unless requires exactly one argument");
        }
        return instance.helpers["if"].call(this, conditional, {
          fn: options.inverse,
          inverse: options.fn,
          hash: options.hash
        });
      });
    };
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/helpers/log.js
var require_log = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/helpers/log.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = function(instance) {
      instance.registerHelper("log", function() {
        var args = [void 0], options = arguments[arguments.length - 1];
        for (var i = 0; i < arguments.length - 1; i++) {
          args.push(arguments[i]);
        }
        var level = 1;
        if (options.hash.level != null) {
          level = options.hash.level;
        } else if (options.data && options.data.level != null) {
          level = options.data.level;
        }
        args[0] = level;
        instance.log.apply(instance, args);
      });
    };
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/helpers/lookup.js
var require_lookup = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/helpers/lookup.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = function(instance) {
      instance.registerHelper("lookup", function(obj, field, options) {
        if (!obj) {
          return obj;
        }
        return options.lookupProperty(obj, field);
      });
    };
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/helpers/with.js
var require_with = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/helpers/with.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _utils = require_utils3();
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    exports["default"] = function(instance) {
      instance.registerHelper("with", function(context, options) {
        if (arguments.length != 2) {
          throw new _exception2["default"]("#with requires exactly one argument");
        }
        if (_utils.isFunction(context)) {
          context = context.call(this);
        }
        var fn2 = options.fn;
        if (!_utils.isEmpty(context)) {
          var data = options.data;
          if (options.data && options.ids) {
            data = _utils.createFrame(options.data);
            data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
          }
          return fn2(context, {
            data,
            blockParams: _utils.blockParams([context], [data && data.contextPath])
          });
        } else {
          return options.inverse(this);
        }
      });
    };
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/helpers.js
var require_helpers = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/helpers.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.registerDefaultHelpers = registerDefaultHelpers;
    exports.moveHelperToHooks = moveHelperToHooks;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _helpersBlockHelperMissing = require_block_helper_missing();
    var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);
    var _helpersEach = require_each();
    var _helpersEach2 = _interopRequireDefault(_helpersEach);
    var _helpersHelperMissing = require_helper_missing();
    var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);
    var _helpersIf = require_if();
    var _helpersIf2 = _interopRequireDefault(_helpersIf);
    var _helpersLog = require_log();
    var _helpersLog2 = _interopRequireDefault(_helpersLog);
    var _helpersLookup = require_lookup();
    var _helpersLookup2 = _interopRequireDefault(_helpersLookup);
    var _helpersWith = require_with();
    var _helpersWith2 = _interopRequireDefault(_helpersWith);
    function registerDefaultHelpers(instance) {
      _helpersBlockHelperMissing2["default"](instance);
      _helpersEach2["default"](instance);
      _helpersHelperMissing2["default"](instance);
      _helpersIf2["default"](instance);
      _helpersLog2["default"](instance);
      _helpersLookup2["default"](instance);
      _helpersWith2["default"](instance);
    }
    function moveHelperToHooks(instance, helperName, keepHelper) {
      if (instance.helpers[helperName]) {
        instance.hooks[helperName] = instance.helpers[helperName];
        if (!keepHelper) {
          instance.helpers[helperName] = void 0;
        }
      }
    }
  }
});

// node_modules/handlebars/dist/cjs/handlebars/decorators/inline.js
var require_inline = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/decorators/inline.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    var _utils = require_utils3();
    exports["default"] = function(instance) {
      instance.registerDecorator("inline", function(fn2, props, container, options) {
        var ret = fn2;
        if (!props.partials) {
          props.partials = {};
          ret = function(context, options2) {
            var original = container.partials;
            container.partials = _utils.extend({}, original, props.partials);
            var ret2 = fn2(context, options2);
            container.partials = original;
            return ret2;
          };
        }
        props.partials[options.args[0]] = options.fn;
        return ret;
      });
    };
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/decorators.js
var require_decorators = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/decorators.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.registerDefaultDecorators = registerDefaultDecorators;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _decoratorsInline = require_inline();
    var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);
    function registerDefaultDecorators(instance) {
      _decoratorsInline2["default"](instance);
    }
  }
});

// node_modules/handlebars/dist/cjs/handlebars/logger.js
var require_logger = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/logger.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    var _utils = require_utils3();
    var logger = {
      methodMap: ["debug", "info", "warn", "error"],
      level: "info",
      // Maps a given level value to the `methodMap` indexes above.
      lookupLevel: function lookupLevel(level) {
        if (typeof level === "string") {
          var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
          if (levelMap >= 0) {
            level = levelMap;
          } else {
            level = parseInt(level, 10);
          }
        }
        return level;
      },
      // Can be overridden in the host environment
      log: function log(level) {
        level = logger.lookupLevel(level);
        if (typeof console !== "undefined" && logger.lookupLevel(logger.level) <= level) {
          var method = logger.methodMap[level];
          if (!console[method]) {
            method = "log";
          }
          for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            message[_key - 1] = arguments[_key];
          }
          console[method].apply(console, message);
        }
      }
    };
    exports["default"] = logger;
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/internal/proto-access.js
var require_proto_access = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/internal/proto-access.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.createProtoAccessControl = createProtoAccessControl;
    exports.resultIsAllowed = resultIsAllowed;
    exports.resetLoggedProperties = resetLoggedProperties;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _utils = require_utils3();
    var _logger = require_logger();
    var _logger2 = _interopRequireDefault(_logger);
    var loggedProperties = /* @__PURE__ */ Object.create(null);
    function createProtoAccessControl(runtimeOptions) {
      var propertyWhiteList = /* @__PURE__ */ Object.create(null);
      propertyWhiteList["__proto__"] = false;
      _utils.extend(propertyWhiteList, runtimeOptions.allowedProtoProperties);
      var methodWhiteList = /* @__PURE__ */ Object.create(null);
      methodWhiteList["constructor"] = false;
      methodWhiteList["__defineGetter__"] = false;
      methodWhiteList["__defineSetter__"] = false;
      methodWhiteList["__lookupGetter__"] = false;
      methodWhiteList["__lookupSetter__"] = false;
      _utils.extend(methodWhiteList, runtimeOptions.allowedProtoMethods);
      return {
        properties: {
          whitelist: propertyWhiteList,
          defaultValue: runtimeOptions.allowProtoPropertiesByDefault
        },
        methods: {
          whitelist: methodWhiteList,
          defaultValue: runtimeOptions.allowProtoMethodsByDefault
        }
      };
    }
    function resultIsAllowed(result, protoAccessControl, propertyName) {
      if (typeof result === "function") {
        return checkWhiteList(protoAccessControl.methods, propertyName);
      } else {
        return checkWhiteList(protoAccessControl.properties, propertyName);
      }
    }
    function checkWhiteList(protoAccessControlForType, propertyName) {
      if (protoAccessControlForType.whitelist[propertyName] !== void 0) {
        return protoAccessControlForType.whitelist[propertyName] === true;
      }
      if (protoAccessControlForType.defaultValue !== void 0) {
        return protoAccessControlForType.defaultValue;
      }
      logUnexpecedPropertyAccessOnce(propertyName);
      return false;
    }
    function logUnexpecedPropertyAccessOnce(propertyName) {
      if (loggedProperties[propertyName] !== true) {
        loggedProperties[propertyName] = true;
        _logger2["default"].log("error", 'Handlebars: Access has been denied to resolve the property "' + propertyName + '" because it is not an "own property" of its parent.\nYou can add a runtime option to disable the check or this warning:\nSee https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details');
      }
    }
    function resetLoggedProperties() {
      Object.keys(loggedProperties).forEach(function(propertyName) {
        delete loggedProperties[propertyName];
      });
    }
  }
});

// node_modules/handlebars/dist/cjs/handlebars/base.js
var require_base = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/base.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.HandlebarsEnvironment = HandlebarsEnvironment;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _utils = require_utils3();
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    var _helpers = require_helpers();
    var _decorators = require_decorators();
    var _logger = require_logger();
    var _logger2 = _interopRequireDefault(_logger);
    var _internalProtoAccess = require_proto_access();
    var VERSION = "4.7.9";
    exports.VERSION = VERSION;
    var COMPILER_REVISION = 8;
    exports.COMPILER_REVISION = COMPILER_REVISION;
    var LAST_COMPATIBLE_COMPILER_REVISION = 7;
    exports.LAST_COMPATIBLE_COMPILER_REVISION = LAST_COMPATIBLE_COMPILER_REVISION;
    var REVISION_CHANGES = {
      1: "<= 1.0.rc.2",
      // 1.0.rc.2 is actually rev2 but doesn't report it
      2: "== 1.0.0-rc.3",
      3: "== 1.0.0-rc.4",
      4: "== 1.x.x",
      5: "== 2.0.0-alpha.x",
      6: ">= 2.0.0-beta.1",
      7: ">= 4.0.0 <4.3.0",
      8: ">= 4.3.0"
    };
    exports.REVISION_CHANGES = REVISION_CHANGES;
    var objectType = "[object Object]";
    function HandlebarsEnvironment(helpers, partials, decorators) {
      this.helpers = helpers || {};
      this.partials = partials || {};
      this.decorators = decorators || {};
      _helpers.registerDefaultHelpers(this);
      _decorators.registerDefaultDecorators(this);
    }
    HandlebarsEnvironment.prototype = {
      constructor: HandlebarsEnvironment,
      logger: _logger2["default"],
      log: _logger2["default"].log,
      registerHelper: function registerHelper(name, fn2) {
        if (_utils.toString.call(name) === objectType) {
          if (fn2) {
            throw new _exception2["default"]("Arg not supported with multiple helpers");
          }
          _utils.extend(this.helpers, name);
        } else {
          this.helpers[name] = fn2;
        }
      },
      unregisterHelper: function unregisterHelper(name) {
        delete this.helpers[name];
      },
      registerPartial: function registerPartial(name, partial) {
        if (_utils.toString.call(name) === objectType) {
          _utils.extend(this.partials, name);
        } else {
          if (typeof partial === "undefined") {
            throw new _exception2["default"]('Attempting to register a partial called "' + name + '" as undefined');
          }
          this.partials[name] = partial;
        }
      },
      unregisterPartial: function unregisterPartial(name) {
        delete this.partials[name];
      },
      registerDecorator: function registerDecorator(name, fn2) {
        if (_utils.toString.call(name) === objectType) {
          if (fn2) {
            throw new _exception2["default"]("Arg not supported with multiple decorators");
          }
          _utils.extend(this.decorators, name);
        } else {
          this.decorators[name] = fn2;
        }
      },
      unregisterDecorator: function unregisterDecorator(name) {
        delete this.decorators[name];
      },
      /**
       * Reset the memory of illegal property accesses that have already been logged.
       * @deprecated should only be used in handlebars test-cases
       */
      resetLoggedPropertyAccesses: function resetLoggedPropertyAccesses() {
        _internalProtoAccess.resetLoggedProperties();
      }
    };
    var log = _logger2["default"].log;
    exports.log = log;
    exports.createFrame = _utils.createFrame;
    exports.logger = _logger2["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/safe-string.js
var require_safe_string = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/safe-string.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    function SafeString(string) {
      this.string = string;
    }
    SafeString.prototype.toString = SafeString.prototype.toHTML = function() {
      return "" + this.string;
    };
    exports["default"] = SafeString;
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/internal/wrapHelper.js
var require_wrapHelper = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/internal/wrapHelper.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.wrapHelper = wrapHelper;
    function wrapHelper(helper, transformOptionsFn) {
      if (typeof helper !== "function") {
        return helper;
      }
      var wrapper = function wrapper2() {
        var options = arguments[arguments.length - 1];
        arguments[arguments.length - 1] = transformOptionsFn(options);
        return helper.apply(this, arguments);
      };
      return wrapper;
    }
  }
});

// node_modules/handlebars/dist/cjs/handlebars/runtime.js
var require_runtime = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/runtime.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.checkRevision = checkRevision;
    exports.template = template;
    exports.wrapProgram = wrapProgram;
    exports.resolvePartial = resolvePartial;
    exports.invokePartial = invokePartial;
    exports.noop = noop;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};
        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
          }
        }
        newObj["default"] = obj;
        return newObj;
      }
    }
    var _utils = require_utils3();
    var Utils = _interopRequireWildcard(_utils);
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    var _base = require_base();
    var _helpers = require_helpers();
    var _internalWrapHelper = require_wrapHelper();
    var _internalProtoAccess = require_proto_access();
    function checkRevision(compilerInfo) {
      var compilerRevision = compilerInfo && compilerInfo[0] || 1, currentRevision = _base.COMPILER_REVISION;
      if (compilerRevision >= _base.LAST_COMPATIBLE_COMPILER_REVISION && compilerRevision <= _base.COMPILER_REVISION) {
        return;
      }
      if (compilerRevision < _base.LAST_COMPATIBLE_COMPILER_REVISION) {
        var runtimeVersions = _base.REVISION_CHANGES[currentRevision], compilerVersions = _base.REVISION_CHANGES[compilerRevision];
        throw new _exception2["default"]("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + runtimeVersions + ") or downgrade your runtime to an older version (" + compilerVersions + ").");
      } else {
        throw new _exception2["default"]("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + compilerInfo[1] + ").");
      }
    }
    function template(templateSpec, env2) {
      if (!env2) {
        throw new _exception2["default"]("No environment passed to template");
      }
      if (!templateSpec || !templateSpec.main) {
        throw new _exception2["default"]("Unknown template object: " + typeof templateSpec);
      }
      templateSpec.main.decorator = templateSpec.main_d;
      env2.VM.checkRevision(templateSpec.compiler);
      var templateWasPrecompiledWithCompilerV7 = templateSpec.compiler && templateSpec.compiler[0] === 7;
      function invokePartialWrapper(partial, context, options) {
        if (options.hash) {
          context = Utils.extend({}, context, options.hash);
          if (options.ids) {
            options.ids[0] = true;
          }
        }
        partial = env2.VM.resolvePartial.call(this, partial, context, options);
        options.hooks = this.hooks;
        options.protoAccessControl = this.protoAccessControl;
        var result = env2.VM.invokePartial.call(this, partial, context, options);
        if (result == null && env2.compile) {
          options.partials[options.name] = env2.compile(partial, templateSpec.compilerOptions, env2);
          result = options.partials[options.name](context, options);
        }
        if (result != null) {
          if (options.indent) {
            var lines = result.split("\n");
            for (var i = 0, l = lines.length; i < l; i++) {
              if (!lines[i] && i + 1 === l) {
                break;
              }
              lines[i] = options.indent + lines[i];
            }
            result = lines.join("\n");
          }
          return result;
        } else {
          throw new _exception2["default"]("The partial " + options.name + " could not be compiled when running in runtime-only mode");
        }
      }
      var container = {
        strict: function strict(obj, name, loc) {
          if (!obj || !(name in obj)) {
            throw new _exception2["default"]('"' + name + '" not defined in ' + obj, {
              loc
            });
          }
          return container.lookupProperty(obj, name);
        },
        lookupProperty: function lookupProperty(parent, propertyName) {
          var result = parent[propertyName];
          if (result == null) {
            return result;
          }
          if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
            return result;
          }
          if (_internalProtoAccess.resultIsAllowed(result, container.protoAccessControl, propertyName)) {
            return result;
          }
          return void 0;
        },
        lookup: function lookup(depths, name) {
          var len = depths.length;
          for (var i = 0; i < len; i++) {
            var result = depths[i] && container.lookupProperty(depths[i], name);
            if (result != null) {
              return result;
            }
          }
        },
        lambda: function lambda(current, context) {
          return typeof current === "function" ? current.call(context) : current;
        },
        escapeExpression: Utils.escapeExpression,
        invokePartial: invokePartialWrapper,
        fn: function fn2(i) {
          var ret2 = templateSpec[i];
          ret2.decorator = templateSpec[i + "_d"];
          return ret2;
        },
        programs: [],
        program: function program3(i, data, declaredBlockParams, blockParams, depths) {
          var programWrapper = this.programs[i], fn2 = this.fn(i);
          if (data || depths || blockParams || declaredBlockParams) {
            programWrapper = wrapProgram(this, i, fn2, data, declaredBlockParams, blockParams, depths);
          } else if (!programWrapper) {
            programWrapper = this.programs[i] = wrapProgram(this, i, fn2);
          }
          return programWrapper;
        },
        data: function data(value, depth) {
          while (value && depth--) {
            value = value._parent;
          }
          return value;
        },
        mergeIfNeeded: function mergeIfNeeded(param, common2) {
          var obj = param || common2;
          if (param && common2 && param !== common2) {
            obj = Utils.extend({}, common2, param);
          }
          return obj;
        },
        // An empty object to use as replacement for null-contexts
        nullContext: Object.seal({}),
        noop: env2.VM.noop,
        compilerInfo: templateSpec.compiler
      };
      function ret(context) {
        var options = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1];
        var data = options.data;
        ret._setup(options);
        if (!options.partial && templateSpec.useData) {
          data = initData(context, data);
        }
        var depths = void 0, blockParams = templateSpec.useBlockParams ? [] : void 0;
        if (templateSpec.useDepths) {
          if (options.depths) {
            depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
          } else {
            depths = [context];
          }
        }
        function main(context2) {
          return "" + templateSpec.main(container, context2, container.helpers, container.partials, data, blockParams, depths);
        }
        main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
        return main(context, options);
      }
      ret.isTop = true;
      ret._setup = function(options) {
        if (!options.partial) {
          var mergedHelpers = {};
          addHelpers(mergedHelpers, env2.helpers, container);
          addHelpers(mergedHelpers, options.helpers, container);
          container.helpers = mergedHelpers;
          if (templateSpec.usePartial) {
            container.partials = container.mergeIfNeeded(options.partials, env2.partials);
          }
          if (templateSpec.usePartial || templateSpec.useDecorators) {
            container.decorators = Utils.extend({}, env2.decorators, options.decorators);
          }
          container.hooks = {};
          container.protoAccessControl = _internalProtoAccess.createProtoAccessControl(options);
          var keepHelperInHelpers = options.allowCallsToHelperMissing || templateWasPrecompiledWithCompilerV7;
          _helpers.moveHelperToHooks(container, "helperMissing", keepHelperInHelpers);
          _helpers.moveHelperToHooks(container, "blockHelperMissing", keepHelperInHelpers);
        } else {
          container.protoAccessControl = options.protoAccessControl;
          container.helpers = options.helpers;
          container.partials = options.partials;
          container.decorators = options.decorators;
          container.hooks = options.hooks;
        }
      };
      ret._child = function(i, data, blockParams, depths) {
        if (templateSpec.useBlockParams && !blockParams) {
          throw new _exception2["default"]("must pass block params");
        }
        if (templateSpec.useDepths && !depths) {
          throw new _exception2["default"]("must pass parent depths");
        }
        return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
      };
      return ret;
    }
    function wrapProgram(container, i, fn2, data, declaredBlockParams, blockParams, depths) {
      function prog(context) {
        var options = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1];
        var currentDepths = depths;
        if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
          currentDepths = [context].concat(depths);
        }
        return fn2(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
      }
      prog = executeDecorators(fn2, prog, container, depths, data, blockParams);
      prog.program = i;
      prog.depth = depths ? depths.length : 0;
      prog.blockParams = declaredBlockParams || 0;
      return prog;
    }
    function resolvePartial(partial, context, options) {
      if (!partial) {
        if (options.name === "@partial-block") {
          partial = lookupOwnProperty(options.data, "partial-block");
        } else {
          partial = lookupOwnProperty(options.partials, options.name);
        }
      } else if (!partial.call && !options.name) {
        options.name = partial;
        partial = lookupOwnProperty(options.partials, partial);
      }
      return partial;
    }
    function invokePartial(partial, context, options) {
      var currentPartialBlock = lookupOwnProperty(options.data, "partial-block");
      options.partial = true;
      if (options.ids) {
        options.data.contextPath = options.ids[0] || options.data.contextPath;
      }
      var partialBlock = void 0;
      if (options.fn && options.fn !== noop) {
        (function() {
          options.data = _base.createFrame(options.data);
          var fn2 = options.fn;
          partialBlock = options.data["partial-block"] = function partialBlockWrapper(context2) {
            var options2 = arguments.length <= 1 || arguments[1] === void 0 ? {} : arguments[1];
            options2.data = _base.createFrame(options2.data);
            options2.data["partial-block"] = currentPartialBlock;
            return fn2(context2, options2);
          };
          if (fn2.partials) {
            options.partials = Utils.extend({}, options.partials, fn2.partials);
          }
        })();
      }
      if (partial === void 0 && partialBlock) {
        partial = partialBlock;
      }
      if (partial === void 0) {
        throw new _exception2["default"]("The partial " + options.name + " could not be found");
      } else if (partial instanceof Function) {
        return partial(context, options);
      }
    }
    function noop() {
      return "";
    }
    function lookupOwnProperty(obj, name) {
      if (obj && Object.prototype.hasOwnProperty.call(obj, name)) {
        return obj[name];
      }
    }
    function initData(context, data) {
      if (!data || !("root" in data)) {
        data = data ? _base.createFrame(data) : {};
        data.root = context;
      }
      return data;
    }
    function executeDecorators(fn2, prog, container, depths, data, blockParams) {
      if (fn2.decorator) {
        var props = {};
        prog = fn2.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
        Utils.extend(prog, props);
      }
      return prog;
    }
    function addHelpers(mergedHelpers, helpers, container) {
      if (!helpers) return;
      Object.keys(helpers).forEach(function(helperName) {
        var helper = helpers[helperName];
        mergedHelpers[helperName] = passLookupPropertyOption(helper, container);
      });
    }
    function passLookupPropertyOption(helper, container) {
      var lookupProperty = container.lookupProperty;
      return _internalWrapHelper.wrapHelper(helper, function(options) {
        options.lookupProperty = lookupProperty;
        return options;
      });
    }
  }
});

// node_modules/handlebars/dist/cjs/handlebars/no-conflict.js
var require_no_conflict = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/no-conflict.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    exports["default"] = function(Handlebars2) {
      (function() {
        if (typeof globalThis === "object") return;
        Object.prototype.__defineGetter__("__magic__", function() {
          return this;
        });
        __magic__.globalThis = __magic__;
        delete Object.prototype.__magic__;
      })();
      var $Handlebars = globalThis.Handlebars;
      Handlebars2.noConflict = function() {
        if (globalThis.Handlebars === Handlebars2) {
          globalThis.Handlebars = $Handlebars;
        }
        return Handlebars2;
      };
    };
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars.runtime.js
var require_handlebars_runtime = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars.runtime.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};
        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
          }
        }
        newObj["default"] = obj;
        return newObj;
      }
    }
    var _handlebarsBase = require_base();
    var base = _interopRequireWildcard(_handlebarsBase);
    var _handlebarsSafeString = require_safe_string();
    var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);
    var _handlebarsException = require_exception();
    var _handlebarsException2 = _interopRequireDefault(_handlebarsException);
    var _handlebarsUtils = require_utils3();
    var Utils = _interopRequireWildcard(_handlebarsUtils);
    var _handlebarsRuntime = require_runtime();
    var runtime = _interopRequireWildcard(_handlebarsRuntime);
    var _handlebarsNoConflict = require_no_conflict();
    var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);
    function create() {
      var hb = new base.HandlebarsEnvironment();
      Utils.extend(hb, base);
      hb.SafeString = _handlebarsSafeString2["default"];
      hb.Exception = _handlebarsException2["default"];
      hb.Utils = Utils;
      hb.escapeExpression = Utils.escapeExpression;
      hb.VM = runtime;
      hb.template = function(spec) {
        return runtime.template(spec, hb);
      };
      return hb;
    }
    var inst = create();
    inst.create = create;
    _handlebarsNoConflict2["default"](inst);
    inst["default"] = inst;
    exports["default"] = inst;
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/compiler/ast.js
var require_ast = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/compiler/ast.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    var AST = {
      // Public API used to evaluate derived attributes regarding AST nodes
      helpers: {
        // a mustache is definitely a helper if:
        // * it is an eligible helper, and
        // * it has at least one parameter or hash segment
        helperExpression: function helperExpression(node) {
          return node.type === "SubExpression" || (node.type === "MustacheStatement" || node.type === "BlockStatement") && !!(node.params && node.params.length || node.hash);
        },
        scopedId: function scopedId(path11) {
          return /^\.|this\b/.test(path11.original);
        },
        // an ID is simple if it only has one part, and that part is not
        // `..` or `this`.
        simpleId: function simpleId(path11) {
          return path11.parts.length === 1 && !AST.helpers.scopedId(path11) && !path11.depth;
        }
      }
    };
    exports["default"] = AST;
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/compiler/parser.js
var require_parser = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/compiler/parser.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    var handlebars = (function() {
      var parser = {
        trace: function trace() {
        },
        yy: {},
        symbols_: { "error": 2, "root": 3, "program": 4, "EOF": 5, "program_repetition0": 6, "statement": 7, "mustache": 8, "block": 9, "rawBlock": 10, "partial": 11, "partialBlock": 12, "content": 13, "COMMENT": 14, "CONTENT": 15, "openRawBlock": 16, "rawBlock_repetition0": 17, "END_RAW_BLOCK": 18, "OPEN_RAW_BLOCK": 19, "helperName": 20, "openRawBlock_repetition0": 21, "openRawBlock_option0": 22, "CLOSE_RAW_BLOCK": 23, "openBlock": 24, "block_option0": 25, "closeBlock": 26, "openInverse": 27, "block_option1": 28, "OPEN_BLOCK": 29, "openBlock_repetition0": 30, "openBlock_option0": 31, "openBlock_option1": 32, "CLOSE": 33, "OPEN_INVERSE": 34, "openInverse_repetition0": 35, "openInverse_option0": 36, "openInverse_option1": 37, "openInverseChain": 38, "OPEN_INVERSE_CHAIN": 39, "openInverseChain_repetition0": 40, "openInverseChain_option0": 41, "openInverseChain_option1": 42, "inverseAndProgram": 43, "INVERSE": 44, "inverseChain": 45, "inverseChain_option0": 46, "OPEN_ENDBLOCK": 47, "OPEN": 48, "mustache_repetition0": 49, "mustache_option0": 50, "OPEN_UNESCAPED": 51, "mustache_repetition1": 52, "mustache_option1": 53, "CLOSE_UNESCAPED": 54, "OPEN_PARTIAL": 55, "partialName": 56, "partial_repetition0": 57, "partial_option0": 58, "openPartialBlock": 59, "OPEN_PARTIAL_BLOCK": 60, "openPartialBlock_repetition0": 61, "openPartialBlock_option0": 62, "param": 63, "sexpr": 64, "OPEN_SEXPR": 65, "sexpr_repetition0": 66, "sexpr_option0": 67, "CLOSE_SEXPR": 68, "hash": 69, "hash_repetition_plus0": 70, "hashSegment": 71, "ID": 72, "EQUALS": 73, "blockParams": 74, "OPEN_BLOCK_PARAMS": 75, "blockParams_repetition_plus0": 76, "CLOSE_BLOCK_PARAMS": 77, "path": 78, "dataName": 79, "STRING": 80, "NUMBER": 81, "BOOLEAN": 82, "UNDEFINED": 83, "NULL": 84, "DATA": 85, "pathSegments": 86, "SEP": 87, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 5: "EOF", 14: "COMMENT", 15: "CONTENT", 18: "END_RAW_BLOCK", 19: "OPEN_RAW_BLOCK", 23: "CLOSE_RAW_BLOCK", 29: "OPEN_BLOCK", 33: "CLOSE", 34: "OPEN_INVERSE", 39: "OPEN_INVERSE_CHAIN", 44: "INVERSE", 47: "OPEN_ENDBLOCK", 48: "OPEN", 51: "OPEN_UNESCAPED", 54: "CLOSE_UNESCAPED", 55: "OPEN_PARTIAL", 60: "OPEN_PARTIAL_BLOCK", 65: "OPEN_SEXPR", 68: "CLOSE_SEXPR", 72: "ID", 73: "EQUALS", 75: "OPEN_BLOCK_PARAMS", 77: "CLOSE_BLOCK_PARAMS", 80: "STRING", 81: "NUMBER", 82: "BOOLEAN", 83: "UNDEFINED", 84: "NULL", 85: "DATA", 87: "SEP" },
        productions_: [0, [3, 2], [4, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [13, 1], [10, 3], [16, 5], [9, 4], [9, 4], [24, 6], [27, 6], [38, 6], [43, 2], [45, 3], [45, 1], [26, 3], [8, 5], [8, 5], [11, 5], [12, 3], [59, 5], [63, 1], [63, 1], [64, 5], [69, 1], [71, 3], [74, 3], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [56, 1], [56, 1], [79, 2], [78, 1], [86, 3], [86, 1], [6, 0], [6, 2], [17, 0], [17, 2], [21, 0], [21, 2], [22, 0], [22, 1], [25, 0], [25, 1], [28, 0], [28, 1], [30, 0], [30, 2], [31, 0], [31, 1], [32, 0], [32, 1], [35, 0], [35, 2], [36, 0], [36, 1], [37, 0], [37, 1], [40, 0], [40, 2], [41, 0], [41, 1], [42, 0], [42, 1], [46, 0], [46, 1], [49, 0], [49, 2], [50, 0], [50, 1], [52, 0], [52, 2], [53, 0], [53, 1], [57, 0], [57, 2], [58, 0], [58, 1], [61, 0], [61, 2], [62, 0], [62, 1], [66, 0], [66, 2], [67, 0], [67, 1], [70, 1], [70, 2], [76, 1], [76, 2]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
          var $0 = $$.length - 1;
          switch (yystate) {
            case 1:
              return $$[$0 - 1];
              break;
            case 2:
              this.$ = yy.prepareProgram($$[$0]);
              break;
            case 3:
              this.$ = $$[$0];
              break;
            case 4:
              this.$ = $$[$0];
              break;
            case 5:
              this.$ = $$[$0];
              break;
            case 6:
              this.$ = $$[$0];
              break;
            case 7:
              this.$ = $$[$0];
              break;
            case 8:
              this.$ = $$[$0];
              break;
            case 9:
              this.$ = {
                type: "CommentStatement",
                value: yy.stripComment($$[$0]),
                strip: yy.stripFlags($$[$0], $$[$0]),
                loc: yy.locInfo(this._$)
              };
              break;
            case 10:
              this.$ = {
                type: "ContentStatement",
                original: $$[$0],
                value: $$[$0],
                loc: yy.locInfo(this._$)
              };
              break;
            case 11:
              this.$ = yy.prepareRawBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
              break;
            case 12:
              this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1] };
              break;
            case 13:
              this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], false, this._$);
              break;
            case 14:
              this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], true, this._$);
              break;
            case 15:
              this.$ = { open: $$[$0 - 5], path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
              break;
            case 16:
              this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
              break;
            case 17:
              this.$ = { path: $$[$0 - 4], params: $$[$0 - 3], hash: $$[$0 - 2], blockParams: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 5], $$[$0]) };
              break;
            case 18:
              this.$ = { strip: yy.stripFlags($$[$0 - 1], $$[$0 - 1]), program: $$[$0] };
              break;
            case 19:
              var inverse2 = yy.prepareBlock($$[$0 - 2], $$[$0 - 1], $$[$0], $$[$0], false, this._$), program3 = yy.prepareProgram([inverse2], $$[$0 - 1].loc);
              program3.chained = true;
              this.$ = { strip: $$[$0 - 2].strip, program: program3, chain: true };
              break;
            case 20:
              this.$ = $$[$0];
              break;
            case 21:
              this.$ = { path: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 2], $$[$0]) };
              break;
            case 22:
              this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
              break;
            case 23:
              this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
              break;
            case 24:
              this.$ = {
                type: "PartialStatement",
                name: $$[$0 - 3],
                params: $$[$0 - 2],
                hash: $$[$0 - 1],
                indent: "",
                strip: yy.stripFlags($$[$0 - 4], $$[$0]),
                loc: yy.locInfo(this._$)
              };
              break;
            case 25:
              this.$ = yy.preparePartialBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
              break;
            case 26:
              this.$ = { path: $$[$0 - 3], params: $$[$0 - 2], hash: $$[$0 - 1], strip: yy.stripFlags($$[$0 - 4], $$[$0]) };
              break;
            case 27:
              this.$ = $$[$0];
              break;
            case 28:
              this.$ = $$[$0];
              break;
            case 29:
              this.$ = {
                type: "SubExpression",
                path: $$[$0 - 3],
                params: $$[$0 - 2],
                hash: $$[$0 - 1],
                loc: yy.locInfo(this._$)
              };
              break;
            case 30:
              this.$ = { type: "Hash", pairs: $$[$0], loc: yy.locInfo(this._$) };
              break;
            case 31:
              this.$ = { type: "HashPair", key: yy.id($$[$0 - 2]), value: $$[$0], loc: yy.locInfo(this._$) };
              break;
            case 32:
              this.$ = yy.id($$[$0 - 1]);
              break;
            case 33:
              this.$ = $$[$0];
              break;
            case 34:
              this.$ = $$[$0];
              break;
            case 35:
              this.$ = { type: "StringLiteral", value: $$[$0], original: $$[$0], loc: yy.locInfo(this._$) };
              break;
            case 36:
              this.$ = { type: "NumberLiteral", value: Number($$[$0]), original: Number($$[$0]), loc: yy.locInfo(this._$) };
              break;
            case 37:
              this.$ = { type: "BooleanLiteral", value: $$[$0] === "true", original: $$[$0] === "true", loc: yy.locInfo(this._$) };
              break;
            case 38:
              this.$ = { type: "UndefinedLiteral", original: void 0, value: void 0, loc: yy.locInfo(this._$) };
              break;
            case 39:
              this.$ = { type: "NullLiteral", original: null, value: null, loc: yy.locInfo(this._$) };
              break;
            case 40:
              this.$ = $$[$0];
              break;
            case 41:
              this.$ = $$[$0];
              break;
            case 42:
              this.$ = yy.preparePath(true, $$[$0], this._$);
              break;
            case 43:
              this.$ = yy.preparePath(false, $$[$0], this._$);
              break;
            case 44:
              $$[$0 - 2].push({ part: yy.id($$[$0]), original: $$[$0], separator: $$[$0 - 1] });
              this.$ = $$[$0 - 2];
              break;
            case 45:
              this.$ = [{ part: yy.id($$[$0]), original: $$[$0] }];
              break;
            case 46:
              this.$ = [];
              break;
            case 47:
              $$[$0 - 1].push($$[$0]);
              break;
            case 48:
              this.$ = [];
              break;
            case 49:
              $$[$0 - 1].push($$[$0]);
              break;
            case 50:
              this.$ = [];
              break;
            case 51:
              $$[$0 - 1].push($$[$0]);
              break;
            case 58:
              this.$ = [];
              break;
            case 59:
              $$[$0 - 1].push($$[$0]);
              break;
            case 64:
              this.$ = [];
              break;
            case 65:
              $$[$0 - 1].push($$[$0]);
              break;
            case 70:
              this.$ = [];
              break;
            case 71:
              $$[$0 - 1].push($$[$0]);
              break;
            case 78:
              this.$ = [];
              break;
            case 79:
              $$[$0 - 1].push($$[$0]);
              break;
            case 82:
              this.$ = [];
              break;
            case 83:
              $$[$0 - 1].push($$[$0]);
              break;
            case 86:
              this.$ = [];
              break;
            case 87:
              $$[$0 - 1].push($$[$0]);
              break;
            case 90:
              this.$ = [];
              break;
            case 91:
              $$[$0 - 1].push($$[$0]);
              break;
            case 94:
              this.$ = [];
              break;
            case 95:
              $$[$0 - 1].push($$[$0]);
              break;
            case 98:
              this.$ = [$$[$0]];
              break;
            case 99:
              $$[$0 - 1].push($$[$0]);
              break;
            case 100:
              this.$ = [$$[$0]];
              break;
            case 101:
              $$[$0 - 1].push($$[$0]);
              break;
          }
        },
        table: [{ 3: 1, 4: 2, 5: [2, 46], 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 1: [3] }, { 5: [1, 4] }, { 5: [2, 2], 7: 5, 8: 6, 9: 7, 10: 8, 11: 9, 12: 10, 13: 11, 14: [1, 12], 15: [1, 20], 16: 17, 19: [1, 23], 24: 15, 27: 16, 29: [1, 21], 34: [1, 22], 39: [2, 2], 44: [2, 2], 47: [2, 2], 48: [1, 13], 51: [1, 14], 55: [1, 18], 59: 19, 60: [1, 24] }, { 1: [2, 1] }, { 5: [2, 47], 14: [2, 47], 15: [2, 47], 19: [2, 47], 29: [2, 47], 34: [2, 47], 39: [2, 47], 44: [2, 47], 47: [2, 47], 48: [2, 47], 51: [2, 47], 55: [2, 47], 60: [2, 47] }, { 5: [2, 3], 14: [2, 3], 15: [2, 3], 19: [2, 3], 29: [2, 3], 34: [2, 3], 39: [2, 3], 44: [2, 3], 47: [2, 3], 48: [2, 3], 51: [2, 3], 55: [2, 3], 60: [2, 3] }, { 5: [2, 4], 14: [2, 4], 15: [2, 4], 19: [2, 4], 29: [2, 4], 34: [2, 4], 39: [2, 4], 44: [2, 4], 47: [2, 4], 48: [2, 4], 51: [2, 4], 55: [2, 4], 60: [2, 4] }, { 5: [2, 5], 14: [2, 5], 15: [2, 5], 19: [2, 5], 29: [2, 5], 34: [2, 5], 39: [2, 5], 44: [2, 5], 47: [2, 5], 48: [2, 5], 51: [2, 5], 55: [2, 5], 60: [2, 5] }, { 5: [2, 6], 14: [2, 6], 15: [2, 6], 19: [2, 6], 29: [2, 6], 34: [2, 6], 39: [2, 6], 44: [2, 6], 47: [2, 6], 48: [2, 6], 51: [2, 6], 55: [2, 6], 60: [2, 6] }, { 5: [2, 7], 14: [2, 7], 15: [2, 7], 19: [2, 7], 29: [2, 7], 34: [2, 7], 39: [2, 7], 44: [2, 7], 47: [2, 7], 48: [2, 7], 51: [2, 7], 55: [2, 7], 60: [2, 7] }, { 5: [2, 8], 14: [2, 8], 15: [2, 8], 19: [2, 8], 29: [2, 8], 34: [2, 8], 39: [2, 8], 44: [2, 8], 47: [2, 8], 48: [2, 8], 51: [2, 8], 55: [2, 8], 60: [2, 8] }, { 5: [2, 9], 14: [2, 9], 15: [2, 9], 19: [2, 9], 29: [2, 9], 34: [2, 9], 39: [2, 9], 44: [2, 9], 47: [2, 9], 48: [2, 9], 51: [2, 9], 55: [2, 9], 60: [2, 9] }, { 20: 25, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 36, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 37, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 4: 38, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 15: [2, 48], 17: 39, 18: [2, 48] }, { 20: 41, 56: 40, 64: 42, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 44, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 5: [2, 10], 14: [2, 10], 15: [2, 10], 18: [2, 10], 19: [2, 10], 29: [2, 10], 34: [2, 10], 39: [2, 10], 44: [2, 10], 47: [2, 10], 48: [2, 10], 51: [2, 10], 55: [2, 10], 60: [2, 10] }, { 20: 45, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 46, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 47, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 41, 56: 48, 64: 42, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [2, 78], 49: 49, 65: [2, 78], 72: [2, 78], 80: [2, 78], 81: [2, 78], 82: [2, 78], 83: [2, 78], 84: [2, 78], 85: [2, 78] }, { 23: [2, 33], 33: [2, 33], 54: [2, 33], 65: [2, 33], 68: [2, 33], 72: [2, 33], 75: [2, 33], 80: [2, 33], 81: [2, 33], 82: [2, 33], 83: [2, 33], 84: [2, 33], 85: [2, 33] }, { 23: [2, 34], 33: [2, 34], 54: [2, 34], 65: [2, 34], 68: [2, 34], 72: [2, 34], 75: [2, 34], 80: [2, 34], 81: [2, 34], 82: [2, 34], 83: [2, 34], 84: [2, 34], 85: [2, 34] }, { 23: [2, 35], 33: [2, 35], 54: [2, 35], 65: [2, 35], 68: [2, 35], 72: [2, 35], 75: [2, 35], 80: [2, 35], 81: [2, 35], 82: [2, 35], 83: [2, 35], 84: [2, 35], 85: [2, 35] }, { 23: [2, 36], 33: [2, 36], 54: [2, 36], 65: [2, 36], 68: [2, 36], 72: [2, 36], 75: [2, 36], 80: [2, 36], 81: [2, 36], 82: [2, 36], 83: [2, 36], 84: [2, 36], 85: [2, 36] }, { 23: [2, 37], 33: [2, 37], 54: [2, 37], 65: [2, 37], 68: [2, 37], 72: [2, 37], 75: [2, 37], 80: [2, 37], 81: [2, 37], 82: [2, 37], 83: [2, 37], 84: [2, 37], 85: [2, 37] }, { 23: [2, 38], 33: [2, 38], 54: [2, 38], 65: [2, 38], 68: [2, 38], 72: [2, 38], 75: [2, 38], 80: [2, 38], 81: [2, 38], 82: [2, 38], 83: [2, 38], 84: [2, 38], 85: [2, 38] }, { 23: [2, 39], 33: [2, 39], 54: [2, 39], 65: [2, 39], 68: [2, 39], 72: [2, 39], 75: [2, 39], 80: [2, 39], 81: [2, 39], 82: [2, 39], 83: [2, 39], 84: [2, 39], 85: [2, 39] }, { 23: [2, 43], 33: [2, 43], 54: [2, 43], 65: [2, 43], 68: [2, 43], 72: [2, 43], 75: [2, 43], 80: [2, 43], 81: [2, 43], 82: [2, 43], 83: [2, 43], 84: [2, 43], 85: [2, 43], 87: [1, 50] }, { 72: [1, 35], 86: 51 }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 52: 52, 54: [2, 82], 65: [2, 82], 72: [2, 82], 80: [2, 82], 81: [2, 82], 82: [2, 82], 83: [2, 82], 84: [2, 82], 85: [2, 82] }, { 25: 53, 38: 55, 39: [1, 57], 43: 56, 44: [1, 58], 45: 54, 47: [2, 54] }, { 28: 59, 43: 60, 44: [1, 58], 47: [2, 56] }, { 13: 62, 15: [1, 20], 18: [1, 61] }, { 33: [2, 86], 57: 63, 65: [2, 86], 72: [2, 86], 80: [2, 86], 81: [2, 86], 82: [2, 86], 83: [2, 86], 84: [2, 86], 85: [2, 86] }, { 33: [2, 40], 65: [2, 40], 72: [2, 40], 80: [2, 40], 81: [2, 40], 82: [2, 40], 83: [2, 40], 84: [2, 40], 85: [2, 40] }, { 33: [2, 41], 65: [2, 41], 72: [2, 41], 80: [2, 41], 81: [2, 41], 82: [2, 41], 83: [2, 41], 84: [2, 41], 85: [2, 41] }, { 20: 64, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 65, 47: [1, 66] }, { 30: 67, 33: [2, 58], 65: [2, 58], 72: [2, 58], 75: [2, 58], 80: [2, 58], 81: [2, 58], 82: [2, 58], 83: [2, 58], 84: [2, 58], 85: [2, 58] }, { 33: [2, 64], 35: 68, 65: [2, 64], 72: [2, 64], 75: [2, 64], 80: [2, 64], 81: [2, 64], 82: [2, 64], 83: [2, 64], 84: [2, 64], 85: [2, 64] }, { 21: 69, 23: [2, 50], 65: [2, 50], 72: [2, 50], 80: [2, 50], 81: [2, 50], 82: [2, 50], 83: [2, 50], 84: [2, 50], 85: [2, 50] }, { 33: [2, 90], 61: 70, 65: [2, 90], 72: [2, 90], 80: [2, 90], 81: [2, 90], 82: [2, 90], 83: [2, 90], 84: [2, 90], 85: [2, 90] }, { 20: 74, 33: [2, 80], 50: 71, 63: 72, 64: 75, 65: [1, 43], 69: 73, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 72: [1, 79] }, { 23: [2, 42], 33: [2, 42], 54: [2, 42], 65: [2, 42], 68: [2, 42], 72: [2, 42], 75: [2, 42], 80: [2, 42], 81: [2, 42], 82: [2, 42], 83: [2, 42], 84: [2, 42], 85: [2, 42], 87: [1, 50] }, { 20: 74, 53: 80, 54: [2, 84], 63: 81, 64: 75, 65: [1, 43], 69: 82, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 26: 83, 47: [1, 66] }, { 47: [2, 55] }, { 4: 84, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 39: [2, 46], 44: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 47: [2, 20] }, { 20: 85, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 4: 86, 6: 3, 14: [2, 46], 15: [2, 46], 19: [2, 46], 29: [2, 46], 34: [2, 46], 47: [2, 46], 48: [2, 46], 51: [2, 46], 55: [2, 46], 60: [2, 46] }, { 26: 87, 47: [1, 66] }, { 47: [2, 57] }, { 5: [2, 11], 14: [2, 11], 15: [2, 11], 19: [2, 11], 29: [2, 11], 34: [2, 11], 39: [2, 11], 44: [2, 11], 47: [2, 11], 48: [2, 11], 51: [2, 11], 55: [2, 11], 60: [2, 11] }, { 15: [2, 49], 18: [2, 49] }, { 20: 74, 33: [2, 88], 58: 88, 63: 89, 64: 75, 65: [1, 43], 69: 90, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 65: [2, 94], 66: 91, 68: [2, 94], 72: [2, 94], 80: [2, 94], 81: [2, 94], 82: [2, 94], 83: [2, 94], 84: [2, 94], 85: [2, 94] }, { 5: [2, 25], 14: [2, 25], 15: [2, 25], 19: [2, 25], 29: [2, 25], 34: [2, 25], 39: [2, 25], 44: [2, 25], 47: [2, 25], 48: [2, 25], 51: [2, 25], 55: [2, 25], 60: [2, 25] }, { 20: 92, 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 31: 93, 33: [2, 60], 63: 94, 64: 75, 65: [1, 43], 69: 95, 70: 76, 71: 77, 72: [1, 78], 75: [2, 60], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 33: [2, 66], 36: 96, 63: 97, 64: 75, 65: [1, 43], 69: 98, 70: 76, 71: 77, 72: [1, 78], 75: [2, 66], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 22: 99, 23: [2, 52], 63: 100, 64: 75, 65: [1, 43], 69: 101, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 20: 74, 33: [2, 92], 62: 102, 63: 103, 64: 75, 65: [1, 43], 69: 104, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 105] }, { 33: [2, 79], 65: [2, 79], 72: [2, 79], 80: [2, 79], 81: [2, 79], 82: [2, 79], 83: [2, 79], 84: [2, 79], 85: [2, 79] }, { 33: [2, 81] }, { 23: [2, 27], 33: [2, 27], 54: [2, 27], 65: [2, 27], 68: [2, 27], 72: [2, 27], 75: [2, 27], 80: [2, 27], 81: [2, 27], 82: [2, 27], 83: [2, 27], 84: [2, 27], 85: [2, 27] }, { 23: [2, 28], 33: [2, 28], 54: [2, 28], 65: [2, 28], 68: [2, 28], 72: [2, 28], 75: [2, 28], 80: [2, 28], 81: [2, 28], 82: [2, 28], 83: [2, 28], 84: [2, 28], 85: [2, 28] }, { 23: [2, 30], 33: [2, 30], 54: [2, 30], 68: [2, 30], 71: 106, 72: [1, 107], 75: [2, 30] }, { 23: [2, 98], 33: [2, 98], 54: [2, 98], 68: [2, 98], 72: [2, 98], 75: [2, 98] }, { 23: [2, 45], 33: [2, 45], 54: [2, 45], 65: [2, 45], 68: [2, 45], 72: [2, 45], 73: [1, 108], 75: [2, 45], 80: [2, 45], 81: [2, 45], 82: [2, 45], 83: [2, 45], 84: [2, 45], 85: [2, 45], 87: [2, 45] }, { 23: [2, 44], 33: [2, 44], 54: [2, 44], 65: [2, 44], 68: [2, 44], 72: [2, 44], 75: [2, 44], 80: [2, 44], 81: [2, 44], 82: [2, 44], 83: [2, 44], 84: [2, 44], 85: [2, 44], 87: [2, 44] }, { 54: [1, 109] }, { 54: [2, 83], 65: [2, 83], 72: [2, 83], 80: [2, 83], 81: [2, 83], 82: [2, 83], 83: [2, 83], 84: [2, 83], 85: [2, 83] }, { 54: [2, 85] }, { 5: [2, 13], 14: [2, 13], 15: [2, 13], 19: [2, 13], 29: [2, 13], 34: [2, 13], 39: [2, 13], 44: [2, 13], 47: [2, 13], 48: [2, 13], 51: [2, 13], 55: [2, 13], 60: [2, 13] }, { 38: 55, 39: [1, 57], 43: 56, 44: [1, 58], 45: 111, 46: 110, 47: [2, 76] }, { 33: [2, 70], 40: 112, 65: [2, 70], 72: [2, 70], 75: [2, 70], 80: [2, 70], 81: [2, 70], 82: [2, 70], 83: [2, 70], 84: [2, 70], 85: [2, 70] }, { 47: [2, 18] }, { 5: [2, 14], 14: [2, 14], 15: [2, 14], 19: [2, 14], 29: [2, 14], 34: [2, 14], 39: [2, 14], 44: [2, 14], 47: [2, 14], 48: [2, 14], 51: [2, 14], 55: [2, 14], 60: [2, 14] }, { 33: [1, 113] }, { 33: [2, 87], 65: [2, 87], 72: [2, 87], 80: [2, 87], 81: [2, 87], 82: [2, 87], 83: [2, 87], 84: [2, 87], 85: [2, 87] }, { 33: [2, 89] }, { 20: 74, 63: 115, 64: 75, 65: [1, 43], 67: 114, 68: [2, 96], 69: 116, 70: 76, 71: 77, 72: [1, 78], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 33: [1, 117] }, { 32: 118, 33: [2, 62], 74: 119, 75: [1, 120] }, { 33: [2, 59], 65: [2, 59], 72: [2, 59], 75: [2, 59], 80: [2, 59], 81: [2, 59], 82: [2, 59], 83: [2, 59], 84: [2, 59], 85: [2, 59] }, { 33: [2, 61], 75: [2, 61] }, { 33: [2, 68], 37: 121, 74: 122, 75: [1, 120] }, { 33: [2, 65], 65: [2, 65], 72: [2, 65], 75: [2, 65], 80: [2, 65], 81: [2, 65], 82: [2, 65], 83: [2, 65], 84: [2, 65], 85: [2, 65] }, { 33: [2, 67], 75: [2, 67] }, { 23: [1, 123] }, { 23: [2, 51], 65: [2, 51], 72: [2, 51], 80: [2, 51], 81: [2, 51], 82: [2, 51], 83: [2, 51], 84: [2, 51], 85: [2, 51] }, { 23: [2, 53] }, { 33: [1, 124] }, { 33: [2, 91], 65: [2, 91], 72: [2, 91], 80: [2, 91], 81: [2, 91], 82: [2, 91], 83: [2, 91], 84: [2, 91], 85: [2, 91] }, { 33: [2, 93] }, { 5: [2, 22], 14: [2, 22], 15: [2, 22], 19: [2, 22], 29: [2, 22], 34: [2, 22], 39: [2, 22], 44: [2, 22], 47: [2, 22], 48: [2, 22], 51: [2, 22], 55: [2, 22], 60: [2, 22] }, { 23: [2, 99], 33: [2, 99], 54: [2, 99], 68: [2, 99], 72: [2, 99], 75: [2, 99] }, { 73: [1, 108] }, { 20: 74, 63: 125, 64: 75, 65: [1, 43], 72: [1, 35], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 23], 14: [2, 23], 15: [2, 23], 19: [2, 23], 29: [2, 23], 34: [2, 23], 39: [2, 23], 44: [2, 23], 47: [2, 23], 48: [2, 23], 51: [2, 23], 55: [2, 23], 60: [2, 23] }, { 47: [2, 19] }, { 47: [2, 77] }, { 20: 74, 33: [2, 72], 41: 126, 63: 127, 64: 75, 65: [1, 43], 69: 128, 70: 76, 71: 77, 72: [1, 78], 75: [2, 72], 78: 26, 79: 27, 80: [1, 28], 81: [1, 29], 82: [1, 30], 83: [1, 31], 84: [1, 32], 85: [1, 34], 86: 33 }, { 5: [2, 24], 14: [2, 24], 15: [2, 24], 19: [2, 24], 29: [2, 24], 34: [2, 24], 39: [2, 24], 44: [2, 24], 47: [2, 24], 48: [2, 24], 51: [2, 24], 55: [2, 24], 60: [2, 24] }, { 68: [1, 129] }, { 65: [2, 95], 68: [2, 95], 72: [2, 95], 80: [2, 95], 81: [2, 95], 82: [2, 95], 83: [2, 95], 84: [2, 95], 85: [2, 95] }, { 68: [2, 97] }, { 5: [2, 21], 14: [2, 21], 15: [2, 21], 19: [2, 21], 29: [2, 21], 34: [2, 21], 39: [2, 21], 44: [2, 21], 47: [2, 21], 48: [2, 21], 51: [2, 21], 55: [2, 21], 60: [2, 21] }, { 33: [1, 130] }, { 33: [2, 63] }, { 72: [1, 132], 76: 131 }, { 33: [1, 133] }, { 33: [2, 69] }, { 15: [2, 12], 18: [2, 12] }, { 14: [2, 26], 15: [2, 26], 19: [2, 26], 29: [2, 26], 34: [2, 26], 47: [2, 26], 48: [2, 26], 51: [2, 26], 55: [2, 26], 60: [2, 26] }, { 23: [2, 31], 33: [2, 31], 54: [2, 31], 68: [2, 31], 72: [2, 31], 75: [2, 31] }, { 33: [2, 74], 42: 134, 74: 135, 75: [1, 120] }, { 33: [2, 71], 65: [2, 71], 72: [2, 71], 75: [2, 71], 80: [2, 71], 81: [2, 71], 82: [2, 71], 83: [2, 71], 84: [2, 71], 85: [2, 71] }, { 33: [2, 73], 75: [2, 73] }, { 23: [2, 29], 33: [2, 29], 54: [2, 29], 65: [2, 29], 68: [2, 29], 72: [2, 29], 75: [2, 29], 80: [2, 29], 81: [2, 29], 82: [2, 29], 83: [2, 29], 84: [2, 29], 85: [2, 29] }, { 14: [2, 15], 15: [2, 15], 19: [2, 15], 29: [2, 15], 34: [2, 15], 39: [2, 15], 44: [2, 15], 47: [2, 15], 48: [2, 15], 51: [2, 15], 55: [2, 15], 60: [2, 15] }, { 72: [1, 137], 77: [1, 136] }, { 72: [2, 100], 77: [2, 100] }, { 14: [2, 16], 15: [2, 16], 19: [2, 16], 29: [2, 16], 34: [2, 16], 44: [2, 16], 47: [2, 16], 48: [2, 16], 51: [2, 16], 55: [2, 16], 60: [2, 16] }, { 33: [1, 138] }, { 33: [2, 75] }, { 33: [2, 32] }, { 72: [2, 101], 77: [2, 101] }, { 14: [2, 17], 15: [2, 17], 19: [2, 17], 29: [2, 17], 34: [2, 17], 39: [2, 17], 44: [2, 17], 47: [2, 17], 48: [2, 17], 51: [2, 17], 55: [2, 17], 60: [2, 17] }],
        defaultActions: { 4: [2, 1], 54: [2, 55], 56: [2, 20], 60: [2, 57], 73: [2, 81], 82: [2, 85], 86: [2, 18], 90: [2, 89], 101: [2, 53], 104: [2, 93], 110: [2, 19], 111: [2, 77], 116: [2, 97], 119: [2, 63], 122: [2, 69], 135: [2, 75], 136: [2, 32] },
        parseError: function parseError(str, hash) {
          throw new Error(str);
        },
        parse: function parse(input) {
          var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
          this.lexer.setInput(input);
          this.lexer.yy = this.yy;
          this.yy.lexer = this.lexer;
          this.yy.parser = this;
          if (typeof this.lexer.yylloc == "undefined") this.lexer.yylloc = {};
          var yyloc = this.lexer.yylloc;
          lstack.push(yyloc);
          var ranges = this.lexer.options && this.lexer.options.ranges;
          if (typeof this.yy.parseError === "function") this.parseError = this.yy.parseError;
          function popStack(n) {
            stack.length = stack.length - 2 * n;
            vstack.length = vstack.length - n;
            lstack.length = lstack.length - n;
          }
          function lex() {
            var token;
            token = self.lexer.lex() || 1;
            if (typeof token !== "number") {
              token = self.symbols_[token] || token;
            }
            return token;
          }
          var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p2, len, newState, expected;
          while (true) {
            state = stack[stack.length - 1];
            if (this.defaultActions[state]) {
              action = this.defaultActions[state];
            } else {
              if (symbol === null || typeof symbol == "undefined") {
                symbol = lex();
              }
              action = table[state] && table[state][symbol];
            }
            if (typeof action === "undefined" || !action.length || !action[0]) {
              var errStr = "";
              if (!recovering) {
                expected = [];
                for (p2 in table[state]) if (this.terminals_[p2] && p2 > 2) {
                  expected.push("'" + this.terminals_[p2] + "'");
                }
                if (this.lexer.showPosition) {
                  errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                } else {
                  errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
                }
                this.parseError(errStr, { text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected });
              }
            }
            if (action[0] instanceof Array && action.length > 1) {
              throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
            }
            switch (action[0]) {
              case 1:
                stack.push(symbol);
                vstack.push(this.lexer.yytext);
                lstack.push(this.lexer.yylloc);
                stack.push(action[1]);
                symbol = null;
                if (!preErrorSymbol) {
                  yyleng = this.lexer.yyleng;
                  yytext = this.lexer.yytext;
                  yylineno = this.lexer.yylineno;
                  yyloc = this.lexer.yylloc;
                  if (recovering > 0) recovering--;
                } else {
                  symbol = preErrorSymbol;
                  preErrorSymbol = null;
                }
                break;
              case 2:
                len = this.productions_[action[1]][1];
                yyval.$ = vstack[vstack.length - len];
                yyval._$ = { first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column };
                if (ranges) {
                  yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                }
                r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
                if (typeof r !== "undefined") {
                  return r;
                }
                if (len) {
                  stack = stack.slice(0, -1 * len * 2);
                  vstack = vstack.slice(0, -1 * len);
                  lstack = lstack.slice(0, -1 * len);
                }
                stack.push(this.productions_[action[1]][0]);
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                stack.push(newState);
                break;
              case 3:
                return true;
            }
          }
          return true;
        }
      };
      var lexer = (function() {
        var lexer2 = {
          EOF: 1,
          parseError: function parseError(str, hash) {
            if (this.yy.parser) {
              this.yy.parser.parseError(str, hash);
            } else {
              throw new Error(str);
            }
          },
          setInput: function setInput(input) {
            this._input = input;
            this._more = this._less = this.done = false;
            this.yylineno = this.yyleng = 0;
            this.yytext = this.matched = this.match = "";
            this.conditionStack = ["INITIAL"];
            this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 };
            if (this.options.ranges) this.yylloc.range = [0, 0];
            this.offset = 0;
            return this;
          },
          input: function input() {
            var ch = this._input[0];
            this.yytext += ch;
            this.yyleng++;
            this.offset++;
            this.match += ch;
            this.matched += ch;
            var lines = ch.match(/(?:\r\n?|\n).*/g);
            if (lines) {
              this.yylineno++;
              this.yylloc.last_line++;
            } else {
              this.yylloc.last_column++;
            }
            if (this.options.ranges) this.yylloc.range[1]++;
            this._input = this._input.slice(1);
            return ch;
          },
          unput: function unput(ch) {
            var len = ch.length;
            var lines = ch.split(/(?:\r\n?|\n)/g);
            this._input = ch + this._input;
            this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
            this.offset -= len;
            var oldLines = this.match.split(/(?:\r\n?|\n)/g);
            this.match = this.match.substr(0, this.match.length - 1);
            this.matched = this.matched.substr(0, this.matched.length - 1);
            if (lines.length - 1) this.yylineno -= lines.length - 1;
            var r = this.yylloc.range;
            this.yylloc = {
              first_line: this.yylloc.first_line,
              last_line: this.yylineno + 1,
              first_column: this.yylloc.first_column,
              last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
            };
            if (this.options.ranges) {
              this.yylloc.range = [r[0], r[0] + this.yyleng - len];
            }
            return this;
          },
          more: function more() {
            this._more = true;
            return this;
          },
          less: function less(n) {
            this.unput(this.match.slice(n));
          },
          pastInput: function pastInput() {
            var past = this.matched.substr(0, this.matched.length - this.match.length);
            return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "");
          },
          upcomingInput: function upcomingInput() {
            var next = this.match;
            if (next.length < 20) {
              next += this._input.substr(0, 20 - next.length);
            }
            return (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "");
          },
          showPosition: function showPosition() {
            var pre = this.pastInput();
            var c = new Array(pre.length + 1).join("-");
            return pre + this.upcomingInput() + "\n" + c + "^";
          },
          next: function next() {
            if (this.done) {
              return this.EOF;
            }
            if (!this._input) this.done = true;
            var token, match, tempMatch, index, col, lines;
            if (!this._more) {
              this.yytext = "";
              this.match = "";
            }
            var rules = this._currentRules();
            for (var i = 0; i < rules.length; i++) {
              tempMatch = this._input.match(this.rules[rules[i]]);
              if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (!this.options.flex) break;
              }
            }
            if (match) {
              lines = match[0].match(/(?:\r\n?|\n).*/g);
              if (lines) this.yylineno += lines.length;
              this.yylloc = {
                first_line: this.yylloc.last_line,
                last_line: this.yylineno + 1,
                first_column: this.yylloc.last_column,
                last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
              };
              this.yytext += match[0];
              this.match += match[0];
              this.matches = match;
              this.yyleng = this.yytext.length;
              if (this.options.ranges) {
                this.yylloc.range = [this.offset, this.offset += this.yyleng];
              }
              this._more = false;
              this._input = this._input.slice(match[0].length);
              this.matched += match[0];
              token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
              if (this.done && this._input) this.done = false;
              if (token) return token;
              else return;
            }
            if (this._input === "") {
              return this.EOF;
            } else {
              return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), { text: "", token: null, line: this.yylineno });
            }
          },
          lex: function lex() {
            var r = this.next();
            if (typeof r !== "undefined") {
              return r;
            } else {
              return this.lex();
            }
          },
          begin: function begin(condition) {
            this.conditionStack.push(condition);
          },
          popState: function popState() {
            return this.conditionStack.pop();
          },
          _currentRules: function _currentRules() {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
          },
          topState: function topState() {
            return this.conditionStack[this.conditionStack.length - 2];
          },
          pushState: function begin(condition) {
            this.begin(condition);
          }
        };
        lexer2.options = {};
        lexer2.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
          function strip(start, end) {
            return yy_.yytext = yy_.yytext.substring(start, yy_.yyleng - end + start);
          }
          var YYSTATE = YY_START;
          switch ($avoiding_name_collisions) {
            case 0:
              if (yy_.yytext.slice(-2) === "\\\\") {
                strip(0, 1);
                this.begin("mu");
              } else if (yy_.yytext.slice(-1) === "\\") {
                strip(0, 1);
                this.begin("emu");
              } else {
                this.begin("mu");
              }
              if (yy_.yytext) return 15;
              break;
            case 1:
              return 15;
              break;
            case 2:
              this.popState();
              return 15;
              break;
            case 3:
              this.begin("raw");
              return 15;
              break;
            case 4:
              this.popState();
              if (this.conditionStack[this.conditionStack.length - 1] === "raw") {
                return 15;
              } else {
                strip(5, 9);
                return "END_RAW_BLOCK";
              }
              break;
            case 5:
              return 15;
              break;
            case 6:
              this.popState();
              return 14;
              break;
            case 7:
              return 65;
              break;
            case 8:
              return 68;
              break;
            case 9:
              return 19;
              break;
            case 10:
              this.popState();
              this.begin("raw");
              return 23;
              break;
            case 11:
              return 55;
              break;
            case 12:
              return 60;
              break;
            case 13:
              return 29;
              break;
            case 14:
              return 47;
              break;
            case 15:
              this.popState();
              return 44;
              break;
            case 16:
              this.popState();
              return 44;
              break;
            case 17:
              return 34;
              break;
            case 18:
              return 39;
              break;
            case 19:
              return 51;
              break;
            case 20:
              return 48;
              break;
            case 21:
              this.unput(yy_.yytext);
              this.popState();
              this.begin("com");
              break;
            case 22:
              this.popState();
              return 14;
              break;
            case 23:
              return 48;
              break;
            case 24:
              return 73;
              break;
            case 25:
              return 72;
              break;
            case 26:
              return 72;
              break;
            case 27:
              return 87;
              break;
            case 28:
              break;
            case 29:
              this.popState();
              return 54;
              break;
            case 30:
              this.popState();
              return 33;
              break;
            case 31:
              yy_.yytext = strip(1, 2).replace(/\\"/g, '"');
              return 80;
              break;
            case 32:
              yy_.yytext = strip(1, 2).replace(/\\'/g, "'");
              return 80;
              break;
            case 33:
              return 85;
              break;
            case 34:
              return 82;
              break;
            case 35:
              return 82;
              break;
            case 36:
              return 83;
              break;
            case 37:
              return 84;
              break;
            case 38:
              return 81;
              break;
            case 39:
              return 75;
              break;
            case 40:
              return 77;
              break;
            case 41:
              return 72;
              break;
            case 42:
              yy_.yytext = yy_.yytext.replace(/\\([\\\]])/g, "$1");
              return 72;
              break;
            case 43:
              return "INVALID";
              break;
            case 44:
              return 5;
              break;
          }
        };
        lexer2.rules = [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^\/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]+?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/];
        lexer2.conditions = { "mu": { "rules": [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44], "inclusive": false }, "emu": { "rules": [2], "inclusive": false }, "com": { "rules": [6], "inclusive": false }, "raw": { "rules": [3, 4, 5], "inclusive": false }, "INITIAL": { "rules": [0, 1, 44], "inclusive": true } };
        return lexer2;
      })();
      parser.lexer = lexer;
      function Parser() {
        this.yy = {};
      }
      Parser.prototype = parser;
      parser.Parser = Parser;
      return new Parser();
    })();
    exports["default"] = handlebars;
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/compiler/visitor.js
var require_visitor = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/compiler/visitor.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    function Visitor() {
      this.parents = [];
    }
    Visitor.prototype = {
      constructor: Visitor,
      mutating: false,
      // Visits a given value. If mutating, will replace the value if necessary.
      acceptKey: function acceptKey(node, name) {
        var value = this.accept(node[name]);
        if (this.mutating) {
          if (value && !Visitor.prototype[value.type]) {
            throw new _exception2["default"]('Unexpected node type "' + value.type + '" found when accepting ' + name + " on " + node.type);
          }
          node[name] = value;
        }
      },
      // Performs an accept operation with added sanity check to ensure
      // required keys are not removed.
      acceptRequired: function acceptRequired(node, name) {
        this.acceptKey(node, name);
        if (!node[name]) {
          throw new _exception2["default"](node.type + " requires " + name);
        }
      },
      // Traverses a given array. If mutating, empty respnses will be removed
      // for child elements.
      acceptArray: function acceptArray(array) {
        for (var i = 0, l = array.length; i < l; i++) {
          this.acceptKey(array, i);
          if (!array[i]) {
            array.splice(i, 1);
            i--;
            l--;
          }
        }
      },
      accept: function accept(object) {
        if (!object) {
          return;
        }
        if (!this[object.type]) {
          throw new _exception2["default"]("Unknown type: " + object.type, object);
        }
        if (this.current) {
          this.parents.unshift(this.current);
        }
        this.current = object;
        var ret = this[object.type](object);
        this.current = this.parents.shift();
        if (!this.mutating || ret) {
          return ret;
        } else if (ret !== false) {
          return object;
        }
      },
      Program: function Program(program3) {
        this.acceptArray(program3.body);
      },
      MustacheStatement: visitSubExpression,
      Decorator: visitSubExpression,
      BlockStatement: visitBlock,
      DecoratorBlock: visitBlock,
      PartialStatement: visitPartial,
      PartialBlockStatement: function PartialBlockStatement(partial) {
        visitPartial.call(this, partial);
        this.acceptKey(partial, "program");
      },
      ContentStatement: function ContentStatement() {
      },
      CommentStatement: function CommentStatement() {
      },
      SubExpression: visitSubExpression,
      PathExpression: function PathExpression() {
      },
      StringLiteral: function StringLiteral() {
      },
      NumberLiteral: function NumberLiteral() {
      },
      BooleanLiteral: function BooleanLiteral() {
      },
      UndefinedLiteral: function UndefinedLiteral() {
      },
      NullLiteral: function NullLiteral() {
      },
      Hash: function Hash(hash) {
        this.acceptArray(hash.pairs);
      },
      HashPair: function HashPair(pair) {
        this.acceptRequired(pair, "value");
      }
    };
    function visitSubExpression(mustache) {
      this.acceptRequired(mustache, "path");
      this.acceptArray(mustache.params);
      this.acceptKey(mustache, "hash");
    }
    function visitBlock(block) {
      visitSubExpression.call(this, block);
      this.acceptKey(block, "program");
      this.acceptKey(block, "inverse");
    }
    function visitPartial(partial) {
      this.acceptRequired(partial, "name");
      this.acceptArray(partial.params);
      this.acceptKey(partial, "hash");
    }
    exports["default"] = Visitor;
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/compiler/whitespace-control.js
var require_whitespace_control = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/compiler/whitespace-control.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _visitor = require_visitor();
    var _visitor2 = _interopRequireDefault(_visitor);
    function WhitespaceControl() {
      var options = arguments.length <= 0 || arguments[0] === void 0 ? {} : arguments[0];
      this.options = options;
    }
    WhitespaceControl.prototype = new _visitor2["default"]();
    WhitespaceControl.prototype.Program = function(program3) {
      var doStandalone = !this.options.ignoreStandalone;
      var isRoot = !this.isRootSeen;
      this.isRootSeen = true;
      var body = program3.body;
      for (var i = 0, l = body.length; i < l; i++) {
        var current = body[i], strip = this.accept(current);
        if (!strip) {
          continue;
        }
        var _isPrevWhitespace = isPrevWhitespace(body, i, isRoot), _isNextWhitespace = isNextWhitespace(body, i, isRoot), openStandalone = strip.openStandalone && _isPrevWhitespace, closeStandalone = strip.closeStandalone && _isNextWhitespace, inlineStandalone = strip.inlineStandalone && _isPrevWhitespace && _isNextWhitespace;
        if (strip.close) {
          omitRight(body, i, true);
        }
        if (strip.open) {
          omitLeft(body, i, true);
        }
        if (doStandalone && inlineStandalone) {
          omitRight(body, i);
          if (omitLeft(body, i)) {
            if (current.type === "PartialStatement") {
              current.indent = /([ \t]+$)/.exec(body[i - 1].original)[1];
            }
          }
        }
        if (doStandalone && openStandalone) {
          omitRight((current.program || current.inverse).body);
          omitLeft(body, i);
        }
        if (doStandalone && closeStandalone) {
          omitRight(body, i);
          omitLeft((current.inverse || current.program).body);
        }
      }
      return program3;
    };
    WhitespaceControl.prototype.BlockStatement = WhitespaceControl.prototype.DecoratorBlock = WhitespaceControl.prototype.PartialBlockStatement = function(block) {
      this.accept(block.program);
      this.accept(block.inverse);
      var program3 = block.program || block.inverse, inverse2 = block.program && block.inverse, firstInverse = inverse2, lastInverse = inverse2;
      if (inverse2 && inverse2.chained) {
        firstInverse = inverse2.body[0].program;
        while (lastInverse.chained) {
          lastInverse = lastInverse.body[lastInverse.body.length - 1].program;
        }
      }
      var strip = {
        open: block.openStrip.open,
        close: block.closeStrip.close,
        // Determine the standalone candiacy. Basically flag our content as being possibly standalone
        // so our parent can determine if we actually are standalone
        openStandalone: isNextWhitespace(program3.body),
        closeStandalone: isPrevWhitespace((firstInverse || program3).body)
      };
      if (block.openStrip.close) {
        omitRight(program3.body, null, true);
      }
      if (inverse2) {
        var inverseStrip = block.inverseStrip;
        if (inverseStrip.open) {
          omitLeft(program3.body, null, true);
        }
        if (inverseStrip.close) {
          omitRight(firstInverse.body, null, true);
        }
        if (block.closeStrip.open) {
          omitLeft(lastInverse.body, null, true);
        }
        if (!this.options.ignoreStandalone && isPrevWhitespace(program3.body) && isNextWhitespace(firstInverse.body)) {
          omitLeft(program3.body);
          omitRight(firstInverse.body);
        }
      } else if (block.closeStrip.open) {
        omitLeft(program3.body, null, true);
      }
      return strip;
    };
    WhitespaceControl.prototype.Decorator = WhitespaceControl.prototype.MustacheStatement = function(mustache) {
      return mustache.strip;
    };
    WhitespaceControl.prototype.PartialStatement = WhitespaceControl.prototype.CommentStatement = function(node) {
      var strip = node.strip || {};
      return {
        inlineStandalone: true,
        open: strip.open,
        close: strip.close
      };
    };
    function isPrevWhitespace(body, i, isRoot) {
      if (i === void 0) {
        i = body.length;
      }
      var prev = body[i - 1], sibling = body[i - 2];
      if (!prev) {
        return isRoot;
      }
      if (prev.type === "ContentStatement") {
        return (sibling || !isRoot ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(prev.original);
      }
    }
    function isNextWhitespace(body, i, isRoot) {
      if (i === void 0) {
        i = -1;
      }
      var next = body[i + 1], sibling = body[i + 2];
      if (!next) {
        return isRoot;
      }
      if (next.type === "ContentStatement") {
        return (sibling || !isRoot ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(next.original);
      }
    }
    function omitRight(body, i, multiple) {
      var current = body[i == null ? 0 : i + 1];
      if (!current || current.type !== "ContentStatement" || !multiple && current.rightStripped) {
        return;
      }
      var original = current.value;
      current.value = current.value.replace(multiple ? /^\s+/ : /^[ \t]*\r?\n?/, "");
      current.rightStripped = current.value !== original;
    }
    function omitLeft(body, i, multiple) {
      var current = body[i == null ? body.length - 1 : i - 1];
      if (!current || current.type !== "ContentStatement" || !multiple && current.leftStripped) {
        return;
      }
      var original = current.value;
      current.value = current.value.replace(multiple ? /\s+$/ : /[ \t]+$/, "");
      current.leftStripped = current.value !== original;
      return current.leftStripped;
    }
    exports["default"] = WhitespaceControl;
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/compiler/helpers.js
var require_helpers2 = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/compiler/helpers.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.SourceLocation = SourceLocation;
    exports.id = id;
    exports.stripFlags = stripFlags;
    exports.stripComment = stripComment;
    exports.preparePath = preparePath;
    exports.prepareMustache = prepareMustache;
    exports.prepareRawBlock = prepareRawBlock;
    exports.prepareBlock = prepareBlock;
    exports.prepareProgram = prepareProgram;
    exports.preparePartialBlock = preparePartialBlock;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    function validateClose(open, close) {
      close = close.path ? close.path.original : close;
      if (open.path.original !== close) {
        var errorNode = { loc: open.path.loc };
        throw new _exception2["default"](open.path.original + " doesn't match " + close, errorNode);
      }
    }
    function SourceLocation(source, locInfo) {
      this.source = source;
      this.start = {
        line: locInfo.first_line,
        column: locInfo.first_column
      };
      this.end = {
        line: locInfo.last_line,
        column: locInfo.last_column
      };
    }
    function id(token) {
      if (/^\[.*\]$/.test(token)) {
        return token.substring(1, token.length - 1);
      } else {
        return token;
      }
    }
    function stripFlags(open, close) {
      return {
        open: open.charAt(2) === "~",
        close: close.charAt(close.length - 3) === "~"
      };
    }
    function stripComment(comment) {
      return comment.replace(/^\{\{~?!-?-?/, "").replace(/-?-?~?\}\}$/, "");
    }
    function preparePath(data, parts, loc) {
      loc = this.locInfo(loc);
      var original = data ? "@" : "", dig = [], depth = 0;
      for (var i = 0, l = parts.length; i < l; i++) {
        var part = parts[i].part, isLiteral = parts[i].original !== part;
        original += (parts[i].separator || "") + part;
        if (!isLiteral && (part === ".." || part === "." || part === "this")) {
          if (dig.length > 0) {
            throw new _exception2["default"]("Invalid path: " + original, { loc });
          } else if (part === "..") {
            depth++;
          }
        } else {
          dig.push(part);
        }
      }
      return {
        type: "PathExpression",
        data,
        depth,
        parts: dig,
        original,
        loc
      };
    }
    function prepareMustache(path11, params, hash, open, strip, locInfo) {
      var escapeFlag = open.charAt(3) || open.charAt(2), escaped = escapeFlag !== "{" && escapeFlag !== "&";
      var decorator = /\*/.test(open);
      return {
        type: decorator ? "Decorator" : "MustacheStatement",
        path: path11,
        params,
        hash,
        escaped,
        strip,
        loc: this.locInfo(locInfo)
      };
    }
    function prepareRawBlock(openRawBlock, contents, close, locInfo) {
      validateClose(openRawBlock, close);
      locInfo = this.locInfo(locInfo);
      var program3 = {
        type: "Program",
        body: contents,
        strip: {},
        loc: locInfo
      };
      return {
        type: "BlockStatement",
        path: openRawBlock.path,
        params: openRawBlock.params,
        hash: openRawBlock.hash,
        program: program3,
        openStrip: {},
        inverseStrip: {},
        closeStrip: {},
        loc: locInfo
      };
    }
    function prepareBlock(openBlock, program3, inverseAndProgram, close, inverted, locInfo) {
      if (close && close.path) {
        validateClose(openBlock, close);
      }
      var decorator = /\*/.test(openBlock.open);
      program3.blockParams = openBlock.blockParams;
      var inverse2 = void 0, inverseStrip = void 0;
      if (inverseAndProgram) {
        if (decorator) {
          throw new _exception2["default"]("Unexpected inverse block on decorator", inverseAndProgram);
        }
        if (inverseAndProgram.chain) {
          inverseAndProgram.program.body[0].closeStrip = close.strip;
        }
        inverseStrip = inverseAndProgram.strip;
        inverse2 = inverseAndProgram.program;
      }
      if (inverted) {
        inverted = inverse2;
        inverse2 = program3;
        program3 = inverted;
      }
      return {
        type: decorator ? "DecoratorBlock" : "BlockStatement",
        path: openBlock.path,
        params: openBlock.params,
        hash: openBlock.hash,
        program: program3,
        inverse: inverse2,
        openStrip: openBlock.strip,
        inverseStrip,
        closeStrip: close && close.strip,
        loc: this.locInfo(locInfo)
      };
    }
    function prepareProgram(statements, loc) {
      if (!loc && statements.length) {
        var firstLoc = statements[0].loc, lastLoc = statements[statements.length - 1].loc;
        if (firstLoc && lastLoc) {
          loc = {
            source: firstLoc.source,
            start: {
              line: firstLoc.start.line,
              column: firstLoc.start.column
            },
            end: {
              line: lastLoc.end.line,
              column: lastLoc.end.column
            }
          };
        }
      }
      return {
        type: "Program",
        body: statements,
        strip: {},
        loc
      };
    }
    function preparePartialBlock(open, program3, close, locInfo) {
      validateClose(open, close);
      return {
        type: "PartialBlockStatement",
        name: open.path,
        params: open.params,
        hash: open.hash,
        program: program3,
        openStrip: open.strip,
        closeStrip: close && close.strip,
        loc: this.locInfo(locInfo)
      };
    }
  }
});

// node_modules/handlebars/dist/cjs/handlebars/compiler/base.js
var require_base2 = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/compiler/base.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.parseWithoutProcessing = parseWithoutProcessing;
    exports.parse = parse;
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};
        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
          }
        }
        newObj["default"] = obj;
        return newObj;
      }
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _parser = require_parser();
    var _parser2 = _interopRequireDefault(_parser);
    var _whitespaceControl = require_whitespace_control();
    var _whitespaceControl2 = _interopRequireDefault(_whitespaceControl);
    var _helpers = require_helpers2();
    var Helpers = _interopRequireWildcard(_helpers);
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    var _utils = require_utils3();
    exports.parser = _parser2["default"];
    var yy = {};
    _utils.extend(yy, Helpers);
    function parseWithoutProcessing(input, options) {
      if (input.type === "Program") {
        validateInputAst(input);
        return input;
      }
      _parser2["default"].yy = yy;
      yy.locInfo = function(locInfo) {
        return new yy.SourceLocation(options && options.srcName, locInfo);
      };
      var ast = _parser2["default"].parse(input);
      return ast;
    }
    function parse(input, options) {
      var ast = parseWithoutProcessing(input, options);
      var strip = new _whitespaceControl2["default"](options);
      return strip.accept(ast);
    }
    function validateInputAst(ast) {
      validateAstNode(ast);
    }
    function validateAstNode(node) {
      if (node == null) {
        return;
      }
      if (Array.isArray(node)) {
        node.forEach(validateAstNode);
        return;
      }
      if (typeof node !== "object") {
        return;
      }
      if (node.type === "PathExpression") {
        if (!isValidDepth(node.depth)) {
          throw new _exception2["default"]("Invalid AST: PathExpression.depth must be an integer");
        }
        if (!Array.isArray(node.parts)) {
          throw new _exception2["default"]("Invalid AST: PathExpression.parts must be an array");
        }
        for (var i = 0; i < node.parts.length; i++) {
          if (typeof node.parts[i] !== "string") {
            throw new _exception2["default"]("Invalid AST: PathExpression.parts must only contain strings");
          }
        }
      } else if (node.type === "NumberLiteral") {
        if (typeof node.value !== "number" || !isFinite(node.value)) {
          throw new _exception2["default"]("Invalid AST: NumberLiteral.value must be a number");
        }
      } else if (node.type === "BooleanLiteral") {
        if (typeof node.value !== "boolean") {
          throw new _exception2["default"]("Invalid AST: BooleanLiteral.value must be a boolean");
        }
      }
      Object.keys(node).forEach(function(propertyName) {
        if (propertyName === "loc") {
          return;
        }
        validateAstNode(node[propertyName]);
      });
    }
    function isValidDepth(depth) {
      return typeof depth === "number" && isFinite(depth) && Math.floor(depth) === depth && depth >= 0;
    }
  }
});

// node_modules/handlebars/dist/cjs/handlebars/compiler/compiler.js
var require_compiler = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/compiler/compiler.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.Compiler = Compiler;
    exports.precompile = precompile;
    exports.compile = compile;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    var _utils = require_utils3();
    var _ast = require_ast();
    var _ast2 = _interopRequireDefault(_ast);
    var slice = [].slice;
    function Compiler() {
    }
    Compiler.prototype = {
      compiler: Compiler,
      equals: function equals(other) {
        var len = this.opcodes.length;
        if (other.opcodes.length !== len) {
          return false;
        }
        for (var i = 0; i < len; i++) {
          var opcode = this.opcodes[i], otherOpcode = other.opcodes[i];
          if (opcode.opcode !== otherOpcode.opcode || !argEquals(opcode.args, otherOpcode.args)) {
            return false;
          }
        }
        len = this.children.length;
        for (var i = 0; i < len; i++) {
          if (!this.children[i].equals(other.children[i])) {
            return false;
          }
        }
        return true;
      },
      guid: 0,
      compile: function compile2(program3, options) {
        this.sourceNode = [];
        this.opcodes = [];
        this.children = [];
        this.options = options;
        this.stringParams = options.stringParams;
        this.trackIds = options.trackIds;
        options.blockParams = options.blockParams || [];
        options.knownHelpers = _utils.extend(/* @__PURE__ */ Object.create(null), {
          helperMissing: true,
          blockHelperMissing: true,
          each: true,
          "if": true,
          unless: true,
          "with": true,
          log: true,
          lookup: true
        }, options.knownHelpers);
        return this.accept(program3);
      },
      compileProgram: function compileProgram(program3) {
        var childCompiler = new this.compiler(), result = childCompiler.compile(program3, this.options), guid = this.guid++;
        this.usePartial = this.usePartial || result.usePartial;
        this.children[guid] = result;
        this.useDepths = this.useDepths || result.useDepths;
        return guid;
      },
      accept: function accept(node) {
        if (!this[node.type]) {
          throw new _exception2["default"]("Unknown type: " + node.type, node);
        }
        this.sourceNode.unshift(node);
        var ret = this[node.type](node);
        this.sourceNode.shift();
        return ret;
      },
      Program: function Program(program3) {
        this.options.blockParams.unshift(program3.blockParams);
        var body = program3.body, bodyLength = body.length;
        for (var i = 0; i < bodyLength; i++) {
          this.accept(body[i]);
        }
        this.options.blockParams.shift();
        this.isSimple = bodyLength === 1;
        this.blockParams = program3.blockParams ? program3.blockParams.length : 0;
        return this;
      },
      BlockStatement: function BlockStatement(block) {
        transformLiteralToPath(block);
        var program3 = block.program, inverse2 = block.inverse;
        program3 = program3 && this.compileProgram(program3);
        inverse2 = inverse2 && this.compileProgram(inverse2);
        var type = this.classifySexpr(block);
        if (type === "helper") {
          this.helperSexpr(block, program3, inverse2);
        } else if (type === "simple") {
          this.simpleSexpr(block);
          this.opcode("pushProgram", program3);
          this.opcode("pushProgram", inverse2);
          this.opcode("emptyHash");
          this.opcode("blockValue", block.path.original);
        } else {
          this.ambiguousSexpr(block, program3, inverse2);
          this.opcode("pushProgram", program3);
          this.opcode("pushProgram", inverse2);
          this.opcode("emptyHash");
          this.opcode("ambiguousBlockValue");
        }
        this.opcode("append");
      },
      DecoratorBlock: function DecoratorBlock(decorator) {
        var program3 = decorator.program && this.compileProgram(decorator.program);
        var params = this.setupFullMustacheParams(decorator, program3, void 0), path11 = decorator.path;
        this.useDecorators = true;
        this.opcode("registerDecorator", params.length, path11.original);
      },
      PartialStatement: function PartialStatement(partial) {
        this.usePartial = true;
        var program3 = partial.program;
        if (program3) {
          program3 = this.compileProgram(partial.program);
        }
        var params = partial.params;
        if (params.length > 1) {
          throw new _exception2["default"]("Unsupported number of partial arguments: " + params.length, partial);
        } else if (!params.length) {
          if (this.options.explicitPartialContext) {
            this.opcode("pushLiteral", "undefined");
          } else {
            params.push({ type: "PathExpression", parts: [], depth: 0 });
          }
        }
        var partialName = partial.name.original, isDynamic = partial.name.type === "SubExpression";
        if (isDynamic) {
          this.accept(partial.name);
        }
        this.setupFullMustacheParams(partial, program3, void 0, true);
        var indent = partial.indent || "";
        if (this.options.preventIndent && indent) {
          this.opcode("appendContent", indent);
          indent = "";
        }
        this.opcode("invokePartial", isDynamic, partialName, indent);
        this.opcode("append");
      },
      PartialBlockStatement: function PartialBlockStatement(partialBlock) {
        this.PartialStatement(partialBlock);
      },
      MustacheStatement: function MustacheStatement(mustache) {
        this.SubExpression(mustache);
        if (mustache.escaped && !this.options.noEscape) {
          this.opcode("appendEscaped");
        } else {
          this.opcode("append");
        }
      },
      Decorator: function Decorator(decorator) {
        this.DecoratorBlock(decorator);
      },
      ContentStatement: function ContentStatement(content) {
        if (content.value) {
          this.opcode("appendContent", content.value);
        }
      },
      CommentStatement: function CommentStatement() {
      },
      SubExpression: function SubExpression(sexpr) {
        transformLiteralToPath(sexpr);
        var type = this.classifySexpr(sexpr);
        if (type === "simple") {
          this.simpleSexpr(sexpr);
        } else if (type === "helper") {
          this.helperSexpr(sexpr);
        } else {
          this.ambiguousSexpr(sexpr);
        }
      },
      ambiguousSexpr: function ambiguousSexpr(sexpr, program3, inverse2) {
        var path11 = sexpr.path, name = path11.parts[0], isBlock = program3 != null || inverse2 != null;
        this.opcode("getContext", path11.depth);
        this.opcode("pushProgram", program3);
        this.opcode("pushProgram", inverse2);
        path11.strict = true;
        this.accept(path11);
        this.opcode("invokeAmbiguous", name, isBlock);
      },
      simpleSexpr: function simpleSexpr(sexpr) {
        var path11 = sexpr.path;
        path11.strict = true;
        this.accept(path11);
        this.opcode("resolvePossibleLambda");
      },
      helperSexpr: function helperSexpr(sexpr, program3, inverse2) {
        var params = this.setupFullMustacheParams(sexpr, program3, inverse2), path11 = sexpr.path, name = path11.parts[0];
        if (this.options.knownHelpers[name]) {
          this.opcode("invokeKnownHelper", params.length, name);
        } else if (this.options.knownHelpersOnly) {
          throw new _exception2["default"]("You specified knownHelpersOnly, but used the unknown helper " + name, sexpr);
        } else {
          path11.strict = true;
          path11.falsy = true;
          this.accept(path11);
          this.opcode("invokeHelper", params.length, path11.original, _ast2["default"].helpers.simpleId(path11));
        }
      },
      PathExpression: function PathExpression(path11) {
        this.addDepth(path11.depth);
        this.opcode("getContext", path11.depth);
        var name = path11.parts[0], scoped = _ast2["default"].helpers.scopedId(path11), blockParamId = !path11.depth && !scoped && this.blockParamIndex(name);
        if (blockParamId) {
          this.opcode("lookupBlockParam", blockParamId, path11.parts);
        } else if (!name) {
          this.opcode("pushContext");
        } else if (path11.data) {
          this.options.data = true;
          this.opcode("lookupData", path11.depth, path11.parts, path11.strict);
        } else {
          this.opcode("lookupOnContext", path11.parts, path11.falsy, path11.strict, scoped);
        }
      },
      StringLiteral: function StringLiteral(string) {
        this.opcode("pushString", string.value);
      },
      NumberLiteral: function NumberLiteral(number) {
        this.opcode("pushLiteral", number.value);
      },
      BooleanLiteral: function BooleanLiteral(bool) {
        this.opcode("pushLiteral", bool.value);
      },
      UndefinedLiteral: function UndefinedLiteral() {
        this.opcode("pushLiteral", "undefined");
      },
      NullLiteral: function NullLiteral() {
        this.opcode("pushLiteral", "null");
      },
      Hash: function Hash(hash) {
        var pairs = hash.pairs, i = 0, l = pairs.length;
        this.opcode("pushHash");
        for (; i < l; i++) {
          this.pushParam(pairs[i].value);
        }
        while (i--) {
          this.opcode("assignToHash", pairs[i].key);
        }
        this.opcode("popHash");
      },
      // HELPERS
      opcode: function opcode(name) {
        this.opcodes.push({
          opcode: name,
          args: slice.call(arguments, 1),
          loc: this.sourceNode[0].loc
        });
      },
      addDepth: function addDepth(depth) {
        if (!depth) {
          return;
        }
        this.useDepths = true;
      },
      classifySexpr: function classifySexpr(sexpr) {
        var isSimple = _ast2["default"].helpers.simpleId(sexpr.path);
        var isBlockParam = isSimple && !!this.blockParamIndex(sexpr.path.parts[0]);
        var isHelper = !isBlockParam && _ast2["default"].helpers.helperExpression(sexpr);
        var isEligible = !isBlockParam && (isHelper || isSimple);
        if (isEligible && !isHelper) {
          var _name = sexpr.path.parts[0], options = this.options;
          if (options.knownHelpers[_name]) {
            isHelper = true;
          } else if (options.knownHelpersOnly) {
            isEligible = false;
          }
        }
        if (isHelper) {
          return "helper";
        } else if (isEligible) {
          return "ambiguous";
        } else {
          return "simple";
        }
      },
      pushParams: function pushParams(params) {
        for (var i = 0, l = params.length; i < l; i++) {
          this.pushParam(params[i]);
        }
      },
      pushParam: function pushParam(val) {
        var value = val.value != null ? val.value : val.original || "";
        if (this.stringParams) {
          if (value.replace) {
            value = value.replace(/^(\.?\.\/)*/g, "").replace(/\//g, ".");
          }
          if (val.depth) {
            this.addDepth(val.depth);
          }
          this.opcode("getContext", val.depth || 0);
          this.opcode("pushStringParam", value, val.type);
          if (val.type === "SubExpression") {
            this.accept(val);
          }
        } else {
          if (this.trackIds) {
            var blockParamIndex = void 0;
            if (val.parts && !_ast2["default"].helpers.scopedId(val) && !val.depth) {
              blockParamIndex = this.blockParamIndex(val.parts[0]);
            }
            if (blockParamIndex) {
              var blockParamChild = val.parts.slice(1).join(".");
              this.opcode("pushId", "BlockParam", blockParamIndex, blockParamChild);
            } else {
              value = val.original || value;
              if (value.replace) {
                value = value.replace(/^this(?:\.|$)/, "").replace(/^\.\//, "").replace(/^\.$/, "");
              }
              this.opcode("pushId", val.type, value);
            }
          }
          this.accept(val);
        }
      },
      setupFullMustacheParams: function setupFullMustacheParams(sexpr, program3, inverse2, omitEmpty) {
        var params = sexpr.params;
        this.pushParams(params);
        this.opcode("pushProgram", program3);
        this.opcode("pushProgram", inverse2);
        if (sexpr.hash) {
          this.accept(sexpr.hash);
        } else {
          this.opcode("emptyHash", omitEmpty);
        }
        return params;
      },
      blockParamIndex: function blockParamIndex(name) {
        for (var depth = 0, len = this.options.blockParams.length; depth < len; depth++) {
          var blockParams = this.options.blockParams[depth], param = blockParams && _utils.indexOf(blockParams, name);
          if (blockParams && param >= 0) {
            return [depth, param];
          }
        }
      }
    };
    function precompile(input, options, env2) {
      if (input == null || typeof input !== "string" && input.type !== "Program") {
        throw new _exception2["default"]("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + input);
      }
      options = options || {};
      if (!("data" in options)) {
        options.data = true;
      }
      if (options.compat) {
        options.useDepths = true;
      }
      var ast = env2.parse(input, options), environment = new env2.Compiler().compile(ast, options);
      return new env2.JavaScriptCompiler().compile(environment, options);
    }
    function compile(input, options, env2) {
      if (options === void 0) options = {};
      if (input == null || typeof input !== "string" && input.type !== "Program") {
        throw new _exception2["default"]("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + input);
      }
      options = _utils.extend({}, options);
      if (!("data" in options)) {
        options.data = true;
      }
      if (options.compat) {
        options.useDepths = true;
      }
      var compiled = void 0;
      function compileInput() {
        var ast = env2.parse(input, options), environment = new env2.Compiler().compile(ast, options), templateSpec = new env2.JavaScriptCompiler().compile(environment, options, void 0, true);
        return env2.template(templateSpec);
      }
      function ret(context, execOptions) {
        if (!compiled) {
          compiled = compileInput();
        }
        return compiled.call(this, context, execOptions);
      }
      ret._setup = function(setupOptions) {
        if (!compiled) {
          compiled = compileInput();
        }
        return compiled._setup(setupOptions);
      };
      ret._child = function(i, data, blockParams, depths) {
        if (!compiled) {
          compiled = compileInput();
        }
        return compiled._child(i, data, blockParams, depths);
      };
      return ret;
    }
    function argEquals(a, b2) {
      if (a === b2) {
        return true;
      }
      if (_utils.isArray(a) && _utils.isArray(b2) && a.length === b2.length) {
        for (var i = 0; i < a.length; i++) {
          if (!argEquals(a[i], b2[i])) {
            return false;
          }
        }
        return true;
      }
    }
    function transformLiteralToPath(sexpr) {
      if (!sexpr.path.parts) {
        var literal = sexpr.path;
        sexpr.path = {
          type: "PathExpression",
          data: false,
          depth: 0,
          parts: [literal.original + ""],
          original: literal.original + "",
          loc: literal.loc
        };
      }
    }
  }
});

// node_modules/source-map/lib/base64.js
var require_base64 = __commonJS({
  "node_modules/source-map/lib/base64.js"(exports) {
    "use strict";
    var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
    exports.encode = function(number) {
      if (0 <= number && number < intToCharMap.length) {
        return intToCharMap[number];
      }
      throw new TypeError("Must be between 0 and 63: " + number);
    };
    exports.decode = function(charCode) {
      var bigA = 65;
      var bigZ = 90;
      var littleA = 97;
      var littleZ = 122;
      var zero = 48;
      var nine = 57;
      var plus = 43;
      var slash = 47;
      var littleOffset = 26;
      var numberOffset = 52;
      if (bigA <= charCode && charCode <= bigZ) {
        return charCode - bigA;
      }
      if (littleA <= charCode && charCode <= littleZ) {
        return charCode - littleA + littleOffset;
      }
      if (zero <= charCode && charCode <= nine) {
        return charCode - zero + numberOffset;
      }
      if (charCode == plus) {
        return 62;
      }
      if (charCode == slash) {
        return 63;
      }
      return -1;
    };
  }
});

// node_modules/source-map/lib/base64-vlq.js
var require_base64_vlq = __commonJS({
  "node_modules/source-map/lib/base64-vlq.js"(exports) {
    "use strict";
    var base64 = require_base64();
    var VLQ_BASE_SHIFT = 5;
    var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
    var VLQ_BASE_MASK = VLQ_BASE - 1;
    var VLQ_CONTINUATION_BIT = VLQ_BASE;
    function toVLQSigned(aValue) {
      return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
    }
    function fromVLQSigned(aValue) {
      var isNegative = (aValue & 1) === 1;
      var shifted = aValue >> 1;
      return isNegative ? -shifted : shifted;
    }
    exports.encode = function base64VLQ_encode(aValue) {
      var encoded = "";
      var digit;
      var vlq = toVLQSigned(aValue);
      do {
        digit = vlq & VLQ_BASE_MASK;
        vlq >>>= VLQ_BASE_SHIFT;
        if (vlq > 0) {
          digit |= VLQ_CONTINUATION_BIT;
        }
        encoded += base64.encode(digit);
      } while (vlq > 0);
      return encoded;
    };
    exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
      var strLen = aStr.length;
      var result = 0;
      var shift = 0;
      var continuation, digit;
      do {
        if (aIndex >= strLen) {
          throw new Error("Expected more digits in base 64 VLQ value.");
        }
        digit = base64.decode(aStr.charCodeAt(aIndex++));
        if (digit === -1) {
          throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
        }
        continuation = !!(digit & VLQ_CONTINUATION_BIT);
        digit &= VLQ_BASE_MASK;
        result = result + (digit << shift);
        shift += VLQ_BASE_SHIFT;
      } while (continuation);
      aOutParam.value = fromVLQSigned(result);
      aOutParam.rest = aIndex;
    };
  }
});

// node_modules/source-map/lib/util.js
var require_util = __commonJS({
  "node_modules/source-map/lib/util.js"(exports) {
    "use strict";
    function getArg(aArgs, aName, aDefaultValue) {
      if (aName in aArgs) {
        return aArgs[aName];
      } else if (arguments.length === 3) {
        return aDefaultValue;
      } else {
        throw new Error('"' + aName + '" is a required argument.');
      }
    }
    exports.getArg = getArg;
    var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
    var dataUrlRegexp = /^data:.+\,.+$/;
    function urlParse(aUrl) {
      var match = aUrl.match(urlRegexp);
      if (!match) {
        return null;
      }
      return {
        scheme: match[1],
        auth: match[2],
        host: match[3],
        port: match[4],
        path: match[5]
      };
    }
    exports.urlParse = urlParse;
    function urlGenerate(aParsedUrl) {
      var url = "";
      if (aParsedUrl.scheme) {
        url += aParsedUrl.scheme + ":";
      }
      url += "//";
      if (aParsedUrl.auth) {
        url += aParsedUrl.auth + "@";
      }
      if (aParsedUrl.host) {
        url += aParsedUrl.host;
      }
      if (aParsedUrl.port) {
        url += ":" + aParsedUrl.port;
      }
      if (aParsedUrl.path) {
        url += aParsedUrl.path;
      }
      return url;
    }
    exports.urlGenerate = urlGenerate;
    function normalize(aPath) {
      var path11 = aPath;
      var url = urlParse(aPath);
      if (url) {
        if (!url.path) {
          return aPath;
        }
        path11 = url.path;
      }
      var isAbsolute = exports.isAbsolute(path11);
      var parts = path11.split(/\/+/);
      for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
        part = parts[i];
        if (part === ".") {
          parts.splice(i, 1);
        } else if (part === "..") {
          up++;
        } else if (up > 0) {
          if (part === "") {
            parts.splice(i + 1, up);
            up = 0;
          } else {
            parts.splice(i, 2);
            up--;
          }
        }
      }
      path11 = parts.join("/");
      if (path11 === "") {
        path11 = isAbsolute ? "/" : ".";
      }
      if (url) {
        url.path = path11;
        return urlGenerate(url);
      }
      return path11;
    }
    exports.normalize = normalize;
    function join(aRoot, aPath) {
      if (aRoot === "") {
        aRoot = ".";
      }
      if (aPath === "") {
        aPath = ".";
      }
      var aPathUrl = urlParse(aPath);
      var aRootUrl = urlParse(aRoot);
      if (aRootUrl) {
        aRoot = aRootUrl.path || "/";
      }
      if (aPathUrl && !aPathUrl.scheme) {
        if (aRootUrl) {
          aPathUrl.scheme = aRootUrl.scheme;
        }
        return urlGenerate(aPathUrl);
      }
      if (aPathUrl || aPath.match(dataUrlRegexp)) {
        return aPath;
      }
      if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
        aRootUrl.host = aPath;
        return urlGenerate(aRootUrl);
      }
      var joined = aPath.charAt(0) === "/" ? aPath : normalize(aRoot.replace(/\/+$/, "") + "/" + aPath);
      if (aRootUrl) {
        aRootUrl.path = joined;
        return urlGenerate(aRootUrl);
      }
      return joined;
    }
    exports.join = join;
    exports.isAbsolute = function(aPath) {
      return aPath.charAt(0) === "/" || urlRegexp.test(aPath);
    };
    function relative(aRoot, aPath) {
      if (aRoot === "") {
        aRoot = ".";
      }
      aRoot = aRoot.replace(/\/$/, "");
      var level = 0;
      while (aPath.indexOf(aRoot + "/") !== 0) {
        var index = aRoot.lastIndexOf("/");
        if (index < 0) {
          return aPath;
        }
        aRoot = aRoot.slice(0, index);
        if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
          return aPath;
        }
        ++level;
      }
      return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
    }
    exports.relative = relative;
    var supportsNullProto = (function() {
      var obj = /* @__PURE__ */ Object.create(null);
      return !("__proto__" in obj);
    })();
    function identity(s) {
      return s;
    }
    function toSetString(aStr) {
      if (isProtoString(aStr)) {
        return "$" + aStr;
      }
      return aStr;
    }
    exports.toSetString = supportsNullProto ? identity : toSetString;
    function fromSetString(aStr) {
      if (isProtoString(aStr)) {
        return aStr.slice(1);
      }
      return aStr;
    }
    exports.fromSetString = supportsNullProto ? identity : fromSetString;
    function isProtoString(s) {
      if (!s) {
        return false;
      }
      var length = s.length;
      if (length < 9) {
        return false;
      }
      if (s.charCodeAt(length - 1) !== 95 || s.charCodeAt(length - 2) !== 95 || s.charCodeAt(length - 3) !== 111 || s.charCodeAt(length - 4) !== 116 || s.charCodeAt(length - 5) !== 111 || s.charCodeAt(length - 6) !== 114 || s.charCodeAt(length - 7) !== 112 || s.charCodeAt(length - 8) !== 95 || s.charCodeAt(length - 9) !== 95) {
        return false;
      }
      for (var i = length - 10; i >= 0; i--) {
        if (s.charCodeAt(i) !== 36) {
          return false;
        }
      }
      return true;
    }
    function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
      var cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0 || onlyCompareOriginal) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports.compareByOriginalPositions = compareByOriginalPositions;
    function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
      var cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0 || onlyCompareGenerated) {
        return cmp;
      }
      cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
    function strcmp(aStr1, aStr2) {
      if (aStr1 === aStr2) {
        return 0;
      }
      if (aStr1 === null) {
        return 1;
      }
      if (aStr2 === null) {
        return -1;
      }
      if (aStr1 > aStr2) {
        return 1;
      }
      return -1;
    }
    function compareByGeneratedPositionsInflated(mappingA, mappingB) {
      var cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
    function parseSourceMapInput(str) {
      return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
    }
    exports.parseSourceMapInput = parseSourceMapInput;
    function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
      sourceURL = sourceURL || "";
      if (sourceRoot) {
        if (sourceRoot[sourceRoot.length - 1] !== "/" && sourceURL[0] !== "/") {
          sourceRoot += "/";
        }
        sourceURL = sourceRoot + sourceURL;
      }
      if (sourceMapURL) {
        var parsed = urlParse(sourceMapURL);
        if (!parsed) {
          throw new Error("sourceMapURL could not be parsed");
        }
        if (parsed.path) {
          var index = parsed.path.lastIndexOf("/");
          if (index >= 0) {
            parsed.path = parsed.path.substring(0, index + 1);
          }
        }
        sourceURL = join(urlGenerate(parsed), sourceURL);
      }
      return normalize(sourceURL);
    }
    exports.computeSourceURL = computeSourceURL;
  }
});

// node_modules/source-map/lib/array-set.js
var require_array_set = __commonJS({
  "node_modules/source-map/lib/array-set.js"(exports) {
    "use strict";
    var util = require_util();
    var has = Object.prototype.hasOwnProperty;
    var hasNativeMap = typeof Map !== "undefined";
    function ArraySet() {
      this._array = [];
      this._set = hasNativeMap ? /* @__PURE__ */ new Map() : /* @__PURE__ */ Object.create(null);
    }
    ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
      var set = new ArraySet();
      for (var i = 0, len = aArray.length; i < len; i++) {
        set.add(aArray[i], aAllowDuplicates);
      }
      return set;
    };
    ArraySet.prototype.size = function ArraySet_size() {
      return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
    };
    ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
      var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
      var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
      var idx = this._array.length;
      if (!isDuplicate || aAllowDuplicates) {
        this._array.push(aStr);
      }
      if (!isDuplicate) {
        if (hasNativeMap) {
          this._set.set(aStr, idx);
        } else {
          this._set[sStr] = idx;
        }
      }
    };
    ArraySet.prototype.has = function ArraySet_has(aStr) {
      if (hasNativeMap) {
        return this._set.has(aStr);
      } else {
        var sStr = util.toSetString(aStr);
        return has.call(this._set, sStr);
      }
    };
    ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
      if (hasNativeMap) {
        var idx = this._set.get(aStr);
        if (idx >= 0) {
          return idx;
        }
      } else {
        var sStr = util.toSetString(aStr);
        if (has.call(this._set, sStr)) {
          return this._set[sStr];
        }
      }
      throw new Error('"' + aStr + '" is not in the set.');
    };
    ArraySet.prototype.at = function ArraySet_at(aIdx) {
      if (aIdx >= 0 && aIdx < this._array.length) {
        return this._array[aIdx];
      }
      throw new Error("No element indexed by " + aIdx);
    };
    ArraySet.prototype.toArray = function ArraySet_toArray() {
      return this._array.slice();
    };
    exports.ArraySet = ArraySet;
  }
});

// node_modules/source-map/lib/mapping-list.js
var require_mapping_list = __commonJS({
  "node_modules/source-map/lib/mapping-list.js"(exports) {
    "use strict";
    var util = require_util();
    function generatedPositionAfter(mappingA, mappingB) {
      var lineA = mappingA.generatedLine;
      var lineB = mappingB.generatedLine;
      var columnA = mappingA.generatedColumn;
      var columnB = mappingB.generatedColumn;
      return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
    }
    function MappingList() {
      this._array = [];
      this._sorted = true;
      this._last = { generatedLine: -1, generatedColumn: 0 };
    }
    MappingList.prototype.unsortedForEach = function MappingList_forEach(aCallback, aThisArg) {
      this._array.forEach(aCallback, aThisArg);
    };
    MappingList.prototype.add = function MappingList_add(aMapping) {
      if (generatedPositionAfter(this._last, aMapping)) {
        this._last = aMapping;
        this._array.push(aMapping);
      } else {
        this._sorted = false;
        this._array.push(aMapping);
      }
    };
    MappingList.prototype.toArray = function MappingList_toArray() {
      if (!this._sorted) {
        this._array.sort(util.compareByGeneratedPositionsInflated);
        this._sorted = true;
      }
      return this._array;
    };
    exports.MappingList = MappingList;
  }
});

// node_modules/source-map/lib/source-map-generator.js
var require_source_map_generator = __commonJS({
  "node_modules/source-map/lib/source-map-generator.js"(exports) {
    "use strict";
    var base64VLQ = require_base64_vlq();
    var util = require_util();
    var ArraySet = require_array_set().ArraySet;
    var MappingList = require_mapping_list().MappingList;
    function SourceMapGenerator(aArgs) {
      if (!aArgs) {
        aArgs = {};
      }
      this._file = util.getArg(aArgs, "file", null);
      this._sourceRoot = util.getArg(aArgs, "sourceRoot", null);
      this._skipValidation = util.getArg(aArgs, "skipValidation", false);
      this._sources = new ArraySet();
      this._names = new ArraySet();
      this._mappings = new MappingList();
      this._sourcesContents = null;
    }
    SourceMapGenerator.prototype._version = 3;
    SourceMapGenerator.fromSourceMap = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
      var sourceRoot = aSourceMapConsumer.sourceRoot;
      var generator = new SourceMapGenerator({
        file: aSourceMapConsumer.file,
        sourceRoot
      });
      aSourceMapConsumer.eachMapping(function(mapping) {
        var newMapping = {
          generated: {
            line: mapping.generatedLine,
            column: mapping.generatedColumn
          }
        };
        if (mapping.source != null) {
          newMapping.source = mapping.source;
          if (sourceRoot != null) {
            newMapping.source = util.relative(sourceRoot, newMapping.source);
          }
          newMapping.original = {
            line: mapping.originalLine,
            column: mapping.originalColumn
          };
          if (mapping.name != null) {
            newMapping.name = mapping.name;
          }
        }
        generator.addMapping(newMapping);
      });
      aSourceMapConsumer.sources.forEach(function(sourceFile) {
        var sourceRelative = sourceFile;
        if (sourceRoot !== null) {
          sourceRelative = util.relative(sourceRoot, sourceFile);
        }
        if (!generator._sources.has(sourceRelative)) {
          generator._sources.add(sourceRelative);
        }
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          generator.setSourceContent(sourceFile, content);
        }
      });
      return generator;
    };
    SourceMapGenerator.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) {
      var generated = util.getArg(aArgs, "generated");
      var original = util.getArg(aArgs, "original", null);
      var source = util.getArg(aArgs, "source", null);
      var name = util.getArg(aArgs, "name", null);
      if (!this._skipValidation) {
        this._validateMapping(generated, original, source, name);
      }
      if (source != null) {
        source = String(source);
        if (!this._sources.has(source)) {
          this._sources.add(source);
        }
      }
      if (name != null) {
        name = String(name);
        if (!this._names.has(name)) {
          this._names.add(name);
        }
      }
      this._mappings.add({
        generatedLine: generated.line,
        generatedColumn: generated.column,
        originalLine: original != null && original.line,
        originalColumn: original != null && original.column,
        source,
        name
      });
    };
    SourceMapGenerator.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
      var source = aSourceFile;
      if (this._sourceRoot != null) {
        source = util.relative(this._sourceRoot, source);
      }
      if (aSourceContent != null) {
        if (!this._sourcesContents) {
          this._sourcesContents = /* @__PURE__ */ Object.create(null);
        }
        this._sourcesContents[util.toSetString(source)] = aSourceContent;
      } else if (this._sourcesContents) {
        delete this._sourcesContents[util.toSetString(source)];
        if (Object.keys(this._sourcesContents).length === 0) {
          this._sourcesContents = null;
        }
      }
    };
    SourceMapGenerator.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
      var sourceFile = aSourceFile;
      if (aSourceFile == null) {
        if (aSourceMapConsumer.file == null) {
          throw new Error(
            `SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`
          );
        }
        sourceFile = aSourceMapConsumer.file;
      }
      var sourceRoot = this._sourceRoot;
      if (sourceRoot != null) {
        sourceFile = util.relative(sourceRoot, sourceFile);
      }
      var newSources = new ArraySet();
      var newNames = new ArraySet();
      this._mappings.unsortedForEach(function(mapping) {
        if (mapping.source === sourceFile && mapping.originalLine != null) {
          var original = aSourceMapConsumer.originalPositionFor({
            line: mapping.originalLine,
            column: mapping.originalColumn
          });
          if (original.source != null) {
            mapping.source = original.source;
            if (aSourceMapPath != null) {
              mapping.source = util.join(aSourceMapPath, mapping.source);
            }
            if (sourceRoot != null) {
              mapping.source = util.relative(sourceRoot, mapping.source);
            }
            mapping.originalLine = original.line;
            mapping.originalColumn = original.column;
            if (original.name != null) {
              mapping.name = original.name;
            }
          }
        }
        var source = mapping.source;
        if (source != null && !newSources.has(source)) {
          newSources.add(source);
        }
        var name = mapping.name;
        if (name != null && !newNames.has(name)) {
          newNames.add(name);
        }
      }, this);
      this._sources = newSources;
      this._names = newNames;
      aSourceMapConsumer.sources.forEach(function(sourceFile2) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile2);
        if (content != null) {
          if (aSourceMapPath != null) {
            sourceFile2 = util.join(aSourceMapPath, sourceFile2);
          }
          if (sourceRoot != null) {
            sourceFile2 = util.relative(sourceRoot, sourceFile2);
          }
          this.setSourceContent(sourceFile2, content);
        }
      }, this);
    };
    SourceMapGenerator.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
      if (aOriginal && typeof aOriginal.line !== "number" && typeof aOriginal.column !== "number") {
        throw new Error(
          "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values."
        );
      }
      if (aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) {
        return;
      } else if (aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) {
        return;
      } else {
        throw new Error("Invalid mapping: " + JSON.stringify({
          generated: aGenerated,
          source: aSource,
          original: aOriginal,
          name: aName
        }));
      }
    };
    SourceMapGenerator.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
      var previousGeneratedColumn = 0;
      var previousGeneratedLine = 1;
      var previousOriginalColumn = 0;
      var previousOriginalLine = 0;
      var previousName = 0;
      var previousSource = 0;
      var result = "";
      var next;
      var mapping;
      var nameIdx;
      var sourceIdx;
      var mappings = this._mappings.toArray();
      for (var i = 0, len = mappings.length; i < len; i++) {
        mapping = mappings[i];
        next = "";
        if (mapping.generatedLine !== previousGeneratedLine) {
          previousGeneratedColumn = 0;
          while (mapping.generatedLine !== previousGeneratedLine) {
            next += ";";
            previousGeneratedLine++;
          }
        } else {
          if (i > 0) {
            if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
              continue;
            }
            next += ",";
          }
        }
        next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
        previousGeneratedColumn = mapping.generatedColumn;
        if (mapping.source != null) {
          sourceIdx = this._sources.indexOf(mapping.source);
          next += base64VLQ.encode(sourceIdx - previousSource);
          previousSource = sourceIdx;
          next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
          previousOriginalLine = mapping.originalLine - 1;
          next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
          previousOriginalColumn = mapping.originalColumn;
          if (mapping.name != null) {
            nameIdx = this._names.indexOf(mapping.name);
            next += base64VLQ.encode(nameIdx - previousName);
            previousName = nameIdx;
          }
        }
        result += next;
      }
      return result;
    };
    SourceMapGenerator.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
      return aSources.map(function(source) {
        if (!this._sourcesContents) {
          return null;
        }
        if (aSourceRoot != null) {
          source = util.relative(aSourceRoot, source);
        }
        var key = util.toSetString(source);
        return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
      }, this);
    };
    SourceMapGenerator.prototype.toJSON = function SourceMapGenerator_toJSON() {
      var map = {
        version: this._version,
        sources: this._sources.toArray(),
        names: this._names.toArray(),
        mappings: this._serializeMappings()
      };
      if (this._file != null) {
        map.file = this._file;
      }
      if (this._sourceRoot != null) {
        map.sourceRoot = this._sourceRoot;
      }
      if (this._sourcesContents) {
        map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
      }
      return map;
    };
    SourceMapGenerator.prototype.toString = function SourceMapGenerator_toString() {
      return JSON.stringify(this.toJSON());
    };
    exports.SourceMapGenerator = SourceMapGenerator;
  }
});

// node_modules/source-map/lib/binary-search.js
var require_binary_search = __commonJS({
  "node_modules/source-map/lib/binary-search.js"(exports) {
    "use strict";
    exports.GREATEST_LOWER_BOUND = 1;
    exports.LEAST_UPPER_BOUND = 2;
    function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
      var mid = Math.floor((aHigh - aLow) / 2) + aLow;
      var cmp = aCompare(aNeedle, aHaystack[mid], true);
      if (cmp === 0) {
        return mid;
      } else if (cmp > 0) {
        if (aHigh - mid > 1) {
          return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
        }
        if (aBias == exports.LEAST_UPPER_BOUND) {
          return aHigh < aHaystack.length ? aHigh : -1;
        } else {
          return mid;
        }
      } else {
        if (mid - aLow > 1) {
          return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
        }
        if (aBias == exports.LEAST_UPPER_BOUND) {
          return mid;
        } else {
          return aLow < 0 ? -1 : aLow;
        }
      }
    }
    exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
      if (aHaystack.length === 0) {
        return -1;
      }
      var index = recursiveSearch(
        -1,
        aHaystack.length,
        aNeedle,
        aHaystack,
        aCompare,
        aBias || exports.GREATEST_LOWER_BOUND
      );
      if (index < 0) {
        return -1;
      }
      while (index - 1 >= 0) {
        if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
          break;
        }
        --index;
      }
      return index;
    };
  }
});

// node_modules/source-map/lib/quick-sort.js
var require_quick_sort = __commonJS({
  "node_modules/source-map/lib/quick-sort.js"(exports) {
    "use strict";
    function swap(ary, x2, y2) {
      var temp = ary[x2];
      ary[x2] = ary[y2];
      ary[y2] = temp;
    }
    function randomIntInRange(low, high) {
      return Math.round(low + Math.random() * (high - low));
    }
    function doQuickSort(ary, comparator, p2, r) {
      if (p2 < r) {
        var pivotIndex = randomIntInRange(p2, r);
        var i = p2 - 1;
        swap(ary, pivotIndex, r);
        var pivot = ary[r];
        for (var j3 = p2; j3 < r; j3++) {
          if (comparator(ary[j3], pivot) <= 0) {
            i += 1;
            swap(ary, i, j3);
          }
        }
        swap(ary, i + 1, j3);
        var q2 = i + 1;
        doQuickSort(ary, comparator, p2, q2 - 1);
        doQuickSort(ary, comparator, q2 + 1, r);
      }
    }
    exports.quickSort = function(ary, comparator) {
      doQuickSort(ary, comparator, 0, ary.length - 1);
    };
  }
});

// node_modules/source-map/lib/source-map-consumer.js
var require_source_map_consumer = __commonJS({
  "node_modules/source-map/lib/source-map-consumer.js"(exports) {
    "use strict";
    var util = require_util();
    var binarySearch = require_binary_search();
    var ArraySet = require_array_set().ArraySet;
    var base64VLQ = require_base64_vlq();
    var quickSort = require_quick_sort().quickSort;
    function SourceMapConsumer(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = util.parseSourceMapInput(aSourceMap);
      }
      return sourceMap.sections != null ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL) : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
    }
    SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
      return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
    };
    SourceMapConsumer.prototype._version = 3;
    SourceMapConsumer.prototype.__generatedMappings = null;
    Object.defineProperty(SourceMapConsumer.prototype, "_generatedMappings", {
      configurable: true,
      enumerable: true,
      get: function() {
        if (!this.__generatedMappings) {
          this._parseMappings(this._mappings, this.sourceRoot);
        }
        return this.__generatedMappings;
      }
    });
    SourceMapConsumer.prototype.__originalMappings = null;
    Object.defineProperty(SourceMapConsumer.prototype, "_originalMappings", {
      configurable: true,
      enumerable: true,
      get: function() {
        if (!this.__originalMappings) {
          this._parseMappings(this._mappings, this.sourceRoot);
        }
        return this.__originalMappings;
      }
    });
    SourceMapConsumer.prototype._charIsMappingSeparator = function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
      var c = aStr.charAt(index);
      return c === ";" || c === ",";
    };
    SourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      throw new Error("Subclasses must implement _parseMappings");
    };
    SourceMapConsumer.GENERATED_ORDER = 1;
    SourceMapConsumer.ORIGINAL_ORDER = 2;
    SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
    SourceMapConsumer.LEAST_UPPER_BOUND = 2;
    SourceMapConsumer.prototype.eachMapping = function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
      var context = aContext || null;
      var order = aOrder || SourceMapConsumer.GENERATED_ORDER;
      var mappings;
      switch (order) {
        case SourceMapConsumer.GENERATED_ORDER:
          mappings = this._generatedMappings;
          break;
        case SourceMapConsumer.ORIGINAL_ORDER:
          mappings = this._originalMappings;
          break;
        default:
          throw new Error("Unknown order of iteration.");
      }
      var sourceRoot = this.sourceRoot;
      mappings.map(function(mapping) {
        var source = mapping.source === null ? null : this._sources.at(mapping.source);
        source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL);
        return {
          source,
          generatedLine: mapping.generatedLine,
          generatedColumn: mapping.generatedColumn,
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: mapping.name === null ? null : this._names.at(mapping.name)
        };
      }, this).forEach(aCallback, context);
    };
    SourceMapConsumer.prototype.allGeneratedPositionsFor = function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
      var line = util.getArg(aArgs, "line");
      var needle = {
        source: util.getArg(aArgs, "source"),
        originalLine: line,
        originalColumn: util.getArg(aArgs, "column", 0)
      };
      needle.source = this._findSourceIndex(needle.source);
      if (needle.source < 0) {
        return [];
      }
      var mappings = [];
      var index = this._findMapping(
        needle,
        this._originalMappings,
        "originalLine",
        "originalColumn",
        util.compareByOriginalPositions,
        binarySearch.LEAST_UPPER_BOUND
      );
      if (index >= 0) {
        var mapping = this._originalMappings[index];
        if (aArgs.column === void 0) {
          var originalLine = mapping.originalLine;
          while (mapping && mapping.originalLine === originalLine) {
            mappings.push({
              line: util.getArg(mapping, "generatedLine", null),
              column: util.getArg(mapping, "generatedColumn", null),
              lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
            });
            mapping = this._originalMappings[++index];
          }
        } else {
          var originalColumn = mapping.originalColumn;
          while (mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn) {
            mappings.push({
              line: util.getArg(mapping, "generatedLine", null),
              column: util.getArg(mapping, "generatedColumn", null),
              lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
            });
            mapping = this._originalMappings[++index];
          }
        }
      }
      return mappings;
    };
    exports.SourceMapConsumer = SourceMapConsumer;
    function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = util.parseSourceMapInput(aSourceMap);
      }
      var version = util.getArg(sourceMap, "version");
      var sources = util.getArg(sourceMap, "sources");
      var names = util.getArg(sourceMap, "names", []);
      var sourceRoot = util.getArg(sourceMap, "sourceRoot", null);
      var sourcesContent = util.getArg(sourceMap, "sourcesContent", null);
      var mappings = util.getArg(sourceMap, "mappings");
      var file = util.getArg(sourceMap, "file", null);
      if (version != this._version) {
        throw new Error("Unsupported version: " + version);
      }
      if (sourceRoot) {
        sourceRoot = util.normalize(sourceRoot);
      }
      sources = sources.map(String).map(util.normalize).map(function(source) {
        return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source) ? util.relative(sourceRoot, source) : source;
      });
      this._names = ArraySet.fromArray(names.map(String), true);
      this._sources = ArraySet.fromArray(sources, true);
      this._absoluteSources = this._sources.toArray().map(function(s) {
        return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
      });
      this.sourceRoot = sourceRoot;
      this.sourcesContent = sourcesContent;
      this._mappings = mappings;
      this._sourceMapURL = aSourceMapURL;
      this.file = file;
    }
    BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
    BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
    BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
      var relativeSource = aSource;
      if (this.sourceRoot != null) {
        relativeSource = util.relative(this.sourceRoot, relativeSource);
      }
      if (this._sources.has(relativeSource)) {
        return this._sources.indexOf(relativeSource);
      }
      var i;
      for (i = 0; i < this._absoluteSources.length; ++i) {
        if (this._absoluteSources[i] == aSource) {
          return i;
        }
      }
      return -1;
    };
    BasicSourceMapConsumer.fromSourceMap = function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
      var smc = Object.create(BasicSourceMapConsumer.prototype);
      var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
      var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
      smc.sourceRoot = aSourceMap._sourceRoot;
      smc.sourcesContent = aSourceMap._generateSourcesContent(
        smc._sources.toArray(),
        smc.sourceRoot
      );
      smc.file = aSourceMap._file;
      smc._sourceMapURL = aSourceMapURL;
      smc._absoluteSources = smc._sources.toArray().map(function(s) {
        return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
      });
      var generatedMappings = aSourceMap._mappings.toArray().slice();
      var destGeneratedMappings = smc.__generatedMappings = [];
      var destOriginalMappings = smc.__originalMappings = [];
      for (var i = 0, length = generatedMappings.length; i < length; i++) {
        var srcMapping = generatedMappings[i];
        var destMapping = new Mapping();
        destMapping.generatedLine = srcMapping.generatedLine;
        destMapping.generatedColumn = srcMapping.generatedColumn;
        if (srcMapping.source) {
          destMapping.source = sources.indexOf(srcMapping.source);
          destMapping.originalLine = srcMapping.originalLine;
          destMapping.originalColumn = srcMapping.originalColumn;
          if (srcMapping.name) {
            destMapping.name = names.indexOf(srcMapping.name);
          }
          destOriginalMappings.push(destMapping);
        }
        destGeneratedMappings.push(destMapping);
      }
      quickSort(smc.__originalMappings, util.compareByOriginalPositions);
      return smc;
    };
    BasicSourceMapConsumer.prototype._version = 3;
    Object.defineProperty(BasicSourceMapConsumer.prototype, "sources", {
      get: function() {
        return this._absoluteSources.slice();
      }
    });
    function Mapping() {
      this.generatedLine = 0;
      this.generatedColumn = 0;
      this.source = null;
      this.originalLine = null;
      this.originalColumn = null;
      this.name = null;
    }
    BasicSourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      var generatedLine = 1;
      var previousGeneratedColumn = 0;
      var previousOriginalLine = 0;
      var previousOriginalColumn = 0;
      var previousSource = 0;
      var previousName = 0;
      var length = aStr.length;
      var index = 0;
      var cachedSegments = {};
      var temp = {};
      var originalMappings = [];
      var generatedMappings = [];
      var mapping, str, segment, end, value;
      while (index < length) {
        if (aStr.charAt(index) === ";") {
          generatedLine++;
          index++;
          previousGeneratedColumn = 0;
        } else if (aStr.charAt(index) === ",") {
          index++;
        } else {
          mapping = new Mapping();
          mapping.generatedLine = generatedLine;
          for (end = index; end < length; end++) {
            if (this._charIsMappingSeparator(aStr, end)) {
              break;
            }
          }
          str = aStr.slice(index, end);
          segment = cachedSegments[str];
          if (segment) {
            index += str.length;
          } else {
            segment = [];
            while (index < end) {
              base64VLQ.decode(aStr, index, temp);
              value = temp.value;
              index = temp.rest;
              segment.push(value);
            }
            if (segment.length === 2) {
              throw new Error("Found a source, but no line and column");
            }
            if (segment.length === 3) {
              throw new Error("Found a source and line, but no column");
            }
            cachedSegments[str] = segment;
          }
          mapping.generatedColumn = previousGeneratedColumn + segment[0];
          previousGeneratedColumn = mapping.generatedColumn;
          if (segment.length > 1) {
            mapping.source = previousSource + segment[1];
            previousSource += segment[1];
            mapping.originalLine = previousOriginalLine + segment[2];
            previousOriginalLine = mapping.originalLine;
            mapping.originalLine += 1;
            mapping.originalColumn = previousOriginalColumn + segment[3];
            previousOriginalColumn = mapping.originalColumn;
            if (segment.length > 4) {
              mapping.name = previousName + segment[4];
              previousName += segment[4];
            }
          }
          generatedMappings.push(mapping);
          if (typeof mapping.originalLine === "number") {
            originalMappings.push(mapping);
          }
        }
      }
      quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
      this.__generatedMappings = generatedMappings;
      quickSort(originalMappings, util.compareByOriginalPositions);
      this.__originalMappings = originalMappings;
    };
    BasicSourceMapConsumer.prototype._findMapping = function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
      if (aNeedle[aLineName] <= 0) {
        throw new TypeError("Line must be greater than or equal to 1, got " + aNeedle[aLineName]);
      }
      if (aNeedle[aColumnName] < 0) {
        throw new TypeError("Column must be greater than or equal to 0, got " + aNeedle[aColumnName]);
      }
      return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
    };
    BasicSourceMapConsumer.prototype.computeColumnSpans = function SourceMapConsumer_computeColumnSpans() {
      for (var index = 0; index < this._generatedMappings.length; ++index) {
        var mapping = this._generatedMappings[index];
        if (index + 1 < this._generatedMappings.length) {
          var nextMapping = this._generatedMappings[index + 1];
          if (mapping.generatedLine === nextMapping.generatedLine) {
            mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
            continue;
          }
        }
        mapping.lastGeneratedColumn = Infinity;
      }
    };
    BasicSourceMapConsumer.prototype.originalPositionFor = function SourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, "line"),
        generatedColumn: util.getArg(aArgs, "column")
      };
      var index = this._findMapping(
        needle,
        this._generatedMappings,
        "generatedLine",
        "generatedColumn",
        util.compareByGeneratedPositionsDeflated,
        util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND)
      );
      if (index >= 0) {
        var mapping = this._generatedMappings[index];
        if (mapping.generatedLine === needle.generatedLine) {
          var source = util.getArg(mapping, "source", null);
          if (source !== null) {
            source = this._sources.at(source);
            source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
          }
          var name = util.getArg(mapping, "name", null);
          if (name !== null) {
            name = this._names.at(name);
          }
          return {
            source,
            line: util.getArg(mapping, "originalLine", null),
            column: util.getArg(mapping, "originalColumn", null),
            name
          };
        }
      }
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    };
    BasicSourceMapConsumer.prototype.hasContentsOfAllSources = function BasicSourceMapConsumer_hasContentsOfAllSources() {
      if (!this.sourcesContent) {
        return false;
      }
      return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(sc) {
        return sc == null;
      });
    };
    BasicSourceMapConsumer.prototype.sourceContentFor = function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
      if (!this.sourcesContent) {
        return null;
      }
      var index = this._findSourceIndex(aSource);
      if (index >= 0) {
        return this.sourcesContent[index];
      }
      var relativeSource = aSource;
      if (this.sourceRoot != null) {
        relativeSource = util.relative(this.sourceRoot, relativeSource);
      }
      var url;
      if (this.sourceRoot != null && (url = util.urlParse(this.sourceRoot))) {
        var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
        if (url.scheme == "file" && this._sources.has(fileUriAbsPath)) {
          return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
        }
        if ((!url.path || url.path == "/") && this._sources.has("/" + relativeSource)) {
          return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
        }
      }
      if (nullOnMissing) {
        return null;
      } else {
        throw new Error('"' + relativeSource + '" is not in the SourceMap.');
      }
    };
    BasicSourceMapConsumer.prototype.generatedPositionFor = function SourceMapConsumer_generatedPositionFor(aArgs) {
      var source = util.getArg(aArgs, "source");
      source = this._findSourceIndex(source);
      if (source < 0) {
        return {
          line: null,
          column: null,
          lastColumn: null
        };
      }
      var needle = {
        source,
        originalLine: util.getArg(aArgs, "line"),
        originalColumn: util.getArg(aArgs, "column")
      };
      var index = this._findMapping(
        needle,
        this._originalMappings,
        "originalLine",
        "originalColumn",
        util.compareByOriginalPositions,
        util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND)
      );
      if (index >= 0) {
        var mapping = this._originalMappings[index];
        if (mapping.source === needle.source) {
          return {
            line: util.getArg(mapping, "generatedLine", null),
            column: util.getArg(mapping, "generatedColumn", null),
            lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
          };
        }
      }
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    };
    exports.BasicSourceMapConsumer = BasicSourceMapConsumer;
    function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = util.parseSourceMapInput(aSourceMap);
      }
      var version = util.getArg(sourceMap, "version");
      var sections = util.getArg(sourceMap, "sections");
      if (version != this._version) {
        throw new Error("Unsupported version: " + version);
      }
      this._sources = new ArraySet();
      this._names = new ArraySet();
      var lastOffset = {
        line: -1,
        column: 0
      };
      this._sections = sections.map(function(s) {
        if (s.url) {
          throw new Error("Support for url field in sections not implemented.");
        }
        var offset = util.getArg(s, "offset");
        var offsetLine = util.getArg(offset, "line");
        var offsetColumn = util.getArg(offset, "column");
        if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) {
          throw new Error("Section offsets must be ordered and non-overlapping.");
        }
        lastOffset = offset;
        return {
          generatedOffset: {
            // The offset fields are 0-based, but we use 1-based indices when
            // encoding/decoding from VLQ.
            generatedLine: offsetLine + 1,
            generatedColumn: offsetColumn + 1
          },
          consumer: new SourceMapConsumer(util.getArg(s, "map"), aSourceMapURL)
        };
      });
    }
    IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
    IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;
    IndexedSourceMapConsumer.prototype._version = 3;
    Object.defineProperty(IndexedSourceMapConsumer.prototype, "sources", {
      get: function() {
        var sources = [];
        for (var i = 0; i < this._sections.length; i++) {
          for (var j3 = 0; j3 < this._sections[i].consumer.sources.length; j3++) {
            sources.push(this._sections[i].consumer.sources[j3]);
          }
        }
        return sources;
      }
    });
    IndexedSourceMapConsumer.prototype.originalPositionFor = function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, "line"),
        generatedColumn: util.getArg(aArgs, "column")
      };
      var sectionIndex = binarySearch.search(
        needle,
        this._sections,
        function(needle2, section2) {
          var cmp = needle2.generatedLine - section2.generatedOffset.generatedLine;
          if (cmp) {
            return cmp;
          }
          return needle2.generatedColumn - section2.generatedOffset.generatedColumn;
        }
      );
      var section = this._sections[sectionIndex];
      if (!section) {
        return {
          source: null,
          line: null,
          column: null,
          name: null
        };
      }
      return section.consumer.originalPositionFor({
        line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
        column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
        bias: aArgs.bias
      });
    };
    IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = function IndexedSourceMapConsumer_hasContentsOfAllSources() {
      return this._sections.every(function(s) {
        return s.consumer.hasContentsOfAllSources();
      });
    };
    IndexedSourceMapConsumer.prototype.sourceContentFor = function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        var content = section.consumer.sourceContentFor(aSource, true);
        if (content) {
          return content;
        }
      }
      if (nullOnMissing) {
        return null;
      } else {
        throw new Error('"' + aSource + '" is not in the SourceMap.');
      }
    };
    IndexedSourceMapConsumer.prototype.generatedPositionFor = function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        if (section.consumer._findSourceIndex(util.getArg(aArgs, "source")) === -1) {
          continue;
        }
        var generatedPosition = section.consumer.generatedPositionFor(aArgs);
        if (generatedPosition) {
          var ret = {
            line: generatedPosition.line + (section.generatedOffset.generatedLine - 1),
            column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0)
          };
          return ret;
        }
      }
      return {
        line: null,
        column: null
      };
    };
    IndexedSourceMapConsumer.prototype._parseMappings = function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      this.__generatedMappings = [];
      this.__originalMappings = [];
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        var sectionMappings = section.consumer._generatedMappings;
        for (var j3 = 0; j3 < sectionMappings.length; j3++) {
          var mapping = sectionMappings[j3];
          var source = section.consumer._sources.at(mapping.source);
          source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
          this._sources.add(source);
          source = this._sources.indexOf(source);
          var name = null;
          if (mapping.name) {
            name = section.consumer._names.at(mapping.name);
            this._names.add(name);
            name = this._names.indexOf(name);
          }
          var adjustedMapping = {
            source,
            generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
            generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
            originalLine: mapping.originalLine,
            originalColumn: mapping.originalColumn,
            name
          };
          this.__generatedMappings.push(adjustedMapping);
          if (typeof adjustedMapping.originalLine === "number") {
            this.__originalMappings.push(adjustedMapping);
          }
        }
      }
      quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
      quickSort(this.__originalMappings, util.compareByOriginalPositions);
    };
    exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
  }
});

// node_modules/source-map/lib/source-node.js
var require_source_node = __commonJS({
  "node_modules/source-map/lib/source-node.js"(exports) {
    "use strict";
    var SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
    var util = require_util();
    var REGEX_NEWLINE = /(\r?\n)/;
    var NEWLINE_CODE = 10;
    var isSourceNode = "$$$isSourceNode$$$";
    function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
      this.children = [];
      this.sourceContents = {};
      this.line = aLine == null ? null : aLine;
      this.column = aColumn == null ? null : aColumn;
      this.source = aSource == null ? null : aSource;
      this.name = aName == null ? null : aName;
      this[isSourceNode] = true;
      if (aChunks != null) this.add(aChunks);
    }
    SourceNode.fromStringWithSourceMap = function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
      var node = new SourceNode();
      var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
      var remainingLinesIndex = 0;
      var shiftNextLine = function() {
        var lineContents = getNextLine();
        var newLine = getNextLine() || "";
        return lineContents + newLine;
        function getNextLine() {
          return remainingLinesIndex < remainingLines.length ? remainingLines[remainingLinesIndex++] : void 0;
        }
      };
      var lastGeneratedLine = 1, lastGeneratedColumn = 0;
      var lastMapping = null;
      aSourceMapConsumer.eachMapping(function(mapping) {
        if (lastMapping !== null) {
          if (lastGeneratedLine < mapping.generatedLine) {
            addMappingWithCode(lastMapping, shiftNextLine());
            lastGeneratedLine++;
            lastGeneratedColumn = 0;
          } else {
            var nextLine = remainingLines[remainingLinesIndex] || "";
            var code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
            remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn);
            lastGeneratedColumn = mapping.generatedColumn;
            addMappingWithCode(lastMapping, code);
            lastMapping = mapping;
            return;
          }
        }
        while (lastGeneratedLine < mapping.generatedLine) {
          node.add(shiftNextLine());
          lastGeneratedLine++;
        }
        if (lastGeneratedColumn < mapping.generatedColumn) {
          var nextLine = remainingLines[remainingLinesIndex] || "";
          node.add(nextLine.substr(0, mapping.generatedColumn));
          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
        }
        lastMapping = mapping;
      }, this);
      if (remainingLinesIndex < remainingLines.length) {
        if (lastMapping) {
          addMappingWithCode(lastMapping, shiftNextLine());
        }
        node.add(remainingLines.splice(remainingLinesIndex).join(""));
      }
      aSourceMapConsumer.sources.forEach(function(sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          if (aRelativePath != null) {
            sourceFile = util.join(aRelativePath, sourceFile);
          }
          node.setSourceContent(sourceFile, content);
        }
      });
      return node;
      function addMappingWithCode(mapping, code) {
        if (mapping === null || mapping.source === void 0) {
          node.add(code);
        } else {
          var source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
          node.add(new SourceNode(
            mapping.originalLine,
            mapping.originalColumn,
            source,
            code,
            mapping.name
          ));
        }
      }
    };
    SourceNode.prototype.add = function SourceNode_add(aChunk) {
      if (Array.isArray(aChunk)) {
        aChunk.forEach(function(chunk) {
          this.add(chunk);
        }, this);
      } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
        if (aChunk) {
          this.children.push(aChunk);
        }
      } else {
        throw new TypeError(
          "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
        );
      }
      return this;
    };
    SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
      if (Array.isArray(aChunk)) {
        for (var i = aChunk.length - 1; i >= 0; i--) {
          this.prepend(aChunk[i]);
        }
      } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
        this.children.unshift(aChunk);
      } else {
        throw new TypeError(
          "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
        );
      }
      return this;
    };
    SourceNode.prototype.walk = function SourceNode_walk(aFn) {
      var chunk;
      for (var i = 0, len = this.children.length; i < len; i++) {
        chunk = this.children[i];
        if (chunk[isSourceNode]) {
          chunk.walk(aFn);
        } else {
          if (chunk !== "") {
            aFn(chunk, {
              source: this.source,
              line: this.line,
              column: this.column,
              name: this.name
            });
          }
        }
      }
    };
    SourceNode.prototype.join = function SourceNode_join(aSep) {
      var newChildren;
      var i;
      var len = this.children.length;
      if (len > 0) {
        newChildren = [];
        for (i = 0; i < len - 1; i++) {
          newChildren.push(this.children[i]);
          newChildren.push(aSep);
        }
        newChildren.push(this.children[i]);
        this.children = newChildren;
      }
      return this;
    };
    SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
      var lastChild = this.children[this.children.length - 1];
      if (lastChild[isSourceNode]) {
        lastChild.replaceRight(aPattern, aReplacement);
      } else if (typeof lastChild === "string") {
        this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
      } else {
        this.children.push("".replace(aPattern, aReplacement));
      }
      return this;
    };
    SourceNode.prototype.setSourceContent = function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
      this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
    };
    SourceNode.prototype.walkSourceContents = function SourceNode_walkSourceContents(aFn) {
      for (var i = 0, len = this.children.length; i < len; i++) {
        if (this.children[i][isSourceNode]) {
          this.children[i].walkSourceContents(aFn);
        }
      }
      var sources = Object.keys(this.sourceContents);
      for (var i = 0, len = sources.length; i < len; i++) {
        aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
      }
    };
    SourceNode.prototype.toString = function SourceNode_toString() {
      var str = "";
      this.walk(function(chunk) {
        str += chunk;
      });
      return str;
    };
    SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
      var generated = {
        code: "",
        line: 1,
        column: 0
      };
      var map = new SourceMapGenerator(aArgs);
      var sourceMappingActive = false;
      var lastOriginalSource = null;
      var lastOriginalLine = null;
      var lastOriginalColumn = null;
      var lastOriginalName = null;
      this.walk(function(chunk, original) {
        generated.code += chunk;
        if (original.source !== null && original.line !== null && original.column !== null) {
          if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) {
            map.addMapping({
              source: original.source,
              original: {
                line: original.line,
                column: original.column
              },
              generated: {
                line: generated.line,
                column: generated.column
              },
              name: original.name
            });
          }
          lastOriginalSource = original.source;
          lastOriginalLine = original.line;
          lastOriginalColumn = original.column;
          lastOriginalName = original.name;
          sourceMappingActive = true;
        } else if (sourceMappingActive) {
          map.addMapping({
            generated: {
              line: generated.line,
              column: generated.column
            }
          });
          lastOriginalSource = null;
          sourceMappingActive = false;
        }
        for (var idx = 0, length = chunk.length; idx < length; idx++) {
          if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
            generated.line++;
            generated.column = 0;
            if (idx + 1 === length) {
              lastOriginalSource = null;
              sourceMappingActive = false;
            } else if (sourceMappingActive) {
              map.addMapping({
                source: original.source,
                original: {
                  line: original.line,
                  column: original.column
                },
                generated: {
                  line: generated.line,
                  column: generated.column
                },
                name: original.name
              });
            }
          } else {
            generated.column++;
          }
        }
      });
      this.walkSourceContents(function(sourceFile, sourceContent) {
        map.setSourceContent(sourceFile, sourceContent);
      });
      return { code: generated.code, map };
    };
    exports.SourceNode = SourceNode;
  }
});

// node_modules/source-map/source-map.js
var require_source_map = __commonJS({
  "node_modules/source-map/source-map.js"(exports) {
    "use strict";
    exports.SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
    exports.SourceMapConsumer = require_source_map_consumer().SourceMapConsumer;
    exports.SourceNode = require_source_node().SourceNode;
  }
});

// node_modules/handlebars/dist/cjs/handlebars/compiler/code-gen.js
var require_code_gen = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/compiler/code-gen.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    var _utils = require_utils3();
    var SourceNode = void 0;
    try {
      if (typeof define !== "function" || !define.amd) {
        SourceMap = require_source_map();
        SourceNode = SourceMap.SourceNode;
      }
    } catch (err) {
    }
    var SourceMap;
    if (!SourceNode) {
      SourceNode = function(line, column, srcFile, chunks) {
        this.src = "";
        if (chunks) {
          this.add(chunks);
        }
      };
      SourceNode.prototype = {
        add: function add(chunks) {
          if (_utils.isArray(chunks)) {
            chunks = chunks.join("");
          }
          this.src += chunks;
        },
        prepend: function prepend(chunks) {
          if (_utils.isArray(chunks)) {
            chunks = chunks.join("");
          }
          this.src = chunks + this.src;
        },
        toStringWithSourceMap: function toStringWithSourceMap() {
          return { code: this.toString() };
        },
        toString: function toString() {
          return this.src;
        }
      };
    }
    function castChunk(chunk, codeGen, loc) {
      if (_utils.isArray(chunk)) {
        var ret = [];
        for (var i = 0, len = chunk.length; i < len; i++) {
          ret.push(codeGen.wrap(chunk[i], loc));
        }
        return ret;
      } else if (typeof chunk === "boolean" || typeof chunk === "number") {
        return chunk + "";
      }
      return chunk;
    }
    function CodeGen(srcFile) {
      this.srcFile = srcFile;
      this.source = [];
    }
    CodeGen.prototype = {
      isEmpty: function isEmpty() {
        return !this.source.length;
      },
      prepend: function prepend(source, loc) {
        this.source.unshift(this.wrap(source, loc));
      },
      push: function push(source, loc) {
        this.source.push(this.wrap(source, loc));
      },
      merge: function merge() {
        var source = this.empty();
        this.each(function(line) {
          source.add(["  ", line, "\n"]);
        });
        return source;
      },
      each: function each(iter) {
        for (var i = 0, len = this.source.length; i < len; i++) {
          iter(this.source[i]);
        }
      },
      empty: function empty() {
        var loc = this.currentLocation || { start: {} };
        return new SourceNode(loc.start.line, loc.start.column, this.srcFile);
      },
      wrap: function wrap(chunk) {
        var loc = arguments.length <= 1 || arguments[1] === void 0 ? this.currentLocation || { start: {} } : arguments[1];
        if (chunk instanceof SourceNode) {
          return chunk;
        }
        chunk = castChunk(chunk, this, loc);
        return new SourceNode(loc.start.line, loc.start.column, this.srcFile, chunk);
      },
      functionCall: function functionCall(fn2, type, params) {
        params = this.generateList(params);
        return this.wrap([fn2, type ? "." + type + "(" : "(", params, ")"]);
      },
      quotedString: function quotedString(str) {
        return '"' + (str + "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + '"';
      },
      objectLiteral: function objectLiteral(obj) {
        var _this = this;
        var pairs = [];
        Object.keys(obj).forEach(function(key) {
          var value = castChunk(obj[key], _this);
          if (value !== "undefined") {
            pairs.push([_this.quotedString(key), ":", value]);
          }
        });
        var ret = this.generateList(pairs);
        ret.prepend("{");
        ret.add("}");
        return ret;
      },
      generateList: function generateList(entries) {
        var ret = this.empty();
        for (var i = 0, len = entries.length; i < len; i++) {
          if (i) {
            ret.add(",");
          }
          ret.add(castChunk(entries[i], this));
        }
        return ret;
      },
      generateArray: function generateArray(entries) {
        var ret = this.generateList(entries);
        ret.prepend("[");
        ret.add("]");
        return ret;
      }
    };
    exports["default"] = CodeGen;
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/compiler/javascript-compiler.js
var require_javascript_compiler = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/compiler/javascript-compiler.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _base = require_base();
    var _exception = require_exception();
    var _exception2 = _interopRequireDefault(_exception);
    var _utils = require_utils3();
    var _codeGen = require_code_gen();
    var _codeGen2 = _interopRequireDefault(_codeGen);
    function Literal(value) {
      this.value = value;
    }
    function JavaScriptCompiler() {
    }
    JavaScriptCompiler.prototype = {
      // PUBLIC API: You can override these methods in a subclass to provide
      // alternative compiled forms for name lookup and buffering semantics
      nameLookup: function nameLookup(parent, name) {
        return this.internalNameLookup(parent, name);
      },
      depthedLookup: function depthedLookup(name) {
        return [this.aliasable("container.lookup"), "(depths, ", JSON.stringify(name), ")"];
      },
      compilerInfo: function compilerInfo() {
        var revision = _base.COMPILER_REVISION, versions = _base.REVISION_CHANGES[revision];
        return [revision, versions];
      },
      appendToBuffer: function appendToBuffer(source, location, explicit) {
        if (!_utils.isArray(source)) {
          source = [source];
        }
        source = this.source.wrap(source, location);
        if (this.environment.isSimple) {
          return ["return ", source, ";"];
        } else if (explicit) {
          return ["buffer += ", source, ";"];
        } else {
          source.appendToBuffer = true;
          return source;
        }
      },
      initializeBuffer: function initializeBuffer() {
        return this.quotedString("");
      },
      // END PUBLIC API
      internalNameLookup: function internalNameLookup(parent, name) {
        this.lookupPropertyFunctionIsUsed = true;
        return ["lookupProperty(", parent, ",", JSON.stringify(name), ")"];
      },
      lookupPropertyFunctionIsUsed: false,
      compile: function compile(environment, options, context, asObject) {
        this.environment = environment;
        this.options = options;
        this.stringParams = this.options.stringParams;
        this.trackIds = this.options.trackIds;
        this.precompile = !asObject;
        this.name = this.environment.name;
        this.isChild = !!context;
        this.context = context || {
          decorators: [],
          programs: [],
          environments: []
        };
        this.preamble();
        this.stackSlot = 0;
        this.stackVars = [];
        this.aliases = {};
        this.registers = { list: [] };
        this.hashes = [];
        this.compileStack = [];
        this.inlineStack = [];
        this.blockParams = [];
        this.compileChildren(environment, options);
        this.useDepths = this.useDepths || environment.useDepths || environment.useDecorators || this.options.compat;
        this.useBlockParams = this.useBlockParams || environment.useBlockParams;
        var opcodes = environment.opcodes, opcode = void 0, firstLoc = void 0, i = void 0, l = void 0;
        for (i = 0, l = opcodes.length; i < l; i++) {
          opcode = opcodes[i];
          this.source.currentLocation = opcode.loc;
          firstLoc = firstLoc || opcode.loc;
          this[opcode.opcode].apply(this, opcode.args);
        }
        this.source.currentLocation = firstLoc;
        this.pushSource("");
        if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
          throw new _exception2["default"]("Compile completed with content left on stack");
        }
        if (!this.decorators.isEmpty()) {
          this.useDecorators = true;
          this.decorators.prepend(["var decorators = container.decorators, ", this.lookupPropertyFunctionVarDeclaration(), ";\n"]);
          this.decorators.push("return fn;");
          if (asObject) {
            this.decorators = Function.apply(this, ["fn", "props", "container", "depth0", "data", "blockParams", "depths", this.decorators.merge()]);
          } else {
            this.decorators.prepend("function(fn, props, container, depth0, data, blockParams, depths) {\n");
            this.decorators.push("}\n");
            this.decorators = this.decorators.merge();
          }
        } else {
          this.decorators = void 0;
        }
        var fn2 = this.createFunctionContext(asObject);
        if (!this.isChild) {
          var ret = {
            compiler: this.compilerInfo(),
            main: fn2
          };
          if (this.decorators) {
            ret.main_d = this.decorators;
            ret.useDecorators = true;
          }
          var _context = this.context;
          var programs = _context.programs;
          var decorators = _context.decorators;
          for (i = 0, l = programs.length; i < l; i++) {
            ret[i] = programs[i];
            if (decorators[i]) {
              ret[i + "_d"] = decorators[i];
              ret.useDecorators = true;
            }
          }
          if (this.environment.usePartial) {
            ret.usePartial = true;
          }
          if (this.options.data) {
            ret.useData = true;
          }
          if (this.useDepths) {
            ret.useDepths = true;
          }
          if (this.useBlockParams) {
            ret.useBlockParams = true;
          }
          if (this.options.compat) {
            ret.compat = true;
          }
          if (!asObject) {
            ret.compiler = JSON.stringify(ret.compiler);
            this.source.currentLocation = { start: { line: 1, column: 0 } };
            ret = this.objectLiteral(ret);
            if (options.srcName) {
              ret = ret.toStringWithSourceMap({ file: options.destName });
              ret.map = ret.map && ret.map.toString();
            } else {
              ret = ret.toString();
            }
          } else {
            ret.compilerOptions = this.options;
          }
          return ret;
        } else {
          return fn2;
        }
      },
      preamble: function preamble() {
        this.lastContext = 0;
        this.source = new _codeGen2["default"](this.options.srcName);
        this.decorators = new _codeGen2["default"](this.options.srcName);
      },
      createFunctionContext: function createFunctionContext(asObject) {
        var _this = this;
        var varDeclarations = "";
        var locals = this.stackVars.concat(this.registers.list);
        if (locals.length > 0) {
          varDeclarations += ", " + locals.join(", ");
        }
        var aliasCount = 0;
        Object.keys(this.aliases).forEach(function(alias) {
          var node = _this.aliases[alias];
          if (node.children && node.referenceCount > 1) {
            varDeclarations += ", alias" + ++aliasCount + "=" + alias;
            node.children[0] = "alias" + aliasCount;
          }
        });
        if (this.lookupPropertyFunctionIsUsed) {
          varDeclarations += ", " + this.lookupPropertyFunctionVarDeclaration();
        }
        var params = ["container", "depth0", "helpers", "partials", "data"];
        if (this.useBlockParams || this.useDepths) {
          params.push("blockParams");
        }
        if (this.useDepths) {
          params.push("depths");
        }
        var source = this.mergeSource(varDeclarations);
        if (asObject) {
          params.push(source);
          return Function.apply(this, params);
        } else {
          return this.source.wrap(["function(", params.join(","), ") {\n  ", source, "}"]);
        }
      },
      mergeSource: function mergeSource(varDeclarations) {
        var isSimple = this.environment.isSimple, appendOnly = !this.forceBuffer, appendFirst = void 0, sourceSeen = void 0, bufferStart = void 0, bufferEnd = void 0;
        this.source.each(function(line) {
          if (line.appendToBuffer) {
            if (bufferStart) {
              line.prepend("  + ");
            } else {
              bufferStart = line;
            }
            bufferEnd = line;
          } else {
            if (bufferStart) {
              if (!sourceSeen) {
                appendFirst = true;
              } else {
                bufferStart.prepend("buffer += ");
              }
              bufferEnd.add(";");
              bufferStart = bufferEnd = void 0;
            }
            sourceSeen = true;
            if (!isSimple) {
              appendOnly = false;
            }
          }
        });
        if (appendOnly) {
          if (bufferStart) {
            bufferStart.prepend("return ");
            bufferEnd.add(";");
          } else if (!sourceSeen) {
            this.source.push('return "";');
          }
        } else {
          varDeclarations += ", buffer = " + (appendFirst ? "" : this.initializeBuffer());
          if (bufferStart) {
            bufferStart.prepend("return buffer + ");
            bufferEnd.add(";");
          } else {
            this.source.push("return buffer;");
          }
        }
        if (varDeclarations) {
          this.source.prepend("var " + varDeclarations.substring(2) + (appendFirst ? "" : ";\n"));
        }
        return this.source.merge();
      },
      lookupPropertyFunctionVarDeclaration: function lookupPropertyFunctionVarDeclaration() {
        return "\n      lookupProperty = container.lookupProperty || function(parent, propertyName) {\n        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {\n          return parent[propertyName];\n        }\n        return undefined\n    }\n    ".trim();
      },
      // [blockValue]
      //
      // On stack, before: hash, inverse, program, value
      // On stack, after: return value of blockHelperMissing
      //
      // The purpose of this opcode is to take a block of the form
      // `{{#this.foo}}...{{/this.foo}}`, resolve the value of `foo`, and
      // replace it on the stack with the result of properly
      // invoking blockHelperMissing.
      blockValue: function blockValue(name) {
        var blockHelperMissing = this.aliasable("container.hooks.blockHelperMissing"), params = [this.contextName(0)];
        this.setupHelperArgs(name, 0, params);
        var blockName = this.popStack();
        params.splice(1, 0, blockName);
        this.push(this.source.functionCall(blockHelperMissing, "call", params));
      },
      // [ambiguousBlockValue]
      //
      // On stack, before: hash, inverse, program, value
      // Compiler value, before: lastHelper=value of last found helper, if any
      // On stack, after, if no lastHelper: same as [blockValue]
      // On stack, after, if lastHelper: value
      ambiguousBlockValue: function ambiguousBlockValue() {
        var blockHelperMissing = this.aliasable("container.hooks.blockHelperMissing"), params = [this.contextName(0)];
        this.setupHelperArgs("", 0, params, true);
        this.flushInline();
        var current = this.topStack();
        params.splice(1, 0, current);
        this.pushSource(["if (!", this.lastHelper, ") { ", current, " = ", this.source.functionCall(blockHelperMissing, "call", params), "}"]);
      },
      // [appendContent]
      //
      // On stack, before: ...
      // On stack, after: ...
      //
      // Appends the string value of `content` to the current buffer
      appendContent: function appendContent(content) {
        if (this.pendingContent) {
          content = this.pendingContent + content;
        } else {
          this.pendingLocation = this.source.currentLocation;
        }
        this.pendingContent = content;
      },
      // [append]
      //
      // On stack, before: value, ...
      // On stack, after: ...
      //
      // Coerces `value` to a String and appends it to the current buffer.
      //
      // If `value` is truthy, or 0, it is coerced into a string and appended
      // Otherwise, the empty string is appended
      append: function append() {
        if (this.isInline()) {
          this.replaceStack(function(current) {
            return [" != null ? ", current, ' : ""'];
          });
          this.pushSource(this.appendToBuffer(this.popStack()));
        } else {
          var local = this.popStack();
          this.pushSource(["if (", local, " != null) { ", this.appendToBuffer(local, void 0, true), " }"]);
          if (this.environment.isSimple) {
            this.pushSource(["else { ", this.appendToBuffer("''", void 0, true), " }"]);
          }
        }
      },
      // [appendEscaped]
      //
      // On stack, before: value, ...
      // On stack, after: ...
      //
      // Escape `value` and append it to the buffer
      appendEscaped: function appendEscaped() {
        this.pushSource(this.appendToBuffer([this.aliasable("container.escapeExpression"), "(", this.popStack(), ")"]));
      },
      // [getContext]
      //
      // On stack, before: ...
      // On stack, after: ...
      // Compiler value, after: lastContext=depth
      //
      // Set the value of the `lastContext` compiler value to the depth
      getContext: function getContext(depth) {
        this.lastContext = depth;
      },
      // [pushContext]
      //
      // On stack, before: ...
      // On stack, after: currentContext, ...
      //
      // Pushes the value of the current context onto the stack.
      pushContext: function pushContext() {
        this.pushStackLiteral(this.contextName(this.lastContext));
      },
      // [lookupOnContext]
      //
      // On stack, before: ...
      // On stack, after: currentContext[name], ...
      //
      // Looks up the value of `name` on the current context and pushes
      // it onto the stack.
      lookupOnContext: function lookupOnContext(parts, falsy, strict, scoped) {
        var i = 0;
        if (!scoped && this.options.compat && !this.lastContext) {
          this.push(this.depthedLookup(parts[i++]));
        } else {
          this.pushContext();
        }
        this.resolvePath("context", parts, i, falsy, strict);
      },
      // [lookupBlockParam]
      //
      // On stack, before: ...
      // On stack, after: blockParam[name], ...
      //
      // Looks up the value of `parts` on the given block param and pushes
      // it onto the stack.
      lookupBlockParam: function lookupBlockParam(blockParamId, parts) {
        this.useBlockParams = true;
        this.push(["blockParams[", blockParamId[0], "][", blockParamId[1], "]"]);
        this.resolvePath("context", parts, 1);
      },
      // [lookupData]
      //
      // On stack, before: ...
      // On stack, after: data, ...
      //
      // Push the data lookup operator
      lookupData: function lookupData(depth, parts, strict) {
        if (!depth) {
          this.pushStackLiteral("data");
        } else {
          this.pushStackLiteral("container.data(data, " + depth + ")");
        }
        this.resolvePath("data", parts, 0, true, strict);
      },
      resolvePath: function resolvePath(type, parts, startPartIndex, falsy, strict) {
        var _this2 = this;
        if (this.options.strict || this.options.assumeObjects) {
          this.push(strictLookup(this.options.strict && strict, this, parts, startPartIndex, type));
          return;
        }
        var len = parts.length;
        var _loop = function(i2) {
          _this2.replaceStack(function(current) {
            var lookup = _this2.nameLookup(current, parts[i2], type);
            if (!falsy) {
              return [" != null ? ", lookup, " : ", current];
            } else {
              return [" && ", lookup];
            }
          });
        };
        for (var i = startPartIndex; i < len; i++) {
          _loop(i);
        }
      },
      // [resolvePossibleLambda]
      //
      // On stack, before: value, ...
      // On stack, after: resolved value, ...
      //
      // If the `value` is a lambda, replace it on the stack by
      // the return value of the lambda
      resolvePossibleLambda: function resolvePossibleLambda() {
        this.push([this.aliasable("container.lambda"), "(", this.popStack(), ", ", this.contextName(0), ")"]);
      },
      // [pushStringParam]
      //
      // On stack, before: ...
      // On stack, after: string, currentContext, ...
      //
      // This opcode is designed for use in string mode, which
      // provides the string value of a parameter along with its
      // depth rather than resolving it immediately.
      pushStringParam: function pushStringParam(string, type) {
        this.pushContext();
        this.pushString(type);
        if (type !== "SubExpression") {
          if (typeof string === "string") {
            this.pushString(string);
          } else {
            this.pushStackLiteral(string);
          }
        }
      },
      emptyHash: function emptyHash(omitEmpty) {
        if (this.trackIds) {
          this.push("{}");
        }
        if (this.stringParams) {
          this.push("{}");
          this.push("{}");
        }
        this.pushStackLiteral(omitEmpty ? "undefined" : "{}");
      },
      pushHash: function pushHash() {
        if (this.hash) {
          this.hashes.push(this.hash);
        }
        this.hash = { values: {}, types: [], contexts: [], ids: [] };
      },
      popHash: function popHash() {
        var hash = this.hash;
        this.hash = this.hashes.pop();
        if (this.trackIds) {
          this.push(this.objectLiteral(hash.ids));
        }
        if (this.stringParams) {
          this.push(this.objectLiteral(hash.contexts));
          this.push(this.objectLiteral(hash.types));
        }
        this.push(this.objectLiteral(hash.values));
      },
      // [pushString]
      //
      // On stack, before: ...
      // On stack, after: quotedString(string), ...
      //
      // Push a quoted version of `string` onto the stack
      pushString: function pushString(string) {
        this.pushStackLiteral(this.quotedString(string));
      },
      // [pushLiteral]
      //
      // On stack, before: ...
      // On stack, after: value, ...
      //
      // Pushes a value onto the stack. This operation prevents
      // the compiler from creating a temporary variable to hold
      // it.
      pushLiteral: function pushLiteral(value) {
        this.pushStackLiteral(value);
      },
      // [pushProgram]
      //
      // On stack, before: ...
      // On stack, after: program(guid), ...
      //
      // Push a program expression onto the stack. This takes
      // a compile-time guid and converts it into a runtime-accessible
      // expression.
      pushProgram: function pushProgram(guid) {
        if (guid != null) {
          this.pushStackLiteral(this.programExpression(guid));
        } else {
          this.pushStackLiteral(null);
        }
      },
      // [registerDecorator]
      //
      // On stack, before: hash, program, params..., ...
      // On stack, after: ...
      //
      // Pops off the decorator's parameters, invokes the decorator,
      // and inserts the decorator into the decorators list.
      registerDecorator: function registerDecorator(paramSize, name) {
        var foundDecorator = this.nameLookup("decorators", name, "decorator"), options = this.setupHelperArgs(name, paramSize);
        this.decorators.push(["var decorator = ", foundDecorator, ";"]);
        this.decorators.push(['if (typeof decorator !== "function") { throw new Error(', this.quotedString('Missing decorator: "' + name + '"'), "); }"]);
        this.decorators.push(["fn = ", this.decorators.functionCall("decorator", "", ["fn", "props", "container", options]), " || fn;"]);
      },
      // [invokeHelper]
      //
      // On stack, before: hash, inverse, program, params..., ...
      // On stack, after: result of helper invocation
      //
      // Pops off the helper's parameters, invokes the helper,
      // and pushes the helper's return value onto the stack.
      //
      // If the helper is not found, `helperMissing` is called.
      invokeHelper: function invokeHelper(paramSize, name, isSimple) {
        var nonHelper = this.popStack(), helper = this.setupHelper(paramSize, name);
        var possibleFunctionCalls = [];
        if (isSimple) {
          possibleFunctionCalls.push(helper.name);
        }
        possibleFunctionCalls.push(nonHelper);
        if (!this.options.strict) {
          possibleFunctionCalls.push(this.aliasable("container.hooks.helperMissing"));
        }
        var functionLookupCode = ["(", this.itemsSeparatedBy(possibleFunctionCalls, "||"), ")"];
        var functionCall = this.source.functionCall(functionLookupCode, "call", helper.callParams);
        this.push(functionCall);
      },
      itemsSeparatedBy: function itemsSeparatedBy(items, separator) {
        var result = [];
        result.push(items[0]);
        for (var i = 1; i < items.length; i++) {
          result.push(separator, items[i]);
        }
        return result;
      },
      // [invokeKnownHelper]
      //
      // On stack, before: hash, inverse, program, params..., ...
      // On stack, after: result of helper invocation
      //
      // This operation is used when the helper is known to exist,
      // so a `helperMissing` fallback is not required.
      invokeKnownHelper: function invokeKnownHelper(paramSize, name) {
        var helper = this.setupHelper(paramSize, name);
        this.push(this.source.functionCall(helper.name, "call", helper.callParams));
      },
      // [invokeAmbiguous]
      //
      // On stack, before: hash, inverse, program, params..., ...
      // On stack, after: result of disambiguation
      //
      // This operation is used when an expression like `{{foo}}`
      // is provided, but we don't know at compile-time whether it
      // is a helper or a path.
      //
      // This operation emits more code than the other options,
      // and can be avoided by passing the `knownHelpers` and
      // `knownHelpersOnly` flags at compile-time.
      invokeAmbiguous: function invokeAmbiguous(name, helperCall) {
        this.useRegister("helper");
        var nonHelper = this.popStack();
        this.emptyHash();
        var helper = this.setupHelper(0, name, helperCall);
        var helperName = this.lastHelper = this.nameLookup("helpers", name, "helper");
        var lookup = ["(", "(helper = ", helperName, " || ", nonHelper, ")"];
        if (!this.options.strict) {
          lookup[0] = "(helper = ";
          lookup.push(" != null ? helper : ", this.aliasable("container.hooks.helperMissing"));
        }
        this.push(["(", lookup, helper.paramsInit ? ["),(", helper.paramsInit] : [], "),", "(typeof helper === ", this.aliasable('"function"'), " ? ", this.source.functionCall("helper", "call", helper.callParams), " : helper))"]);
      },
      // [invokePartial]
      //
      // On stack, before: context, ...
      // On stack after: result of partial invocation
      //
      // This operation pops off a context, invokes a partial with that context,
      // and pushes the result of the invocation back.
      invokePartial: function invokePartial(isDynamic, name, indent) {
        var params = [], options = this.setupParams(name, 1, params);
        if (isDynamic) {
          name = this.popStack();
          delete options.name;
        }
        if (indent) {
          options.indent = JSON.stringify(indent);
        }
        options.helpers = "helpers";
        options.partials = "partials";
        options.decorators = "container.decorators";
        if (!isDynamic) {
          params.unshift(this.nameLookup("partials", name, "partial"));
        } else {
          params.unshift(name);
        }
        if (this.options.compat) {
          options.depths = "depths";
        }
        options = this.objectLiteral(options);
        params.push(options);
        this.push(this.source.functionCall("container.invokePartial", "", params));
      },
      // [assignToHash]
      //
      // On stack, before: value, ..., hash, ...
      // On stack, after: ..., hash, ...
      //
      // Pops a value off the stack and assigns it to the current hash
      assignToHash: function assignToHash(key) {
        var value = this.popStack(), context = void 0, type = void 0, id = void 0;
        if (this.trackIds) {
          id = this.popStack();
        }
        if (this.stringParams) {
          type = this.popStack();
          context = this.popStack();
        }
        var hash = this.hash;
        if (context) {
          hash.contexts[key] = context;
        }
        if (type) {
          hash.types[key] = type;
        }
        if (id) {
          hash.ids[key] = id;
        }
        hash.values[key] = value;
      },
      pushId: function pushId(type, name, child) {
        if (type === "BlockParam") {
          this.pushStackLiteral("blockParams[" + name[0] + "].path[" + name[1] + "]" + (child ? " + " + JSON.stringify("." + child) : ""));
        } else if (type === "PathExpression") {
          this.pushString(name);
        } else if (type === "SubExpression") {
          this.pushStackLiteral("true");
        } else {
          this.pushStackLiteral("null");
        }
      },
      // HELPERS
      compiler: JavaScriptCompiler,
      compileChildren: function compileChildren(environment, options) {
        var children = environment.children, child = void 0, compiler = void 0;
        for (var i = 0, l = children.length; i < l; i++) {
          child = children[i];
          compiler = new this.compiler();
          var existing = this.matchExistingProgram(child);
          if (existing == null) {
            var index = this.context.programs.push("") - 1;
            child.index = index;
            child.name = "program" + index;
            this.context.programs[index] = compiler.compile(child, options, this.context, !this.precompile);
            this.context.decorators[index] = compiler.decorators;
            this.context.environments[index] = child;
            this.useDepths = this.useDepths || compiler.useDepths;
            this.useBlockParams = this.useBlockParams || compiler.useBlockParams;
            child.useDepths = this.useDepths;
            child.useBlockParams = this.useBlockParams;
          } else {
            child.index = existing.index;
            child.name = "program" + existing.index;
            this.useDepths = this.useDepths || existing.useDepths;
            this.useBlockParams = this.useBlockParams || existing.useBlockParams;
          }
        }
      },
      matchExistingProgram: function matchExistingProgram(child) {
        for (var i = 0, len = this.context.environments.length; i < len; i++) {
          var environment = this.context.environments[i];
          if (environment && environment.equals(child)) {
            return environment;
          }
        }
      },
      programExpression: function programExpression(guid) {
        var child = this.environment.children[guid], programParams = [child.index, "data", child.blockParams];
        if (this.useBlockParams || this.useDepths) {
          programParams.push("blockParams");
        }
        if (this.useDepths) {
          programParams.push("depths");
        }
        return "container.program(" + programParams.join(", ") + ")";
      },
      useRegister: function useRegister(name) {
        if (!this.registers[name]) {
          this.registers[name] = true;
          this.registers.list.push(name);
        }
      },
      push: function push(expr) {
        if (!(expr instanceof Literal)) {
          expr = this.source.wrap(expr);
        }
        this.inlineStack.push(expr);
        return expr;
      },
      pushStackLiteral: function pushStackLiteral(item) {
        this.push(new Literal(item));
      },
      pushSource: function pushSource(source) {
        if (this.pendingContent) {
          this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation));
          this.pendingContent = void 0;
        }
        if (source) {
          this.source.push(source);
        }
      },
      replaceStack: function replaceStack(callback) {
        var prefix = ["("], stack = void 0, createdStack = void 0, usedLiteral = void 0;
        if (!this.isInline()) {
          throw new _exception2["default"]("replaceStack on non-inline");
        }
        var top = this.popStack(true);
        if (top instanceof Literal) {
          stack = [top.value];
          prefix = ["(", stack];
          usedLiteral = true;
        } else {
          createdStack = true;
          var _name = this.incrStack();
          prefix = ["((", this.push(_name), " = ", top, ")"];
          stack = this.topStack();
        }
        var item = callback.call(this, stack);
        if (!usedLiteral) {
          this.popStack();
        }
        if (createdStack) {
          this.stackSlot--;
        }
        this.push(prefix.concat(item, ")"));
      },
      incrStack: function incrStack() {
        this.stackSlot++;
        if (this.stackSlot > this.stackVars.length) {
          this.stackVars.push("stack" + this.stackSlot);
        }
        return this.topStackName();
      },
      topStackName: function topStackName() {
        return "stack" + this.stackSlot;
      },
      flushInline: function flushInline() {
        var inlineStack = this.inlineStack;
        this.inlineStack = [];
        for (var i = 0, len = inlineStack.length; i < len; i++) {
          var entry = inlineStack[i];
          if (entry instanceof Literal) {
            this.compileStack.push(entry);
          } else {
            var stack = this.incrStack();
            this.pushSource([stack, " = ", entry, ";"]);
            this.compileStack.push(stack);
          }
        }
      },
      isInline: function isInline() {
        return this.inlineStack.length;
      },
      popStack: function popStack(wrapped) {
        var inline = this.isInline(), item = (inline ? this.inlineStack : this.compileStack).pop();
        if (!wrapped && item instanceof Literal) {
          return item.value;
        } else {
          if (!inline) {
            if (!this.stackSlot) {
              throw new _exception2["default"]("Invalid stack pop");
            }
            this.stackSlot--;
          }
          return item;
        }
      },
      topStack: function topStack() {
        var stack = this.isInline() ? this.inlineStack : this.compileStack, item = stack[stack.length - 1];
        if (item instanceof Literal) {
          return item.value;
        } else {
          return item;
        }
      },
      contextName: function contextName(context) {
        if (this.useDepths && context) {
          return "depths[" + context + "]";
        } else {
          return "depth" + context;
        }
      },
      quotedString: function quotedString(str) {
        return this.source.quotedString(str);
      },
      objectLiteral: function objectLiteral(obj) {
        return this.source.objectLiteral(obj);
      },
      aliasable: function aliasable(name) {
        var ret = this.aliases[name];
        if (ret) {
          ret.referenceCount++;
          return ret;
        }
        ret = this.aliases[name] = this.source.wrap(name);
        ret.aliasable = true;
        ret.referenceCount = 1;
        return ret;
      },
      setupHelper: function setupHelper(paramSize, name, blockHelper) {
        var params = [], paramsInit = this.setupHelperArgs(name, paramSize, params, blockHelper);
        var foundHelper = this.nameLookup("helpers", name, "helper"), callContext = this.aliasable(this.contextName(0) + " != null ? " + this.contextName(0) + " : (container.nullContext || {})");
        return {
          params,
          paramsInit,
          name: foundHelper,
          callParams: [callContext].concat(params)
        };
      },
      setupParams: function setupParams(helper, paramSize, params) {
        var options = {}, contexts = [], types = [], ids = [], objectArgs = !params, param = void 0;
        if (objectArgs) {
          params = [];
        }
        options.name = this.quotedString(helper);
        options.hash = this.popStack();
        if (this.trackIds) {
          options.hashIds = this.popStack();
        }
        if (this.stringParams) {
          options.hashTypes = this.popStack();
          options.hashContexts = this.popStack();
        }
        var inverse2 = this.popStack(), program3 = this.popStack();
        if (program3 || inverse2) {
          options.fn = program3 || "container.noop";
          options.inverse = inverse2 || "container.noop";
        }
        var i = paramSize;
        while (i--) {
          param = this.popStack();
          params[i] = param;
          if (this.trackIds) {
            ids[i] = this.popStack();
          }
          if (this.stringParams) {
            types[i] = this.popStack();
            contexts[i] = this.popStack();
          }
        }
        if (objectArgs) {
          options.args = this.source.generateArray(params);
        }
        if (this.trackIds) {
          options.ids = this.source.generateArray(ids);
        }
        if (this.stringParams) {
          options.types = this.source.generateArray(types);
          options.contexts = this.source.generateArray(contexts);
        }
        if (this.options.data) {
          options.data = "data";
        }
        if (this.useBlockParams) {
          options.blockParams = "blockParams";
        }
        return options;
      },
      setupHelperArgs: function setupHelperArgs(helper, paramSize, params, useRegister) {
        var options = this.setupParams(helper, paramSize, params);
        options.loc = JSON.stringify(this.source.currentLocation);
        options = this.objectLiteral(options);
        if (useRegister) {
          this.useRegister("options");
          params.push("options");
          return ["options=", options];
        } else if (params) {
          params.push(options);
          return "";
        } else {
          return options;
        }
      }
    };
    (function() {
      var reservedWords = "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield await null true false".split(" ");
      var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};
      for (var i = 0, l = reservedWords.length; i < l; i++) {
        compilerWords[reservedWords[i]] = true;
      }
    })();
    JavaScriptCompiler.isValidJavaScriptVariableName = function(name) {
      return !JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name);
    };
    function strictLookup(requireTerminal, compiler, parts, startPartIndex, type) {
      var stack = compiler.popStack(), len = parts.length;
      if (requireTerminal) {
        len--;
      }
      for (var i = startPartIndex; i < len; i++) {
        stack = compiler.nameLookup(stack, parts[i], type);
      }
      if (requireTerminal) {
        return [compiler.aliasable("container.strict"), "(", stack, ", ", compiler.quotedString(parts[len]), ", ", JSON.stringify(compiler.source.currentLocation), " )"];
      } else {
        return stack;
      }
    }
    exports["default"] = JavaScriptCompiler;
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars.js
var require_handlebars = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars.js"(exports, module) {
    "use strict";
    exports.__esModule = true;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _handlebarsRuntime = require_handlebars_runtime();
    var _handlebarsRuntime2 = _interopRequireDefault(_handlebarsRuntime);
    var _handlebarsCompilerAst = require_ast();
    var _handlebarsCompilerAst2 = _interopRequireDefault(_handlebarsCompilerAst);
    var _handlebarsCompilerBase = require_base2();
    var _handlebarsCompilerCompiler = require_compiler();
    var _handlebarsCompilerJavascriptCompiler = require_javascript_compiler();
    var _handlebarsCompilerJavascriptCompiler2 = _interopRequireDefault(_handlebarsCompilerJavascriptCompiler);
    var _handlebarsCompilerVisitor = require_visitor();
    var _handlebarsCompilerVisitor2 = _interopRequireDefault(_handlebarsCompilerVisitor);
    var _handlebarsNoConflict = require_no_conflict();
    var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);
    var _create = _handlebarsRuntime2["default"].create;
    function create() {
      var hb = _create();
      hb.compile = function(input, options) {
        return _handlebarsCompilerCompiler.compile(input, options, hb);
      };
      hb.precompile = function(input, options) {
        return _handlebarsCompilerCompiler.precompile(input, options, hb);
      };
      hb.AST = _handlebarsCompilerAst2["default"];
      hb.Compiler = _handlebarsCompilerCompiler.Compiler;
      hb.JavaScriptCompiler = _handlebarsCompilerJavascriptCompiler2["default"];
      hb.Parser = _handlebarsCompilerBase.parser;
      hb.parse = _handlebarsCompilerBase.parse;
      hb.parseWithoutProcessing = _handlebarsCompilerBase.parseWithoutProcessing;
      return hb;
    }
    var inst = create();
    inst.create = create;
    _handlebarsNoConflict2["default"](inst);
    inst.Visitor = _handlebarsCompilerVisitor2["default"];
    inst["default"] = inst;
    exports["default"] = inst;
    module.exports = exports["default"];
  }
});

// node_modules/handlebars/dist/cjs/handlebars/compiler/printer.js
var require_printer = __commonJS({
  "node_modules/handlebars/dist/cjs/handlebars/compiler/printer.js"(exports) {
    "use strict";
    exports.__esModule = true;
    exports.print = print;
    exports.PrintVisitor = PrintVisitor;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var _visitor = require_visitor();
    var _visitor2 = _interopRequireDefault(_visitor);
    function print(ast) {
      return new PrintVisitor().accept(ast);
    }
    function PrintVisitor() {
      this.padding = 0;
    }
    PrintVisitor.prototype = new _visitor2["default"]();
    PrintVisitor.prototype.pad = function(string) {
      var out = "";
      for (var i = 0, l = this.padding; i < l; i++) {
        out += "  ";
      }
      out += string + "\n";
      return out;
    };
    PrintVisitor.prototype.Program = function(program3) {
      var out = "", body = program3.body, i = void 0, l = void 0;
      if (program3.blockParams) {
        var blockParams = "BLOCK PARAMS: [";
        for (i = 0, l = program3.blockParams.length; i < l; i++) {
          blockParams += " " + program3.blockParams[i];
        }
        blockParams += " ]";
        out += this.pad(blockParams);
      }
      for (i = 0, l = body.length; i < l; i++) {
        out += this.accept(body[i]);
      }
      this.padding--;
      return out;
    };
    PrintVisitor.prototype.MustacheStatement = function(mustache) {
      return this.pad("{{ " + this.SubExpression(mustache) + " }}");
    };
    PrintVisitor.prototype.Decorator = function(mustache) {
      return this.pad("{{ DIRECTIVE " + this.SubExpression(mustache) + " }}");
    };
    PrintVisitor.prototype.BlockStatement = PrintVisitor.prototype.DecoratorBlock = function(block) {
      var out = "";
      out += this.pad((block.type === "DecoratorBlock" ? "DIRECTIVE " : "") + "BLOCK:");
      this.padding++;
      out += this.pad(this.SubExpression(block));
      if (block.program) {
        out += this.pad("PROGRAM:");
        this.padding++;
        out += this.accept(block.program);
        this.padding--;
      }
      if (block.inverse) {
        if (block.program) {
          this.padding++;
        }
        out += this.pad("{{^}}");
        this.padding++;
        out += this.accept(block.inverse);
        this.padding--;
        if (block.program) {
          this.padding--;
        }
      }
      this.padding--;
      return out;
    };
    PrintVisitor.prototype.PartialStatement = function(partial) {
      var content = "PARTIAL:" + partial.name.original;
      if (partial.params[0]) {
        content += " " + this.accept(partial.params[0]);
      }
      if (partial.hash) {
        content += " " + this.accept(partial.hash);
      }
      return this.pad("{{> " + content + " }}");
    };
    PrintVisitor.prototype.PartialBlockStatement = function(partial) {
      var content = "PARTIAL BLOCK:" + partial.name.original;
      if (partial.params[0]) {
        content += " " + this.accept(partial.params[0]);
      }
      if (partial.hash) {
        content += " " + this.accept(partial.hash);
      }
      content += " " + this.pad("PROGRAM:");
      this.padding++;
      content += this.accept(partial.program);
      this.padding--;
      return this.pad("{{> " + content + " }}");
    };
    PrintVisitor.prototype.ContentStatement = function(content) {
      return this.pad("CONTENT[ '" + content.value + "' ]");
    };
    PrintVisitor.prototype.CommentStatement = function(comment) {
      return this.pad("{{! '" + comment.value + "' }}");
    };
    PrintVisitor.prototype.SubExpression = function(sexpr) {
      var params = sexpr.params, paramStrings = [], hash = void 0;
      for (var i = 0, l = params.length; i < l; i++) {
        paramStrings.push(this.accept(params[i]));
      }
      params = "[" + paramStrings.join(", ") + "]";
      hash = sexpr.hash ? " " + this.accept(sexpr.hash) : "";
      return this.accept(sexpr.path) + " " + params + hash;
    };
    PrintVisitor.prototype.PathExpression = function(id) {
      var path11 = id.parts.join("/");
      return (id.data ? "@" : "") + "PATH:" + path11;
    };
    PrintVisitor.prototype.StringLiteral = function(string) {
      return '"' + string.value + '"';
    };
    PrintVisitor.prototype.NumberLiteral = function(number) {
      return "NUMBER{" + number.value + "}";
    };
    PrintVisitor.prototype.BooleanLiteral = function(bool) {
      return "BOOLEAN{" + bool.value + "}";
    };
    PrintVisitor.prototype.UndefinedLiteral = function() {
      return "UNDEFINED";
    };
    PrintVisitor.prototype.NullLiteral = function() {
      return "NULL";
    };
    PrintVisitor.prototype.Hash = function(hash) {
      var pairs = hash.pairs, joinedPairs = [];
      for (var i = 0, l = pairs.length; i < l; i++) {
        joinedPairs.push(this.accept(pairs[i]));
      }
      return "HASH{" + joinedPairs.join(", ") + "}";
    };
    PrintVisitor.prototype.HashPair = function(pair) {
      return pair.key + "=" + this.accept(pair.value);
    };
  }
});

// node_modules/handlebars/lib/index.js
var require_lib3 = __commonJS({
  "node_modules/handlebars/lib/index.js"(exports, module) {
    "use strict";
    var handlebars = require_handlebars()["default"];
    var printer = require_printer();
    handlebars.PrintVisitor = printer.PrintVisitor;
    handlebars.print = printer.print;
    module.exports = handlebars;
    function extension(module2, filename) {
      var fs10 = __require("fs");
      var templateString = fs10.readFileSync(filename, "utf8");
      module2.exports = handlebars.compile(templateString);
    }
    if (typeof __require !== "undefined" && __require.extensions) {
      __require.extensions[".handlebars"] = extension;
      __require.extensions[".hbs"] = extension;
    }
  }
});

// node_modules/commander/lib/error.js
var CommanderError = class extends Error {
  /**
   * Constructs the CommanderError class
   * @param {number} exitCode suggested exit code which could be used with process.exit
   * @param {string} code an id string representing the error
   * @param {string} message human-readable description of the error
   */
  constructor(exitCode, code, message) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.code = code;
    this.exitCode = exitCode;
    this.nestedError = void 0;
  }
};
var InvalidArgumentError = class extends CommanderError {
  /**
   * Constructs the InvalidArgumentError class
   * @param {string} [message] explanation of why argument is invalid
   */
  constructor(message) {
    super(1, "commander.invalidArgument", message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
};

// node_modules/commander/lib/argument.js
var Argument = class {
  /**
   * Initialize a new command argument with the given name and description.
   * The default is that the argument is required, and you can explicitly
   * indicate this with <> around the name. Put [] around the name for an optional argument.
   *
   * @param {string} name
   * @param {string} [description]
   */
  constructor(name, description) {
    this.description = description || "";
    this.variadic = false;
    this.parseArg = void 0;
    this.defaultValue = void 0;
    this.defaultValueDescription = void 0;
    this.argChoices = void 0;
    switch (name[0]) {
      case "<":
        this.required = true;
        this._name = name.slice(1, -1);
        break;
      case "[":
        this.required = false;
        this._name = name.slice(1, -1);
        break;
      default:
        this.required = true;
        this._name = name;
        break;
    }
    if (this._name.endsWith("...")) {
      this.variadic = true;
      this._name = this._name.slice(0, -3);
    }
  }
  /**
   * Return argument name.
   *
   * @return {string}
   */
  name() {
    return this._name;
  }
  /**
   * @package
   */
  _collectValue(value, previous) {
    if (previous === this.defaultValue || !Array.isArray(previous)) {
      return [value];
    }
    previous.push(value);
    return previous;
  }
  /**
   * Set the default value, and optionally supply the description to be displayed in the help.
   *
   * @param {*} value
   * @param {string} [description]
   * @return {Argument}
   */
  default(value, description) {
    this.defaultValue = value;
    this.defaultValueDescription = description;
    return this;
  }
  /**
   * Set the custom handler for processing CLI command arguments into argument values.
   *
   * @param {Function} [fn]
   * @return {Argument}
   */
  argParser(fn2) {
    this.parseArg = fn2;
    return this;
  }
  /**
   * Only allow argument value to be one of choices.
   *
   * @param {string[]} values
   * @return {Argument}
   */
  choices(values) {
    this.argChoices = values.slice();
    this.parseArg = (arg, previous) => {
      if (!this.argChoices.includes(arg)) {
        throw new InvalidArgumentError(
          `Allowed choices are ${this.argChoices.join(", ")}.`
        );
      }
      if (this.variadic) {
        return this._collectValue(arg, previous);
      }
      return arg;
    };
    return this;
  }
  /**
   * Make argument required.
   *
   * @returns {Argument}
   */
  argRequired() {
    this.required = true;
    return this;
  }
  /**
   * Make argument optional.
   *
   * @returns {Argument}
   */
  argOptional() {
    this.required = false;
    return this;
  }
};
function humanReadableArgName(arg) {
  const nameOutput = arg.name() + (arg.variadic === true ? "..." : "");
  return arg.required ? "<" + nameOutput + ">" : "[" + nameOutput + "]";
}

// node_modules/commander/lib/command.js
import { EventEmitter } from "events";
import childProcess from "child_process";
import path from "path";
import fs from "fs";
import process2 from "process";
import { stripVTControlCharacters as stripVTControlCharacters2 } from "util";

// node_modules/commander/lib/help.js
import { stripVTControlCharacters } from "util";
var Help = class {
  constructor() {
    this.helpWidth = void 0;
    this.minWidthToWrap = 40;
    this.sortSubcommands = false;
    this.sortOptions = false;
    this.showGlobalOptions = false;
  }
  /**
   * prepareContext is called by Commander after applying overrides from `Command.configureHelp()`
   * and just before calling `formatHelp()`.
   *
   * Commander just uses the helpWidth and the rest is provided for optional use by more complex subclasses.
   *
   * @param {{ error?: boolean, helpWidth?: number, outputHasColors?: boolean }} contextOptions
   */
  prepareContext(contextOptions) {
    this.helpWidth = this.helpWidth ?? contextOptions.helpWidth ?? 80;
  }
  /**
   * Get an array of the visible subcommands. Includes a placeholder for the implicit help command, if there is one.
   *
   * @param {Command} cmd
   * @returns {Command[]}
   */
  visibleCommands(cmd) {
    const visibleCommands = cmd.commands.filter((cmd2) => !cmd2._hidden);
    const helpCommand = cmd._getHelpCommand();
    if (helpCommand && !helpCommand._hidden) {
      visibleCommands.push(helpCommand);
    }
    if (this.sortSubcommands) {
      visibleCommands.sort((a, b2) => {
        return a.name().localeCompare(b2.name());
      });
    }
    return visibleCommands;
  }
  /**
   * Compare options for sort.
   *
   * @param {Option} a
   * @param {Option} b
   * @returns {number}
   */
  compareOptions(a, b2) {
    const getSortKey = (option) => {
      return option.short ? option.short.replace(/^-/, "") : option.long.replace(/^--/, "");
    };
    return getSortKey(a).localeCompare(getSortKey(b2));
  }
  /**
   * Get an array of the visible options. Includes a placeholder for the implicit help option, if there is one.
   *
   * @param {Command} cmd
   * @returns {Option[]}
   */
  visibleOptions(cmd) {
    const visibleOptions = cmd.options.filter((option) => !option.hidden);
    const helpOption = cmd._getHelpOption();
    if (helpOption && !helpOption.hidden) {
      const removeShort = helpOption.short && cmd._findOption(helpOption.short);
      const removeLong = helpOption.long && cmd._findOption(helpOption.long);
      if (!removeShort && !removeLong) {
        visibleOptions.push(helpOption);
      } else if (helpOption.long && !removeLong) {
        visibleOptions.push(
          cmd.createOption(helpOption.long, helpOption.description)
        );
      } else if (helpOption.short && !removeShort) {
        visibleOptions.push(
          cmd.createOption(helpOption.short, helpOption.description)
        );
      }
    }
    if (this.sortOptions) {
      visibleOptions.sort(this.compareOptions);
    }
    return visibleOptions;
  }
  /**
   * Get an array of the visible global options. (Not including help.)
   *
   * @param {Command} cmd
   * @returns {Option[]}
   */
  visibleGlobalOptions(cmd) {
    if (!this.showGlobalOptions) return [];
    const globalOptions = [];
    for (let ancestorCmd = cmd.parent; ancestorCmd; ancestorCmd = ancestorCmd.parent) {
      const visibleOptions = ancestorCmd.options.filter(
        (option) => !option.hidden
      );
      globalOptions.push(...visibleOptions);
    }
    if (this.sortOptions) {
      globalOptions.sort(this.compareOptions);
    }
    return globalOptions;
  }
  /**
   * Get an array of the arguments if any have a description.
   *
   * @param {Command} cmd
   * @returns {Argument[]}
   */
  visibleArguments(cmd) {
    if (cmd._argsDescription) {
      cmd.registeredArguments.forEach((argument) => {
        argument.description = argument.description || cmd._argsDescription[argument.name()] || "";
      });
    }
    if (cmd.registeredArguments.find((argument) => argument.description)) {
      return cmd.registeredArguments;
    }
    return [];
  }
  /**
   * Get the command term to show in the list of subcommands.
   *
   * @param {Command} cmd
   * @returns {string}
   */
  subcommandTerm(cmd) {
    const args = cmd.registeredArguments.map((arg) => humanReadableArgName(arg)).join(" ");
    return cmd._name + (cmd._aliases[0] ? "|" + cmd._aliases[0] : "") + (cmd.options.length ? " [options]" : "") + // simplistic check for non-help option
    (args ? " " + args : "");
  }
  /**
   * Get the option term to show in the list of options.
   *
   * @param {Option} option
   * @returns {string}
   */
  optionTerm(option) {
    return option.flags;
  }
  /**
   * Get the argument term to show in the list of arguments.
   *
   * @param {Argument} argument
   * @returns {string}
   */
  argumentTerm(argument) {
    return argument.name();
  }
  /**
   * Get the longest command term length.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {number}
   */
  longestSubcommandTermLength(cmd, helper) {
    return helper.visibleCommands(cmd).reduce((max, command) => {
      return Math.max(
        max,
        this.displayWidth(
          helper.styleSubcommandTerm(helper.subcommandTerm(command))
        )
      );
    }, 0);
  }
  /**
   * Get the longest option term length.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {number}
   */
  longestOptionTermLength(cmd, helper) {
    return helper.visibleOptions(cmd).reduce((max, option) => {
      return Math.max(
        max,
        this.displayWidth(helper.styleOptionTerm(helper.optionTerm(option)))
      );
    }, 0);
  }
  /**
   * Get the longest global option term length.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {number}
   */
  longestGlobalOptionTermLength(cmd, helper) {
    return helper.visibleGlobalOptions(cmd).reduce((max, option) => {
      return Math.max(
        max,
        this.displayWidth(helper.styleOptionTerm(helper.optionTerm(option)))
      );
    }, 0);
  }
  /**
   * Get the longest argument term length.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {number}
   */
  longestArgumentTermLength(cmd, helper) {
    return helper.visibleArguments(cmd).reduce((max, argument) => {
      return Math.max(
        max,
        this.displayWidth(
          helper.styleArgumentTerm(helper.argumentTerm(argument))
        )
      );
    }, 0);
  }
  /**
   * Get the command usage to be displayed at the top of the built-in help.
   *
   * @param {Command} cmd
   * @returns {string}
   */
  commandUsage(cmd) {
    let cmdName = cmd._name;
    if (cmd._aliases[0]) {
      cmdName = cmdName + "|" + cmd._aliases[0];
    }
    let ancestorCmdNames = "";
    for (let ancestorCmd = cmd.parent; ancestorCmd; ancestorCmd = ancestorCmd.parent) {
      ancestorCmdNames = ancestorCmd.name() + " " + ancestorCmdNames;
    }
    return ancestorCmdNames + cmdName + " " + cmd.usage();
  }
  /**
   * Get the description for the command.
   *
   * @param {Command} cmd
   * @returns {string}
   */
  commandDescription(cmd) {
    return cmd.description();
  }
  /**
   * Get the subcommand summary to show in the list of subcommands.
   * (Fallback to description for backwards compatibility.)
   *
   * @param {Command} cmd
   * @returns {string}
   */
  subcommandDescription(cmd) {
    return cmd.summary() || cmd.description();
  }
  /**
   * Get the option description to show in the list of options.
   *
   * @param {Option} option
   * @return {string}
   */
  optionDescription(option) {
    const extraInfo = [];
    if (option.argChoices) {
      extraInfo.push(
        // use stringify to match the display of the default value
        `choices: ${option.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`
      );
    }
    if (option.defaultValue !== void 0) {
      const showDefault = option.required || option.optional || option.isBoolean() && typeof option.defaultValue === "boolean";
      if (showDefault) {
        extraInfo.push(
          `default: ${option.defaultValueDescription || JSON.stringify(option.defaultValue)}`
        );
      }
    }
    if (option.presetArg !== void 0 && option.optional) {
      extraInfo.push(`preset: ${JSON.stringify(option.presetArg)}`);
    }
    if (option.envVar !== void 0) {
      extraInfo.push(`env: ${option.envVar}`);
    }
    if (extraInfo.length > 0) {
      const extraDescription = `(${extraInfo.join(", ")})`;
      if (option.description) {
        return `${option.description} ${extraDescription}`;
      }
      return extraDescription;
    }
    return option.description;
  }
  /**
   * Get the argument description to show in the list of arguments.
   *
   * @param {Argument} argument
   * @return {string}
   */
  argumentDescription(argument) {
    const extraInfo = [];
    if (argument.argChoices) {
      extraInfo.push(
        // use stringify to match the display of the default value
        `choices: ${argument.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`
      );
    }
    if (argument.defaultValue !== void 0) {
      extraInfo.push(
        `default: ${argument.defaultValueDescription || JSON.stringify(argument.defaultValue)}`
      );
    }
    if (extraInfo.length > 0) {
      const extraDescription = `(${extraInfo.join(", ")})`;
      if (argument.description) {
        return `${argument.description} ${extraDescription}`;
      }
      return extraDescription;
    }
    return argument.description;
  }
  /**
   * Format a list of items, given a heading and an array of formatted items.
   *
   * @param {string} heading
   * @param {string[]} items
   * @param {Help} helper
   * @returns string[]
   */
  formatItemList(heading, items, helper) {
    if (items.length === 0) return [];
    return [helper.styleTitle(heading), ...items, ""];
  }
  /**
   * Group items by their help group heading.
   *
   * @param {Command[] | Option[]} unsortedItems
   * @param {Command[] | Option[]} visibleItems
   * @param {Function} getGroup
   * @returns {Map<string, Command[] | Option[]>}
   */
  groupItems(unsortedItems, visibleItems, getGroup) {
    const result = /* @__PURE__ */ new Map();
    unsortedItems.forEach((item) => {
      const group = getGroup(item);
      if (!result.has(group)) result.set(group, []);
    });
    visibleItems.forEach((item) => {
      const group = getGroup(item);
      if (!result.has(group)) {
        result.set(group, []);
      }
      result.get(group).push(item);
    });
    return result;
  }
  /**
   * Generate the built-in help text.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {string}
   */
  formatHelp(cmd, helper) {
    const termWidth = helper.padWidth(cmd, helper);
    const helpWidth = helper.helpWidth ?? 80;
    function callFormatItem(term, description) {
      return helper.formatItem(term, termWidth, description, helper);
    }
    let output = [
      `${helper.styleTitle("Usage:")} ${helper.styleUsage(helper.commandUsage(cmd))}`,
      ""
    ];
    const commandDescription = helper.commandDescription(cmd);
    if (commandDescription.length > 0) {
      output = output.concat([
        helper.boxWrap(
          helper.styleCommandDescription(commandDescription),
          helpWidth
        ),
        ""
      ]);
    }
    const argumentList = helper.visibleArguments(cmd).map((argument) => {
      return callFormatItem(
        helper.styleArgumentTerm(helper.argumentTerm(argument)),
        helper.styleArgumentDescription(helper.argumentDescription(argument))
      );
    });
    output = output.concat(
      this.formatItemList("Arguments:", argumentList, helper)
    );
    const optionGroups = this.groupItems(
      cmd.options,
      helper.visibleOptions(cmd),
      (option) => option.helpGroupHeading ?? "Options:"
    );
    optionGroups.forEach((options, group) => {
      const optionList = options.map((option) => {
        return callFormatItem(
          helper.styleOptionTerm(helper.optionTerm(option)),
          helper.styleOptionDescription(helper.optionDescription(option))
        );
      });
      output = output.concat(this.formatItemList(group, optionList, helper));
    });
    if (helper.showGlobalOptions) {
      const globalOptionList = helper.visibleGlobalOptions(cmd).map((option) => {
        return callFormatItem(
          helper.styleOptionTerm(helper.optionTerm(option)),
          helper.styleOptionDescription(helper.optionDescription(option))
        );
      });
      output = output.concat(
        this.formatItemList("Global Options:", globalOptionList, helper)
      );
    }
    const commandGroups = this.groupItems(
      cmd.commands,
      helper.visibleCommands(cmd),
      (sub) => sub.helpGroup() || "Commands:"
    );
    commandGroups.forEach((commands, group) => {
      const commandList = commands.map((sub) => {
        return callFormatItem(
          helper.styleSubcommandTerm(helper.subcommandTerm(sub)),
          helper.styleSubcommandDescription(helper.subcommandDescription(sub))
        );
      });
      output = output.concat(this.formatItemList(group, commandList, helper));
    });
    return output.join("\n");
  }
  /**
   * Return display width of string, ignoring ANSI escape sequences. Used in padding and wrapping calculations.
   *
   * @param {string} str
   * @returns {number}
   */
  displayWidth(str) {
    return stripVTControlCharacters(str).length;
  }
  /**
   * Style the title for displaying in the help. Called with 'Usage:', 'Options:', etc.
   *
   * @param {string} str
   * @returns {string}
   */
  styleTitle(str) {
    return str;
  }
  styleUsage(str) {
    return str.split(" ").map((word) => {
      if (word === "[options]") return this.styleOptionText(word);
      if (word === "[command]") return this.styleSubcommandText(word);
      if (word[0] === "[" || word[0] === "<")
        return this.styleArgumentText(word);
      return this.styleCommandText(word);
    }).join(" ");
  }
  styleCommandDescription(str) {
    return this.styleDescriptionText(str);
  }
  styleOptionDescription(str) {
    return this.styleDescriptionText(str);
  }
  styleSubcommandDescription(str) {
    return this.styleDescriptionText(str);
  }
  styleArgumentDescription(str) {
    return this.styleDescriptionText(str);
  }
  styleDescriptionText(str) {
    return str;
  }
  styleOptionTerm(str) {
    return this.styleOptionText(str);
  }
  styleSubcommandTerm(str) {
    return str.split(" ").map((word) => {
      if (word === "[options]") return this.styleOptionText(word);
      if (word[0] === "[" || word[0] === "<")
        return this.styleArgumentText(word);
      return this.styleSubcommandText(word);
    }).join(" ");
  }
  styleArgumentTerm(str) {
    return this.styleArgumentText(str);
  }
  styleOptionText(str) {
    return str;
  }
  styleArgumentText(str) {
    return str;
  }
  styleSubcommandText(str) {
    return str;
  }
  styleCommandText(str) {
    return str;
  }
  /**
   * Calculate the pad width from the maximum term length.
   *
   * @param {Command} cmd
   * @param {Help} helper
   * @returns {number}
   */
  padWidth(cmd, helper) {
    return Math.max(
      helper.longestOptionTermLength(cmd, helper),
      helper.longestGlobalOptionTermLength(cmd, helper),
      helper.longestSubcommandTermLength(cmd, helper),
      helper.longestArgumentTermLength(cmd, helper)
    );
  }
  /**
   * Detect manually wrapped and indented strings by checking for line break followed by whitespace.
   *
   * @param {string} str
   * @returns {boolean}
   */
  preformatted(str) {
    return /\n[^\S\r\n]/.test(str);
  }
  /**
   * Format the "item", which consists of a term and description. Pad the term and wrap the description, indenting the following lines.
   *
   * So "TTT", 5, "DDD DDDD DD DDD" might be formatted for this.helpWidth=17 like so:
   *   TTT  DDD DDDD
   *        DD DDD
   *
   * @param {string} term
   * @param {number} termWidth
   * @param {string} description
   * @param {Help} helper
   * @returns {string}
   */
  formatItem(term, termWidth, description, helper) {
    const itemIndent = 2;
    const itemIndentStr = " ".repeat(itemIndent);
    if (!description) return itemIndentStr + term;
    const paddedTerm = term.padEnd(
      termWidth + term.length - helper.displayWidth(term)
    );
    const spacerWidth = 2;
    const helpWidth = this.helpWidth ?? 80;
    const remainingWidth = helpWidth - termWidth - spacerWidth - itemIndent;
    let formattedDescription;
    if (remainingWidth < this.minWidthToWrap || helper.preformatted(description)) {
      formattedDescription = description;
    } else {
      const wrappedDescription = helper.boxWrap(description, remainingWidth);
      formattedDescription = wrappedDescription.replace(
        /\n/g,
        "\n" + " ".repeat(termWidth + spacerWidth)
      );
    }
    return itemIndentStr + paddedTerm + " ".repeat(spacerWidth) + formattedDescription.replace(/\n/g, `
${itemIndentStr}`);
  }
  /**
   * Wrap a string at whitespace, preserving existing line breaks.
   * Wrapping is skipped if the width is less than `minWidthToWrap`.
   *
   * @param {string} str
   * @param {number} width
   * @returns {string}
   */
  boxWrap(str, width) {
    if (width < this.minWidthToWrap) return str;
    const rawLines = str.split(/\r\n|\n/);
    const chunkPattern = /[\s]*[^\s]+/g;
    const wrappedLines = [];
    rawLines.forEach((line) => {
      const chunks = line.match(chunkPattern);
      if (chunks === null) {
        wrappedLines.push("");
        return;
      }
      let sumChunks = [chunks.shift()];
      let sumWidth = this.displayWidth(sumChunks[0]);
      chunks.forEach((chunk) => {
        const visibleWidth = this.displayWidth(chunk);
        if (sumWidth + visibleWidth <= width) {
          sumChunks.push(chunk);
          sumWidth += visibleWidth;
          return;
        }
        wrappedLines.push(sumChunks.join(""));
        const nextChunk = chunk.trimStart();
        sumChunks = [nextChunk];
        sumWidth = this.displayWidth(nextChunk);
      });
      wrappedLines.push(sumChunks.join(""));
    });
    return wrappedLines.join("\n");
  }
};

// node_modules/commander/lib/option.js
var Option = class {
  /**
   * Initialize a new `Option` with the given `flags` and `description`.
   *
   * @param {string} flags
   * @param {string} [description]
   */
  constructor(flags, description) {
    this.flags = flags;
    this.description = description || "";
    this.required = flags.includes("<");
    this.optional = flags.includes("[");
    this.variadic = /\w\.\.\.[>\]]$/.test(flags);
    this.mandatory = false;
    const optionFlags = splitOptionFlags(flags);
    this.short = optionFlags.shortFlag;
    this.long = optionFlags.longFlag;
    this.negate = false;
    if (this.long) {
      this.negate = this.long.startsWith("--no-");
    }
    this.defaultValue = void 0;
    this.defaultValueDescription = void 0;
    this.presetArg = void 0;
    this.envVar = void 0;
    this.parseArg = void 0;
    this.hidden = false;
    this.argChoices = void 0;
    this.conflictsWith = [];
    this.implied = void 0;
    this.helpGroupHeading = void 0;
  }
  /**
   * Set the default value, and optionally supply the description to be displayed in the help.
   *
   * @param {*} value
   * @param {string} [description]
   * @return {Option}
   */
  default(value, description) {
    this.defaultValue = value;
    this.defaultValueDescription = description;
    return this;
  }
  /**
   * Preset to use when option used without option-argument, especially optional but also boolean and negated.
   * The custom processing (parseArg) is called.
   *
   * @example
   * new Option('--color').default('GREYSCALE').preset('RGB');
   * new Option('--donate [amount]').preset('20').argParser(parseFloat);
   *
   * @param {*} arg
   * @return {Option}
   */
  preset(arg) {
    this.presetArg = arg;
    return this;
  }
  /**
   * Add option name(s) that conflict with this option.
   * An error will be displayed if conflicting options are found during parsing.
   *
   * @example
   * new Option('--rgb').conflicts('cmyk');
   * new Option('--js').conflicts(['ts', 'jsx']);
   *
   * @param {(string | string[])} names
   * @return {Option}
   */
  conflicts(names) {
    this.conflictsWith = this.conflictsWith.concat(names);
    return this;
  }
  /**
   * Specify implied option values for when this option is set and the implied options are not.
   *
   * The custom processing (parseArg) is not called on the implied values.
   *
   * @example
   * program
   *   .addOption(new Option('--log', 'write logging information to file'))
   *   .addOption(new Option('--trace', 'log extra details').implies({ log: 'trace.txt' }));
   *
   * @param {object} impliedOptionValues
   * @return {Option}
   */
  implies(impliedOptionValues) {
    let newImplied = impliedOptionValues;
    if (typeof impliedOptionValues === "string") {
      newImplied = { [impliedOptionValues]: true };
    }
    this.implied = Object.assign(this.implied || {}, newImplied);
    return this;
  }
  /**
   * Set environment variable to check for option value.
   *
   * An environment variable is only used if when processed the current option value is
   * undefined, or the source of the current value is 'default' or 'config' or 'env'.
   *
   * @param {string} name
   * @return {Option}
   */
  env(name) {
    this.envVar = name;
    return this;
  }
  /**
   * Set the custom handler for processing CLI option arguments into option values.
   *
   * @param {Function} [fn]
   * @return {Option}
   */
  argParser(fn2) {
    this.parseArg = fn2;
    return this;
  }
  /**
   * Whether the option is mandatory and must have a value after parsing.
   *
   * @param {boolean} [mandatory=true]
   * @return {Option}
   */
  makeOptionMandatory(mandatory = true) {
    this.mandatory = !!mandatory;
    return this;
  }
  /**
   * Hide option in help.
   *
   * @param {boolean} [hide=true]
   * @return {Option}
   */
  hideHelp(hide = true) {
    this.hidden = !!hide;
    return this;
  }
  /**
   * @package
   */
  _collectValue(value, previous) {
    if (previous === this.defaultValue || !Array.isArray(previous)) {
      return [value];
    }
    previous.push(value);
    return previous;
  }
  /**
   * Only allow option value to be one of choices.
   *
   * @param {string[]} values
   * @return {Option}
   */
  choices(values) {
    this.argChoices = values.slice();
    this.parseArg = (arg, previous) => {
      if (!this.argChoices.includes(arg)) {
        throw new InvalidArgumentError(
          `Allowed choices are ${this.argChoices.join(", ")}.`
        );
      }
      if (this.variadic) {
        return this._collectValue(arg, previous);
      }
      return arg;
    };
    return this;
  }
  /**
   * Return option name.
   *
   * @return {string}
   */
  name() {
    if (this.long) {
      return this.long.replace(/^--/, "");
    }
    return this.short.replace(/^-/, "");
  }
  /**
   * Return option name, in a camelcase format that can be used
   * as an object attribute key.
   *
   * @return {string}
   */
  attributeName() {
    if (this.negate) {
      return camelcase(this.name().replace(/^no-/, ""));
    }
    return camelcase(this.name());
  }
  /**
   * Set the help group heading.
   *
   * @param {string} heading
   * @return {Option}
   */
  helpGroup(heading) {
    this.helpGroupHeading = heading;
    return this;
  }
  /**
   * Check if `arg` matches the short or long flag.
   *
   * @param {string} arg
   * @return {boolean}
   * @package
   */
  is(arg) {
    return this.short === arg || this.long === arg;
  }
  /**
   * Return whether a boolean option.
   *
   * Options are one of boolean, negated, required argument, or optional argument.
   *
   * @return {boolean}
   * @package
   */
  isBoolean() {
    return !this.required && !this.optional && !this.negate;
  }
};
var DualOptions = class {
  /**
   * @param {Option[]} options
   */
  constructor(options) {
    this.positiveOptions = /* @__PURE__ */ new Map();
    this.negativeOptions = /* @__PURE__ */ new Map();
    this.dualOptions = /* @__PURE__ */ new Set();
    options.forEach((option) => {
      if (option.negate) {
        this.negativeOptions.set(option.attributeName(), option);
      } else {
        this.positiveOptions.set(option.attributeName(), option);
      }
    });
    this.negativeOptions.forEach((value, key) => {
      if (this.positiveOptions.has(key)) {
        this.dualOptions.add(key);
      }
    });
  }
  /**
   * Did the value come from the option, and not from possible matching dual option?
   *
   * @param {*} value
   * @param {Option} option
   * @returns {boolean}
   */
  valueFromOption(value, option) {
    const optionKey = option.attributeName();
    if (!this.dualOptions.has(optionKey)) return true;
    const preset = this.negativeOptions.get(optionKey).presetArg;
    const negativeValue = preset !== void 0 ? preset : false;
    return option.negate === (negativeValue === value);
  }
};
function camelcase(str) {
  return str.split("-").reduce((str2, word) => {
    return str2 + word[0].toUpperCase() + word.slice(1);
  });
}
function splitOptionFlags(flags) {
  let shortFlag;
  let longFlag;
  const shortFlagExp = /^-[^-]$/;
  const longFlagExp = /^--[^-]/;
  const flagParts = flags.split(/[ |,]+/).concat("guard");
  if (shortFlagExp.test(flagParts[0])) shortFlag = flagParts.shift();
  if (longFlagExp.test(flagParts[0])) longFlag = flagParts.shift();
  if (!shortFlag && shortFlagExp.test(flagParts[0]))
    shortFlag = flagParts.shift();
  if (!shortFlag && longFlagExp.test(flagParts[0])) {
    shortFlag = longFlag;
    longFlag = flagParts.shift();
  }
  if (flagParts[0].startsWith("-")) {
    const unsupportedFlag = flagParts[0];
    const baseError = `option creation failed due to '${unsupportedFlag}' in option flags '${flags}'`;
    if (/^-[^-][^-]/.test(unsupportedFlag))
      throw new Error(
        `${baseError}
- a short flag is a single dash and a single character
  - either use a single dash and a single character (for a short flag)
  - or use a double dash for a long option (and can have two, like '--ws, --workspace')`
      );
    if (shortFlagExp.test(unsupportedFlag))
      throw new Error(`${baseError}
- too many short flags`);
    if (longFlagExp.test(unsupportedFlag))
      throw new Error(`${baseError}
- too many long flags`);
    throw new Error(`${baseError}
- unrecognised flag format`);
  }
  if (shortFlag === void 0 && longFlag === void 0)
    throw new Error(
      `option creation failed due to no flags found in '${flags}'.`
    );
  return { shortFlag, longFlag };
}

// node_modules/commander/lib/suggestSimilar.js
var maxDistance = 3;
function editDistance(a, b2) {
  if (Math.abs(a.length - b2.length) > maxDistance)
    return Math.max(a.length, b2.length);
  const d = [];
  for (let i = 0; i <= a.length; i++) {
    d[i] = [i];
  }
  for (let j3 = 0; j3 <= b2.length; j3++) {
    d[0][j3] = j3;
  }
  for (let j3 = 1; j3 <= b2.length; j3++) {
    for (let i = 1; i <= a.length; i++) {
      let cost;
      if (a[i - 1] === b2[j3 - 1]) {
        cost = 0;
      } else {
        cost = 1;
      }
      d[i][j3] = Math.min(
        d[i - 1][j3] + 1,
        // deletion
        d[i][j3 - 1] + 1,
        // insertion
        d[i - 1][j3 - 1] + cost
        // substitution
      );
      if (i > 1 && j3 > 1 && a[i - 1] === b2[j3 - 2] && a[i - 2] === b2[j3 - 1]) {
        d[i][j3] = Math.min(d[i][j3], d[i - 2][j3 - 2] + 1);
      }
    }
  }
  return d[a.length][b2.length];
}
function suggestSimilar(word, candidates) {
  if (!candidates || candidates.length === 0) return "";
  candidates = Array.from(new Set(candidates));
  const searchingOptions = word.startsWith("--");
  if (searchingOptions) {
    word = word.slice(2);
    candidates = candidates.map((candidate) => candidate.slice(2));
  }
  let similar = [];
  let bestDistance = maxDistance;
  const minSimilarity = 0.4;
  candidates.forEach((candidate) => {
    if (candidate.length <= 1) return;
    const distance = editDistance(word, candidate);
    const length = Math.max(word.length, candidate.length);
    const similarity = (length - distance) / length;
    if (similarity > minSimilarity) {
      if (distance < bestDistance) {
        bestDistance = distance;
        similar = [candidate];
      } else if (distance === bestDistance) {
        similar.push(candidate);
      }
    }
  });
  similar.sort((a, b2) => a.localeCompare(b2));
  if (searchingOptions) {
    similar = similar.map((candidate) => `--${candidate}`);
  }
  if (similar.length > 1) {
    return `
(Did you mean one of ${similar.join(", ")}?)`;
  }
  if (similar.length === 1) {
    return `
(Did you mean ${similar[0]}?)`;
  }
  return "";
}

// node_modules/commander/lib/command.js
var Command = class _Command extends EventEmitter {
  /**
   * Initialize a new `Command`.
   *
   * @param {string} [name]
   */
  constructor(name) {
    super();
    this.commands = [];
    this.options = [];
    this.parent = null;
    this._allowUnknownOption = false;
    this._allowExcessArguments = false;
    this.registeredArguments = [];
    this._args = this.registeredArguments;
    this.args = [];
    this.rawArgs = [];
    this.processedArgs = [];
    this._scriptPath = null;
    this._name = name || "";
    this._optionValues = {};
    this._optionValueSources = {};
    this._storeOptionsAsProperties = false;
    this._actionHandler = null;
    this._executableHandler = false;
    this._executableFile = null;
    this._executableDir = null;
    this._defaultCommandName = null;
    this._exitCallback = null;
    this._aliases = [];
    this._combineFlagAndOptionalValue = true;
    this._description = "";
    this._summary = "";
    this._argsDescription = void 0;
    this._enablePositionalOptions = false;
    this._passThroughOptions = false;
    this._lifeCycleHooks = {};
    this._showHelpAfterError = false;
    this._showSuggestionAfterError = true;
    this._savedState = null;
    this._outputConfiguration = {
      writeOut: (str) => process2.stdout.write(str),
      writeErr: (str) => process2.stderr.write(str),
      outputError: (str, write) => write(str),
      getOutHelpWidth: () => process2.stdout.isTTY ? process2.stdout.columns : void 0,
      getErrHelpWidth: () => process2.stderr.isTTY ? process2.stderr.columns : void 0,
      getOutHasColors: () => useColor() ?? (process2.stdout.isTTY && process2.stdout.hasColors?.()),
      getErrHasColors: () => useColor() ?? (process2.stderr.isTTY && process2.stderr.hasColors?.()),
      stripColor: (str) => stripVTControlCharacters2(str)
    };
    this._hidden = false;
    this._helpOption = void 0;
    this._addImplicitHelpCommand = void 0;
    this._helpCommand = void 0;
    this._helpConfiguration = {};
    this._helpGroupHeading = void 0;
    this._defaultCommandGroup = void 0;
    this._defaultOptionGroup = void 0;
  }
  /**
   * Copy settings that are useful to have in common across root command and subcommands.
   *
   * (Used internally when adding a command using `.command()` so subcommands inherit parent settings.)
   *
   * @param {Command} sourceCommand
   * @return {Command} `this` command for chaining
   */
  copyInheritedSettings(sourceCommand) {
    this._outputConfiguration = sourceCommand._outputConfiguration;
    this._helpOption = sourceCommand._helpOption;
    this._helpCommand = sourceCommand._helpCommand;
    this._helpConfiguration = sourceCommand._helpConfiguration;
    this._exitCallback = sourceCommand._exitCallback;
    this._storeOptionsAsProperties = sourceCommand._storeOptionsAsProperties;
    this._combineFlagAndOptionalValue = sourceCommand._combineFlagAndOptionalValue;
    this._allowExcessArguments = sourceCommand._allowExcessArguments;
    this._enablePositionalOptions = sourceCommand._enablePositionalOptions;
    this._showHelpAfterError = sourceCommand._showHelpAfterError;
    this._showSuggestionAfterError = sourceCommand._showSuggestionAfterError;
    return this;
  }
  /**
   * @returns {Command[]}
   * @private
   */
  _getCommandAndAncestors() {
    const result = [];
    for (let command = this; command; command = command.parent) {
      result.push(command);
    }
    return result;
  }
  /**
   * Define a command.
   *
   * There are two styles of command: pay attention to where to put the description.
   *
   * @example
   * // Command implemented using action handler (description is supplied separately to `.command`)
   * program
   *   .command('clone <source> [destination]')
   *   .description('clone a repository into a newly created directory')
   *   .action((source, destination) => {
   *     console.log('clone command called');
   *   });
   *
   * // Command implemented using separate executable file (description is second parameter to `.command`)
   * program
   *   .command('start <service>', 'start named service')
   *   .command('stop [service]', 'stop named service, or all if no name supplied');
   *
   * @param {string} nameAndArgs - command name and arguments, args are `<required>` or `[optional]` and last may also be `variadic...`
   * @param {(object | string)} [actionOptsOrExecDesc] - configuration options (for action), or description (for executable)
   * @param {object} [execOpts] - configuration options (for executable)
   * @return {Command} returns new command for action handler, or `this` for executable command
   */
  command(nameAndArgs, actionOptsOrExecDesc, execOpts) {
    let desc = actionOptsOrExecDesc;
    let opts = execOpts;
    if (typeof desc === "object" && desc !== null) {
      opts = desc;
      desc = null;
    }
    opts = opts || {};
    const [, name, args] = nameAndArgs.match(/([^ ]+) *(.*)/);
    const cmd = this.createCommand(name);
    if (desc) {
      cmd.description(desc);
      cmd._executableHandler = true;
    }
    if (opts.isDefault) this._defaultCommandName = cmd._name;
    cmd._hidden = !!(opts.noHelp || opts.hidden);
    cmd._executableFile = opts.executableFile || null;
    if (args) cmd.arguments(args);
    this._registerCommand(cmd);
    cmd.parent = this;
    cmd.copyInheritedSettings(this);
    if (desc) return this;
    return cmd;
  }
  /**
   * Factory routine to create a new unattached command.
   *
   * See .command() for creating an attached subcommand, which uses this routine to
   * create the command. You can override createCommand to customise subcommands.
   *
   * @param {string} [name]
   * @return {Command} new command
   */
  createCommand(name) {
    return new _Command(name);
  }
  /**
   * You can customise the help with a subclass of Help by overriding createHelp,
   * or by overriding Help properties using configureHelp().
   *
   * @return {Help}
   */
  createHelp() {
    return Object.assign(new Help(), this.configureHelp());
  }
  /**
   * You can customise the help by overriding Help properties using configureHelp(),
   * or with a subclass of Help by overriding createHelp().
   *
   * @param {object} [configuration] - configuration options
   * @return {(Command | object)} `this` command for chaining, or stored configuration
   */
  configureHelp(configuration) {
    if (configuration === void 0) return this._helpConfiguration;
    this._helpConfiguration = configuration;
    return this;
  }
  /**
   * The default output goes to stdout and stderr. You can customise this for special
   * applications. You can also customise the display of errors by overriding outputError.
   *
   * The configuration properties are all functions:
   *
   *     // change how output being written, defaults to stdout and stderr
   *     writeOut(str)
   *     writeErr(str)
   *     // change how output being written for errors, defaults to writeErr
   *     outputError(str, write) // used for displaying errors and not used for displaying help
   *     // specify width for wrapping help
   *     getOutHelpWidth()
   *     getErrHelpWidth()
   *     // color support, currently only used with Help
   *     getOutHasColors()
   *     getErrHasColors()
   *     stripColor() // used to remove ANSI escape codes if output does not have colors
   *
   * @param {object} [configuration] - configuration options
   * @return {(Command | object)} `this` command for chaining, or stored configuration
   */
  configureOutput(configuration) {
    if (configuration === void 0) return this._outputConfiguration;
    this._outputConfiguration = {
      ...this._outputConfiguration,
      ...configuration
    };
    return this;
  }
  /**
   * Display the help or a custom message after an error occurs.
   *
   * @param {(boolean|string)} [displayHelp]
   * @return {Command} `this` command for chaining
   */
  showHelpAfterError(displayHelp = true) {
    if (typeof displayHelp !== "string") displayHelp = !!displayHelp;
    this._showHelpAfterError = displayHelp;
    return this;
  }
  /**
   * Display suggestion of similar commands for unknown commands, or options for unknown options.
   *
   * @param {boolean} [displaySuggestion]
   * @return {Command} `this` command for chaining
   */
  showSuggestionAfterError(displaySuggestion = true) {
    this._showSuggestionAfterError = !!displaySuggestion;
    return this;
  }
  /**
   * Add a prepared subcommand.
   *
   * See .command() for creating an attached subcommand which inherits settings from its parent.
   *
   * @param {Command} cmd - new subcommand
   * @param {object} [opts] - configuration options
   * @return {Command} `this` command for chaining
   */
  addCommand(cmd, opts) {
    if (!cmd._name) {
      throw new Error(`Command passed to .addCommand() must have a name
- specify the name in Command constructor or using .name()`);
    }
    opts = opts || {};
    if (opts.isDefault) this._defaultCommandName = cmd._name;
    if (opts.noHelp || opts.hidden) cmd._hidden = true;
    this._registerCommand(cmd);
    cmd.parent = this;
    cmd._checkForBrokenPassThrough();
    return this;
  }
  /**
   * Factory routine to create a new unattached argument.
   *
   * See .argument() for creating an attached argument, which uses this routine to
   * create the argument. You can override createArgument to return a custom argument.
   *
   * @param {string} name
   * @param {string} [description]
   * @return {Argument} new argument
   */
  createArgument(name, description) {
    return new Argument(name, description);
  }
  /**
   * Define argument syntax for command.
   *
   * The default is that the argument is required, and you can explicitly
   * indicate this with <> around the name. Put [] around the name for an optional argument.
   *
   * @example
   * program.argument('<input-file>');
   * program.argument('[output-file]');
   *
   * @param {string} name
   * @param {string} [description]
   * @param {(Function|*)} [parseArg] - custom argument processing function or default value
   * @param {*} [defaultValue]
   * @return {Command} `this` command for chaining
   */
  argument(name, description, parseArg, defaultValue) {
    const argument = this.createArgument(name, description);
    if (typeof parseArg === "function") {
      argument.default(defaultValue).argParser(parseArg);
    } else {
      argument.default(parseArg);
    }
    this.addArgument(argument);
    return this;
  }
  /**
   * Define argument syntax for command, adding multiple at once (without descriptions).
   *
   * See also .argument().
   *
   * @example
   * program.arguments('<cmd> [env]');
   *
   * @param {string} names
   * @return {Command} `this` command for chaining
   */
  arguments(names) {
    names.trim().split(/ +/).forEach((detail) => {
      this.argument(detail);
    });
    return this;
  }
  /**
   * Define argument syntax for command, adding a prepared argument.
   *
   * @param {Argument} argument
   * @return {Command} `this` command for chaining
   */
  addArgument(argument) {
    const previousArgument = this.registeredArguments.slice(-1)[0];
    if (previousArgument?.variadic) {
      throw new Error(
        `only the last argument can be variadic '${previousArgument.name()}'`
      );
    }
    if (argument.required && argument.defaultValue !== void 0 && argument.parseArg === void 0) {
      throw new Error(
        `a default value for a required argument is never used: '${argument.name()}'`
      );
    }
    this.registeredArguments.push(argument);
    return this;
  }
  /**
   * Customise or override default help command. By default a help command is automatically added if your command has subcommands.
   *
   * @example
   *    program.helpCommand('help [cmd]');
   *    program.helpCommand('help [cmd]', 'show help');
   *    program.helpCommand(false); // suppress default help command
   *    program.helpCommand(true); // add help command even if no subcommands
   *
   * @param {string|boolean} enableOrNameAndArgs - enable with custom name and/or arguments, or boolean to override whether added
   * @param {string} [description] - custom description
   * @return {Command} `this` command for chaining
   */
  helpCommand(enableOrNameAndArgs, description) {
    if (typeof enableOrNameAndArgs === "boolean") {
      this._addImplicitHelpCommand = enableOrNameAndArgs;
      if (enableOrNameAndArgs && this._defaultCommandGroup) {
        this._initCommandGroup(this._getHelpCommand());
      }
      return this;
    }
    const nameAndArgs = enableOrNameAndArgs ?? "help [command]";
    const [, helpName, helpArgs] = nameAndArgs.match(/([^ ]+) *(.*)/);
    const helpDescription = description ?? "display help for command";
    const helpCommand = this.createCommand(helpName);
    helpCommand.helpOption(false);
    if (helpArgs) helpCommand.arguments(helpArgs);
    if (helpDescription) helpCommand.description(helpDescription);
    this._addImplicitHelpCommand = true;
    this._helpCommand = helpCommand;
    if (enableOrNameAndArgs || description) this._initCommandGroup(helpCommand);
    return this;
  }
  /**
   * Add prepared custom help command.
   *
   * @param {(Command|string|boolean)} helpCommand - custom help command, or deprecated enableOrNameAndArgs as for `.helpCommand()`
   * @param {string} [deprecatedDescription] - deprecated custom description used with custom name only
   * @return {Command} `this` command for chaining
   */
  addHelpCommand(helpCommand, deprecatedDescription) {
    if (typeof helpCommand !== "object") {
      this.helpCommand(helpCommand, deprecatedDescription);
      return this;
    }
    this._addImplicitHelpCommand = true;
    this._helpCommand = helpCommand;
    this._initCommandGroup(helpCommand);
    return this;
  }
  /**
   * Lazy create help command.
   *
   * @return {(Command|null)}
   * @package
   */
  _getHelpCommand() {
    const hasImplicitHelpCommand = this._addImplicitHelpCommand ?? (this.commands.length && !this._actionHandler && !this._findCommand("help"));
    if (hasImplicitHelpCommand) {
      if (this._helpCommand === void 0) {
        this.helpCommand(void 0, void 0);
      }
      return this._helpCommand;
    }
    return null;
  }
  /**
   * Add hook for life cycle event.
   *
   * @param {string} event
   * @param {Function} listener
   * @return {Command} `this` command for chaining
   */
  hook(event, listener) {
    const allowedValues = ["preSubcommand", "preAction", "postAction"];
    if (!allowedValues.includes(event)) {
      throw new Error(`Unexpected value for event passed to hook : '${event}'.
Expecting one of '${allowedValues.join("', '")}'`);
    }
    if (this._lifeCycleHooks[event]) {
      this._lifeCycleHooks[event].push(listener);
    } else {
      this._lifeCycleHooks[event] = [listener];
    }
    return this;
  }
  /**
   * Register callback to use as replacement for calling process.exit.
   *
   * @param {Function} [fn] optional callback which will be passed a CommanderError, defaults to throwing
   * @return {Command} `this` command for chaining
   */
  exitOverride(fn2) {
    if (fn2) {
      this._exitCallback = fn2;
    } else {
      this._exitCallback = (err) => {
        if (err.code !== "commander.executeSubCommandAsync") {
          throw err;
        } else {
        }
      };
    }
    return this;
  }
  /**
   * Call process.exit, and _exitCallback if defined.
   *
   * @param {number} exitCode exit code for using with process.exit
   * @param {string} code an id string representing the error
   * @param {string} message human-readable description of the error
   * @return never
   * @private
   */
  _exit(exitCode, code, message) {
    if (this._exitCallback) {
      this._exitCallback(new CommanderError(exitCode, code, message));
    }
    process2.exit(exitCode);
  }
  /**
   * Register callback `fn` for the command.
   *
   * @example
   * program
   *   .command('serve')
   *   .description('start service')
   *   .action(function() {
   *      // do work here
   *   });
   *
   * @param {Function} fn
   * @return {Command} `this` command for chaining
   */
  action(fn2) {
    const listener = (args) => {
      const expectedArgsCount = this.registeredArguments.length;
      const actionArgs = args.slice(0, expectedArgsCount);
      if (this._storeOptionsAsProperties) {
        actionArgs[expectedArgsCount] = this;
      } else {
        actionArgs[expectedArgsCount] = this.opts();
      }
      actionArgs.push(this);
      return fn2.apply(this, actionArgs);
    };
    this._actionHandler = listener;
    return this;
  }
  /**
   * Factory routine to create a new unattached option.
   *
   * See .option() for creating an attached option, which uses this routine to
   * create the option. You can override createOption to return a custom option.
   *
   * @param {string} flags
   * @param {string} [description]
   * @return {Option} new option
   */
  createOption(flags, description) {
    return new Option(flags, description);
  }
  /**
   * Wrap parseArgs to catch 'commander.invalidArgument'.
   *
   * @param {(Option | Argument)} target
   * @param {string} value
   * @param {*} previous
   * @param {string} invalidArgumentMessage
   * @private
   */
  _callParseArg(target, value, previous, invalidArgumentMessage) {
    try {
      return target.parseArg(value, previous);
    } catch (err) {
      if (err.code === "commander.invalidArgument") {
        const message = `${invalidArgumentMessage} ${err.message}`;
        this.error(message, { exitCode: err.exitCode, code: err.code });
      }
      throw err;
    }
  }
  /**
   * Check for option flag conflicts.
   * Register option if no conflicts found, or throw on conflict.
   *
   * @param {Option} option
   * @private
   */
  _registerOption(option) {
    const matchingOption = option.short && this._findOption(option.short) || option.long && this._findOption(option.long);
    if (matchingOption) {
      const matchingFlag = option.long && this._findOption(option.long) ? option.long : option.short;
      throw new Error(`Cannot add option '${option.flags}'${this._name && ` to command '${this._name}'`} due to conflicting flag '${matchingFlag}'
-  already used by option '${matchingOption.flags}'`);
    }
    this._initOptionGroup(option);
    this.options.push(option);
  }
  /**
   * Check for command name and alias conflicts with existing commands.
   * Register command if no conflicts found, or throw on conflict.
   *
   * @param {Command} command
   * @private
   */
  _registerCommand(command) {
    const knownBy = (cmd) => {
      return [cmd.name()].concat(cmd.aliases());
    };
    const alreadyUsed = knownBy(command).find(
      (name) => this._findCommand(name)
    );
    if (alreadyUsed) {
      const existingCmd = knownBy(this._findCommand(alreadyUsed)).join("|");
      const newCmd = knownBy(command).join("|");
      throw new Error(
        `cannot add command '${newCmd}' as already have command '${existingCmd}'`
      );
    }
    this._initCommandGroup(command);
    this.commands.push(command);
  }
  /**
   * Add an option.
   *
   * @param {Option} option
   * @return {Command} `this` command for chaining
   */
  addOption(option) {
    this._registerOption(option);
    const oname = option.name();
    const name = option.attributeName();
    if (option.defaultValue !== void 0) {
      this.setOptionValueWithSource(name, option.defaultValue, "default");
    }
    const handleOptionValue = (val, invalidValueMessage, valueSource) => {
      if (val == null && option.presetArg !== void 0) {
        val = option.presetArg;
      }
      const oldValue = this.getOptionValue(name);
      if (val !== null && option.parseArg) {
        val = this._callParseArg(option, val, oldValue, invalidValueMessage);
      } else if (val !== null && option.variadic) {
        val = option._collectValue(val, oldValue);
      }
      if (val == null) {
        if (option.negate) {
          val = false;
        } else if (option.isBoolean() || option.optional) {
          val = true;
        } else {
          val = "";
        }
      }
      this.setOptionValueWithSource(name, val, valueSource);
    };
    this.on("option:" + oname, (val) => {
      const invalidValueMessage = `error: option '${option.flags}' argument '${val}' is invalid.`;
      handleOptionValue(val, invalidValueMessage, "cli");
    });
    if (option.envVar) {
      this.on("optionEnv:" + oname, (val) => {
        const invalidValueMessage = `error: option '${option.flags}' value '${val}' from env '${option.envVar}' is invalid.`;
        handleOptionValue(val, invalidValueMessage, "env");
      });
    }
    return this;
  }
  /**
   * Internal implementation shared by .option() and .requiredOption()
   *
   * @return {Command} `this` command for chaining
   * @private
   */
  _optionEx(config, flags, description, fn2, defaultValue) {
    if (typeof flags === "object" && flags instanceof Option) {
      throw new Error(
        "To add an Option object use addOption() instead of option() or requiredOption()"
      );
    }
    const option = this.createOption(flags, description);
    option.makeOptionMandatory(!!config.mandatory);
    if (typeof fn2 === "function") {
      option.default(defaultValue).argParser(fn2);
    } else if (fn2 instanceof RegExp) {
      const regex2 = fn2;
      fn2 = (val, def) => {
        const m3 = regex2.exec(val);
        return m3 ? m3[0] : def;
      };
      option.default(defaultValue).argParser(fn2);
    } else {
      option.default(fn2);
    }
    return this.addOption(option);
  }
  /**
   * Define option with `flags`, `description`, and optional argument parsing function or `defaultValue` or both.
   *
   * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space. A required
   * option-argument is indicated by `<>` and an optional option-argument by `[]`.
   *
   * See the README for more details, and see also addOption() and requiredOption().
   *
   * @example
   * program
   *     .option('-p, --pepper', 'add pepper')
   *     .option('--pt, --pizza-type <TYPE>', 'type of pizza') // required option-argument
   *     .option('-c, --cheese [CHEESE]', 'add extra cheese', 'mozzarella') // optional option-argument with default
   *     .option('-t, --tip <VALUE>', 'add tip to purchase cost', parseFloat) // custom parse function
   *
   * @param {string} flags
   * @param {string} [description]
   * @param {(Function|*)} [parseArg] - custom option processing function or default value
   * @param {*} [defaultValue]
   * @return {Command} `this` command for chaining
   */
  option(flags, description, parseArg, defaultValue) {
    return this._optionEx({}, flags, description, parseArg, defaultValue);
  }
  /**
   * Add a required option which must have a value after parsing. This usually means
   * the option must be specified on the command line. (Otherwise the same as .option().)
   *
   * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space.
   *
   * @param {string} flags
   * @param {string} [description]
   * @param {(Function|*)} [parseArg] - custom option processing function or default value
   * @param {*} [defaultValue]
   * @return {Command} `this` command for chaining
   */
  requiredOption(flags, description, parseArg, defaultValue) {
    return this._optionEx(
      { mandatory: true },
      flags,
      description,
      parseArg,
      defaultValue
    );
  }
  /**
   * Alter parsing of short flags with optional values.
   *
   * @example
   * // for `.option('-f,--flag [value]'):
   * program.combineFlagAndOptionalValue(true);  // `-f80` is treated like `--flag=80`, this is the default behaviour
   * program.combineFlagAndOptionalValue(false) // `-fb` is treated like `-f -b`
   *
   * @param {boolean} [combine] - if `true` or omitted, an optional value can be specified directly after the flag.
   * @return {Command} `this` command for chaining
   */
  combineFlagAndOptionalValue(combine = true) {
    this._combineFlagAndOptionalValue = !!combine;
    return this;
  }
  /**
   * Allow unknown options on the command line.
   *
   * @param {boolean} [allowUnknown] - if `true` or omitted, no error will be thrown for unknown options.
   * @return {Command} `this` command for chaining
   */
  allowUnknownOption(allowUnknown = true) {
    this._allowUnknownOption = !!allowUnknown;
    return this;
  }
  /**
   * Allow excess command-arguments on the command line. Pass false to make excess arguments an error.
   *
   * @param {boolean} [allowExcess] - if `true` or omitted, no error will be thrown for excess arguments.
   * @return {Command} `this` command for chaining
   */
  allowExcessArguments(allowExcess = true) {
    this._allowExcessArguments = !!allowExcess;
    return this;
  }
  /**
   * Enable positional options. Positional means global options are specified before subcommands which lets
   * subcommands reuse the same option names, and also enables subcommands to turn on passThroughOptions.
   * The default behaviour is non-positional and global options may appear anywhere on the command line.
   *
   * @param {boolean} [positional]
   * @return {Command} `this` command for chaining
   */
  enablePositionalOptions(positional = true) {
    this._enablePositionalOptions = !!positional;
    return this;
  }
  /**
   * Pass through options that come after command-arguments rather than treat them as command-options,
   * so actual command-options come before command-arguments. Turning this on for a subcommand requires
   * positional options to have been enabled on the program (parent commands).
   * The default behaviour is non-positional and options may appear before or after command-arguments.
   *
   * @param {boolean} [passThrough] for unknown options.
   * @return {Command} `this` command for chaining
   */
  passThroughOptions(passThrough = true) {
    this._passThroughOptions = !!passThrough;
    this._checkForBrokenPassThrough();
    return this;
  }
  /**
   * @private
   */
  _checkForBrokenPassThrough() {
    if (this.parent && this._passThroughOptions && !this.parent._enablePositionalOptions) {
      throw new Error(
        `passThroughOptions cannot be used for '${this._name}' without turning on enablePositionalOptions for parent command(s)`
      );
    }
  }
  /**
   * Whether to store option values as properties on command object,
   * or store separately (specify false). In both cases the option values can be accessed using .opts().
   *
   * @param {boolean} [storeAsProperties=true]
   * @return {Command} `this` command for chaining
   */
  storeOptionsAsProperties(storeAsProperties = true) {
    if (this.options.length) {
      throw new Error("call .storeOptionsAsProperties() before adding options");
    }
    if (Object.keys(this._optionValues).length) {
      throw new Error(
        "call .storeOptionsAsProperties() before setting option values"
      );
    }
    this._storeOptionsAsProperties = !!storeAsProperties;
    return this;
  }
  /**
   * Retrieve option value.
   *
   * @param {string} key
   * @return {object} value
   */
  getOptionValue(key) {
    if (this._storeOptionsAsProperties) {
      return this[key];
    }
    return this._optionValues[key];
  }
  /**
   * Store option value.
   *
   * @param {string} key
   * @param {object} value
   * @return {Command} `this` command for chaining
   */
  setOptionValue(key, value) {
    return this.setOptionValueWithSource(key, value, void 0);
  }
  /**
   * Store option value and where the value came from.
   *
   * @param {string} key
   * @param {object} value
   * @param {string} source - expected values are default/config/env/cli/implied
   * @return {Command} `this` command for chaining
   */
  setOptionValueWithSource(key, value, source) {
    if (this._storeOptionsAsProperties) {
      this[key] = value;
    } else {
      this._optionValues[key] = value;
    }
    this._optionValueSources[key] = source;
    return this;
  }
  /**
   * Get source of option value.
   * Expected values are default | config | env | cli | implied
   *
   * @param {string} key
   * @return {string}
   */
  getOptionValueSource(key) {
    return this._optionValueSources[key];
  }
  /**
   * Get source of option value. See also .optsWithGlobals().
   * Expected values are default | config | env | cli | implied
   *
   * @param {string} key
   * @return {string}
   */
  getOptionValueSourceWithGlobals(key) {
    let source;
    this._getCommandAndAncestors().forEach((cmd) => {
      if (cmd.getOptionValueSource(key) !== void 0) {
        source = cmd.getOptionValueSource(key);
      }
    });
    return source;
  }
  /**
   * Get user arguments from implied or explicit arguments.
   * Side-effects: set _scriptPath if args included script. Used for default program name, and subcommand searches.
   *
   * @private
   */
  _prepareUserArgs(argv, parseOptions) {
    if (argv !== void 0 && !Array.isArray(argv)) {
      throw new Error("first parameter to parse must be array or undefined");
    }
    parseOptions = parseOptions || {};
    if (argv === void 0 && parseOptions.from === void 0) {
      if (process2.versions?.electron) {
        parseOptions.from = "electron";
      }
      const execArgv = process2.execArgv ?? [];
      if (execArgv.includes("-e") || execArgv.includes("--eval") || execArgv.includes("-p") || execArgv.includes("--print")) {
        parseOptions.from = "eval";
      }
    }
    if (argv === void 0) {
      argv = process2.argv;
    }
    this.rawArgs = argv.slice();
    let userArgs;
    switch (parseOptions.from) {
      case void 0:
      case "node":
        this._scriptPath = argv[1];
        userArgs = argv.slice(2);
        break;
      case "electron":
        if (process2.defaultApp) {
          this._scriptPath = argv[1];
          userArgs = argv.slice(2);
        } else {
          userArgs = argv.slice(1);
        }
        break;
      case "user":
        userArgs = argv.slice(0);
        break;
      case "eval":
        userArgs = argv.slice(1);
        break;
      default:
        throw new Error(
          `unexpected parse option { from: '${parseOptions.from}' }`
        );
    }
    if (!this._name && this._scriptPath)
      this.nameFromFilename(this._scriptPath);
    this._name = this._name || "program";
    return userArgs;
  }
  /**
   * Parse `argv`, setting options and invoking commands when defined.
   *
   * Use parseAsync instead of parse if any of your action handlers are async.
   *
   * Call with no parameters to parse `process.argv`. Detects Electron and special node options like `node --eval`. Easy mode!
   *
   * Or call with an array of strings to parse, and optionally where the user arguments start by specifying where the arguments are `from`:
   * - `'node'`: default, `argv[0]` is the application and `argv[1]` is the script being run, with user arguments after that
   * - `'electron'`: `argv[0]` is the application and `argv[1]` varies depending on whether the electron application is packaged
   * - `'user'`: just user arguments
   *
   * @example
   * program.parse(); // parse process.argv and auto-detect electron and special node flags
   * program.parse(process.argv); // assume argv[0] is app and argv[1] is script
   * program.parse(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
   *
   * @param {string[]} [argv] - optional, defaults to process.argv
   * @param {object} [parseOptions] - optionally specify style of options with from: node/user/electron
   * @param {string} [parseOptions.from] - where the args are from: 'node', 'user', 'electron'
   * @return {Command} `this` command for chaining
   */
  parse(argv, parseOptions) {
    this._prepareForParse();
    const userArgs = this._prepareUserArgs(argv, parseOptions);
    this._parseCommand([], userArgs);
    return this;
  }
  /**
   * Parse `argv`, setting options and invoking commands when defined.
   *
   * Call with no parameters to parse `process.argv`. Detects Electron and special node options like `node --eval`. Easy mode!
   *
   * Or call with an array of strings to parse, and optionally where the user arguments start by specifying where the arguments are `from`:
   * - `'node'`: default, `argv[0]` is the application and `argv[1]` is the script being run, with user arguments after that
   * - `'electron'`: `argv[0]` is the application and `argv[1]` varies depending on whether the electron application is packaged
   * - `'user'`: just user arguments
   *
   * @example
   * await program.parseAsync(); // parse process.argv and auto-detect electron and special node flags
   * await program.parseAsync(process.argv); // assume argv[0] is app and argv[1] is script
   * await program.parseAsync(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
   *
   * @param {string[]} [argv]
   * @param {object} [parseOptions]
   * @param {string} parseOptions.from - where the args are from: 'node', 'user', 'electron'
   * @return {Promise}
   */
  async parseAsync(argv, parseOptions) {
    this._prepareForParse();
    const userArgs = this._prepareUserArgs(argv, parseOptions);
    await this._parseCommand([], userArgs);
    return this;
  }
  _prepareForParse() {
    if (this._savedState === null) {
      this.options.filter(
        (option) => option.negate && option.defaultValue === void 0 && this.getOptionValue(option.attributeName()) === void 0
      ).forEach((option) => {
        const positiveLongFlag = option.long.replace(/^--no-/, "--");
        if (!this._findOption(positiveLongFlag)) {
          this.setOptionValueWithSource(
            option.attributeName(),
            true,
            "default"
          );
        }
      });
      this.saveStateBeforeParse();
    } else {
      this.restoreStateBeforeParse();
    }
  }
  /**
   * Called the first time parse is called to save state and allow a restore before subsequent calls to parse.
   * Not usually called directly, but available for subclasses to save their custom state.
   *
   * This is called in a lazy way. Only commands used in parsing chain will have state saved.
   */
  saveStateBeforeParse() {
    this._savedState = {
      // name is stable if supplied by author, but may be unspecified for root command and deduced during parsing
      _name: this._name,
      // option values before parse have default values (including false for negated options)
      // shallow clones
      _optionValues: { ...this._optionValues },
      _optionValueSources: { ...this._optionValueSources }
    };
  }
  /**
   * Restore state before parse for calls after the first.
   * Not usually called directly, but available for subclasses to save their custom state.
   *
   * This is called in a lazy way. Only commands used in parsing chain will have state restored.
   */
  restoreStateBeforeParse() {
    if (this._storeOptionsAsProperties)
      throw new Error(`Can not call parse again when storeOptionsAsProperties is true.
- either make a new Command for each call to parse, or stop storing options as properties`);
    this._name = this._savedState._name;
    this._scriptPath = null;
    this.rawArgs = [];
    this._optionValues = { ...this._savedState._optionValues };
    this._optionValueSources = { ...this._savedState._optionValueSources };
    this.args = [];
    this.processedArgs = [];
  }
  /**
   * Throw if expected executable is missing. Add lots of help for author.
   *
   * @param {string} executableFile
   * @param {string} executableDir
   * @param {string} subcommandName
   */
  _checkForMissingExecutable(executableFile, executableDir, subcommandName) {
    if (fs.existsSync(executableFile)) return;
    const executableDirMessage = executableDir ? `searched for local subcommand relative to directory '${executableDir}'` : "no directory for search for local subcommand, use .executableDir() to supply a custom directory";
    const executableMissing = `'${executableFile}' does not exist
 - if '${subcommandName}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
 - if the default executable name is not suitable, use the executableFile option to supply a custom name or path
 - ${executableDirMessage}`;
    throw new Error(executableMissing);
  }
  /**
   * Execute a sub-command executable.
   *
   * @private
   */
  _executeSubCommand(subcommand, args) {
    args = args.slice();
    const sourceExt = [".js", ".ts", ".tsx", ".mjs", ".cjs"];
    function findFile(baseDir, baseName) {
      const localBin = path.resolve(baseDir, baseName);
      if (fs.existsSync(localBin)) return localBin;
      if (sourceExt.includes(path.extname(baseName))) return void 0;
      const foundExt = sourceExt.find(
        (ext) => fs.existsSync(`${localBin}${ext}`)
      );
      if (foundExt) return `${localBin}${foundExt}`;
      return void 0;
    }
    this._checkForMissingMandatoryOptions();
    this._checkForConflictingOptions();
    let executableFile = subcommand._executableFile || `${this._name}-${subcommand._name}`;
    let executableDir = this._executableDir || "";
    if (this._scriptPath) {
      let resolvedScriptPath;
      try {
        resolvedScriptPath = fs.realpathSync(this._scriptPath);
      } catch {
        resolvedScriptPath = this._scriptPath;
      }
      executableDir = path.resolve(
        path.dirname(resolvedScriptPath),
        executableDir
      );
    }
    if (executableDir) {
      let localFile = findFile(executableDir, executableFile);
      if (!localFile && !subcommand._executableFile && this._scriptPath) {
        const legacyName = path.basename(
          this._scriptPath,
          path.extname(this._scriptPath)
        );
        if (legacyName !== this._name) {
          localFile = findFile(
            executableDir,
            `${legacyName}-${subcommand._name}`
          );
        }
      }
      executableFile = localFile || executableFile;
    }
    const launchWithNode = sourceExt.includes(path.extname(executableFile));
    let proc;
    if (process2.platform !== "win32") {
      if (launchWithNode) {
        args.unshift(executableFile);
        args = incrementNodeInspectorPort(process2.execArgv).concat(args);
        proc = childProcess.spawn(process2.argv[0], args, { stdio: "inherit" });
      } else {
        proc = childProcess.spawn(executableFile, args, { stdio: "inherit" });
      }
    } else {
      this._checkForMissingExecutable(
        executableFile,
        executableDir,
        subcommand._name
      );
      args.unshift(executableFile);
      args = incrementNodeInspectorPort(process2.execArgv).concat(args);
      proc = childProcess.spawn(process2.execPath, args, { stdio: "inherit" });
    }
    if (!proc.killed) {
      const signals2 = ["SIGUSR1", "SIGUSR2", "SIGTERM", "SIGINT", "SIGHUP"];
      signals2.forEach((signal) => {
        process2.on(signal, () => {
          if (proc.killed === false && proc.exitCode === null) {
            proc.kill(signal);
          }
        });
      });
    }
    const exitCallback = this._exitCallback;
    proc.on("close", (code) => {
      code = code ?? 1;
      if (!exitCallback) {
        process2.exit(code);
      } else {
        exitCallback(
          new CommanderError(
            code,
            "commander.executeSubCommandAsync",
            "(close)"
          )
        );
      }
    });
    proc.on("error", (err) => {
      if (err.code === "ENOENT") {
        this._checkForMissingExecutable(
          executableFile,
          executableDir,
          subcommand._name
        );
      } else if (err.code === "EACCES") {
        throw new Error(`'${executableFile}' not executable`);
      }
      if (!exitCallback) {
        process2.exit(1);
      } else {
        const wrappedError = new CommanderError(
          1,
          "commander.executeSubCommandAsync",
          "(error)"
        );
        wrappedError.nestedError = err;
        exitCallback(wrappedError);
      }
    });
    this.runningCommand = proc;
  }
  /**
   * @private
   */
  _dispatchSubcommand(commandName, operands, unknown) {
    const subCommand = this._findCommand(commandName);
    if (!subCommand) this.help({ error: true });
    subCommand._prepareForParse();
    let promiseChain;
    promiseChain = this._chainOrCallSubCommandHook(
      promiseChain,
      subCommand,
      "preSubcommand"
    );
    promiseChain = this._chainOrCall(promiseChain, () => {
      if (subCommand._executableHandler) {
        this._executeSubCommand(subCommand, operands.concat(unknown));
      } else {
        return subCommand._parseCommand(operands, unknown);
      }
    });
    return promiseChain;
  }
  /**
   * Invoke help directly if possible, or dispatch if necessary.
   * e.g. help foo
   *
   * @private
   */
  _dispatchHelpCommand(subcommandName) {
    if (!subcommandName) {
      this.help();
    }
    const subCommand = this._findCommand(subcommandName);
    if (subCommand && !subCommand._executableHandler) {
      subCommand.help();
    }
    return this._dispatchSubcommand(
      subcommandName,
      [],
      [this._getHelpOption()?.long ?? this._getHelpOption()?.short ?? "--help"]
    );
  }
  /**
   * Check this.args against expected this.registeredArguments.
   *
   * @private
   */
  _checkNumberOfArguments() {
    this.registeredArguments.forEach((arg, i) => {
      if (arg.required && this.args[i] == null) {
        this.missingArgument(arg.name());
      }
    });
    if (this.registeredArguments.length > 0 && this.registeredArguments[this.registeredArguments.length - 1].variadic) {
      return;
    }
    if (this.args.length > this.registeredArguments.length) {
      this._excessArguments(this.args);
    }
  }
  /**
   * Process this.args using this.registeredArguments and save as this.processedArgs!
   *
   * @private
   */
  _processArguments() {
    const myParseArg = (argument, value, previous) => {
      let parsedValue = value;
      if (value !== null && argument.parseArg) {
        const invalidValueMessage = `error: command-argument value '${value}' is invalid for argument '${argument.name()}'.`;
        parsedValue = this._callParseArg(
          argument,
          value,
          previous,
          invalidValueMessage
        );
      }
      return parsedValue;
    };
    this._checkNumberOfArguments();
    const processedArgs = [];
    this.registeredArguments.forEach((declaredArg, index) => {
      let value = declaredArg.defaultValue;
      if (declaredArg.variadic) {
        if (index < this.args.length) {
          value = this.args.slice(index);
          if (declaredArg.parseArg) {
            value = value.reduce((processed, v2) => {
              return myParseArg(declaredArg, v2, processed);
            }, declaredArg.defaultValue);
          }
        } else if (value === void 0) {
          value = [];
        }
      } else if (index < this.args.length) {
        value = this.args[index];
        if (declaredArg.parseArg) {
          value = myParseArg(declaredArg, value, declaredArg.defaultValue);
        }
      }
      processedArgs[index] = value;
    });
    this.processedArgs = processedArgs;
  }
  /**
   * Once we have a promise we chain, but call synchronously until then.
   *
   * @param {(Promise|undefined)} promise
   * @param {Function} fn
   * @return {(Promise|undefined)}
   * @private
   */
  _chainOrCall(promise, fn2) {
    if (promise?.then && typeof promise.then === "function") {
      return promise.then(() => fn2());
    }
    return fn2();
  }
  /**
   *
   * @param {(Promise|undefined)} promise
   * @param {string} event
   * @return {(Promise|undefined)}
   * @private
   */
  _chainOrCallHooks(promise, event) {
    let result = promise;
    const hooks = [];
    this._getCommandAndAncestors().reverse().filter((cmd) => cmd._lifeCycleHooks[event] !== void 0).forEach((hookedCommand) => {
      hookedCommand._lifeCycleHooks[event].forEach((callback) => {
        hooks.push({ hookedCommand, callback });
      });
    });
    if (event === "postAction") {
      hooks.reverse();
    }
    hooks.forEach((hookDetail) => {
      result = this._chainOrCall(result, () => {
        return hookDetail.callback(hookDetail.hookedCommand, this);
      });
    });
    return result;
  }
  /**
   *
   * @param {(Promise|undefined)} promise
   * @param {Command} subCommand
   * @param {string} event
   * @return {(Promise|undefined)}
   * @private
   */
  _chainOrCallSubCommandHook(promise, subCommand, event) {
    let result = promise;
    if (this._lifeCycleHooks[event] !== void 0) {
      this._lifeCycleHooks[event].forEach((hook) => {
        result = this._chainOrCall(result, () => {
          return hook(this, subCommand);
        });
      });
    }
    return result;
  }
  /**
   * Process arguments in context of this command.
   * Returns action result, in case it is a promise.
   *
   * @private
   */
  _parseCommand(operands, unknown) {
    const parsed = this.parseOptions(unknown);
    this._parseOptionsEnv();
    this._parseOptionsImplied();
    operands = operands.concat(parsed.operands);
    unknown = parsed.unknown;
    this.args = operands.concat(unknown);
    if (operands && this._findCommand(operands[0])) {
      return this._dispatchSubcommand(operands[0], operands.slice(1), unknown);
    }
    if (this._getHelpCommand() && operands[0] === this._getHelpCommand().name()) {
      return this._dispatchHelpCommand(operands[1]);
    }
    if (this._defaultCommandName) {
      this._outputHelpIfRequested(unknown);
      return this._dispatchSubcommand(
        this._defaultCommandName,
        operands,
        unknown
      );
    }
    if (this.commands.length && this.args.length === 0 && !this._actionHandler && !this._defaultCommandName) {
      this.help({ error: true });
    }
    this._outputHelpIfRequested(parsed.unknown);
    this._checkForMissingMandatoryOptions();
    this._checkForConflictingOptions();
    const checkForUnknownOptions = () => {
      if (parsed.unknown.length > 0) {
        this.unknownOption(parsed.unknown[0]);
      }
    };
    const commandEvent = `command:${this.name()}`;
    if (this._actionHandler) {
      checkForUnknownOptions();
      this._processArguments();
      let promiseChain;
      promiseChain = this._chainOrCallHooks(promiseChain, "preAction");
      promiseChain = this._chainOrCall(
        promiseChain,
        () => this._actionHandler(this.processedArgs)
      );
      if (this.parent) {
        promiseChain = this._chainOrCall(promiseChain, () => {
          this.parent.emit(commandEvent, operands, unknown);
        });
      }
      promiseChain = this._chainOrCallHooks(promiseChain, "postAction");
      return promiseChain;
    }
    if (this.parent?.listenerCount(commandEvent)) {
      checkForUnknownOptions();
      this._processArguments();
      this.parent.emit(commandEvent, operands, unknown);
    } else if (operands.length) {
      if (this._findCommand("*")) {
        return this._dispatchSubcommand("*", operands, unknown);
      }
      if (this.listenerCount("command:*")) {
        this.emit("command:*", operands, unknown);
      } else if (this.commands.length) {
        this.unknownCommand();
      } else {
        checkForUnknownOptions();
        this._processArguments();
      }
    } else if (this.commands.length) {
      checkForUnknownOptions();
      this.help({ error: true });
    } else {
      checkForUnknownOptions();
      this._processArguments();
    }
  }
  /**
   * Find matching command.
   *
   * @private
   * @return {Command | undefined}
   */
  _findCommand(name) {
    if (!name) return void 0;
    return this.commands.find(
      (cmd) => cmd._name === name || cmd._aliases.includes(name)
    );
  }
  /**
   * Return an option matching `arg` if any.
   *
   * @param {string} arg
   * @return {Option}
   * @package
   */
  _findOption(arg) {
    return this.options.find((option) => option.is(arg));
  }
  /**
   * Display an error message if a mandatory option does not have a value.
   * Called after checking for help flags in leaf subcommand.
   *
   * @private
   */
  _checkForMissingMandatoryOptions() {
    this._getCommandAndAncestors().forEach((cmd) => {
      cmd.options.forEach((anOption) => {
        if (anOption.mandatory && cmd.getOptionValue(anOption.attributeName()) === void 0) {
          cmd.missingMandatoryOptionValue(anOption);
        }
      });
    });
  }
  /**
   * Display an error message if conflicting options are used together in this.
   *
   * @private
   */
  _checkForConflictingLocalOptions() {
    const definedNonDefaultOptions = this.options.filter((option) => {
      const optionKey = option.attributeName();
      if (this.getOptionValue(optionKey) === void 0) {
        return false;
      }
      return this.getOptionValueSource(optionKey) !== "default";
    });
    const optionsWithConflicting = definedNonDefaultOptions.filter(
      (option) => option.conflictsWith.length > 0
    );
    optionsWithConflicting.forEach((option) => {
      const conflictingAndDefined = definedNonDefaultOptions.find(
        (defined) => option.conflictsWith.includes(defined.attributeName())
      );
      if (conflictingAndDefined) {
        this._conflictingOption(option, conflictingAndDefined);
      }
    });
  }
  /**
   * Display an error message if conflicting options are used together.
   * Called after checking for help flags in leaf subcommand.
   *
   * @private
   */
  _checkForConflictingOptions() {
    this._getCommandAndAncestors().forEach((cmd) => {
      cmd._checkForConflictingLocalOptions();
    });
  }
  /**
   * Parse options from `argv` removing known options,
   * and return argv split into operands and unknown arguments.
   *
   * Side effects: modifies command by storing options. Does not reset state if called again.
   *
   * Examples:
   *
   *     argv => operands, unknown
   *     --known kkk op => [op], []
   *     op --known kkk => [op], []
   *     sub --unknown uuu op => [sub], [--unknown uuu op]
   *     sub -- --unknown uuu op => [sub --unknown uuu op], []
   *
   * @param {string[]} args
   * @return {{operands: string[], unknown: string[]}}
   */
  parseOptions(args) {
    const operands = [];
    const unknown = [];
    let dest = operands;
    function maybeOption(arg) {
      return arg.length > 1 && arg[0] === "-";
    }
    const negativeNumberArg = (arg) => {
      if (!/^-(\d+|\d*\.\d+)(e[+-]?\d+)?$/.test(arg)) return false;
      return !this._getCommandAndAncestors().some(
        (cmd) => cmd.options.map((opt) => opt.short).some((short) => /^-\d$/.test(short))
      );
    };
    let activeVariadicOption = null;
    let activeGroup = null;
    let i = 0;
    while (i < args.length || activeGroup) {
      const arg = activeGroup ?? args[i++];
      activeGroup = null;
      if (arg === "--") {
        if (dest === unknown) dest.push(arg);
        dest.push(...args.slice(i));
        break;
      }
      if (activeVariadicOption && (!maybeOption(arg) || negativeNumberArg(arg))) {
        this.emit(`option:${activeVariadicOption.name()}`, arg);
        continue;
      }
      activeVariadicOption = null;
      if (maybeOption(arg)) {
        const option = this._findOption(arg);
        if (option) {
          if (option.required) {
            const value = args[i++];
            if (value === void 0) this.optionMissingArgument(option);
            this.emit(`option:${option.name()}`, value);
          } else if (option.optional) {
            let value = null;
            if (i < args.length && (!maybeOption(args[i]) || negativeNumberArg(args[i]))) {
              value = args[i++];
            }
            this.emit(`option:${option.name()}`, value);
          } else {
            this.emit(`option:${option.name()}`);
          }
          activeVariadicOption = option.variadic ? option : null;
          continue;
        }
      }
      if (arg.length > 2 && arg[0] === "-" && arg[1] !== "-") {
        const option = this._findOption(`-${arg[1]}`);
        if (option) {
          if (option.required || option.optional && this._combineFlagAndOptionalValue) {
            this.emit(`option:${option.name()}`, arg.slice(2));
          } else {
            this.emit(`option:${option.name()}`);
            activeGroup = `-${arg.slice(2)}`;
          }
          continue;
        }
      }
      if (/^--[^=]+=/.test(arg)) {
        const index = arg.indexOf("=");
        const option = this._findOption(arg.slice(0, index));
        if (option && (option.required || option.optional)) {
          this.emit(`option:${option.name()}`, arg.slice(index + 1));
          continue;
        }
      }
      if (dest === operands && maybeOption(arg) && !(this.commands.length === 0 && negativeNumberArg(arg))) {
        dest = unknown;
      }
      if ((this._enablePositionalOptions || this._passThroughOptions) && operands.length === 0 && unknown.length === 0) {
        if (this._findCommand(arg)) {
          operands.push(arg);
          unknown.push(...args.slice(i));
          break;
        } else if (this._getHelpCommand() && arg === this._getHelpCommand().name()) {
          operands.push(arg, ...args.slice(i));
          break;
        } else if (this._defaultCommandName) {
          unknown.push(arg, ...args.slice(i));
          break;
        }
      }
      if (this._passThroughOptions) {
        dest.push(arg, ...args.slice(i));
        break;
      }
      dest.push(arg);
    }
    return { operands, unknown };
  }
  /**
   * Return an object containing local option values as key-value pairs.
   *
   * @return {object}
   */
  opts() {
    if (this._storeOptionsAsProperties) {
      const result = {};
      const len = this.options.length;
      for (let i = 0; i < len; i++) {
        const key = this.options[i].attributeName();
        result[key] = key === this._versionOptionName ? this._version : this[key];
      }
      return result;
    }
    return this._optionValues;
  }
  /**
   * Return an object containing merged local and global option values as key-value pairs.
   *
   * @return {object}
   */
  optsWithGlobals() {
    return this._getCommandAndAncestors().reduce(
      (combinedOptions, cmd) => Object.assign(combinedOptions, cmd.opts()),
      {}
    );
  }
  /**
   * Display error message and exit (or call exitOverride).
   *
   * @param {string} message
   * @param {object} [errorOptions]
   * @param {string} [errorOptions.code] - an id string representing the error
   * @param {number} [errorOptions.exitCode] - used with process.exit
   */
  error(message, errorOptions) {
    this._outputConfiguration.outputError(
      `${message}
`,
      this._outputConfiguration.writeErr
    );
    if (typeof this._showHelpAfterError === "string") {
      this._outputConfiguration.writeErr(`${this._showHelpAfterError}
`);
    } else if (this._showHelpAfterError) {
      this._outputConfiguration.writeErr("\n");
      this.outputHelp({ error: true });
    }
    const config = errorOptions || {};
    const exitCode = config.exitCode || 1;
    const code = config.code || "commander.error";
    this._exit(exitCode, code, message);
  }
  /**
   * Apply any option related environment variables, if option does
   * not have a value from cli or client code.
   *
   * @private
   */
  _parseOptionsEnv() {
    this.options.forEach((option) => {
      if (option.envVar && option.envVar in process2.env) {
        const optionKey = option.attributeName();
        if (this.getOptionValue(optionKey) === void 0 || ["default", "config", "env"].includes(
          this.getOptionValueSource(optionKey)
        )) {
          if (option.required || option.optional) {
            this.emit(`optionEnv:${option.name()}`, process2.env[option.envVar]);
          } else {
            this.emit(`optionEnv:${option.name()}`);
          }
        }
      }
    });
  }
  /**
   * Apply any implied option values, if option is undefined or default value.
   *
   * @private
   */
  _parseOptionsImplied() {
    const dualHelper = new DualOptions(this.options);
    const hasCustomOptionValue = (optionKey) => {
      return this.getOptionValue(optionKey) !== void 0 && !["default", "implied"].includes(this.getOptionValueSource(optionKey));
    };
    this.options.filter(
      (option) => option.implied !== void 0 && hasCustomOptionValue(option.attributeName()) && dualHelper.valueFromOption(
        this.getOptionValue(option.attributeName()),
        option
      )
    ).forEach((option) => {
      Object.keys(option.implied).filter((impliedKey) => !hasCustomOptionValue(impliedKey)).forEach((impliedKey) => {
        this.setOptionValueWithSource(
          impliedKey,
          option.implied[impliedKey],
          "implied"
        );
      });
    });
  }
  /**
   * Argument `name` is missing.
   *
   * @param {string} name
   * @private
   */
  missingArgument(name) {
    const message = `error: missing required argument '${name}'`;
    this.error(message, { code: "commander.missingArgument" });
  }
  /**
   * `Option` is missing an argument.
   *
   * @param {Option} option
   * @private
   */
  optionMissingArgument(option) {
    const message = `error: option '${option.flags}' argument missing`;
    this.error(message, { code: "commander.optionMissingArgument" });
  }
  /**
   * `Option` does not have a value, and is a mandatory option.
   *
   * @param {Option} option
   * @private
   */
  missingMandatoryOptionValue(option) {
    const message = `error: required option '${option.flags}' not specified`;
    this.error(message, { code: "commander.missingMandatoryOptionValue" });
  }
  /**
   * `Option` conflicts with another option.
   *
   * @param {Option} option
   * @param {Option} conflictingOption
   * @private
   */
  _conflictingOption(option, conflictingOption) {
    const findBestOptionFromValue = (option2) => {
      const optionKey = option2.attributeName();
      const optionValue = this.getOptionValue(optionKey);
      const negativeOption = this.options.find(
        (target) => target.negate && optionKey === target.attributeName()
      );
      const positiveOption = this.options.find(
        (target) => !target.negate && optionKey === target.attributeName()
      );
      if (negativeOption && (negativeOption.presetArg === void 0 && optionValue === false || negativeOption.presetArg !== void 0 && optionValue === negativeOption.presetArg)) {
        return negativeOption;
      }
      return positiveOption || option2;
    };
    const getErrorMessage = (option2) => {
      const bestOption = findBestOptionFromValue(option2);
      const optionKey = bestOption.attributeName();
      const source = this.getOptionValueSource(optionKey);
      if (source === "env") {
        return `environment variable '${bestOption.envVar}'`;
      }
      return `option '${bestOption.flags}'`;
    };
    const message = `error: ${getErrorMessage(option)} cannot be used with ${getErrorMessage(conflictingOption)}`;
    this.error(message, { code: "commander.conflictingOption" });
  }
  /**
   * Unknown option `flag`.
   *
   * @param {string} flag
   * @private
   */
  unknownOption(flag) {
    if (this._allowUnknownOption) return;
    let suggestion = "";
    if (flag.startsWith("--") && this._showSuggestionAfterError) {
      let candidateFlags = [];
      let command = this;
      do {
        const moreFlags = command.createHelp().visibleOptions(command).filter((option) => option.long).map((option) => option.long);
        candidateFlags = candidateFlags.concat(moreFlags);
        command = command.parent;
      } while (command && !command._enablePositionalOptions);
      suggestion = suggestSimilar(flag, candidateFlags);
    }
    const message = `error: unknown option '${flag}'${suggestion}`;
    this.error(message, { code: "commander.unknownOption" });
  }
  /**
   * Excess arguments, more than expected.
   *
   * @param {string[]} receivedArgs
   * @private
   */
  _excessArguments(receivedArgs) {
    if (this._allowExcessArguments) return;
    const expected = this.registeredArguments.length;
    const s = expected === 1 ? "" : "s";
    const received = receivedArgs.length;
    const forSubcommand = this.parent ? ` for '${this.name()}'` : "";
    const details = receivedArgs.join(", ");
    const message = `error: too many arguments${forSubcommand}. Expected ${expected} argument${s} but got ${received}: ${details}.`;
    this.error(message, { code: "commander.excessArguments" });
  }
  /**
   * Unknown command.
   *
   * @private
   */
  unknownCommand() {
    const unknownName = this.args[0];
    let suggestion = "";
    if (this._showSuggestionAfterError) {
      const candidateNames = [];
      this.createHelp().visibleCommands(this).forEach((command) => {
        candidateNames.push(command.name());
        if (command.alias()) candidateNames.push(command.alias());
      });
      suggestion = suggestSimilar(unknownName, candidateNames);
    }
    const message = `error: unknown command '${unknownName}'${suggestion}`;
    this.error(message, { code: "commander.unknownCommand" });
  }
  /**
   * Get or set the program version.
   *
   * This method auto-registers the "-V, --version" option which will print the version number.
   *
   * You can optionally supply the flags and description to override the defaults.
   *
   * @param {string} [str]
   * @param {string} [flags]
   * @param {string} [description]
   * @return {(this | string | undefined)} `this` command for chaining, or version string if no arguments
   */
  version(str, flags, description) {
    if (str === void 0) return this._version;
    this._version = str;
    flags = flags || "-V, --version";
    description = description || "output the version number";
    const versionOption = this.createOption(flags, description);
    this._versionOptionName = versionOption.attributeName();
    this._registerOption(versionOption);
    this.on("option:" + versionOption.name(), () => {
      this._outputConfiguration.writeOut(`${str}
`);
      this._exit(0, "commander.version", str);
    });
    return this;
  }
  /**
   * Set the description.
   *
   * @param {string} [str]
   * @param {object} [argsDescription]
   * @return {(string|Command)}
   */
  description(str, argsDescription) {
    if (str === void 0 && argsDescription === void 0)
      return this._description;
    this._description = str;
    if (argsDescription) {
      this._argsDescription = argsDescription;
    }
    return this;
  }
  /**
   * Set the summary. Used when listed as subcommand of parent.
   *
   * @param {string} [str]
   * @return {(string|Command)}
   */
  summary(str) {
    if (str === void 0) return this._summary;
    this._summary = str;
    return this;
  }
  /**
   * Set an alias for the command.
   *
   * You may call more than once to add multiple aliases. Only the first alias is shown in the auto-generated help.
   *
   * @param {string} [alias]
   * @return {(string|Command)}
   */
  alias(alias) {
    if (alias === void 0) return this._aliases[0];
    let command = this;
    if (this.commands.length !== 0 && this.commands[this.commands.length - 1]._executableHandler) {
      command = this.commands[this.commands.length - 1];
    }
    if (alias === command._name)
      throw new Error("Command alias can't be the same as its name");
    const matchingCommand = this.parent?._findCommand(alias);
    if (matchingCommand) {
      const existingCmd = [matchingCommand.name()].concat(matchingCommand.aliases()).join("|");
      throw new Error(
        `cannot add alias '${alias}' to command '${this.name()}' as already have command '${existingCmd}'`
      );
    }
    command._aliases.push(alias);
    return this;
  }
  /**
   * Set aliases for the command.
   *
   * Only the first alias is shown in the auto-generated help.
   *
   * @param {string[]} [aliases]
   * @return {(string[]|Command)}
   */
  aliases(aliases) {
    if (aliases === void 0) return this._aliases;
    aliases.forEach((alias) => this.alias(alias));
    return this;
  }
  /**
   * Set / get the command usage `str`.
   *
   * @param {string} [str]
   * @return {(string|Command)}
   */
  usage(str) {
    if (str === void 0) {
      if (this._usage) return this._usage;
      const args = this.registeredArguments.map((arg) => {
        return humanReadableArgName(arg);
      });
      return [].concat(
        this.options.length || this._helpOption !== null ? "[options]" : [],
        this.commands.length ? "[command]" : [],
        this.registeredArguments.length ? args : []
      ).join(" ");
    }
    this._usage = str;
    return this;
  }
  /**
   * Get or set the name of the command.
   *
   * @param {string} [str]
   * @return {(string|Command)}
   */
  name(str) {
    if (str === void 0) return this._name;
    this._name = str;
    return this;
  }
  /**
   * Set/get the help group heading for this subcommand in parent command's help.
   *
   * @param {string} [heading]
   * @return {Command | string}
   */
  helpGroup(heading) {
    if (heading === void 0) return this._helpGroupHeading ?? "";
    this._helpGroupHeading = heading;
    return this;
  }
  /**
   * Set/get the default help group heading for subcommands added to this command.
   * (This does not override a group set directly on the subcommand using .helpGroup().)
   *
   * @example
   * program.commandsGroup('Development Commands:);
   * program.command('watch')...
   * program.command('lint')...
   * ...
   *
   * @param {string} [heading]
   * @returns {Command | string}
   */
  commandsGroup(heading) {
    if (heading === void 0) return this._defaultCommandGroup ?? "";
    this._defaultCommandGroup = heading;
    return this;
  }
  /**
   * Set/get the default help group heading for options added to this command.
   * (This does not override a group set directly on the option using .helpGroup().)
   *
   * @example
   * program
   *   .optionsGroup('Development Options:')
   *   .option('-d, --debug', 'output extra debugging')
   *   .option('-p, --profile', 'output profiling information')
   *
   * @param {string} [heading]
   * @returns {Command | string}
   */
  optionsGroup(heading) {
    if (heading === void 0) return this._defaultOptionGroup ?? "";
    this._defaultOptionGroup = heading;
    return this;
  }
  /**
   * @param {Option} option
   * @private
   */
  _initOptionGroup(option) {
    if (this._defaultOptionGroup && !option.helpGroupHeading)
      option.helpGroup(this._defaultOptionGroup);
  }
  /**
   * @param {Command} cmd
   * @private
   */
  _initCommandGroup(cmd) {
    if (this._defaultCommandGroup && !cmd.helpGroup())
      cmd.helpGroup(this._defaultCommandGroup);
  }
  /**
   * Set the name of the command from script filename, such as process.argv[1],
   * or import.meta.filename.
   *
   * (Used internally and public although not documented in README.)
   *
   * @example
   * program.nameFromFilename(import.meta.filename);
   *
   * @param {string} filename
   * @return {Command}
   */
  nameFromFilename(filename) {
    this._name = path.basename(filename, path.extname(filename));
    return this;
  }
  /**
   * Get or set the directory for searching for executable subcommands of this command.
   *
   * @example
   * program.executableDir(import.meta.dirname);
   * // or
   * program.executableDir('subcommands');
   *
   * @param {string} [path]
   * @return {(string|null|Command)}
   */
  executableDir(path11) {
    if (path11 === void 0) return this._executableDir;
    this._executableDir = path11;
    return this;
  }
  /**
   * Return program help documentation.
   *
   * @param {{ error: boolean }} [contextOptions] - pass {error:true} to wrap for stderr instead of stdout
   * @return {string}
   */
  helpInformation(contextOptions) {
    const helper = this.createHelp();
    const context = this._getOutputContext(contextOptions);
    helper.prepareContext({
      error: context.error,
      helpWidth: context.helpWidth,
      outputHasColors: context.hasColors
    });
    const text = helper.formatHelp(this, helper);
    if (context.hasColors) return text;
    return this._outputConfiguration.stripColor(text);
  }
  /**
   * @typedef HelpContext
   * @type {object}
   * @property {boolean} error
   * @property {number} helpWidth
   * @property {boolean} hasColors
   * @property {function} write - includes stripColor if needed
   *
   * @returns {HelpContext}
   * @private
   */
  _getOutputContext(contextOptions) {
    contextOptions = contextOptions || {};
    const error2 = !!contextOptions.error;
    let baseWrite;
    let hasColors2;
    let helpWidth;
    if (error2) {
      baseWrite = (str) => this._outputConfiguration.writeErr(str);
      hasColors2 = this._outputConfiguration.getErrHasColors();
      helpWidth = this._outputConfiguration.getErrHelpWidth();
    } else {
      baseWrite = (str) => this._outputConfiguration.writeOut(str);
      hasColors2 = this._outputConfiguration.getOutHasColors();
      helpWidth = this._outputConfiguration.getOutHelpWidth();
    }
    const write = (str) => {
      if (!hasColors2) str = this._outputConfiguration.stripColor(str);
      return baseWrite(str);
    };
    return { error: error2, write, hasColors: hasColors2, helpWidth };
  }
  /**
   * Output help information for this command.
   *
   * Outputs built-in help, and custom text added using `.addHelpText()`.
   *
   * @param {{ error: boolean } | Function} [contextOptions] - pass {error:true} to write to stderr instead of stdout
   */
  outputHelp(contextOptions) {
    let deprecatedCallback;
    if (typeof contextOptions === "function") {
      deprecatedCallback = contextOptions;
      contextOptions = void 0;
    }
    const outputContext = this._getOutputContext(contextOptions);
    const eventContext = {
      error: outputContext.error,
      write: outputContext.write,
      command: this
    };
    this._getCommandAndAncestors().reverse().forEach((command) => command.emit("beforeAllHelp", eventContext));
    this.emit("beforeHelp", eventContext);
    let helpInformation = this.helpInformation({ error: outputContext.error });
    if (deprecatedCallback) {
      helpInformation = deprecatedCallback(helpInformation);
      if (typeof helpInformation !== "string" && !Buffer.isBuffer(helpInformation)) {
        throw new Error("outputHelp callback must return a string or a Buffer");
      }
    }
    outputContext.write(helpInformation);
    if (this._getHelpOption()?.long) {
      this.emit(this._getHelpOption().long);
    }
    this.emit("afterHelp", eventContext);
    this._getCommandAndAncestors().forEach(
      (command) => command.emit("afterAllHelp", eventContext)
    );
  }
  /**
   * You can pass in flags and a description to customise the built-in help option.
   * Pass in false to disable the built-in help option.
   *
   * @example
   * program.helpOption('-?, --help' 'show help'); // customise
   * program.helpOption(false); // disable
   *
   * @param {(string | boolean)} flags
   * @param {string} [description]
   * @return {Command} `this` command for chaining
   */
  helpOption(flags, description) {
    if (typeof flags === "boolean") {
      if (flags) {
        if (this._helpOption === null) this._helpOption = void 0;
        if (this._defaultOptionGroup) {
          this._initOptionGroup(this._getHelpOption());
        }
      } else {
        this._helpOption = null;
      }
      return this;
    }
    this._helpOption = this.createOption(
      flags ?? "-h, --help",
      description ?? "display help for command"
    );
    if (flags || description) this._initOptionGroup(this._helpOption);
    return this;
  }
  /**
   * Lazy create help option.
   * Returns null if has been disabled with .helpOption(false).
   *
   * @returns {(Option | null)} the help option
   * @package
   */
  _getHelpOption() {
    if (this._helpOption === void 0) {
      this.helpOption(void 0, void 0);
    }
    return this._helpOption;
  }
  /**
   * Supply your own option to use for the built-in help option.
   * This is an alternative to using helpOption() to customise the flags and description etc.
   *
   * @param {Option} option
   * @return {Command} `this` command for chaining
   */
  addHelpOption(option) {
    this._helpOption = option;
    this._initOptionGroup(option);
    return this;
  }
  /**
   * Output help information and exit.
   *
   * Outputs built-in help, and custom text added using `.addHelpText()`.
   *
   * @param {{ error: boolean }} [contextOptions] - pass {error:true} to write to stderr instead of stdout
   */
  help(contextOptions) {
    this.outputHelp(contextOptions);
    let exitCode = Number(process2.exitCode ?? 0);
    if (exitCode === 0 && contextOptions && typeof contextOptions !== "function" && contextOptions.error) {
      exitCode = 1;
    }
    this._exit(exitCode, "commander.help", "(outputHelp)");
  }
  /**
   * // Do a little typing to coordinate emit and listener for the help text events.
   * @typedef HelpTextEventContext
   * @type {object}
   * @property {boolean} error
   * @property {Command} command
   * @property {function} write
   */
  /**
   * Add additional text to be displayed with the built-in help.
   *
   * Position is 'before' or 'after' to affect just this command,
   * and 'beforeAll' or 'afterAll' to affect this command and all its subcommands.
   *
   * @param {string} position - before or after built-in help
   * @param {(string | Function)} text - string to add, or a function returning a string
   * @return {Command} `this` command for chaining
   */
  addHelpText(position, text) {
    const allowedValues = ["beforeAll", "before", "after", "afterAll"];
    if (!allowedValues.includes(position)) {
      throw new Error(`Unexpected value for position to addHelpText.
Expecting one of '${allowedValues.join("', '")}'`);
    }
    const helpEvent = `${position}Help`;
    this.on(helpEvent, (context) => {
      let helpStr;
      if (typeof text === "function") {
        helpStr = text({ error: context.error, command: context.command });
      } else {
        helpStr = text;
      }
      if (helpStr) {
        context.write(`${helpStr}
`);
      }
    });
    return this;
  }
  /**
   * Output help information if help flags specified
   *
   * @param {Array} args - array of options to search for help flags
   * @private
   */
  _outputHelpIfRequested(args) {
    const helpOption = this._getHelpOption();
    const helpRequested = helpOption && args.find((arg) => helpOption.is(arg));
    if (helpRequested) {
      this.outputHelp();
      this._exit(0, "commander.helpDisplayed", "(outputHelp)");
    }
  }
};
function incrementNodeInspectorPort(args) {
  return args.map((arg) => {
    if (!arg.startsWith("--inspect")) {
      return arg;
    }
    let debugOption;
    let debugHost = "127.0.0.1";
    let debugPort = "9229";
    let match;
    if ((match = arg.match(/^(--inspect(-brk)?)$/)) !== null) {
      debugOption = match[1];
    } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+)$/)) !== null) {
      debugOption = match[1];
      if (/^\d+$/.test(match[3])) {
        debugPort = match[3];
      } else {
        debugHost = match[3];
      }
    } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/)) !== null) {
      debugOption = match[1];
      debugHost = match[3];
      debugPort = match[4];
    }
    if (debugOption && debugPort !== "0") {
      return `${debugOption}=${debugHost}:${parseInt(debugPort) + 1}`;
    }
    return arg;
  });
}
function useColor() {
  if (process2.env.NO_COLOR || process2.env.FORCE_COLOR === "0" || process2.env.FORCE_COLOR === "false")
    return false;
  if (process2.env.FORCE_COLOR || process2.env.CLICOLOR_FORCE !== void 0)
    return true;
  return void 0;
}

// node_modules/commander/index.js
var program = new Command();

// node_modules/@inquirer/core/dist/lib/key.js
var keybindings = ["emacs", "vim"];
var keybindingLookup = new Set(keybindings);
function isKeybinding(value) {
  return keybindingLookup.has(value);
}
function getDefaultKeybindings() {
  const env2 = process.env["INQUIRER_KEYBINDINGS"];
  if (!env2)
    return [];
  return Array.from(new Set(env2.toLowerCase().split(/[\s,]+/).filter(isKeybinding)));
}
var isBackspaceKey = (key) => key.name === "backspace";
var isTabKey = (key) => key.name === "tab";
var isEnterKey = (key) => key.name === "enter" || key.name === "return";

// node_modules/@inquirer/core/dist/lib/errors.js
var AbortPromptError = class extends Error {
  name = "AbortPromptError";
  message = "Prompt was aborted";
  constructor(options) {
    super();
    this.cause = options?.cause;
  }
};
var CancelPromptError = class extends Error {
  name = "CancelPromptError";
  message = "Prompt was canceled";
};
var ExitPromptError = class extends Error {
  name = "ExitPromptError";
};
var HookError = class extends Error {
  name = "HookError";
};
var ValidationError = class extends Error {
  name = "ValidationError";
};

// node_modules/@inquirer/core/dist/lib/use-state.js
import { AsyncResource as AsyncResource2 } from "async_hooks";

// node_modules/@inquirer/core/dist/lib/hook-engine.js
import { AsyncLocalStorage, AsyncResource } from "async_hooks";
var hookStorage = new AsyncLocalStorage();
function createStore(rl) {
  const store = {
    rl,
    hooks: [],
    hooksCleanup: [],
    hooksEffect: [],
    index: 0,
    handleChange() {
    }
  };
  return store;
}
function withHooks(rl, cb) {
  const store = createStore(rl);
  return hookStorage.run(store, () => {
    function cycle(render) {
      store.handleChange = () => {
        store.index = 0;
        render();
      };
      store.handleChange();
    }
    return cb(cycle);
  });
}
function getStore() {
  const store = hookStorage.getStore();
  if (!store) {
    throw new HookError("[Inquirer] Hook functions can only be called from within a prompt");
  }
  return store;
}
function readline() {
  return getStore().rl;
}
function withUpdates(fn2) {
  const wrapped = (...args) => {
    const store = getStore();
    let shouldUpdate = false;
    const oldHandleChange = store.handleChange;
    store.handleChange = () => {
      shouldUpdate = true;
    };
    const returnValue = fn2(...args);
    if (shouldUpdate) {
      oldHandleChange();
    }
    store.handleChange = oldHandleChange;
    return returnValue;
  };
  return AsyncResource.bind(wrapped);
}
function withPointer(cb) {
  const store = getStore();
  const { index } = store;
  const pointer = {
    get() {
      return store.hooks[index];
    },
    set(value) {
      store.hooks[index] = value;
    },
    initialized: index in store.hooks
  };
  const returnValue = cb(pointer);
  store.index++;
  return returnValue;
}
function handleChange() {
  getStore().handleChange();
}
var effectScheduler = {
  queue(cb) {
    const store = getStore();
    const { index } = store;
    store.hooksEffect.push(() => {
      store.hooksCleanup[index]?.();
      const cleanFn = cb(readline());
      if (cleanFn != null && typeof cleanFn !== "function") {
        throw new ValidationError("useEffect return value must be a cleanup function or nothing.");
      }
      store.hooksCleanup[index] = cleanFn;
    });
  },
  run() {
    const store = getStore();
    withUpdates(() => {
      store.hooksEffect.forEach((effect) => {
        effect();
      });
      store.hooksEffect.length = 0;
    })();
  },
  clearAll() {
    const store = getStore();
    store.hooksCleanup.forEach((cleanFn) => {
      cleanFn?.();
    });
    store.hooksEffect.length = 0;
    store.hooksCleanup.length = 0;
  }
};

// node_modules/@inquirer/core/dist/lib/use-state.js
function isFactory(value) {
  return typeof value === "function";
}
function isReducer(value) {
  return typeof value === "function";
}
function useState(defaultValue) {
  return withPointer((pointer) => {
    const setState = AsyncResource2.bind(function setState2(newValue) {
      const currentValue = pointer.get();
      const nextValue = isReducer(newValue) ? newValue(currentValue) : newValue;
      if (!Object.is(currentValue, nextValue)) {
        pointer.set(nextValue);
        handleChange();
      }
    });
    if (pointer.initialized) {
      return [pointer.get(), setState];
    }
    const value = isFactory(defaultValue) ? defaultValue() : defaultValue;
    pointer.set(value);
    return [value, setState];
  });
}

// node_modules/@inquirer/core/dist/lib/use-effect.js
function useEffect(cb, depArray) {
  withPointer((pointer) => {
    const oldDeps = pointer.get();
    const hasChanged = !Array.isArray(oldDeps) || depArray.some((dep, i) => !Object.is(dep, oldDeps[i]));
    if (hasChanged) {
      effectScheduler.queue(cb);
    }
    pointer.set(depArray);
  });
}

// node_modules/@inquirer/core/dist/lib/theme.js
import { styleText } from "util";

// node_modules/@inquirer/figures/dist/index.js
import process3 from "process";
function isUnicodeSupported() {
  if (!process3.platform.startsWith("win")) {
    return process3.env["TERM"] !== "linux";
  }
  return Boolean(process3.env["CI"]) || // CI environments generally support unicode
  Boolean(process3.env["WT_SESSION"]) || // Windows Terminal
  Boolean(process3.env["TERMINUS_SUBLIME"]) || // Terminus (<0.2.27)
  process3.env["ConEmuTask"] === "{cmd::Cmder}" || // ConEmu and cmder
  process3.env["TERM_PROGRAM"] === "Terminus-Sublime" || process3.env["TERM_PROGRAM"] === "vscode" || process3.env["TERM"] === "xterm-256color" || process3.env["TERM"] === "alacritty" || process3.env["TERMINAL_EMULATOR"] === "JetBrains-JediTerm";
}
var common = {
  circleQuestionMark: "(?)",
  questionMarkPrefix: "(?)",
  square: "\u2588",
  squareDarkShade: "\u2593",
  squareMediumShade: "\u2592",
  squareLightShade: "\u2591",
  squareTop: "\u2580",
  squareBottom: "\u2584",
  squareLeft: "\u258C",
  squareRight: "\u2590",
  squareCenter: "\u25A0",
  bullet: "\u25CF",
  dot: "\u2024",
  ellipsis: "\u2026",
  pointerSmall: "\u203A",
  triangleUp: "\u25B2",
  triangleUpSmall: "\u25B4",
  triangleDown: "\u25BC",
  triangleDownSmall: "\u25BE",
  triangleLeftSmall: "\u25C2",
  triangleRightSmall: "\u25B8",
  home: "\u2302",
  heart: "\u2665",
  musicNote: "\u266A",
  musicNoteBeamed: "\u266B",
  arrowUp: "\u2191",
  arrowDown: "\u2193",
  arrowLeft: "\u2190",
  arrowRight: "\u2192",
  arrowLeftRight: "\u2194",
  arrowUpDown: "\u2195",
  almostEqual: "\u2248",
  notEqual: "\u2260",
  lessOrEqual: "\u2264",
  greaterOrEqual: "\u2265",
  identical: "\u2261",
  infinity: "\u221E",
  subscriptZero: "\u2080",
  subscriptOne: "\u2081",
  subscriptTwo: "\u2082",
  subscriptThree: "\u2083",
  subscriptFour: "\u2084",
  subscriptFive: "\u2085",
  subscriptSix: "\u2086",
  subscriptSeven: "\u2087",
  subscriptEight: "\u2088",
  subscriptNine: "\u2089",
  oneHalf: "\xBD",
  oneThird: "\u2153",
  oneQuarter: "\xBC",
  oneFifth: "\u2155",
  oneSixth: "\u2159",
  oneEighth: "\u215B",
  twoThirds: "\u2154",
  twoFifths: "\u2156",
  threeQuarters: "\xBE",
  threeFifths: "\u2157",
  threeEighths: "\u215C",
  fourFifths: "\u2158",
  fiveSixths: "\u215A",
  fiveEighths: "\u215D",
  sevenEighths: "\u215E",
  line: "\u2500",
  lineBold: "\u2501",
  lineDouble: "\u2550",
  lineDashed0: "\u2504",
  lineDashed1: "\u2505",
  lineDashed2: "\u2508",
  lineDashed3: "\u2509",
  lineDashed4: "\u254C",
  lineDashed5: "\u254D",
  lineDashed6: "\u2574",
  lineDashed7: "\u2576",
  lineDashed8: "\u2578",
  lineDashed9: "\u257A",
  lineDashed10: "\u257C",
  lineDashed11: "\u257E",
  lineDashed12: "\u2212",
  lineDashed13: "\u2013",
  lineDashed14: "\u2010",
  lineDashed15: "\u2043",
  lineVertical: "\u2502",
  lineVerticalBold: "\u2503",
  lineVerticalDouble: "\u2551",
  lineVerticalDashed0: "\u2506",
  lineVerticalDashed1: "\u2507",
  lineVerticalDashed2: "\u250A",
  lineVerticalDashed3: "\u250B",
  lineVerticalDashed4: "\u254E",
  lineVerticalDashed5: "\u254F",
  lineVerticalDashed6: "\u2575",
  lineVerticalDashed7: "\u2577",
  lineVerticalDashed8: "\u2579",
  lineVerticalDashed9: "\u257B",
  lineVerticalDashed10: "\u257D",
  lineVerticalDashed11: "\u257F",
  lineDownLeft: "\u2510",
  lineDownLeftArc: "\u256E",
  lineDownBoldLeftBold: "\u2513",
  lineDownBoldLeft: "\u2512",
  lineDownLeftBold: "\u2511",
  lineDownDoubleLeftDouble: "\u2557",
  lineDownDoubleLeft: "\u2556",
  lineDownLeftDouble: "\u2555",
  lineDownRight: "\u250C",
  lineDownRightArc: "\u256D",
  lineDownBoldRightBold: "\u250F",
  lineDownBoldRight: "\u250E",
  lineDownRightBold: "\u250D",
  lineDownDoubleRightDouble: "\u2554",
  lineDownDoubleRight: "\u2553",
  lineDownRightDouble: "\u2552",
  lineUpLeft: "\u2518",
  lineUpLeftArc: "\u256F",
  lineUpBoldLeftBold: "\u251B",
  lineUpBoldLeft: "\u251A",
  lineUpLeftBold: "\u2519",
  lineUpDoubleLeftDouble: "\u255D",
  lineUpDoubleLeft: "\u255C",
  lineUpLeftDouble: "\u255B",
  lineUpRight: "\u2514",
  lineUpRightArc: "\u2570",
  lineUpBoldRightBold: "\u2517",
  lineUpBoldRight: "\u2516",
  lineUpRightBold: "\u2515",
  lineUpDoubleRightDouble: "\u255A",
  lineUpDoubleRight: "\u2559",
  lineUpRightDouble: "\u2558",
  lineUpDownLeft: "\u2524",
  lineUpBoldDownBoldLeftBold: "\u252B",
  lineUpBoldDownBoldLeft: "\u2528",
  lineUpDownLeftBold: "\u2525",
  lineUpBoldDownLeftBold: "\u2529",
  lineUpDownBoldLeftBold: "\u252A",
  lineUpDownBoldLeft: "\u2527",
  lineUpBoldDownLeft: "\u2526",
  lineUpDoubleDownDoubleLeftDouble: "\u2563",
  lineUpDoubleDownDoubleLeft: "\u2562",
  lineUpDownLeftDouble: "\u2561",
  lineUpDownRight: "\u251C",
  lineUpBoldDownBoldRightBold: "\u2523",
  lineUpBoldDownBoldRight: "\u2520",
  lineUpDownRightBold: "\u251D",
  lineUpBoldDownRightBold: "\u2521",
  lineUpDownBoldRightBold: "\u2522",
  lineUpDownBoldRight: "\u251F",
  lineUpBoldDownRight: "\u251E",
  lineUpDoubleDownDoubleRightDouble: "\u2560",
  lineUpDoubleDownDoubleRight: "\u255F",
  lineUpDownRightDouble: "\u255E",
  lineDownLeftRight: "\u252C",
  lineDownBoldLeftBoldRightBold: "\u2533",
  lineDownLeftBoldRightBold: "\u252F",
  lineDownBoldLeftRight: "\u2530",
  lineDownBoldLeftBoldRight: "\u2531",
  lineDownBoldLeftRightBold: "\u2532",
  lineDownLeftRightBold: "\u252E",
  lineDownLeftBoldRight: "\u252D",
  lineDownDoubleLeftDoubleRightDouble: "\u2566",
  lineDownDoubleLeftRight: "\u2565",
  lineDownLeftDoubleRightDouble: "\u2564",
  lineUpLeftRight: "\u2534",
  lineUpBoldLeftBoldRightBold: "\u253B",
  lineUpLeftBoldRightBold: "\u2537",
  lineUpBoldLeftRight: "\u2538",
  lineUpBoldLeftBoldRight: "\u2539",
  lineUpBoldLeftRightBold: "\u253A",
  lineUpLeftRightBold: "\u2536",
  lineUpLeftBoldRight: "\u2535",
  lineUpDoubleLeftDoubleRightDouble: "\u2569",
  lineUpDoubleLeftRight: "\u2568",
  lineUpLeftDoubleRightDouble: "\u2567",
  lineUpDownLeftRight: "\u253C",
  lineUpBoldDownBoldLeftBoldRightBold: "\u254B",
  lineUpDownBoldLeftBoldRightBold: "\u2548",
  lineUpBoldDownLeftBoldRightBold: "\u2547",
  lineUpBoldDownBoldLeftRightBold: "\u254A",
  lineUpBoldDownBoldLeftBoldRight: "\u2549",
  lineUpBoldDownLeftRight: "\u2540",
  lineUpDownBoldLeftRight: "\u2541",
  lineUpDownLeftBoldRight: "\u253D",
  lineUpDownLeftRightBold: "\u253E",
  lineUpBoldDownBoldLeftRight: "\u2542",
  lineUpDownLeftBoldRightBold: "\u253F",
  lineUpBoldDownLeftBoldRight: "\u2543",
  lineUpBoldDownLeftRightBold: "\u2544",
  lineUpDownBoldLeftBoldRight: "\u2545",
  lineUpDownBoldLeftRightBold: "\u2546",
  lineUpDoubleDownDoubleLeftDoubleRightDouble: "\u256C",
  lineUpDoubleDownDoubleLeftRight: "\u256B",
  lineUpDownLeftDoubleRightDouble: "\u256A",
  lineCross: "\u2573",
  lineBackslash: "\u2572",
  lineSlash: "\u2571"
};
var specialMainSymbols = {
  tick: "\u2714",
  info: "\u2139",
  warning: "\u26A0",
  cross: "\u2718",
  squareSmall: "\u25FB",
  squareSmallFilled: "\u25FC",
  circle: "\u25EF",
  circleFilled: "\u25C9",
  circleDotted: "\u25CC",
  circleDouble: "\u25CE",
  circleCircle: "\u24DE",
  circleCross: "\u24E7",
  circlePipe: "\u24BE",
  radioOn: "\u25C9",
  radioOff: "\u25EF",
  checkboxOn: "\u2612",
  checkboxOff: "\u2610",
  checkboxCircleOn: "\u24E7",
  checkboxCircleOff: "\u24BE",
  pointer: "\u276F",
  triangleUpOutline: "\u25B3",
  triangleLeft: "\u25C0",
  triangleRight: "\u25B6",
  lozenge: "\u25C6",
  lozengeOutline: "\u25C7",
  hamburger: "\u2630",
  smiley: "\u32E1",
  mustache: "\u0DF4",
  star: "\u2605",
  play: "\u25B6",
  nodejs: "\u2B22",
  oneSeventh: "\u2150",
  oneNinth: "\u2151",
  oneTenth: "\u2152"
};
var specialFallbackSymbols = {
  tick: "\u221A",
  info: "i",
  warning: "\u203C",
  cross: "\xD7",
  squareSmall: "\u25A1",
  squareSmallFilled: "\u25A0",
  circle: "( )",
  circleFilled: "(*)",
  circleDotted: "( )",
  circleDouble: "( )",
  circleCircle: "(\u25CB)",
  circleCross: "(\xD7)",
  circlePipe: "(\u2502)",
  radioOn: "(*)",
  radioOff: "( )",
  checkboxOn: "[\xD7]",
  checkboxOff: "[ ]",
  checkboxCircleOn: "(\xD7)",
  checkboxCircleOff: "( )",
  pointer: ">",
  triangleUpOutline: "\u2206",
  triangleLeft: "\u25C4",
  triangleRight: "\u25BA",
  lozenge: "\u2666",
  lozengeOutline: "\u25CA",
  hamburger: "\u2261",
  smiley: "\u263A",
  mustache: "\u250C\u2500\u2510",
  star: "\u2736",
  play: "\u25BA",
  nodejs: "\u2666",
  oneSeventh: "1/7",
  oneNinth: "1/9",
  oneTenth: "1/10"
};
var mainSymbols = {
  ...common,
  ...specialMainSymbols
};
var fallbackSymbols = {
  ...common,
  ...specialFallbackSymbols
};
var shouldUseMain = isUnicodeSupported();
var figures = shouldUseMain ? mainSymbols : fallbackSymbols;
var dist_default = figures;
var replacements = Object.entries(specialMainSymbols);

// node_modules/@inquirer/core/dist/lib/theme.js
var defaultTheme = {
  prefix: {
    idle: styleText("blue", "?"),
    done: styleText("green", dist_default.tick)
  },
  spinner: {
    interval: 80,
    frames: ["\u280B", "\u2819", "\u2839", "\u2838", "\u283C", "\u2834", "\u2826", "\u2827", "\u2807", "\u280F"].map((frame) => styleText("yellow", frame))
  },
  keybindings: [],
  style: {
    answer: (text) => styleText("cyan", text),
    message: (text) => styleText("bold", text),
    error: (text) => styleText("red", `> ${text}`),
    defaultAnswer: (text) => styleText("dim", `(${text})`),
    help: (text) => styleText("dim", text),
    highlight: (text) => styleText("cyan", text),
    key: (text) => styleText("cyan", styleText("bold", `<${text}>`))
  }
};
function getDefaultTheme() {
  return {
    ...defaultTheme,
    keybindings: getDefaultKeybindings()
  };
}

// node_modules/@inquirer/core/dist/lib/make-theme.js
function isPlainObject(value) {
  if (typeof value !== "object" || value === null)
    return false;
  let proto2 = value;
  while (Object.getPrototypeOf(proto2) !== null) {
    proto2 = Object.getPrototypeOf(proto2);
  }
  return Object.getPrototypeOf(value) === proto2;
}
function deepMerge(...objects) {
  const output = {};
  for (const obj of objects) {
    for (const [key, value] of Object.entries(obj)) {
      const prevValue = output[key];
      output[key] = isPlainObject(prevValue) && isPlainObject(value) ? deepMerge(prevValue, value) : value;
    }
  }
  return output;
}
function makeTheme(...themes) {
  const themesToMerge = [
    getDefaultTheme(),
    ...themes.filter((theme) => theme != null)
  ];
  return deepMerge(...themesToMerge);
}

// node_modules/@inquirer/core/dist/lib/use-prefix.js
function usePrefix({ status = "idle", theme }) {
  const [showLoader, setShowLoader] = useState(false);
  const [tick, setTick] = useState(0);
  const { prefix, spinner } = makeTheme(theme);
  useEffect(() => {
    if (status === "loading") {
      let tickInterval;
      let inc = -1;
      const delayTimeout = setTimeout(() => {
        setShowLoader(true);
        tickInterval = setInterval(() => {
          inc = inc + 1;
          setTick(inc % spinner.frames.length);
        }, spinner.interval);
      }, 300);
      return () => {
        clearTimeout(delayTimeout);
        clearInterval(tickInterval);
      };
    } else {
      setShowLoader(false);
    }
  }, [status]);
  if (showLoader) {
    return spinner.frames[tick];
  }
  const iconName = status === "loading" ? "idle" : status;
  return typeof prefix === "string" ? prefix : prefix[iconName] ?? prefix["idle"];
}

// node_modules/@inquirer/core/dist/lib/use-ref.js
function useRef(val) {
  return useState({ current: val })[0];
}

// node_modules/@inquirer/core/dist/lib/use-keypress.js
function useKeypress(userHandler) {
  const signal = useRef(userHandler);
  signal.current = userHandler;
  useEffect((rl) => {
    let ignore = false;
    const handler = withUpdates((_input, event) => {
      if (ignore)
        return;
      void signal.current(event, rl);
    });
    rl.input.on("keypress", handler);
    return () => {
      ignore = true;
      rl.input.removeListener("keypress", handler);
    };
  }, []);
}

// node_modules/@inquirer/core/dist/lib/utils.js
var import_cli_width = __toESM(require_cli_width(), 1);

// node_modules/fast-string-truncated-width/dist/utils.js
var getCodePointsLength = /* @__PURE__ */ (() => {
  const SURROGATE_PAIR_RE = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  return (input) => {
    let surrogatePairsNr = 0;
    SURROGATE_PAIR_RE.lastIndex = 0;
    while (SURROGATE_PAIR_RE.test(input)) {
      surrogatePairsNr += 1;
    }
    return input.length - surrogatePairsNr;
  };
})();
var isFullWidth = (x2) => {
  return x2 === 12288 || x2 >= 65281 && x2 <= 65376 || x2 >= 65504 && x2 <= 65510;
};
var isWideNotCJKTNotEmoji = (x2) => {
  return x2 === 8987 || x2 === 9001 || x2 >= 12272 && x2 <= 12287 || x2 >= 12289 && x2 <= 12350 || x2 >= 12441 && x2 <= 12543 || x2 >= 12549 && x2 <= 12591 || x2 >= 12593 && x2 <= 12686 || x2 >= 12688 && x2 <= 12771 || x2 >= 12783 && x2 <= 12830 || x2 >= 12832 && x2 <= 12871 || x2 >= 12880 && x2 <= 19903 || x2 >= 65040 && x2 <= 65049 || x2 >= 65072 && x2 <= 65106 || x2 >= 65108 && x2 <= 65126 || x2 >= 65128 && x2 <= 65131 || x2 >= 127488 && x2 <= 127490 || x2 >= 127504 && x2 <= 127547 || x2 >= 127552 && x2 <= 127560 || x2 >= 131072 && x2 <= 196605 || x2 >= 196608 && x2 <= 262141;
};

// node_modules/fast-string-truncated-width/dist/index.js
var ANSI_RE = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]|\u001b\]8;[^;]*;.*?(?:\u0007|\u001b\u005c)/y;
var CONTROL_RE = /[\x00-\x08\x0A-\x1F\x7F-\x9F]{1,1000}/y;
var CJKT_WIDE_RE = /(?:(?![\uFF61-\uFF9F\uFF00-\uFFEF])[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}\p{Script=Tangut}]){1,1000}/yu;
var TAB_RE = /\t{1,1000}/y;
var EMOJI_RE = /[\u{1F1E6}-\u{1F1FF}]{2}|\u{1F3F4}[\u{E0061}-\u{E007A}]{2}[\u{E0030}-\u{E0039}\u{E0061}-\u{E007A}]{1,3}\u{E007F}|(?:\p{Emoji}\uFE0F\u20E3?|\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation})(?:\u200D(?:\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F\u20E3?))*/yu;
var LATIN_RE = /(?:[\x20-\x7E\xA0-\xFF](?!\uFE0F)){1,1000}/y;
var MODIFIER_RE = /\p{M}+/gu;
var NO_TRUNCATION = { limit: Infinity, ellipsis: "" };
var getStringTruncatedWidth = (input, truncationOptions = {}, widthOptions = {}) => {
  const LIMIT = truncationOptions.limit ?? Infinity;
  const ELLIPSIS = truncationOptions.ellipsis ?? "";
  const ELLIPSIS_WIDTH = truncationOptions?.ellipsisWidth ?? (ELLIPSIS ? getStringTruncatedWidth(ELLIPSIS, NO_TRUNCATION, widthOptions).width : 0);
  const ANSI_WIDTH = 0;
  const CONTROL_WIDTH = widthOptions.controlWidth ?? 0;
  const TAB_WIDTH = widthOptions.tabWidth ?? 8;
  const EMOJI_WIDTH = widthOptions.emojiWidth ?? 2;
  const FULL_WIDTH_WIDTH = 2;
  const REGULAR_WIDTH = widthOptions.regularWidth ?? 1;
  const WIDE_WIDTH = widthOptions.wideWidth ?? FULL_WIDTH_WIDTH;
  const PARSE_BLOCKS = [
    [LATIN_RE, REGULAR_WIDTH],
    [ANSI_RE, ANSI_WIDTH],
    [CONTROL_RE, CONTROL_WIDTH],
    [TAB_RE, TAB_WIDTH],
    [EMOJI_RE, EMOJI_WIDTH],
    [CJKT_WIDE_RE, WIDE_WIDTH]
  ];
  let indexPrev = 0;
  let index = 0;
  let length = input.length;
  let lengthExtra = 0;
  let truncationEnabled = false;
  let truncationIndex = length;
  let truncationLimit = Math.max(0, LIMIT - ELLIPSIS_WIDTH);
  let unmatchedStart = 0;
  let unmatchedEnd = 0;
  let width = 0;
  let widthExtra = 0;
  outer: while (true) {
    if (unmatchedEnd > unmatchedStart || index >= length && index > indexPrev) {
      const unmatched = input.slice(unmatchedStart, unmatchedEnd) || input.slice(indexPrev, index);
      lengthExtra = 0;
      for (const char of unmatched.replaceAll(MODIFIER_RE, "")) {
        const codePoint = char.codePointAt(0) || 0;
        if (isFullWidth(codePoint)) {
          widthExtra = FULL_WIDTH_WIDTH;
        } else if (isWideNotCJKTNotEmoji(codePoint)) {
          widthExtra = WIDE_WIDTH;
        } else {
          widthExtra = REGULAR_WIDTH;
        }
        if (width + widthExtra > truncationLimit) {
          truncationIndex = Math.min(truncationIndex, Math.max(unmatchedStart, indexPrev) + lengthExtra);
        }
        if (width + widthExtra > LIMIT) {
          truncationEnabled = true;
          break outer;
        }
        lengthExtra += char.length;
        width += widthExtra;
      }
      unmatchedStart = unmatchedEnd = 0;
    }
    if (index >= length) {
      break outer;
    }
    for (let i = 0, l = PARSE_BLOCKS.length; i < l; i++) {
      const [BLOCK_RE, BLOCK_WIDTH] = PARSE_BLOCKS[i];
      BLOCK_RE.lastIndex = index;
      if (BLOCK_RE.test(input)) {
        lengthExtra = BLOCK_RE === CJKT_WIDE_RE ? getCodePointsLength(input.slice(index, BLOCK_RE.lastIndex)) : BLOCK_RE === EMOJI_RE ? 1 : BLOCK_RE.lastIndex - index;
        widthExtra = lengthExtra * BLOCK_WIDTH;
        if (width + widthExtra > truncationLimit) {
          truncationIndex = Math.min(truncationIndex, index + Math.floor((truncationLimit - width) / BLOCK_WIDTH));
        }
        if (width + widthExtra > LIMIT) {
          truncationEnabled = true;
          break outer;
        }
        width += widthExtra;
        unmatchedStart = indexPrev;
        unmatchedEnd = index;
        index = indexPrev = BLOCK_RE.lastIndex;
        continue outer;
      }
    }
    index += 1;
  }
  return {
    width: truncationEnabled ? truncationLimit : width,
    index: truncationEnabled ? truncationIndex : length,
    truncated: truncationEnabled,
    ellipsed: truncationEnabled && LIMIT >= ELLIPSIS_WIDTH
  };
};
var dist_default2 = getStringTruncatedWidth;

// node_modules/fast-string-width/dist/index.js
var NO_TRUNCATION2 = {
  limit: Infinity,
  ellipsis: "",
  ellipsisWidth: 0
};
var fastStringWidth = (input, options = {}) => {
  return dist_default2(input, NO_TRUNCATION2, options).width;
};
var dist_default3 = fastStringWidth;

// node_modules/fast-wrap-ansi/lib/main.js
var ESC = "\x1B";
var CSI = "\x9B";
var END_CODE = 39;
var ANSI_ESCAPE_BELL = "\x07";
var ANSI_CSI = "[";
var ANSI_OSC = "]";
var ANSI_SGR_TERMINATOR = "m";
var ANSI_ESCAPE_LINK = `${ANSI_OSC}8;;`;
var GROUP_REGEX = new RegExp(`(?:\\${ANSI_CSI}(?<code>\\d+)m|\\${ANSI_ESCAPE_LINK}(?<uri>.*)${ANSI_ESCAPE_BELL})`, "y");
var getClosingCode = (openingCode) => {
  if (openingCode >= 30 && openingCode <= 37)
    return 39;
  if (openingCode >= 90 && openingCode <= 97)
    return 39;
  if (openingCode >= 40 && openingCode <= 47)
    return 49;
  if (openingCode >= 100 && openingCode <= 107)
    return 49;
  if (openingCode === 1 || openingCode === 2)
    return 22;
  if (openingCode === 3)
    return 23;
  if (openingCode === 4)
    return 24;
  if (openingCode === 7)
    return 27;
  if (openingCode === 8)
    return 28;
  if (openingCode === 9)
    return 29;
  if (openingCode === 0)
    return 0;
  return void 0;
};
var wrapAnsiCode = (code) => `${ESC}${ANSI_CSI}${code}${ANSI_SGR_TERMINATOR}`;
var wrapAnsiHyperlink = (url) => `${ESC}${ANSI_ESCAPE_LINK}${url}${ANSI_ESCAPE_BELL}`;
var wrapWord = (rows, word, columns) => {
  const characters = word[Symbol.iterator]();
  let isInsideEscape = false;
  let isInsideLinkEscape = false;
  let lastRow = rows.at(-1);
  let visible = lastRow === void 0 ? 0 : dist_default3(lastRow);
  let currentCharacter = characters.next();
  let nextCharacter = characters.next();
  let rawCharacterIndex = 0;
  while (!currentCharacter.done) {
    const character = currentCharacter.value;
    const characterLength = dist_default3(character);
    if (visible + characterLength <= columns) {
      rows[rows.length - 1] += character;
    } else {
      rows.push(character);
      visible = 0;
    }
    if (character === ESC || character === CSI) {
      isInsideEscape = true;
      isInsideLinkEscape = word.startsWith(ANSI_ESCAPE_LINK, rawCharacterIndex + 1);
    }
    if (isInsideEscape) {
      if (isInsideLinkEscape) {
        if (character === ANSI_ESCAPE_BELL) {
          isInsideEscape = false;
          isInsideLinkEscape = false;
        }
      } else if (character === ANSI_SGR_TERMINATOR) {
        isInsideEscape = false;
      }
    } else {
      visible += characterLength;
      if (visible === columns && !nextCharacter.done) {
        rows.push("");
        visible = 0;
      }
    }
    currentCharacter = nextCharacter;
    nextCharacter = characters.next();
    rawCharacterIndex += character.length;
  }
  lastRow = rows.at(-1);
  if (!visible && lastRow !== void 0 && lastRow.length && rows.length > 1) {
    rows[rows.length - 2] += rows.pop();
  }
};
var stringVisibleTrimSpacesRight = (string) => {
  const words = string.split(" ");
  let last = words.length;
  while (last) {
    if (dist_default3(words[last - 1])) {
      break;
    }
    last--;
  }
  if (last === words.length) {
    return string;
  }
  return words.slice(0, last).join(" ") + words.slice(last).join("");
};
var exec = (string, columns, options = {}) => {
  if (options.trim !== false && string.trim() === "") {
    return "";
  }
  let returnValue = "";
  let escapeCode;
  let escapeUrl;
  const words = string.split(" ");
  let rows = [""];
  let rowLength = 0;
  for (let index = 0; index < words.length; index++) {
    const word = words[index];
    if (options.trim !== false) {
      const row = rows.at(-1) ?? "";
      const trimmed = row.trimStart();
      if (row.length !== trimmed.length) {
        rows[rows.length - 1] = trimmed;
        rowLength = dist_default3(trimmed);
      }
    }
    if (index !== 0) {
      if (rowLength >= columns && (options.wordWrap === false || options.trim === false)) {
        rows.push("");
        rowLength = 0;
      }
      if (rowLength || options.trim === false) {
        rows[rows.length - 1] += " ";
        rowLength++;
      }
    }
    const wordLength = dist_default3(word);
    if (options.hard && wordLength > columns) {
      const remainingColumns = columns - rowLength;
      const breaksStartingThisLine = 1 + Math.floor((wordLength - remainingColumns - 1) / columns);
      const breaksStartingNextLine = Math.floor((wordLength - 1) / columns);
      if (breaksStartingNextLine < breaksStartingThisLine) {
        rows.push("");
      }
      wrapWord(rows, word, columns);
      rowLength = dist_default3(rows.at(-1) ?? "");
      continue;
    }
    if (rowLength + wordLength > columns && rowLength && wordLength) {
      if (options.wordWrap === false && rowLength < columns) {
        wrapWord(rows, word, columns);
        rowLength = dist_default3(rows.at(-1) ?? "");
        continue;
      }
      rows.push("");
      rowLength = 0;
    }
    if (rowLength + wordLength > columns && options.wordWrap === false) {
      wrapWord(rows, word, columns);
      rowLength = dist_default3(rows.at(-1) ?? "");
      continue;
    }
    rows[rows.length - 1] += word;
    rowLength += wordLength;
  }
  if (options.trim !== false) {
    rows = rows.map((row) => stringVisibleTrimSpacesRight(row));
  }
  const preString = rows.join("\n");
  let inSurrogate = false;
  for (let i = 0; i < preString.length; i++) {
    const character = preString[i];
    returnValue += character;
    if (!inSurrogate) {
      inSurrogate = character >= "\uD800" && character <= "\uDBFF";
      if (inSurrogate) {
        continue;
      }
    } else {
      inSurrogate = false;
    }
    if (character === ESC || character === CSI) {
      GROUP_REGEX.lastIndex = i + 1;
      const groupsResult = GROUP_REGEX.exec(preString);
      const groups = groupsResult?.groups;
      if (groups?.code !== void 0) {
        const code = Number.parseFloat(groups.code);
        escapeCode = code === END_CODE ? void 0 : code;
      } else if (groups?.uri !== void 0) {
        escapeUrl = groups.uri.length === 0 ? void 0 : groups.uri;
      }
    }
    if (preString[i + 1] === "\n") {
      if (escapeUrl) {
        returnValue += wrapAnsiHyperlink("");
      }
      const closingCode = escapeCode ? getClosingCode(escapeCode) : void 0;
      if (escapeCode && closingCode) {
        returnValue += wrapAnsiCode(closingCode);
      }
    } else if (character === "\n") {
      if (escapeCode && getClosingCode(escapeCode)) {
        returnValue += wrapAnsiCode(escapeCode);
      }
      if (escapeUrl) {
        returnValue += wrapAnsiHyperlink(escapeUrl);
      }
    }
  }
  return returnValue;
};
var CRLF_OR_LF = /\r?\n/;
function wrapAnsi(string, columns, options) {
  return String(string).normalize().split(CRLF_OR_LF).map((line) => exec(line, columns, options)).join("\n");
}

// node_modules/@inquirer/core/dist/lib/utils.js
function breakLines(content, width) {
  return content.split("\n").flatMap((line) => wrapAnsi(line, width, { trim: false, wordWrap: false }).split("\n").map((str) => str.trimEnd())).join("\n");
}
function readlineWidth() {
  return (0, import_cli_width.default)({ defaultWidth: 80, output: readline().output });
}

// node_modules/@inquirer/core/dist/lib/create-prompt.js
var import_mute_stream = __toESM(require_lib(), 1);
import * as readline2 from "readline";
import { AsyncResource as AsyncResource3 } from "async_hooks";

// node_modules/signal-exit/dist/mjs/signals.js
var signals = [];
signals.push("SIGHUP", "SIGINT", "SIGTERM");
if (process.platform !== "win32") {
  signals.push(
    "SIGALRM",
    "SIGABRT",
    "SIGVTALRM",
    "SIGXCPU",
    "SIGXFSZ",
    "SIGUSR2",
    "SIGTRAP",
    "SIGSYS",
    "SIGQUIT",
    "SIGIOT"
    // should detect profiler and enable/disable accordingly.
    // see #21
    // 'SIGPROF'
  );
}
if (process.platform === "linux") {
  signals.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT");
}

// node_modules/signal-exit/dist/mjs/index.js
var processOk = (process11) => !!process11 && typeof process11 === "object" && typeof process11.removeListener === "function" && typeof process11.emit === "function" && typeof process11.reallyExit === "function" && typeof process11.listeners === "function" && typeof process11.kill === "function" && typeof process11.pid === "number" && typeof process11.on === "function";
var kExitEmitter = /* @__PURE__ */ Symbol.for("signal-exit emitter");
var global2 = globalThis;
var ObjectDefineProperty = Object.defineProperty.bind(Object);
var Emitter = class {
  emitted = {
    afterExit: false,
    exit: false
  };
  listeners = {
    afterExit: [],
    exit: []
  };
  count = 0;
  id = Math.random();
  constructor() {
    if (global2[kExitEmitter]) {
      return global2[kExitEmitter];
    }
    ObjectDefineProperty(global2, kExitEmitter, {
      value: this,
      writable: false,
      enumerable: false,
      configurable: false
    });
  }
  on(ev, fn2) {
    this.listeners[ev].push(fn2);
  }
  removeListener(ev, fn2) {
    const list = this.listeners[ev];
    const i = list.indexOf(fn2);
    if (i === -1) {
      return;
    }
    if (i === 0 && list.length === 1) {
      list.length = 0;
    } else {
      list.splice(i, 1);
    }
  }
  emit(ev, code, signal) {
    if (this.emitted[ev]) {
      return false;
    }
    this.emitted[ev] = true;
    let ret = false;
    for (const fn2 of this.listeners[ev]) {
      ret = fn2(code, signal) === true || ret;
    }
    if (ev === "exit") {
      ret = this.emit("afterExit", code, signal) || ret;
    }
    return ret;
  }
};
var SignalExitBase = class {
};
var signalExitWrap = (handler) => {
  return {
    onExit(cb, opts) {
      return handler.onExit(cb, opts);
    },
    load() {
      return handler.load();
    },
    unload() {
      return handler.unload();
    }
  };
};
var SignalExitFallback = class extends SignalExitBase {
  onExit() {
    return () => {
    };
  }
  load() {
  }
  unload() {
  }
};
var SignalExit = class extends SignalExitBase {
  // "SIGHUP" throws an `ENOSYS` error on Windows,
  // so use a supported signal instead
  /* c8 ignore start */
  #hupSig = process4.platform === "win32" ? "SIGINT" : "SIGHUP";
  /* c8 ignore stop */
  #emitter = new Emitter();
  #process;
  #originalProcessEmit;
  #originalProcessReallyExit;
  #sigListeners = {};
  #loaded = false;
  constructor(process11) {
    super();
    this.#process = process11;
    this.#sigListeners = {};
    for (const sig of signals) {
      this.#sigListeners[sig] = () => {
        const listeners = this.#process.listeners(sig);
        let { count } = this.#emitter;
        const p2 = process11;
        if (typeof p2.__signal_exit_emitter__ === "object" && typeof p2.__signal_exit_emitter__.count === "number") {
          count += p2.__signal_exit_emitter__.count;
        }
        if (listeners.length === count) {
          this.unload();
          const ret = this.#emitter.emit("exit", null, sig);
          const s = sig === "SIGHUP" ? this.#hupSig : sig;
          if (!ret)
            process11.kill(process11.pid, s);
        }
      };
    }
    this.#originalProcessReallyExit = process11.reallyExit;
    this.#originalProcessEmit = process11.emit;
  }
  onExit(cb, opts) {
    if (!processOk(this.#process)) {
      return () => {
      };
    }
    if (this.#loaded === false) {
      this.load();
    }
    const ev = opts?.alwaysLast ? "afterExit" : "exit";
    this.#emitter.on(ev, cb);
    return () => {
      this.#emitter.removeListener(ev, cb);
      if (this.#emitter.listeners["exit"].length === 0 && this.#emitter.listeners["afterExit"].length === 0) {
        this.unload();
      }
    };
  }
  load() {
    if (this.#loaded) {
      return;
    }
    this.#loaded = true;
    this.#emitter.count += 1;
    for (const sig of signals) {
      try {
        const fn2 = this.#sigListeners[sig];
        if (fn2)
          this.#process.on(sig, fn2);
      } catch (_2) {
      }
    }
    this.#process.emit = (ev, ...a) => {
      return this.#processEmit(ev, ...a);
    };
    this.#process.reallyExit = (code) => {
      return this.#processReallyExit(code);
    };
  }
  unload() {
    if (!this.#loaded) {
      return;
    }
    this.#loaded = false;
    signals.forEach((sig) => {
      const listener = this.#sigListeners[sig];
      if (!listener) {
        throw new Error("Listener not defined for signal: " + sig);
      }
      try {
        this.#process.removeListener(sig, listener);
      } catch (_2) {
      }
    });
    this.#process.emit = this.#originalProcessEmit;
    this.#process.reallyExit = this.#originalProcessReallyExit;
    this.#emitter.count -= 1;
  }
  #processReallyExit(code) {
    if (!processOk(this.#process)) {
      return 0;
    }
    this.#process.exitCode = code || 0;
    this.#emitter.emit("exit", this.#process.exitCode, null);
    return this.#originalProcessReallyExit.call(this.#process, this.#process.exitCode);
  }
  #processEmit(ev, ...args) {
    const og = this.#originalProcessEmit;
    if (ev === "exit" && processOk(this.#process)) {
      if (typeof args[0] === "number") {
        this.#process.exitCode = args[0];
      }
      const ret = og.call(this.#process, ev, ...args);
      this.#emitter.emit("exit", this.#process.exitCode, null);
      return ret;
    } else {
      return og.call(this.#process, ev, ...args);
    }
  }
};
var process4 = globalThis.process;
var {
  /**
   * Called when the process is exiting, whether via signal, explicit
   * exit, or running out of stuff to do.
   *
   * If the global process object is not suitable for instrumentation,
   * then this will be a no-op.
   *
   * Returns a function that may be used to unload signal-exit.
   */
  onExit,
  /**
   * Load the listeners.  Likely you never need to call this, unless
   * doing a rather deep integration with signal-exit functionality.
   * Mostly exposed for the benefit of testing.
   *
   * @internal
   */
  load,
  /**
   * Unload the listeners.  Likely you never need to call this, unless
   * doing a rather deep integration with signal-exit functionality.
   * Mostly exposed for the benefit of testing.
   *
   * @internal
   */
  unload
} = signalExitWrap(processOk(process4) ? new SignalExit(process4) : new SignalExitFallback());

// node_modules/@inquirer/core/dist/lib/screen-manager.js
import { stripVTControlCharacters as stripVTControlCharacters3 } from "util";

// node_modules/@inquirer/ansi/dist/index.js
var ESC2 = "\x1B[";
var cursorLeft = ESC2 + "G";
var cursorHide = ESC2 + "?25l";
var cursorShow = ESC2 + "?25h";
var cursorUp = (rows = 1) => rows > 0 ? `${ESC2}${rows}A` : "";
var cursorDown = (rows = 1) => rows > 0 ? `${ESC2}${rows}B` : "";
var cursorTo = (x2, y2) => {
  if (typeof y2 === "number" && !Number.isNaN(y2)) {
    return `${ESC2}${y2 + 1};${x2 + 1}H`;
  }
  return `${ESC2}${x2 + 1}G`;
};
var eraseLine = ESC2 + "2K";
var eraseLines = (lines) => lines > 0 ? (eraseLine + cursorUp(1)).repeat(lines - 1) + eraseLine + cursorLeft : "";

// node_modules/@inquirer/core/dist/lib/screen-manager.js
var height = (content) => content.split("\n").length;
var lastLine = (content) => content.split("\n").pop() ?? "";
var ScreenManager = class {
  // These variables are keeping information to allow correct prompt re-rendering
  height = 0;
  extraLinesUnderPrompt = 0;
  cursorPos;
  rl;
  constructor(rl) {
    this.rl = rl;
    this.cursorPos = rl.getCursorPos();
  }
  write(content) {
    this.rl.output.unmute();
    this.rl.output.write(content);
    this.rl.output.mute();
  }
  render(content, bottomContent = "") {
    const promptLine = lastLine(content);
    const rawPromptLine = stripVTControlCharacters3(promptLine);
    let prompt = rawPromptLine;
    if (this.rl.line.length > 0) {
      prompt = prompt.slice(0, -this.rl.line.length);
    }
    this.rl.setPrompt(prompt);
    this.cursorPos = this.rl.getCursorPos();
    const width = readlineWidth();
    content = breakLines(content, width);
    bottomContent = breakLines(bottomContent, width);
    if (rawPromptLine.length % width === 0) {
      content += "\n";
    }
    let output = content + (bottomContent ? "\n" + bottomContent : "");
    const promptLineUpDiff = Math.floor(rawPromptLine.length / width) - this.cursorPos.rows;
    const bottomContentHeight = promptLineUpDiff + (bottomContent ? height(bottomContent) : 0);
    if (bottomContentHeight > 0)
      output += cursorUp(bottomContentHeight);
    output += cursorTo(this.cursorPos.cols);
    this.write(cursorDown(this.extraLinesUnderPrompt) + eraseLines(this.height) + output);
    this.extraLinesUnderPrompt = bottomContentHeight;
    this.height = height(output);
  }
  checkCursorPos() {
    const cursorPos = this.rl.getCursorPos();
    if (cursorPos.cols !== this.cursorPos.cols) {
      this.write(cursorTo(cursorPos.cols));
      this.cursorPos = cursorPos;
    }
  }
  done({ clearContent }) {
    this.rl.setPrompt("");
    let output = cursorDown(this.extraLinesUnderPrompt);
    output += clearContent ? eraseLines(this.height) : "\n";
    output += cursorLeft;
    output += cursorShow;
    this.write(output);
    this.rl.close();
  }
};

// node_modules/@inquirer/core/dist/lib/promise-polyfill.js
var PromisePolyfill = class extends Promise {
  // Available starting from Node 22
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers
  static withResolver() {
    let resolve;
    let reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  }
};

// node_modules/@inquirer/core/dist/lib/create-prompt.js
import path2 from "path";
var nativeSetImmediate = globalThis.setImmediate;
function getCallSites() {
  const savedPrepareStackTrace = Error.prepareStackTrace;
  let result = [];
  try {
    Error.prepareStackTrace = (_2, callSites) => {
      const callSitesWithoutCurrent = callSites.slice(1);
      result = callSitesWithoutCurrent;
      return callSitesWithoutCurrent;
    };
    new Error().stack;
  } catch {
    return result;
  }
  Error.prepareStackTrace = savedPrepareStackTrace;
  return result;
}
function createPrompt(view) {
  const callSites = getCallSites();
  const prompt = (config, context = {}) => {
    const { input = process.stdin, signal } = context;
    const cleanups = /* @__PURE__ */ new Set();
    const output = new import_mute_stream.default();
    output.pipe(context.output ?? process.stdout);
    const rl = readline2.createInterface({
      terminal: true,
      input,
      output
    });
    output.mute();
    const screen = new ScreenManager(rl);
    const { promise, resolve, reject } = PromisePolyfill.withResolver();
    const cancel = () => reject(new CancelPromptError());
    if (signal) {
      const abort = () => reject(new AbortPromptError({ cause: signal.reason }));
      if (signal.aborted) {
        abort();
        return Object.assign(promise, { cancel });
      }
      signal.addEventListener("abort", abort);
      cleanups.add(() => signal.removeEventListener("abort", abort));
    }
    cleanups.add(onExit((code, signal2) => {
      reject(new ExitPromptError(`User force closed the prompt with ${code} ${signal2}`));
    }));
    const sigint = () => reject(new ExitPromptError(`User force closed the prompt with SIGINT`));
    rl.on("SIGINT", sigint);
    cleanups.add(() => rl.removeListener("SIGINT", sigint));
    return withHooks(rl, (cycle) => {
      const hooksCleanup = AsyncResource3.bind(() => effectScheduler.clearAll());
      rl.on("close", hooksCleanup);
      cleanups.add(() => rl.removeListener("close", hooksCleanup));
      const startCycle = () => {
        const checkCursorPos = () => screen.checkCursorPos();
        rl.input.on("keypress", checkCursorPos);
        cleanups.add(() => rl.input.removeListener("keypress", checkCursorPos));
        let pendingDone = null;
        cycle(() => {
          let effectsSettled = false;
          try {
            const nextView = view(config, (value) => {
              if (effectsSettled) {
                resolve(value);
              } else {
                pendingDone = { value };
              }
            });
            if (nextView === void 0) {
              let callerFilename = callSites[1]?.getFileName();
              if (callerFilename && !callerFilename.startsWith("file://")) {
                callerFilename = path2.resolve(callerFilename);
              }
              throw new Error(`Prompt functions must return a string.
    at ${callerFilename}`);
            }
            const [content, bottomContent] = typeof nextView === "string" ? [nextView] : nextView;
            screen.render(content, bottomContent);
            effectScheduler.run();
          } catch (error2) {
            reject(error2);
          }
          effectsSettled = true;
          if (pendingDone !== null) {
            const { value } = pendingDone;
            pendingDone = null;
            resolve(value);
          }
        });
      };
      if ("readableFlowing" in input) {
        nativeSetImmediate(startCycle);
      } else {
        startCycle();
      }
      return Object.assign(promise.then((answer) => {
        effectScheduler.clearAll();
        return answer;
      }, (error2) => {
        effectScheduler.clearAll();
        throw error2;
      }).finally(() => {
        cleanups.forEach((cleanup) => cleanup());
        screen.done({ clearContent: Boolean(context.clearPromptOnDone) });
        output.end();
      }).then(() => promise), { cancel });
    });
  };
  return prompt;
}

// node_modules/@inquirer/confirm/dist/index.js
import { styleText as styleText2 } from "util";
var confirmTheme = {
  keywords: {
    yes: "Yes",
    no: "No"
  },
  style: {
    confirmDefault: (text) => {
      const first = text[0] ?? "";
      if (first.toLowerCase() === first.toUpperCase()) {
        return styleText2("cyan", text);
      }
      return first.toUpperCase() + text.slice(1);
    }
  }
};
var dist_default4 = createPrompt((config, done) => {
  const [status, setStatus] = useState("idle");
  const [value, setValue] = useState("");
  const theme = makeTheme(confirmTheme, config.theme);
  const prefix = usePrefix({ status, theme });
  const { yes, no: no2 } = theme.keywords;
  const yesHint = (yes[0] ?? "").toLowerCase();
  const noHint = (no2[0] ?? "").toLowerCase();
  const hint = config.default === false ? `${yesHint}/${theme.style.confirmDefault(noHint)}` : `${theme.style.confirmDefault(yesHint)}/${noHint}`;
  function boolToString(value2) {
    return value2 ? yes : no2;
  }
  const { transformer = boolToString } = config;
  function getBooleanValue(value2, defaultValue2) {
    const v2 = value2.toLowerCase();
    if (v2 === "")
      return defaultValue2 !== false;
    if (yes.toLowerCase().startsWith(v2))
      return true;
    if (no2.toLowerCase().startsWith(v2))
      return false;
    return defaultValue2 !== false;
  }
  useKeypress((key, rl) => {
    if (status !== "idle")
      return;
    if (isEnterKey(key)) {
      const answer = getBooleanValue(value, config.default);
      setValue(transformer(answer));
      setStatus("done");
      done(answer);
    } else if (isTabKey(key)) {
      const answer = boolToString(!getBooleanValue(value, config.default));
      rl.clearLine(0);
      rl.write(answer);
      setValue(answer);
    } else {
      setValue(rl.line);
    }
  });
  let formattedValue = value;
  let defaultValue = "";
  if (status === "done") {
    formattedValue = theme.style.answer(value);
  } else {
    defaultValue = ` ${theme.style.defaultAnswer(hint)}`;
  }
  const message = theme.style.message(config.message, status);
  return `${prefix} ${message}${defaultValue} ${formattedValue}`;
});

// node_modules/@inquirer/input/dist/index.js
var inputTheme = {
  validationFailureMode: "keep"
};
var dist_default5 = createPrompt((config, done) => {
  const { prefill = "tab" } = config;
  const theme = makeTheme(inputTheme, config.theme);
  const [status, setStatus] = useState("idle");
  const [defaultValue, setDefaultValue] = useState(String(config.default ?? ""));
  const [errorMsg, setError] = useState();
  const [value, setValue] = useState("");
  const prefix = usePrefix({ status, theme });
  async function validate2(value2) {
    const { required, pattern, patternError = "Invalid input" } = config;
    if (required && !value2) {
      return "You must provide a value";
    }
    if (pattern && !pattern.test(value2)) {
      return patternError;
    }
    if (typeof config.validate === "function") {
      return await config.validate(value2) || "You must provide a valid value";
    }
    return true;
  }
  useKeypress(async (key, rl) => {
    if (status !== "idle") {
      return;
    }
    if (isEnterKey(key)) {
      const answer = value || defaultValue;
      setStatus("loading");
      const isValid = await validate2(answer);
      if (isValid === true) {
        setValue(answer);
        setStatus("done");
        done(answer);
      } else {
        if (theme.validationFailureMode === "clear") {
          setValue("");
        } else {
          rl.write(value);
        }
        setError(isValid);
        setStatus("idle");
      }
    } else if (isBackspaceKey(key) && !value) {
      setDefaultValue("");
    } else if (isTabKey(key) && !value) {
      setDefaultValue("");
      rl.clearLine(0);
      rl.write(defaultValue);
      setValue(defaultValue);
    } else {
      setValue(rl.line);
      setError(void 0);
    }
  });
  useEffect((rl) => {
    if (prefill === "editable" && defaultValue) {
      rl.write(defaultValue);
      setValue(defaultValue);
    }
  }, []);
  const message = theme.style.message(config.message, status);
  let formattedValue = value;
  if (typeof config.transformer === "function") {
    formattedValue = config.transformer(value, { isFinal: status === "done" });
  } else if (status === "done") {
    formattedValue = theme.style.answer(value);
  }
  let defaultStr;
  if (defaultValue && status !== "done" && !value) {
    defaultStr = theme.style.defaultAnswer(defaultValue);
  }
  let error2 = "";
  if (errorMsg) {
    error2 = theme.style.error(errorMsg);
  }
  return [
    [prefix, message, defaultStr, formattedValue].filter((v2) => v2 !== void 0).join(" "),
    error2
  ];
});

// src/commands/make-module.ts
var import_fs_extra3 = __toESM(require_lib2(), 1);
var import_picocolors2 = __toESM(require_picocolors(), 1);
var import_pluralize = __toESM(require_pluralize(), 1);
import path5 from "path";

// node_modules/change-case/dist/index.js
var SPLIT_LOWER_UPPER_RE = /([\p{Ll}\d])(\p{Lu})/gu;
var SPLIT_UPPER_UPPER_RE = /(\p{Lu})([\p{Lu}][\p{Ll}])/gu;
var SPLIT_SEPARATE_NUMBER_RE = /(\d)\p{Ll}|(\p{L})\d/u;
var DEFAULT_STRIP_REGEXP = /[^\p{L}\d]+/giu;
var SPLIT_REPLACE_VALUE = "$1\0$2";
var DEFAULT_PREFIX_SUFFIX_CHARACTERS = "";
function split(value) {
  let result = value.trim();
  result = result.replace(SPLIT_LOWER_UPPER_RE, SPLIT_REPLACE_VALUE).replace(SPLIT_UPPER_UPPER_RE, SPLIT_REPLACE_VALUE);
  result = result.replace(DEFAULT_STRIP_REGEXP, "\0");
  let start = 0;
  let end = result.length;
  while (result.charAt(start) === "\0")
    start++;
  if (start === end)
    return [];
  while (result.charAt(end - 1) === "\0")
    end--;
  return result.slice(start, end).split(/\0/g);
}
function splitSeparateNumbers(value) {
  const words = split(value);
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const match = SPLIT_SEPARATE_NUMBER_RE.exec(word);
    if (match) {
      const offset = match.index + (match[1] ?? match[2]).length;
      words.splice(i, 1, word.slice(0, offset), word.slice(offset));
    }
  }
  return words;
}
function noCase(input, options) {
  const [prefix, words, suffix] = splitPrefixSuffix(input, options);
  return prefix + words.map(lowerFactory(options?.locale)).join(options?.delimiter ?? " ") + suffix;
}
function camelCase(input, options) {
  const [prefix, words, suffix] = splitPrefixSuffix(input, options);
  const lower = lowerFactory(options?.locale);
  const upper = upperFactory(options?.locale);
  const transform = options?.mergeAmbiguousCharacters ? capitalCaseTransformFactory(lower, upper) : pascalCaseTransformFactory(lower, upper);
  return prefix + words.map((word, index) => {
    if (index === 0)
      return lower(word);
    return transform(word, index);
  }).join(options?.delimiter ?? "") + suffix;
}
function pascalCase(input, options) {
  const [prefix, words, suffix] = splitPrefixSuffix(input, options);
  const lower = lowerFactory(options?.locale);
  const upper = upperFactory(options?.locale);
  const transform = options?.mergeAmbiguousCharacters ? capitalCaseTransformFactory(lower, upper) : pascalCaseTransformFactory(lower, upper);
  return prefix + words.map(transform).join(options?.delimiter ?? "") + suffix;
}
function constantCase(input, options) {
  const [prefix, words, suffix] = splitPrefixSuffix(input, options);
  return prefix + words.map(upperFactory(options?.locale)).join(options?.delimiter ?? "_") + suffix;
}
function kebabCase(input, options) {
  return noCase(input, { delimiter: "-", ...options });
}
function lowerFactory(locale) {
  return locale === false ? (input) => input.toLowerCase() : (input) => input.toLocaleLowerCase(locale);
}
function upperFactory(locale) {
  return locale === false ? (input) => input.toUpperCase() : (input) => input.toLocaleUpperCase(locale);
}
function capitalCaseTransformFactory(lower, upper) {
  return (word) => `${upper(word[0])}${lower(word.slice(1))}`;
}
function pascalCaseTransformFactory(lower, upper) {
  return (word, index) => {
    const char0 = word[0];
    const initial = index > 0 && char0 >= "0" && char0 <= "9" ? "_" + char0 : upper(char0);
    return initial + lower(word.slice(1));
  };
}
function splitPrefixSuffix(input, options = {}) {
  const splitFn = options.split ?? (options.separateNumbers ? splitSeparateNumbers : split);
  const prefixCharacters = options.prefixCharacters ?? DEFAULT_PREFIX_SUFFIX_CHARACTERS;
  const suffixCharacters = options.suffixCharacters ?? DEFAULT_PREFIX_SUFFIX_CHARACTERS;
  let prefixIndex = 0;
  let suffixIndex = input.length;
  while (prefixIndex < input.length) {
    const char = input.charAt(prefixIndex);
    if (!prefixCharacters.includes(char))
      break;
    prefixIndex++;
  }
  while (suffixIndex > prefixIndex) {
    const index = suffixIndex - 1;
    const char = input.charAt(index);
    if (!suffixCharacters.includes(char))
      break;
    suffixIndex = index;
  }
  return [
    input.slice(0, prefixIndex),
    splitFn(input.slice(prefixIndex, suffixIndex)),
    input.slice(suffixIndex)
  ];
}

// src/utils/template.ts
var import_fs_extra = __toESM(require_lib2(), 1);
var import_handlebars = __toESM(require_lib3(), 1);
import path3 from "path";
import_handlebars.default.registerHelper("pascalCase", (str) => pascalCase(str || ""));
import_handlebars.default.registerHelper("camelCase", (str) => camelCase(str || ""));
import_handlebars.default.registerHelper("kebabCase", (str) => kebabCase(str || ""));
import_handlebars.default.registerHelper("constantCase", (str) => constantCase(str || ""));
var templateBase = path3.resolve(import.meta.dirname, "../templates");
var renderTemplate = (relPath, data) => {
  const filePath = path3.join(templateBase, relPath);
  if (!import_fs_extra.default.existsSync(filePath)) {
    throw new Error(`Template file tidak ditemukan: ${filePath}`);
  }
  const content = import_fs_extra.default.readFileSync(filePath, "utf-8");
  return import_handlebars.default.compile(content)(data);
};

// src/utils/router.ts
var import_fs_extra2 = __toESM(require_lib2(), 1);
var import_picocolors = __toESM(require_picocolors(), 1);
import path4 from "path";
async function injectRouteToAppRouter(options) {
  const routerPath = path4.resolve(process.cwd(), "src/router/AppRouter.tsx");
  if (!import_fs_extra2.default.existsSync(routerPath)) {
    console.log(import_picocolors.default.yellow(`\u26A0\uFE0F  AppRouter.tsx tidak ditemukan di "${routerPath}". Injeksi route dilewati.`));
    return;
  }
  let content = await import_fs_extra2.default.readFile(routerPath, "utf-8");
  const importStatement = `import ${options.namePascal}Page from "@/features/${options.nameKebab}/pages/${options.namePascal}Page";`;
  if (content.includes(importStatement)) {
    console.log(import_picocolors.default.yellow(`\u26A0\uFE0F  Import untuk ${options.namePascal}Page sudah terdaftar di AppRouter.tsx.`));
    return;
  }
  const importTargetAnchor = "type ProtectedRoute";
  if (content.includes(importTargetAnchor)) {
    content = content.replace(importTargetAnchor, `${importStatement}

${importTargetAnchor}`);
  } else {
    content = `${importStatement}
${content}`;
  }
  const routeEntry = `    ${options.constantKey}: {
        path: "/${options.pluralKebab}",
        element: <${options.namePascal}Page />,
        protected: true,
        roles: [],
        permissions: [],
    },`;
  const routesAnchor = "export const ROUTES: Record<string, AppRoute> = {";
  if (content.includes(routesAnchor)) {
    content = content.replace(routesAnchor, `${routesAnchor}
${routeEntry}`);
  }
  await import_fs_extra2.default.writeFile(routerPath, content, "utf-8");
  console.log(import_picocolors.default.green(`\u2714 Route terdaftar otomatis di src/router/AppRouter.tsx`));
}

// src/commands/make-module.ts
function registerMakeModuleCommand(program3) {
  program3.command("make:module [name]").description("Generate modular feature UI, TanStack Query hooks, schemas, dan inject route").action(async (nameArg) => {
    console.log(import_picocolors2.default.cyan("\n\u{1F680} Base React Module Generator (Full Module)\n"));
    const singularInput = nameArg ? nameArg.trim() : await dist_default5({
      message: "Nama modul (singular, misal: student, course, category):",
      validate: (val) => val.trim().length > 0 || "Nama tidak boleh kosong"
    });
    const singularName = import_pluralize.default.singular(singularInput);
    const pluralName = import_pluralize.default.plural(singularName);
    const namePascal = pascalCase(singularName);
    const nameKebab = kebabCase(singularName);
    const pluralKebab = kebabCase(pluralName);
    const constantKey = constantCase(pluralName);
    console.log(import_picocolors2.default.gray(`\u2022 Feature (Singular) : ${nameKebab}`));
    console.log(import_picocolors2.default.gray(`\u2022 Service (Plural)   : ${pluralKebab}
`));
    const featurePath = path5.resolve(process.cwd(), "src/features", nameKebab);
    const servicePath = path5.resolve(process.cwd(), "src/services", pluralKebab);
    if (import_fs_extra3.default.existsSync(featurePath) || import_fs_extra3.default.existsSync(servicePath)) {
      const overwrite = await dist_default4({
        message: `Modul "${nameKebab}" atau service "${pluralKebab}" sudah ada. Timpa file yang ada?`,
        default: false
      });
      if (!overwrite) return;
    }
    const templateData = { name: singularName, pluralName };
    await import_fs_extra3.default.ensureDir(path5.join(featurePath, "components"));
    await import_fs_extra3.default.ensureDir(path5.join(featurePath, "pages"));
    await import_fs_extra3.default.ensureDir(path5.join(servicePath, "hooks"));
    await import_fs_extra3.default.ensureDir(path5.join(servicePath, "response"));
    await import_fs_extra3.default.ensureDir(path5.join(servicePath, "schema"));
    await import_fs_extra3.default.writeFile(path5.join(featurePath, "pages", `${namePascal}Page.tsx`), renderTemplate("features/pages/Page.hbs", templateData));
    await import_fs_extra3.default.writeFile(path5.join(featurePath, "components", `${namePascal}MainContent.tsx`), renderTemplate("features/components/MainContent.hbs", templateData));
    await import_fs_extra3.default.writeFile(path5.join(featurePath, "components", `${namePascal}MutationForm.tsx`), renderTemplate("features/components/MutationForm.hbs", templateData));
    await import_fs_extra3.default.writeFile(path5.join(featurePath, "components", `Remove${namePascal}.tsx`), renderTemplate("features/components/RemoveComponent.hbs", templateData));
    await import_fs_extra3.default.writeFile(path5.join(servicePath, "hooks", `use${namePascal}CRUD.ts`), renderTemplate("services/hooks/useCRUD.hbs", templateData));
    await import_fs_extra3.default.writeFile(path5.join(servicePath, "response", `${namePascal}Response.ts`), renderTemplate("services/response/Response.hbs", templateData));
    await import_fs_extra3.default.writeFile(path5.join(servicePath, "schema", `${namePascal}Schema.ts`), renderTemplate("services/schema/Schema.hbs", templateData));
    console.log(import_picocolors2.default.green(`\u2714 UI Layer dibuat di: src/features/${nameKebab}`));
    console.log(import_picocolors2.default.green(`\u2714 Service Layer dibuat di: src/services/${pluralKebab}`));
    await injectRouteToAppRouter({ namePascal, nameKebab, pluralKebab, constantKey });
    console.log(import_picocolors2.default.cyan(`
\u2728 Modul "${namePascal}" berhasil digenerate!
`));
  });
}

// src/commands/make-page.ts
var import_fs_extra4 = __toESM(require_lib2(), 1);
var import_picocolors3 = __toESM(require_picocolors(), 1);
var import_pluralize2 = __toESM(require_pluralize(), 1);
import path6 from "path";
function registerMakePageCommand(program3) {
  program3.command("make:page [name]").alias("make:feature").description("Generate hanya UI feature layer (pages + components) & inject route").action(async (nameArg) => {
    console.log(import_picocolors3.default.cyan("\n\u{1F4C4} Feature UI Generator\n"));
    const rawName = nameArg ? nameArg.trim() : await dist_default5({
      message: "Nama page/feature (misal: dashboard-analytics, settings):",
      validate: (val) => val.trim().length > 0 || "Nama tidak boleh kosong"
    });
    const namePascal = pascalCase(rawName);
    const nameKebab = kebabCase(rawName);
    const constantKey = constantCase(rawName);
    const featurePath = path6.resolve(process.cwd(), "src/features", nameKebab);
    if (import_fs_extra4.default.existsSync(featurePath)) {
      const overwrite = await dist_default4({
        message: `Feature "${nameKebab}" sudah ada. Timpa file yang ada?`,
        default: false
      });
      if (!overwrite) return;
    }
    const templateData = { name: rawName, pluralName: import_pluralize2.default.plural(rawName) };
    await import_fs_extra4.default.ensureDir(path6.join(featurePath, "components"));
    await import_fs_extra4.default.ensureDir(path6.join(featurePath, "pages"));
    await import_fs_extra4.default.writeFile(path6.join(featurePath, "pages", `${namePascal}Page.tsx`), renderTemplate("features/pages/Page.hbs", templateData));
    await import_fs_extra4.default.writeFile(path6.join(featurePath, "components", `${namePascal}MainContent.tsx`), renderTemplate("features/components/MainContent.hbs", templateData));
    console.log(import_picocolors3.default.green(`\u2714 UI Layer dibuat di: src/features/${nameKebab}`));
    await injectRouteToAppRouter({ namePascal, nameKebab, pluralKebab: nameKebab, constantKey });
    console.log(import_picocolors3.default.cyan(`
\u2728 Page "${namePascal}" berhasil digenerate!
`));
  });
}

// src/commands/make-service.ts
var import_fs_extra5 = __toESM(require_lib2(), 1);
var import_picocolors4 = __toESM(require_picocolors(), 1);
var import_pluralize3 = __toESM(require_pluralize(), 1);
import path7 from "path";
function registerMakeServiceCommand(program3) {
  program3.command("make:service [name]").description("Generate hanya data/API layer (hooks, response, schema)").action(async (nameArg) => {
    console.log(import_picocolors4.default.cyan("\n\u2699\uFE0F Data/API Service Generator\n"));
    const singularInput = nameArg ? nameArg.trim() : await dist_default5({
      message: "Nama entitas (singular, misal: product, invoice):",
      validate: (val) => val.trim().length > 0 || "Nama tidak boleh kosong"
    });
    const singularName = import_pluralize3.default.singular(singularInput);
    const pluralName = import_pluralize3.default.plural(singularName);
    const namePascal = pascalCase(singularName);
    const pluralKebab = kebabCase(pluralName);
    const servicePath = path7.resolve(process.cwd(), "src/services", pluralKebab);
    if (import_fs_extra5.default.existsSync(servicePath)) {
      const overwrite = await dist_default4({
        message: `Service "${pluralKebab}" sudah ada. Timpa file yang ada?`,
        default: false
      });
      if (!overwrite) return;
    }
    const templateData = { name: singularName, pluralName };
    await import_fs_extra5.default.ensureDir(path7.join(servicePath, "hooks"));
    await import_fs_extra5.default.ensureDir(path7.join(servicePath, "response"));
    await import_fs_extra5.default.ensureDir(path7.join(servicePath, "schema"));
    await import_fs_extra5.default.writeFile(path7.join(servicePath, "hooks", `use${namePascal}CRUD.ts`), renderTemplate("services/hooks/useCRUD.hbs", templateData));
    await import_fs_extra5.default.writeFile(path7.join(servicePath, "response", `${namePascal}Response.ts`), renderTemplate("services/response/Response.hbs", templateData));
    await import_fs_extra5.default.writeFile(path7.join(servicePath, "schema", `${namePascal}Schema.ts`), renderTemplate("services/schema/Schema.hbs", templateData));
    console.log(import_picocolors4.default.green(`\u2714 Service Layer dibuat di: src/services/${pluralKebab}`));
    console.log(import_picocolors4.default.cyan(`
\u2728 Service "${pluralKebab}" berhasil digenerate!
`));
  });
}

// src/commands/make-component.ts
var import_fs_extra6 = __toESM(require_lib2(), 1);
var import_picocolors5 = __toESM(require_picocolors(), 1);
import path8 from "path";
function registerMakeComponentCommand(program3) {
  program3.command("make:component [name]").description("Generate shared UI component di src/shared/components/").action(async (nameArg) => {
    console.log(import_picocolors5.default.cyan("\n\u{1F9E9} Shared Component Generator\n"));
    const componentName = nameArg ? nameArg.trim() : await dist_default5({
      message: "Nama component (misal: ButtonFilter, CardSummary):",
      validate: (val) => val.trim().length > 0 || "Nama tidak boleh kosong"
    });
    const namePascal = pascalCase(componentName);
    const targetDir = path8.resolve(process.cwd(), "src/shared/components");
    await import_fs_extra6.default.ensureDir(targetDir);
    const filePath = path8.join(targetDir, `${namePascal}.tsx`);
    if (import_fs_extra6.default.existsSync(filePath)) {
      const overwrite = await dist_default4({
        message: `Component "${namePascal}.tsx" sudah ada. Timpa file?`,
        default: false
      });
      if (!overwrite) return;
    }
    await import_fs_extra6.default.writeFile(filePath, renderTemplate("shared/Component.hbs", { name: componentName }));
    console.log(import_picocolors5.default.green(`\u2714 Component dibuat di: ${filePath}
`));
  });
}

// src/commands/make-hook.ts
var import_fs_extra7 = __toESM(require_lib2(), 1);
var import_picocolors6 = __toESM(require_picocolors(), 1);
import path9 from "path";
function registerMakeHookCommand(program3) {
  program3.command("make:hook [name]").description("Generate custom React hook di src/shared/hooks/").action(async (nameArg) => {
    console.log(import_picocolors6.default.cyan("\n\u{1FA9D} Shared Hook Generator\n"));
    const hookInput = nameArg ? nameArg.trim() : await dist_default5({
      message: "Nama hook (misal: useLocalStorage, useModalState):",
      validate: (val) => val.trim().length > 0 || "Nama tidak boleh kosong"
    });
    const rawClean = hookInput.startsWith("use") ? hookInput.substring(3) : hookInput;
    const namePascal = pascalCase(rawClean);
    const finalHookName = `use${namePascal}`;
    const targetDir = path9.resolve(process.cwd(), "src/shared/hooks");
    await import_fs_extra7.default.ensureDir(targetDir);
    const filePath = path9.join(targetDir, `${finalHookName}.ts`);
    if (import_fs_extra7.default.existsSync(filePath)) {
      const overwrite = await dist_default4({
        message: `Hook "${finalHookName}.ts" sudah ada. Timpa file?`,
        default: false
      });
      if (!overwrite) return;
    }
    await import_fs_extra7.default.writeFile(filePath, renderTemplate("shared/Hook.hbs", { name: namePascal }));
    console.log(import_picocolors6.default.green(`\u2714 Hook dibuat di: ${filePath}
`));
  });
}

// src/commands/install-base.ts
var import_fs_extra8 = __toESM(require_lib2(), 1);
var import_picocolors7 = __toESM(require_picocolors(), 1);
import path10 from "path";

// node_modules/degit/dist/src-DQAL7yUA.js
import f2 from "fs";
import p from "tty";
import m2 from "assert";
import h2, { EventEmitter as g } from "events";
import _ from "fs";
import v, { dirname as ee, parse as te } from "path";
import y, { basename as ne, join as re, posix as b, win32 as ie } from "path";
import { EventEmitter as ae } from "events";
import oe, { access as se, constants as ce, cp as le, mkdtemp as ue, readFile as de, readdir as fe, rm as pe, writeFile as me } from "fs/promises";
import he from "stream";
import { StringDecoder as ge } from "string_decoder";
import { Buffer as _e } from "buffer";
import * as ve from "zlib";
import ye from "zlib";
import be from "assert";
import { randomBytes as xe } from "crypto";
var Se = p?.WriteStream?.prototype?.hasColors?.() ?? false;
var x = (e4, t) => {
  if (!Se) return (e5) => e5;
  let n = `\x1B[${e4}m`, r = `\x1B[${t}m`;
  return (e5) => {
    let i = e5 + ``, a = i.indexOf(r);
    if (a === -1) return n + i + r;
    let o = n, s = 0, c = (t === 22 ? r : ``) + n;
    for (; a !== -1; ) o += i.slice(s, a) + c, s = a + r.length, a = i.indexOf(r, s);
    return o += i.slice(s) + r, o;
  };
};
x(0, 0);
var S = x(1, 22);
x(2, 22), x(3, 23);
var Ce = x(4, 24);
x(53, 55), x(7, 27), x(8, 28), x(9, 29), x(30, 39);
var we = x(31, 39);
var Te = x(32, 39);
x(33, 39), x(34, 39);
var Ee = x(35, 39);
var De = x(36, 39);
x(37, 39), x(90, 39), x(40, 49), x(41, 49), x(42, 49), x(43, 49), x(44, 49), x(45, 49), x(46, 49), x(47, 49), x(100, 49), x(91, 39), x(92, 39), x(93, 39), x(94, 39), x(95, 39), x(96, 39), x(97, 39), x(101, 49), x(102, 49), x(103, 49), x(104, 49), x(105, 49), x(106, 49), x(107, 49);
var Oe = f(((e4, t) => {
  let n = process.platform === `win32`, r = n ? `\\\\+` : `\\/`, i = n ? `\\\\` : `/`, a = `((?:[^${i}]*(?:${i}|$))*)`, o = `([^${i}]*)`;
  function s(e5, { extended: t2 = false, globstar: n2 = false, strict: i2 = false, filepath: s2 = false, flags: c = `` } = {}) {
    let l = ``, u = ``, d = { regex: ``, segments: [] }, f3 = false, p2 = false, m3 = [];
    function h3(e6, { split: t3, last: n3, only: i3 } = {}) {
      i3 !== `path` && (l += e6), s2 && i3 !== `regex` && (d.regex += e6 === `\\/` ? r : e6, t3 ? (n3 && (u += e6), u !== `` && (c.includes(`g`) || (u = `^${u}$`), d.segments.push(new RegExp(u, c))), u = ``) : u += e6);
    }
    let g2, _2;
    for (let r2 = 0; r2 < e5.length; r2++) {
      if (g2 = e5[r2], _2 = e5[r2 + 1], [`\\`, `$`, `^`, `.`, `=`].includes(g2)) {
        h3(`\\${g2}`);
        continue;
      }
      if (g2 === `/`) {
        h3(`\\${g2}`, { split: true }), _2 === `/` && !i2 && (l += `?`);
        continue;
      }
      if (g2 === `(`) {
        if (m3.length) {
          h3(g2);
          continue;
        }
        h3(`\\${g2}`);
        continue;
      }
      if (g2 === `)`) {
        if (m3.length) {
          h3(g2);
          let e6 = m3.pop();
          h3(e6 === `@` ? `{1}` : e6 === `!` ? `([^/]*)` : e6);
          continue;
        }
        h3(`\\${g2}`);
        continue;
      }
      if (g2 === `|`) {
        if (m3.length) {
          h3(g2);
          continue;
        }
        h3(`\\${g2}`);
        continue;
      }
      if (g2 === `+`) {
        if (_2 === `(` && t2) {
          m3.push(g2);
          continue;
        }
        h3(`\\${g2}`);
        continue;
      }
      if (g2 === `@` && t2 && _2 === `(`) {
        m3.push(g2);
        continue;
      }
      if (g2 === `!`) {
        if (t2) {
          if (p2) {
            h3(`^`);
            continue;
          }
          if (_2 === `(`) {
            m3.push(g2), h3(`(?!`), r2++;
            continue;
          }
          h3(`\\${g2}`);
          continue;
        }
        h3(`\\${g2}`);
        continue;
      }
      if (g2 === `?`) {
        if (t2) {
          _2 === `(` ? m3.push(g2) : h3(`.`);
          continue;
        }
        h3(`\\${g2}`);
        continue;
      }
      if (g2 === `[`) {
        if (p2 && _2 === `:`) {
          r2++;
          let t3 = ``;
          for (; e5[++r2] !== `:`; ) t3 += e5[r2];
          t3 === `alnum` ? h3(`(\\w|\\d)`) : t3 === `space` ? h3(`\\s`) : t3 === `digit` && h3(`\\d`), r2++;
          continue;
        }
        if (t2) {
          p2 = true, h3(g2);
          continue;
        }
        h3(`\\${g2}`);
        continue;
      }
      if (g2 === `]`) {
        if (t2) {
          p2 = false, h3(g2);
          continue;
        }
        h3(`\\${g2}`);
        continue;
      }
      if (g2 === `{`) {
        if (t2) {
          f3 = true, h3(`(`);
          continue;
        }
        h3(`\\${g2}`);
        continue;
      }
      if (g2 === `}`) {
        if (t2) {
          f3 = false, h3(`)`);
          continue;
        }
        h3(`\\${g2}`);
        continue;
      }
      if (g2 === `,`) {
        if (f3) {
          h3(`|`);
          continue;
        }
        h3(`\\${g2}`);
        continue;
      }
      if (g2 === `*`) {
        if (_2 === `(` && t2) {
          m3.push(g2);
          continue;
        }
        let i3 = e5[r2 - 1], s3 = 1;
        for (; e5[r2 + 1] === `*`; ) s3++, r2++;
        let c2 = e5[r2 + 1];
        n2 ? s3 > 1 && (i3 === `/` || i3 === void 0) && (c2 === `/` || c2 === void 0) ? (h3(`((?:[^/]*(?:/|$))*)`, { only: `regex` }), h3(a, { only: `path`, last: true, split: true }), r2++) : (h3(`([^/]*)`, { only: `regex` }), h3(o, { only: `path` })) : h3(`.*`);
        continue;
      }
      h3(g2);
    }
    c.includes(`g`) || (l = `^${l}$`, u = `^${u}$`, s2 && (d.regex = `^${d.regex}$`));
    let v2 = { regex: new RegExp(l, c) };
    return s2 && (d.segments.push(new RegExp(u, c)), d.regex = new RegExp(d.regex, c), d.globstar = new RegExp(c.includes(`g`) ? a : `^${a}$`, c), v2.path = d), v2;
  }
  t.exports = s;
}));
var ke = f(((e4, t) => {
  let r = h(`os`), i = h(`path`), a = r.platform() === `win32`, o = { "{": `}`, "(": `)`, "[": `]` }, s = /\\(.)|(^!|\*|[\].+)]\?|\[[^\\\]]+\]|\{[^\\}]+\}|\(\?[:!=][^\\)]+\)|\([^|]+\|[^\\)]+\)|(\\).|([@?!+*]\(.*\)))/, c = /\\(.)|(^!|[*?{}()[\]]|\(\?)/;
  function l(e5, { strict: t2 = true } = {}) {
    if (e5 === ``) return false;
    let n, r2 = t2 ? s : c;
    for (; n = r2.exec(e5); ) {
      if (n[2]) return true;
      let t3 = n.index + n[0].length, r3 = n[1], i2 = r3 ? o[r3] : null;
      if (r3 && i2) {
        let n2 = e5.indexOf(i2, t3);
        n2 !== -1 && (t3 = n2 + 1);
      }
      e5 = e5.slice(t3);
    }
    return false;
  }
  function u(e5, { strict: t2 = false } = {}) {
    a && e5.includes(`/`) && (e5 = e5.split(`\\`).join(`/`)), /[\{\[].*[\/]*.*[\}\]]$/.test(e5) && (e5 += `/`), e5 += `a`;
    do
      e5 = i.dirname(e5);
    while (l(e5, { strict: t2 }) || /(^|[^\\])([\{\[]|\([^\)]+$)/.test(e5));
    return e5.replace(/\\([\*\?\|\[\]\(\)\{\}])/g, `$1`);
  }
  function d(e5, t2 = {}) {
    let n = u(e5, t2), r2 = l(e5, t2), a2;
    return n == `.` ? a2 = e5 : (a2 = e5.substr(n.length), a2.startsWith(`/`) && (a2 = a2.substr(1))), r2 || (n = i.dirname(e5), a2 = n === `.` ? e5 : e5.substr(n.length)), a2.startsWith(`./`) && (a2 = a2.substr(2)), a2.startsWith(`/`) && (a2 = a2.substr(1)), { base: n, glob: a2, isGlob: r2 };
  }
  t.exports = d;
}));
var Ae = f(((e4, t) => {
  let r = h(`fs`), i = Oe(), a = ke(), { join: o, resolve: s, relative: c } = h(`path`), l = /(^|[\\\/])\.[^\\\/\.]/g, u = {};
  function d(e5, t2, n, i2, a2 = ``, f3 = 0) {
    let p2 = n.segments[f3], m3 = s(i2.cwd, t2, a2), h3 = r.readdirSync(m3), { dot: g2, filesOnly: _2 } = i2, v2 = 0, ee2 = h3.length, te2, y2, ne2, re2, b2;
    for (; v2 < ee2; v2++) if (y2 = o(m3, te2 = h3[v2]), ne2 = a2 ? o(a2, te2) : te2, !(!g2 && l.test(ne2))) {
      if (b2 = n.regex.test(ne2), (re2 = u[ne2]) === void 0 && (u[ne2] = re2 = r.lstatSync(y2)), !re2.isDirectory()) {
        b2 && e5.push(c(i2.cwd, y2));
        continue;
      }
      p2 && !p2.test(te2) || (!_2 && b2 && e5.push(o(t2, ne2)), d(e5, t2, n, i2, ne2, p2 && p2.toString() !== n.globstar && f3 + 1));
    }
  }
  t.exports = function(e5, t2 = {}) {
    if (!e5) return [];
    let n = a(e5);
    if (t2.cwd = t2.cwd || `.`, !n.isGlob) try {
      let n2 = s(t2.cwd, e5), i2 = r.statSync(n2);
      return t2.filesOnly && !i2.isFile() ? [] : t2.absolute ? [n2] : [e5];
    } catch (e6) {
      if (e6.code != `ENOENT`) throw e6;
      return [];
    }
    t2.flush && (u = {});
    let o2 = [], { path: c2 } = i(n.glob, { filepath: true, globstar: true, extended: true });
    return c2.globstar = c2.globstar.toString(), d(o2, n.base, c2, t2, `.`, 0), t2.absolute ? o2.map((e6) => s(t2.cwd, e6)) : o2;
  };
}));
var je = /* @__PURE__ */ new Map([[`github`, `github.com`], [`gitlab`, `gitlab.com`], [`bitbucket`, `bitbucket.org`], [`git.sr.ht`, `git.sr.ht`]]);
var Me = { github: (e4, t) => `${e4.url}/archive/${t}.tar.gz`, gitlab: (e4, t) => `${e4.url}/-/archive/${t}/${e4.name}-${t}.tar.gz`, bitbucket: (e4, t) => `${e4.url}/get/${t}.tar.gz`, "git.sr.ht": (e4, t) => `${e4.url}/archive/${t}.tar.gz` };
function Ne(e4) {
  return Object.hasOwn(Me, e4);
}
function Pe(e4, t) {
  let n = e4.slice(9), r = n.indexOf(`/`);
  if (r === -1) throw new k(`could not parse ${t}`, { code: `BAD_SRC` });
  return { customDomain: n.slice(0, r), remainder: n.slice(r + 1), site: `gitlab`, transport: `https`, isWebUrl: true };
}
function Fe(e4, t) {
  let n = `github`, r = `https`, i = false, a = e4;
  if (e4.startsWith(`https://`) || e4.startsWith(`http://`)) {
    let t2 = new URL(e4);
    n = t2.hostname.replace(/\.(com|org)$/u, ``), a = t2.pathname.replace(/^\//u, ``), i = true;
  } else if (e4.startsWith(`ssh://`)) {
    let t2 = new URL(e4);
    n = t2.hostname.replace(/\.(com|org)$/u, ``), a = t2.pathname.replace(/^\//u, ``), r = `ssh`, i = true;
  } else if (e4.startsWith(`git@`)) {
    let i2 = /^git@([^:/]+)[:/](.+)$/u.exec(e4);
    if (!i2) throw new k(`could not parse ${t}`, { code: `BAD_SRC` });
    n = i2[1].replace(/\.(com|org)$/u, ``), a = i2[2], r = `ssh`;
  } else if (e4.startsWith(`git.sr.ht/`)) n = `git.sr.ht`, a = e4.slice(10);
  else if (e4.startsWith(`gitlab://`)) return Pe(e4, t);
  else {
    let t2 = e4.indexOf(`:`), r2 = e4.indexOf(`/`);
    t2 !== -1 && (r2 === -1 || t2 < r2) && (n = e4.slice(0, t2), a = e4.slice(t2 + 1));
  }
  return { remainder: a, site: n, transport: r, isWebUrl: i };
}
function Ie(e4, t) {
  switch (e4) {
    case `github`: {
      let e5 = t.findIndex((e6, n) => (e6 === `tree` || e6 === `blob`) && n + 1 < t.length);
      return e5 === -1 ? void 0 : { ref: t[e5 + 1], subdir: t.slice(e5 + 2) };
    }
    case `gitlab`: {
      let e5 = t.findIndex((e6, n) => e6 === `-` && (t[n + 1] === `tree` || t[n + 1] === `blob`) && n + 2 < t.length);
      return e5 === -1 ? void 0 : { ref: t[e5 + 2], subdir: t.slice(e5 + 3) };
    }
    case `bitbucket`: {
      let e5 = t.findIndex((e6, n) => e6 === `src` && n + 1 < t.length);
      return e5 === -1 ? void 0 : { ref: t[e5 + 1], subdir: t.slice(e5 + 2) };
    }
    case `git.sr.ht`: {
      let e5 = t.findIndex((e6, n) => e6 === `tree` && n + 1 < t.length);
      return e5 === -1 ? void 0 : { ref: t[e5 + 1], subdir: t.slice(e5 + 2) };
    }
  }
}
function Le(e4) {
  let t = decodeURIComponent(e4), [n, r = `HEAD`] = t.split(`#`, 2), { remainder: i, site: a, transport: o, customDomain: s, isWebUrl: c } = Fe(n, t);
  if (!Ne(a)) throw new k(`degit supports GitHub, GitLab, Sourcehut and BitBucket`, { code: `UNSUPPORTED_HOST` });
  let [l, d, ...f3] = i.split(`/`).filter(Boolean);
  if (!l || !d) throw new k(`could not parse ${e4}`, { code: `BAD_SRC` });
  let p2 = d.replace(/\.git$/u, ``), m3 = r, h3 = f3;
  if (c) {
    let e5 = Ie(a, f3);
    e5 && (r === `HEAD` && (m3 = e5.ref), h3 = e5.subdir);
  }
  let g2 = h3.length > 0 ? `/${h3.join(`/`)}` : void 0, _2 = s ?? je.get(a), v2 = `https://${_2}/${l}/${p2}`, ee2 = `ssh://git@${_2}/${l}/${p2}`;
  return { mode: `tar`, name: p2, ref: m3, site: a, ssh: ee2, subdir: g2, transport: o, url: v2, user: l };
}
function Re(e4, t) {
  if (t.site !== `gitlab`) return [t];
  let [n] = e4.split(`#`, 2), { remainder: r, isWebUrl: i } = Fe(n.replace(/\.git$/u, ``), e4), a = new URL(t.url).hostname, o = r, s = false;
  if (i) {
    let e5 = r.split(`/`).filter(Boolean), t2 = e5.findIndex((t3, n2) => t3 === `-` && (e5[n2 + 1] === `tree` || e5[n2 + 1] === `blob`));
    t2 === -1 ? o = r : (o = e5.slice(0, t2).join(`/`), s = true);
  }
  let c = o.split(`/`).filter(Boolean), l = [];
  for (let e5 = 2; e5 <= c.length; e5 += 1) {
    let n2 = c.slice(0, e5 - 1).join(`/`), r2 = c[e5 - 1], i2 = c.slice(e5).join(`/`), o2 = s ? t.subdir : i2 ? `/${i2}` : void 0;
    l.push({ ...t, user: n2, name: r2, subdir: o2, url: `https://${a}/${n2}/${r2}`, ssh: `ssh://git@${a}/${n2}/${r2}` });
  }
  return l;
}
var ze = y.join(L, `aliases.json`);
function He(e4, t) {
  return Object.hasOwn(e4, t) ? e4[t] : void 0;
}
function Je(e4) {
  e4.on(`info`, (e5) => {
    console.log(De(`> ${e5.message.replace(`options.`, `--`)}`));
  }), e4.on(`warn`, (e5) => {
    console.warn(Ee(`! ${e5.message.replace(`options.`, `--`)}`));
  });
}
function Ye(e4) {
  return e4 instanceof Error ? e4.message : String(e4);
}
async function Xe(e4, t, n, r, i) {
  e4.hasStashed === false && (P(t, n), e4.hasStashed = true);
  let a = r.files ? Array.isArray(r.files) ? r.files : [r.files] : void 0, o = i(r.src, { aliases: e4.aliases, cache: r.cache, fetch: e4.fetch, files: a, force: true, git: await e4.getGitClient(), verbose: r.verbose });
  Je(o);
  try {
    await o.clone(n);
  } catch (e5) {
    console.error(we(`! ${Ye(e5)}`)), process.exit(1);
  }
}
async function Ze(e4, t, n, r, i) {
  if (t.action === `clone`) {
    await Xe(e4, n, r, t, i);
    return;
  }
  if (t.action === `search_replace`) {
    $e(r, t, e4.info, e4.warn);
    return;
  }
  e4.remove(r, t);
}
async function Qe(e4, t, n, r, i) {
  for (let a of t) await Ze(e4, a, n, r, i);
  e4.hasStashed && F(n, r);
}
function $e(e4, t, n, r) {
  let i = Array.isArray(t.files) ? t.files : [t.files], a = y.resolve(e4), o = process.env[t.replacement];
  if (o === void 0) {
    r({ message: `action wants to search_replace using env var ${S(t.replacement)} but it is not defined, skipping` });
    return;
  }
  let s = new RegExp(t.pattern, `gu`), c = i.flatMap((e5) => et(a, e5, s, o, r));
  c.length > 0 && n({ message: `replaced content in ${S(String(c.length))} files: ${c.map((e5) => S(e5)).join(`, `)}` });
}
function et(e4, t, n, r, i) {
  let a = A(e4, t);
  if (!a) return i({ message: `action wants to search_replace ${S(t)} but it is outside the destination, skipping` }), [];
  if (!f2.existsSync(a)) return i({ message: `action wants to search_replace ${S(t)} but it does not exist` }), [];
  if (f2.lstatSync(a).isDirectory()) return i({ message: `action wants to search_replace ${S(t)} but it is a directory, skipping` }), [];
  let o = f2.readFileSync(a, `utf8`), c = o.replace(n, () => r);
  return c === o ? [] : (f2.writeFileSync(a, c), [t]);
}
var tt = m(Ae(), 1);
function nt(e4) {
  let n = y.resolve(e4, O);
  try {
    if (!f2.lstatSync(n).isFile()) return false;
    let e5 = j(n);
    return Array.isArray(e5) ? (f2.unlinkSync(n), e5) : false;
  } catch {
    return false;
  }
}
function rt(e4, t, n, r) {
  try {
    if (f2.readdirSync(e4).length > 0) {
      if (t) {
        n({ code: `DEST_NOT_EMPTY`, message: `destination directory is not empty. Using options.force, continuing` });
        return;
      }
      throw new k(`destination directory is not empty, aborting. Use options.force to override`, { code: `DEST_NOT_EMPTY` });
    }
    r({ code: `DEST_IS_EMPTY`, message: `destination directory is empty` });
  } catch (e5) {
    if (e5.code !== `ENOENT`) throw e5;
  }
}
function it(e4) {
  return /[*?{}[\]]/u.test(e4);
}
function at(e4, t, n, r) {
  let i = Array.isArray(t.files) ? t.files : [t.files], a = y.resolve(e4), o = i.flatMap((e5) => {
    if (it(e5) && !t.allowGlobs) return r({ code: `GLOB_NOT_ALLOWED`, message: `remove action uses glob pattern ${S(e5)} but ${S(`allowGlobs`)} is not set, skipping` }), [];
    if (!A(a, e5)) return st(a, e5, r);
    let n2 = (0, tt.default)(e5, { cwd: a, dot: true, flush: true }), i2 = n2.length > 0 ? n2 : [e5];
    return i2.sort((e6, t2) => y.normalize(t2).split(y.sep).length - y.normalize(e6).split(y.sep).length), i2.flatMap((e6) => st(a, e6, r));
  });
  o.length > 0 && n({ code: `REMOVED`, message: `removed: ${S(o.map((e5) => S(e5)).join(`, `))}` });
}
function ot(e4, t, n) {
  if (n) try {
    let n2 = f2.realpathSync(y.dirname(t)), r = y.relative(e4, n2);
    return r.startsWith(`..`) || y.isAbsolute(r) ? { ok: false, missing: false } : { ok: true };
  } catch {
    return { ok: false, missing: true };
  }
  try {
    return A(e4, f2.realpathSync(t)) ? { ok: true } : { ok: false, missing: false };
  } catch {
    return { ok: false, missing: true };
  }
}
function st(e4, t, n) {
  let r = A(e4, t);
  if (!r) return n({ code: `FILE_OUTSIDE_DEST`, message: `action wants to remove ${S(t)} but it is outside the destination, skipping` }), [];
  let i;
  try {
    i = f2.lstatSync(r);
  } catch {
    return n({ code: `FILE_DOES_NOT_EXIST`, message: `action wants to remove ${S(t)} but it does not exist` }), [];
  }
  let a = ot(e4, r, i.isSymbolicLink());
  if (a.ok === false) return n({ code: a.missing ? `FILE_DOES_NOT_EXIST` : `FILE_OUTSIDE_DEST`, message: `action wants to remove ${S(t)} but ${a.missing ? `it does not exist` : `it resolves outside the destination, skipping`}` }), [];
  let o = i.isDirectory();
  return f2.rmSync(r, { force: true, recursive: true }), o ? [`${t}/`] : [t];
}
function ct(e4, t, n) {
  if (!t || t.length === 0) return;
  let r = y.resolve(e4), i = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set();
  for (let e5 of t) {
    let t2 = A(r, e5);
    if (!t2) {
      n({ code: `FILE_OUTSIDE_DEST`, message: `action wants to keep ${S(e5)} but it is outside the destination, skipping` });
      continue;
    }
    if (!f2.existsSync(t2)) {
      n({ code: `FILE_DOES_NOT_EXIST`, message: `action wants to keep ${S(e5)} but it does not exist` });
      continue;
    }
    let o2 = f2.lstatSync(t2);
    !o2.isSymbolicLink() && o2.isDirectory() ? a.add(t2) : i.add(t2);
  }
  if (i.size === 0 && a.size === 0) {
    n({ code: `NO_FILES_MATCHED`, message: `no requested files were found, keeping the entire destination` });
    return;
  }
  let o = y.resolve(r, O);
  try {
    f2.lstatSync(o).isFile() && i.add(o);
  } catch {
  }
  let l = [...a].map((e5) => ({ dir: e5, prefix: y.join(e5, y.sep) }));
  function u(e5) {
    if (i.has(e5)) return true;
    for (let { dir: t2, prefix: n2 } of l) if (e5 === t2 || e5.startsWith(n2)) return true;
    return false;
  }
  d(r);
  function d(e5) {
    for (let t2 of f2.readdirSync(e5, { withFileTypes: true })) {
      let n2 = y.join(e5, t2.name);
      t2.isDirectory() && !t2.isSymbolicLink() ? (d(n2), f2.readdirSync(n2).length === 0 && !u(n2) && f2.rmdirSync(n2)) : u(n2) || f2.unlinkSync(n2);
    }
  }
}
function lt(e4, t, n) {
  let r = n.split(`/`).filter(Boolean).join(`/`), i = y.join(e4, r);
  if (!f2.existsSync(i)) throw new k(`could not find subdirectory ${n} in cloned repository`, { code: `MISSING_SUBDIR`, subdir: n });
  f2.mkdirSync(t, { recursive: true });
  for (let e5 of f2.readdirSync(i, { withFileTypes: true })) {
    let n2 = y.join(i, e5.name), r2 = y.join(t, e5.name);
    f2.cpSync(n2, r2, { recursive: true });
  }
}
var ut = Object.defineProperty;
var dt = (e4, t) => {
  for (var n in t) ut(e4, n, { get: t[n], enumerable: true });
};
var ft = typeof process == `object` && process ? process : { stdout: null, stderr: null };
var pt = (e4) => !!e4 && typeof e4 == `object` && (e4 instanceof Gt || e4 instanceof he || mt(e4) || ht(e4));
var mt = (e4) => !!e4 && typeof e4 == `object` && e4 instanceof ae && typeof e4.pipe == `function` && e4.pipe !== he.Writable.prototype.pipe;
var ht = (e4) => !!e4 && typeof e4 == `object` && e4 instanceof ae && typeof e4.write == `function` && typeof e4.end == `function`;
var C = /* @__PURE__ */ Symbol(`EOF`);
var w = /* @__PURE__ */ Symbol(`maybeEmitEnd`);
var gt = /* @__PURE__ */ Symbol(`emittedEnd`);
var _t = /* @__PURE__ */ Symbol(`emittingEnd`);
var vt = /* @__PURE__ */ Symbol(`emittedError`);
var yt = /* @__PURE__ */ Symbol(`closed`);
var bt = /* @__PURE__ */ Symbol(`read`);
var xt = /* @__PURE__ */ Symbol(`flush`);
var St = /* @__PURE__ */ Symbol(`flushChunk`);
var T = /* @__PURE__ */ Symbol(`encoding`);
var Ct = /* @__PURE__ */ Symbol(`decoder`);
var E = /* @__PURE__ */ Symbol(`flowing`);
var wt = /* @__PURE__ */ Symbol(`paused`);
var Tt = /* @__PURE__ */ Symbol(`resume`);
var D = /* @__PURE__ */ Symbol(`buffer`);
var O2 = /* @__PURE__ */ Symbol(`pipes`);
var k2 = /* @__PURE__ */ Symbol(`bufferLength`);
var Et = /* @__PURE__ */ Symbol(`bufferPush`);
var Dt = /* @__PURE__ */ Symbol(`bufferShift`);
var A2 = /* @__PURE__ */ Symbol(`objectMode`);
var j2 = /* @__PURE__ */ Symbol(`destroyed`);
var Ot = /* @__PURE__ */ Symbol(`error`);
var kt = /* @__PURE__ */ Symbol(`emitData`);
var At = /* @__PURE__ */ Symbol(`emitEnd`);
var jt = /* @__PURE__ */ Symbol(`emitEnd2`);
var M2 = /* @__PURE__ */ Symbol(`async`);
var Mt = /* @__PURE__ */ Symbol(`abort`);
var Nt = /* @__PURE__ */ Symbol(`aborted`);
var Pt = /* @__PURE__ */ Symbol(`signal`);
var Ft = /* @__PURE__ */ Symbol(`dataListeners`);
var N2 = /* @__PURE__ */ Symbol(`discarded`);
var It = (e4) => Promise.resolve().then(e4);
var Lt = (e4) => e4();
var Rt = (e4) => e4 === `end` || e4 === `finish` || e4 === `prefinish`;
var zt = (e4) => e4 instanceof ArrayBuffer || !!e4 && typeof e4 == `object` && e4.constructor && e4.constructor.name === `ArrayBuffer` && e4.byteLength >= 0;
var Bt = (e4) => !Buffer.isBuffer(e4) && ArrayBuffer.isView(e4);
var Vt = class {
  src;
  dest;
  opts;
  ondrain;
  constructor(e4, t, n) {
    this.src = e4, this.dest = t, this.opts = n, this.ondrain = () => e4[Tt](), this.dest.on(`drain`, this.ondrain);
  }
  unpipe() {
    this.dest.removeListener(`drain`, this.ondrain);
  }
  proxyErrors(e4) {
  }
  end() {
    this.unpipe(), this.opts.end && this.dest.end();
  }
};
var Ht = class extends Vt {
  unpipe() {
    this.src.removeListener(`error`, this.proxyErrors), super.unpipe();
  }
  constructor(e4, t, n) {
    super(e4, t, n), this.proxyErrors = (e5) => this.dest.emit(`error`, e5), e4.on(`error`, this.proxyErrors);
  }
};
var Ut = (e4) => !!e4.objectMode;
var Wt = (e4) => !e4.objectMode && !!e4.encoding && e4.encoding !== `buffer`;
var Gt = class extends ae {
  [E] = false;
  [wt] = false;
  [O2] = [];
  [D] = [];
  [A2];
  [T];
  [M2];
  [Ct];
  [C] = false;
  [gt] = false;
  [_t] = false;
  [yt] = false;
  [vt] = null;
  [k2] = 0;
  [j2] = false;
  [Pt];
  [Nt] = false;
  [Ft] = 0;
  [N2] = false;
  writable = true;
  readable = true;
  constructor(...e4) {
    let t = e4[0] || {};
    if (super(), t.objectMode && typeof t.encoding == `string`) throw TypeError(`Encoding and objectMode may not be used together`);
    Ut(t) ? (this[A2] = true, this[T] = null) : Wt(t) ? (this[T] = t.encoding, this[A2] = false) : (this[A2] = false, this[T] = null), this[M2] = !!t.async, this[Ct] = this[T] ? new ge(this[T]) : null, t && t.debugExposeBuffer === true && Object.defineProperty(this, `buffer`, { get: () => this[D] }), t && t.debugExposePipes === true && Object.defineProperty(this, `pipes`, { get: () => this[O2] });
    let { signal: n } = t;
    n && (this[Pt] = n, n.aborted ? this[Mt]() : n.addEventListener(`abort`, () => this[Mt]()));
  }
  get bufferLength() {
    return this[k2];
  }
  get encoding() {
    return this[T];
  }
  set encoding(e4) {
    throw Error(`Encoding must be set at instantiation time`);
  }
  setEncoding(e4) {
    throw Error(`Encoding must be set at instantiation time`);
  }
  get objectMode() {
    return this[A2];
  }
  set objectMode(e4) {
    throw Error(`objectMode must be set at instantiation time`);
  }
  get async() {
    return this[M2];
  }
  set async(e4) {
    this[M2] = this[M2] || !!e4;
  }
  [Mt]() {
    this[Nt] = true, this.emit(`abort`, this[Pt]?.reason), this.destroy(this[Pt]?.reason);
  }
  get aborted() {
    return this[Nt];
  }
  set aborted(e4) {
  }
  write(e4, t, n) {
    if (this[Nt]) return false;
    if (this[C]) throw Error(`write after end`);
    if (this[j2]) return this.emit(`error`, Object.assign(Error(`Cannot call write after a stream was destroyed`), { code: `ERR_STREAM_DESTROYED` })), true;
    typeof t == `function` && (n = t, t = `utf8`), t ||= `utf8`;
    let r = this[M2] ? It : Lt;
    if (!this[A2] && !Buffer.isBuffer(e4)) {
      if (Bt(e4)) e4 = Buffer.from(e4.buffer, e4.byteOffset, e4.byteLength);
      else if (zt(e4)) e4 = Buffer.from(e4);
      else if (typeof e4 != `string`) throw Error(`Non-contiguous data written to non-objectMode stream`);
    }
    return this[A2] ? (this[E] && this[k2] !== 0 && this[xt](true), this[E] ? this.emit(`data`, e4) : this[Et](e4), this[k2] !== 0 && this.emit(`readable`), n && r(n), this[E]) : e4.length ? (typeof e4 == `string` && !(t === this[T] && !this[Ct]?.lastNeed) && (e4 = Buffer.from(e4, t)), Buffer.isBuffer(e4) && this[T] && (e4 = this[Ct].write(e4)), this[E] && this[k2] !== 0 && this[xt](true), this[E] ? this.emit(`data`, e4) : this[Et](e4), this[k2] !== 0 && this.emit(`readable`), n && r(n), this[E]) : (this[k2] !== 0 && this.emit(`readable`), n && r(n), this[E]);
  }
  read(e4) {
    if (this[j2]) return null;
    if (this[N2] = false, this[k2] === 0 || e4 === 0 || e4 && e4 > this[k2]) return this[w](), null;
    this[A2] && (e4 = null), this[D].length > 1 && !this[A2] && (this[D] = [this[T] ? this[D].join(``) : Buffer.concat(this[D], this[k2])]);
    let t = this[bt](e4 || null, this[D][0]);
    return this[w](), t;
  }
  [bt](e4, t) {
    if (this[A2]) this[Dt]();
    else {
      let n = t;
      e4 === n.length || e4 === null ? this[Dt]() : typeof n == `string` ? (this[D][0] = n.slice(e4), t = n.slice(0, e4), this[k2] -= e4) : (this[D][0] = n.subarray(e4), t = n.subarray(0, e4), this[k2] -= e4);
    }
    return this.emit(`data`, t), !this[D].length && !this[C] && this.emit(`drain`), t;
  }
  end(e4, t, n) {
    return typeof e4 == `function` && (n = e4, e4 = void 0), typeof t == `function` && (n = t, t = `utf8`), e4 !== void 0 && this.write(e4, t), n && this.once(`end`, n), this[C] = true, this.writable = false, (this[E] || !this[wt]) && this[w](), this;
  }
  [Tt]() {
    this[j2] || (!this[Ft] && !this[O2].length && (this[N2] = true), this[wt] = false, this[E] = true, this.emit(`resume`), this[D].length ? this[xt]() : this[C] ? this[w]() : this.emit(`drain`));
  }
  resume() {
    return this[Tt]();
  }
  pause() {
    this[E] = false, this[wt] = true, this[N2] = false;
  }
  get destroyed() {
    return this[j2];
  }
  get flowing() {
    return this[E];
  }
  get paused() {
    return this[wt];
  }
  [Et](e4) {
    this[A2] ? this[k2] += 1 : this[k2] += e4.length, this[D].push(e4);
  }
  [Dt]() {
    return this[A2] ? --this[k2] : this[k2] -= this[D][0].length, this[D].shift();
  }
  [xt](e4 = false) {
    do
      ;
    while (this[St](this[Dt]()) && this[D].length);
    !e4 && !this[D].length && !this[C] && this.emit(`drain`);
  }
  [St](e4) {
    return this.emit(`data`, e4), this[E];
  }
  pipe(e4, t) {
    if (this[j2]) return e4;
    this[N2] = false;
    let n = this[gt];
    return t ||= {}, e4 === ft.stdout || e4 === ft.stderr ? t.end = false : t.end = t.end !== false, t.proxyErrors = !!t.proxyErrors, n ? t.end && e4.end() : (this[O2].push(t.proxyErrors ? new Ht(this, e4, t) : new Vt(this, e4, t)), this[M2] ? It(() => this[Tt]()) : this[Tt]()), e4;
  }
  unpipe(e4) {
    let t = this[O2].find((t2) => t2.dest === e4);
    t && (this[O2].length === 1 ? (this[E] && this[Ft] === 0 && (this[E] = false), this[O2] = []) : this[O2].splice(this[O2].indexOf(t), 1), t.unpipe());
  }
  addListener(e4, t) {
    return this.on(e4, t);
  }
  on(e4, t) {
    let n = super.on(e4, t);
    if (e4 === `data`) this[N2] = false, this[Ft]++, !this[O2].length && !this[E] && this[Tt]();
    else if (e4 === `readable` && this[k2] !== 0) super.emit(`readable`);
    else if (Rt(e4) && this[gt]) super.emit(e4), this.removeAllListeners(e4);
    else if (e4 === `error` && this[vt]) {
      let e5 = t;
      this[M2] ? It(() => e5.call(this, this[vt])) : e5.call(this, this[vt]);
    }
    return n;
  }
  removeListener(e4, t) {
    return this.off(e4, t);
  }
  off(e4, t) {
    let n = super.off(e4, t);
    return e4 === `data` && (this[Ft] = this.listeners(`data`).length, this[Ft] === 0 && !this[N2] && !this[O2].length && (this[E] = false)), n;
  }
  removeAllListeners(e4) {
    let t = super.removeAllListeners(e4);
    return (e4 === `data` || e4 === void 0) && (this[Ft] = 0, !this[N2] && !this[O2].length && (this[E] = false)), t;
  }
  get emittedEnd() {
    return this[gt];
  }
  [w]() {
    !this[_t] && !this[gt] && !this[j2] && this[D].length === 0 && this[C] && (this[_t] = true, this.emit(`end`), this.emit(`prefinish`), this.emit(`finish`), this[yt] && this.emit(`close`), this[_t] = false);
  }
  emit(e4, ...t) {
    let n = t[0];
    if (e4 !== `error` && e4 !== `close` && e4 !== j2 && this[j2]) return false;
    if (e4 === `data`) return !this[A2] && !n ? false : this[M2] ? (It(() => this[kt](n)), true) : this[kt](n);
    if (e4 === `end`) return this[At]();
    if (e4 === `close`) {
      if (this[yt] = true, !this[gt] && !this[j2]) return false;
      let e5 = super.emit(`close`);
      return this.removeAllListeners(`close`), e5;
    } else if (e4 === `error`) {
      this[vt] = n, super.emit(Ot, n);
      let e5 = !this[Pt] || this.listeners(`error`).length ? super.emit(`error`, n) : false;
      return this[w](), e5;
    } else if (e4 === `resume`) {
      let e5 = super.emit(`resume`);
      return this[w](), e5;
    } else if (e4 === `finish` || e4 === `prefinish`) {
      let t2 = super.emit(e4);
      return this.removeAllListeners(e4), t2;
    }
    let r = super.emit(e4, ...t);
    return this[w](), r;
  }
  [kt](e4) {
    for (let t2 of this[O2]) t2.dest.write(e4) === false && this.pause();
    let t = this[N2] ? false : super.emit(`data`, e4);
    return this[w](), t;
  }
  [At]() {
    return this[gt] ? false : (this[gt] = true, this.readable = false, this[M2] ? (It(() => this[jt]()), true) : this[jt]());
  }
  [jt]() {
    if (this[Ct]) {
      let e5 = this[Ct].end();
      if (e5) {
        for (let t of this[O2]) t.dest.write(e5);
        this[N2] || super.emit(`data`, e5);
      }
    }
    for (let e5 of this[O2]) e5.end();
    let e4 = super.emit(`end`);
    return this.removeAllListeners(`end`), e4;
  }
  async collect() {
    let e4 = Object.assign([], { dataLength: 0 });
    this[A2] || (e4.dataLength = 0);
    let t = this.promise();
    return this.on(`data`, (t2) => {
      e4.push(t2), this[A2] || (e4.dataLength += t2.length);
    }), await t, e4;
  }
  async concat() {
    if (this[A2]) throw Error(`cannot concat in objectMode`);
    let e4 = await this.collect();
    return this[T] ? e4.join(``) : Buffer.concat(e4, e4.dataLength);
  }
  async promise() {
    return new Promise((e4, t) => {
      this.on(j2, () => t(Error(`stream destroyed`))), this.on(`error`, (e5) => t(e5)), this.on(`end`, () => e4());
    });
  }
  [Symbol.asyncIterator]() {
    this[N2] = false;
    let e4 = false, t = async () => (this.pause(), e4 = true, { value: void 0, done: true });
    return { next: () => {
      if (e4) return t();
      let n = this.read();
      if (n !== null) return Promise.resolve({ done: false, value: n });
      if (this[C]) return t();
      let r, i, a = (e5) => {
        this.off(`data`, o), this.off(`end`, s), this.off(j2, c), t(), i(e5);
      }, o = (e5) => {
        this.off(`error`, a), this.off(`end`, s), this.off(j2, c), this.pause(), r({ value: e5, done: !!this[C] });
      }, s = () => {
        this.off(`error`, a), this.off(`data`, o), this.off(j2, c), t(), r({ done: true, value: void 0 });
      }, c = () => a(Error(`stream destroyed`));
      return new Promise((e5, t2) => {
        i = t2, r = e5, this.once(j2, c), this.once(`error`, a), this.once(`end`, s), this.once(`data`, o);
      });
    }, throw: t, return: t, [Symbol.asyncIterator]() {
      return this;
    }, [Symbol.asyncDispose]: async () => {
    } };
  }
  [Symbol.iterator]() {
    this[N2] = false;
    let e4 = false, t = () => (this.pause(), this.off(Ot, t), this.off(j2, t), this.off(`end`, t), e4 = true, { done: true, value: void 0 });
    return this.once(`end`, t), this.once(Ot, t), this.once(j2, t), { next: () => {
      if (e4) return t();
      let n = this.read();
      return n === null ? t() : { done: false, value: n };
    }, throw: t, return: t, [Symbol.iterator]() {
      return this;
    }, [Symbol.dispose]: () => {
    } };
  }
  destroy(e4) {
    if (this[j2]) return e4 ? this.emit(`error`, e4) : this.emit(j2), this;
    this[j2] = true, this[N2] = true, this[D].length = 0, this[k2] = 0;
    let t = this;
    return typeof t.close == `function` && !this[yt] && t.close(), e4 ? this.emit(`error`, e4) : this.emit(j2), this;
  }
  static get isStream() {
    return pt;
  }
};
var Kt = _.writev;
var qt = /* @__PURE__ */ Symbol(`_autoClose`);
var P2 = /* @__PURE__ */ Symbol(`_close`);
var Jt = /* @__PURE__ */ Symbol(`_ended`);
var F2 = /* @__PURE__ */ Symbol(`_fd`);
var Yt = /* @__PURE__ */ Symbol(`_finished`);
var I = /* @__PURE__ */ Symbol(`_flags`);
var Xt = /* @__PURE__ */ Symbol(`_flush`);
var Zt = /* @__PURE__ */ Symbol(`_handleChunk`);
var Qt = /* @__PURE__ */ Symbol(`_makeBuf`);
var $t = /* @__PURE__ */ Symbol(`_mode`);
var en = /* @__PURE__ */ Symbol(`_needDrain`);
var tn = /* @__PURE__ */ Symbol(`_onerror`);
var nn = /* @__PURE__ */ Symbol(`_onopen`);
var rn = /* @__PURE__ */ Symbol(`_onread`);
var an = /* @__PURE__ */ Symbol(`_onwrite`);
var on = /* @__PURE__ */ Symbol(`_open`);
var L2 = /* @__PURE__ */ Symbol(`_path`);
var sn = /* @__PURE__ */ Symbol(`_pos`);
var R = /* @__PURE__ */ Symbol(`_queue`);
var cn = /* @__PURE__ */ Symbol(`_read`);
var ln = /* @__PURE__ */ Symbol(`_readSize`);
var z = /* @__PURE__ */ Symbol(`_reading`);
var un = /* @__PURE__ */ Symbol(`_remain`);
var dn = /* @__PURE__ */ Symbol(`_size`);
var fn = /* @__PURE__ */ Symbol(`_write`);
var pn = /* @__PURE__ */ Symbol(`_writing`);
var mn = /* @__PURE__ */ Symbol(`_defaultFlag`);
var hn = /* @__PURE__ */ Symbol(`_errored`);
var gn = class extends Gt {
  [hn] = false;
  [F2];
  [L2];
  [ln];
  [z] = false;
  [dn];
  [un];
  [qt];
  constructor(e4, t) {
    if (t ||= {}, super(t), this.readable = true, this.writable = false, typeof e4 != `string`) throw TypeError(`path must be a string`);
    this[hn] = false, this[F2] = typeof t.fd == `number` ? t.fd : void 0, this[L2] = e4, this[ln] = t.readSize || 16 * 1024 * 1024, this[z] = false, this[dn] = typeof t.size == `number` ? t.size : 1 / 0, this[un] = this[dn], this[qt] = typeof t.autoClose == `boolean` ? t.autoClose : true, typeof this[F2] == `number` ? this[cn]() : this[on]();
  }
  get fd() {
    return this[F2];
  }
  get path() {
    return this[L2];
  }
  write() {
    throw TypeError(`this is a readable stream`);
  }
  end() {
    throw TypeError(`this is a readable stream`);
  }
  [on]() {
    _.open(this[L2], `r`, (e4, t) => this[nn](e4, t));
  }
  [nn](e4, t) {
    e4 ? this[tn](e4) : (this[F2] = t, this.emit(`open`, t), this[cn]());
  }
  [Qt]() {
    return Buffer.allocUnsafe(Math.min(this[ln], this[un]));
  }
  [cn]() {
    if (!this[z]) {
      this[z] = true;
      let e4 = this[Qt]();
      if (e4.length === 0) return process.nextTick(() => this[rn](null, 0, e4));
      _.read(this[F2], e4, 0, e4.length, null, (e5, t, n) => this[rn](e5, t, n));
    }
  }
  [rn](e4, t, n) {
    this[z] = false, e4 ? this[tn](e4) : this[Zt](t, n) && this[cn]();
  }
  [P2]() {
    if (this[qt] && typeof this[F2] == `number`) {
      let e4 = this[F2];
      this[F2] = void 0, _.close(e4, (e5) => e5 ? this.emit(`error`, e5) : this.emit(`close`));
    }
  }
  [tn](e4) {
    this[z] = true, this[P2](), this.emit(`error`, e4);
  }
  [Zt](e4, t) {
    let n = false;
    return this[un] -= e4, e4 > 0 && (n = super.write(e4 < t.length ? t.subarray(0, e4) : t)), (e4 === 0 || this[un] <= 0) && (n = false, this[P2](), super.end()), n;
  }
  emit(e4, ...t) {
    switch (e4) {
      case `prefinish`:
      case `finish`:
        return false;
      case `drain`:
        return typeof this[F2] == `number` && this[cn](), false;
      case `error`:
        return this[hn] ? false : (this[hn] = true, super.emit(e4, ...t));
      default:
        return super.emit(e4, ...t);
    }
  }
};
var _n = class extends gn {
  [on]() {
    let e4 = true;
    try {
      this[nn](null, _.openSync(this[L2], `r`)), e4 = false;
    } finally {
      e4 && this[P2]();
    }
  }
  [cn]() {
    let e4 = true;
    try {
      if (!this[z]) {
        this[z] = true;
        do {
          let e5 = this[Qt](), t = e5.length === 0 ? 0 : _.readSync(this[F2], e5, 0, e5.length, null);
          if (!this[Zt](t, e5)) break;
        } while (true);
        this[z] = false;
      }
      e4 = false;
    } finally {
      e4 && this[P2]();
    }
  }
  [P2]() {
    if (this[qt] && typeof this[F2] == `number`) {
      let e4 = this[F2];
      this[F2] = void 0, _.closeSync(e4), this.emit(`close`);
    }
  }
};
var vn = class extends h2 {
  readable = false;
  writable = true;
  [hn] = false;
  [pn] = false;
  [Jt] = false;
  [R] = [];
  [en] = false;
  [L2];
  [$t];
  [qt];
  [F2];
  [mn];
  [I];
  [Yt] = false;
  [sn];
  constructor(e4, t) {
    t ||= {}, super(t), this[L2] = e4, this[F2] = typeof t.fd == `number` ? t.fd : void 0, this[$t] = t.mode === void 0 ? 438 : t.mode, this[sn] = typeof t.start == `number` ? t.start : void 0, this[qt] = typeof t.autoClose == `boolean` ? t.autoClose : true;
    let n = this[sn] === void 0 ? `w` : `r+`;
    this[mn] = t.flags === void 0, this[I] = t.flags === void 0 ? n : t.flags, this[F2] === void 0 && this[on]();
  }
  emit(e4, ...t) {
    if (e4 === `error`) {
      if (this[hn]) return false;
      this[hn] = true;
    }
    return super.emit(e4, ...t);
  }
  get fd() {
    return this[F2];
  }
  get path() {
    return this[L2];
  }
  [tn](e4) {
    this[P2](), this[pn] = true, this.emit(`error`, e4);
  }
  [on]() {
    _.open(this[L2], this[I], this[$t], (e4, t) => this[nn](e4, t));
  }
  [nn](e4, t) {
    this[mn] && this[I] === `r+` && e4 && e4.code === `ENOENT` ? (this[I] = `w`, this[on]()) : e4 ? this[tn](e4) : (this[F2] = t, this.emit(`open`, t), this[pn] || this[Xt]());
  }
  end(e4, t) {
    return e4 && this.write(e4, t), this[Jt] = true, !this[pn] && !this[R].length && typeof this[F2] == `number` && this[an](null, 0), this;
  }
  write(e4, t) {
    return typeof e4 == `string` && (e4 = Buffer.from(e4, t)), this[Jt] ? (this.emit(`error`, Error(`write() after end()`)), false) : this[F2] === void 0 || this[pn] || this[R].length ? (this[R].push(e4), this[en] = true, false) : (this[pn] = true, this[fn](e4), true);
  }
  [fn](e4) {
    _.write(this[F2], e4, 0, e4.length, this[sn], (e5, t) => this[an](e5, t));
  }
  [an](e4, t) {
    e4 ? this[tn](e4) : (this[sn] !== void 0 && typeof t == `number` && (this[sn] += t), this[R].length ? this[Xt]() : (this[pn] = false, this[Jt] && !this[Yt] ? (this[Yt] = true, this[P2](), this.emit(`finish`)) : this[en] && (this[en] = false, this.emit(`drain`))));
  }
  [Xt]() {
    if (this[R].length === 0) this[Jt] && this[an](null, 0);
    else if (this[R].length === 1) this[fn](this[R].pop());
    else {
      let e4 = this[R];
      this[R] = [], Kt(this[F2], e4, this[sn], (e5, t) => this[an](e5, t));
    }
  }
  [P2]() {
    if (this[qt] && typeof this[F2] == `number`) {
      let e4 = this[F2];
      this[F2] = void 0, _.close(e4, (e5) => e5 ? this.emit(`error`, e5) : this.emit(`close`));
    }
  }
};
var yn = class extends vn {
  [on]() {
    let e4;
    if (this[mn] && this[I] === `r+`) try {
      e4 = _.openSync(this[L2], this[I], this[$t]);
    } catch (e5) {
      if (e5?.code === `ENOENT`) return this[I] = `w`, this[on]();
      throw e5;
    }
    else e4 = _.openSync(this[L2], this[I], this[$t]);
    this[nn](null, e4);
  }
  [P2]() {
    if (this[qt] && typeof this[F2] == `number`) {
      let e4 = this[F2];
      this[F2] = void 0, _.closeSync(e4), this.emit(`close`);
    }
  }
  [fn](e4) {
    let t = true;
    try {
      this[an](null, _.writeSync(this[F2], e4, 0, e4.length, this[sn])), t = false;
    } finally {
      if (t) try {
        this[P2]();
      } catch {
      }
    }
  }
};
var bn = /* @__PURE__ */ new Map([[`C`, `cwd`], [`f`, `file`], [`z`, `gzip`], [`P`, `preservePaths`], [`U`, `unlink`], [`strip-components`, `strip`], [`stripComponents`, `strip`], [`keep-newer`, `newer`], [`keepNewer`, `newer`], [`keep-newer-files`, `newer`], [`keepNewerFiles`, `newer`], [`k`, `keep`], [`keep-existing`, `keep`], [`keepExisting`, `keep`], [`m`, `noMtime`], [`no-mtime`, `noMtime`], [`p`, `preserveOwner`], [`L`, `follow`], [`h`, `follow`], [`onentry`, `onReadEntry`]]);
var xn = (e4) => !!e4.sync && !!e4.file;
var Sn = (e4) => !e4.sync && !!e4.file;
var Cn = (e4) => !!e4.sync && !e4.file;
var wn = (e4) => !e4.sync && !e4.file;
var Tn = (e4) => !!e4.file;
var En = (e4) => bn.get(e4) || e4;
var Dn = (e4 = {}) => {
  if (!e4) return {};
  let t = {};
  for (let [n, r] of Object.entries(e4)) {
    let e5 = En(n);
    t[e5] = r;
  }
  return t.chmod === void 0 && t.noChmod === false && (t.chmod = true), delete t.noChmod, t;
};
var On = (e4, t, n, r, i) => Object.assign((a = [], o, s) => {
  Array.isArray(a) && (o = a, a = {}), typeof o == `function` && (s = o, o = void 0), o = o ? Array.from(o) : [];
  let c = Dn(a);
  if (i?.(c, o), xn(c)) {
    if (typeof s == `function`) throw TypeError(`callback not supported for sync tar functions`);
    return e4(c, o);
  } else if (Sn(c)) {
    let e5 = t(c, o);
    return s ? e5.then(() => s(), s) : e5;
  } else if (Cn(c)) {
    if (typeof s == `function`) throw TypeError(`callback not supported for sync tar functions`);
    return n(c, o);
  } else if (wn(c)) {
    if (typeof s == `function`) throw TypeError(`callback only supported with file option`);
    return r(c, o);
  }
  throw Error(`impossible options??`);
}, { syncFile: e4, asyncFile: t, syncNoFile: n, asyncNoFile: r, validate: i });
var kn = ye.constants || { ZLIB_VERNUM: 4736 };
var B = Object.freeze(Object.assign(/* @__PURE__ */ Object.create(null), { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_MEM_ERROR: -4, Z_BUF_ERROR: -5, Z_VERSION_ERROR: -6, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, DEFLATE: 1, INFLATE: 2, GZIP: 3, GUNZIP: 4, DEFLATERAW: 5, INFLATERAW: 6, UNZIP: 7, BROTLI_DECODE: 8, BROTLI_ENCODE: 9, Z_MIN_WINDOWBITS: 8, Z_MAX_WINDOWBITS: 15, Z_DEFAULT_WINDOWBITS: 15, Z_MIN_CHUNK: 64, Z_MAX_CHUNK: 1 / 0, Z_DEFAULT_CHUNK: 16384, Z_MIN_MEMLEVEL: 1, Z_MAX_MEMLEVEL: 9, Z_DEFAULT_MEMLEVEL: 8, Z_MIN_LEVEL: -1, Z_MAX_LEVEL: 9, Z_DEFAULT_LEVEL: -1, BROTLI_OPERATION_PROCESS: 0, BROTLI_OPERATION_FLUSH: 1, BROTLI_OPERATION_FINISH: 2, BROTLI_OPERATION_EMIT_METADATA: 3, BROTLI_MODE_GENERIC: 0, BROTLI_MODE_TEXT: 1, BROTLI_MODE_FONT: 2, BROTLI_DEFAULT_MODE: 0, BROTLI_MIN_QUALITY: 0, BROTLI_MAX_QUALITY: 11, BROTLI_DEFAULT_QUALITY: 11, BROTLI_MIN_WINDOW_BITS: 10, BROTLI_MAX_WINDOW_BITS: 24, BROTLI_LARGE_MAX_WINDOW_BITS: 30, BROTLI_DEFAULT_WINDOW: 22, BROTLI_MIN_INPUT_BLOCK_BITS: 16, BROTLI_MAX_INPUT_BLOCK_BITS: 24, BROTLI_PARAM_MODE: 0, BROTLI_PARAM_QUALITY: 1, BROTLI_PARAM_LGWIN: 2, BROTLI_PARAM_LGBLOCK: 3, BROTLI_PARAM_DISABLE_LITERAL_CONTEXT_MODELING: 4, BROTLI_PARAM_SIZE_HINT: 5, BROTLI_PARAM_LARGE_WINDOW: 6, BROTLI_PARAM_NPOSTFIX: 7, BROTLI_PARAM_NDIRECT: 8, BROTLI_DECODER_RESULT_ERROR: 0, BROTLI_DECODER_RESULT_SUCCESS: 1, BROTLI_DECODER_RESULT_NEEDS_MORE_INPUT: 2, BROTLI_DECODER_RESULT_NEEDS_MORE_OUTPUT: 3, BROTLI_DECODER_PARAM_DISABLE_RING_BUFFER_REALLOCATION: 0, BROTLI_DECODER_PARAM_LARGE_WINDOW: 1, BROTLI_DECODER_NO_ERROR: 0, BROTLI_DECODER_SUCCESS: 1, BROTLI_DECODER_NEEDS_MORE_INPUT: 2, BROTLI_DECODER_NEEDS_MORE_OUTPUT: 3, BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_NIBBLE: -1, BROTLI_DECODER_ERROR_FORMAT_RESERVED: -2, BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_META_NIBBLE: -3, BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_ALPHABET: -4, BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_SAME: -5, BROTLI_DECODER_ERROR_FORMAT_CL_SPACE: -6, BROTLI_DECODER_ERROR_FORMAT_HUFFMAN_SPACE: -7, BROTLI_DECODER_ERROR_FORMAT_CONTEXT_MAP_REPEAT: -8, BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_1: -9, BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_2: -10, BROTLI_DECODER_ERROR_FORMAT_TRANSFORM: -11, BROTLI_DECODER_ERROR_FORMAT_DICTIONARY: -12, BROTLI_DECODER_ERROR_FORMAT_WINDOW_BITS: -13, BROTLI_DECODER_ERROR_FORMAT_PADDING_1: -14, BROTLI_DECODER_ERROR_FORMAT_PADDING_2: -15, BROTLI_DECODER_ERROR_FORMAT_DISTANCE: -16, BROTLI_DECODER_ERROR_DICTIONARY_NOT_SET: -19, BROTLI_DECODER_ERROR_INVALID_ARGUMENTS: -20, BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MODES: -21, BROTLI_DECODER_ERROR_ALLOC_TREE_GROUPS: -22, BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MAP: -25, BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_1: -26, BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_2: -27, BROTLI_DECODER_ERROR_ALLOC_BLOCK_TYPE_TREES: -30, BROTLI_DECODER_ERROR_UNREACHABLE: -31 }, kn));
var An = _e.concat;
var jn = Object.getOwnPropertyDescriptor(_e, `concat`);
var Mn = (e4) => e4;
var Nn = jn?.writable === true || jn?.set !== void 0 ? (e4) => {
  _e.concat = e4 ? Mn : An;
} : (e4) => {
};
var Pn = /* @__PURE__ */ Symbol(`_superWrite`);
var Fn = class extends Error {
  code;
  errno;
  constructor(e4, t) {
    super(`zlib: ` + e4.message, { cause: e4 }), this.code = e4.code, this.errno = e4.errno, this.code ||= `ZLIB_ERROR`, this.message = `zlib: ` + e4.message, Error.captureStackTrace(this, t ?? this.constructor);
  }
  get name() {
    return `ZlibError`;
  }
};
var In = /* @__PURE__ */ Symbol(`flushFlag`);
var Ln = class extends Gt {
  #e = false;
  #t = false;
  #n;
  #r;
  #i;
  #a;
  #o;
  get sawError() {
    return this.#e;
  }
  get handle() {
    return this.#a;
  }
  get flushFlag() {
    return this.#n;
  }
  constructor(e4, t) {
    if (!e4 || typeof e4 != `object`) throw TypeError(`invalid options for ZlibBase constructor`);
    if (super(e4), this.#n = e4.flush ?? 0, this.#r = e4.finishFlush ?? 0, this.#i = e4.fullFlushFlag ?? 0, typeof ve[t] != `function`) throw TypeError(`Compression method not supported: ` + t);
    try {
      this.#a = new ve[t](e4);
    } catch (e5) {
      throw new Fn(e5, this.constructor);
    }
    this.#o = (e5) => {
      this.#e || (this.#e = true, this.close(), this.emit(`error`, e5));
    }, this.#a?.on(`error`, (e5) => this.#o(new Fn(e5))), this.once(`end`, () => this.close);
  }
  close() {
    this.#a && (this.#a.close(), this.#a = void 0, this.emit(`close`));
  }
  reset() {
    if (!this.#e) return m2(this.#a, `zlib binding closed`), this.#a.reset?.();
  }
  flush(e4) {
    this.ended || (typeof e4 != `number` && (e4 = this.#i), this.write(Object.assign(_e.alloc(0), { [In]: e4 })));
  }
  end(e4, t, n) {
    return typeof e4 == `function` && (n = e4, t = void 0, e4 = void 0), typeof t == `function` && (n = t, t = void 0), e4 && (t ? this.write(e4, t) : this.write(e4)), this.flush(this.#r), this.#t = true, super.end(n);
  }
  get ended() {
    return this.#t;
  }
  [Pn](e4) {
    return super.write(e4);
  }
  write(e4, t, n) {
    if (typeof t == `function` && (n = t, t = `utf8`), typeof e4 == `string` && (e4 = _e.from(e4, t)), this.#e) return;
    m2(this.#a, `zlib binding closed`);
    let r = this.#a._handle, i = r.close;
    r.close = () => {
    };
    let a = this.#a.close;
    this.#a.close = () => {
    }, Nn(true);
    let o;
    try {
      let t2 = typeof e4[In] == `number` ? e4[In] : this.#n;
      o = this.#a._processChunk(e4, t2), Nn(false);
    } catch (e5) {
      Nn(false), this.#o(new Fn(e5, this.write));
    } finally {
      this.#a && (this.#a._handle = r, r.close = i, this.#a.close = a, this.#a.removeAllListeners(`error`));
    }
    this.#a && this.#a.on(`error`, (e5) => this.#o(new Fn(e5, this.write)));
    let s;
    if (o) if (Array.isArray(o) && o.length > 0) {
      let e5 = o[0];
      s = this[Pn](_e.from(e5));
      for (let e6 = 1; e6 < o.length; e6++) s = this[Pn](o[e6]);
    } else s = this[Pn](_e.from(o));
    return n && n(), s;
  }
};
var Rn = class extends Ln {
  #e;
  #t;
  constructor(e4, t) {
    e4 ||= {}, e4.flush = e4.flush || B.Z_NO_FLUSH, e4.finishFlush = e4.finishFlush || B.Z_FINISH, e4.fullFlushFlag = B.Z_FULL_FLUSH, super(e4, t), this.#e = e4.level, this.#t = e4.strategy;
  }
  params(e4, t) {
    if (!this.sawError) {
      if (!this.handle) throw Error(`cannot switch params when binding is closed`);
      if (!this.handle.params) throw Error(`not supported in this implementation`);
      if (this.#e !== e4 || this.#t !== t) {
        this.flush(B.Z_SYNC_FLUSH), m2(this.handle, `zlib binding closed`);
        let n = this.handle.flush;
        this.handle.flush = (e5, t2) => {
          typeof e5 == `function` && (t2 = e5, e5 = this.flushFlag), this.flush(e5), t2?.();
        };
        try {
          this.handle.params(e4, t);
        } finally {
          this.handle.flush = n;
        }
        this.handle && (this.#e = e4, this.#t = t);
      }
    }
  }
};
var zn = class extends Rn {
  #e;
  constructor(e4) {
    super(e4, `Gzip`), this.#e = e4 && !!e4.portable;
  }
  [Pn](e4) {
    return this.#e ? (this.#e = false, e4[9] = 255, super[Pn](e4)) : super[Pn](e4);
  }
};
var Bn = class extends Rn {
  constructor(e4) {
    super(e4, `Unzip`);
  }
};
var Vn = class extends Ln {
  constructor(e4, t) {
    e4 ||= {}, e4.flush = e4.flush || B.BROTLI_OPERATION_PROCESS, e4.finishFlush = e4.finishFlush || B.BROTLI_OPERATION_FINISH, e4.fullFlushFlag = B.BROTLI_OPERATION_FLUSH, super(e4, t);
  }
};
var Hn = class extends Vn {
  constructor(e4) {
    super(e4, `BrotliCompress`);
  }
};
var Un = class extends Vn {
  constructor(e4) {
    super(e4, `BrotliDecompress`);
  }
};
var Wn = class extends Ln {
  constructor(e4, t) {
    e4 ||= {}, e4.flush = e4.flush || B.ZSTD_e_continue, e4.finishFlush = e4.finishFlush || B.ZSTD_e_end, e4.fullFlushFlag = B.ZSTD_e_flush, super(e4, t);
  }
};
var Gn = class extends Wn {
  constructor(e4) {
    super(e4, `ZstdCompress`);
  }
};
var Kn = class extends Wn {
  constructor(e4) {
    super(e4, `ZstdDecompress`);
  }
};
var qn = (e4, t) => {
  if (Number.isSafeInteger(e4)) e4 < 0 ? Yn(e4, t) : Jn(e4, t);
  else throw Error(`cannot encode number outside of javascript safe integer range`);
  return t;
};
var Jn = (e4, t) => {
  t[0] = 128;
  for (var n = t.length; n > 1; n--) t[n - 1] = e4 & 255, e4 = Math.floor(e4 / 256);
};
var Yn = (e4, t) => {
  t[0] = 255;
  var n = false;
  e4 *= -1;
  for (var r = t.length; r > 1; r--) {
    var i = e4 & 255;
    e4 = Math.floor(e4 / 256), n ? t[r - 1] = $n(i) : i === 0 ? t[r - 1] = 0 : (n = true, t[r - 1] = er(i));
  }
};
var Xn = (e4) => {
  let t = e4[0], n = t === 128 ? Qn(e4.subarray(1, e4.length)) : t === 255 ? Zn(e4) : null;
  if (n === null) throw Error(`invalid base256 encoding`);
  if (!Number.isSafeInteger(n)) throw Error(`parsed number outside of javascript safe integer range`);
  return n;
};
var Zn = (e4) => {
  for (var t = e4.length, n = 0, r = false, i = t - 1; i > -1; i--) {
    var a = Number(e4[i]), o;
    r ? o = $n(a) : a === 0 ? o = a : (r = true, o = er(a)), o !== 0 && (n -= o * 256 ** (t - i - 1));
  }
  return n;
};
var Qn = (e4) => {
  for (var t = e4.length, n = 0, r = t - 1; r > -1; r--) {
    var i = Number(e4[r]);
    i !== 0 && (n += i * 256 ** (t - r - 1));
  }
  return n;
};
var $n = (e4) => (255 ^ e4) & 255;
var er = (e4) => (255 ^ e4) + 1 & 255;
dt({}, { code: () => ar, isCode: () => tr, isName: () => nr, name: () => ir, normalFsTypes: () => rr });
var tr = (e4) => ir.has(e4);
var nr = (e4) => ar.has(e4);
var rr = /* @__PURE__ */ new Set([`0`, ``, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `D`]);
var ir = /* @__PURE__ */ new Map([[`0`, `File`], [``, `OldFile`], [`1`, `Link`], [`2`, `SymbolicLink`], [`3`, `CharacterDevice`], [`4`, `BlockDevice`], [`5`, `Directory`], [`6`, `FIFO`], [`7`, `ContiguousFile`], [`g`, `GlobalExtendedHeader`], [`x`, `ExtendedHeader`], [`A`, `SolarisACL`], [`D`, `GNUDumpDir`], [`I`, `Inode`], [`K`, `NextFileHasLongLinkpath`], [`L`, `NextFileHasLongPath`], [`M`, `ContinuationFile`], [`N`, `OldGnuLongPath`], [`S`, `SparseFile`], [`V`, `TapeVolumeHeader`], [`X`, `OldExtendedHeader`]]);
var ar = new Map(Array.from(ir).map((e4) => [e4[1], e4[0]]));
var or = (e4) => e4 === void 0 || e4 < 0 ? void 0 : e4;
var sr = class {
  cksumValid = false;
  needPax = false;
  nullBlock = false;
  block;
  path;
  mode;
  uid;
  gid;
  size;
  cksum;
  #e = `Unsupported`;
  linkpath;
  uname;
  gname;
  devmaj = 0;
  devmin = 0;
  atime;
  ctime;
  mtime;
  charset;
  comment;
  constructor(e4, t = 0, n, r) {
    Buffer.isBuffer(e4) ? this.decode(e4, t || 0, n, r) : e4 && this.#t(e4);
  }
  decode(e4, t, n, r) {
    if (t ||= 0, !e4 || !(e4.length >= t + 512)) throw Error(`need 512 bytes for header`);
    let i = lr(e4, t + 156, 1), a = rr.has(i), o = a ? n : void 0, s = a ? r : void 0;
    if (this.path = o?.path ?? lr(e4, t, 100), this.mode = o?.mode ?? s?.mode ?? fr(e4, t + 100, 8), this.uid = o?.uid ?? s?.uid ?? fr(e4, t + 108, 8), this.gid = o?.gid ?? s?.gid ?? fr(e4, t + 116, 8), this.size = or(o?.size ?? s?.size ?? fr(e4, t + 124, 12)), this.mtime = o?.mtime ?? s?.mtime ?? ur(e4, t + 136, 12), this.cksum = fr(e4, t + 148, 12), s && this.#t(s, true), o && this.#t(o), tr(i) && (this.#e = i || `0`), this.#e === `0` && this.path.slice(-1) === `/` && (this.#e = `5`), this.#e === `5` && (this.size = 0), this.linkpath = lr(e4, t + 157, 100), e4.subarray(t + 257, t + 265).toString() === `ustar\x0000`) if (this.uname = o?.uname ?? s?.uname ?? lr(e4, t + 265, 32), this.gname = o?.gname ?? s?.gname ?? lr(e4, t + 297, 32), this.devmaj = o?.devmaj ?? s?.devmaj ?? fr(e4, t + 329, 8) ?? 0, this.devmin = o?.devmin ?? s?.devmin ?? fr(e4, t + 337, 8) ?? 0, e4[t + 475] !== 0) {
      let n2 = lr(e4, t + 345, 155);
      this.path = n2 + `/` + this.path;
    } else {
      let i2 = lr(e4, t + 345, 130);
      i2 && (this.path = i2 + `/` + this.path), this.atime = n?.atime ?? r?.atime ?? ur(e4, t + 476, 12), this.ctime = n?.ctime ?? r?.ctime ?? ur(e4, t + 488, 12);
    }
    let c = 256;
    for (let n2 = t; n2 < t + 148; n2++) c += e4[n2];
    for (let n2 = t + 156; n2 < t + 512; n2++) c += e4[n2];
    this.cksumValid = c === this.cksum, this.cksum === void 0 && c === 256 && (this.nullBlock = true);
  }
  #t(e4, t = false) {
    Object.assign(this, Object.fromEntries(Object.entries(e4).filter(([e5, n]) => !(n == null || e5 === `size` && Number(n) < 0 || e5 === `path` && t || e5 === `linkpath` && t || e5 === `global`))));
  }
  encode(e4, t = 0) {
    if (e4 ||= this.block = Buffer.alloc(512), this.#e === `Unsupported` && (this.#e = `0`), !(e4.length >= t + 512)) throw Error(`need 512 bytes for header`);
    let n = this.ctime || this.atime ? 130 : 155, r = cr(this.path || ``, n), i = r[0], a = r[1];
    this.needPax = !!r[2], this.needPax = Sr(e4, t, 100, i) || this.needPax, this.needPax = gr(e4, t + 100, 8, this.mode) || this.needPax, this.needPax = gr(e4, t + 108, 8, this.uid) || this.needPax, this.needPax = gr(e4, t + 116, 8, this.gid) || this.needPax, this.needPax = gr(e4, t + 124, 12, this.size) || this.needPax, this.needPax = br(e4, t + 136, 12, this.mtime) || this.needPax, e4[t + 156] = Number(this.#e.codePointAt(0)), this.needPax = Sr(e4, t + 157, 100, this.linkpath) || this.needPax, e4.write(`ustar\x0000`, t + 257, 8), this.needPax = Sr(e4, t + 265, 32, this.uname) || this.needPax, this.needPax = Sr(e4, t + 297, 32, this.gname) || this.needPax, this.needPax = gr(e4, t + 329, 8, this.devmaj) || this.needPax, this.needPax = gr(e4, t + 337, 8, this.devmin) || this.needPax, this.needPax = Sr(e4, t + 345, n, a) || this.needPax, e4[t + 475] === 0 ? (this.needPax = Sr(e4, t + 345, 130, a) || this.needPax, this.needPax = br(e4, t + 476, 12, this.atime) || this.needPax, this.needPax = br(e4, t + 488, 12, this.ctime) || this.needPax) : this.needPax = Sr(e4, t + 345, 155, a) || this.needPax;
    let o = 256;
    for (let n2 = t; n2 < t + 148; n2++) o += e4[n2];
    for (let n2 = t + 156; n2 < t + 512; n2++) o += e4[n2];
    return this.cksum = o, gr(e4, t + 148, 8, this.cksum), this.cksumValid = true, this.needPax;
  }
  get type() {
    return this.#e === `Unsupported` ? this.#e : ir.get(this.#e);
  }
  get typeKey() {
    return this.#e;
  }
  set type(e4) {
    let t = String(ar.get(e4));
    if (tr(t) || t === `Unsupported`) this.#e = t;
    else if (tr(e4)) this.#e = e4;
    else throw TypeError(`invalid entry type: ` + e4);
  }
};
var cr = (e4, t) => {
  let n = e4, r = ``, i, a = b.parse(e4).root || `.`;
  if (Buffer.byteLength(n) < 100) i = [n, r, false];
  else {
    r = b.dirname(n), n = b.basename(n);
    do
      Buffer.byteLength(n) <= 100 && Buffer.byteLength(r) <= t ? i = [n, r, false] : Buffer.byteLength(n) > 100 && Buffer.byteLength(r) <= t ? i = [n.slice(0, 99), r, true] : (n = b.join(b.basename(r), n), r = b.dirname(r));
    while (r !== a && i === void 0);
    i ||= [e4.slice(0, 99), ``, true];
  }
  return i;
};
var lr = (e4, t, n) => e4.subarray(t, t + n).toString(`utf8`).replace(/\0.*/, ``);
var ur = (e4, t, n) => dr(fr(e4, t, n));
var dr = (e4) => e4 === void 0 ? void 0 : new Date(e4 * 1e3);
var fr = (e4, t, n) => Number(e4[t]) & 128 ? Xn(e4.subarray(t, t + n)) : mr(e4, t, n);
var pr = (e4) => isNaN(e4) ? void 0 : e4;
var mr = (e4, t, n) => pr(parseInt(e4.subarray(t, t + n).toString(`utf8`).replace(/\0.*$/, ``).trim(), 8));
var hr = { 12: 8589934591, 8: 2097151 };
var gr = (e4, t, n, r) => r === void 0 ? false : r > hr[n] || r < 0 ? (qn(r, e4.subarray(t, t + n)), true) : (_r(e4, t, n, r), false);
var _r = (e4, t, n, r) => e4.write(vr(r, n), t, n, `ascii`);
var vr = (e4, t) => yr(Math.floor(e4).toString(8), t);
var yr = (e4, t) => (e4.length === t - 1 ? e4 : Array(t - e4.length - 1).join(`0`) + e4 + ` `) + `\0`;
var br = (e4, t, n, r) => r === void 0 ? false : gr(e4, t, n, r.getTime() / 1e3);
var xr = Array(156).join(`\0`);
var Sr = (e4, t, n, r) => r === void 0 ? false : (e4.write(r + xr, t, n, `utf8`), r.length !== Buffer.byteLength(r) || r.length > n);
var Cr = class e {
  atime;
  mtime;
  ctime;
  charset;
  comment;
  gid;
  uid;
  gname;
  uname;
  linkpath;
  dev;
  ino;
  nlink;
  path;
  size;
  mode;
  global;
  constructor(e4, t = false) {
    this.atime = e4.atime, this.charset = e4.charset, this.comment = e4.comment, this.ctime = e4.ctime, this.dev = e4.dev, this.gid = e4.gid, this.global = t, this.gname = e4.gname, this.ino = e4.ino, this.linkpath = e4.linkpath, this.mtime = e4.mtime, this.nlink = e4.nlink, this.path = e4.path, this.size = e4.size, this.uid = e4.uid, this.uname = e4.uname;
  }
  encode() {
    let e4 = this.encodeBody();
    if (e4 === ``) return Buffer.allocUnsafe(0);
    let t = Buffer.byteLength(e4), n = 512 * Math.ceil(1 + t / 512), r = Buffer.allocUnsafe(n);
    for (let e5 = 0; e5 < 512; e5++) r[e5] = 0;
    new sr({ path: (`PaxHeader/` + ne(this.path ?? ``)).slice(0, 99), mode: this.mode || 420, uid: this.uid, gid: this.gid, size: t, mtime: this.mtime, type: this.global ? `GlobalExtendedHeader` : `ExtendedHeader`, linkpath: ``, uname: this.uname || ``, gname: this.gname || ``, devmaj: 0, devmin: 0, atime: this.atime, ctime: this.ctime }).encode(r), r.write(e4, 512, t, `utf8`);
    for (let e5 = t + 512; e5 < r.length; e5++) r[e5] = 0;
    return r;
  }
  encodeBody() {
    return this.encodeField(`path`) + this.encodeField(`ctime`) + this.encodeField(`atime`) + this.encodeField(`dev`) + this.encodeField(`ino`) + this.encodeField(`nlink`) + this.encodeField(`charset`) + this.encodeField(`comment`) + this.encodeField(`gid`) + this.encodeField(`gname`) + this.encodeField(`linkpath`) + this.encodeField(`mtime`) + this.encodeField(`size`) + this.encodeField(`uid`) + this.encodeField(`uname`);
  }
  encodeField(e4) {
    if (this[e4] === void 0) return ``;
    let t = this[e4], n = t instanceof Date ? t.getTime() / 1e3 : t, r = ` ` + (e4 === `dev` || e4 === `ino` || e4 === `nlink` ? `SCHILY.` : ``) + e4 + `=` + n + `
`, i = Buffer.byteLength(r), a = Math.floor(Math.log(i) / Math.log(10)) + 1;
    return i + a >= 10 ** a && (a += 1), a + i + r;
  }
  static parse(t, n, r = false) {
    return new e(wr(Tr(t), n), r);
  }
};
var wr = (e4, t) => t ? Object.assign({}, t, e4) : e4;
var Tr = (e4) => e4.replace(/\n$/, ``).split(`
`).reduce(Er, /* @__PURE__ */ Object.create(null));
var Er = (e4, t) => {
  let n = parseInt(t, 10);
  if (n !== Buffer.byteLength(t) + 1) return e4;
  t = t.slice((n + ` `).length);
  let r = t.split(`=`), i = r.shift();
  if (!i) return e4;
  let a = i.replace(/^SCHILY\.(dev|ino|nlink)/, `$1`), o = r.join(`=`).replace(/\0.*/, ``);
  switch (a) {
    case `path`:
    case `linkpath`:
    case `type`:
    case `charset`:
    case `comment`:
    case `gname`:
    case `uname`:
      e4[a] = o;
      break;
    case `ctime`:
    case `atime`:
    case `mtime`:
      e4[a] = new Date(Number(o) * 1e3);
      break;
    case `size`:
      let t2 = +o;
      t2 >= 0 && (e4[a] = t2);
      break;
    case `gid`:
    case `uid`:
    case `dev`:
    case `ino`:
    case `nlink`:
    case `mode`:
      e4[a] = +o;
      break;
  }
  return e4;
};
var V = (process.env.TESTING_TAR_FAKE_PLATFORM || process.platform) === `win32` ? (e4) => String(e4).replaceAll(/\\/g, `/`) : (e4) => String(e4);
var Dr = class extends Gt {
  extended;
  globalExtended;
  header;
  startBlockSize;
  blockRemain;
  remain;
  type;
  meta = false;
  ignore = false;
  path;
  mode;
  uid;
  gid;
  uname;
  gname;
  size = 0;
  mtime;
  atime;
  ctime;
  linkpath;
  dev;
  ino;
  nlink;
  invalid = false;
  absolute;
  unsupported = false;
  constructor(e4, t, n) {
    switch (super({}), this.pause(), this.extended = t, this.globalExtended = n, this.header = e4, this.remain = e4.size ?? 0, this.startBlockSize = 512 * Math.ceil(this.remain / 512), this.blockRemain = this.startBlockSize, this.type = e4.type, this.type) {
      case `File`:
      case `OldFile`:
      case `Link`:
      case `SymbolicLink`:
      case `CharacterDevice`:
      case `BlockDevice`:
      case `Directory`:
      case `FIFO`:
      case `ContiguousFile`:
      case `GNUDumpDir`:
        break;
      case `NextFileHasLongLinkpath`:
      case `NextFileHasLongPath`:
      case `OldGnuLongPath`:
      case `GlobalExtendedHeader`:
      case `ExtendedHeader`:
      case `OldExtendedHeader`:
        this.meta = true;
        break;
      default:
        this.ignore = true;
    }
    if (!e4.path) throw Error(`no path provided for tar.ReadEntry`);
    this.path = V(e4.path), this.mode = e4.mode, this.mode && (this.mode &= 4095), this.uid = e4.uid, this.gid = e4.gid, this.uname = e4.uname, this.gname = e4.gname, this.size = this.remain, this.mtime = e4.mtime, this.atime = e4.atime, this.ctime = e4.ctime, this.linkpath = e4.linkpath ? V(e4.linkpath) : void 0, this.uname = e4.uname, this.gname = e4.gname, t && this.#e(t), n && this.#e(n, true);
  }
  write(e4) {
    let t = e4.length;
    if (t > this.blockRemain) throw Error(`writing more to entry than is appropriate`);
    let n = this.remain, r = this.blockRemain;
    return this.remain = Math.max(0, n - t), this.blockRemain = Math.max(0, r - t), this.ignore ? true : n >= t ? super.write(e4) : super.write(e4.subarray(0, n));
  }
  #e(e4, t = false) {
    e4.path &&= V(e4.path), e4.linkpath &&= V(e4.linkpath), Object.assign(this, Object.fromEntries(Object.entries(e4).filter(([e5, n]) => !(n == null || e5 === `path` && t))));
  }
};
var Or = (e4, t, n, r = {}) => {
  e4.file && (r.file = e4.file), e4.cwd && (r.cwd = e4.cwd), r.code = n instanceof Error && n.code || t, r.tarCode = t, !e4.strict && r.recoverable !== false ? (n instanceof Error && (r = Object.assign(n, r), n = n.message), e4.emit(`warn`, t, n, r)) : n instanceof Error ? e4.emit(`error`, Object.assign(n, r)) : e4.emit(`error`, Object.assign(Error(`${t}: ${n}`), r));
};
var kr = 1024 * 1024;
var Ar = Buffer.from([31, 139]);
var jr = Buffer.from([40, 181, 47, 253]);
var Mr = Math.max(Ar.length, jr.length);
var H = /* @__PURE__ */ Symbol(`state`);
var Nr = /* @__PURE__ */ Symbol(`writeEntry`);
var U = /* @__PURE__ */ Symbol(`readEntry`);
var Pr = /* @__PURE__ */ Symbol(`nextEntry`);
var Fr = /* @__PURE__ */ Symbol(`processEntry`);
var W = /* @__PURE__ */ Symbol(`extendedHeader`);
var Ir = /* @__PURE__ */ Symbol(`globalExtendedHeader`);
var Lr = /* @__PURE__ */ Symbol(`meta`);
var Rr = /* @__PURE__ */ Symbol(`emitMeta`);
var G = /* @__PURE__ */ Symbol(`buffer`);
var K = /* @__PURE__ */ Symbol(`queue`);
var zr = /* @__PURE__ */ Symbol(`ended`);
var Br = /* @__PURE__ */ Symbol(`emittedEnd`);
var Vr = /* @__PURE__ */ Symbol(`emit`);
var q = /* @__PURE__ */ Symbol(`unzip`);
var Hr = /* @__PURE__ */ Symbol(`consumeChunk`);
var Ur = /* @__PURE__ */ Symbol(`consumeChunkSub`);
var Wr = /* @__PURE__ */ Symbol(`consumeBody`);
var Gr = /* @__PURE__ */ Symbol(`consumeMeta`);
var Kr = /* @__PURE__ */ Symbol(`consumeHeader`);
var qr = /* @__PURE__ */ Symbol(`consuming`);
var Jr = /* @__PURE__ */ Symbol(`bufferConcat`);
var Yr = /* @__PURE__ */ Symbol(`maybeEnd`);
var Xr = /* @__PURE__ */ Symbol(`writing`);
var J = /* @__PURE__ */ Symbol(`aborted`);
var Zr = /* @__PURE__ */ Symbol(`onDone`);
var Qr = /* @__PURE__ */ Symbol(`sawValidEntry`);
var $r = /* @__PURE__ */ Symbol(`sawNullBlock`);
var ei = /* @__PURE__ */ Symbol(`sawEOF`);
var ti = /* @__PURE__ */ Symbol(`closeStream`);
var ni = 1e3;
var ri = /* @__PURE__ */ Symbol(`compressedBytesRead`);
var ii = /* @__PURE__ */ Symbol(`decompressedBytesRead`);
var ai = /* @__PURE__ */ Symbol(`checkDecompressionRatio`);
var oi = () => true;
var si = class extends g {
  file;
  strict;
  maxMetaEntrySize;
  filter;
  brotli;
  zstd;
  maxDecompressionRatio;
  writable = true;
  readable = false;
  [K] = [];
  [G];
  [U];
  [Nr];
  [H] = `begin`;
  [Lr] = ``;
  [W];
  [Ir];
  [zr] = false;
  [q];
  [J] = false;
  [Qr];
  [$r] = false;
  [ei] = false;
  [Xr] = false;
  [qr] = false;
  [Br] = false;
  [ri] = 0;
  [ii] = 0;
  constructor(e4 = {}) {
    super(), this.file = e4.file || ``, this.on(Zr, () => {
      (this[H] === `begin` || this[Qr] === false) && this.warn(`TAR_BAD_ARCHIVE`, `Unrecognized archive format`);
    }), e4.ondone ? this.on(Zr, e4.ondone) : this.on(Zr, () => {
      this.emit(`prefinish`), this.emit(`finish`), this.emit(`end`);
    }), this.strict = !!e4.strict, this.maxDecompressionRatio = typeof e4.maxDecompressionRatio == `number` ? e4.maxDecompressionRatio : ni, this.maxMetaEntrySize = e4.maxMetaEntrySize || kr, this.filter = typeof e4.filter == `function` ? e4.filter : oi;
    let t = e4.file && (e4.file.endsWith(`.tar.br`) || e4.file.endsWith(`.tbr`));
    this.brotli = !(e4.gzip || e4.zstd) && e4.brotli !== void 0 ? e4.brotli : t ? void 0 : false;
    let n = e4.file && (e4.file.endsWith(`.tar.zst`) || e4.file.endsWith(`.tzst`));
    this.zstd = !(e4.gzip || e4.brotli) && e4.zstd !== void 0 ? e4.zstd : n ? true : void 0, this.on(`end`, () => this[ti]()), typeof e4.onwarn == `function` && this.on(`warn`, e4.onwarn), typeof e4.onReadEntry == `function` && this.on(`entry`, e4.onReadEntry);
  }
  warn(e4, t, n = {}) {
    Or(this, e4, t, n);
  }
  [Kr](e4, t) {
    this[Qr] === void 0 && (this[Qr] = false);
    let n;
    try {
      n = new sr(e4, t, this[W], this[Ir]);
    } catch (e5) {
      return this.warn(`TAR_ENTRY_INVALID`, e5);
    }
    if (n.nullBlock) this[$r] ? (this[ei] = true, this[H] === `begin` && (this[H] = `header`), this[Vr](`eof`)) : (this[$r] = true, this[Vr](`nullBlock`));
    else if (this[$r] = false, !n.cksumValid) this.warn(`TAR_ENTRY_INVALID`, `checksum failure`, { header: n });
    else if (!n.path) this.warn(`TAR_ENTRY_INVALID`, `path is required`, { header: n });
    else {
      let e5 = n.type;
      if (/^(Symbolic)?Link$/.test(e5) && !n.linkpath) this.warn(`TAR_ENTRY_INVALID`, `linkpath required`, { header: n });
      else if (!/^(Symbolic)?Link$/.test(e5) && !/^(Global)?ExtendedHeader$/.test(e5) && n.linkpath) this.warn(`TAR_ENTRY_INVALID`, `linkpath forbidden`, { header: n });
      else {
        let e6 = this[Nr] = new Dr(n, this[W], this[Ir]);
        this[Qr] || (e6.remain ? e6.on(`end`, () => {
          e6.invalid || (this[Qr] = true);
        }) : this[Qr] = true), e6.meta ? e6.size > this.maxMetaEntrySize ? (e6.ignore = true, this[Vr](`ignoredEntry`, e6), this[H] = `ignore`, e6.resume()) : e6.size > 0 && (this[Lr] = ``, e6.on(`data`, (e7) => this[Lr] += e7), this[H] = `meta`) : (this[W] = void 0, e6.ignore = e6.ignore || !this.filter(e6.path, e6), e6.ignore ? (this[Vr](`ignoredEntry`, e6), this[H] = e6.remain ? `ignore` : `header`, e6.resume()) : (e6.remain ? this[H] = `body` : (this[H] = `header`, e6.end()), this[U] ? this[K].push(e6) : (this[K].push(e6), this[Pr]())));
      }
    }
  }
  [ti]() {
    queueMicrotask(() => this.emit(`close`));
  }
  [Fr](e4) {
    let t = true;
    if (!e4) this[U] = void 0, t = false;
    else if (Array.isArray(e4)) {
      let [t2, ...n] = e4;
      this.emit(t2, ...n);
    } else this[U] = e4, this.emit(`entry`, e4), e4.emittedEnd || (e4.on(`end`, () => this[Pr]()), t = false);
    return t;
  }
  [Pr]() {
    do
      ;
    while (this[Fr](this[K].shift()));
    if (this[K].length === 0) {
      let e4 = this[U];
      !e4 || e4.flowing || e4.size === e4.remain ? this[Xr] || this.emit(`drain`) : e4.once(`drain`, () => this.emit(`drain`));
    }
  }
  [Wr](e4, t) {
    let n = this[Nr];
    if (!n) throw Error(`attempt to consume body without entry??`);
    let r = n.blockRemain ?? 0, i = r >= e4.length && t === 0 ? e4 : e4.subarray(t, t + r);
    return n.write(i), n.blockRemain || (this[H] = `header`, this[Nr] = void 0, n.end()), i.length;
  }
  [Gr](e4, t) {
    let n = this[Nr], r = this[Wr](e4, t);
    return !this[Nr] && n && this[Rr](n), r;
  }
  [Vr](e4, t, n) {
    this[K].length === 0 && !this[U] ? this.emit(e4, t, n) : this[K].push([e4, t, n]);
  }
  [Rr](e4) {
    switch (this[Vr](`meta`, this[Lr]), e4.type) {
      case `ExtendedHeader`:
      case `OldExtendedHeader`:
        this[W] = Cr.parse(this[Lr], this[W], false);
        break;
      case `GlobalExtendedHeader`:
        this[Ir] = Cr.parse(this[Lr], this[Ir], true);
        break;
      case `NextFileHasLongPath`:
      case `OldGnuLongPath`: {
        let e5 = this[W] ?? /* @__PURE__ */ Object.create(null);
        this[W] = e5, e5.path = this[Lr].replace(/\0.*/, ``);
        break;
      }
      case `NextFileHasLongLinkpath`: {
        let e5 = this[W] || /* @__PURE__ */ Object.create(null);
        this[W] = e5, e5.linkpath = this[Lr].replace(/\0.*/, ``);
        break;
      }
      default:
        throw Error(`unknown meta: ` + e4.type);
    }
  }
  abort(e4) {
    if (!this[J]) {
      if (this[q]) {
        let e5 = this[q];
        e5.write = () => true, e5.end = () => e5, e5.emit = () => false, e5.destroy?.();
      }
      this[J] = true, this.emit(`abort`, e4), this.warn(`TAR_ABORT`, e4, { recoverable: false });
    }
  }
  [ai](e4) {
    this[ii] += e4.length;
    let t = this[ii] / this[ri];
    return t > this.maxDecompressionRatio ? (this.abort(Error(`max decompression ratio exceeded: ${t.toFixed(2)} > ${this.maxDecompressionRatio}`)), false) : true;
  }
  write(e4, t, n) {
    if (typeof t == `function` && (n = t, t = void 0), typeof e4 == `string` && (e4 = Buffer.from(e4, typeof t == `string` ? t : `utf8`)), this[J]) return n?.(), false;
    if ((this[q] === void 0 || this.brotli === void 0 && this[q] === false) && e4) {
      if (this[G] && (e4 = Buffer.concat([this[G], e4]), this[G] = void 0), e4.length < Mr) return this[G] = e4, n?.(), true;
      for (let t3 = 0; this[q] === void 0 && t3 < Ar.length; t3++) e4[t3] !== Ar[t3] && (this[q] = false);
      let t2 = false;
      if (this[q] === false && this.zstd !== false) {
        t2 = true;
        for (let n2 = 0; n2 < jr.length; n2++) if (e4[n2] !== jr[n2]) {
          t2 = false;
          break;
        }
      }
      let r2 = this.brotli === void 0 && !t2;
      if (this[q] === false && r2) if (e4.length < 512) if (this[zr]) this.brotli = true;
      else return this[G] = e4, n?.(), true;
      else try {
        new sr(e4.subarray(0, 512)), this.brotli = false;
      } catch {
        this.brotli = true;
      }
      if (this[q] === void 0 || this[q] === false && (this.brotli || t2)) {
        let r3 = this[zr];
        this[zr] = false, this[q] = this[q] === void 0 ? new Bn({}) : t2 ? new Kn({}) : new Un({}), this[q].on(`data`, (e5) => {
          this[ai](e5) && this[Hr](e5);
        }), this[q].on(`error`, (e5) => {
          this[J] || this.abort(e5);
        }), this[q].on(`end`, () => {
          this[zr] = true, this[Hr]();
        }), this[Xr] = true, this[ri] += e4.length;
        let i = !!this[q][r3 ? `end` : `write`](e4);
        return this[Xr] = false, n?.(), i;
      }
    }
    this[Xr] = true, this[q] ? (this[ri] += e4.length, this[q].write(e4)) : this[Hr](e4), this[Xr] = false;
    let r = this[K].length > 0 ? false : this[U] ? this[U].flowing : true;
    return !r && this[K].length === 0 && this[U]?.once(`drain`, () => this.emit(`drain`)), n?.(), r;
  }
  [Jr](e4) {
    e4 && !this[J] && (this[G] = this[G] ? Buffer.concat([this[G], e4]) : e4);
  }
  [Yr]() {
    if (this[zr] && !this[Br] && !this[J] && !this[qr]) {
      this[Br] = true;
      let e4 = this[Nr];
      if (e4?.blockRemain) {
        let t = this[G] ? this[G].length : 0;
        this.warn(`TAR_BAD_ARCHIVE`, `Truncated input (needed ${e4.blockRemain} more bytes, only ${t} available)`, { entry: e4 }), this[G] && e4.write(this[G]), e4.end();
      }
      this[Vr](Zr);
    }
  }
  [Hr](e4) {
    if (this[qr] && e4) this[Jr](e4);
    else if (!e4 && !this[G]) this[Yr]();
    else if (e4) {
      if (this[qr] = true, this[G]) {
        this[Jr](e4);
        let t = this[G];
        this[G] = void 0, this[Ur](t);
      } else this[Ur](e4);
      for (; this[G] && this[G]?.length >= 512 && !this[J] && !this[ei]; ) {
        let e5 = this[G];
        this[G] = void 0, this[Ur](e5);
      }
      this[qr] = false;
    }
    (!this[G] || this[zr]) && this[Yr]();
  }
  [Ur](e4) {
    let t = 0, n = e4.length;
    for (; t + 512 <= n && !this[J] && !this[ei]; ) switch (this[H]) {
      case `begin`:
      case `header`:
        this[Kr](e4, t), t += 512;
        break;
      case `ignore`:
      case `body`:
        t += this[Wr](e4, t);
        break;
      case `meta`:
        t += this[Gr](e4, t);
        break;
      default:
        throw Error(`invalid state: ` + this[H]);
    }
    t < n && (this[G] = this[G] ? Buffer.concat([e4.subarray(t), this[G]]) : e4.subarray(t));
  }
  end(e4, t, n) {
    return typeof e4 == `function` && (n = e4, t = void 0, e4 = void 0), typeof t == `function` && (n = t, t = void 0), typeof e4 == `string` && (e4 = Buffer.from(e4, t)), n && this.once(`finish`, n), this[J] || (this[q] ? (e4 && (this[ri] += e4.length, this[q].write(e4)), this[q].end()) : (this[zr] = true, (this.brotli === void 0 || this.zstd === void 0) && (e4 ||= Buffer.alloc(0)), e4 && this.write(e4), this[Yr]())), this;
  }
};
var ci = (e4) => {
  let t = e4.length - 1, n = -1;
  for (; t > -1 && e4.charAt(t) === `/`; ) n = t, t--;
  return n === -1 ? e4 : e4.slice(0, n);
};
var li = (e4) => {
  let t = e4.onReadEntry;
  e4.onReadEntry = t ? (e5) => {
    t(e5), e5.resume();
  } : (e5) => e5.resume();
};
var ui = (e4, t) => {
  let n = new Map(t.map((e5) => [ci(e5), true])), r = e4.filter, i = (e5, t2 = ``, r2 = 0) => {
    if (r2 >= 100) return n.set(e5, false), false;
    let a = t2 || te(e5).root || `.`, o;
    if (e5 === a) o = false;
    else {
      let t3 = n.get(e5);
      o = t3 === void 0 ? i(ee(e5), a, r2 + 1) : t3;
    }
    return n.set(e5, o), o;
  };
  e4.filter = r ? (e5, t2) => r(e5, t2) && i(ci(e5)) : (e5) => i(ci(e5));
};
var di = On((e4) => {
  let t = new si(e4), n = e4.file, r;
  try {
    r = f2.openSync(n, `r`);
    let i = f2.fstatSync(r), a = e4.maxReadSize || 16 * 1024 * 1024;
    if (i.size < a) {
      let e5 = Buffer.allocUnsafe(i.size), n2 = f2.readSync(r, e5, 0, i.size, 0);
      t.end(n2 === e5.byteLength ? e5 : e5.subarray(0, n2));
    } else {
      let e5 = 0, n2 = Buffer.allocUnsafe(a);
      for (; e5 < i.size; ) {
        let i2 = f2.readSync(r, n2, 0, a, e5);
        if (i2 === 0) break;
        e5 += i2, t.write(n2.subarray(0, i2));
      }
      t.end();
    }
  } finally {
    if (typeof r == `number`) try {
      f2.closeSync(r);
    } catch {
    }
  }
}, (e4, t) => {
  let n = new si(e4), r = e4.maxReadSize || 16 * 1024 * 1024, i = e4.file;
  return new Promise((e5, t2) => {
    n.on(`error`, t2), n.on(`end`, e5), f2.stat(i, (e6, a) => {
      if (e6) t2(e6);
      else {
        let e7 = new gn(i, { readSize: r, size: a.size });
        e7.on(`error`, t2), e7.pipe(n);
      }
    });
  });
}, (e4) => new si(e4), (e4) => new si(e4), (e4, t) => {
  t?.length && ui(e4, t), e4.noResume || li(e4);
});
var fi = (e4, t, n) => (e4 &= 4095, n && (e4 = (e4 | 384) & -19), t && (e4 & 256 && (e4 |= 64), e4 & 32 && (e4 |= 8), e4 & 4 && (e4 |= 1)), e4);
var { isAbsolute: pi, parse: mi } = ie;
var hi = (e4) => {
  let t = ``, n = mi(e4);
  for (; pi(e4) || n.root; ) {
    let r = e4.charAt(0) === `/` && e4.slice(0, 4) !== `//?/` ? `/` : n.root;
    e4 = e4.slice(r.length), t += r, n = mi(e4);
  }
  return [t, e4];
};
var gi = [`|`, `<`, `>`, `?`, `:`];
var _i = gi.map((e4) => String.fromCodePoint(61440 + Number(e4.codePointAt(0))));
var vi = new Map(gi.map((e4, t) => [e4, _i[t]]));
var yi = new Map(_i.map((e4, t) => [e4, gi[t]]));
var bi = (e4) => gi.reduce((e5, t) => e5.split(t).join(vi.get(t)), e4);
var xi = (e4) => _i.reduce((e5, t) => e5.split(t).join(yi.get(t)), e4);
var Si = (e4, t) => t ? (e4 = V(e4).replace(/^\.(\/|$)/, ``), ci(t) + `/` + e4) : V(e4);
var Ci = 16 * 1024 * 1024;
var wi = /* @__PURE__ */ Symbol(`process`);
var Ti = /* @__PURE__ */ Symbol(`file`);
var Ei = /* @__PURE__ */ Symbol(`directory`);
var Di = /* @__PURE__ */ Symbol(`symlink`);
var Oi = /* @__PURE__ */ Symbol(`hardlink`);
var ki = /* @__PURE__ */ Symbol(`header`);
var Ai = /* @__PURE__ */ Symbol(`read`);
var ji = /* @__PURE__ */ Symbol(`lstat`);
var Mi = /* @__PURE__ */ Symbol(`onlstat`);
var Ni = /* @__PURE__ */ Symbol(`onread`);
var Pi = /* @__PURE__ */ Symbol(`onreadlink`);
var Fi = /* @__PURE__ */ Symbol(`openfile`);
var Ii = /* @__PURE__ */ Symbol(`onopenfile`);
var Li = /* @__PURE__ */ Symbol(`close`);
var Ri = /* @__PURE__ */ Symbol(`mode`);
var zi = /* @__PURE__ */ Symbol(`awaitDrain`);
var Bi = /* @__PURE__ */ Symbol(`ondrain`);
var Y = /* @__PURE__ */ Symbol(`prefix`);
var Vi = class extends Gt {
  path;
  portable;
  myuid = process.getuid && process.getuid() || 0;
  myuser = process.env.USER || ``;
  maxReadSize;
  linkCache;
  statCache;
  preservePaths;
  cwd;
  strict;
  mtime;
  noPax;
  noMtime;
  prefix;
  fd;
  blockLen = 0;
  blockRemain = 0;
  buf;
  pos = 0;
  remain = 0;
  length = 0;
  offset = 0;
  win32;
  absolute;
  header;
  type;
  linkpath;
  stat;
  onWriteEntry;
  #e = false;
  constructor(e4, t = {}) {
    let n = Dn(t);
    super(), this.path = V(e4), this.portable = !!n.portable, this.maxReadSize = n.maxReadSize || Ci, this.linkCache = n.linkCache || /* @__PURE__ */ new Map(), this.statCache = n.statCache || /* @__PURE__ */ new Map(), this.preservePaths = !!n.preservePaths, this.cwd = V(n.cwd || process.cwd()), this.strict = !!n.strict, this.noPax = !!n.noPax, this.noMtime = !!n.noMtime, this.mtime = n.mtime, this.prefix = n.prefix ? V(n.prefix) : void 0, this.onWriteEntry = n.onWriteEntry, typeof n.onwarn == `function` && this.on(`warn`, n.onwarn);
    let r = false;
    if (!this.preservePaths) {
      let [e5, t2] = hi(this.path);
      e5 && typeof t2 == `string` && (this.path = t2, r = e5);
    }
    this.win32 = !!n.win32 || process.platform === `win32`, this.win32 && (this.path = xi(this.path.replaceAll(/\\/g, `/`)), e4 = e4.replaceAll(/\\/g, `/`)), this.absolute = V(n.absolute || v.resolve(this.cwd, e4)), this.path === `` && (this.path = `./`), r && this.warn(`TAR_ENTRY_INFO`, `stripping ${r} from absolute path`, { entry: this, path: r + this.path });
    let i = this.statCache.get(this.absolute);
    i ? this[Mi](i) : this[ji]();
  }
  warn(e4, t, n = {}) {
    return Or(this, e4, t, n);
  }
  emit(e4, ...t) {
    return e4 === `error` && (this.#e = true), super.emit(e4, ...t);
  }
  [ji]() {
    _.lstat(this.absolute, (e4, t) => {
      if (e4) return this.emit(`error`, e4);
      this[Mi](t);
    });
  }
  [Mi](e4) {
    this.statCache.set(this.absolute, e4), this.stat = e4, e4.isFile() || (e4.size = 0), this.type = Wi(e4), this.emit(`stat`, e4), this[wi]();
  }
  [wi]() {
    switch (this.type) {
      case `File`:
        return this[Ti]();
      case `Directory`:
        return this[Ei]();
      case `SymbolicLink`:
        return this[Di]();
      default:
        return this.end();
    }
  }
  [Ri](e4) {
    return fi(e4, this.type === `Directory`, this.portable);
  }
  [Y](e4) {
    return Si(e4, this.prefix);
  }
  [ki]() {
    if (!this.stat) throw Error(`cannot write header before stat`);
    this.type === `Directory` && this.portable && (this.noMtime = true), this.onWriteEntry?.(this), this.header = new sr({ path: this[Y](this.path), linkpath: this.type === `Link` && this.linkpath !== void 0 ? this[Y](this.linkpath) : this.linkpath, mode: this[Ri](this.stat.mode), uid: this.portable ? void 0 : this.stat.uid, gid: this.portable ? void 0 : this.stat.gid, size: this.stat.size, mtime: this.noMtime ? void 0 : this.mtime || this.stat.mtime, type: this.type === `Unsupported` ? void 0 : this.type, uname: this.portable ? void 0 : this.stat.uid === this.myuid ? this.myuser : ``, atime: this.portable ? void 0 : this.stat.atime, ctime: this.portable ? void 0 : this.stat.ctime }), this.header.encode() && !this.noPax && super.write(new Cr({ atime: this.portable ? void 0 : this.header.atime, ctime: this.portable ? void 0 : this.header.ctime, gid: this.portable ? void 0 : this.header.gid, mtime: this.noMtime ? void 0 : this.mtime || this.header.mtime, path: this[Y](this.path), linkpath: this.type === `Link` && this.linkpath !== void 0 ? this[Y](this.linkpath) : this.linkpath, size: this.header.size, uid: this.portable ? void 0 : this.header.uid, uname: this.portable ? void 0 : this.header.uname, dev: this.portable ? void 0 : this.stat.dev, ino: this.portable ? void 0 : this.stat.ino, nlink: this.portable ? void 0 : this.stat.nlink }).encode());
    let e4 = this.header?.block;
    if (!e4) throw Error(`failed to encode header`);
    super.write(e4);
  }
  [Ei]() {
    if (!this.stat) throw Error(`cannot create directory entry without stat`);
    this.path.slice(-1) !== `/` && (this.path += `/`), this.stat.size = 0, this[ki](), this.end();
  }
  [Di]() {
    _.readlink(this.absolute, (e4, t) => {
      if (e4) return this.emit(`error`, e4);
      this[Pi](t);
    });
  }
  [Pi](e4) {
    this.linkpath = V(e4), this[ki](), this.end();
  }
  [Oi](e4) {
    if (!this.stat) throw Error(`cannot create link entry without stat`);
    this.type = `Link`, this.linkpath = V(v.relative(this.cwd, e4)), this.stat.size = 0, this[ki](), this.end();
  }
  [Ti]() {
    if (!this.stat) throw Error(`cannot create file entry without stat`);
    if (this.stat.nlink > 1) {
      let e4 = `${this.stat.dev}:${this.stat.ino}`, t = this.linkCache.get(e4);
      if (t?.indexOf(this.cwd) === 0) return this[Oi](t);
      this.linkCache.set(e4, this.absolute);
    }
    if (this[ki](), this.stat.size === 0) return this.end();
    this[Fi]();
  }
  [Fi]() {
    _.open(this.absolute, `r`, (e4, t) => {
      if (e4) return this.emit(`error`, e4);
      this[Ii](t);
    });
  }
  [Ii](e4) {
    if (this.fd = e4, this.#e) return this[Li]();
    if (!this.stat) throw Error(`should stat before calling onopenfile`);
    this.blockLen = 512 * Math.ceil(this.stat.size / 512), this.blockRemain = this.blockLen;
    let t = Math.min(this.blockLen, this.maxReadSize);
    this.buf = Buffer.allocUnsafe(t), this.offset = 0, this.pos = 0, this.remain = this.stat.size, this.length = this.buf.length, this[Ai]();
  }
  [Ai]() {
    let { fd: e4, buf: t, offset: n, length: r, pos: i } = this;
    if (e4 === void 0 || t === void 0) throw Error(`cannot read file without first opening`);
    _.read(e4, t, n, r, i, (e5, t2) => {
      if (e5) return this[Li](() => this.emit(`error`, e5));
      this[Ni](t2);
    });
  }
  [Li](e4 = () => {
  }) {
    this.fd !== void 0 && _.close(this.fd, e4);
  }
  [Ni](e4) {
    if (e4 <= 0 && this.remain > 0) {
      let e5 = Object.assign(Error(`encountered unexpected EOF`), { path: this.absolute, syscall: `read`, code: `EOF` });
      return this[Li](() => this.emit(`error`, e5));
    }
    if (e4 > this.remain) {
      let e5 = Object.assign(Error(`did not encounter expected EOF`), { path: this.absolute, syscall: `read`, code: `EOF` });
      return this[Li](() => this.emit(`error`, e5));
    }
    if (!this.buf) throw Error(`should have created buffer prior to reading`);
    if (e4 === this.remain) for (let t2 = e4; t2 < this.length && e4 < this.blockRemain; t2++) this.buf[t2 + this.offset] = 0, e4++, this.remain++;
    let t = this.offset === 0 && e4 === this.buf.length ? this.buf : this.buf.subarray(this.offset, this.offset + e4);
    this.write(t) ? this[Bi]() : this[zi](() => this[Bi]());
  }
  [zi](e4) {
    this.once(`drain`, e4);
  }
  write(e4, t, n) {
    if (typeof t == `function` && (n = t, t = void 0), typeof e4 == `string` && (e4 = Buffer.from(e4, typeof t == `string` ? t : `utf8`)), this.blockRemain < e4.length) {
      let e5 = Object.assign(Error(`writing more data than expected`), { path: this.absolute });
      return this.emit(`error`, e5);
    }
    return this.remain -= e4.length, this.blockRemain -= e4.length, this.pos += e4.length, this.offset += e4.length, super.write(e4, null, n);
  }
  [Bi]() {
    if (!this.remain) return this.blockRemain && super.write(Buffer.alloc(this.blockRemain)), this[Li]((e4) => e4 ? this.emit(`error`, e4) : this.end());
    if (!this.buf) throw Error(`buffer lost somehow in ONDRAIN`);
    this.offset >= this.length && (this.buf = Buffer.allocUnsafe(Math.min(this.blockRemain, this.buf.length)), this.offset = 0), this.length = this.buf.length - this.offset, this[Ai]();
  }
};
var Hi = class extends Vi {
  sync = true;
  [ji]() {
    this[Mi](_.lstatSync(this.absolute));
  }
  [Di]() {
    this[Pi](_.readlinkSync(this.absolute));
  }
  [Fi]() {
    this[Ii](_.openSync(this.absolute, `r`));
  }
  [Ai]() {
    let e4 = true;
    try {
      let { fd: t, buf: n, offset: r, length: i, pos: a } = this;
      if (t === void 0 || n === void 0) throw Error(`fd and buf must be set in READ method`);
      let o = _.readSync(t, n, r, i, a);
      this[Ni](o), e4 = false;
    } finally {
      if (e4) try {
        this[Li](() => {
        });
      } catch {
      }
    }
  }
  [zi](e4) {
    e4();
  }
  [Li](e4 = () => {
  }) {
    this.fd !== void 0 && _.closeSync(this.fd), e4();
  }
};
var Ui = class extends Gt {
  blockLen = 0;
  blockRemain = 0;
  buf = 0;
  pos = 0;
  remain = 0;
  length = 0;
  preservePaths;
  portable;
  strict;
  noPax;
  noMtime;
  readEntry;
  type;
  prefix;
  path;
  mode;
  uid;
  gid;
  uname;
  gname;
  header;
  mtime;
  atime;
  ctime;
  linkpath;
  size;
  onWriteEntry;
  warn(e4, t, n = {}) {
    return Or(this, e4, t, n);
  }
  constructor(e4, t = {}) {
    let n = Dn(t);
    super(), this.preservePaths = !!n.preservePaths, this.portable = !!n.portable, this.strict = !!n.strict, this.noPax = !!n.noPax, this.noMtime = !!n.noMtime, this.onWriteEntry = n.onWriteEntry, this.readEntry = e4;
    let { type: r } = e4;
    if (r === `Unsupported`) throw Error(`writing entry that should be ignored`);
    this.type = r, this.type === `Directory` && this.portable && (this.noMtime = true), this.prefix = n.prefix, this.path = V(e4.path), this.mode = e4.mode === void 0 ? void 0 : this[Ri](e4.mode), this.uid = this.portable ? void 0 : e4.uid, this.gid = this.portable ? void 0 : e4.gid, this.uname = this.portable ? void 0 : e4.uname, this.gname = this.portable ? void 0 : e4.gname, this.size = e4.size, this.mtime = this.noMtime ? void 0 : n.mtime || e4.mtime, this.atime = this.portable ? void 0 : e4.atime, this.ctime = this.portable ? void 0 : e4.ctime, this.linkpath = e4.linkpath === void 0 ? void 0 : V(e4.linkpath), typeof n.onwarn == `function` && this.on(`warn`, n.onwarn);
    let i = false;
    if (!this.preservePaths) {
      let [e5, t2] = hi(this.path);
      e5 && typeof t2 == `string` && (this.path = t2, i = e5);
    }
    this.remain = e4.size, this.blockRemain = e4.startBlockSize, this.onWriteEntry?.(this), this.header = new sr({ path: this[Y](this.path), linkpath: this.type === `Link` && this.linkpath !== void 0 ? this[Y](this.linkpath) : this.linkpath, mode: this.mode, uid: this.portable ? void 0 : this.uid, gid: this.portable ? void 0 : this.gid, size: this.size, mtime: this.noMtime ? void 0 : this.mtime, type: this.type, uname: this.portable ? void 0 : this.uname, atime: this.portable ? void 0 : this.atime, ctime: this.portable ? void 0 : this.ctime }), i && this.warn(`TAR_ENTRY_INFO`, `stripping ${i} from absolute path`, { entry: this, path: i + this.path }), this.header.encode() && !this.noPax && super.write(new Cr({ atime: this.portable ? void 0 : this.atime, ctime: this.portable ? void 0 : this.ctime, gid: this.portable ? void 0 : this.gid, mtime: this.noMtime ? void 0 : this.mtime, path: this[Y](this.path), linkpath: this.type === `Link` && this.linkpath !== void 0 ? this[Y](this.linkpath) : this.linkpath, size: this.size, uid: this.portable ? void 0 : this.uid, uname: this.portable ? void 0 : this.uname, dev: this.portable ? void 0 : this.readEntry.dev, ino: this.portable ? void 0 : this.readEntry.ino, nlink: this.portable ? void 0 : this.readEntry.nlink }).encode());
    let a = this.header?.block;
    if (!a) throw Error(`failed to encode header`);
    super.write(a), e4.pipe(this);
  }
  [Y](e4) {
    return Si(e4, this.prefix);
  }
  [Ri](e4) {
    return fi(e4, this.type === `Directory`, this.portable);
  }
  write(e4, t, n) {
    typeof t == `function` && (n = t, t = void 0), typeof e4 == `string` && (e4 = Buffer.from(e4, typeof t == `string` ? t : `utf8`));
    let r = e4.length;
    if (r > this.blockRemain) throw Error(`writing more to entry than is appropriate`);
    return this.blockRemain -= r, super.write(e4, n);
  }
  end(e4, t, n) {
    return this.blockRemain && super.write(Buffer.alloc(this.blockRemain)), typeof e4 == `function` && (n = e4, t = void 0, e4 = void 0), typeof t == `function` && (n = t, t = void 0), typeof e4 == `string` && (e4 = Buffer.from(e4, t ?? `utf8`)), n && this.once(`finish`, n), e4 ? super.end(e4, n) : super.end(n), this;
  }
};
var Wi = (e4) => e4.isFile() ? `File` : e4.isDirectory() ? `Directory` : e4.isSymbolicLink() ? `SymbolicLink` : `Unsupported`;
var Gi = class e2 {
  tail;
  head;
  length = 0;
  static create(t = []) {
    return new e2(t);
  }
  constructor(e4 = []) {
    for (let t of e4) this.push(t);
  }
  *[Symbol.iterator]() {
    for (let e4 = this.head; e4; e4 = e4.next) yield e4.value;
  }
  removeNode(e4) {
    if (e4.list !== this) throw Error(`removing node which does not belong to this list`);
    let t = e4.next, n = e4.prev;
    return t && (t.prev = n), n && (n.next = t), e4 === this.head && (this.head = t), e4 === this.tail && (this.tail = n), this.length--, e4.next = void 0, e4.prev = void 0, e4.list = void 0, t;
  }
  unshiftNode(e4) {
    if (e4 === this.head) return;
    e4.list && e4.list.removeNode(e4);
    let t = this.head;
    e4.list = this, e4.next = t, t && (t.prev = e4), this.head = e4, this.tail ||= e4, this.length++;
  }
  pushNode(e4) {
    if (e4 === this.tail) return;
    e4.list && e4.list.removeNode(e4);
    let t = this.tail;
    e4.list = this, e4.prev = t, t && (t.next = e4), this.tail = e4, this.head ||= e4, this.length++;
  }
  push(...e4) {
    for (let t = 0, n = e4.length; t < n; t++) qi(this, e4[t]);
    return this.length;
  }
  unshift(...e4) {
    for (var t = 0, n = e4.length; t < n; t++) Ji(this, e4[t]);
    return this.length;
  }
  pop() {
    if (!this.tail) return;
    let e4 = this.tail.value, t = this.tail;
    return this.tail = this.tail.prev, this.tail ? this.tail.next = void 0 : this.head = void 0, t.list = void 0, this.length--, e4;
  }
  shift() {
    if (!this.head) return;
    let e4 = this.head.value, t = this.head;
    return this.head = this.head.next, this.head ? this.head.prev = void 0 : this.tail = void 0, t.list = void 0, this.length--, e4;
  }
  forEach(e4, t) {
    t ||= this;
    for (let n = this.head, r = 0; n; r++) e4.call(t, n.value, r, this), n = n.next;
  }
  forEachReverse(e4, t) {
    t ||= this;
    for (let n = this.tail, r = this.length - 1; n; r--) e4.call(t, n.value, r, this), n = n.prev;
  }
  get(e4) {
    let t = 0, n = this.head;
    for (; n && t < e4; t++) n = n.next;
    if (t === e4 && n) return n.value;
  }
  getReverse(e4) {
    let t = 0, n = this.tail;
    for (; n && t < e4; t++) n = n.prev;
    if (t === e4 && n) return n.value;
  }
  map(t, n) {
    n ||= this;
    let r = new e2();
    for (let e4 = this.head; e4; ) r.push(t.call(n, e4.value, this)), e4 = e4.next;
    return r;
  }
  mapReverse(t, n) {
    n ||= this;
    var r = new e2();
    for (let e4 = this.tail; e4; ) r.push(t.call(n, e4.value, this)), e4 = e4.prev;
    return r;
  }
  reduce(e4, t) {
    let n, r = this.head;
    if (arguments.length > 1) n = t;
    else if (this.head) r = this.head.next, n = this.head.value;
    else throw TypeError(`Reduce of empty list with no initial value`);
    for (var i = 0; r; i++) n = e4(n, r.value, i), r = r.next;
    return n;
  }
  reduceReverse(e4, t) {
    let n, r = this.tail;
    if (arguments.length > 1) n = t;
    else if (this.tail) r = this.tail.prev, n = this.tail.value;
    else throw TypeError(`Reduce of empty list with no initial value`);
    for (let t2 = this.length - 1; r; t2--) n = e4(n, r.value, t2), r = r.prev;
    return n;
  }
  toArray() {
    let e4 = Array(this.length);
    for (let t = 0, n = this.head; n; t++) e4[t] = n.value, n = n.next;
    return e4;
  }
  toArrayReverse() {
    let e4 = Array(this.length);
    for (let t = 0, n = this.tail; n; t++) e4[t] = n.value, n = n.prev;
    return e4;
  }
  slice(t = 0, n = this.length) {
    n < 0 && (n += this.length), t < 0 && (t += this.length);
    let r = new e2();
    if (n < t || n < 0) return r;
    t < 0 && (t = 0), n > this.length && (n = this.length);
    let i = this.head, a = 0;
    for (a = 0; i && a < t; a++) i = i.next;
    for (; i && a < n; a++, i = i.next) r.push(i.value);
    return r;
  }
  sliceReverse(t = 0, n = this.length) {
    n < 0 && (n += this.length), t < 0 && (t += this.length);
    let r = new e2();
    if (n < t || n < 0) return r;
    t < 0 && (t = 0), n > this.length && (n = this.length);
    let i = this.length, a = this.tail;
    for (; a && i > n; i--) a = a.prev;
    for (; a && i > t; i--, a = a.prev) r.push(a.value);
    return r;
  }
  splice(e4, t = 0, ...n) {
    e4 > this.length && (e4 = this.length - 1), e4 < 0 && (e4 = this.length + e4);
    let r = this.head;
    for (let t2 = 0; r && t2 < e4; t2++) r = r.next;
    let i = [];
    for (let e5 = 0; r && e5 < t; e5++) i.push(r.value), r = this.removeNode(r);
    r ? r !== this.tail && (r = r.prev) : r = this.tail;
    for (let e5 of n) r = Ki(this, r, e5);
    return i;
  }
  reverse() {
    let e4 = this.head, t = this.tail;
    for (let t2 = e4; t2; t2 = t2.prev) {
      let e5 = t2.prev;
      t2.prev = t2.next, t2.next = e5;
    }
    return this.head = t, this.tail = e4, this;
  }
};
function Ki(e4, t, n) {
  let r = new Yi(n, t, t ? t.next : e4.head, e4);
  return r.next === void 0 && (e4.tail = r), r.prev === void 0 && (e4.head = r), e4.length++, r;
}
function qi(e4, t) {
  e4.tail = new Yi(t, e4.tail, void 0, e4), e4.head ||= e4.tail, e4.length++;
}
function Ji(e4, t) {
  e4.head = new Yi(t, void 0, e4.head, e4), e4.tail ||= e4.head, e4.length++;
}
var Yi = class {
  list;
  next;
  prev;
  value;
  constructor(e4, t, n, r) {
    this.list = r, this.value = e4, t ? (t.next = this, this.prev = t) : this.prev = void 0, n ? (n.prev = this, this.next = n) : this.next = void 0;
  }
};
var Xi = class {
  path;
  absolute;
  entry;
  stat;
  readdir;
  pending = false;
  pendingLink = false;
  ignore = false;
  piped = false;
  constructor(e4, t) {
    this.path = e4 || `./`, this.absolute = t;
  }
};
var Zi = Buffer.alloc(1024);
var Qi = /* @__PURE__ */ Symbol(`onStat`);
var $i = /* @__PURE__ */ Symbol(`ended`);
var X = /* @__PURE__ */ Symbol(`queue`);
var ea = /* @__PURE__ */ Symbol(`pendingLinks`);
var ta = /* @__PURE__ */ Symbol(`current`);
var na = /* @__PURE__ */ Symbol(`process`);
var ra = /* @__PURE__ */ Symbol(`processing`);
var ia = /* @__PURE__ */ Symbol(`processJob`);
var Z = /* @__PURE__ */ Symbol(`jobs`);
var aa = /* @__PURE__ */ Symbol(`jobDone`);
var oa = /* @__PURE__ */ Symbol(`addFSEntry`);
var sa = /* @__PURE__ */ Symbol(`addTarEntry`);
var ca = /* @__PURE__ */ Symbol(`stat`);
var la = /* @__PURE__ */ Symbol(`readdir`);
var ua = /* @__PURE__ */ Symbol(`onreaddir`);
var da = /* @__PURE__ */ Symbol(`pipe`);
var fa = /* @__PURE__ */ Symbol(`entry`);
var pa = /* @__PURE__ */ Symbol(`entryOpt`);
var ma = /* @__PURE__ */ Symbol(`writeEntryClass`);
var ha = /* @__PURE__ */ Symbol(`write`);
var ga = /* @__PURE__ */ Symbol(`ondrain`);
var _a = class extends Gt {
  sync = false;
  opt;
  cwd;
  maxReadSize;
  preservePaths;
  strict;
  noPax;
  prefix;
  linkCache;
  statCache;
  file;
  portable;
  zip;
  readdirCache;
  noDirRecurse;
  follow;
  noMtime;
  mtime;
  filter;
  jobs;
  [ma];
  onWriteEntry;
  [X];
  [ea] = /* @__PURE__ */ new Map();
  [Z] = 0;
  [ra] = false;
  [$i] = false;
  constructor(e4 = {}) {
    if (super(), this.opt = e4, this.file = e4.file || ``, this.cwd = e4.cwd || process.cwd(), this.maxReadSize = e4.maxReadSize, this.preservePaths = !!e4.preservePaths, this.strict = !!e4.strict, this.noPax = !!e4.noPax, this.prefix = V(e4.prefix || ``), this.linkCache = e4.linkCache || /* @__PURE__ */ new Map(), this.statCache = e4.statCache || /* @__PURE__ */ new Map(), this.readdirCache = e4.readdirCache || /* @__PURE__ */ new Map(), this.onWriteEntry = e4.onWriteEntry, this[ma] = Vi, typeof e4.onwarn == `function` && this.on(`warn`, e4.onwarn), this.portable = !!e4.portable, e4.gzip || e4.brotli || e4.zstd) {
      if (+!!e4.gzip + +!!e4.brotli + +!!e4.zstd > 1) throw TypeError(`gzip, brotli, zstd are mutually exclusive`);
      if (e4.gzip && (typeof e4.gzip != `object` && (e4.gzip = {}), this.portable && (e4.gzip.portable = true), this.zip = new zn(e4.gzip)), e4.brotli && (typeof e4.brotli != `object` && (e4.brotli = {}), this.zip = new Hn(e4.brotli)), e4.zstd && (typeof e4.zstd != `object` && (e4.zstd = {}), this.zip = new Gn(e4.zstd)), !this.zip) throw Error(`impossible`);
      let t = this.zip;
      t.on(`data`, (e5) => super.write(e5)), t.on(`end`, () => super.end()), t.on(`drain`, () => this[ga]()), this.on(`resume`, () => t.resume());
    } else this.on(`drain`, this[ga]);
    this.noDirRecurse = !!e4.noDirRecurse, this.follow = !!e4.follow, this.noMtime = !!e4.noMtime, e4.mtime && (this.mtime = e4.mtime), this.filter = typeof e4.filter == `function` ? e4.filter : () => true, this[X] = new Gi(), this[Z] = 0, this.jobs = Number(e4.jobs) || 4, this[ra] = false, this[$i] = false;
  }
  [ha](e4) {
    return super.write(e4);
  }
  add(e4) {
    return this.write(e4), this;
  }
  end(e4, t, n) {
    return typeof e4 == `function` && (n = e4, e4 = void 0), typeof t == `function` && (n = t, t = void 0), e4 && this.add(e4), this[$i] = true, this[na](), n && n(), this;
  }
  write(e4) {
    if (this[$i]) throw Error(`write after end`);
    return typeof e4 == `string` ? this[oa](e4) : this[sa](e4), this.flowing;
  }
  [sa](e4) {
    let t = V(v.resolve(this.cwd, e4.path));
    if (!this.filter(e4.path, e4)) e4.resume();
    else {
      let n = new Xi(e4.path, t);
      n.entry = new Ui(e4, this[pa](n)), n.entry.on(`end`, () => this[aa](n)), this[Z] += 1, this[X].push(n);
    }
    this[na]();
  }
  [oa](e4) {
    let t = V(v.resolve(this.cwd, e4));
    this[X].push(new Xi(e4, t)), this[na]();
  }
  [ca](e4) {
    e4.pending = true, this[Z] += 1, _[this.follow ? `stat` : `lstat`](e4.absolute, (t, n) => {
      e4.pending = false, --this[Z], t ? this.emit(`error`, t) : this[Qi](e4, n);
    });
  }
  [Qi](e4, t) {
    if (this.statCache.set(e4.absolute, t), e4.stat = t, !this.filter(e4.path, t)) e4.ignore = true;
    else if (t.isFile() && t.nlink > 1 && !this.linkCache.get(`${t.dev}:${t.ino}`) && !this.sync) if (e4 === this[ta]) this[ia](e4);
    else {
      let n = `${t.dev}:${t.ino}`, r = this[ea].get(n);
      r ? r.push(e4) : this[ea].set(n, [e4]), e4.pendingLink = true, e4.pending = true;
    }
    this[na]();
  }
  [la](e4) {
    e4.pending = true, this[Z] += 1, _.readdir(e4.absolute, (t, n) => {
      if (e4.pending = false, --this[Z], t) return this.emit(`error`, t);
      this[ua](e4, n);
    });
  }
  [ua](e4, t) {
    this.readdirCache.set(e4.absolute, t), e4.readdir = t, this[na]();
  }
  [na]() {
    if (!this[ra]) {
      this[ra] = true;
      for (let e4 = this[X].head; e4 && this[Z] < this.jobs; e4 = e4.next) if (this[ia](e4.value), e4.value.ignore) {
        let t = e4.next;
        this[X].removeNode(e4), e4.next = t;
      }
      this[ra] = false, this[$i] && this[X].length === 0 && this[Z] === 0 && (this.zip ? this.zip.end(Zi) : (super.write(Zi), super.end()));
    }
  }
  get [ta]() {
    return this[X] && this[X].head && this[X].head.value;
  }
  [aa](e4) {
    this[X].shift(), --this[Z];
    let { stat: t } = e4;
    if (t && t.isFile() && t.nlink > 1) {
      let e5 = `${t.dev}:${t.ino}`, n = this[ea].get(e5);
      if (n) {
        this[ea].delete(e5);
        for (let e6 of n) e6.pending = false, this[ia](e6);
      }
    }
    this[na]();
  }
  [ia](e4) {
    if (e4.pending && e4.pendingLink && e4 === this[ta] && (e4.pending = false, e4.pendingLink = false), !e4.pending) {
      if (e4.entry) {
        e4 === this[ta] && !e4.piped && this[da](e4);
        return;
      }
      if (!e4.stat) {
        let t = this.statCache.get(e4.absolute);
        t ? this[Qi](e4, t) : this[ca](e4);
      }
      if (e4.stat && !e4.ignore) {
        if (!this.noDirRecurse && e4.stat.isDirectory() && !e4.readdir) {
          let t = this.readdirCache.get(e4.absolute);
          if (t ? this[ua](e4, t) : this[la](e4), !e4.readdir) return;
        }
        if (e4.entry = this[fa](e4), !e4.entry) {
          e4.ignore = true;
          return;
        }
        e4 === this[ta] && !e4.piped && this[da](e4);
      }
    }
  }
  [pa](e4) {
    return { onwarn: (e5, t, n) => this.warn(e5, t, n), noPax: this.noPax, cwd: this.cwd, absolute: e4.absolute, preservePaths: this.preservePaths, maxReadSize: this.maxReadSize, strict: this.strict, portable: this.portable, linkCache: this.linkCache, statCache: this.statCache, noMtime: this.noMtime, mtime: this.mtime, prefix: this.prefix, onWriteEntry: this.onWriteEntry };
  }
  [fa](e4) {
    this[Z] += 1;
    try {
      return new this[ma](e4.path, this[pa](e4)).on(`end`, () => this[aa](e4)).on(`error`, (e5) => this.emit(`error`, e5));
    } catch (e5) {
      this.emit(`error`, e5);
    }
  }
  [ga]() {
    this[ta] && this[ta].entry && this[ta].entry.resume();
  }
  [da](e4) {
    e4.piped = true, e4.readdir && e4.readdir.forEach((t2) => {
      let n2 = e4.path, r = n2 === `./` ? `` : n2.replace(/\/*$/, `/`);
      this[oa](r + t2);
    });
    let t = e4.entry, n = this.zip;
    if (!t) throw Error(`cannot pipe without source`);
    n ? t.on(`data`, (e5) => {
      n.write(e5) || t.pause();
    }) : t.on(`data`, (e5) => {
      super.write(e5) || t.pause();
    });
  }
  pause() {
    return this.zip && this.zip.pause(), super.pause();
  }
  warn(e4, t, n = {}) {
    Or(this, e4, t, n);
  }
};
var va = class extends _a {
  sync = true;
  constructor(e4) {
    super(e4), this[ma] = Hi;
  }
  pause() {
  }
  resume() {
  }
  [ca](e4) {
    let t = this.follow ? `statSync` : `lstatSync`;
    this[Qi](e4, _[t](e4.absolute));
  }
  [la](e4) {
    this[ua](e4, _.readdirSync(e4.absolute));
  }
  [da](e4) {
    let t = e4.entry, n = this.zip;
    if (e4.readdir && e4.readdir.forEach((t2) => {
      let n2 = e4.path, r = n2 === `./` ? `` : n2.replace(/\/*$/, `/`);
      this[oa](r + t2);
    }), !t) throw Error(`Cannot pipe without source`);
    n ? t.on(`data`, (e5) => {
      n.write(e5);
    }) : t.on(`data`, (e5) => {
      super[ha](e5);
    });
  }
};
var ya = (e4, t) => {
  let n = new va(e4), r = new yn(e4.file, { mode: e4.mode || 438 });
  n.pipe(r), xa(n, t);
};
var ba = (e4, t) => {
  let n = new _a(e4), r = new vn(e4.file, { mode: e4.mode || 438 });
  n.pipe(r);
  let i = new Promise((e5, t2) => {
    r.on(`error`, t2), r.on(`close`, e5), n.on(`error`, t2);
  });
  return Sa(n, t).catch((e5) => n.emit(`error`, e5)), i;
};
var xa = (e4, t) => {
  t.forEach((t2) => {
    t2.charAt(0) === `@` ? di({ file: y.resolve(e4.cwd, t2.slice(1)), sync: true, noResume: true, onReadEntry: (t3) => e4.add(t3) }) : e4.add(t2);
  }), e4.end();
};
var Sa = async (e4, t) => {
  for (let n of t) n.charAt(0) === `@` ? await di({ file: y.resolve(String(e4.cwd), n.slice(1)), noResume: true, onReadEntry: (t2) => {
    e4.add(t2);
  } }) : e4.add(n);
  e4.end();
};
On(ya, ba, (e4, t) => {
  let n = new va(e4);
  return xa(n, t), n;
}, (e4, t) => {
  let n = new _a(e4);
  return Sa(n, t).catch((e5) => n.emit(`error`, e5)), n;
}, (e4, t) => {
  if (!t?.length) throw TypeError(`no paths specified to add to archive`);
});
var Ca = (process.env.__FAKE_PLATFORM__ || process.platform) === `win32`;
var { O_CREAT: wa, O_NOFOLLOW: Ta, O_TRUNC: Ea, O_WRONLY: Da } = _.constants;
var Oa = Number(process.env.__FAKE_FS_O_FILENAME__) || _.constants.UV_FS_O_FILEMAP || 0;
var ka = Ca && !!Oa;
var Aa = 512 * 1024;
var ja = Oa | Ea | wa | Da;
var Ma = !Ca && typeof Ta == `number` ? Ta | Ea | wa | Da : null;
var Na = Ma === null ? ka ? (e4) => e4 < Aa ? ja : `w` : () => `w` : () => Ma;
var Pa = (e4, t, n) => {
  try {
    return f2.lchownSync(e4, t, n);
  } catch (e5) {
    if (e5?.code !== `ENOENT`) throw e5;
  }
};
var Fa = (e4, t, n, r) => {
  f2.lchown(e4, t, n, (e5) => {
    r(e5 && e5?.code !== `ENOENT` ? e5 : null);
  });
};
var Ia = (e4, t, n, r, i) => {
  t.isDirectory() ? La(y.resolve(e4, t.name), n, r, (a) => {
    if (a) return i(a);
    Fa(y.resolve(e4, t.name), n, r, i);
  }) : Fa(y.resolve(e4, t.name), n, r, i);
};
var La = (e4, t, n, r) => {
  f2.readdir(e4, { withFileTypes: true }, (i, a) => {
    if (i) {
      if (i.code === `ENOENT`) return r();
      if (i.code !== `ENOTDIR` && i.code !== `ENOTSUP`) return r(i);
    }
    if (i || !a.length) return Fa(e4, t, n, r);
    let o = a.length, s = null, c = (i2) => {
      if (!s) {
        if (i2) return r(s = i2);
        if (--o === 0) return Fa(e4, t, n, r);
      }
    };
    for (let r2 of a) Ia(e4, r2, t, n, c);
  });
};
var Ra = (e4, t, n, r) => {
  t.isDirectory() && za(y.resolve(e4, t.name), n, r), Pa(y.resolve(e4, t.name), n, r);
};
var za = (e4, t, n) => {
  let r;
  try {
    r = f2.readdirSync(e4, { withFileTypes: true });
  } catch (r2) {
    let i = r2;
    if (i?.code === `ENOENT`) return;
    if (i?.code === `ENOTDIR` || i?.code === `ENOTSUP`) return Pa(e4, t, n);
    throw i;
  }
  for (let i of r) Ra(e4, i, t, n);
  return Pa(e4, t, n);
};
var Ba = class extends Error {
  path;
  code;
  syscall = `chdir`;
  constructor(e4, t) {
    super(`${t}: Cannot cd into '${e4}'`), this.path = e4, this.code = t;
  }
  get name() {
    return `CwdError`;
  }
};
var Va = class extends Error {
  path;
  symlink;
  syscall = `symlink`;
  code = `TAR_SYMLINK_ERROR`;
  constructor(e4, t) {
    super(`TAR_SYMLINK_ERROR: Cannot extract through symbolic link`), this.symlink = e4, this.path = t;
  }
  get name() {
    return `SymlinkError`;
  }
};
var Ha = (e4, t) => {
  f2.stat(e4, (n, r) => {
    (n || !r.isDirectory()) && (n = new Ba(e4, n?.code || `ENOTDIR`)), t(n);
  });
};
var Ua = (e4, t, n) => {
  e4 = V(e4);
  let r = t.umask ?? 18, i = t.mode | 448, a = (i & r) !== 0, o = t.uid, s = t.gid, c = typeof o == `number` && typeof s == `number` && (o !== t.processUid || s !== t.processGid), l = t.preserve, u = t.unlink, d = V(t.cwd), p2 = (t2, r2) => {
    t2 ? n(t2) : r2 && c ? La(r2, o, s, (e5) => p2(e5)) : a ? f2.chmod(e4, i, n) : n();
  };
  if (e4 === d) return Ha(e4, p2);
  if (l) return oe.mkdir(e4, { mode: i, recursive: true }).then((e5) => p2(null, e5 ?? void 0), p2);
  Wa(d, V(y.relative(d, e4)).split(`/`), i, u, d, void 0, p2);
};
var Wa = (e4, t, n, r, i, a, o) => {
  if (t.length === 0) return o(null, a);
  let s = t.shift(), c = V(y.resolve(e4 + `/` + s));
  f2.mkdir(c, n, Ga(c, t, n, r, i, a, o));
};
var Ga = (e4, t, n, r, i, a, o) => (s) => {
  s ? f2.lstat(e4, (c, l) => {
    if (c) c.path = c.path && V(c.path), o(c);
    else if (l.isDirectory()) Wa(e4, t, n, r, i, a, o);
    else if (r) f2.unlink(e4, (s2) => {
      if (s2) return o(s2);
      f2.mkdir(e4, n, Ga(e4, t, n, r, i, a, o));
    });
    else {
      if (l.isSymbolicLink()) return o(new Va(e4, e4 + `/` + t.join(`/`)));
      o(s);
    }
  }) : (a ||= e4, Wa(e4, t, n, r, i, a, o));
};
var Ka = (e4) => {
  let t = false, n;
  try {
    t = f2.statSync(e4).isDirectory();
  } catch (e5) {
    n = e5?.code;
  } finally {
    if (!t) throw new Ba(e4, n ?? `ENOTDIR`);
  }
};
var qa = (e4, t) => {
  e4 = V(e4);
  let n = t.umask ?? 18, r = t.mode | 448, i = (r & n) !== 0, a = t.uid, o = t.gid, s = typeof a == `number` && typeof o == `number` && (a !== t.processUid || o !== t.processGid), c = t.preserve, l = t.unlink, u = V(t.cwd), d = (t2) => {
    t2 && s && za(t2, a, o), i && f2.chmodSync(e4, r);
  };
  if (e4 === u) return Ka(u), d();
  if (c) return d(f2.mkdirSync(e4, { mode: r, recursive: true }) ?? void 0);
  let p2 = V(y.relative(u, e4)).split(`/`), m3;
  for (let e5 = p2.shift(), t2 = u; e5 && (t2 += `/` + e5); e5 = p2.shift()) {
    t2 = V(y.resolve(t2));
    try {
      f2.mkdirSync(t2, r), m3 ||= t2;
    } catch {
      let e6 = f2.lstatSync(t2);
      if (e6.isDirectory()) continue;
      if (l) {
        f2.unlinkSync(t2), f2.mkdirSync(t2, r), m3 ||= t2;
        continue;
      } else if (e6.isSymbolicLink()) return new Va(t2, t2 + `/` + p2.join(`/`));
    }
  }
  return d(m3);
};
var Ja = /* @__PURE__ */ Object.create(null);
var Ya = 1e4;
var Xa = /* @__PURE__ */ new Set();
var Za = (e4) => {
  Xa.has(e4) ? Xa.delete(e4) : Ja[e4] = e4.normalize(`NFD`).toLocaleLowerCase(`en`).toLocaleUpperCase(`en`), Xa.add(e4);
  let t = Ja[e4], n = Xa.size - Ya;
  if (n > Ya / 10) {
    for (let e5 of Xa) if (Xa.delete(e5), delete Ja[e5], --n <= 0) break;
  }
  return t;
};
var Qa = (process.env.TESTING_TAR_FAKE_PLATFORM || process.platform) === `win32`;
var $a = (e4) => e4.split(`/`).slice(0, -1).reduce((e5, t) => {
  let n = e5.at(-1);
  return n !== void 0 && (t = re(n, t)), e5.push(t || `/`), e5;
}, []);
var eo = class {
  #e = /* @__PURE__ */ new Map();
  #t = /* @__PURE__ */ new Map();
  #n = /* @__PURE__ */ new Set();
  reserve(e4, t) {
    e4 = Qa ? [`win32 parallelization disabled`] : e4.map((e5) => ci(re(Za(e5))));
    let n = new Set(e4.map((e5) => $a(e5)).reduce((e5, t2) => e5.concat(t2)));
    this.#t.set(t, { dirs: n, paths: e4 });
    for (let n2 of e4) {
      let e5 = this.#e.get(n2);
      e5 ? e5.push(t) : this.#e.set(n2, [t]);
    }
    for (let e5 of n) {
      let n2 = this.#e.get(e5);
      if (!n2) this.#e.set(e5, [/* @__PURE__ */ new Set([t])]);
      else {
        let e6 = n2.at(-1);
        e6 instanceof Set ? e6.add(t) : n2.push(/* @__PURE__ */ new Set([t]));
      }
    }
    return this.#i(t);
  }
  #r(e4) {
    let t = this.#t.get(e4);
    if (!t) throw Error(`function does not have any path reservations`);
    return { paths: t.paths.map((e5) => this.#e.get(e5)), dirs: [...t.dirs].map((e5) => this.#e.get(e5)) };
  }
  check(e4) {
    let { paths: t, dirs: n } = this.#r(e4);
    return t.every((t2) => t2 && t2[0] === e4) && n.every((t2) => t2 && t2[0] instanceof Set && t2[0].has(e4));
  }
  #i(e4) {
    return this.#n.has(e4) || !this.check(e4) ? false : (this.#n.add(e4), e4(() => this.#a(e4)), true);
  }
  #a(e4) {
    if (!this.#n.has(e4)) return false;
    let t = this.#t.get(e4);
    if (!t) throw Error(`invalid reservation`);
    let { paths: n, dirs: r } = t, i = /* @__PURE__ */ new Set();
    for (let t2 of n) {
      let n2 = this.#e.get(t2);
      if (!n2 || n2?.[0] !== e4) continue;
      let r2 = n2[1];
      if (!r2) {
        this.#e.delete(t2);
        continue;
      }
      if (n2.shift(), typeof r2 == `function`) i.add(r2);
      else for (let e5 of r2) i.add(e5);
    }
    for (let t2 of r) {
      let n2 = this.#e.get(t2), r2 = n2?.[0];
      if (!(!n2 || !(r2 instanceof Set))) if (r2.size === 1 && n2.length === 1) {
        this.#e.delete(t2);
        continue;
      } else if (r2.size === 1) {
        n2.shift();
        let e5 = n2[0];
        typeof e5 == `function` && i.add(e5);
      } else r2.delete(e4);
    }
    return this.#n.delete(e4), i.forEach((e5) => this.#i(e5)), true;
  }
};
var to = () => process.umask();
var no = /* @__PURE__ */ Symbol(`onEntry`);
var ro = /* @__PURE__ */ Symbol(`checkFs`);
var io = /* @__PURE__ */ Symbol(`checkFs2`);
var ao = /* @__PURE__ */ Symbol(`isReusable`);
var Q = /* @__PURE__ */ Symbol(`makeFs`);
var oo = /* @__PURE__ */ Symbol(`file`);
var so = /* @__PURE__ */ Symbol(`directory`);
var co = /* @__PURE__ */ Symbol(`link`);
var lo = /* @__PURE__ */ Symbol(`symlink`);
var uo = /* @__PURE__ */ Symbol(`hardlink`);
var fo = /* @__PURE__ */ Symbol(`ensureNoSymlink`);
var po = /* @__PURE__ */ Symbol(`unsupported`);
var mo = /* @__PURE__ */ Symbol(`checkPath`);
var ho = /* @__PURE__ */ Symbol(`stripAbsolutePath`);
var go = /* @__PURE__ */ Symbol(`mkdir`);
var $ = /* @__PURE__ */ Symbol(`onError`);
var _o = /* @__PURE__ */ Symbol(`pending`);
var vo = /* @__PURE__ */ Symbol(`pend`);
var yo = /* @__PURE__ */ Symbol(`unpend`);
var bo = /* @__PURE__ */ Symbol(`ended`);
var xo = /* @__PURE__ */ Symbol(`maybeClose`);
var So = /* @__PURE__ */ Symbol(`skip`);
var Co = /* @__PURE__ */ Symbol(`doChown`);
var wo = /* @__PURE__ */ Symbol(`uid`);
var To = /* @__PURE__ */ Symbol(`gid`);
var Eo = /* @__PURE__ */ Symbol(`checkedCwd`);
var Do = (process.env.TESTING_TAR_FAKE_PLATFORM || process.platform) === `win32`;
var Oo = 1024;
var ko = (e4, t) => {
  if (!Do) return f2.unlink(e4, t);
  let n = e4 + `.DELETE.` + xe(16).toString(`hex`);
  f2.rename(e4, n, (e5) => {
    if (e5) return t(e5);
    f2.unlink(n, t);
  });
};
var Ao = (e4) => {
  if (!Do) return f2.unlinkSync(e4);
  let t = e4 + `.DELETE.` + xe(16).toString(`hex`);
  f2.renameSync(e4, t), f2.unlinkSync(t);
};
var jo = (e4, t, n) => e4 !== void 0 && e4 === e4 >>> 0 ? e4 : t !== void 0 && t === t >>> 0 ? t : n;
var Mo = class extends si {
  [bo] = false;
  [Eo] = false;
  [_o] = 0;
  reservations = new eo();
  transform;
  writable = true;
  readable = false;
  uid;
  gid;
  setOwner;
  preserveOwner;
  processGid;
  processUid;
  maxDepth;
  forceChown;
  win32;
  newer;
  keep;
  noMtime;
  preservePaths;
  unlink;
  cwd;
  strip;
  processUmask;
  umask;
  dmode;
  fmode;
  chmod;
  constructor(e4 = {}) {
    if (e4.ondone = () => {
      this[bo] = true, this[xo]();
    }, super(e4), this.transform = e4.transform, this.chmod = !!e4.chmod, typeof e4.uid == `number` || typeof e4.gid == `number`) {
      if (typeof e4.uid != `number` || typeof e4.gid != `number`) throw TypeError(`cannot set owner without number uid and gid`);
      if (e4.preserveOwner) throw TypeError(`cannot preserve owner in archive and also set owner explicitly`);
      this.uid = e4.uid, this.gid = e4.gid, this.setOwner = true;
    } else this.uid = void 0, this.gid = void 0, this.setOwner = false;
    this.preserveOwner = e4.preserveOwner === void 0 && typeof e4.uid != `number` ? process.getuid?.() === 0 : !!e4.preserveOwner, this.processUid = (this.preserveOwner || this.setOwner) && process.getuid ? process.getuid() : void 0, this.processGid = (this.preserveOwner || this.setOwner) && process.getgid ? process.getgid() : void 0, this.maxDepth = typeof e4.maxDepth == `number` ? e4.maxDepth : Oo, this.forceChown = e4.forceChown === true, this.win32 = !!e4.win32 || Do, this.newer = !!e4.newer, this.keep = !!e4.keep, this.noMtime = !!e4.noMtime, this.preservePaths = !!e4.preservePaths, this.unlink = !!e4.unlink, this.cwd = V(y.resolve(e4.cwd || process.cwd())), this.strip = Number(e4.strip) || 0, this.processUmask = this.chmod ? typeof e4.processUmask == `number` ? e4.processUmask : to() : 0, this.umask = typeof e4.umask == `number` ? e4.umask : this.processUmask, this.dmode = e4.dmode || 511 & ~this.umask, this.fmode = e4.fmode || 438 & ~this.umask, this.on(`entry`, (e5) => this[no](e5));
  }
  warn(e4, t, n = {}) {
    return (e4 === `TAR_BAD_ARCHIVE` || e4 === `TAR_ABORT`) && (n.recoverable = false), super.warn(e4, t, n);
  }
  [xo]() {
    this[bo] && this[_o] === 0 && (this.emit(`prefinish`), this.emit(`finish`), this.emit(`end`));
  }
  [ho](e4, t) {
    let n = e4[t], { type: r } = e4;
    if (!n || this.preservePaths) return true;
    let [i, a] = hi(n), o = a.replaceAll(/\\/g, `/`).split(`/`);
    if (o.includes(`..`) || Do && /^[a-z]:\.\.$/i.test(o[0] ?? ``)) {
      if (t === `path` || r === `Link`) return this.warn(`TAR_ENTRY_ERROR`, `${t} contains '..'`, { entry: e4, [t]: n }), false;
      let i2 = y.posix.dirname(e4.path), a2 = y.posix.normalize(y.posix.join(i2, o.join(`/`)));
      if (a2.startsWith(`../`) || a2 === `..`) return this.warn(`TAR_ENTRY_ERROR`, `${t} escapes extraction directory`, { entry: e4, [t]: n }), false;
    }
    return i && (e4[t] = String(a), this.warn(`TAR_ENTRY_INFO`, `stripping ${i} from absolute ${t}`, { entry: e4, [t]: n })), true;
  }
  [mo](e4) {
    let t = V(e4.path), n = t.split(`/`);
    if (this.strip) {
      if (n.length < this.strip) return false;
      if (e4.type === `Link`) {
        let t2 = V(String(e4.linkpath)).split(`/`);
        if (t2.length >= this.strip) e4.linkpath = t2.slice(this.strip).join(`/`);
        else return false;
      }
      n.splice(0, this.strip), e4.path = n.join(`/`);
    }
    if (isFinite(this.maxDepth) && n.length > this.maxDepth) return this.warn(`TAR_ENTRY_ERROR`, `path excessively deep`, { entry: e4, path: t, depth: n.length, maxDepth: this.maxDepth }), false;
    if (!this[ho](e4, `path`) || !this[ho](e4, `linkpath`)) return false;
    if (e4.absolute = y.isAbsolute(e4.path) ? V(y.resolve(e4.path)) : V(y.resolve(this.cwd, e4.path)), !this.preservePaths && typeof e4.absolute == `string` && e4.absolute.indexOf(this.cwd + `/`) !== 0 && e4.absolute !== this.cwd) return this.warn(`TAR_ENTRY_ERROR`, `path escaped extraction target`, { entry: e4, path: V(e4.path), resolvedPath: e4.absolute, cwd: this.cwd }), false;
    if (e4.absolute === this.cwd && e4.type !== `Directory` && e4.type !== `GNUDumpDir`) return false;
    if (this.win32) {
      let { root: t2 } = y.win32.parse(String(e4.absolute));
      e4.absolute = t2 + bi(String(e4.absolute).slice(t2.length));
      let { root: n2 } = y.win32.parse(e4.path);
      e4.path = n2 + bi(e4.path.slice(n2.length));
    }
    return true;
  }
  [no](e4) {
    if (!this[mo](e4)) return e4.resume();
    switch (be.equal(typeof e4.absolute, `string`), e4.type) {
      case `Directory`:
      case `GNUDumpDir`:
        e4.mode && (e4.mode |= 448);
      case `File`:
      case `OldFile`:
      case `ContiguousFile`:
      case `Link`:
      case `SymbolicLink`:
        return this[ro](e4);
      default:
        return this[po](e4);
    }
  }
  [$](e4, t) {
    e4.name === `CwdError` ? this.emit(`error`, e4) : (this.warn(`TAR_ENTRY_ERROR`, e4, { entry: t }), this[yo](), t.resume());
  }
  [go](e4, t, n) {
    Ua(V(e4), { uid: this.uid, gid: this.gid, processUid: this.processUid, processGid: this.processGid, umask: this.processUmask, preserve: this.preservePaths, unlink: this.unlink, cwd: this.cwd, mode: t }, n);
  }
  [Co](e4) {
    return this.forceChown || this.preserveOwner && (typeof e4.uid == `number` && e4.uid !== this.processUid || typeof e4.gid == `number` && e4.gid !== this.processGid) || typeof this.uid == `number` && this.uid !== this.processUid || typeof this.gid == `number` && this.gid !== this.processGid;
  }
  [wo](e4) {
    return jo(this.uid, e4.uid, this.processUid);
  }
  [To](e4) {
    return jo(this.gid, e4.gid, this.processGid);
  }
  [oo](e4, t) {
    let n = typeof e4.mode == `number` ? e4.mode & 4095 : this.fmode, r = new vn(String(e4.absolute), { flags: Na(e4.size), mode: n, autoClose: false });
    r.on(`error`, (n2) => {
      r.fd && f2.close(r.fd, () => {
      }), r.write = () => true, this[$](n2, e4), t();
    });
    let i = 1, a = (n2) => {
      if (n2) {
        r.fd && f2.close(r.fd, () => {
        }), this[$](n2, e4), t();
        return;
      }
      --i === 0 && r.fd !== void 0 && f2.close(r.fd, (n3) => {
        n3 ? this[$](n3, e4) : this[yo](), t();
      });
    };
    r.on(`finish`, () => {
      let t2 = String(e4.absolute), n2 = r.fd;
      if (typeof n2 == `number` && e4.mtime && !this.noMtime) {
        i++;
        let r2 = e4.atime || /* @__PURE__ */ new Date(), o2 = e4.mtime;
        f2.futimes(n2, r2, o2, (e5) => e5 ? f2.utimes(t2, r2, o2, (t3) => a(t3 && e5)) : a());
      }
      if (typeof n2 == `number` && this[Co](e4)) {
        i++;
        let r2 = this[wo](e4), o2 = this[To](e4);
        typeof r2 == `number` && typeof o2 == `number` && f2.fchown(n2, r2, o2, (e5) => e5 ? f2.chown(t2, r2, o2, (t3) => a(t3 && e5)) : a());
      }
      a();
    });
    let o = this.transform && this.transform(e4) || e4;
    o !== e4 && (o.on(`error`, (n2) => {
      this[$](n2, e4), t();
    }), e4.pipe(o)), o.pipe(r);
  }
  [so](e4, t) {
    let n = typeof e4.mode == `number` ? e4.mode & 4095 : this.dmode;
    this[go](String(e4.absolute), n, (n2) => {
      if (n2) {
        this[$](n2, e4), t();
        return;
      }
      let r = 1, i = () => {
        --r === 0 && (t(), this[yo](), e4.resume());
      };
      e4.mtime && !this.noMtime && (r++, f2.utimes(String(e4.absolute), e4.atime || /* @__PURE__ */ new Date(), e4.mtime, i)), this[Co](e4) && (r++, f2.chown(String(e4.absolute), Number(this[wo](e4)), Number(this[To](e4)), i)), i();
    });
  }
  [po](e4) {
    e4.unsupported = true, this.warn(`TAR_ENTRY_UNSUPPORTED`, `unsupported entry type: ${e4.type}`, { entry: e4 }), e4.resume();
  }
  [lo](e4, t) {
    let n = V(y.relative(this.cwd, y.resolve(y.dirname(String(e4.absolute)), String(e4.linkpath)))).split(`/`);
    this[fo](e4, this.cwd, n, () => this[co](e4, String(e4.linkpath), `symlink`, t), (n2) => {
      this[$](n2, e4), t();
    });
  }
  [uo](e4, t) {
    let n = V(y.resolve(this.cwd, String(e4.linkpath))), r = V(String(e4.linkpath)).split(`/`);
    this[fo](e4, this.cwd, r, () => this[co](e4, n, `link`, t), (n2) => {
      this[$](n2, e4), t();
    });
  }
  [fo](e4, t, n, r, i) {
    let a = n.shift();
    if (this.preservePaths || a === void 0) return r();
    let o = y.resolve(t, a);
    f2.lstat(o, (t2, a2) => {
      if (t2) return r();
      if (a2?.isSymbolicLink()) return i(new Va(o, y.resolve(o, n.join(`/`))));
      this[fo](e4, o, n, r, i);
    });
  }
  [vo]() {
    this[_o]++;
  }
  [yo]() {
    this[_o]--, this[xo]();
  }
  [So](e4) {
    this[yo](), e4.resume();
  }
  [ao](e4, t) {
    return e4.type === `File` && !this.unlink && t.isFile() && t.nlink <= 1 && !Do;
  }
  [ro](e4) {
    this[vo]();
    let t = [e4.path];
    e4.linkpath && t.push(e4.linkpath), this.reservations.reserve(t, (t2) => this[io](e4, t2));
  }
  [io](e4, t) {
    let n = (e5) => {
      t(e5);
    }, r = () => {
      this[go](this.cwd, this.dmode, (t2) => {
        if (t2) {
          this[$](t2, e4), n();
          return;
        }
        this[Eo] = true, i();
      });
    }, i = () => {
      if (e4.absolute !== this.cwd) {
        let t2 = V(y.dirname(String(e4.absolute)));
        if (t2 !== this.cwd) return this[go](t2, this.dmode, (t3) => {
          if (t3) {
            this[$](t3, e4), n();
            return;
          }
          a();
        });
      }
      a();
    }, a = () => {
      f2.lstat(String(e4.absolute), (t2, r2) => {
        if (r2 && (this.keep || this.newer && r2.mtime > (e4.mtime ?? r2.mtime))) {
          this[So](e4), n();
          return;
        }
        if (t2 || this[ao](e4, r2)) return this[Q](null, e4, n);
        if (r2.isDirectory()) {
          if (e4.type === `Directory`) {
            let t3 = this.chmod && e4.mode && (r2.mode & 4095) !== e4.mode, i2 = (t4) => this[Q](t4 ?? null, e4, n);
            return t3 ? f2.chmod(String(e4.absolute), Number(e4.mode), i2) : i2();
          }
          if (e4.absolute !== this.cwd) return f2.rmdir(String(e4.absolute), (t3) => this[Q](t3 ?? null, e4, n));
        }
        if (e4.absolute === this.cwd) return this[Q](null, e4, n);
        ko(String(e4.absolute), (t3) => this[Q](t3 ?? null, e4, n));
      });
    };
    this[Eo] ? i() : r();
  }
  [Q](e4, t, n) {
    if (e4) {
      this[$](e4, t), n();
      return;
    }
    switch (t.type) {
      case `File`:
      case `OldFile`:
      case `ContiguousFile`:
        return this[oo](t, n);
      case `Link`:
        return this[uo](t, n);
      case `SymbolicLink`:
        return this[lo](t, n);
      case `Directory`:
      case `GNUDumpDir`:
        return this[so](t, n);
    }
  }
  [co](e4, t, n, r) {
    f2[n](t, String(e4.absolute), (t2) => {
      t2 ? this[$](t2, e4) : (this[yo](), e4.resume()), r();
    });
  }
};
var No = (e4) => {
  try {
    return [null, e4()];
  } catch (e5) {
    return [e5, null];
  }
};
var Po = class extends Mo {
  sync = true;
  [Q](e4, t) {
    return super[Q](e4, t, () => {
    });
  }
  [ro](e4) {
    if (!this[Eo]) {
      let t2 = this[go](this.cwd, this.dmode);
      if (t2) return this[$](t2, e4);
      this[Eo] = true;
    }
    if (e4.absolute !== this.cwd) {
      let t2 = V(y.dirname(String(e4.absolute)));
      if (t2 !== this.cwd) {
        let n2 = this[go](t2, this.dmode);
        if (n2) return this[$](n2, e4);
      }
    }
    let [t, n] = No(() => f2.lstatSync(String(e4.absolute)));
    if (n && (this.keep || this.newer && n.mtime > (e4.mtime ?? n.mtime))) return this[So](e4);
    if (t || this[ao](e4, n)) return this[Q](null, e4);
    if (n.isDirectory()) {
      if (e4.type === `Directory`) {
        let [t3] = this.chmod && e4.mode && (n.mode & 4095) !== e4.mode ? No(() => {
          f2.chmodSync(String(e4.absolute), Number(e4.mode));
        }) : [];
        return this[Q](t3, e4);
      }
      let [t2] = No(() => f2.rmdirSync(String(e4.absolute)));
      this[Q](t2, e4);
    }
    let [r] = e4.absolute === this.cwd ? [] : No(() => Ao(String(e4.absolute)));
    this[Q](r, e4);
  }
  [oo](e4, t) {
    let n = typeof e4.mode == `number` ? e4.mode & 4095 : this.fmode, r = (n2) => {
      let r2;
      try {
        f2.closeSync(i);
      } catch (e5) {
        r2 = e5;
      }
      (n2 || r2) && this[$](n2 || r2, e4), t();
    }, i;
    try {
      i = f2.openSync(String(e4.absolute), Na(e4.size), n);
    } catch (e5) {
      return r(e5);
    }
    let a = this.transform && this.transform(e4) || e4;
    a !== e4 && (a.on(`error`, (t2) => this[$](t2, e4)), e4.pipe(a)), a.on(`data`, (e5) => {
      try {
        f2.writeSync(i, e5, 0, e5.length);
      } catch (e6) {
        r(e6);
      }
    }), a.on(`end`, () => {
      let t2 = null;
      if (e4.mtime && !this.noMtime) {
        let n2 = e4.atime || /* @__PURE__ */ new Date(), r2 = e4.mtime;
        try {
          f2.futimesSync(i, n2, r2);
        } catch (i2) {
          try {
            f2.utimesSync(String(e4.absolute), n2, r2);
          } catch {
            t2 = i2;
          }
        }
      }
      if (this[Co](e4)) {
        let n2 = this[wo](e4), r2 = this[To](e4);
        try {
          f2.fchownSync(i, Number(n2), Number(r2));
        } catch (i2) {
          try {
            f2.chownSync(String(e4.absolute), Number(n2), Number(r2));
          } catch {
            t2 ||= i2;
          }
        }
      }
      r(t2);
    });
  }
  [so](e4, t) {
    let n = typeof e4.mode == `number` ? e4.mode & 4095 : this.dmode, r = this[go](String(e4.absolute), n);
    if (r) {
      this[$](r, e4), t();
      return;
    }
    if (e4.mtime && !this.noMtime) try {
      f2.utimesSync(String(e4.absolute), e4.atime || /* @__PURE__ */ new Date(), e4.mtime);
    } catch {
    }
    if (this[Co](e4)) try {
      f2.chownSync(String(e4.absolute), Number(this[wo](e4)), Number(this[To](e4)));
    } catch {
    }
    t(), e4.resume();
  }
  [go](e4, t) {
    try {
      return qa(V(e4), { uid: this.uid, gid: this.gid, processUid: this.processUid, processGid: this.processGid, umask: this.processUmask, preserve: this.preservePaths, unlink: this.unlink, cwd: this.cwd, mode: t });
    } catch (e5) {
      return e5;
    }
  }
  [fo](e4, t, n, r, i) {
    if (this.preservePaths || n.length === 0) return r();
    let a = t;
    for (let e5 of n) {
      a = y.resolve(a, e5);
      let [o, s] = No(() => f2.lstatSync(a));
      if (o) return r();
      if (s.isSymbolicLink()) return i(new Va(a, y.resolve(t, n.join(`/`))));
    }
    r();
  }
  [co](e4, t, n, r) {
    let i = `${n}Sync`;
    try {
      f2[i](t, String(e4.absolute)), r(), e4.resume();
    } catch (t2) {
      return this[$](t2, e4);
    }
  }
};
var Fo = On((e4) => {
  let t = new Po(e4), n = e4.file, r = f2.statSync(n);
  new _n(n, { readSize: e4.maxReadSize || 16 * 1024 * 1024, size: r.size }).pipe(t);
}, (e4, t) => {
  let n = new Mo(e4), r = e4.maxReadSize || 16 * 1024 * 1024, i = e4.file;
  return new Promise((e5, t2) => {
    n.on(`error`, t2), n.on(`close`, e5), f2.stat(i, (e6, a) => {
      if (e6) t2(e6);
      else {
        let e7 = new gn(i, { readSize: r, size: a.size });
        e7.on(`error`, t2), e7.pipe(n);
      }
    });
  });
}, (e4) => new Po(e4), (e4) => new Mo(e4), (e4, t) => {
  t?.length && ui(e4, t);
});
var Io = (e4, t) => {
  let n = new va(e4), r = true, i, a;
  try {
    try {
      i = f2.openSync(e4.file, `r+`);
    } catch (t2) {
      if (t2?.code === `ENOENT`) i = f2.openSync(e4.file, `w+`);
      else throw t2;
    }
    let o = f2.fstatSync(i), s = Buffer.alloc(512);
    t: for (a = 0; a < o.size; a += 512) {
      for (let e5 = 0, t3 = 0; e5 < 512; e5 += t3) {
        if (t3 = f2.readSync(i, s, e5, s.length - e5, a + e5), a === 0 && s[0] === 31 && s[1] === 139) throw Error(`cannot append to compressed archives`);
        if (!t3) break t;
      }
      let t2 = new sr(s);
      if (!t2.cksumValid) break;
      let n2 = 512 * Math.ceil((t2.size || 0) / 512);
      if (a + n2 + 512 > o.size) break;
      a += n2, e4.mtimeCache && t2.mtime && e4.mtimeCache.set(String(t2.path), t2.mtime);
    }
    r = false, Lo(e4, n, a, i, t);
  } finally {
    if (r) try {
      f2.closeSync(i);
    } catch {
    }
  }
};
var Lo = (e4, t, n, r, i) => {
  let a = new yn(e4.file, { fd: r, start: n });
  t.pipe(a), zo(t, i);
};
var Ro = (e4, t) => {
  t = Array.from(t);
  let n = new _a(e4), r = (t2, n2, r2) => {
    let i = (e5, n3) => {
      e5 ? f2.close(t2, (t3) => r2(e5)) : r2(null, n3);
    }, a = 0;
    if (n2 === 0) return i(null, 0);
    let o = 0, s = Buffer.alloc(512), c = (r3, l) => {
      if (r3 || l === void 0) return i(r3);
      if (o += l, o < 512 && l) return f2.read(t2, s, o, s.length - o, a + o, c);
      if (a === 0 && s[0] === 31 && s[1] === 139) return i(Error(`cannot append to compressed archives`));
      if (o < 512) return i(null, a);
      let u = new sr(s);
      if (!u.cksumValid) return i(null, a);
      let d = 512 * Math.ceil((u.size ?? 0) / 512);
      if (a + d + 512 > n2 || (a += d + 512, a >= n2)) return i(null, a);
      e4.mtimeCache && u.mtime && e4.mtimeCache.set(String(u.path), u.mtime), o = 0, f2.read(t2, s, 0, 512, a, c);
    };
    f2.read(t2, s, 0, 512, a, c);
  };
  return new Promise((i, a) => {
    n.on(`error`, a);
    let o = `r+`, s = (c, l) => {
      if (c && c.code === `ENOENT` && o === `r+`) return o = `w+`, f2.open(e4.file, o, s);
      if (c || !l) return a(c);
      f2.fstat(l, (o2, s2) => {
        if (o2) return f2.close(l, () => a(o2));
        r(l, s2.size, (r2, o3) => {
          if (r2) return a(r2);
          let s3 = new vn(e4.file, { fd: l, start: o3 });
          n.pipe(s3), s3.on(`error`, a), s3.on(`close`, i), Bo(n, t);
        });
      });
    };
    f2.open(e4.file, o, s);
  });
};
var zo = (e4, t) => {
  t.forEach((t2) => {
    t2.charAt(0) === `@` ? di({ file: y.resolve(e4.cwd, t2.slice(1)), sync: true, noResume: true, onReadEntry: (t3) => e4.add(t3) }) : e4.add(t2);
  }), e4.end();
};
var Bo = async (e4, t) => {
  for (let n of t) n.charAt(0) === `@` ? await di({ file: y.resolve(String(e4.cwd), n.slice(1)), noResume: true, onReadEntry: (t2) => e4.add(t2) }) : e4.add(n);
  e4.end();
};
var Vo = On(Io, Ro, () => {
  throw TypeError(`file is required`);
}, () => {
  throw TypeError(`file is required`);
}, (e4, t) => {
  if (!Tn(e4)) throw TypeError(`file is required`);
  if (e4.gzip || e4.brotli || e4.zstd || e4.file.endsWith(`.br`) || e4.file.endsWith(`.tbr`)) throw TypeError(`cannot append to compressed archives`);
  if (!t?.length) throw TypeError(`no paths specified to add/replace`);
});
On(Vo.syncFile, Vo.asyncFile, Vo.syncNoFile, Vo.asyncNoFile, (e4, t = []) => {
  Vo.validate?.(e4, t), Ho(e4);
});
var Ho = (e4) => {
  let t = e4.filter;
  e4.mtimeCache ||= /* @__PURE__ */ new Map(), e4.filter = t ? (n, r) => t(n, r) && !((e4.mtimeCache?.get(n) ?? r.mtime ?? 0) > (r.mtime ?? 0)) : (t2, n) => !((e4.mtimeCache?.get(t2) ?? n.mtime ?? 0) > (n.mtime ?? 0));
};
function Uo(e4) {
  return j(y.join(e4, `map.json`)) || {};
}
async function Wo(e4, n, r, i) {
  let a = new Map(Object.entries(i)), o = j(y.join(e4, `access.json`)) || {};
  o[n.ref] = (/* @__PURE__ */ new Date()).toISOString(), await me(y.join(e4, `access.json`), JSON.stringify(o, null, `  `));
  let s = a.get(n.ref);
  if (s !== r) {
    if (a.set(n.ref, r), s && ![...a.values()].includes(s)) try {
      await pe(y.join(e4, `${s}.tar.gz`), { force: true, recursive: true });
    } catch {
    }
    await me(y.join(e4, `map.json`), JSON.stringify(Object.fromEntries(a), null, `  `));
  }
}
async function Go(e4, t, n) {
  let r = e4.cache ? e4.getHashFromCache(e4.repo, t) : await e4.getHash(e4.repo, t);
  if (r) return r;
  if (e4.repo.transport === `ssh`) {
    e4.warn({ message: `tar lookup failed; falling back to git clone` }), await e4.cloneWithGit(n);
    return;
  }
  throw new k(`could not find commit hash for ${e4.repo.ref}`, { code: `MISSING_REF`, ref: e4.repo.ref });
}
async function Ko(e4, t, n) {
  return { file: y.join(e4, `${n}.tar.gz`), subdir: null, url: Me[t.site](t, n), workDir: await ue(y.join(e4, `extract-`)) };
}
async function qo(e4, t) {
  let n = e4.repo.subdir?.split(`/`).filter(Boolean).join(`/`);
  if (!n) return;
  let r = [];
  try {
    await Xo(e4, t, async () => {
      r.length = 0;
      let e5;
      if (await di({ file: t.file, onReadEntry: (e6) => {
        r.push(e6.path);
      }, onwarn: (t2, n2) => {
        t2 === `TAR_BAD_ARCHIVE` && (e5 = Error(n2), e5.code = t2);
      } }), e5) throw e5;
    });
  } catch (e5) {
    throw new k(`could not inspect ${t.url}`, { code: `COULD_NOT_DOWNLOAD`, url: t.url, original: e5 });
  }
  let i = [...new Set(r.map((e5) => e5.split(`/`)[0]))];
  for (let e5 of i) {
    let i2 = `${e5}/${n}`, a = `${i2}/`;
    if (r.some((e6) => {
      let t2 = e6.replace(/\/$/u, ``);
      return t2 === i2 || t2.startsWith(a);
    })) {
      t.subdir = i2;
      return;
    }
  }
  throw new k(`could not find subdirectory /${n} in archive`, { code: `MISSING_SUBDIR`, subdir: `/${n}` });
}
async function Jo(t, n) {
  if (!t.cache) {
    try {
      await se(n.file, ce.F_OK), t.verboseInfo({ code: `FILE_EXISTS`, message: `${n.file} already exists locally` });
      return;
    } catch {
    }
    M(y.dirname(n.file)), t.proxy && t.verboseInfo({ code: `PROXY`, message: `using proxy ${t.proxy}` }), t.verboseInfo({ code: `DOWNLOADING`, message: `downloading ${n.url} to ${n.file}` });
    try {
      await t.fetch(n.url, n.file, t.proxy);
    } catch (e4) {
      throw new k(`could not download ${n.url}`, { code: `COULD_NOT_DOWNLOAD`, url: n.url, original: e4 });
    }
  }
}
async function Yo(t, n, r) {
  try {
    t.verboseInfo({ code: `EXTRACTING`, message: `extracting ${n.subdir ? `${t.repo.subdir} from ` : ``}${n.file} to ${n.workDir}` });
    let [i, a] = n.subdir ? [n.subdir.split(`/`).length, [n.subdir]] : [1, []];
    await Xo(t, n, () => Fo({ C: n.workDir, file: n.file, strip: i }, a));
    let o = await Qo(n.workDir);
    return o || (M(r), await $o(n.workDir, r)), o;
  } catch (e4) {
    throw new k(`could not download ${n.url}`, { code: `COULD_NOT_DOWNLOAD`, url: n.url, original: e4 });
  } finally {
    await pe(n.workDir, { force: true, recursive: true });
  }
}
async function Xo(e4, t, n) {
  try {
    await n();
  } catch (r) {
    let i = r.code;
    if (!(typeof i == `string` && /^(TAR_BAD_ARCHIVE|TAR_ABORT|ZLIB_ERROR|Z_(BUF|DATA|STREAM|MEM|VERSION)_ERROR)$/u.test(i)) || e4.cache) throw r;
    try {
      await pe(t.file, { force: true, recursive: true });
    } catch {
    }
    await e4.fetch(t.url, t.file, e4.proxy), await n();
  }
}
async function Zo(t, n, r) {
  let i = Uo(n), a = await Go(t, i, r);
  if (!a) return;
  M(n);
  let o = await Ko(n, t.repo, a);
  await Jo(t, o), t.repo.subdir && await qo(t, o), await Yo(t, o, r) && (t.warn({ message: `git lfs pointer detected in tar snapshot; falling back to git clone` }), await t.cloneWithGit(r)), await Wo(n, t.repo, a, i);
}
async function Qo(e4) {
  let t = (await fe(e4, { withFileTypes: true })).map(async (t2) => {
    let n = y.join(e4, t2.name);
    if (t2.isDirectory()) return Qo(n);
    if (!t2.isFile()) return false;
    let r = await de(n, `utf8`);
    return /^version https:\/\/git-lfs\.github\.com\/spec\/v1$/mu.test(r) && /^oid sha256:[0-9a-f]{64}$/mu.test(r) && /^size \d+$/mu.test(r);
  });
  return (await Promise.all(t)).some(Boolean);
}
async function $o(e4, t) {
  let n = await fe(e4, { withFileTypes: true });
  await Promise.all(n.map(async (n2) => {
    await le(y.join(e4, n2.name), y.join(t, n2.name), { recursive: true });
  }));
}
var es = /* @__PURE__ */ new Set([`tar`, `git`]);
function ts(e4, t, n, r) {
  let i = r === `.` ? `` : ` to ${r}`;
  return `cloned ${S(`${e4}/${t}`)}#${S(n)}${i}`;
}
var ns = class e3 extends ae {
  aliases;
  cache;
  files;
  force;
  mode;
  verbose;
  proxy;
  repo;
  fetch;
  git;
  gitClientPromise;
  hasStashed;
  src;
  constructor(e4, t = {}) {
    if (super(), this.aliases = t.aliases ?? {}, this.cache = t.cache, this.files = t.files, this.force = t.force, this.verbose = t.verbose, this.proxy = process.env.https_proxy, this.src = He(this.aliases, e4) ?? e4, this.repo = Le(this.src), this.mode = t.mode ?? this.repo.mode, this.repo = { ...this.repo, mode: this.mode }, this.fetch = t.fetch || N, this.git = t.git, this.hasStashed = false, t.mode && !es.has(t.mode)) throw Error(`Valid modes are ${[...es].join(`, `)}`);
  }
  getGitClient() {
    return this.git ? Promise.resolve(this.git) : (this.gitClientPromise ||= import("./client-D0hMiRUX-JSQOS74Y.js").then(({ defaultGitClient: e4 }) => (this.git = e4, e4)), this.gitClientPromise);
  }
  getDirectives(e4) {
    return nt(e4);
  }
  async clone(e4) {
    rt(e4, this.force, this.info.bind(this), this.verboseInfo.bind(this)), await this.cloneToDestination(e4), ct(e4, this.files, this.warn.bind(this)), this.info({ code: `SUCCESS`, dest: e4, message: ts(this.repo.user, this.repo.name, this.repo.ref, e4), repo: this.repo }), await this.runDirectives(e4);
  }
  remove(e4, t) {
    at(e4, t, this.info.bind(this), this.warn.bind(this));
  }
  info(e4) {
    this.emit(`info`, e4);
  }
  warn(e4) {
    this.emit(`warn`, e4);
  }
  verboseInfo(e4) {
    this.verbose && this.info(e4);
  }
  async getHash(e4, t) {
    try {
      let t2 = await (await this.getGitClient()).fetchRefs(e4);
      return e4.ref === `HEAD` ? this.selectHead(t2) : this.selectRef(t2, e4.ref);
    } catch (n) {
      this.warn(n);
      let r = n.original;
      return r && this.verboseInfo(r), this.getHashFromCache(e4, t);
    }
  }
  getHashFromCache(e4, t) {
    if (e4.ref in t) {
      let n = t[e4.ref];
      return this.info({ code: `USING_CACHE`, message: `using cached commit hash ${n}` }), n;
    }
  }
  selectRef(e4, t) {
    for (let n of e4) if (n.name === t) return this.verboseInfo({ code: `FOUND_MATCH`, message: `found matching commit hash: ${n.hash}` }), n.hash;
    if (t.length < 8) return null;
    for (let n of e4) if (n.hash.startsWith(t)) return n.hash;
  }
  selectHead(e4) {
    let t = e4.find((e5) => e5.type === `HEAD`);
    if (t) return t.hash;
    for (let t2 of [`main`, `master`]) {
      let n = e4.find((e5) => e5.type === `HEAD` || !e5.name ? false : e5.name === t2 || e5.name.endsWith(`/${t2}`));
      if (n) return n.hash;
    }
    return e4.find((e5) => e5.type === `branch` && e5.hash)?.hash;
  }
  async cloneWithTar(e4) {
    await Zo(this, this.getRepoDir(), e4);
  }
  async cloneWithGit(e4, t = this.repo.ref) {
    await (await this.getGitClient()).clone(this.repo, e4, t, this.repo.transport);
  }
  async cloneGitToDestination(e4, t = this.repo.ref) {
    if (this.repo.subdir) {
      let n = await ue(`degit-git-`);
      try {
        await this.cloneWithGit(n, t), lt(n, e4, this.repo.subdir);
      } finally {
        await pe(n, { force: true, recursive: true });
      }
      return;
    }
    await this.cloneWithGit(e4, t);
  }
  shouldFallbackToGit(e4) {
    return !e4 || typeof e4 != `object` ? false : e4.code === `COULD_NOT_DOWNLOAD` && !this.cache;
  }
  getRepoDir() {
    return y.join(L, this.repo.site, this.repo.user, this.repo.name);
  }
  async doCloneToDestination(e4) {
    if (this.mode === `git`) {
      let t = await this.getHash(this.repo, {});
      await this.cloneGitToDestination(e4, t || this.repo.ref);
      return;
    }
    try {
      await this.cloneWithTar(e4);
    } catch (t) {
      if (!this.shouldFallbackToGit(t)) throw t;
      this.warn({ message: `tar snapshot download or extraction failed; falling back to git clone` }), await this.cloneGitToDestination(e4);
    }
  }
  async cloneToDestination(e4) {
    this.repo.site === `gitlab` ? await this.tryGitlabProject(Re(this.src, this.repo), e4, this.repo) : await this.doCloneToDestination(e4);
  }
  async tryGitlabProject(e4, t, n, r) {
    let [i, ...a] = e4;
    if (i) {
      this.repo = i, this.verboseInfo({ message: `trying GitLab project path ${i.url}` });
      try {
        await this.doCloneToDestination(t);
      } catch (e5) {
        this.repo = n;
        let o = e5.code;
        if (e5 instanceof k && (o === `MISSING_REF` || o === `COULD_NOT_FETCH`)) this.warn({ message: `GitLab project path ${i.url} not found; trying next` }), await this.tryGitlabProject(a, t, n, r ?? e5);
        else throw e5;
      }
    } else throw r ?? new k(`could not find a valid GitLab project path`, { code: `COULD_NOT_FETCH` });
  }
  async runDirectives(t) {
    let n = this.getDirectives(t);
    n && await Qe(this, n, this.getRepoDir(), t, (t2, n2) => new e3(t2, n2));
  }
};
function rs(e4, t = {}) {
  return new ns(e4, t);
}

// node_modules/ora/index.js
import process10 from "process";
import { stripVTControlCharacters as stripVTControlCharacters4 } from "util";

// node_modules/chalk/source/vendor/ansi-styles/index.js
var ANSI_BACKGROUND_OFFSET = 10;
var wrapAnsi16 = (offset = 0) => (code) => `\x1B[${code + offset}m`;
var wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
var wrapAnsi16m = (offset = 0) => (red2, green2, blue2) => `\x1B[${38 + offset};2;${red2};${green2};${blue2}m`;
var styles = {
  modifier: {
    reset: [0, 0],
    // 21 isn't widely supported and 22 does the same thing
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    overline: [53, 55],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29]
  },
  color: {
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    // Bright color
    blackBright: [90, 39],
    gray: [90, 39],
    // Alias of `blackBright`
    grey: [90, 39],
    // Alias of `blackBright`
    redBright: [91, 39],
    greenBright: [92, 39],
    yellowBright: [93, 39],
    blueBright: [94, 39],
    magentaBright: [95, 39],
    cyanBright: [96, 39],
    whiteBright: [97, 39]
  },
  bgColor: {
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    // Bright color
    bgBlackBright: [100, 49],
    bgGray: [100, 49],
    // Alias of `bgBlackBright`
    bgGrey: [100, 49],
    // Alias of `bgBlackBright`
    bgRedBright: [101, 49],
    bgGreenBright: [102, 49],
    bgYellowBright: [103, 49],
    bgBlueBright: [104, 49],
    bgMagentaBright: [105, 49],
    bgCyanBright: [106, 49],
    bgWhiteBright: [107, 49]
  }
};
var modifierNames = Object.keys(styles.modifier);
var foregroundColorNames = Object.keys(styles.color);
var backgroundColorNames = Object.keys(styles.bgColor);
var colorNames = [...foregroundColorNames, ...backgroundColorNames];
function assembleStyles() {
  const codes = /* @__PURE__ */ new Map();
  for (const [groupName, group] of Object.entries(styles)) {
    for (const [styleName, style] of Object.entries(group)) {
      styles[styleName] = {
        open: `\x1B[${style[0]}m`,
        close: `\x1B[${style[1]}m`
      };
      group[styleName] = styles[styleName];
      codes.set(style[0], style[1]);
    }
    Object.defineProperty(styles, groupName, {
      value: group,
      enumerable: false
    });
  }
  Object.defineProperty(styles, "codes", {
    value: codes,
    enumerable: false
  });
  styles.color.close = "\x1B[39m";
  styles.bgColor.close = "\x1B[49m";
  styles.color.ansi = wrapAnsi16();
  styles.color.ansi256 = wrapAnsi256();
  styles.color.ansi16m = wrapAnsi16m();
  styles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
  Object.defineProperties(styles, {
    rgbToAnsi256: {
      value(red2, green2, blue2) {
        if (red2 === green2 && green2 === blue2) {
          if (red2 < 8) {
            return 16;
          }
          if (red2 > 248) {
            return 231;
          }
          return Math.round((red2 - 8) / 247 * 24) + 232;
        }
        return 16 + 36 * Math.round(red2 / 255 * 5) + 6 * Math.round(green2 / 255 * 5) + Math.round(blue2 / 255 * 5);
      },
      enumerable: false
    },
    hexToRgb: {
      value(hex) {
        const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
        if (!matches) {
          return [0, 0, 0];
        }
        let [colorString] = matches;
        if (colorString.length === 3) {
          colorString = [...colorString].map((character) => character + character).join("");
        }
        const integer = Number.parseInt(colorString, 16);
        return [
          /* eslint-disable no-bitwise */
          integer >> 16 & 255,
          integer >> 8 & 255,
          integer & 255
          /* eslint-enable no-bitwise */
        ];
      },
      enumerable: false
    },
    hexToAnsi256: {
      value: (hex) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
      enumerable: false
    },
    ansi256ToAnsi: {
      value(code) {
        if (code < 8) {
          return 30 + code;
        }
        if (code < 16) {
          return 90 + (code - 8);
        }
        let red2;
        let green2;
        let blue2;
        if (code >= 232) {
          red2 = ((code - 232) * 10 + 8) / 255;
          green2 = red2;
          blue2 = red2;
        } else {
          code -= 16;
          const remainder = code % 36;
          red2 = Math.floor(code / 36) / 5;
          green2 = Math.floor(remainder / 6) / 5;
          blue2 = remainder % 6 / 5;
        }
        const value = Math.max(red2, green2, blue2) * 2;
        if (value === 0) {
          return 30;
        }
        let result = 30 + (Math.round(blue2) << 2 | Math.round(green2) << 1 | Math.round(red2));
        if (value === 2) {
          result += 60;
        }
        return result;
      },
      enumerable: false
    },
    rgbToAnsi: {
      value: (red2, green2, blue2) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red2, green2, blue2)),
      enumerable: false
    },
    hexToAnsi: {
      value: (hex) => styles.ansi256ToAnsi(styles.hexToAnsi256(hex)),
      enumerable: false
    }
  });
  return styles;
}
var ansiStyles = assembleStyles();
var ansi_styles_default = ansiStyles;

// node_modules/chalk/source/vendor/supports-color/index.js
import process5 from "process";
import os from "os";
import tty from "tty";
function hasFlag(flag, argv = globalThis.Deno ? globalThis.Deno.args : process5.argv) {
  const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
  const position = argv.indexOf(prefix + flag);
  const terminatorPosition = argv.indexOf("--");
  return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
}
var { env } = process5;
var flagForceColor;
if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
  flagForceColor = 0;
} else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
  flagForceColor = 1;
}
function envForceColor() {
  if ("FORCE_COLOR" in env) {
    if (env.FORCE_COLOR === "true") {
      return 1;
    }
    if (env.FORCE_COLOR === "false") {
      return 0;
    }
    return env.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
  }
}
function translateLevel(level) {
  if (level === 0) {
    return false;
  }
  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3
  };
}
function _supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
  const noFlagForceColor = envForceColor();
  if (noFlagForceColor !== void 0) {
    flagForceColor = noFlagForceColor;
  }
  const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
  if (forceColor === 0) {
    return 0;
  }
  if (sniffFlags) {
    if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
      return 3;
    }
    if (hasFlag("color=256")) {
      return 2;
    }
  }
  if ("TF_BUILD" in env && "AGENT_NAME" in env) {
    return 1;
  }
  if (haveStream && !streamIsTTY && forceColor === void 0) {
    return 0;
  }
  const min = forceColor || 0;
  if (env.TERM === "dumb") {
    return min;
  }
  if (process5.platform === "win32") {
    const osRelease = os.release().split(".");
    if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2;
    }
    return 1;
  }
  if ("CI" in env) {
    if (["GITHUB_ACTIONS", "GITEA_ACTIONS", "CIRCLECI"].some((key) => key in env)) {
      return 3;
    }
    if (["TRAVIS", "APPVEYOR", "GITLAB_CI", "BUILDKITE", "DRONE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
      return 1;
    }
    return min;
  }
  if ("TEAMCITY_VERSION" in env) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
  }
  if (env.COLORTERM === "truecolor") {
    return 3;
  }
  if (env.TERM === "xterm-kitty") {
    return 3;
  }
  if (env.TERM === "xterm-ghostty") {
    return 3;
  }
  if (env.TERM === "wezterm") {
    return 3;
  }
  if ("TERM_PROGRAM" in env) {
    const version = Number.parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
    switch (env.TERM_PROGRAM) {
      case "iTerm.app": {
        return version >= 3 ? 3 : 2;
      }
      case "Apple_Terminal": {
        return 2;
      }
    }
  }
  if (/-256(color)?$/i.test(env.TERM)) {
    return 2;
  }
  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
    return 1;
  }
  if ("COLORTERM" in env) {
    return 1;
  }
  return min;
}
function createSupportsColor(stream, options = {}) {
  const level = _supportsColor(stream, {
    streamIsTTY: stream && stream.isTTY,
    ...options
  });
  return translateLevel(level);
}
var supportsColor = {
  stdout: createSupportsColor({ isTTY: tty.isatty(1) }),
  stderr: createSupportsColor({ isTTY: tty.isatty(2) })
};
var supports_color_default = supportsColor;

// node_modules/chalk/source/utilities.js
function stringReplaceAll(string, substring, replacer) {
  let index = string.indexOf(substring);
  if (index === -1) {
    return string;
  }
  const substringLength = substring.length;
  let endIndex = 0;
  let returnValue = "";
  do {
    returnValue += string.slice(endIndex, index) + substring + replacer;
    endIndex = index + substringLength;
    index = string.indexOf(substring, endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}
function stringEncaseCRLFWithFirstIndex(string, prefix, postfix, index) {
  let endIndex = 0;
  let returnValue = "";
  do {
    const gotCR = string[index - 1] === "\r";
    returnValue += string.slice(endIndex, gotCR ? index - 1 : index) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
    endIndex = index + 1;
    index = string.indexOf("\n", endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}

// node_modules/chalk/source/index.js
var { stdout: stdoutColor, stderr: stderrColor } = supports_color_default;
var GENERATOR = /* @__PURE__ */ Symbol("GENERATOR");
var STYLER = /* @__PURE__ */ Symbol("STYLER");
var IS_EMPTY = /* @__PURE__ */ Symbol("IS_EMPTY");
var levelMapping = [
  "ansi",
  "ansi",
  "ansi256",
  "ansi16m"
];
var styles2 = /* @__PURE__ */ Object.create(null);
var applyOptions = (object, options = {}) => {
  if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
    throw new Error("The `level` option should be an integer from 0 to 3");
  }
  const colorLevel = stdoutColor ? stdoutColor.level : 0;
  object.level = options.level === void 0 ? colorLevel : options.level;
};
var chalkFactory = (options) => {
  const chalk2 = (...strings) => strings.join(" ");
  applyOptions(chalk2, options);
  Object.setPrototypeOf(chalk2, createChalk.prototype);
  return chalk2;
};
function createChalk(options) {
  return chalkFactory(options);
}
Object.setPrototypeOf(createChalk.prototype, Function.prototype);
for (const [styleName, style] of Object.entries(ansi_styles_default)) {
  styles2[styleName] = {
    get() {
      const builder = createBuilder(this, createStyler(style.open, style.close, this[STYLER]), this[IS_EMPTY]);
      Object.defineProperty(this, styleName, { value: builder });
      return builder;
    }
  };
}
styles2.visible = {
  get() {
    const builder = createBuilder(this, this[STYLER], true);
    Object.defineProperty(this, "visible", { value: builder });
    return builder;
  }
};
var getModelAnsi = (model, level, type, ...arguments_) => {
  if (model === "rgb") {
    if (level === "ansi16m") {
      return ansi_styles_default[type].ansi16m(...arguments_);
    }
    if (level === "ansi256") {
      return ansi_styles_default[type].ansi256(ansi_styles_default.rgbToAnsi256(...arguments_));
    }
    return ansi_styles_default[type].ansi(ansi_styles_default.rgbToAnsi(...arguments_));
  }
  if (model === "hex") {
    return getModelAnsi("rgb", level, type, ...ansi_styles_default.hexToRgb(...arguments_));
  }
  return ansi_styles_default[type][model](...arguments_);
};
var usedModels = ["rgb", "hex", "ansi256"];
for (const model of usedModels) {
  styles2[model] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "color", ...arguments_), ansi_styles_default.color.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
  const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
  styles2[bgModel] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "bgColor", ...arguments_), ansi_styles_default.bgColor.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
}
var proto = Object.defineProperties(() => {
}, {
  ...styles2,
  level: {
    enumerable: true,
    get() {
      return this[GENERATOR].level;
    },
    set(level) {
      this[GENERATOR].level = level;
    }
  }
});
var createStyler = (open, close, parent) => {
  let openAll;
  let closeAll;
  if (parent === void 0) {
    openAll = open;
    closeAll = close;
  } else {
    openAll = parent.openAll + open;
    closeAll = close + parent.closeAll;
  }
  return {
    open,
    close,
    openAll,
    closeAll,
    parent
  };
};
var createBuilder = (self, _styler, _isEmpty) => {
  const builder = (...arguments_) => applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
  Object.setPrototypeOf(builder, proto);
  builder[GENERATOR] = self;
  builder[STYLER] = _styler;
  builder[IS_EMPTY] = _isEmpty;
  return builder;
};
var applyStyle = (self, string) => {
  if (self.level <= 0 || !string) {
    return self[IS_EMPTY] ? "" : string;
  }
  let styler = self[STYLER];
  if (styler === void 0) {
    return string;
  }
  const { openAll, closeAll } = styler;
  if (string.includes("\x1B")) {
    while (styler !== void 0) {
      string = stringReplaceAll(string, styler.close, styler.open);
      styler = styler.parent;
    }
  }
  const lfIndex = string.indexOf("\n");
  if (lfIndex !== -1) {
    string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
  }
  return openAll + string + closeAll;
};
Object.defineProperties(createChalk.prototype, styles2);
var chalk = createChalk();
var chalkStderr = createChalk({ level: stderrColor ? stderrColor.level : 0 });
var source_default = chalk;

// node_modules/cli-cursor/index.js
import process7 from "process";

// node_modules/restore-cursor/index.js
import process6 from "process";

// node_modules/mimic-function/index.js
var copyProperty = (to2, from, property, ignoreNonConfigurable) => {
  if (property === "length" || property === "prototype") {
    return;
  }
  if (property === "arguments" || property === "caller") {
    return;
  }
  const toDescriptor = Object.getOwnPropertyDescriptor(to2, property);
  const fromDescriptor = Object.getOwnPropertyDescriptor(from, property);
  if (!canCopyProperty(toDescriptor, fromDescriptor) && ignoreNonConfigurable) {
    return;
  }
  Object.defineProperty(to2, property, fromDescriptor);
};
var canCopyProperty = function(toDescriptor, fromDescriptor) {
  return toDescriptor === void 0 || toDescriptor.configurable || toDescriptor.writable === fromDescriptor.writable && toDescriptor.enumerable === fromDescriptor.enumerable && toDescriptor.configurable === fromDescriptor.configurable && (toDescriptor.writable || toDescriptor.value === fromDescriptor.value);
};
var changePrototype = (to2, from) => {
  const fromPrototype = Object.getPrototypeOf(from);
  if (fromPrototype === Object.getPrototypeOf(to2)) {
    return;
  }
  Object.setPrototypeOf(to2, fromPrototype);
};
var wrappedToString = (withName, fromBody) => `/* Wrapped ${withName}*/
${fromBody}`;
var toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, "toString");
var toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name");
var changeToString = (to2, from, name) => {
  const withName = name === "" ? "" : `with ${name.trim()}() `;
  const newToString = wrappedToString.bind(null, withName, from.toString());
  Object.defineProperty(newToString, "name", toStringName);
  const { writable, enumerable, configurable } = toStringDescriptor;
  Object.defineProperty(to2, "toString", { value: newToString, writable, enumerable, configurable });
};
function mimicFunction(to2, from, { ignoreNonConfigurable = false } = {}) {
  const { name } = to2;
  for (const property of Reflect.ownKeys(from)) {
    copyProperty(to2, from, property, ignoreNonConfigurable);
  }
  changePrototype(to2, from);
  changeToString(to2, from, name);
  return to2;
}

// node_modules/onetime/index.js
var calledFunctions = /* @__PURE__ */ new WeakMap();
var onetime = (function_, options = {}) => {
  if (typeof function_ !== "function") {
    throw new TypeError("Expected a function");
  }
  let returnValue;
  let callCount = 0;
  const functionName = function_.displayName || function_.name || "<anonymous>";
  const onetime2 = function(...arguments_) {
    calledFunctions.set(onetime2, ++callCount);
    if (callCount === 1) {
      returnValue = function_.apply(this, arguments_);
      function_ = void 0;
    } else if (options.throw === true) {
      throw new Error(`Function \`${functionName}\` can only be called once`);
    }
    return returnValue;
  };
  mimicFunction(onetime2, function_);
  calledFunctions.set(onetime2, callCount);
  return onetime2;
};
onetime.callCount = (function_) => {
  if (!calledFunctions.has(function_)) {
    throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
  }
  return calledFunctions.get(function_);
};
var onetime_default = onetime;

// node_modules/restore-cursor/index.js
var terminal = process6.stderr.isTTY ? process6.stderr : process6.stdout.isTTY ? process6.stdout : void 0;
var restoreCursor = terminal ? onetime_default(() => {
  onExit(() => {
    terminal.write("\x1B[?25h");
  }, { alwaysLast: true });
}) : () => {
};
var restore_cursor_default = restoreCursor;

// node_modules/cli-cursor/index.js
var isHidden = false;
var cliCursor = {};
cliCursor.show = (writableStream = process7.stderr) => {
  if (!writableStream.isTTY) {
    return;
  }
  isHidden = false;
  writableStream.write("\x1B[?25h");
};
cliCursor.hide = (writableStream = process7.stderr) => {
  if (!writableStream.isTTY) {
    return;
  }
  restore_cursor_default();
  isHidden = true;
  writableStream.write("\x1B[?25l");
};
cliCursor.toggle = (force, writableStream) => {
  if (force !== void 0) {
    isHidden = force;
  }
  if (isHidden) {
    cliCursor.show(writableStream);
  } else {
    cliCursor.hide(writableStream);
  }
};
var cli_cursor_default = cliCursor;

// node_modules/cli-spinners/spinners.json
var spinners_default = {
  dots: {
    interval: 80,
    frames: [
      "\u280B",
      "\u2819",
      "\u2839",
      "\u2838",
      "\u283C",
      "\u2834",
      "\u2826",
      "\u2827",
      "\u2807",
      "\u280F"
    ]
  },
  dots2: {
    interval: 80,
    frames: [
      "\u28FE",
      "\u28FD",
      "\u28FB",
      "\u28BF",
      "\u287F",
      "\u28DF",
      "\u28EF",
      "\u28F7"
    ]
  },
  dots3: {
    interval: 80,
    frames: [
      "\u280B",
      "\u2819",
      "\u281A",
      "\u281E",
      "\u2816",
      "\u2826",
      "\u2834",
      "\u2832",
      "\u2833",
      "\u2813"
    ]
  },
  dots4: {
    interval: 80,
    frames: [
      "\u2804",
      "\u2806",
      "\u2807",
      "\u280B",
      "\u2819",
      "\u2838",
      "\u2830",
      "\u2820",
      "\u2830",
      "\u2838",
      "\u2819",
      "\u280B",
      "\u2807",
      "\u2806"
    ]
  },
  dots5: {
    interval: 80,
    frames: [
      "\u280B",
      "\u2819",
      "\u281A",
      "\u2812",
      "\u2802",
      "\u2802",
      "\u2812",
      "\u2832",
      "\u2834",
      "\u2826",
      "\u2816",
      "\u2812",
      "\u2810",
      "\u2810",
      "\u2812",
      "\u2813",
      "\u280B"
    ]
  },
  dots6: {
    interval: 80,
    frames: [
      "\u2801",
      "\u2809",
      "\u2819",
      "\u281A",
      "\u2812",
      "\u2802",
      "\u2802",
      "\u2812",
      "\u2832",
      "\u2834",
      "\u2824",
      "\u2804",
      "\u2804",
      "\u2824",
      "\u2834",
      "\u2832",
      "\u2812",
      "\u2802",
      "\u2802",
      "\u2812",
      "\u281A",
      "\u2819",
      "\u2809",
      "\u2801"
    ]
  },
  dots7: {
    interval: 80,
    frames: [
      "\u2808",
      "\u2809",
      "\u280B",
      "\u2813",
      "\u2812",
      "\u2810",
      "\u2810",
      "\u2812",
      "\u2816",
      "\u2826",
      "\u2824",
      "\u2820",
      "\u2820",
      "\u2824",
      "\u2826",
      "\u2816",
      "\u2812",
      "\u2810",
      "\u2810",
      "\u2812",
      "\u2813",
      "\u280B",
      "\u2809",
      "\u2808"
    ]
  },
  dots8: {
    interval: 80,
    frames: [
      "\u2801",
      "\u2801",
      "\u2809",
      "\u2819",
      "\u281A",
      "\u2812",
      "\u2802",
      "\u2802",
      "\u2812",
      "\u2832",
      "\u2834",
      "\u2824",
      "\u2804",
      "\u2804",
      "\u2824",
      "\u2820",
      "\u2820",
      "\u2824",
      "\u2826",
      "\u2816",
      "\u2812",
      "\u2810",
      "\u2810",
      "\u2812",
      "\u2813",
      "\u280B",
      "\u2809",
      "\u2808",
      "\u2808"
    ]
  },
  dots9: {
    interval: 80,
    frames: [
      "\u28B9",
      "\u28BA",
      "\u28BC",
      "\u28F8",
      "\u28C7",
      "\u2867",
      "\u2857",
      "\u284F"
    ]
  },
  dots10: {
    interval: 80,
    frames: [
      "\u2884",
      "\u2882",
      "\u2881",
      "\u2841",
      "\u2848",
      "\u2850",
      "\u2860"
    ]
  },
  dots11: {
    interval: 100,
    frames: [
      "\u2801",
      "\u2802",
      "\u2804",
      "\u2840",
      "\u2880",
      "\u2820",
      "\u2810",
      "\u2808"
    ]
  },
  dots12: {
    interval: 80,
    frames: [
      "\u2880\u2800",
      "\u2840\u2800",
      "\u2804\u2800",
      "\u2882\u2800",
      "\u2842\u2800",
      "\u2805\u2800",
      "\u2883\u2800",
      "\u2843\u2800",
      "\u280D\u2800",
      "\u288B\u2800",
      "\u284B\u2800",
      "\u280D\u2801",
      "\u288B\u2801",
      "\u284B\u2801",
      "\u280D\u2809",
      "\u280B\u2809",
      "\u280B\u2809",
      "\u2809\u2819",
      "\u2809\u2819",
      "\u2809\u2829",
      "\u2808\u2899",
      "\u2808\u2859",
      "\u2888\u2829",
      "\u2840\u2899",
      "\u2804\u2859",
      "\u2882\u2829",
      "\u2842\u2898",
      "\u2805\u2858",
      "\u2883\u2828",
      "\u2843\u2890",
      "\u280D\u2850",
      "\u288B\u2820",
      "\u284B\u2880",
      "\u280D\u2841",
      "\u288B\u2801",
      "\u284B\u2801",
      "\u280D\u2809",
      "\u280B\u2809",
      "\u280B\u2809",
      "\u2809\u2819",
      "\u2809\u2819",
      "\u2809\u2829",
      "\u2808\u2899",
      "\u2808\u2859",
      "\u2808\u2829",
      "\u2800\u2899",
      "\u2800\u2859",
      "\u2800\u2829",
      "\u2800\u2898",
      "\u2800\u2858",
      "\u2800\u2828",
      "\u2800\u2890",
      "\u2800\u2850",
      "\u2800\u2820",
      "\u2800\u2880",
      "\u2800\u2840"
    ]
  },
  dots13: {
    interval: 80,
    frames: [
      "\u28FC",
      "\u28F9",
      "\u28BB",
      "\u283F",
      "\u285F",
      "\u28CF",
      "\u28E7",
      "\u28F6"
    ]
  },
  dots14: {
    interval: 80,
    frames: [
      "\u2809\u2809",
      "\u2808\u2819",
      "\u2800\u2839",
      "\u2800\u28B8",
      "\u2800\u28F0",
      "\u2880\u28E0",
      "\u28C0\u28C0",
      "\u28C4\u2840",
      "\u28C6\u2800",
      "\u2847\u2800",
      "\u280F\u2800",
      "\u280B\u2801"
    ]
  },
  dots8Bit: {
    interval: 80,
    frames: [
      "\u2800",
      "\u2801",
      "\u2802",
      "\u2803",
      "\u2804",
      "\u2805",
      "\u2806",
      "\u2807",
      "\u2840",
      "\u2841",
      "\u2842",
      "\u2843",
      "\u2844",
      "\u2845",
      "\u2846",
      "\u2847",
      "\u2808",
      "\u2809",
      "\u280A",
      "\u280B",
      "\u280C",
      "\u280D",
      "\u280E",
      "\u280F",
      "\u2848",
      "\u2849",
      "\u284A",
      "\u284B",
      "\u284C",
      "\u284D",
      "\u284E",
      "\u284F",
      "\u2810",
      "\u2811",
      "\u2812",
      "\u2813",
      "\u2814",
      "\u2815",
      "\u2816",
      "\u2817",
      "\u2850",
      "\u2851",
      "\u2852",
      "\u2853",
      "\u2854",
      "\u2855",
      "\u2856",
      "\u2857",
      "\u2818",
      "\u2819",
      "\u281A",
      "\u281B",
      "\u281C",
      "\u281D",
      "\u281E",
      "\u281F",
      "\u2858",
      "\u2859",
      "\u285A",
      "\u285B",
      "\u285C",
      "\u285D",
      "\u285E",
      "\u285F",
      "\u2820",
      "\u2821",
      "\u2822",
      "\u2823",
      "\u2824",
      "\u2825",
      "\u2826",
      "\u2827",
      "\u2860",
      "\u2861",
      "\u2862",
      "\u2863",
      "\u2864",
      "\u2865",
      "\u2866",
      "\u2867",
      "\u2828",
      "\u2829",
      "\u282A",
      "\u282B",
      "\u282C",
      "\u282D",
      "\u282E",
      "\u282F",
      "\u2868",
      "\u2869",
      "\u286A",
      "\u286B",
      "\u286C",
      "\u286D",
      "\u286E",
      "\u286F",
      "\u2830",
      "\u2831",
      "\u2832",
      "\u2833",
      "\u2834",
      "\u2835",
      "\u2836",
      "\u2837",
      "\u2870",
      "\u2871",
      "\u2872",
      "\u2873",
      "\u2874",
      "\u2875",
      "\u2876",
      "\u2877",
      "\u2838",
      "\u2839",
      "\u283A",
      "\u283B",
      "\u283C",
      "\u283D",
      "\u283E",
      "\u283F",
      "\u2878",
      "\u2879",
      "\u287A",
      "\u287B",
      "\u287C",
      "\u287D",
      "\u287E",
      "\u287F",
      "\u2880",
      "\u2881",
      "\u2882",
      "\u2883",
      "\u2884",
      "\u2885",
      "\u2886",
      "\u2887",
      "\u28C0",
      "\u28C1",
      "\u28C2",
      "\u28C3",
      "\u28C4",
      "\u28C5",
      "\u28C6",
      "\u28C7",
      "\u2888",
      "\u2889",
      "\u288A",
      "\u288B",
      "\u288C",
      "\u288D",
      "\u288E",
      "\u288F",
      "\u28C8",
      "\u28C9",
      "\u28CA",
      "\u28CB",
      "\u28CC",
      "\u28CD",
      "\u28CE",
      "\u28CF",
      "\u2890",
      "\u2891",
      "\u2892",
      "\u2893",
      "\u2894",
      "\u2895",
      "\u2896",
      "\u2897",
      "\u28D0",
      "\u28D1",
      "\u28D2",
      "\u28D3",
      "\u28D4",
      "\u28D5",
      "\u28D6",
      "\u28D7",
      "\u2898",
      "\u2899",
      "\u289A",
      "\u289B",
      "\u289C",
      "\u289D",
      "\u289E",
      "\u289F",
      "\u28D8",
      "\u28D9",
      "\u28DA",
      "\u28DB",
      "\u28DC",
      "\u28DD",
      "\u28DE",
      "\u28DF",
      "\u28A0",
      "\u28A1",
      "\u28A2",
      "\u28A3",
      "\u28A4",
      "\u28A5",
      "\u28A6",
      "\u28A7",
      "\u28E0",
      "\u28E1",
      "\u28E2",
      "\u28E3",
      "\u28E4",
      "\u28E5",
      "\u28E6",
      "\u28E7",
      "\u28A8",
      "\u28A9",
      "\u28AA",
      "\u28AB",
      "\u28AC",
      "\u28AD",
      "\u28AE",
      "\u28AF",
      "\u28E8",
      "\u28E9",
      "\u28EA",
      "\u28EB",
      "\u28EC",
      "\u28ED",
      "\u28EE",
      "\u28EF",
      "\u28B0",
      "\u28B1",
      "\u28B2",
      "\u28B3",
      "\u28B4",
      "\u28B5",
      "\u28B6",
      "\u28B7",
      "\u28F0",
      "\u28F1",
      "\u28F2",
      "\u28F3",
      "\u28F4",
      "\u28F5",
      "\u28F6",
      "\u28F7",
      "\u28B8",
      "\u28B9",
      "\u28BA",
      "\u28BB",
      "\u28BC",
      "\u28BD",
      "\u28BE",
      "\u28BF",
      "\u28F8",
      "\u28F9",
      "\u28FA",
      "\u28FB",
      "\u28FC",
      "\u28FD",
      "\u28FE",
      "\u28FF"
    ]
  },
  dotsCircle: {
    interval: 80,
    frames: [
      "\u288E ",
      "\u280E\u2801",
      "\u280A\u2811",
      "\u2808\u2831",
      " \u2871",
      "\u2880\u2870",
      "\u2884\u2860",
      "\u2886\u2840"
    ]
  },
  sand: {
    interval: 80,
    frames: [
      "\u2801",
      "\u2802",
      "\u2804",
      "\u2840",
      "\u2848",
      "\u2850",
      "\u2860",
      "\u28C0",
      "\u28C1",
      "\u28C2",
      "\u28C4",
      "\u28CC",
      "\u28D4",
      "\u28E4",
      "\u28E5",
      "\u28E6",
      "\u28EE",
      "\u28F6",
      "\u28F7",
      "\u28FF",
      "\u287F",
      "\u283F",
      "\u289F",
      "\u281F",
      "\u285B",
      "\u281B",
      "\u282B",
      "\u288B",
      "\u280B",
      "\u280D",
      "\u2849",
      "\u2809",
      "\u2811",
      "\u2821",
      "\u2881"
    ]
  },
  line: {
    interval: 130,
    frames: [
      "-",
      "\\",
      "|",
      "/"
    ]
  },
  line2: {
    interval: 100,
    frames: [
      "\u2802",
      "-",
      "\u2013",
      "\u2014",
      "\u2013",
      "-"
    ]
  },
  rollingLine: {
    interval: 80,
    frames: [
      "/  ",
      " - ",
      " \\ ",
      "  |",
      "  |",
      " \\ ",
      " - ",
      "/  "
    ]
  },
  pipe: {
    interval: 100,
    frames: [
      "\u2524",
      "\u2518",
      "\u2534",
      "\u2514",
      "\u251C",
      "\u250C",
      "\u252C",
      "\u2510"
    ]
  },
  simpleDots: {
    interval: 400,
    frames: [
      ".  ",
      ".. ",
      "...",
      "   "
    ]
  },
  simpleDotsScrolling: {
    interval: 200,
    frames: [
      ".  ",
      ".. ",
      "...",
      " ..",
      "  .",
      "   "
    ]
  },
  star: {
    interval: 70,
    frames: [
      "\u2736",
      "\u2738",
      "\u2739",
      "\u273A",
      "\u2739",
      "\u2737"
    ]
  },
  star2: {
    interval: 80,
    frames: [
      "+",
      "x",
      "*"
    ]
  },
  flip: {
    interval: 70,
    frames: [
      "_",
      "_",
      "_",
      "-",
      "`",
      "`",
      "'",
      "\xB4",
      "-",
      "_",
      "_",
      "_"
    ]
  },
  hamburger: {
    interval: 100,
    frames: [
      "\u2631",
      "\u2632",
      "\u2634"
    ]
  },
  growVertical: {
    interval: 120,
    frames: [
      "\u2581",
      "\u2583",
      "\u2584",
      "\u2585",
      "\u2586",
      "\u2587",
      "\u2586",
      "\u2585",
      "\u2584",
      "\u2583"
    ]
  },
  growHorizontal: {
    interval: 120,
    frames: [
      "\u258F",
      "\u258E",
      "\u258D",
      "\u258C",
      "\u258B",
      "\u258A",
      "\u2589",
      "\u258A",
      "\u258B",
      "\u258C",
      "\u258D",
      "\u258E"
    ]
  },
  balloon: {
    interval: 140,
    frames: [
      " ",
      ".",
      "o",
      "O",
      "@",
      "*",
      " "
    ]
  },
  balloon2: {
    interval: 120,
    frames: [
      ".",
      "o",
      "O",
      "\xB0",
      "O",
      "o",
      "."
    ]
  },
  noise: {
    interval: 100,
    frames: [
      "\u2593",
      "\u2592",
      "\u2591"
    ]
  },
  bounce: {
    interval: 120,
    frames: [
      "\u2801",
      "\u2802",
      "\u2804",
      "\u2802"
    ]
  },
  boxBounce: {
    interval: 120,
    frames: [
      "\u2596",
      "\u2598",
      "\u259D",
      "\u2597"
    ]
  },
  boxBounce2: {
    interval: 100,
    frames: [
      "\u258C",
      "\u2580",
      "\u2590",
      "\u2584"
    ]
  },
  triangle: {
    interval: 50,
    frames: [
      "\u25E2",
      "\u25E3",
      "\u25E4",
      "\u25E5"
    ]
  },
  binary: {
    interval: 80,
    frames: [
      "010010",
      "001100",
      "100101",
      "111010",
      "111101",
      "010111",
      "101011",
      "111000",
      "110011",
      "110101"
    ]
  },
  arc: {
    interval: 100,
    frames: [
      "\u25DC",
      "\u25E0",
      "\u25DD",
      "\u25DE",
      "\u25E1",
      "\u25DF"
    ]
  },
  circle: {
    interval: 120,
    frames: [
      "\u25E1",
      "\u2299",
      "\u25E0"
    ]
  },
  squareCorners: {
    interval: 180,
    frames: [
      "\u25F0",
      "\u25F3",
      "\u25F2",
      "\u25F1"
    ]
  },
  circleQuarters: {
    interval: 120,
    frames: [
      "\u25F4",
      "\u25F7",
      "\u25F6",
      "\u25F5"
    ]
  },
  circleHalves: {
    interval: 50,
    frames: [
      "\u25D0",
      "\u25D3",
      "\u25D1",
      "\u25D2"
    ]
  },
  squish: {
    interval: 100,
    frames: [
      "\u256B",
      "\u256A"
    ]
  },
  toggle: {
    interval: 250,
    frames: [
      "\u22B6",
      "\u22B7"
    ]
  },
  toggle2: {
    interval: 80,
    frames: [
      "\u25AB",
      "\u25AA"
    ]
  },
  toggle3: {
    interval: 120,
    frames: [
      "\u25A1",
      "\u25A0"
    ]
  },
  toggle4: {
    interval: 100,
    frames: [
      "\u25A0",
      "\u25A1",
      "\u25AA",
      "\u25AB"
    ]
  },
  toggle5: {
    interval: 100,
    frames: [
      "\u25AE",
      "\u25AF"
    ]
  },
  toggle6: {
    interval: 300,
    frames: [
      "\u101D",
      "\u1040"
    ]
  },
  toggle7: {
    interval: 80,
    frames: [
      "\u29BE",
      "\u29BF"
    ]
  },
  toggle8: {
    interval: 100,
    frames: [
      "\u25CD",
      "\u25CC"
    ]
  },
  toggle9: {
    interval: 100,
    frames: [
      "\u25C9",
      "\u25CE"
    ]
  },
  toggle10: {
    interval: 100,
    frames: [
      "\u3282",
      "\u3280",
      "\u3281"
    ]
  },
  toggle11: {
    interval: 50,
    frames: [
      "\u29C7",
      "\u29C6"
    ]
  },
  toggle12: {
    interval: 120,
    frames: [
      "\u2617",
      "\u2616"
    ]
  },
  toggle13: {
    interval: 80,
    frames: [
      "=",
      "*",
      "-"
    ]
  },
  arrow: {
    interval: 100,
    frames: [
      "\u2190",
      "\u2196",
      "\u2191",
      "\u2197",
      "\u2192",
      "\u2198",
      "\u2193",
      "\u2199"
    ]
  },
  arrow2: {
    interval: 80,
    frames: [
      "\u2B06\uFE0F ",
      "\u2197\uFE0F ",
      "\u27A1\uFE0F ",
      "\u2198\uFE0F ",
      "\u2B07\uFE0F ",
      "\u2199\uFE0F ",
      "\u2B05\uFE0F ",
      "\u2196\uFE0F "
    ]
  },
  arrow3: {
    interval: 120,
    frames: [
      "\u25B9\u25B9\u25B9\u25B9\u25B9",
      "\u25B8\u25B9\u25B9\u25B9\u25B9",
      "\u25B9\u25B8\u25B9\u25B9\u25B9",
      "\u25B9\u25B9\u25B8\u25B9\u25B9",
      "\u25B9\u25B9\u25B9\u25B8\u25B9",
      "\u25B9\u25B9\u25B9\u25B9\u25B8"
    ]
  },
  bouncingBar: {
    interval: 80,
    frames: [
      "[    ]",
      "[=   ]",
      "[==  ]",
      "[=== ]",
      "[====]",
      "[ ===]",
      "[  ==]",
      "[   =]",
      "[    ]",
      "[   =]",
      "[  ==]",
      "[ ===]",
      "[====]",
      "[=== ]",
      "[==  ]",
      "[=   ]"
    ]
  },
  bouncingBall: {
    interval: 80,
    frames: [
      "( \u25CF    )",
      "(  \u25CF   )",
      "(   \u25CF  )",
      "(    \u25CF )",
      "(     \u25CF)",
      "(    \u25CF )",
      "(   \u25CF  )",
      "(  \u25CF   )",
      "( \u25CF    )",
      "(\u25CF     )"
    ]
  },
  smiley: {
    interval: 200,
    frames: [
      "\u{1F604} ",
      "\u{1F61D} "
    ]
  },
  monkey: {
    interval: 300,
    frames: [
      "\u{1F648} ",
      "\u{1F648} ",
      "\u{1F649} ",
      "\u{1F64A} "
    ]
  },
  hearts: {
    interval: 100,
    frames: [
      "\u{1F49B} ",
      "\u{1F499} ",
      "\u{1F49C} ",
      "\u{1F49A} ",
      "\u{1F497} "
    ]
  },
  clock: {
    interval: 100,
    frames: [
      "\u{1F55B} ",
      "\u{1F550} ",
      "\u{1F551} ",
      "\u{1F552} ",
      "\u{1F553} ",
      "\u{1F554} ",
      "\u{1F555} ",
      "\u{1F556} ",
      "\u{1F557} ",
      "\u{1F558} ",
      "\u{1F559} ",
      "\u{1F55A} "
    ]
  },
  earth: {
    interval: 180,
    frames: [
      "\u{1F30D} ",
      "\u{1F30E} ",
      "\u{1F30F} "
    ]
  },
  material: {
    interval: 17,
    frames: [
      "\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581",
      "\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581",
      "\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581",
      "\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581",
      "\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
      "\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
      "\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581",
      "\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588",
      "\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588",
      "\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588",
      "\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588",
      "\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588",
      "\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588",
      "\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
      "\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581",
      "\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581",
      "\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
      "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581"
    ]
  },
  moon: {
    interval: 80,
    frames: [
      "\u{1F311} ",
      "\u{1F312} ",
      "\u{1F313} ",
      "\u{1F314} ",
      "\u{1F315} ",
      "\u{1F316} ",
      "\u{1F317} ",
      "\u{1F318} "
    ]
  },
  runner: {
    interval: 140,
    frames: [
      "\u{1F6B6} ",
      "\u{1F3C3} "
    ]
  },
  pong: {
    interval: 80,
    frames: [
      "\u2590\u2802       \u258C",
      "\u2590\u2808       \u258C",
      "\u2590 \u2802      \u258C",
      "\u2590 \u2820      \u258C",
      "\u2590  \u2840     \u258C",
      "\u2590  \u2820     \u258C",
      "\u2590   \u2802    \u258C",
      "\u2590   \u2808    \u258C",
      "\u2590    \u2802   \u258C",
      "\u2590    \u2820   \u258C",
      "\u2590     \u2840  \u258C",
      "\u2590     \u2820  \u258C",
      "\u2590      \u2802 \u258C",
      "\u2590      \u2808 \u258C",
      "\u2590       \u2802\u258C",
      "\u2590       \u2820\u258C",
      "\u2590       \u2840\u258C",
      "\u2590      \u2820 \u258C",
      "\u2590      \u2802 \u258C",
      "\u2590     \u2808  \u258C",
      "\u2590     \u2802  \u258C",
      "\u2590    \u2820   \u258C",
      "\u2590    \u2840   \u258C",
      "\u2590   \u2820    \u258C",
      "\u2590   \u2802    \u258C",
      "\u2590  \u2808     \u258C",
      "\u2590  \u2802     \u258C",
      "\u2590 \u2820      \u258C",
      "\u2590 \u2840      \u258C",
      "\u2590\u2820       \u258C"
    ]
  },
  shark: {
    interval: 120,
    frames: [
      "\u2590|\\____________\u258C",
      "\u2590_|\\___________\u258C",
      "\u2590__|\\__________\u258C",
      "\u2590___|\\_________\u258C",
      "\u2590____|\\________\u258C",
      "\u2590_____|\\_______\u258C",
      "\u2590______|\\______\u258C",
      "\u2590_______|\\_____\u258C",
      "\u2590________|\\____\u258C",
      "\u2590_________|\\___\u258C",
      "\u2590__________|\\__\u258C",
      "\u2590___________|\\_\u258C",
      "\u2590____________|\\\u258C",
      "\u2590____________/|\u258C",
      "\u2590___________/|_\u258C",
      "\u2590__________/|__\u258C",
      "\u2590_________/|___\u258C",
      "\u2590________/|____\u258C",
      "\u2590_______/|_____\u258C",
      "\u2590______/|______\u258C",
      "\u2590_____/|_______\u258C",
      "\u2590____/|________\u258C",
      "\u2590___/|_________\u258C",
      "\u2590__/|__________\u258C",
      "\u2590_/|___________\u258C",
      "\u2590/|____________\u258C"
    ]
  },
  dqpb: {
    interval: 100,
    frames: [
      "d",
      "q",
      "p",
      "b"
    ]
  },
  weather: {
    interval: 100,
    frames: [
      "\u2600\uFE0F ",
      "\u2600\uFE0F ",
      "\u2600\uFE0F ",
      "\u{1F324} ",
      "\u26C5\uFE0F ",
      "\u{1F325} ",
      "\u2601\uFE0F ",
      "\u{1F327} ",
      "\u{1F328} ",
      "\u{1F327} ",
      "\u{1F328} ",
      "\u{1F327} ",
      "\u{1F328} ",
      "\u26C8 ",
      "\u{1F328} ",
      "\u{1F327} ",
      "\u{1F328} ",
      "\u2601\uFE0F ",
      "\u{1F325} ",
      "\u26C5\uFE0F ",
      "\u{1F324} ",
      "\u2600\uFE0F ",
      "\u2600\uFE0F "
    ]
  },
  christmas: {
    interval: 400,
    frames: [
      "\u{1F332}",
      "\u{1F384}"
    ]
  },
  grenade: {
    interval: 80,
    frames: [
      "\u060C  ",
      "\u2032  ",
      " \xB4 ",
      " \u203E ",
      "  \u2E0C",
      "  \u2E0A",
      "  |",
      "  \u204E",
      "  \u2055",
      " \u0DF4 ",
      "  \u2053",
      "   ",
      "   ",
      "   "
    ]
  },
  point: {
    interval: 125,
    frames: [
      "\u2219\u2219\u2219",
      "\u25CF\u2219\u2219",
      "\u2219\u25CF\u2219",
      "\u2219\u2219\u25CF",
      "\u2219\u2219\u2219"
    ]
  },
  layer: {
    interval: 150,
    frames: [
      "-",
      "=",
      "\u2261"
    ]
  },
  betaWave: {
    interval: 80,
    frames: [
      "\u03C1\u03B2\u03B2\u03B2\u03B2\u03B2\u03B2",
      "\u03B2\u03C1\u03B2\u03B2\u03B2\u03B2\u03B2",
      "\u03B2\u03B2\u03C1\u03B2\u03B2\u03B2\u03B2",
      "\u03B2\u03B2\u03B2\u03C1\u03B2\u03B2\u03B2",
      "\u03B2\u03B2\u03B2\u03B2\u03C1\u03B2\u03B2",
      "\u03B2\u03B2\u03B2\u03B2\u03B2\u03C1\u03B2",
      "\u03B2\u03B2\u03B2\u03B2\u03B2\u03B2\u03C1"
    ]
  },
  fingerDance: {
    interval: 160,
    frames: [
      "\u{1F918} ",
      "\u{1F91F} ",
      "\u{1F596} ",
      "\u270B ",
      "\u{1F91A} ",
      "\u{1F446} "
    ]
  },
  fistBump: {
    interval: 80,
    frames: [
      "\u{1F91C}\u3000\u3000\u3000\u3000\u{1F91B} ",
      "\u{1F91C}\u3000\u3000\u3000\u3000\u{1F91B} ",
      "\u{1F91C}\u3000\u3000\u3000\u3000\u{1F91B} ",
      "\u3000\u{1F91C}\u3000\u3000\u{1F91B}\u3000 ",
      "\u3000\u3000\u{1F91C}\u{1F91B}\u3000\u3000 ",
      "\u3000\u{1F91C}\u2728\u{1F91B}\u3000\u3000 ",
      "\u{1F91C}\u3000\u2728\u3000\u{1F91B}\u3000 "
    ]
  },
  soccerHeader: {
    interval: 80,
    frames: [
      " \u{1F9D1}\u26BD\uFE0F       \u{1F9D1} ",
      "\u{1F9D1}  \u26BD\uFE0F      \u{1F9D1} ",
      "\u{1F9D1}   \u26BD\uFE0F     \u{1F9D1} ",
      "\u{1F9D1}    \u26BD\uFE0F    \u{1F9D1} ",
      "\u{1F9D1}     \u26BD\uFE0F   \u{1F9D1} ",
      "\u{1F9D1}      \u26BD\uFE0F  \u{1F9D1} ",
      "\u{1F9D1}       \u26BD\uFE0F\u{1F9D1}  ",
      "\u{1F9D1}      \u26BD\uFE0F  \u{1F9D1} ",
      "\u{1F9D1}     \u26BD\uFE0F   \u{1F9D1} ",
      "\u{1F9D1}    \u26BD\uFE0F    \u{1F9D1} ",
      "\u{1F9D1}   \u26BD\uFE0F     \u{1F9D1} ",
      "\u{1F9D1}  \u26BD\uFE0F      \u{1F9D1} "
    ]
  },
  mindblown: {
    interval: 160,
    frames: [
      "\u{1F610} ",
      "\u{1F610} ",
      "\u{1F62E} ",
      "\u{1F62E} ",
      "\u{1F626} ",
      "\u{1F626} ",
      "\u{1F627} ",
      "\u{1F627} ",
      "\u{1F92F} ",
      "\u{1F4A5} ",
      "\u2728 ",
      "\u3000 ",
      "\u3000 ",
      "\u3000 "
    ]
  },
  speaker: {
    interval: 160,
    frames: [
      "\u{1F508} ",
      "\u{1F509} ",
      "\u{1F50A} ",
      "\u{1F509} "
    ]
  },
  orangePulse: {
    interval: 100,
    frames: [
      "\u{1F538} ",
      "\u{1F536} ",
      "\u{1F7E0} ",
      "\u{1F7E0} ",
      "\u{1F536} "
    ]
  },
  bluePulse: {
    interval: 100,
    frames: [
      "\u{1F539} ",
      "\u{1F537} ",
      "\u{1F535} ",
      "\u{1F535} ",
      "\u{1F537} "
    ]
  },
  orangeBluePulse: {
    interval: 100,
    frames: [
      "\u{1F538} ",
      "\u{1F536} ",
      "\u{1F7E0} ",
      "\u{1F7E0} ",
      "\u{1F536} ",
      "\u{1F539} ",
      "\u{1F537} ",
      "\u{1F535} ",
      "\u{1F535} ",
      "\u{1F537} "
    ]
  },
  timeTravel: {
    interval: 100,
    frames: [
      "\u{1F55B} ",
      "\u{1F55A} ",
      "\u{1F559} ",
      "\u{1F558} ",
      "\u{1F557} ",
      "\u{1F556} ",
      "\u{1F555} ",
      "\u{1F554} ",
      "\u{1F553} ",
      "\u{1F552} ",
      "\u{1F551} ",
      "\u{1F550} "
    ]
  },
  aesthetic: {
    interval: 80,
    frames: [
      "\u25B0\u25B1\u25B1\u25B1\u25B1\u25B1\u25B1",
      "\u25B0\u25B0\u25B1\u25B1\u25B1\u25B1\u25B1",
      "\u25B0\u25B0\u25B0\u25B1\u25B1\u25B1\u25B1",
      "\u25B0\u25B0\u25B0\u25B0\u25B1\u25B1\u25B1",
      "\u25B0\u25B0\u25B0\u25B0\u25B0\u25B1\u25B1",
      "\u25B0\u25B0\u25B0\u25B0\u25B0\u25B0\u25B1",
      "\u25B0\u25B0\u25B0\u25B0\u25B0\u25B0\u25B0",
      "\u25B0\u25B1\u25B1\u25B1\u25B1\u25B1\u25B1"
    ]
  },
  dwarfFortress: {
    interval: 80,
    frames: [
      " \u2588\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "\u263A\u2588\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "\u263A\u2588\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "\u263A\u2593\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "\u263A\u2593\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "\u263A\u2592\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "\u263A\u2592\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "\u263A\u2591\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "\u263A\u2591\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "\u263A \u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      " \u263A\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      " \u263A\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      " \u263A\u2593\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      " \u263A\u2593\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      " \u263A\u2592\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      " \u263A\u2592\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      " \u263A\u2591\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      " \u263A\u2591\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      " \u263A \u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "  \u263A\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "  \u263A\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "  \u263A\u2593\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "  \u263A\u2593\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "  \u263A\u2592\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "  \u263A\u2592\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "  \u263A\u2591\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "  \u263A\u2591\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "  \u263A \u2588\u2588\u2588\xA3\xA3\xA3  ",
      "   \u263A\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "   \u263A\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "   \u263A\u2593\u2588\u2588\xA3\xA3\xA3  ",
      "   \u263A\u2593\u2588\u2588\xA3\xA3\xA3  ",
      "   \u263A\u2592\u2588\u2588\xA3\xA3\xA3  ",
      "   \u263A\u2592\u2588\u2588\xA3\xA3\xA3  ",
      "   \u263A\u2591\u2588\u2588\xA3\xA3\xA3  ",
      "   \u263A\u2591\u2588\u2588\xA3\xA3\xA3  ",
      "   \u263A \u2588\u2588\xA3\xA3\xA3  ",
      "    \u263A\u2588\u2588\xA3\xA3\xA3  ",
      "    \u263A\u2588\u2588\xA3\xA3\xA3  ",
      "    \u263A\u2593\u2588\xA3\xA3\xA3  ",
      "    \u263A\u2593\u2588\xA3\xA3\xA3  ",
      "    \u263A\u2592\u2588\xA3\xA3\xA3  ",
      "    \u263A\u2592\u2588\xA3\xA3\xA3  ",
      "    \u263A\u2591\u2588\xA3\xA3\xA3  ",
      "    \u263A\u2591\u2588\xA3\xA3\xA3  ",
      "    \u263A \u2588\xA3\xA3\xA3  ",
      "     \u263A\u2588\xA3\xA3\xA3  ",
      "     \u263A\u2588\xA3\xA3\xA3  ",
      "     \u263A\u2593\xA3\xA3\xA3  ",
      "     \u263A\u2593\xA3\xA3\xA3  ",
      "     \u263A\u2592\xA3\xA3\xA3  ",
      "     \u263A\u2592\xA3\xA3\xA3  ",
      "     \u263A\u2591\xA3\xA3\xA3  ",
      "     \u263A\u2591\xA3\xA3\xA3  ",
      "     \u263A \xA3\xA3\xA3  ",
      "      \u263A\xA3\xA3\xA3  ",
      "      \u263A\xA3\xA3\xA3  ",
      "      \u263A\u2593\xA3\xA3  ",
      "      \u263A\u2593\xA3\xA3  ",
      "      \u263A\u2592\xA3\xA3  ",
      "      \u263A\u2592\xA3\xA3  ",
      "      \u263A\u2591\xA3\xA3  ",
      "      \u263A\u2591\xA3\xA3  ",
      "      \u263A \xA3\xA3  ",
      "       \u263A\xA3\xA3  ",
      "       \u263A\xA3\xA3  ",
      "       \u263A\u2593\xA3  ",
      "       \u263A\u2593\xA3  ",
      "       \u263A\u2592\xA3  ",
      "       \u263A\u2592\xA3  ",
      "       \u263A\u2591\xA3  ",
      "       \u263A\u2591\xA3  ",
      "       \u263A \xA3  ",
      "        \u263A\xA3  ",
      "        \u263A\xA3  ",
      "        \u263A\u2593  ",
      "        \u263A\u2593  ",
      "        \u263A\u2592  ",
      "        \u263A\u2592  ",
      "        \u263A\u2591  ",
      "        \u263A\u2591  ",
      "        \u263A   ",
      "        \u263A  &",
      "        \u263A \u263C&",
      "       \u263A \u263C &",
      "       \u263A\u263C  &",
      "      \u263A\u263C  & ",
      "      \u203C   & ",
      "     \u263A   &  ",
      "    \u203C    &  ",
      "   \u263A    &   ",
      "  \u203C     &   ",
      " \u263A     &    ",
      "\u203C      &    ",
      "      &     ",
      "      &     ",
      "     &   \u2591  ",
      "     &   \u2592  ",
      "    &    \u2593  ",
      "    &    \xA3  ",
      "   &    \u2591\xA3  ",
      "   &    \u2592\xA3  ",
      "  &     \u2593\xA3  ",
      "  &     \xA3\xA3  ",
      " &     \u2591\xA3\xA3  ",
      " &     \u2592\xA3\xA3  ",
      "&      \u2593\xA3\xA3  ",
      "&      \xA3\xA3\xA3  ",
      "      \u2591\xA3\xA3\xA3  ",
      "      \u2592\xA3\xA3\xA3  ",
      "      \u2593\xA3\xA3\xA3  ",
      "      \u2588\xA3\xA3\xA3  ",
      "     \u2591\u2588\xA3\xA3\xA3  ",
      "     \u2592\u2588\xA3\xA3\xA3  ",
      "     \u2593\u2588\xA3\xA3\xA3  ",
      "     \u2588\u2588\xA3\xA3\xA3  ",
      "    \u2591\u2588\u2588\xA3\xA3\xA3  ",
      "    \u2592\u2588\u2588\xA3\xA3\xA3  ",
      "    \u2593\u2588\u2588\xA3\xA3\xA3  ",
      "    \u2588\u2588\u2588\xA3\xA3\xA3  ",
      "   \u2591\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "   \u2592\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "   \u2593\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "   \u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "  \u2591\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "  \u2592\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "  \u2593\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      "  \u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      " \u2591\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      " \u2592\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      " \u2593\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      " \u2588\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  ",
      " \u2588\u2588\u2588\u2588\u2588\u2588\xA3\xA3\xA3  "
    ]
  },
  fish: {
    interval: 80,
    frames: [
      "~~~~~~~~~~~~~~~~~~~~",
      "> ~~~~~~~~~~~~~~~~~~",
      "\xBA> ~~~~~~~~~~~~~~~~~",
      "(\xBA> ~~~~~~~~~~~~~~~~",
      "((\xBA> ~~~~~~~~~~~~~~~",
      "<((\xBA> ~~~~~~~~~~~~~~",
      "><((\xBA> ~~~~~~~~~~~~~",
      " ><((\xBA> ~~~~~~~~~~~~",
      "~ ><((\xBA> ~~~~~~~~~~~",
      "~~ <>((\xBA> ~~~~~~~~~~",
      "~~~ ><((\xBA> ~~~~~~~~~",
      "~~~~ <>((\xBA> ~~~~~~~~",
      "~~~~~ ><((\xBA> ~~~~~~~",
      "~~~~~~ <>((\xBA> ~~~~~~",
      "~~~~~~~ ><((\xBA> ~~~~~",
      "~~~~~~~~ <>((\xBA> ~~~~",
      "~~~~~~~~~ ><((\xBA> ~~~",
      "~~~~~~~~~~ <>((\xBA> ~~",
      "~~~~~~~~~~~ ><((\xBA> ~",
      "~~~~~~~~~~~~ <>((\xBA> ",
      "~~~~~~~~~~~~~ ><((\xBA>",
      "~~~~~~~~~~~~~~ <>((\xBA",
      "~~~~~~~~~~~~~~~ ><((",
      "~~~~~~~~~~~~~~~~ <>(",
      "~~~~~~~~~~~~~~~~~ ><",
      "~~~~~~~~~~~~~~~~~~ <",
      "~~~~~~~~~~~~~~~~~~~~"
    ]
  }
};

// node_modules/cli-spinners/index.js
var cli_spinners_default = spinners_default;
var spinnersList = Object.keys(spinners_default);

// node_modules/log-symbols/symbols.js
var symbols_exports = {};
__export(symbols_exports, {
  error: () => error,
  info: () => info,
  success: () => success,
  warning: () => warning
});

// node_modules/yoctocolors/base.js
import tty2 from "tty";
var hasColors = tty2?.WriteStream?.prototype?.hasColors?.() ?? false;
var format = (open, close) => {
  if (!hasColors) {
    return (input) => input;
  }
  const openCode = `\x1B[${open}m`;
  const closeCode = `\x1B[${close}m`;
  return (input) => {
    const string = input + "";
    let index = string.indexOf(closeCode);
    if (index === -1) {
      return openCode + string + closeCode;
    }
    let result = openCode;
    let lastIndex = 0;
    const reopenOnNestedClose = close === 22;
    const replaceCode = (reopenOnNestedClose ? closeCode : "") + openCode;
    while (index !== -1) {
      result += string.slice(lastIndex, index) + replaceCode;
      lastIndex = index + closeCode.length;
      index = string.indexOf(closeCode, lastIndex);
    }
    result += string.slice(lastIndex) + closeCode;
    return result;
  };
};
var reset = format(0, 0);
var bold = format(1, 22);
var dim = format(2, 22);
var italic = format(3, 23);
var underline = format(4, 24);
var underlineDouble = format("4:2", 24);
var underlineCurly = format("4:3", 24);
var underlineDotted = format("4:4", 24);
var underlineDashed = format("4:5", 24);
var overline = format(53, 55);
var inverse = format(7, 27);
var hidden = format(8, 28);
var strikethrough = format(9, 29);
var black = format(30, 39);
var red = format(31, 39);
var green = format(32, 39);
var yellow = format(33, 39);
var blue = format(34, 39);
var magenta = format(35, 39);
var cyan = format(36, 39);
var white = format(37, 39);
var gray = format(90, 39);
var bgBlack = format(40, 49);
var bgRed = format(41, 49);
var bgGreen = format(42, 49);
var bgYellow = format(43, 49);
var bgBlue = format(44, 49);
var bgMagenta = format(45, 49);
var bgCyan = format(46, 49);
var bgWhite = format(47, 49);
var bgGray = format(100, 49);
var redBright = format(91, 39);
var greenBright = format(92, 39);
var yellowBright = format(93, 39);
var blueBright = format(94, 39);
var magentaBright = format(95, 39);
var cyanBright = format(96, 39);
var whiteBright = format(97, 39);
var bgRedBright = format(101, 49);
var bgGreenBright = format(102, 49);
var bgYellowBright = format(103, 49);
var bgBlueBright = format(104, 49);
var bgMagentaBright = format(105, 49);
var bgCyanBright = format(106, 49);
var bgWhiteBright = format(107, 49);
var underlineBlack = format("58;5;0", 59);
var underlineRed = format("58;5;1", 59);
var underlineGreen = format("58;5;2", 59);
var underlineYellow = format("58;5;3", 59);
var underlineBlue = format("58;5;4", 59);
var underlineMagenta = format("58;5;5", 59);
var underlineCyan = format("58;5;6", 59);
var underlineWhite = format("58;5;7", 59);
var underlineGray = format("58;5;8", 59);
var underlineRedBright = format("58;5;9", 59);
var underlineGreenBright = format("58;5;10", 59);
var underlineYellowBright = format("58;5;11", 59);
var underlineBlueBright = format("58;5;12", 59);
var underlineMagentaBright = format("58;5;13", 59);
var underlineCyanBright = format("58;5;14", 59);
var underlineWhiteBright = format("58;5;15", 59);

// node_modules/is-unicode-supported/index.js
import process8 from "process";
function isUnicodeSupported2() {
  const { env: env2 } = process8;
  const { TERM, TERM_PROGRAM } = env2;
  if (process8.platform !== "win32") {
    return TERM !== "linux";
  }
  return Boolean(env2.WT_SESSION) || Boolean(env2.TERMINUS_SUBLIME) || env2.ConEmuTask === "{cmd::Cmder}" || TERM_PROGRAM === "Terminus-Sublime" || TERM_PROGRAM === "vscode" || TERM === "xterm-256color" || TERM === "alacritty" || TERM === "rxvt-unicode" || TERM === "rxvt-unicode-256color" || env2.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}

// node_modules/log-symbols/symbols.js
var _isUnicodeSupported = isUnicodeSupported2();
var info = blue(_isUnicodeSupported ? "\u2139" : "i");
var success = green(_isUnicodeSupported ? "\u2714" : "\u221A");
var warning = yellow(_isUnicodeSupported ? "\u26A0" : "\u203C");
var error = red(_isUnicodeSupported ? "\u2716" : "\xD7");

// node_modules/ansi-regex/index.js
function ansiRegex({ onlyFirst = false } = {}) {
  const ST = "(?:\\u0007|\\u001B\\u005C|\\u009C)";
  const osc = `(?:\\u001B\\][^\\u0007\\u001B\\u009C]*${ST})`;
  const csi = "[\\u001B\\u009B][[\\]()#;?]*(?:\\d{1,4}(?:[;:]\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]";
  const pattern = `${osc}|${csi}`;
  return new RegExp(pattern, onlyFirst ? void 0 : "g");
}

// node_modules/strip-ansi/index.js
var regex = ansiRegex();
function stripAnsi(string) {
  if (typeof string !== "string") {
    throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
  }
  if (!string.includes("\x1B") && !string.includes("\x9B")) {
    return string;
  }
  return string.replace(regex, "");
}

// node_modules/get-east-asian-width/lookup-data.js
var ambiguousMinimalCodePoint = 161;
var ambiguousMaximumCodePoint = 1114109;
var ambiguousRanges = [161, 161, 164, 164, 167, 168, 170, 170, 173, 174, 176, 180, 182, 186, 188, 191, 198, 198, 208, 208, 215, 216, 222, 225, 230, 230, 232, 234, 236, 237, 240, 240, 242, 243, 247, 250, 252, 252, 254, 254, 257, 257, 273, 273, 275, 275, 283, 283, 294, 295, 299, 299, 305, 307, 312, 312, 319, 322, 324, 324, 328, 331, 333, 333, 338, 339, 358, 359, 363, 363, 462, 462, 464, 464, 466, 466, 468, 468, 470, 470, 472, 472, 474, 474, 476, 476, 593, 593, 609, 609, 708, 708, 711, 711, 713, 715, 717, 717, 720, 720, 728, 731, 733, 733, 735, 735, 768, 879, 913, 929, 931, 937, 945, 961, 963, 969, 1025, 1025, 1040, 1103, 1105, 1105, 8208, 8208, 8211, 8214, 8216, 8217, 8220, 8221, 8224, 8226, 8228, 8231, 8240, 8240, 8242, 8243, 8245, 8245, 8251, 8251, 8254, 8254, 8308, 8308, 8319, 8319, 8321, 8324, 8364, 8364, 8451, 8451, 8453, 8453, 8457, 8457, 8467, 8467, 8470, 8470, 8481, 8482, 8486, 8486, 8491, 8491, 8531, 8532, 8539, 8542, 8544, 8555, 8560, 8569, 8585, 8585, 8592, 8601, 8632, 8633, 8658, 8658, 8660, 8660, 8679, 8679, 8704, 8704, 8706, 8707, 8711, 8712, 8715, 8715, 8719, 8719, 8721, 8721, 8725, 8725, 8730, 8730, 8733, 8736, 8739, 8739, 8741, 8741, 8743, 8748, 8750, 8750, 8756, 8759, 8764, 8765, 8776, 8776, 8780, 8780, 8786, 8786, 8800, 8801, 8804, 8807, 8810, 8811, 8814, 8815, 8834, 8835, 8838, 8839, 8853, 8853, 8857, 8857, 8869, 8869, 8895, 8895, 8978, 8978, 9312, 9449, 9451, 9547, 9552, 9587, 9600, 9615, 9618, 9621, 9632, 9633, 9635, 9641, 9650, 9651, 9654, 9655, 9660, 9661, 9664, 9665, 9670, 9672, 9675, 9675, 9678, 9681, 9698, 9701, 9711, 9711, 9733, 9734, 9737, 9737, 9742, 9743, 9756, 9756, 9758, 9758, 9792, 9792, 9794, 9794, 9824, 9825, 9827, 9829, 9831, 9834, 9836, 9837, 9839, 9839, 9886, 9887, 9919, 9919, 9926, 9933, 9935, 9939, 9941, 9953, 9955, 9955, 9960, 9961, 9963, 9969, 9972, 9972, 9974, 9977, 9979, 9980, 9982, 9983, 10045, 10045, 10102, 10111, 11094, 11097, 12872, 12879, 57344, 63743, 65024, 65039, 65533, 65533, 127232, 127242, 127248, 127277, 127280, 127337, 127344, 127373, 127375, 127376, 127387, 127404, 917760, 917999, 983040, 1048573, 1048576, 1114109];
var fullwidthMinimalCodePoint = 12288;
var fullwidthMaximumCodePoint = 65510;
var fullwidthRanges = [12288, 12288, 65281, 65376, 65504, 65510];
var wideMinimalCodePoint = 4352;
var wideMaximumCodePoint = 262141;
var wideRanges = [4352, 4447, 8986, 8987, 9001, 9002, 9193, 9196, 9200, 9200, 9203, 9203, 9725, 9726, 9748, 9749, 9776, 9783, 9800, 9811, 9855, 9855, 9866, 9871, 9875, 9875, 9889, 9889, 9898, 9899, 9917, 9918, 9924, 9925, 9934, 9934, 9940, 9940, 9962, 9962, 9970, 9971, 9973, 9973, 9978, 9978, 9981, 9981, 9989, 9989, 9994, 9995, 10024, 10024, 10060, 10060, 10062, 10062, 10067, 10069, 10071, 10071, 10133, 10135, 10160, 10160, 10175, 10175, 11035, 11036, 11088, 11088, 11093, 11093, 11904, 11929, 11931, 12019, 12032, 12245, 12272, 12287, 12289, 12350, 12353, 12438, 12441, 12543, 12549, 12591, 12593, 12686, 12688, 12773, 12783, 12830, 12832, 12871, 12880, 42124, 42128, 42182, 43360, 43388, 44032, 55203, 63744, 64255, 65040, 65049, 65072, 65106, 65108, 65126, 65128, 65131, 94176, 94180, 94192, 94198, 94208, 101589, 101631, 101662, 101760, 101874, 110576, 110579, 110581, 110587, 110589, 110590, 110592, 110882, 110898, 110898, 110928, 110930, 110933, 110933, 110948, 110951, 110960, 111355, 119552, 119638, 119648, 119670, 126980, 126980, 127183, 127183, 127374, 127374, 127377, 127386, 127488, 127490, 127504, 127547, 127552, 127560, 127568, 127569, 127584, 127589, 127744, 127776, 127789, 127797, 127799, 127868, 127870, 127891, 127904, 127946, 127951, 127955, 127968, 127984, 127988, 127988, 127992, 128062, 128064, 128064, 128066, 128252, 128255, 128317, 128331, 128334, 128336, 128359, 128378, 128378, 128405, 128406, 128420, 128420, 128507, 128591, 128640, 128709, 128716, 128716, 128720, 128722, 128725, 128728, 128732, 128735, 128747, 128748, 128756, 128764, 128992, 129003, 129008, 129008, 129292, 129338, 129340, 129349, 129351, 129535, 129648, 129660, 129664, 129674, 129678, 129734, 129736, 129736, 129741, 129756, 129759, 129770, 129775, 129784, 131072, 196605, 196608, 262141];

// node_modules/get-east-asian-width/utilities.js
var isInRange = (ranges, codePoint) => {
  let low = 0;
  let high = Math.floor(ranges.length / 2) - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const i = mid * 2;
    if (codePoint < ranges[i]) {
      high = mid - 1;
    } else if (codePoint > ranges[i + 1]) {
      low = mid + 1;
    } else {
      return true;
    }
  }
  return false;
};

// node_modules/get-east-asian-width/lookup.js
var commonCjkCodePoint = 19968;
var [wideFastPathStart, wideFastPathEnd] = /* @__PURE__ */ findWideFastPathRange(wideRanges);
function findWideFastPathRange(ranges) {
  let fastPathStart = ranges[0];
  let fastPathEnd = ranges[1];
  for (let index = 0; index < ranges.length; index += 2) {
    const start = ranges[index];
    const end = ranges[index + 1];
    if (commonCjkCodePoint >= start && commonCjkCodePoint <= end) {
      return [start, end];
    }
    if (end - start > fastPathEnd - fastPathStart) {
      fastPathStart = start;
      fastPathEnd = end;
    }
  }
  return [fastPathStart, fastPathEnd];
}
var isAmbiguous = (codePoint) => {
  if (codePoint < ambiguousMinimalCodePoint || codePoint > ambiguousMaximumCodePoint) {
    return false;
  }
  return isInRange(ambiguousRanges, codePoint);
};
var isFullWidth2 = (codePoint) => {
  if (codePoint < fullwidthMinimalCodePoint || codePoint > fullwidthMaximumCodePoint) {
    return false;
  }
  return isInRange(fullwidthRanges, codePoint);
};
var isWide = (codePoint) => {
  if (codePoint >= wideFastPathStart && codePoint <= wideFastPathEnd) {
    return true;
  }
  if (codePoint < wideMinimalCodePoint || codePoint > wideMaximumCodePoint) {
    return false;
  }
  return isInRange(wideRanges, codePoint);
};

// node_modules/get-east-asian-width/index.js
function validate(codePoint) {
  if (!Number.isSafeInteger(codePoint)) {
    throw new TypeError(`Expected a code point, got \`${typeof codePoint}\`.`);
  }
}
function eastAsianWidth(codePoint, { ambiguousAsWide = false } = {}) {
  validate(codePoint);
  if (isFullWidth2(codePoint) || isWide(codePoint) || ambiguousAsWide && isAmbiguous(codePoint)) {
    return 2;
  }
  return 1;
}

// node_modules/string-width/index.js
var segmenter = new Intl.Segmenter();
var zeroWidthClusterRegex = new RegExp("^(?:\\p{Default_Ignorable_Code_Point}|\\p{Control}|\\p{Format}|\\p{Nonspacing_Mark}|\\p{Enclosing_Mark}|\\p{Surrogate})+$", "v");
var leadingNonPrintingRegex = new RegExp("^[\\p{Default_Ignorable_Code_Point}\\p{Control}\\p{Format}\\p{Nonspacing_Mark}\\p{Enclosing_Mark}\\p{Surrogate}]+", "v");
var spacingMarkRegex = new RegExp("\\p{Spacing_Mark}", "v");
var rgiEmojiRegex = new RegExp("^\\p{RGI_Emoji}$", "v");
var unqualifiedKeycapRegex = /^[\d#*]\u20E3$/;
var extendedPictographicRegex = /\p{Extended_Pictographic}/gu;
function isDoubleWidthNonRgiEmojiSequence(segment) {
  if (segment.length > 50) {
    return false;
  }
  if (unqualifiedKeycapRegex.test(segment)) {
    return true;
  }
  if (segment.includes("\u200D")) {
    const pictographics = segment.match(extendedPictographicRegex);
    return pictographics !== null && pictographics.length >= 2;
  }
  return false;
}
function baseVisible(segment) {
  return segment.replace(leadingNonPrintingRegex, "");
}
function isZeroWidthCluster(segment) {
  return zeroWidthClusterRegex.test(segment);
}
function isHangulLeadingJamo(codePoint) {
  return codePoint >= 4352 && codePoint <= 4447 || codePoint >= 43360 && codePoint <= 43388;
}
function isHangulVowelJamo(codePoint) {
  return codePoint >= 4448 && codePoint <= 4519 || codePoint >= 55216 && codePoint <= 55238;
}
function isHangulTrailingJamo(codePoint) {
  return codePoint >= 4520 && codePoint <= 4607 || codePoint >= 55243 && codePoint <= 55291;
}
function isHangulJamo(codePoint) {
  return isHangulLeadingJamo(codePoint) || isHangulVowelJamo(codePoint) || isHangulTrailingJamo(codePoint);
}
function hangulClusterWidth(visibleSegment, eastAsianWidthOptions) {
  const codePoints = [];
  for (const character of visibleSegment) {
    if (zeroWidthClusterRegex.test(character)) {
      continue;
    }
    codePoints.push(character.codePointAt(0));
  }
  if (codePoints.length === 0) {
    return void 0;
  }
  let width = 0;
  for (let index = 0; index < codePoints.length; index++) {
    const codePoint = codePoints[index];
    if (!isHangulJamo(codePoint)) {
      if (width === 0) {
        return void 0;
      }
      for (let remaining = index; remaining < codePoints.length; remaining++) {
        width += eastAsianWidth(codePoints[remaining], eastAsianWidthOptions);
      }
      return width;
    }
    if (isHangulLeadingJamo(codePoint) && isHangulVowelJamo(codePoints[index + 1])) {
      width += 2;
      index += isHangulTrailingJamo(codePoints[index + 2]) ? 2 : 1;
      continue;
    }
    width += eastAsianWidth(codePoint, eastAsianWidthOptions);
  }
  return width;
}
function trailingWidth(visibleSegment, eastAsianWidthOptions) {
  let extra = 0;
  let first = true;
  for (const character of visibleSegment) {
    if (first) {
      first = false;
      continue;
    }
    if (spacingMarkRegex.test(character) || character >= "\uFF00" && character <= "\uFFEF") {
      extra += eastAsianWidth(character.codePointAt(0), eastAsianWidthOptions);
    }
  }
  return extra;
}
function stringWidth(input, options = {}) {
  if (typeof input !== "string" || input.length === 0) {
    return 0;
  }
  const {
    ambiguousIsNarrow = true,
    countAnsiEscapeCodes = false
  } = options;
  let string = input;
  if (!countAnsiEscapeCodes && (string.includes("\x1B") || string.includes("\x9B"))) {
    string = stripAnsi(string);
  }
  if (string.length === 0) {
    return 0;
  }
  if (/^[\u0020-\u007E]*$/.test(string)) {
    return string.length;
  }
  let width = 0;
  const eastAsianWidthOptions = { ambiguousAsWide: !ambiguousIsNarrow };
  for (const { segment } of segmenter.segment(string)) {
    if (isZeroWidthCluster(segment)) {
      continue;
    }
    if (rgiEmojiRegex.test(segment) || isDoubleWidthNonRgiEmojiSequence(segment)) {
      width += 2;
      continue;
    }
    const visibleSegment = baseVisible(segment);
    const hangulWidth = hangulClusterWidth(visibleSegment, eastAsianWidthOptions);
    if (hangulWidth !== void 0) {
      width += hangulWidth;
      continue;
    }
    const codePoint = visibleSegment.codePointAt(0);
    width += eastAsianWidth(codePoint, eastAsianWidthOptions);
    width += trailingWidth(visibleSegment, eastAsianWidthOptions);
  }
  return width;
}

// node_modules/is-interactive/index.js
function isInteractive({ stream = process.stdout } = {}) {
  return Boolean(
    stream && stream.isTTY && process.env.TERM !== "dumb" && !("CI" in process.env)
  );
}

// node_modules/stdin-discarder/index.js
import process9 from "process";
var ASCII_ETX_CODE = 3;
var StdinDiscarder = class {
  #activeCount = 0;
  #stdin;
  #stdinWasPaused = false;
  #stdinWasRaw = false;
  #handleInputBound = (chunk) => {
    if (!chunk?.length) {
      return;
    }
    const code = typeof chunk === "string" ? chunk.codePointAt(0) : chunk[0];
    if (code === ASCII_ETX_CODE) {
      process9.kill(process9.pid, "SIGINT");
    }
  };
  start() {
    this.#activeCount++;
    if (this.#activeCount === 1) {
      this.#realStart();
    }
  }
  stop() {
    if (this.#activeCount === 0) {
      return;
    }
    if (--this.#activeCount === 0) {
      this.#realStop();
    }
  }
  #realStart() {
    const { stdin } = process9;
    if (process9.platform === "win32" || !stdin?.isTTY || typeof stdin.setRawMode !== "function") {
      this.#stdin = void 0;
      return;
    }
    this.#stdin = stdin;
    this.#stdinWasPaused = stdin.isPaused();
    this.#stdinWasRaw = Boolean(stdin.isRaw);
    stdin.setRawMode(true);
    stdin.prependListener("data", this.#handleInputBound);
    if (this.#stdinWasPaused) {
      stdin.resume();
    }
  }
  #realStop() {
    if (!this.#stdin) {
      return;
    }
    const stdin = this.#stdin;
    stdin.off("data", this.#handleInputBound);
    if (stdin.isTTY) {
      stdin.setRawMode?.(this.#stdinWasRaw);
    }
    if (this.#stdinWasPaused) {
      stdin.pause();
    }
    this.#stdin = void 0;
    this.#stdinWasPaused = false;
    this.#stdinWasRaw = false;
  }
};
var stdinDiscarder = new StdinDiscarder();
var stdin_discarder_default = Object.freeze(stdinDiscarder);

// node_modules/ora/index.js
var RENDER_DEFERRAL_TIMEOUT = 200;
var SYNCHRONIZED_OUTPUT_ENABLE = "\x1B[?2026h";
var SYNCHRONIZED_OUTPUT_DISABLE = "\x1B[?2026l";
var activeHooksPerStream = /* @__PURE__ */ new Map();
var validColors = /* @__PURE__ */ new Set(["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white", "gray"]);
var Ora = class {
  #linesToClear = 0;
  #frameIndex = -1;
  #lastFrameTime = 0;
  #options;
  #spinner;
  #stream;
  #id;
  #hookedStreams = /* @__PURE__ */ new Map();
  #isInternalWrite = false;
  #drainHandler;
  #deferRenderTimer;
  #isDiscardingStdin = false;
  #color;
  // Helper to execute writes while preventing hook recursion
  #internalWrite(fn2) {
    this.#isInternalWrite = true;
    try {
      return fn2();
    } finally {
      this.#isInternalWrite = false;
    }
  }
  // Helper to render if still spinning
  #tryRender() {
    if (this.isSpinning) {
      this.render();
    }
  }
  #stringifyChunk(chunk, encoding) {
    if (chunk === void 0 || chunk === null) {
      return "";
    }
    if (typeof chunk === "string") {
      return chunk;
    }
    if (Buffer.isBuffer(chunk) || ArrayBuffer.isView(chunk)) {
      const normalizedEncoding = typeof encoding === "string" && encoding && encoding !== "buffer" ? encoding : "utf8";
      return Buffer.from(chunk).toString(normalizedEncoding);
    }
    return String(chunk);
  }
  #chunkTerminatesLine(chunkString) {
    if (!chunkString) {
      return false;
    }
    const lastCharacter = chunkString.at(-1);
    return lastCharacter === "\n" || lastCharacter === "\r";
  }
  #scheduleRenderDeferral() {
    if (this.#deferRenderTimer) {
      return;
    }
    this.#deferRenderTimer = setTimeout(() => {
      this.#deferRenderTimer = void 0;
      if (this.isSpinning) {
        this.#tryRender();
      }
    }, RENDER_DEFERRAL_TIMEOUT);
    if (typeof this.#deferRenderTimer?.unref === "function") {
      this.#deferRenderTimer.unref();
    }
  }
  #clearRenderDeferral() {
    if (this.#deferRenderTimer) {
      clearTimeout(this.#deferRenderTimer);
      this.#deferRenderTimer = void 0;
    }
  }
  // Helper to build complete line with symbol, text, prefix, and suffix
  #buildOutputLine(symbol, text, prefixText, suffixText) {
    const fullPrefixText = this.#getFullPrefixText(prefixText, " ");
    const separatorText = symbol ? " " : "";
    const fullText = typeof text === "string" ? separatorText + text : "";
    const fullSuffixText = this.#getFullSuffixText(suffixText, " ");
    return fullPrefixText + symbol + fullText + fullSuffixText;
  }
  constructor(options) {
    if (typeof options === "string") {
      options = {
        text: options
      };
    }
    this.#options = {
      color: "cyan",
      stream: process10.stderr,
      discardStdin: true,
      hideCursor: true,
      ...options
    };
    this.color = this.#options.color;
    this.#stream = this.#options.stream;
    if (typeof this.#options.isEnabled !== "boolean") {
      this.#options.isEnabled = isInteractive({ stream: this.#stream });
    }
    if (typeof this.#options.isSilent !== "boolean") {
      this.#options.isSilent = false;
    }
    if (this.#options.interval !== void 0 && !(Number.isInteger(this.#options.interval) && this.#options.interval > 0)) {
      throw new Error("The `interval` option must be a positive integer");
    }
    const userInterval = this.#options.interval;
    this.spinner = this.#options.spinner;
    this.#options.interval = userInterval;
    this.text = this.#options.text;
    this.prefixText = this.#options.prefixText;
    this.suffixText = this.#options.suffixText;
    this.indent = this.#options.indent;
    if (process10.env.NODE_ENV === "test") {
      this._stream = this.#stream;
      this._isEnabled = this.#options.isEnabled;
      Object.defineProperty(this, "_linesToClear", {
        get() {
          return this.#linesToClear;
        },
        set(newValue) {
          this.#linesToClear = newValue;
        }
      });
      Object.defineProperty(this, "_frameIndex", {
        get() {
          return this.#frameIndex;
        }
      });
      Object.defineProperty(this, "_lineCount", {
        get() {
          const columns = this.#stream.columns ?? 80;
          const prefixText = typeof this.#options.prefixText === "function" ? "" : this.#options.prefixText;
          const suffixText = typeof this.#options.suffixText === "function" ? "" : this.#options.suffixText;
          const fullPrefixText = typeof prefixText === "string" && prefixText !== "" ? prefixText + " " : "";
          const fullSuffixText = typeof suffixText === "string" && suffixText !== "" ? " " + suffixText : "";
          const spinnerChar = "-";
          const fullText = " ".repeat(this.#options.indent) + fullPrefixText + spinnerChar + (typeof this.#options.text === "string" ? " " + this.#options.text : "") + fullSuffixText;
          return this.#computeLineCountFrom(fullText, columns);
        }
      });
    }
  }
  get indent() {
    return this.#options.indent;
  }
  set indent(indent = 0) {
    if (!(indent >= 0 && Number.isInteger(indent))) {
      throw new Error("The `indent` option must be an integer from 0 and up");
    }
    this.#options.indent = indent;
  }
  get interval() {
    return this.#options.interval ?? this.#spinner.interval ?? 100;
  }
  get spinner() {
    return this.#spinner;
  }
  set spinner(spinner) {
    this.#frameIndex = -1;
    this.#options.interval = void 0;
    if (typeof spinner === "object") {
      if (!Array.isArray(spinner.frames) || spinner.frames.length === 0 || spinner.frames.some((frame) => typeof frame !== "string")) {
        throw new Error("The given spinner must have a non-empty `frames` array of strings");
      }
      if (spinner.interval !== void 0 && !(Number.isInteger(spinner.interval) && spinner.interval > 0)) {
        throw new Error("`spinner.interval` must be a positive integer if provided");
      }
      this.#spinner = spinner;
    } else if (!isUnicodeSupported2()) {
      this.#spinner = cli_spinners_default.line;
    } else if (spinner === void 0) {
      this.#spinner = cli_spinners_default.dots;
    } else if (spinner !== "default" && cli_spinners_default[spinner]) {
      this.#spinner = cli_spinners_default[spinner];
    } else {
      throw new Error(`There is no built-in spinner named '${spinner}'. See https://github.com/sindresorhus/cli-spinners/blob/main/spinners.json for a full list.`);
    }
  }
  get text() {
    return this.#options.text;
  }
  set text(value = "") {
    this.#options.text = value;
  }
  get prefixText() {
    return this.#options.prefixText;
  }
  set prefixText(value = "") {
    this.#options.prefixText = value;
  }
  get suffixText() {
    return this.#options.suffixText;
  }
  set suffixText(value = "") {
    this.#options.suffixText = value;
  }
  get isSpinning() {
    return this.#id !== void 0;
  }
  #formatAffix(value, separator, placeBefore = false) {
    const resolved = typeof value === "function" ? value() : value;
    if (typeof resolved === "string" && resolved !== "") {
      return placeBefore ? separator + resolved : resolved + separator;
    }
    return "";
  }
  #getFullPrefixText(prefixText = this.#options.prefixText, postfix = " ") {
    return this.#formatAffix(prefixText, postfix, false);
  }
  #getFullSuffixText(suffixText = this.#options.suffixText, prefix = " ") {
    return this.#formatAffix(suffixText, prefix, true);
  }
  #computeLineCountFrom(text, columns) {
    let count = 0;
    for (const line of stripVTControlCharacters4(text).split("\n")) {
      count += Math.max(1, Math.ceil(stringWidth(line) / columns));
    }
    return count;
  }
  get color() {
    return this.#color;
  }
  set color(value) {
    if (value !== void 0 && value !== false && !validColors.has(value)) {
      throw new Error("The `color` option must be a valid color or `false` to disable");
    }
    this.#color = value;
  }
  get isEnabled() {
    return this.#options.isEnabled && !this.#options.isSilent;
  }
  set isEnabled(value) {
    if (typeof value !== "boolean") {
      throw new TypeError("The `isEnabled` option must be a boolean");
    }
    this.#options.isEnabled = value;
  }
  get isSilent() {
    return this.#options.isSilent;
  }
  set isSilent(value) {
    if (typeof value !== "boolean") {
      throw new TypeError("The `isSilent` option must be a boolean");
    }
    this.#options.isSilent = value;
  }
  frame() {
    const now = Date.now();
    if (this.#frameIndex === -1 || now - this.#lastFrameTime >= this.interval) {
      this.#frameIndex = (this.#frameIndex + 1) % this.#spinner.frames.length;
      this.#lastFrameTime = now;
    }
    const { frames } = this.#spinner;
    let frame = frames[this.#frameIndex];
    if (this.#color) {
      frame = source_default[this.#color](frame);
    }
    const fullPrefixText = this.#getFullPrefixText(this.#options.prefixText, " ");
    const fullText = typeof this.text === "string" ? " " + this.text : "";
    const fullSuffixText = this.#getFullSuffixText(this.#options.suffixText, " ");
    return fullPrefixText + frame + fullText + fullSuffixText;
  }
  clear() {
    if (!this.isEnabled || !this.#stream.isTTY) {
      return this;
    }
    this.#internalWrite(() => {
      this.#stream.cursorTo(0);
      for (let index = 0; index < this.#linesToClear; index++) {
        if (index > 0) {
          this.#stream.moveCursor(0, -1);
        }
        this.#stream.clearLine(1);
      }
      if (this.#options.indent) {
        this.#stream.cursorTo(this.#options.indent);
      }
    });
    this.#linesToClear = 0;
    return this;
  }
  // Helper to hook a single stream
  #hookStream(stream) {
    if (!stream || this.#hookedStreams.has(stream) || !stream.isTTY || typeof stream.write !== "function") {
      return;
    }
    if (activeHooksPerStream.has(stream)) {
      console.warn("[ora] Multiple concurrent spinners detected. This may cause visual corruption. Use one spinner at a time.");
    }
    const originalWrite = stream.write;
    this.#hookedStreams.set(stream, originalWrite);
    activeHooksPerStream.set(stream, this);
    stream.write = (chunk, encoding, callback) => this.#hookedWrite(stream, originalWrite, chunk, encoding, callback);
  }
  /**
  Intercept stream writes while spinner is active to handle external writes cleanly without visual corruption.
  Hooks process stdio streams and the active spinner stream so console.log(), console.error(), and direct writes stay tidy.
  */
  #installHook() {
    if (!this.isEnabled || this.#hookedStreams.size > 0) {
      return;
    }
    const streamsToHook = /* @__PURE__ */ new Set([this.#stream, process10.stdout, process10.stderr]);
    for (const stream of streamsToHook) {
      this.#hookStream(stream);
    }
  }
  #uninstallHook() {
    for (const [stream, originalWrite] of this.#hookedStreams) {
      stream.write = originalWrite;
      if (activeHooksPerStream.get(stream) === this) {
        activeHooksPerStream.delete(stream);
      }
    }
    this.#hookedStreams.clear();
  }
  // eslint-disable-next-line max-params -- Need stream and originalWrite for multi-stream support
  #hookedWrite(stream, originalWrite, chunk, encoding, callback) {
    if (typeof encoding === "function") {
      callback = encoding;
      encoding = void 0;
    }
    if (this.#isInternalWrite) {
      return originalWrite.call(stream, chunk, encoding, callback);
    }
    this.clear();
    const chunkString = this.#stringifyChunk(chunk, encoding);
    const chunkTerminatesLine = this.#chunkTerminatesLine(chunkString);
    const writeResult = originalWrite.call(stream, chunk, encoding, callback);
    if (chunkTerminatesLine) {
      this.#clearRenderDeferral();
    } else if (chunkString.length > 0) {
      this.#scheduleRenderDeferral();
    }
    if (this.isSpinning && !this.#deferRenderTimer) {
      this.render();
    }
    return writeResult;
  }
  render() {
    if (!this.isEnabled || this.#drainHandler || this.#deferRenderTimer) {
      return this;
    }
    const useSynchronizedOutput = this.#stream.isTTY;
    let shouldDisableSynchronizedOutput = false;
    try {
      if (useSynchronizedOutput) {
        this.#internalWrite(() => this.#stream.write(SYNCHRONIZED_OUTPUT_ENABLE));
        shouldDisableSynchronizedOutput = true;
      }
      this.clear();
      let frameContent = this.frame();
      const columns = this.#stream.columns ?? 80;
      const actualLineCount = this.#computeLineCountFrom(frameContent, columns);
      const consoleHeight = this.#stream.rows;
      if (consoleHeight && consoleHeight > 1 && actualLineCount > consoleHeight) {
        const lines = frameContent.split("\n");
        const maxLines = consoleHeight - 1;
        frameContent = [...lines.slice(0, maxLines), "... (content truncated to fit terminal)"].join("\n");
      }
      const canContinue = this.#internalWrite(() => this.#stream.write(frameContent));
      if (canContinue === false && this.#stream.isTTY) {
        this.#drainHandler = () => {
          this.#drainHandler = void 0;
          this.#tryRender();
        };
        this.#stream.once("drain", this.#drainHandler);
      }
      this.#linesToClear = this.#computeLineCountFrom(frameContent, columns);
    } finally {
      if (shouldDisableSynchronizedOutput) {
        this.#internalWrite(() => this.#stream.write(SYNCHRONIZED_OUTPUT_DISABLE));
      }
    }
    return this;
  }
  start(text) {
    if (text !== void 0) {
      this.text = text;
    }
    if (this.isSilent) {
      return this;
    }
    if (!this.isEnabled) {
      const symbol = this.text ? "-" : "";
      const line = " ".repeat(this.#options.indent) + this.#buildOutputLine(symbol, this.text, this.#options.prefixText, this.#options.suffixText);
      if (line.trim() !== "") {
        this.#internalWrite(() => this.#stream.write(line + "\n"));
      }
      return this;
    }
    if (this.isSpinning) {
      return this;
    }
    if (this.#options.hideCursor) {
      cli_cursor_default.hide(this.#stream);
    }
    if (this.#options.discardStdin && process10.stdin.isTTY) {
      stdin_discarder_default.start();
      this.#isDiscardingStdin = true;
    }
    this.#installHook();
    this.render();
    this.#id = setInterval(this.render.bind(this), this.interval);
    return this;
  }
  stop() {
    clearInterval(this.#id);
    this.#id = void 0;
    this.#frameIndex = -1;
    this.#lastFrameTime = 0;
    this.#clearRenderDeferral();
    this.#uninstallHook();
    if (this.#drainHandler) {
      this.#stream.removeListener("drain", this.#drainHandler);
      this.#drainHandler = void 0;
    }
    if (this.isEnabled) {
      this.clear();
      if (this.#options.hideCursor) {
        cli_cursor_default.show(this.#stream);
      }
    }
    if (this.#isDiscardingStdin) {
      this.#isDiscardingStdin = false;
      stdin_discarder_default.stop();
    }
    return this;
  }
  succeed(text) {
    return this.stopAndPersist({ symbol: symbols_exports.success, text });
  }
  fail(text) {
    return this.stopAndPersist({ symbol: symbols_exports.error, text });
  }
  warn(text) {
    return this.stopAndPersist({ symbol: symbols_exports.warning, text });
  }
  info(text) {
    return this.stopAndPersist({ symbol: symbols_exports.info, text });
  }
  stopAndPersist(options = {}) {
    if (this.isSilent) {
      return this;
    }
    const symbol = options.symbol ?? " ";
    const text = options.text ?? this.text;
    const prefixText = options.prefixText ?? this.#options.prefixText;
    const suffixText = options.suffixText ?? this.#options.suffixText;
    const textToWrite = this.#buildOutputLine(symbol, text, prefixText, suffixText) + "\n";
    this.stop();
    this.#internalWrite(() => this.#stream.write(textToWrite));
    return this;
  }
};
function ora(options) {
  return new Ora(options);
}

// src/commands/install-base.ts
import { execSync } from "child_process";
var BASE_TEMPLATE_REPO = "github:widiarsa-saputra/base-react";
function registerInstallBaseCommand(program3) {
  program3.command("install:base [targetDir]").alias("init").description("Clone Base React Vite template lengkap dengan Authentication dan AppRouter").action(async (targetDirArg) => {
    console.log(import_picocolors7.default.cyan("\n\u{1F680} Gotra Base React Installer\n"));
    const targetFolder = targetDirArg ? targetDirArg.trim() : await dist_default5({
      message: "Nama folder / direktori proyek:",
      default: "my-react-app",
      validate: (val) => val.trim().length > 0 || "Nama folder tidak boleh kosong"
    });
    const destinationPath = path10.resolve(process.cwd(), targetFolder);
    if (import_fs_extra8.default.existsSync(destinationPath)) {
      const files = await import_fs_extra8.default.readdir(destinationPath);
      if (files.length > 0) {
        const proceed = await dist_default4({
          message: `Folder "${targetFolder}" sudah ada dan tidak kosong. Lanjutkan proses?`,
          default: false
        });
        if (!proceed) return;
      }
    }
    const spinner = ora("Mengunduh Base React Starter Template...").start();
    try {
      const emitter = rs(BASE_TEMPLATE_REPO, {
        cache: false,
        force: true,
        verbose: false
      });
      await emitter.clone(destinationPath);
      spinner.succeed(import_picocolors7.default.green("Base template berhasil diunduh!"));
      const installDeps = await dist_default4({
        message: "Install dependency sekarang (npm install)?",
        default: true
      });
      if (installDeps) {
        const installSpinner = ora("Menginstall dependencies via npm...").start();
        try {
          execSync("npm install", { cwd: destinationPath, stdio: "ignore" });
          installSpinner.succeed(import_picocolors7.default.green("Dependencies berhasil diinstall!"));
        } catch (err) {
          installSpinner.fail(import_picocolors7.default.red("Gagal menginstall dependencies secara otomatis."));
        }
      }
      try {
        execSync("git init", { cwd: destinationPath, stdio: "ignore" });
      } catch {
      }
      console.log(import_picocolors7.default.cyan(`
\u2728 Project siap digunakan di folder "${targetFolder}"!`));
      console.log(import_picocolors7.default.white("\nLangkah selanjutnya:"));
      console.log(import_picocolors7.default.yellow(`  cd ${targetFolder}`));
      console.log(import_picocolors7.default.yellow(`  npm run dev
`));
    } catch (error2) {
      spinner.fail(import_picocolors7.default.red(`Gagal mengunduh template: ${error2.message}`));
    }
  });
}

// src/index.ts
var program2 = new Command();
program2.name("gotra").description("CLI Scaffolding Generator untuk Arsitektur Base React Vite").version("1.2.0");
registerMakeModuleCommand(program2);
registerMakePageCommand(program2);
registerMakeServiceCommand(program2);
registerMakeComponentCommand(program2);
registerMakeHookCommand(program2);
registerInstallBaseCommand(program2);
program2.parse();
