import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db/pool';

const router = Router();

// Register
router.post('/register', async (req: Request, res: Response) => {
    const { user_name, password, email } = req.body;

    try {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const result = await pool.query(
            'INSERT INTO users (user_name, password, email) VALUES ($1, $2, $3) RETURNING *',
            [user_name, hashedPassword, email]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
    const { user_name, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE user_name = $1', [user_name]);
        const user = result.rows[0];

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ user_name: user.user_name }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

export default router;
