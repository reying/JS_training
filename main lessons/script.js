'use strict';

// Ф-я проверки на числовой тип
const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n) && (n > 0);
};
// Проверка на число запрашиваемых даных
const checkingRequestedNumber = function(variable, question, value) {
    do {
        variable = +prompt(question, value).trim();
    }
    while (!isNumber(variable));
    return variable;
};
// Проверка на текст запрашиваемых даных
const checkingRequestedText = function(variable, question, value) {
    do {
        variable = prompt(question, value).trim();
    }
    while (isNumber(variable) || variable === '');
    return variable;
};


// Начало программы
let money;
const start = function() {
    do {
        money = +prompt('Ваш месячный доход?', 50000);
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
        const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
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


// console.log('Цель - заработать', appData.mission, 'рублей');
// console.log('Месячный доход:', money);
// console.log('Бюджет на месяц, с учетом расходов:', appData.budgetMonth, 'руб.');
// console.log('Бюджет на день:', appData.budgetDay, 'руб.');

/* Вывод в консоль */
console.log('Расходы за месяц:', appData.expensesMonth, 'руб.');
console.log(appData.achievedTarget());
console.log(appData.getStatusIncome());

// console.log('');
// console.log('Наша программа включает в себя данные:');
// for (let key in appData) {
//     console.log(key, appData[key]);
// }


// Первый способ вывода addExpenses
const transformedAddExpenses = function() {
    const upPer = function(value) {
        return value[0].toUpperCase() + value.substr(1);
    };
    let result = appData.addExpenses.map(upPer);
    return result.join(', ');
};

// Второй способ вывода addExpenses
// const transformedAddExpenses = function() {
//     let sum;

//     for (let i = 0; i < appData.addExpenses.length; i++) {
//         let str = appData.addExpenses[i];

//         str = str[0].toUpperCase() + str.slice(1);
//         if (i === appData.addExpenses.length - 1) {
//             sum += str;
//         } else {
//             sum += str + ', ';
//         }
//     }
//     return sum.replace('undefined', '');
// };

console.log(transformedAddExpenses());