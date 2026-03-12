"use client";
import { useState } from 'react'; 


type Item = { name: string; quantity: number; category: string };

export function NewItem({ onAddItem }: { onAddItem: (item: Item) => void }) {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState('produce');
    const [nameTouched, setNameTouched] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || name.length < 2) {
            alert("Item name is required and must be at least 2 characters long.");
            return;
        };
        const newItem: Item = { name, quantity, category };
        onAddItem(newItem);
        console.log('New Item (submitted):', newItem);
    };
    return (
        <form onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md bg-black p-6 rounded-lg">
            
            <h1 className="text-xl font-bold text-white">Add New Item</h1>
            
            <input
                className={`flex-1 border ${(!name || name.length < 2) && nameTouched ? 'border-red-500' : 'border-gray-400'} p-2 rounded text-white`}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={(e) => setNameTouched(true)}
                onFocus={(e) => setNameTouched(false)}
                placeholder="Item name"
            />
            {!name && nameTouched && <p className="text-red-500">Item name is required</p>}
            {name && name.length < 2 && nameTouched && <p className="text-red-500">Item name must be at least 2 characters</p>}

            <input
                className="flex-1 border border-gray-400 p-2 rounded text-white"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                min="1"
            />
            
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="border border-gray-400 p-2 rounded text-white bg-black">
                <option value="produce">Produce</option>
                <option value="dairy">Dairy</option>
                <option value="meat">Meat</option>
                <option value="frozen">Frozen Foods</option>
                <option value="bakery">Bakery</option>
                <option value="canned goods">Canned Goods</option>
                <option value="dry goods">Dry Goods</option>
                <option value="household">Household</option>
                <option value="beverages">Beverages</option>
                <option value="snacks">Snacks</option>
                <option value="other">Other</option>
            </select>
            <button
                type="submit"
                disabled={!name || name.length < 2}
                className={"bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded"}>
                Add Item
            </button>
        </form>
    );
}