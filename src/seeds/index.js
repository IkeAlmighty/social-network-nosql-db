const mongoose = require('mongoose');
const { User, Thought } = require('../models');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const seedData = async () => {
    try {
        await User.deleteMany({});
        await Thought.deleteMany({});

        // Create users
        const users = await User.insertMany([
            { username: 'alice', email: 'alice@example.com' },
            { username: 'bob', email: 'bob@example.com' },
            { username: 'charlie', email: 'charlie@example.com' },
        ]);

        // Create thoughts and associate them with users
        const thoughts = await Thought.insertMany([
            { thoughtText: 'MongoDB is great!', username: 'alice' },
            { thoughtText: 'I love coding!', username: 'bob' },
            { thoughtText: 'JavaScript is powerful.', username: 'charlie' },
        ]);

        // Update users with thoughts
        for (let i = 0; i < thoughts.length; i++) {
            await User.findOneAndUpdate(
                { username: thoughts[i].username },
                { $push: { thoughts: thoughts[i]._id } },
                { new: true }
            );
        }

        // Add friends
        await User.findOneAndUpdate(
            { username: 'alice' },
            { $push: { friends: users[1]._id } }
        );
        await User.findOneAndUpdate(
            { username: 'bob' },
            { $push: { friends: users[2]._id } }
        );

        console.log('Database seeded!');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
