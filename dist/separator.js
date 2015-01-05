(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* jslint browser: true */

(function (root, factory) {

    'use strict';
    root.separator = factory();

}(window, function() {

    'use strict';
    return require('./separator');

}));

},{"./separator":2}],2:[function(require,module,exports){
'use strict';

/**
 * Create a new separator
 * 
 * @param {string} piece - a string that will become the full separator
 * @param {number} length - character length of the final separator
 * @param {number} [height=1] - character height of the separator
 * @class
 */
function Separator(piece, length, height) {
    this.piece = piece + '';
    this.length = (length && !isNaN(length)) ? length : 0;
    this.height = (height && !isNaN(height)) ? height : 1;
}

module.exports = Separator;

/**
 * Return a single separator line
 *
 * @param {number} [length=this.length] - character length of separator
 * @param {number} [height=this.height] - character height of separator
 * return {string}
 */
Separator.prototype.get = 
function getSeparator(length, height) {
    length = (length && !isNaN(length)) ? length : this.length;
    height = (height && !isNaN(height)) ? height : this.height;

    var result = '';

    // Lengthen it up
    if (this.piece && this.piece.length) {

        while (result.length < length)
            result += this.piece;
    }

    // Make sure the result length doesn't go over any
    var row = result.slice(0, length);

    // Make the height match
    for (var i = 1; i < height; i++)
        result += '\n' + row;

    return result;
};


/**
 * Execute a block of code and put separators around it
 *
 * @param {function} cb
 * @param {number} [length=this.length] - character length of separator
 * @param {number} [height=this.height] - character height of separator
 * @param {string} [logtype='log'] - log function to use
 * return {Separator}
 */
Separator.prototype.surround =
function surround(cb, length, height, logtype) {
    this.log(length, height, logtype);

    cb();

    this.log(length, height, logtype);
    return this;
};


/**
 * Execute an asynchronous block of code and put separators around it
 *
 * Yo Dawg, I heard you like callbacks so we supply a callback to the callback
 * so that the ending log isn't done until it's done.
 *
 * @param {function} cb - a `done` callback is supplied as first argument
 * @param {number} [length=this.length] - character length of separator
 * @param {number} [height=this.height] - character height of separator
 * @param {string} [logtype='log'] - log function to use
 * return {Separator}
 */
Separator.prototype.asyncSurround =
function surround(cb, length, height, logtype) {
    this.log(length, height, logtype);

    cb(function() {
        this.log(length, height, logtype);
    }.bind(this));

    // Ending log has to be called from the async function...

    return this;
};


/**
 * Log the separator
 *
 * @param {number} [length=this.length] - character length of separator
 * @param {number} [height=this.height] - character height of separator
 * @param {string} [logtype='log'] - log function to use
 * @returns {Separator}
 */
Separator.prototype.log = 
Separator.prototype.print = 
function logSeparator(length, height, logtype) {
    logtype = (logtype && typeof(logtype) === 'string') ? logtype : 'log';

    console[logtype](this.get(length, height));
    
    return this;
};

Separator.prototype.info = 
function infoSeparator(length, height) {
    return this.log(length, height, 'info');
};

Separator.prototype.wrn = 
Separator.prototype.warn = 
Separator.prototype.warning = 
function warnSeparator(length, height) {
    return this.log(length, height, 'warn');
};

Separator.prototype.err = 
Separator.prototype.error = 
function errorSeparator(length, height) {
    return this.log(length, height, 'error');
};

},{}]},{},[1])