"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ItemList } from "./item-list";
import { NewItem } from "./new-item";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";
import { useUserAuth } from "../_utils/auth-context"; // Import the auth hook

export default function Page() {
  const { user, firebaseSignOut } = useUserAuth();
  const router = useRouter();
  
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  
  if (!user) {
    return (
      <main className="min-h-screen bg-black p-8 flex flex-col items-center justify-center text-white">
        <p className="text-xl mb-4">You must be logged in to view your shopping list.</p>
        <button 
          onClick={() => router.push('/week-8')} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to Login Page
        </button>
      </main>
    );
  }

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

    if (cleanedName.toLowerCase() === "chicken breasts") {
      cleanedName = "chicken breast";
    }

    setSelectedItemName(cleanedName);
  };

  const handleLogout = async () => {
    await firebaseSignOut();
    router.push('/week-8'); 
  };

  return (
    <main className="min-h-screen bg-black p-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">Shopping List</h1>
            <button 
              onClick={handleLogout} 
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
        </div>

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