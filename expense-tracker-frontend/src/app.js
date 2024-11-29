
function getIncome() {
    fetch('http://localhost:3000/get-income/1') 
        .then(response => response.json())
        .then(data => {
            const incomeList = document.getElementById('income-list');
            incomeList.innerHTML = ''; 
            data.forEach(income => {
                const listItem = document.createElement('li');
                listItem.textContent = `Amount: $${income.amount} | Date: ${new Date(income.date).toLocaleString()}`;
                incomeList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching income:', error));
}

function getExpenses() {
    fetch('http://localhost:3000/get-expenses/1') 
        .then(response => response.json())
        .then(data => {
            const expenseList = document.getElementById('expense-list');
            expenseList.innerHTML = ''; 
            data.forEach(expense => {
                const listItem = document.createElement('li');
                listItem.textContent = `Category: ${expense.category} | Amount: $${expense.amount} | Date: ${new Date(expense.date).toLocaleString()}`;
                expenseList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching expenses:', error));
}

function addIncome() {
    const amount = document.getElementById('income-amount').value;
    if (amount) {
        fetch('http://localhost:3000/add-income', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: 1,  
                amount: parseFloat(amount)
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Income added:', data);
                getIncome(); 
            })
            .catch(error => console.error('Error adding income:', error));
    }
}

function addExpense() {
    const category = document.getElementById('expense-category').value;
    const amount = document.getElementById('expense-amount').value;
    if (category && amount) {
        fetch('http://localhost:3000/add-expense', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: 1, 
                category: category,
                amount: parseFloat(amount)
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Expense added:', data);
                getExpenses();  
            })
            .catch(error => console.error('Error adding expense:', error));
    }
}

window.onload = () => {
    getIncome();
    getExpenses();
};
