import React from 'react';
import type {ShoppingItem as Item} from '../types';

interface Props {
    item: Item;
    onToggle: (id: string, bought: boolean) => void;
    onDelete: (id: string) => void;
}

export const ShoppingItem: React.FC<Props> = ({item, onToggle, onDelete}) => (
    <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
        <div>
            <input
                className="form-check-input me-2"
                type="checkbox"
                checked={item.bought}
                onChange={() => onToggle(item._id, !item.bought)}
            />
            <span style={{textDecoration: item.bought ? 'line-through' : 'none'}}>{item.name}</span>
        </div>
        <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(item._id)}>
            Delete
        </button>
    </li>
);
