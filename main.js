const recipes = [
  { name:"Caesar Salad", description:"Classic salad with crisp romaine and creamy dressing", cuisine:"Mediterranean", difficulty:"Easy", prep:15, cook:0, servings:2, rating:"4.4", reviews:198, image:"https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=1300&q=85", ingredients:["1 large romaine lettuce","1/2 cup Caesar dressing","1/2 cup parmesan cheese, shaved","1 cup croutons","2 anchovy fillets (optional)","Lemon wedges","Black pepper"], instructions:["Wash and dry the romaine leaves, then tear them into bite-sized pieces.","Add the lettuce to a large bowl with Caesar dressing and toss until coated.","Top with shaved parmesan and crunchy croutons.","Finish with black pepper and lemon wedges, then serve right away."], nutrition:{Calories:"320 kcal",Protein:"12 g",Carbs:"24 g",Fat:"21 g"}, tips:["Dry the lettuce well so the dressing clings to every leaf.","Add croutons just before serving to keep them crunchy."] },
  { name:"Beef Tacos", description:"Flavorful Mexican tacos with seasoned ground beef", cuisine:"American", difficulty:"Easy", prep:15, cook:20, servings:4, rating:"4.6", reviews:278, image:"https://images.unsplash.com/photo-1551509466-8c6fbb1c6f6b?auto=format&fit=crop&w=1300&q=85", ingredients:["500g ground beef","8 taco shells","1 onion, diced","2 tablespoons taco seasoning","Shredded lettuce","Diced tomatoes","Shredded cheddar cheese","Sour cream","Salsa"], instructions:["Warm the taco shells according to the package directions.","Cook the diced onion in a pan until soft, then add the ground beef.","Break up the beef and cook until browned. Stir in taco seasoning and a splash of water.","Fill each shell with beef, lettuce, tomatoes, and cheese.","Serve with sour cream and salsa on the side."], nutrition:{Calories:"410 kcal",Protein:"27 g",Carbs:"32 g",Fat:"20 g"}, tips:["Drain extra fat after browning the beef for a lighter filling.","Set out toppings in small bowls so everyone can build their own tacos."] },
  { name:"Creamy Tomato Pasta", description:"A cozy bowl of pasta with a silky tomato sauce", cuisine:"Italian", difficulty:"Easy", prep:10, cook:20, servings:3, rating:"4.7", reviews:241, image:"https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1300&q=85", ingredients:["300g pasta","2 tablespoons olive oil","3 garlic cloves, minced","1 can crushed tomatoes","1/3 cup cooking cream","1/2 cup grated parmesan","Fresh basil","Salt and black pepper"], instructions:["Boil the pasta in salted water until just tender. Save a cup of pasta water.","Warm olive oil in a pan and cook the garlic for about 30 seconds.","Add tomatoes and simmer for 10 minutes, then stir in the cream.","Toss the pasta with the sauce and a splash of pasta water.","Finish with parmesan and fresh basil."], nutrition:{Calories:"460 kcal",Protein:"17 g",Carbs:"62 g",Fat:"16 g"}, tips:["Keep the pasta a little firm; it will finish cooking in the sauce.","Use pasta water a little at a time to make the sauce glossy."] },
  { name:"Grilled Chicken Bowl", description:"Juicy chicken with rice, greens, and bright lemon", cuisine:"Healthy", difficulty:"Easy", prep:15, cook:18, servings:2, rating:"4.8", reviews:163, image:"https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1300&q=85", ingredients:["2 chicken breasts","1 cup cooked rice","1 cucumber, sliced","1 cup cherry tomatoes","2 cups baby spinach","1 tablespoon olive oil","1 lemon","Salt, pepper, and paprika"], instructions:["Season the chicken with salt, pepper, paprika, and half the lemon juice.","Heat a lightly oiled pan and cook chicken for 6–8 minutes on each side.","Let the chicken rest for 5 minutes, then slice it.","Divide rice, spinach, cucumber, and tomatoes between bowls.","Add chicken and finish with olive oil and lemon."], nutrition:{Calories:"390 kcal",Protein:"38 g",Carbs:"35 g",Fat:"11 g"}, tips:["Letting chicken rest keeps it juicy when sliced.","Add a spoonful of yogurt with lemon as a quick bowl sauce."] },
  { name:"Avocado Toast", description:"Golden toast topped with creamy avocado and egg", cuisine:"Breakfast", difficulty:"Easy", prep:8, cook:7, servings:2, rating:"4.5", reviews:126, image:"https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1300&q=85", ingredients:["2 thick slices sourdough bread","1 ripe avocado","2 eggs","1 teaspoon lemon juice","Chili flakes","Salt and black pepper","A handful of microgreens"], instructions:["Toast the bread until crisp and golden.","Mash avocado with lemon juice, salt, and black pepper.","Fry or poach the eggs to your liking.","Spread avocado over toast and add an egg to each slice.","Finish with chili flakes and microgreens."], nutrition:{Calories:"340 kcal",Protein:"14 g",Carbs:"31 g",Fat:"19 g"}, tips:["Choose an avocado that gives slightly when pressed.","A pinch of flaky salt makes the flavors pop."] }
];

