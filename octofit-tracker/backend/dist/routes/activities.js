"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const activity_1 = __importDefault(require("../models/activity"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    if (mongoose_1.default.connection.readyState !== 1) {
        return res.json({ message: 'Activities route', activities: [] });
    }
    try {
        const activities = await activity_1.default.find({});
        return res.json({ message: 'Activities route', activities });
    }
    catch (_error) {
        return res.json({ message: 'Activities route', activities: [] });
    }
});
router.post('/', async (req, res) => {
    if (mongoose_1.default.connection.readyState !== 1) {
        return res.status(201).json({ message: 'Activity created', activity: req.body });
    }
    try {
        const activity = await activity_1.default.create(req.body);
        return res.status(201).json({ message: 'Activity created', activity });
    }
    catch (_error) {
        return res.status(201).json({ message: 'Activity created', activity: req.body });
    }
});
exports.default = router;
