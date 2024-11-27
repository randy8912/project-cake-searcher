'use strict';

// Require prompt-sync for user input
const prompt = require("prompt-sync")();
// Import the recipe data from the JSON file
const cakeRecipes = require("./cake-recipes.json");

// Function to get all unique authors
function getUniqueAuthors(recipes) {
  // Use a Set to ensure we only have unique authors
  return [...new Set(recipes.map(recipe => recipe.Author))];
}

// Function to log all recipe names
function logRecipeNames(recipes) {
  if (!recipes.length) {
    console.log("No recipes found."); // Handle case when the recipe list is empty
    return;
  }
  recipes.forEach(({ Name }) => console.log(Name)); // Destructure the recipe to extract and log the name
}

// Function to get recipes by a specific author
function getRecipesByAuthor(recipes, author) {
  // Filter recipes based on the author
  const recipesByAuthor = recipes.filter(recipe => recipe.Author === author);
  if (!recipesByAuthor.length) {
    console.log(`No recipes found for the author "${author}".`); // Handle case when no recipes match the author
  } else {
    recipesByAuthor.forEach(({ Name }) => console.log(Name)); // Log the names of the recipes by this author
  }
  return recipesByAuthor;
}

// Function to get recipes containing a specific ingredient
function getRecipesByIngredient(recipes, ingredient) {
  // Filter recipes to find those containing the specified ingredient
  const filteredRecipes = recipes.filter(recipe =>
    recipe.Ingredients && recipe.Ingredients.some(item => item.includes(ingredient))
  );
  if (!filteredRecipes.length) {
    console.log(`No recipes found with the ingredient "${ingredient}".`); // Handle case when no recipes have the ingredient
  } else {
    filteredRecipes.forEach(({ Name }) => console.log(Name)); // Log the names of matching recipes
  }
  return filteredRecipes;
}
// Function to find a recipe by its name
function getRecipesByName(recipes, name) {
  // Use .find to locate the recipe by name
  const recipe = recipes.find(recipe => recipe.Name && recipe.Name.includes(name)) || null;
  if (!recipe) {
    console.log(`No recipe found with the name "${name}".`); // Handle case when no recipe matches the name
  } else {
    console.log(recipe); // Log the details of the found recipe
  }
  return recipe;
}

// Function to get all ingredients from a list of recipes
function getAllIngredients(recipes) {
  // Use .reduce to flatten all ingredients into a single array
  const ingredients = recipes.reduce((allIngredients, recipe) => {
    if (Array.isArray(recipe.Ingredients)) { // Ensure ingredients is a valid array
      return [...allIngredients, ...recipe.Ingredients];
    }
    return allIngredients;
  }, []);
  return [...new Set(ingredients)]; // Remove duplicates using Set
}

// Function to display the menu options
const displayMenu = () => {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("0. Exit");
  const choice = prompt("Enter a number (1-5) or 0 to exit: "); // Prompt user for a choice
  return parseInt(choice); // Convert user input to an integer
};

// Main program loop
let choice;
do {
  choice = displayMenu(); // Display the menu and get the user's choice

  switch (choice) {
    case 1:
      console.log("All Authors:");
      console.log(getUniqueAuthors(cakeRecipes)); // Call function to get and log all authors
      break;
    case 2:
      const author = prompt("Enter the author's name: "); // Prompt user for author name
      console.log(`Recipes by ${author}:`);
      getRecipesByAuthor(cakeRecipes, author); // Call function to get recipes by author
      break;
    case 3:
      const ingredient = prompt("Enter an ingredient: "); // Prompt user for an ingredient
      console.log(`Recipes with ingredient '${ingredient}':`);
      getRecipesByIngredient(cakeRecipes, ingredient); // Call function to get recipes by ingredient
      break;
    case 4:
      const name = prompt("Enter the recipe name: "); // Prompt user for a recipe name
      console.log("Recipe details:");
      getRecipesByName(cakeRecipes, name); // Call function to get recipe by name
      break;
    case 5:
      console.log("All Ingredients:");
      console.log(getAllIngredients(cakeRecipes)); // Call function to get all unique ingredients
      break;
    case 0:
      console.log("Exiting..."); // Exit message
      break;
    default:
      console.log("Invalid input. Please enter a number between 0 and 5."); // Handle invalid input
  }
} while (choice !== 0); // Continue until user chooses to exit
