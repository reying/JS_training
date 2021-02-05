'use strict';
let money,
    expenses = [],
    targetMonth;

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
    },
    getExpensesMonth: function() {
        let sum = 0;

        for (let i = 0, j = 0; i < 2; i++) {
            expenses[i] = prompt('Введите обязательную статью расходов?', 'Продукты');
            do {
                j = +prompt('Во сколько это обойдется?');
            }
            while (!isNumber(j));
            sum += j;
        }
        return sum;
    },
    // определение месячного бюджета
    getAccumulatedMonth: function() {
        return money - appData.expensesMonth;
    },
    // определение периода достижения цели в мес-х
    getTargetMonth: function() {
        return Math.ceil(appData.mission / appData.getAccumulatedMonth());
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
    }
};

/* Вычисления */
appData.asking();
appData.expensesMonth = appData.getExpensesMonth();

if (isNumber(appData.getTargetMonth())) {
    targetMonth = 'Период достижения цели: ' + appData.getTargetMonth() + ' мес.';
} else {
    targetMonth = 'Цель не будет достигнута';
}

appData.budgetDay = Math.floor(appData.getAccumulatedMonth() / 30); // Определение дневного бюджета





/* Вывод в консоль */
console.log('Цель - заработать', appData.mission, 'рублей');

console.log('Бюджет на месяц, с учетом расходов:', appData.getAccumulatedMonth(), 'руб.');
console.log(targetMonth);
console.log('Бюджет на день:', appData.budgetDay, 'руб.');

appData.getStatusIncome();