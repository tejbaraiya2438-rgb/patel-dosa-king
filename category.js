const menuContainer = document.getElementById("menu-container");
const categoryTitle = document.getElementById("category-title");

// URL se category id
const params = new URLSearchParams(window.location.search);
const categoryId = params.get("id");

if (!categoryId) {
    categoryTitle.textContent = "Category Not Found";
    throw new Error("Category ID Missing");
}

// Menu Load
fetch("menu.json")
.then(response => response.json())
.then(menu => {

    const items = menu[categoryId];

    if (!items) {
        categoryTitle.textContent = "Category Not Found";
        return;
    }

    // Heading
    categoryTitle.textContent = categoryId
        .replace(/-/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase());

    // Cards
    items.forEach(item => {

        const card = document.createElement("div");
        card.className = "menu-card";

        // Variants HTML
        let variantsHTML = "";

        item.variants.forEach(variant => {
            variantsHTML += `
                <p>
                    <strong>${variant.name}</strong> - ₹${variant.price}
                </p>
            `;
        });
	let comboHTML = "";

if(item.items){

    comboHTML += "<ul class='combo-items'>";

    item.items.forEach(food=>{

        comboHTML += `<li>${food}</li>`;

    });

    comboHTML += "</ul>";

}

	card.innerHTML = `
    <div class="card-image">
        <img src="${item.image}" alt="${item.name}">
    </div>

    <div class="card-content">

        <h3>${item.name}</h3>

        ${comboHTML}

        ${variantsHTML}

    </div>
`;
        menuContainer.appendChild(card);

    });

})
.catch(error => console.error(error));
