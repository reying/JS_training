// Присвоение значений переменным:
let money = 50000;
let income = 'фриланс';
let addExpenses = 'Комуналка, связь, топливо, продукты';
let deposit = true;
let mission = 300000;
let period = 6;
let budgetDay = money / 30;
let budgetMonth;
let expenses1;
let expenses2;
let amount1;
let amount2;


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

// Запрос данных от пользователя
money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');
expenses1 = prompt('Введите обязательную статью расходов?');
amount1 = prompt('Во сколько это обойдется?');
expenses2 = prompt('Введите обязательную статью расходов?');
amount2 = prompt('Во сколько это обойдется?');

// Вычисление месячного бюджета
budgetMonth = money - amount1 - amount2;
console.log('Бюджет на месяц, с учетом расходов:', budgetMonth);

// Вычисление периода достижения цели
period = Math.ceil(mission / budgetMonth);
console.log('Период достижения цели:', period);

// Вычисление дневного бюджета
budgetDay = Math.floor(budgetMonth / 30);
console.log('Бюджет на день:', budgetDay);

// Определение уровня дохода
if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay < 1200 & budgetDay >= 600) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay < 600 & budgetDay >= 0) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
} else {
    console.log('Что то пошло не так');
}