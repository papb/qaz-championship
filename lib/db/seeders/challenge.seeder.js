"use strict";

module.exports = {
    name: "challenge",
    values: [
        "QAZWSXEDC",
        "QAZWSXEDCRFVTGBYHNUJMIK,OL.",
        "QWERTYUIOP",
        "the quick brown fox jumps over the lazy dog",
        "3.141592653589793238",
        "to be or not to be",
        "facebook.com",
        "google.com",
        "public static void main"
    ].map(str => {
        return {
            name: str.toUpperCase()
        };
    })
};