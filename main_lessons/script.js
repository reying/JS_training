'use strict';

// Получение DOM элементов:
// на ввод
const btnStart = document.getElementById('start'),
    btnCancel = document.getElementById('cancel'),
    btns = document.getElementsByTagName('button'),
    btnAddIncome = btns[0],
    btnAddExpenses = btns[1],
    depositCheck = document.querySelector('#deposit-check'),
    addIncomeItem = document.querySelectorAll('.additional_income-item'),
    addExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodAmount = document.querySelector('.period-amount');

let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    periodSelect = document.querySelector('.period-select'),
    salaryAmount = document.querySelector('.salary-amount');

// на вывод
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    addIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    addExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0];


// Начало программы

class AppData {
    constructor() {
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
    }
    start() {
            this.budget = +salaryAmount.value;

            this.getExpInc();
            this.getExpensesMonth();
            this.getBudget();
            this.getAddExpInc();

            this.showResult();
            this.blocked();
            btnAddIncome.disabled = true;
            btnAddExpenses.disabled = true;
        }
        // вывод значений
    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        addExpensesValue.value = this.addExpenses.join(', ');
        addIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriodTargetMonth();

        periodSelect.addEventListener('input', () => {
            incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
            incomePeriodValue.value = this.calcPeriodTargetMonth();
        });
    }
    blocked() {
        document.querySelectorAll('.data input[type=text]').forEach((item) => {
            item.disabled = (item.disabled === false) ? true : false;
        });
        if (btnStart.style.display === '' || btnCancel.style.display === '') {
            btnStart.style.display = 'none';
            btnCancel.style.display = 'block';
        } else {
            btnStart.style.display = (btnStart.style.display === 'none') ? 'block' : 'none';
            btnCancel.style.display = (btnCancel.style.display === 'block') ? 'none' : 'block';
        }

    }

    // добавление строк дополнительных доходов и обязательных расходов (max 3)
    addIncExpBlocks(event) {
        const elem = event.target.className.replaceAll('_', ' ').split(' ')[2];
        const items = document.querySelectorAll(`.${elem}-items`);

        const cloneItems = items[0].cloneNode(true);
        cloneItems.querySelectorAll('input')[0].value = '';
        cloneItems.querySelectorAll('input')[1].value = '';
        items[0].parentNode.insertBefore(cloneItems, event.target);
        if (document.querySelectorAll(`.${elem}-items`).length === 3) {
            event.target.style.display = 'none';
        }

    }

    // получение данных об обязательных доходах и расходах
    getExpInc() {
        const count = (item) => {
            const startClass = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startClass}-title`).value;
            const itemAmount = item.querySelector(`.${startClass}-amount`).value;
            if (itemTitle !== '' && itemAmount !== '') {
                this[startClass][itemTitle] = itemAmount;
            }
        };

        expensesItems.forEach(count);
        incomeItems.forEach(count);

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }

    // получение данных о возможных доходах и расходах
    getAddExpInc() {
        const count = (item) => {
            let className = '';
            if (item.className) {
                className = item.className.replaceAll('_', '-').split('-')[1];
                item = item.value.trim();
            } else { item = item.trim(); }
            const expInc = (className !== 'income') ? 'addExpenses' : `add${className[0].toUpperCase() +
                 className.substring(1)}`;

            if (item !== '') {
                this[expInc].push(item);
            }
        };

        addExpensesItem.value.split(',').forEach(count);
        addIncomeItem.forEach(count);
    }

    // определение суммы обязательных расходов
    getExpensesMonth() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
        return this.expensesMonth;
    }

    // определение месячного бюджета
    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    }

    // определение периода достижения цели в мес-х
    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    }

    // вычисление периода достижения цели в месяцах
    calcPeriodTargetMonth() {
        return this.budgetMonth * periodSelect.value;
    }

    // получение значения периода расчета div от range
    getCalcPeriod() {
        periodSelect = document.querySelector('.period-select');
        periodAmount.textContent = periodSelect.value;
    }

    resettingData() {
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
    }

    resettingInputs() {
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length > 1) {
            for (let i = 1; i < incomeItems.length; i++) {
                incomeItems[i].remove();
            }
        }
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length > 1) {
            for (let i = 1; i < expensesItems.length; i++) {
                expensesItems[i].remove();
            }
        }

        btnAddIncome.style.display = 'block';
        btnAddExpenses.style.display = 'block';

        document.querySelectorAll('input').forEach((item) => {
            item.value = '';
        });
        periodSelect.value = 1;
        this.getCalcPeriod();
    }

    reset() {
        this.resettingData();
        this.blocked();
        this.resettingInputs();
        btnStart.disabled = true;
        btnAddIncome.disabled = false;
        btnAddExpenses.disabled = false;
    }

    eventsListeners() {
        btnStart.disabled = true;
        // Запреты на ввод для сумм и наименований
        document.addEventListener('click', (event) => {
            const elem = event.target;
            if (elem.placeholder === 'Сумма') {
                elem.addEventListener('input', function() {
                    this.value = this.value.replace(/[^\d]/g, '');
                    if (elem === salaryAmount) {
                        salaryAmount = document.querySelector('.salary-amount');
                        const number = +salaryAmount.value;
                        if (typeof number !== 'number' || number === 0) {
                            btnStart.disabled = true;
                        } else {
                            btnStart.disabled = false;
                        }
                    }
                });
            }
            if (elem.placeholder === 'Наименование') {
                elem.addEventListener('input', function() {
                    this.value = this.value.replace(/[^А-я\s,]/g, '');
                });
                elem.addEventListener('blur', function() {
                    this.value = this.value.trim();
                });
            }
        });

        /* События */
        salaryAmount.addEventListener('input', this.checkSalaryAmount);
        btnStart.addEventListener('click', this.start.bind(this));
        btnCancel.addEventListener('click', this.reset.bind(this));
        btnAddExpenses.addEventListener('click', this.addIncExpBlocks);
        btnAddIncome.addEventListener('click', this.addIncExpBlocks);
        periodSelect.addEventListener('input', this.getCalcPeriod);
    }

}



const appData = new AppData();
appData.eventsListeners();

console.log(appData);