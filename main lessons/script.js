// Присвоение значений переменным:
let money = +prompt('Ваш месячный доход?', 50000),
    income = 'фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 300000,
    period,
    budgetDay;
let expenses1 = prompt('Введите обязательную статью расходов?', 'Продукты'),
    amount1 = +prompt('Во сколько это обойдется?', 8000),
    expenses2 = prompt('Введите обязательную статью расходов?', 'Жилье'),
    amount2 = +prompt('Во сколько это обойдется?', 28000);


// console.log('Период равен', period, 'месяцев');
// console.log('Цель - заработать', mission, 'рублей/долларов/гривен/юани');

// Вычисления
let showTypeOf = function(data) {
    console.log(data, typeof(data));
};

addExpenses = addExpenses.toLowerCase().split(', ');

let getExpensesMonth = function() {
    return amount1 + amount2;
};

let getAccumulatedMonth = function() {
    return money - getExpensesMonth();
};

let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function() {
    return Math.ceil(mission / accumulatedMonth);
};

budgetDay = Math.floor(accumulatedMonth / 30); // Определение дневного бюджета

// Определение уровня дохода
let getStatusIncome = function() {
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


// Вывод в консоль
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses);
console.log('Бюджет на месяц, с учетом расходов:', getExpensesMonth(), 'руб.');
console.log('Период достижения цели:', getTargetMonth(), 'мес.');
console.log('Бюджет на день:', budgetDay, 'руб.');

getStatusIncome();