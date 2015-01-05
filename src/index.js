'use strict';

var Separator = require('./separator');

function NodeSeparator() {
    this.options = {
        defaultPiece: '-',
        length: 80,
        height: 1
    };
}


/**
 * Get or set options
 */
NodeSeparator.prototype.option = 
NodeSeparator.prototype.options = 
function (name, value) {
    if (arguments.length === 2) {
        this.options[name] = value;
    } else {
        return this.options[name];
    }

    return this;
};


/**
 * Create a new separator
 * 
 * @param {string} piece - a string that will become the full separator
 * @param {number} length - character length of the final separator
 * @param {number} [height=1] - character height of the separator
 * @returns {Separator}
 */
NodeSeparator.prototype.__ =
NodeSeparator.prototype.separator =
function(piece, length, height) {
    piece  = (piece || this.options.defaultPiece);
    length = (length && !isNaN(length)) ? length : this.options.length;
    height = (height && !isNaN(height)) ? height : this.options.height;

    return new Separator(piece, length, height);
};


module.exports = new NodeSeparator();
