import React, { useState } from 'react';
import api from '../api';

function AddIncome() {
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/income/add-income', { amount });
            setMessage(`Income added: ${response.data.amount}`);
        } catch (error) {
            setMessage(error.response?.data?.error || 'Error adding income');
        }
    };

    return (
        <div>
            <h2>Add Income</h2>
            <form onSubmit={handleSubmit}>
                <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                <button type="submit">Add</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default AddIncome;
