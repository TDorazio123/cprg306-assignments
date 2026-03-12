"use client";

import { useEffect, useState } from "react";

export async function fetchMealIdeas(ingredient) {
  if (!ingredient) return [];

  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
        ingredient
      )}`
    );

    if (!res.ok) {
      console.warn(`Failed to fetch meal ideas. Status: ${res.status}`);
      return [];
    }

    const data = await res.json();
    return data.meals ?? [];
  } catch (error) {
    console.warn("Network error when fetching meal ideas:", error);
    return [];
  }
}

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);

  const loadMealIdeas = async () => {
    const results = await fetchMealIdeas(ingredient);
    setMeals(results);
  };

  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-4">Meal Ideas</h2>
      {meals && meals.length > 0 ? (
        <ul className="list-disc pl-5">
          {meals.map((meal) => (
            <li key={meal.idMeal} className="mb-1">{meal.strMeal}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">
          {ingredient 
            ? "No meal ideas found for this ingredient." 
            : "Select an item to view meal ideas."}
        </p>
      )}
    </div>
  );
}