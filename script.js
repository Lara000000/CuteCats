function createCard(cat, el = box) {
    const card = document.createElement("div");
    card.className = "card";
    if (!cat.image) {
        card.classList.add("default");
    } else {
        card.style.backgroundImage = `url(${cat.image})`;
    }
    const name = document.createElement("h3");
    name.innerText = cat.name;
    const trash = document.createElement("i");
    trash.className = "fa-solid fa-trash card__trash";
    trash.addEventListener("click", e => {
        e.stopPropagation();
        deleteCard(cat.id, card);
        // или deleteCard(cat.id, e.curretTarget.parentElement);
    })
    const like = document.createElement("i");
    like.className = "fa-heart card_like";
    like.classList.add(cat.favorite ? "fa-solid" : "fa-regular");
    like.addEventListener("click", e => {
        e.stopPropagation();
        if (cat.id) {
            fetch(`${path}/update/${cat.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ favorite: !cat.favorite })
            })
                .then(res => {
                    if (res.status === 200) {
                        like.classList.toggle("fa-solid")
                        like.classList.toggle("fa-regular");
                        cats = cats.map(c => {
                            if (c.id === cat.id) {
                                c.favorite = !cat.favorite;
                            }
                            return c;
                        })
                        localStorage.setItem("cats-data", JSON.stringify(cats));
                    }
                })
        }
    })
    
    card.append(like, name, trash);
    if (cat.age >= 0) {
        const age = document.createElement("span");
        age.innerText = cat.age;
        card.append(age);
    }
    card.addEventListener("click", (e) => {
        location.replace("page.html?id=${cat.id}") //сделать еще назад стрелку
    })

    el.append(card);
}

function deleteCard(id, el) {
    if (id) {
        fetch(`${path}/delete/${id}`, {
            method: "delete"
        })
            .then(res => {
                // console.log(res);
                // console.log(res.status);
                if (res.status === 200) {
                    el.remove();
                    cats = cats.filter(c => {c.id !==id});
                    localStorage.setItem("cats-data", JSON.stringify(cats));
                }
            })
    }
}

// let ids = [];
// fetch(path + "/ids")
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//         ids = [...data];
//         myCat.id = ids.length ? ids[ids.length - 1] + 1 : 1;
//         addCat(???);
//     })


function addCat(cat) {
    fetch(path + "/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cat)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
}

if (cats) {
    try {
        cats = JSON.parse(cats);
        console.log(cats);
        for (let cat of cats) {
            createCard(cat, box);
            console.log(cat);
        }
    } catch (err) {
        if (err) {
            cats = null;
        }
    }
} else {
    // запрос котов с сервера
    fetch(path + "/show")
        .then(function (res) {
            console.log(res);
            if (res.statusText === "OK") {
                /* Все методы ras возвращают Promise:
                res.text => возвращает текстовое содержимое (HTML-файл)
                res.blob() => бинарный формат данных
                res.json() => отображает данные в виде объекта */
                return res.json();
            }
        })
        .then(function (data) {
            console.log(data);
            if (!data.length) {
                box.innerHTML = "<div class=\"empty\">У вас еще нет питомцев</div>"
            } else {
                cats = [...data]; //деструктуризация (копирование объекта или массива)
                localStorage.setItem("cats-data", JSON.stringify(data));
                for (let c of data) {
                    createCard(c, box);
                }
            }
        })
}


/* AJAX - отправить запрос на другой сервер бех перезагрузки страницы (fetch / xhr - XmlHttpRequest / axios)
Asyns
JavaScript
And
XML

request fetch:
        1) path - путь запроса
        2) http-заголовки - объект со всеми параметрами запроса (method, headers, body - то что отправляется на сервер (данные))
        Из объекта в строку
        JSON.stringify(obj) <> {a: 123} => '{"a": 123}' 
        Из стргоки в объект
        JSON.parse(str) <> '{"a": 123}'=> {a: 123}
 */