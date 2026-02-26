"use client";

import { useState } from "react";
import { ItemList } from "./item-list";
import { NewItem } from "./new-item";
import itemsData from "./items.json";

export default function Page() {
  const [items, setItems] = useState(itemsData);

  const handleAddItem = (newItem: { name: string; quantity: number; category: string }) => {
    const item = {
      id: Math.random().toString(36).substr(2, 9),
      ...newItem,
    };
    setItems([...items, item]);
  };

  return (
    <main className="min-h-screen bg-black p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Shopping List</h1>
        <NewItem onAddItem={handleAddItem} />
        <ItemList items={items} />
      </div>
    </main>
  );
}
