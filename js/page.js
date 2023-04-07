//location.search => ?n=v
let id = location.search.split("=");
id = id[id.length-1];
const box = document.querySelector(".info");
let user = localStorage.getItem("cat123");
if (!user) {
    user = prompt("Ваше уникальное имя: ", "Lara000000");
    localStorage.setItem("cat123", user);
}

const path = `https://cats.petiteweb.dev/api/single/${user}`;

fetch(`${path}/show/${id}`)
    .then(res => {
        if(res.ok) {
            return res.ison()
        }
    })
    .then(data => {
        box.innerHTML = `<h2>${data.name}</h2>`
    })