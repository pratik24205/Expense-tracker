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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const pool_1 = __importDefault(require("../db/pool"));
const router = (0, express_1.Router)();
// Register
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_name, password, email } = req.body;
    try {
        const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
        const result = yield pool_1.default.query('INSERT INTO users (user_name, password, email) VALUES ($1, $2, $3) RETURNING *', [user_name, hashedPassword, email]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
// Login
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_name, password } = req.body;
    try {
        const result = yield pool_1.default.query('SELECT * FROM users WHERE user_name = $1', [user_name]);
        const user = result.rows[0];
        if (!user || !bcryptjs_1.default.compareSync(password, user.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ user_name: user.user_name }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
exports.default = router;
