const box = document.querySelector(".container");
const addBtn = document.querySelector(".add-btn");
const mdBox = document.querySelector(".modal-container");
const mdClose = mdBox.querySelector(".modal-close");
const addForm = document.forms.add;

/* 
    Вс е хранится как текст (в виде строки)
    localStorage
        .getItem(name);
        .setItem(name, "value")
*/

let user = localStorage.getItem("cat123"); // имя пользователя
if (!user) {
    user = prompt("Ваше уникальное имя: ", "Lara000000");
    localStorage.setItem("cat123", user);
}

const path = `https://cats.petiteweb.dev/api/single/${user}`;

/*
    1)
        При загрузке страницы проверять, есть ли коты в LS?
        Если коты уже были в LS - отрисовывать сайт с ними
        Иначе - отправлять сетевой запрос и просить данные с котами (у БД)
*/
let cats = localStorage.getItem("cats-data") // массив с котами


// let a = 2;
// let b = a;
// b = 6;
// console.log("a", a, ", b", b);

// let c = {a: 2, b: 3}
// let d = {...c, c: 5, a: 4}; // деструктуризация (копирование объекта или массивва)
// c.a = 6;
// console.log("c", c, ", d", d);
