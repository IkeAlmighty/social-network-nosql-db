import { Thought, User } from '../models/index.js';

// Get all thoughts
export const getThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        res.status(200).json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get a single thought by ID
export const getThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id).populate('reactions');
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Create a new thought
export const createThought = async (req, res) => {
    try {
        const { thoughtText, username } = req.body;
        const thought = await Thought.create({ thoughtText, username });

        // Push the created thought's ID to the user's thoughts array
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.thoughts.push(thought._id);
        await user.save();

        res.status(201).json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Update a thought by ID
export const updateThought = async (req, res) => {
    try {
        const { thoughtText } = req.body;
        const thought = await Thought.findByIdAndUpdate(req.params.id, { thoughtText }, { new: true });
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Delete a thought by ID
export const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.id);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        // Remove the thought's ID from the associated user's thoughts array
        const user = await User.findOne({ username: thought.username });
        if (user) {
            user.thoughts.pull(thought._id);
            await user.save();
        }

        res.status(200).json({ message: 'Thought deleted successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
};

// Create a reaction to a thought
export const createReaction = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        const { reactionBody, username } = req.body;

        thought.reactions.push({ reactionBody, username });
        await thought.save();

        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Delete a reaction from a thought
export const deleteReaction = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        // check to make sure reaction exists!
        const reaction = thought.reactions.id(req.params.reactionId);
        if (!reaction) {
            return res.status(404).json({ message: 'Reaction not found' });
        }

        thought.reactions.pull(req.params.reactionId)
        await thought.save();

        res.status(200).json({ message: 'Reaction deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};
