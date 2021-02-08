'use strict';
let money;

// Ф-я проверки на числовой тип
const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n) && (n > 0);
};

const start = function() {
    do {
        money = +prompt('Ваш месячный доход?');
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
    mission: 300000,
    period: 3,
    asking: function() {
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        for (let i = 0, ex = 0, vel = 0; i < 2; i++) {
            ex = prompt('Введите обязательную статью расходов?', 'Продукты');
            do {
                vel = +prompt('Во сколько это обойдется?');
            }
            while (!isNumber(vel));
            appData.expenses[ex] = vel;
        }
    },
    // определение суммы обязательных расходов
    getExpensesMonth: function() {
        // let sum = 0;

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
    }
};

/* Вычисления */
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();

/* Вывод в консоль */
// console.log('Цель - заработать', appData.mission, 'рублей');
// console.log('Месячный доход:', money);
// console.log('Бюджет на месяц, с учетом расходов:', appData.budgetMonth, 'руб.');
// console.log('Бюджет на день:', appData.budgetDay, 'руб.');

console.log('Расходы за месяц:', appData.expensesMonth, 'руб.');
console.log(appData.achievedTarget());
console.log(appData.getStatusIncome());

console.log('');
console.log('Наша программа включает в себя данные:');
for (let key in appData) {
    console.log(key, appData[key]);
}