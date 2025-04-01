import { Router } from 'express';
import {
    getThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} from '../../controllers/thoughtController.js';
const router = Router();

// Thought Routes
router.route('/thoughts').get(getThoughts).post(createThought);
router.route('/thoughts/:id').get(getThoughtById).put(updateThought).delete(deleteThought);
router.route('/thoughts/:thoughtId/reactions').post(createReaction);
router.route('/thoughts/:thoughtId/reactions/:reactionId').delete(deleteReaction);

export default router;