let currentRecipeIndex = 0;
let currentTab = "ingredients";
let toastTimer;
const savedRecipes = JSON.parse(localStorage.getItem("dinnerSavedRecipes") || "[]");
const historyRecipes = JSON.parse(localStorage.getItem("dinnerRecipeHistory") || "[]");
const byId = (id) => document.getElementById(id);

function showToast(message) {
  const toast = byId("toastMessage");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function renderRecipe() {
  const recipe = recipes[currentRecipeIndex];
  byId("recipeName").textContent = recipe.name;
  byId("description").textContent = recipe.description;
  byId("cuisine").textContent = recipe.cuisine;
  byId("difficulty").textContent = recipe.difficulty;
  byId("rating").textContent = recipe.rating;
  byId("reviews").textContent = `(${recipe.reviews} reviews)`;
  byId("prepTime").textContent = `${recipe.prep} min`;
  byId("cookTime").textContent = `${recipe.cook} min`;
  byId("servings").textContent = `${recipe.servings} people`;
  const image = byId("recipeImage");
  image.src = recipe.image;
  image.alt = `${recipe.name}, ready to serve`;
  byId("recipeCount").textContent = `${currentRecipeIndex + 1} of ${recipes.length}`;
  addToHistory(recipe.name);
  renderTab();
  updateSaveButton();
}

function renderTab() {
  const recipe = recipes[currentRecipeIndex];
  const panel = byId("detailsPanel");
  document.querySelectorAll(".recipe-tab").forEach((tab) => {
    const selected = tab.dataset.tab === currentTab;
    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-selected", selected);
  });
  if (currentTab === "ingredients") {
    panel.innerHTML = `<ol class="ingredient-list">${recipe.ingredients.map((item, index) => `<li><span class="number-dot">${index + 1}</span><span>${item}</span></li>`).join("")}</ol>`;
  } else if (currentTab === "instructions") {
    panel.innerHTML = `<ol class="instruction-list">${recipe.instructions.map((item, index) => `<li><span class="step-dot">${index + 1}</span><span>${item}</span></li>`).join("")}</ol>`;
  } else if (currentTab === "nutrition") {
    panel.innerHTML = `<div class="nutrition-grid">${Object.entries(recipe.nutrition).map(([label, value]) => `<div class="nutrition-item">${label}<strong>${value}</strong></div>`).join("")}</div>`;
  } else {
    panel.innerHTML = `<div class="tip-card"><i class="bi bi-lightbulb-fill"></i><ul class="mb-0">${recipe.tips.map((tip) => `<li class="mb-2">${tip}</li>`).join("")}</ul></div>`;
  }
}

function addToHistory(name) {
  const oldIndex = historyRecipes.indexOf(name);
  if (oldIndex !== -1) historyRecipes.splice(oldIndex, 1);
  historyRecipes.unshift(name);
  historyRecipes.splice(8);
  localStorage.setItem("dinnerRecipeHistory", JSON.stringify(historyRecipes));
}

function updateSaveButton() {
  const isSaved = savedRecipes.includes(recipes[currentRecipeIndex].name);
  byId("saveButton").classList.toggle("is-saved", isSaved);
  byId("saveButton").innerHTML = `<i class="bi bi-bookmark${isSaved ? "-check" : ""}-fill"></i>`;
  byId("saveButton").setAttribute("aria-label", isSaved ? "Remove saved recipe" : "Save recipe");
}

function toggleSave() {
  const name = recipes[currentRecipeIndex].name;
  const index = savedRecipes.indexOf(name);
  if (index === -1) { savedRecipes.push(name); showToast("Recipe saved"); }
  else { savedRecipes.splice(index, 1); showToast("Recipe removed from saved recipes"); }
  localStorage.setItem("dinnerSavedRecipes", JSON.stringify(savedRecipes));
  updateSaveButton();
}

function openModal(title, items, emptyText) {
  byId("modalTitle").textContent = title;
  byId("modalBody").innerHTML = items.length ? `<ul class="modal-list">${items.map((name) => `<li>${name}</li>`).join("")}</ul>` : `<p class="modal-empty">${emptyText}</p>`;
  byId("infoModal").hidden = false;
}

document.querySelectorAll(".recipe-tab").forEach((tab) => tab.addEventListener("click", () => { currentTab = tab.dataset.tab; renderTab(); }));
byId("anotherButton").addEventListener("click", () => {
  let nextIndex = currentRecipeIndex;
  while (nextIndex === currentRecipeIndex && recipes.length > 1) nextIndex = Math.floor(Math.random() * recipes.length);
  currentRecipeIndex = nextIndex;
  currentTab = "ingredients";
  renderRecipe();
});
byId("saveButton").addEventListener("click", toggleSave);
byId("savedNav").addEventListener("click", () => openModal("Saved recipes", savedRecipes, "You haven't saved a recipe yet."));
byId("savedNavMobile").addEventListener("click", () => { openModal("Saved recipes", savedRecipes, "You haven't saved a recipe yet."); byId("mobileDrawer").hidden = true; });
byId("historyButton").addEventListener("click", () => openModal("Recently seen", historyRecipes, "Your recipe history will appear here."));
byId("historyButtonMobile").addEventListener("click", () => { openModal("Recently seen", historyRecipes, "Your recipe history will appear here."); byId("mobileDrawer").hidden = true; });
function showSettings() { openModal("Settings", ["Recipes are saved on this device.", "Choose Try Another Recipe to discover a new meal."], ""); }
byId("settingsButton").addEventListener("click", showSettings);
byId("settingsButtonMobile").addEventListener("click", () => { showSettings(); byId("mobileDrawer").hidden = true; });
byId("shareButton").addEventListener("click", async () => {
  const shareData = { title: recipes[currentRecipeIndex].name, text: recipes[currentRecipeIndex].description, url: location.href };
  try {
    if (navigator.share) await navigator.share(shareData);
    else if (navigator.clipboard) { await navigator.clipboard.writeText(`${shareData.title} — ${shareData.text}`); showToast("Recipe copied to clipboard"); }
    else showToast("Sharing isn't available in this browser");
  } catch (error) { if (error.name !== "AbortError") showToast("Couldn't share this recipe"); }
});
byId("menuButton").addEventListener("click", () => {
  const drawer = byId("mobileDrawer");
  drawer.hidden = !drawer.hidden;
  byId("menuButton").setAttribute("aria-expanded", String(!drawer.hidden));
});
byId("infoModal").addEventListener("click", (event) => { if (event.target === byId("infoModal")) byId("infoModal").hidden = true; });
document.querySelector(".close-modal").addEventListener("click", () => { byId("infoModal").hidden = true; });
document.addEventListener("keydown", (event) => { if (event.key === "Escape") byId("infoModal").hidden = true; });

renderRecipe();