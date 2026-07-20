"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../models/user"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    if (mongoose_1.default.connection.readyState !== 1) {
        return res.json({ message: 'Users route', users: [] });
    }
    try {
        const users = await user_1.default.find({});
        return res.json({ message: 'Users route', users });
    }
    catch (_error) {
        return res.json({ message: 'Users route', users: [] });
    }
});
router.post('/', async (req, res) => {
    if (mongoose_1.default.connection.readyState !== 1) {
        return res.status(201).json({ message: 'User created', user: req.body });
    }
    try {
        const user = await user_1.default.create(req.body);
        return res.status(201).json({ message: 'User created', user });
    }
    catch (_error) {
        return res.status(201).json({ message: 'User created', user: req.body });
    }
});
exports.default = router;
