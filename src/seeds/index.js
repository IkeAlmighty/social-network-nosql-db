import mongoose from "mongoose";
import { User, Thought } from "../models/index.js";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialNetworkDB"
);

const seedData = async () => {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Create users
    const users = await User.insertMany([
      {
        _id: "67edcd2002b13bd3c4614368",
        username: "alice",
        email: "alice@example.com",
      },
      {
        _id: "67edcd2002b13bd3c4614369",
        username: "bob",
        email: "bob@example.com",
      },
      {
        _id: "67edcd2002b13bd3c461436a",
        username: "charlie",
        email: "charlie@example.com",
      },
      {
        _id: "67edd3fcd571dfc1f22a3e68",
        username: "a new friend",
        email: "friend@friend.com",
      },
    ]);

    // Create thoughts and associate them with users
    const thoughts = await Thought.insertMany([
      {
        _id: "67edcc141c120a6c2a9c1af4",
        thoughtText: "MongoDB is great!",
        username: "alice",
      },
      {
        _id: "67edcc466eea3e4fc2bf74bd",
        thoughtText: "I love coding!",
        username: "bob",
      },
      {
        _id: "67edcc466eea3e4fc2bf74be",
        thoughtText: "JavaScript is powerful.",
        username: "charlie",
      },
      {
        _id: "67edcc466eea3e4fc2bf74bf",
        thoughtText: "I love to eat pie",
        username: "charlie",
      },
    ]);

    // add a reaction to alice's thought
    const thought = await Thought.findOne({
      thoughtText: "MongoDB is great!",
      username: "alice",
    });
    thought.reactions.push({ reactionBody: "😊", username: "bob" });
    thought.save();

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
      { username: "alice" },
      { $push: { friends: users[1]._id } }
    );
    await User.findOneAndUpdate(
      { username: "bob" },
      { $push: { friends: users[2]._id } }
    );

    console.log("Database seeded!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
