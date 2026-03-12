"use client";

import { useState } from "react";
import Item from "./item";

interface ItemType {
    id: string | number;
    name: string;
    quantity: number;
    category: string;
}

export function ItemList({ items, onItemSelect }: { items: ItemType[]; onItemSelect: (item: ItemType) => void }) {
    const [sortBy, setSortBy] = useState("name");

    const sortedItems = [...items].sort((a, b) => {
        if (sortBy === "name") {
            return a.name.localeCompare(b.name);
        } else if (sortBy === "category") {
            return a.category.localeCompare(b.category);
        }
        return 0;
    });

    const groupedItems = [...items].reduce((acc, item) => {
        const category = item.category;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(item);
        return acc;
    }, {} as Record<string, ItemType[]>);

    const sortedGroupedItems = Object.keys(groupedItems)
        .sort()
        .map(category => ({
            category,
            items: groupedItems[category].sort((a, b) => a.name.localeCompare(b.name))
        }));

    return (
        <div>
            <div className="mb-4 flex gap-2">
                <button
                    onClick={() => setSortBy("name")}
                    className={`px-4 py-2 rounded font-semibold transition-colors ${sortBy === "name" ? "bg-blue-500 text-white"  : "bg-gray-300 text-black hover:bg-gray-400"}`}>
                    Sort by Name
                </button>
                <button
                    onClick={() => setSortBy("category")}
                    className={`px-4 py-2 rounded font-semibold transition-colors ${sortBy === "category" ? "bg-blue-500 text-white" : "bg-gray-300 text-black hover:bg-gray-400" }`}>
                    Sort by Category
                </button>
                <button
                    onClick={() => setSortBy("grouped")}
                    className={`px-4 py-2 rounded font-semibold transition-colors ${sortBy === "grouped" ? "bg-blue-500 text-white" : "bg-gray-300 text-black hover:bg-gray-400"}`}>
                    Group by Category
                </button>
            </div>
            <ul className="space-y-2">
                {sortBy === "grouped" ? (
                    sortedGroupedItems.map(({ category, items: categoryItems }) => (
                        <div key={category} className="mb-4">
                            <h2 className="font-bold text-lg capitalize mb-2">{category}</h2>
                            <ul className="space-y-2 ml-4">
                                {categoryItems.map((item) => (
                                    <Item
                                        key={item.id}
                                        name={item.name}
                                        quantity={item.quantity}
                                        category={item.category}
                                        onSelect={() => onItemSelect(item)}
                                    />
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    sortedItems.map((item) => (
                        <Item
                            key={item.id}
                            name={item.name}
                            quantity={item.quantity}
                            category={item.category}
                            onSelect={() => onItemSelect(item)}
                        />
                    ))
                )}
            </ul>
        </div>
    );
}