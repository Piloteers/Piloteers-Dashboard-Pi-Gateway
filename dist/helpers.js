"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractFirstQuotedText = (str) => {
    const matches = str.match(/"(.*?)"/);
    return matches
        ? matches[1]
        : str;
};
//# sourceMappingURL=helpers.js.map