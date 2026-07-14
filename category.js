const menuContainer = document.getElementById("menu-container");
const categoryTitle = document.getElementById("category-title");

// URL se category id extract karna
const params = new URLSearchParams(window.location.search);
const categoryId = params.get("id");

if (!categoryId) {
    categoryTitle.textContent = "Category Not Found";
    throw new Error("Category ID Missing");
}

// Menu Data Load karna
fetch("menu.json")
.then(response => response.json())
.then(menu => {

    const items = menu[categoryId];

    if (!items) {
        categoryTitle.textContent = "Category Not Found";
        return;
    }

    // Header Title Set karna
    categoryTitle.textContent = categoryId
        .replace(/-/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase());

    // Menu Cards render karna
    items.forEach(item => {

        const card = document.createElement("div");
        card.className = "menu-card";

        // Click Event: Jis card ko click karein uspar active border lag jaye
        card.addEventListener("click", () => {
            // Pehle baki sabhi active-cards se class hatao
            document.querySelectorAll(".menu-card").forEach(c => {
                c.classList.remove("active-card");
            });
            // Sirf click kiye hue card par active border class lagao
            card.classList.add("active-card");
        });

        // Variants (Price List) HTML - CSS friendly layout me
        let variantsHTML = "";
        item.variants.forEach(variant => {
            variantsHTML += `
                <p>
                    ${variant.name} <strong>₹${variant.price}</strong>
                </p>
            `;
        });

        // Combos list verification
        let comboHTML = "";
        if (item.items) {
            comboHTML += "<ul class='combo-items'>";
            item.items.forEach(food => {
                comboHTML += `<li>${food}</li>`;
            });
            comboHTML += "</ul>";
        }

        // Inner HTML Template
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
