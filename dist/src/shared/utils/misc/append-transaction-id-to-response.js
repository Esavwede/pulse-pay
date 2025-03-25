"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-param-reassign */
function appendTxRefToResponse(payload, value) {
    if (!payload.meta) {
        payload.meta = {};
    }
    payload.meta.txRef = value;
    return payload;
}
exports.default = appendTxRefToResponse;
