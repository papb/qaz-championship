"use strict";

/**
 * Get a string representation of the current moment.
 * 
 * The string follows the pattern of the following example: 2018-07-22_20h04min29s
 * 
 * @return {string}
 */
module.exports = function getNowString() {
    const reg = /^(.+)T(.+):(.+):(.+)\.\d{3}Z$/;
    const str = new Date().toJSON();
    const res = reg.exec(str);
    return res[1] + "_" + res[2] + "h" + res[3] + "min" + res[4] + "s";
};