"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (_onClick) {
    return {
        onClick: function onClick() {
            _onClick(text);
        }
    };
};
