"use client";

import { useState } from "react";
import Item from "./item";

export function ItemList() {
    const items = require("./items.json");
    const [sortBy, setSortBy] = useState("name");

    const sortedItems = [...items].sort((a, b) => {
        if (sortBy === "name") {
            return a.name.localeCompare(b.name);
        } else if (sortBy === "category") {
            return a.category.localeCompare(b.category);
        }
        return 0;
    });

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
            </div>
            <ul className="space-y-2">
                {sortedItems.map((item) => (
                    <Item
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        category={item.category}
                    />
                ))}
            </ul>
        </div>
    );
}