// ниже объясняеться как работает Symbol.iterator
let range = {
    from: 1,
    to: 5,
}

range[Symbol.iterator] = function () {
    return {
        current: this.from,
        last: this.to,

        next() {
            if (this.current <= this.last) {
                return { done: false, value: this.current++ };
            } else {
                return { done: true };
            }
        }
    }
}


for (let num of range) {
    console.log(num);
}

// Явный вызов итератора for..of
let str = "Hello Web";

// делает то же самое, что и
// for (let char of str) alert(char);

let iterator = str[Symbol.iterator]();

while (true) {
    let result = iterator.next();
    if (result.done) break;
    console.log(result.value); // выводит символы один за другим
}

let arrayLike = { // есть индексы и свойство length => псевдомассив
    0: "Hello",
    1: "World",
    length: 2,
}

// Ошибка (отсутствует Symbol.iterator)
//for (let item of arrayLike) { }

/**
 * Array.from в строке принимает объект, проверяет, является ли он
 * итерируемым объектом или псевдомассивом, затем создаёт новый массив и
 * копирует туда все элементы.
 * */
let arr = Array.from(arrayLike);
alert(arr.pop());


/**
 * То же самое происходит с итерируемым объектом:
 * */
arr = Array.from(range);
alert(arr.toString());

/* полный синтаксис Array.from(obj[, mapFn, thisArg]),
 * будет mapFn применена к каждому элементу перед добавлением в массив,
 * thisArg позволяет установить this для этой функции.
 * Возводим каждое число в квадрат
 * */
arr = Array.from(range, num => num * num);
alert(arr);

// Превращаем строку в массив элементов
let strEmodzi = '𝒳😂';

/** преобразуем строку в массив, чтобы
 *  можно было работать с суррогатными парами
 *
 *  let chars = []; // Array.from внутри себя выполняет тот же цикл
 *  for (let char of str) {
 *    chars.push(char);
 *  }
 *  */
let chars = Array.from(strEmodzi);

alert(chars[0]);
alert(chars[1]);
alert(chars.length);

// Создаем метод slice, который поддерживает суррогатные пары
function slice(str, start, end) {
    return Array.from(str).slice(start, end).join('');
}

str = '𝒳😂𩷶';

alert(slice(str, 1, 3));

// Встроенный метод slice не поддерживает суррогатные пары
alert(str.slice(1, 3)); // выведет мусор