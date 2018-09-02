"use strict";

function replaceArray(baseArray, otherArray) {
    baseArray.splice(0, baseArray.length, ...otherArray);
    return baseArray;
}

function mapInPlace(array, mapFunction) {
    return replaceArray(array, array.map(mapFunction));
}

function sortBy(array, valuePicker, reverse = false) {
    const n = reverse ? -1 : 1;
    mapInPlace(array, x => ({ value: x, picked: valuePicker(x) }));
    array.sort((a, b) => a.picked < b.picked ? -n : a.picked === b.picked ? 0 : n);
    mapInPlace(array, x => x.value);
    return array;
}

module.exports = sortBy;