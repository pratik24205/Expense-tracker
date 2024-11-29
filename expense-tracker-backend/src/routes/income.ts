import { Router, Request, Response } from 'express';
import authenticate from '../middlewares/authenticate';
import pool from '../db/pool';

const router = Router();

// Add Income
router.post('/add-income', authenticate, async (req: Request, res: Response) => {
    const user_name = req.user_name;
    const { amount } = req.body;

    if (!user_name) {
        return res.status(400).json({ error: 'User not authenticated' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO income (user_name, amount) VALUES ($1, $2) RETURNING *',
            [user_name, amount]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

// Get Income
router.get('/get-income', authenticate, async (req: Request, res: Response) => {
    const user_name = req.user_name;

    if (!user_name) {
        return res.status(400).json({ error: 'User not authenticated' });
    }

    try {
        const result = await pool.query('SELECT * FROM income WHERE user_name = $1', [user_name]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

export default router;
