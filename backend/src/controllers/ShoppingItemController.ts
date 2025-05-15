import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { ShoppingItem, IShoppingItem } from '../models/ShoppingItem';

export class ShoppingItemController {
    // GET /items
    public static async getAllItems(_: Request, res: Response<IShoppingItem[]>): Promise<void> {
        try {
            const items = await ShoppingItem.find().sort({ createdAt: -1 });
            res.json(items);
        } catch (error) {
            res.status(500).json([]); // Optionally log error
        }
    }

    // POST /items
    public static async createItem(
        req: Request<{}, {}, { name: string }>,
        res: Response<IShoppingItem | { message: string }>
    ): Promise<void> {
        try {
            const { name } = req.body;
            const item = new ShoppingItem({ name });
            await item.save();
            res.status(201).json(item);
        } catch {
            res.status(400).json({ message: 'Invalid input' });
        }
    }

    // PUT /items/:id
    public static async updateItem(
        req: Request<{ id: string }, {}, { bought: boolean }>,
        res: Response<IShoppingItem | { message: string }>
    ): Promise<void> {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                res.status(400).json({ message: 'Invalid ID format' });
                return;
            }

            const item = await ShoppingItem.findByIdAndUpdate(
                id,
                { bought: req.body.bought },
                { new: true }
            );

            if (!item) {
                res.status(404).json({ message: 'Item not found' });
                return;
            }

            res.json(item);
        } catch {
            res.status(500).json({ message: 'Server error' });
        }
    }

    // DELETE /items/:id
    public static async deleteItem(
        req: Request<{ id: string }>,
        res: Response<{ message: string } | void>
    ): Promise<void> {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                res.status(400).json({ message: 'Invalid ID format' });
                return;
            }

            const deleted = await ShoppingItem.findByIdAndDelete(id);
            if (!deleted) {
                res.status(404).json({ message: 'Item not found' });
                return;
            }

            res.status(204).send();
        } catch {
            res.status(500).json({ message: 'Server error' });
        }
    }
}
