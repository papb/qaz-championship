"use strict";

function sanitizeHTMLInText(text) {
    const map = { '&': 'amp', '<': 'lt', '>': 'gt', '"': 'quot', "'": '#039' };
    return text.replace(/[&<>"']/g, m => `&${map[m]};`);
}

module.exports = sanitizeHTMLInText;