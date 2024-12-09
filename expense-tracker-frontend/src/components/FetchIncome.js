import React, { useState, useEffect } from 'react';
import api from '../api';

function FetchIncome() {
    const [income, setIncome] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/income/get-income');
                setIncome(response.data);
            } catch (error) {
                console.error('Error fetching income:', error.response?.data?.error || error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Your Income</h2>
            <ul>
                {income.map((record) => (
                    <li key={record.income_id}>
                        {record.amount} - {new Date(record.created_at).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FetchIncome;
