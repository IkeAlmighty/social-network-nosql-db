import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/socialDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export default mongoose.connection;
