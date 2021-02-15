'use strict';

// // Ф-я проверки на числовой тип
// const isNumber = function(n) {
//     return !isNaN(parseFloat(n)) && isFinite(n) && (n > 0);
// };
// // Проверка на число запрашиваемых даных
// const checkingRequestedNumber = function(variable, question, value) {
//     do {
//         variable = prompt(question, value);
//         if (variable === null) {
//             break;
//         }
//         variable = +variable.trim();
//     }
//     while (!isNumber(variable));
//     return variable;
// };
// // Проверка на текст запрашиваемых даных
// const checkingRequestedText = function(variable, question, value) {
//     do {
//         variable = prompt(question, value);
//         if (variable === null) {
//             break;
//         }
//         variable = variable.trim();
//     }
//     while (isNumber(variable) || variable === '');
//     return variable;
// };

// Получение DOM элементов:
// на ввод
let btnStart = document.getElementById('start'),
    btnCancel = document.getElementById('cancel'),
    btns = document.getElementsByTagName('button'),
    btnAddIncome = btns[0],
    btnAddExpenses = btns[1],
    depositCheck = document.querySelector('#deposit-check'),
    addIncomeItem = document.querySelectorAll('.additional_income-item'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    addExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
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
btnStart.disabled = true;
/* Присвоение значений переменным: */
let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    // запуск программы
    start: function() {
        this.resettingData();

        this.budget = +salaryAmount.value;

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getBudget();
        this.getAddExpenses();
        this.getAddIncome();

        this.showResult();
    },
    // вывод значений
    showResult: function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        addExpensesValue.value = this.addExpenses.join(', ');
        addIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriodTargetMonth();

        periodSelect.addEventListener('input', function() {
            incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
            incomePeriodValue.value = this.calcPeriodTargetMonth();
        });
    },
    // добавление строк дополнительных доходов (max 3)
    addIncomeBlock: function() {
        let cloneIncomeItems = incomeItems[0].cloneNode(true);
        cloneIncomeItems.querySelectorAll('input')[0].value = '';
        cloneIncomeItems.querySelectorAll('input')[1].value = '';
        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, btnAddIncome);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            btnAddIncome.style.display = 'none';
        }
    },
    // добавление строк обязательных расходов (max 3)
    addExpensesBlock: function() {
        let cloneExpensesItems = expensesItems[0].cloneNode(true);
        cloneExpensesItems.querySelectorAll('input')[0].value = '';
        cloneExpensesItems.querySelectorAll('input')[1].value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems, btnAddExpenses);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            btnAddExpenses.style.display = 'none';
        }
    },
    // получение данных об обязательных статьях расходов
    getExpenses: function() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
            }
        }, this);
    },
    getIncome: function() {
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = cashIncome;
            }
        }, this);

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    },
    getAddExpenses: function() {
        let addExpenses = addExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        }, this);
    },
    getAddIncome: function() {
        addIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        }, this);
    },
    // определение суммы обязательных расходов
    getExpensesMonth: function() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
        return this.expensesMonth;
    },
    // определение месячного бюджета
    getBudget: function() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    // определение периода достижения цели в мес-х
    getTargetMonth: function() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    },
    // определениt уровня дохода
    // getStatusIncome: function() {
    //     if (appData.budgetDay >= 1200) {
    //         return 'У вас высокий уровень дохода';
    //     } else if (appData.budgetDay < 1200 & appData.budgetDay >= 600) {
    //         return 'У вас средний уровень дохода';
    //     } else if (appData.budgetDay < 600 & appData.budgetDay >= 0) {
    //         return 'К сожалению у вас уровень дохода ниже среднего';
    //     } else {
    //         return 'Что то пошло не так';
    //     }
    // },
    // определение возможности достижения цели
    // achievedTarget: function() {
    //     let targetMonth;
    //     if (isNumber(appData.getTargetMonth())) {
    //         targetMonth = 'Период достижения цели: ' + appData.getTargetMonth() + ' мес.';
    //     } else {
    //         targetMonth = 'Цель не будет достигнута';
    //     }
    //     return targetMonth;
    // },
    // getInfoDeposit: function() {
    //     if (appData.deposit) {
    //         appData.percentDeposit = checkingRequestedNumber(appData.percentDeposit, 'Какой годовой процент?', 6);

    //         appData.moneyDeposit = checkingRequestedNumber(appData.moneyDeposit, 'Какая сумма заложена?', 10000);
    //     }
    // },

    // вычисление периода достижения цели в месяцах
    calcPeriodTargetMonth: function() {
        return this.budgetMonth * periodSelect.value;
    },
    // получение значения периода расчета div от range
    getCalcPeriod: function() {
        periodSelect = document.querySelector('.period-select');
        periodAmount.textContent = periodSelect.value;
    },
    // проверка наличия значения месячного дохода
    checkSalaryAmount: function() {
        salaryAmount = document.querySelector('.salary-amount');
        salaryAmount.value = salaryAmount.value.replace(/[^\d]/g, '');
        salaryAmount.value = salaryAmount.value.trim();
        if (salaryAmount.value === '') {
            btnStart.disabled = true;
        } else {
            btnStart.disabled = false;
        }
    },
    resettingData: function() {
        console.log('ok');
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
};

/* События */
salaryAmount.addEventListener('input', appData.checkSalaryAmount);
btnStart.addEventListener('click', appData.start.bind(appData));
btnAddExpenses.addEventListener('click', appData.addExpensesBlock);
btnAddIncome.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.getCalcPeriod);

// Запреты на ввод для сумм и наименований
document.addEventListener('click', function(event) {
    let elem = event.target;
    if (elem.placeholder === 'Сумма') {
        elem.addEventListener('input', function() {
            this.value = this.value.replace(/[^\d]/g, '');
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


// const transformedAddExpenses = function() {
//     if (appData.addExpenses.length === 0) {
//         return 'Возможные расходы не были введены!';
//     } else {
//         const upPer = function(value) {
//             return value[0].toUpperCase() + value.substring(1);
//         };
//         return appData.addExpenses.map(upPer).join(', ');
//     }
// };