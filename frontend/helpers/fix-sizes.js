"use strict";

module.exports = function() {
    const elements = Array.prototype.slice.call(document.querySelectorAll(".javascriptFixSizes"));
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
            element.style.width = rect.width + "px";
            element.style.height = rect.height + "px";
        }
    });
};