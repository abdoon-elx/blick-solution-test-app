import express from 'express';
import { ShoppingItemController } from '../controllers/ShoppingItemController';

const router = express.Router();

router.get('/', ShoppingItemController.getAllItems);
router.post('/', ShoppingItemController.createItem);
router.put('/:id', ShoppingItemController.updateItem);
router.delete('/:id', ShoppingItemController.deleteItem);

export default router;
