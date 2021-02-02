// Присвоение значений переменным:
let money = prompt('Ваш месячный доход?');
let income = 'фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 300000;
let period;
let budgetDay;
let budgetMonth;
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = prompt('Во сколько это обойдется?');
let incomeLvl;


// Применение методов и свойств:
// console.log('money - тип', typeof(money));
// console.log('income - тип', typeof(income));
// console.log('deposit - тип', typeof(deposit));

// console.log('Длина строки "addExpenses":', addExpenses.length);

// console.log('Период равен', period, 'месяцев');
// console.log('Цель - заработать', mission, 'рублей/долларов/гривен/юани');

// 1-й вариант
// addExpenses = addExpenses.toLowerCase().split(', ');
// console.log(addExpenses);
// // 2-й вариант: console.log(addExpenses.toLowerCase().split(', '));

// console.log(budgetDay);


// Вычисления
budgetMonth = money - amount1 - amount2; // Определение месячного буджета
budgetDay = Math.floor(budgetMonth / 30); // Определение дневного бюджета
period = Math.ceil(mission / budgetMonth); // Определение периода достижение цели
// Определение уровня дохода
if (budgetDay >= 1200) {
    incomeLvl = 'У вас высокий уровень дохода';
} else if (budgetDay < 1200 & budgetDay >= 600) {
    incomeLvl = 'У вас средний уровень дохода';
} else if (budgetDay < 600 & budgetDay >= 0) {
    incomeLvl = 'К сожалению у вас уровень дохода ниже среднего';
} else {
    incomeLvl = 'Что то пошло не так';
}


// Вывод в консоль
console.log('Бюджет на месяц, с учетом расходов:', budgetMonth, 'руб.');
console.log('Бюджет на день:', budgetDay, 'руб.');
console.log('Период достижения цели:', period, 'мес.');
console.log(incomeLvl);