/**
 * ES6 class with fat arrow inner functions
 */

'use strict';

/**
 * @class Polygon
 * The main polygon class
 */
class Polygon {

    /**
     * Class constructor
     * @param {*} height
     * @param {*} width
     */
    constructor(height, width) {
        this.name = 'Polygon';
        this.height = height;
        this.width = width;
    }

    /**
     * @name sayName
     * @function
     * @inner
     * A helper function to say name
     */
    sayName = () => {
        console.log('Hi, I am a ', this.name + '.');
    }

    /**
     * @name sayHistory
     * @function
     * @inner
     * A helper function to say name
     */
    sayHistory = () => {
        console.log('"Polygon" is derived from the Greek polus (many) ' + 'and gonia (angle).');
    }
}

module.exports = Polygon;
