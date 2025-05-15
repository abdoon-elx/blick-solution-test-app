import mongoose, { Document, Schema, Model } from 'mongoose';

// 1. Define a TypeScript interface for the item
export interface IShoppingItem extends Document {
    name: string;
    bought: boolean;
    createdAt: Date;
}

// 2. Create the schema with proper typing
const shoppingItemSchema: Schema<IShoppingItem> = new Schema({
    name: { type: String, required: true },
    bought: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

// 3. Create and export the model with typing
export const ShoppingItem: Model<IShoppingItem> = mongoose.model<IShoppingItem>(
    'ShoppingItem',
    shoppingItemSchema
);
