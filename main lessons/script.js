'use strict';

/* Присвоение значений переменным: */
const income = 'фриланс',
    mission = 200000;
let money,
    budgetDay,
    expenses = [],
    targetMonth;


/* Вычисления */

// Ф-я проверки на числовой тип
const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n) && (n > 0);
};

// Запросы данных от пользователя
const start = function() {
    do {
        money = +prompt('Ваш месячный доход?');
    }
    while (!isNumber(money));
};
start();
const deposit = confirm('Есть ли у вас депозит в банке?');
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

const getExpensesMonth = function() {
    let sum = 0;

    for (let i = 0, j = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?', 'Продукты');
        do {
            j = +prompt('Во сколько это обойдется?');
        }
        while (!isNumber(j));
        sum += j;
    }
    console.log(expenses);
    return sum;
};
const expensesAmount = getExpensesMonth();

// Определение типа переменой
const showTypeOf = function(data) {
    console.log(data, typeof(data));
};

// Определение месячного бюджета
const getAccumulatedMonth = function() {
    return money - expensesAmount;
};
const accumulatedMonth = getAccumulatedMonth();

// Определение периода достижения цели в мес-х
const getTargetMonth = function() {
    return Math.ceil(mission / accumulatedMonth);
};
if (isNumber(getTargetMonth())) {
    targetMonth = 'Период достижения цели: ' + getTargetMonth() + ' мес.';
} else {
    targetMonth = 'Цель не будет достигнута';
}

budgetDay = Math.floor(accumulatedMonth / 30); // Определение дневного бюджета

// Ф-я определения уровня дохода
const getStatusIncome = function() {
    if (budgetDay >= 1200) {
        return 'У вас высокий уровень дохода';
    } else if (budgetDay < 1200 & budgetDay >= 600) {
        return 'У вас средний уровень дохода';
    } else if (budgetDay < 600 & budgetDay >= 0) {
        return 'К сожалению у вас уровень дохода ниже среднего';
    } else {
        return 'Что то пошло не так';
    }
};


/* Вывод в консоль */
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log('Цель - заработать', mission, 'рублей');
console.log(addExpenses.toLowerCase().split(', '));
console.log('Бюджет на месяц, с учетом расходов:', accumulatedMonth, 'руб.');
console.log(targetMonth);
console.log('Бюджет на день:', budgetDay, 'руб.');

getStatusIncome();