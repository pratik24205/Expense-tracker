"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = __importDefault(require("../middlewares/authenticate"));
const pool_1 = __importDefault(require("../db/pool"));
const router = (0, express_1.Router)();
// Add Income
router.post('/add-income', authenticate_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_name = req.user_name;
    const { amount } = req.body;
    if (!user_name) {
        return res.status(400).json({ error: 'User not authenticated' });
    }
    try {
        const result = yield pool_1.default.query('INSERT INTO income (user_name, amount) VALUES ($1, $2) RETURNING *', [user_name, amount]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
// Get Income
router.get('/get-income', authenticate_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_name = req.user_name;
    if (!user_name) {
        return res.status(400).json({ error: 'User not authenticated' });
    }
    try {
        const result = yield pool_1.default.query('SELECT * FROM income WHERE user_name = $1', [user_name]);
        res.json(result.rows);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
exports.default = router;
