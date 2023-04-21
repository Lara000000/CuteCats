const back = document.querySelector(".back");
    back.addEventListener("click", (e) => {
        location.replace("http://127.0.0.1:5500/index.html");
    })


//location.search => ?n=v
let id = location.search.split("=");
id = id[id.length - 1];
// console.log(id);
const box = document.querySelector(".info");
let user = localStorage.getItem("cat123");

if (!user) {
    user = prompt("Ваше уникальное имя: ", "Lara000000");
    localStorage.setItem("cat123", user);
}

const path = `https://cats.petiteweb.dev/api/single/${user}`;


// Вывысти информацию о коте по id
    const h2 = document.querySelector(".modal_name");
    const img = document.querySelector(".img");
    const inpId = document.querySelector("#inp1");
    const inpName = document.querySelector("#inp2");
    
    fetch(`${path}/show/${id}`)
        .then(res => {
            if (res.ok) {
                return res.json()
            }
        })
        .then(data => {
            h2.innerText = `${data.name}`;
            inpId.placeholder = `${data.id}`;
            inpName.placeholder = `${data.name}`;
            if (!data.description) {
                box.innerHTML += `<p>=)</p>`;
            } else {
                box.innerHTML += `<p>${data.description}</p>`;
            }
            if (!data.rate) {
                box.innerHTML += `<div>нет оценки</div>` 
            } else {
                box.innerHTML += `<div>Рейтинг: ${data.rate}</div>`;
            }
            if (!data.age) {
                box.innerHTML += `<div>--</div>` 
            } else {
                box.innerHTML += `<div>Возраст: ${data.age}</div>`;
            }
            if (!data.image) {
                box.className = "default"; 
            } else {
                box.style.backgroundImage = `url(${data.image})`;
            }
        })

