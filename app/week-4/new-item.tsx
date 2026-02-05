"use client";
import { useState } from 'react'; 


export function NewItem() {
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
        const newItem = { name, quantity, category };
        alert(`New Item Added:\n\nName: ${name}\nQuantity: ${quantity}\nCategory: ${category}`);
        console.log('New Item:', newItem);
    };
    return (
        <form onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md bg-gray-200 p-6 rounded-lg">
            
            <h1 className="text-xl font-bold text-black">Add New Item</h1>
            
            <input
                className={`flex-1 border ${!name && nameTouched ? 'border-red-500' : 'border-gray-400'} p-2 rounded text-black`}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={(e) => setNameTouched(true)}
                onFocus={(e) => setNameTouched(false)}
                placeholder="Item name"
            />
            {!name && nameTouched && <p className="text-red-500">Item name is required</p>}

            <input
                className="flex-1 border border-gray-400 p-2 rounded text-black"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                min="1"
            />
            
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="border border-gray-400 p-2 rounded text-black">
                <option value="Produce">Produce</option>
                <option value="Dairy">Dairy</option>
                <option value="Meat">Meat</option>
                <option value="Frozen">Frozen Foods</option>
                <option value="Bakery">Bakery</option>
                <option value="Canned goods">Canned Goods</option>
                <option value="Dry goods">Dry Goods</option>
                <option value="Household">Household</option>
                <option value="Beverages">Beverages</option>
                <option value="Snacks">Snacks</option>
                <option value="Other">Other</option>
            </select>
            <button 
                type="submit" 
                onClick={handleSubmit}
                disabled={!name || name.length < 2}
                className={"bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded"}>
                Add Item
            </button>
        </form>
    );
}