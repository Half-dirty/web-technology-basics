const categoryConfig = {
  soup: { containerSelector: "#soups .menu-grid" },
  main: { containerSelector: "#mains .menu-grid" },
  drink: { containerSelector: "#drinks .menu-grid" },
};

const selectedDishes = {
  soup: null,
  main: null,
  drink: null,
};

function createDishCard(dish) {
  const card = document.createElement("article");
  card.className = "dish-card";
  card.dataset.dish = dish.keyword;

  const img = document.createElement("img");
  img.src = dish.image;
  img.alt = dish.name;

  const nameEl = document.createElement("p");
  nameEl.className = "dish-card__name";
  nameEl.textContent = dish.name;

  const weightEl = document.createElement("p");
  weightEl.className = "dish-card__weight";
  weightEl.textContent = dish.count;

  const priceEl = document.createElement("p");
  priceEl.className = "dish-card__price";
  priceEl.textContent = `${dish.price} ₽`;

  const button = document.createElement("button");
  button.className = "dish-card__button";
  button.type = "button";
  button.textContent = "Добавить";

  card.addEventListener("click", onDishCardClick);

  card.append(img, nameEl, weightEl, priceEl, button);
  return card;
}

function renderMenu() {
  Object.keys(categoryConfig).forEach((categoryKey) => {
    const { containerSelector } = categoryConfig[categoryKey];
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const categoryDishes = dishes
      .filter((dish) => dish.category === categoryKey)
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name, "ru"));

    container.innerHTML = "";

    categoryDishes.forEach((dish) => {
      const card = createDishCard(dish);
      container.appendChild(card);
    });
  });
}


function onDishCardClick(event) {
  const card = event.currentTarget;
  const dishKeyword = card.dataset.dish;
  if (!dishKeyword) return;

  const dish = dishes.find((item) => item.keyword === dishKeyword);
  if (!dish) return;

  selectedDishes[dish.category] = dish;

  updateOrderSummary();
}

function updateOrderSummary() {
  const emptyBlock = document.getElementById("order-empty");
  const categoriesBlock = document.getElementById("order-categories");
  const totalBlock = document.getElementById("order-total");
  const totalValue = document.getElementById("order-total-value");

  if (!emptyBlock || !categoriesBlock || !totalBlock || !totalValue) {
    return;
  }

  const hasAnySelected = Object.values(selectedDishes).some(Boolean);

  if (!hasAnySelected) {
    emptyBlock.hidden = false;

    categoriesBlock.hidden = true;
    categoriesBlock.style.display = "none";

    totalBlock.hidden = true;
    totalBlock.style.display = "none";

    totalValue.textContent = "0 ₽";
    return;
  }

  emptyBlock.hidden = true;

  categoriesBlock.hidden = false;
  categoriesBlock.style.display = "grid"; 

  let total = 0;

  ["soup", "main", "drink"].forEach((categoryKey) => {
    const dish = selectedDishes[categoryKey];

    const categoryEl = categoriesBlock.querySelector(
      `.order-summary__category[data-category="${categoryKey}"]`
    );
    if (!categoryEl) return;

    const textEl = categoryEl.querySelector(".order-summary__text");
    if (!textEl) return;

    if (dish) {
      textEl.textContent = `${dish.name} — ${dish.price} ₽`;
      textEl.classList.remove("order-summary__text--empty");
      total += dish.price;
    } else {
      const emptyText =
        categoryKey === "drink" ? "Напиток не выбран" : "Блюдо не выбрано";
      textEl.textContent = emptyText;
      textEl.classList.add("order-summary__text--empty");
    }
  });

  totalBlock.hidden = false;
  totalBlock.style.display = "flex"; 

  totalValue.textContent = `${total} ₽`;
}

function resetSelectedDishes() {
  Object.keys(selectedDishes).forEach((key) => {
    selectedDishes[key] = null;
  });
  updateOrderSummary();
}

renderMenu();
updateOrderSummary();

const resetButton = document.querySelector(
  '.order-form__button--secondary[type="reset"]'
);

if (resetButton) {
  resetButton.addEventListener("click", () => {
    resetSelectedDishes();
  });
}