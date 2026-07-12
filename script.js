const container = document.getElementById("category-container");

fetch("categories.json")
.then(res => res.json())

.then(categories=>{

categories.forEach(category=>{

const card=document.createElement("a");

card.className="category-card";

card.href=`category.html?id=${category.id}`;

card.textContent=category.name;

container.appendChild(card);

});

});
