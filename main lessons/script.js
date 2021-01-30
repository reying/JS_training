let money = 50000;
let income = 'фриланс';
let addExpenses = 'Комуналка, связь, топливо, продукты';
let deposit = true;
let mission = 300000;
let period = 6;

console.log('money - тип', typeof(money));
console.log('income - тип', typeof(income));
console.log('deposit - тип', typeof(deposit));

console.log('Длина строки "addExpenses":', addExpenses.length);

console.log('Период равен', period, 'месяцев');
console.log('Цель - заработать', mission, 'рублей/долларов/гривен/юани');

// 1-й вариант
addExpenses = addExpenses.toLowerCase().split(', ');
console.log(addExpenses);
// 2-й вариант: console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money / 30;
console.log(budgetDay);