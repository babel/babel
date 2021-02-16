"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Something = void 0;

var _firebaseAdmin = require("firebase-admin");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

let Something = function Something(messaging) {
  _classCallCheck(this, Something);

  this.messaging = messaging;
};

exports.Something = Something;
