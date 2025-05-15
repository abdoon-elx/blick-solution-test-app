import {useEffect, useState} from 'react';
import type {ShoppingItem} from './types';
import * as api from './api';
import {ShoppingItem as ItemComponent} from './components/ShoppingItem';

const App = () => {
    const [items, setItems] = useState<ShoppingItem[]>([]);
    const [name, setName] = useState('');
    const [hasError, setHasError] = useState(false);

    const loadItems = async () => {
        const res = await api.fetchItems();
        setItems(res.data);
    };

    useEffect(() => {
        loadItems();
    }, []);

    const handleAdd = async () => {
        if (name.trim() === '') {
            setHasError(true);
            return;
        }

        const res = await api.addItem(name);
        setItems(prev => [res.data, ...prev]);
        setName('');

    };

    const handleToggle = async (id: string, bought: boolean) => {
        const res = await api.updateItem(id, bought);
        setItems(prev =>
            prev.map(item => (item._id === id ? res.data : item))
        );
    };

    const handleDelete = async (id: string) => {
        await api.deleteItem(id);
        setItems(prev => prev.filter(item => item._id !== id));
    };

    return (
        <div className="container mt-5" style={{maxWidth: '600px'}}>
            <h2 className="text-center mb-4">🛒 Shopping List</h2>
            <div className="input-group mb-3">
                <input
                    className={`form-control ${hasError ? 'border border-danger' : ''}`}
                    value={name}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.keyCode === 13) {
                            e.preventDefault(); // Important for preventing form submission if inside a form
                            handleAdd();
                        }
                    }}
                    onChange={e => {
                        setName(e.target.value);
                        if (e.target.value.trim() !== '') {
                            setHasError(false); // reset error when typing
                        }
                    }}
                    placeholder="Enter product name"
                />
                <button
                    className="btn btn-primary"
                    onClick={handleAdd} style={{marginLeft: '1rem'}}>
                    Add to cart
                </button>
            </div>
            <ul className="list-group">
                {items.map(item => (
                    <ItemComponent
                        key={item._id}
                        item={item}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                    />
                ))}
            </ul>
            <div className="text-end mt-3">
                Total products: <strong> {items.length} </strong>
            </div>
        </div>

    );
}

export default App;
