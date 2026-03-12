"use client";

import { useState } from "react";
import { ItemList } from "./item-list";
import { NewItem } from "./new-item";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  const handleAddItem = (newItem: { name: string; quantity: number; category: string }) => {
    const item = {
      id: Math.random().toString(36).substr(2, 9),
      ...newItem,
    };
    setItems([...items, item]);
  };

  const handleItemSelect = (item: { name: string }) => {
    const baseName = item.name.split(",")[0];
    
    let cleanedName = baseName.replace(/[^a-zA-Z\s]/g, "").trim();

    //MealDB doesn't recognize "chicken breasts", so I singularized it
    if (cleanedName.toLowerCase() === "chicken breasts") {
      cleanedName = "chicken breast";
    }

    setSelectedItemName(cleanedName);
  };

  return (
    <main className="min-h-screen bg-black p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Shopping List</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <NewItem onAddItem={handleAddItem} />
            <ItemList items={items} onItemSelect={handleItemSelect} />
          </div>
          <div className="flex-1">
            <MealIdeas ingredient={selectedItemName} />
          </div>
        </div>
      </div>
    </main>
  );
}