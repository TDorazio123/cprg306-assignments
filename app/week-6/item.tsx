
import React from "react";

interface ItemProps {
    name: string;
    quantity: number;
    category: string;
}

const Item: React.FC<ItemProps> = ({ name, quantity, category }) => {
    return (
        <li className="bg-black border border-white p-4 mb-2 flex flex-col gap-1">
            <span className="font-semibold text-lg text-white">{name}</span>
            <span className="text-white">Quantity: {quantity}</span>
            <span className="text-white">Category: {category}</span>
        </li>
    );
};

export default Item;