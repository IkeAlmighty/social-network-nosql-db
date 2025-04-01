import { Router } from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} from '../../controllers/userController.js';
const router = Router();

// User Routes
router.route('/users').get(getUsers).post(createUser);
router.route('/users/:id').get(getUserById).put(updateUser).delete(deleteUser);
router.route('/users/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

export default router;