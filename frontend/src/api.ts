import axios from 'axios';
import type {ShoppingItem} from './types';

const base = import.meta.env.VITE_API_URL + '/items';

export const fetchItems = () => axios.get<ShoppingItem[]>(base);
export const addItem = (name: string) => axios.post<ShoppingItem>(base, { name });
export const updateItem = (id: string, bought: boolean) => axios.put(`${base}/${id}`, { bought });
export const deleteItem = (id: string) => axios.delete(`${base}/${id}`);
