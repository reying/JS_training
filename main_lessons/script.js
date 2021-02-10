'use strict';

// Ф-я проверки на числовой тип
const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n) && (n > 0);
};
// Проверка на число запрашиваемых даных
const checkingRequestedNumber = function(variable, question, value) {
    do {
        variable = prompt(question, value);
        if (variable === null) {
            break;
        }
        variable = +variable.trim();
    }
    while (!isNumber(variable));
    return variable;
};
// Проверка на текст запрашиваемых даных
const checkingRequestedText = function(variable, question, value) {
    do {
        variable = prompt(question, value);
        if (variable === null) {
            break;
        }
        variable = variable.trim();
    }
    while (isNumber(variable) || variable === '');
    return variable;
};

// Получение DOM элементов:
// на ввод
const btnStartCalc = document.getElementById('start'),
    btnCancel = document.getElementById('cancel'),
    btnAddIncome = document.getElementsByTagName('button')[0],
    btnAddExpenses = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    addIncomeItem = document.querySelectorAll('.additional_income-item'),
    incomeTitle = document.querySelectorAll('.income-items > .income-title'),
    incomeAmount = document.querySelectorAll('.income-items > .income-amount'),
    expensesTitle = document.querySelectorAll('.expenses-items > .expenses-title'),
    expensesAmount = document.querySelectorAll('.expenses-items > .expenses-amount'),
    addExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select');
// на вывод
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    addIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    addExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0];

console.log(btnStartCalc);
console.log(btnCancel);
console.log(btnAddIncome);
console.log(btnAddExpenses);
console.log(depositCheck);
console.log(addIncomeItem);
console.log(incomeTitle);
console.log(incomeAmount);
console.log(expensesTitle);
console.log(expensesAmount);
console.log(addExpensesItem);
console.log(depositAmount);
console.log(depositPercent);
console.log(targetAmount);
console.log(periodSelect);
console.log(budgetMonthValue);
console.log(budgetDayValue);
console.log(expensesMonthValue);
console.log(addIncomeValue);
console.log(addExpensesValue);
console.log(incomePeriodValue);
console.log(targetMonthValue);

// Начало программы
let money;
const start = function() {
    do {
        money = prompt('Ваш месячный доход?', 50000);
        if (money === null) {
            break;
        }
        money = +money;
    }
    while (!isNumber(money));
};
start();

/* Присвоение значений переменным: */
let appData = {
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    addIncom: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 300000,
    period: 3,
    asking: function() {

        if (confirm('Есть ли у вас дополнительный источник заработка?')) {
            let itemIncome;
            let cashIncome;

            itemIncome = checkingRequestedText(itemIncome, 'Какой у вас дополнительный заработок?', 'Подработка');
            cashIncome = checkingRequestedNumber(cashIncome, 'Сколько в месяц вы на этом зарабатываете?', 10000);

            appData.income[itemIncome] = cashIncome;
        }

        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        let addExpenses;
        addExpenses = checkingRequestedText(addExpenses,
            'Укажите возможные расходы за рассчитываемый период через запятую');
        if (addExpenses !== null && addExpenses !== '') {
            appData.addExpenses = addExpenses.toLowerCase().split(',');
        }

        for (let i = 0, ex = 0, vel = 0; i < 2; i++) {
            ex = checkingRequestedText(ex, 'Введите обязательную статью расходов?', 'Продукты');
            vel = checkingRequestedNumber(vel, 'Во сколько это обойдется?', 8000);

            appData.expenses[ex] = vel;
        }
    },
    // определение суммы обязательных расходов
    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
        return appData.expensesMonth;
    },
    // определение месячного бюджета
    getBudget: function() {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);

    },
    // определение периода достижения цели в мес-х
    getTargetMonth: function() {
        return Math.ceil(appData.mission / appData.budgetMonth);
    },
    // определениt уровня дохода
    getStatusIncome: function() {
        if (appData.budgetDay >= 1200) {
            return 'У вас высокий уровень дохода';
        } else if (appData.budgetDay < 1200 & appData.budgetDay >= 600) {
            return 'У вас средний уровень дохода';
        } else if (appData.budgetDay < 600 & appData.budgetDay >= 0) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else {
            return 'Что то пошло не так';
        }
    },
    // определение возможности достижения цели
    achievedTarget: function() {
        let targetMonth;
        if (isNumber(appData.getTargetMonth())) {
            targetMonth = 'Период достижения цели: ' + appData.getTargetMonth() + ' мес.';
        } else {
            targetMonth = 'Цель не будет достигнута';
        }
        return targetMonth;
    },
    getInfoDeposit: function() {
        if (appData.deposit) {
            appData.percentDeposit = checkingRequestedNumber(appData.percentDeposit, 'Какой годовой процент?', 6);

            appData.moneyDeposit = checkingRequestedNumber(appData.moneyDeposit, 'Какая сумма заложена?', 10000);
        }
    },
    calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
    }
};

/* Вычисления */
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getInfoDeposit();

/* Вывод в консоль */
console.log('Расходы за месяц:', appData.expensesMonth, 'руб.');
console.log(appData.achievedTarget());
console.log(appData.getStatusIncome());

// Первый способ вывода addExpenses
const transformedAddExpenses = function() {
    if (appData.addExpenses.length === 0) {
        return 'Возможные расходы не были введены!';
    } else {
        const upPer = function(value) {
            return value[0].toUpperCase() + value.substring(1);
        };
        return appData.addExpenses.map(upPer).join(', ');
    }
};

console.log(transformedAddExpenses());