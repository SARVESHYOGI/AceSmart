"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchModel = void 0;
const mongoose_1 = require("mongoose");
const BatchSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    teacherId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    studentIds: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
});
exports.BatchModel = (0, mongoose_1.model)('Batch', BatchSchema);
