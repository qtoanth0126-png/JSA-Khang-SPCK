const API_URL = "https://www.themealdb.com/api/json/v1/1";

document.addEventListener("DOMContentLoaded", () => {
  loadFeaturedRecipes();
  loadCategories();
});

async function loadFeaturedRecipes() {
  const container = document.getElementById("featuredRecipes");

  try {
    const recipes = [];
    for (let i = 0; i < 6; i++) {
      const response = await fetch(`${API_URL}/random.php`);
      const data = await response.json();
      if (data.meals) {
        recipes.push(data.meals[0]);
      }
    }

    if (recipes.length > 0) {
      container.innerHTML = recipes
        .map(
          (recipe) => `
                <div class="recipe-card" onclick="window.location.href='detail.html?id=${recipe.idMeal}'">
                    <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                    <div class="recipe-card-content">
                        <h3>${recipe.strMeal}</h3>
                        <p>${recipe.strCategory}</p>
                        <span class="badge">${recipe.strArea}</span>
                    </div>
                </div>
            `,
        )
        .join("");
    } else {
      container.innerHTML = '<p class="loading">Không có dữ liệu</p>';
    }
  } catch (error) {
    console.error("Error loading recipes:", error);
    container.innerHTML = '<p class="loading">Lỗi khi tải dữ liệu</p>';
  }
}

async function loadCategories() {
  const container = document.getElementById("categories");

  try {
    const response = await fetch(`${API_URL}/categories.php`);
    const data = await response.json();

    if (data.categories) {
      // Code here
    }
  } catch (error) {
    console.error("Error loading categories:", error);
    container.innerHTML = '<p class="loading">Lỗi khi tải dữ liệu</p>';
  }
}
